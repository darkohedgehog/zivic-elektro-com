import "server-only";
import { cache } from "react";

const WC_BASE_URL = process.env.WC_BASE_URL;
const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY || process.env.WC_KEY;
const WC_CONSUMER_SECRET =
  process.env.WC_CONSUMER_SECRET || process.env.WC_SECRET;
const WOO_MAX_FETCH_ATTEMPTS = 3;
const WOO_RETRY_DELAY_MS = 400;

if (!WC_BASE_URL) {
  throw new Error("WC_BASE_URL is not defined in environment variables.");
}

if (!WC_CONSUMER_KEY) {
  throw new Error("WC_CONSUMER_KEY (or WC_KEY) is not defined.");
}

if (!WC_CONSUMER_SECRET) {
  throw new Error("WC_CONSUMER_SECRET (or WC_SECRET) is not defined.");
}

function getBasicAuthHeader() {
  const token = Buffer.from(
    `${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`,
  ).toString("base64");

  return `Basic ${token}`;
}

function createWooRequestError(response: Response): Error {
  return new Error(
    `WooCommerce request failed with status ${response.status} ${response.statusText}.`,
  );
}

async function wooRequest(endpoint: string): Promise<Response> {
  const base = WC_BASE_URL!.replace(/\/$/, "");
  const url = `${base}/wp-json/wc/v3${endpoint}`;
  let lastError: unknown;

  for (let attempt = 1; attempt <= WOO_MAX_FETCH_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: getBasicAuthHeader(),
          "Content-Type": "application/json",
        },
        next: { revalidate: 300 },
      });

      if (response.ok) {
        return response;
      }

      const requestError = createWooRequestError(response);

      if (response.status < 500 && response.status !== 429) {
        throw requestError;
      }

      lastError = requestError;
    } catch (error) {
      lastError = error;
    }

    if (attempt < WOO_MAX_FETCH_ATTEMPTS) {
      await wait(WOO_RETRY_DELAY_MS * attempt);
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("WooCommerce request failed after multiple retry attempts.");
}

async function wooFetchAllPages<T>(endpoint: string): Promise<T[]> {
  const items: T[] = [];
  let currentPage = 1;
  let totalPages = 1;

  while (currentPage <= totalPages) {
    const separator = endpoint.includes("?") ? "&" : "?";
    const response = await wooRequest(`${endpoint}${separator}page=${currentPage}`);
    const pageItems = (await response.json()) as T[];

    items.push(...pageItems);

    totalPages = Number(response.headers.get("x-wp-totalpages") || "1");
    currentPage += 1;
  }

  return items;
}

function wait(durationMs: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, durationMs);
  });
}

export type WooCategory = {
  id: number;
  name: string;
  slug: string;
  parent: number;
  count: number;
  description: string;
  image?: {
    id: number;
    src: string;
    alt?: string;
  } | null;
};

export type WooProductAttribute = {
  id: number;
  name: string;
  slug: string;
  options: string[];
};

export type WooProductCategory = {
  id: number;
  name: string;
  slug: string;
};

export type WooProductBrand = {
  id: number;
  name: string;
  slug: string;
};

export type WooProductImage = {
  id: number;
  src: string;
  alt?: string;
};

export type WooProduct = {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  short_description: string;
  description: string;
  categories: WooProductCategory[];
  images: WooProductImage[];
  brands?: WooProductBrand[];
  attributes: WooProductAttribute[];
};

export type ProductTaxonomy = {
  categoryNames: string[];
  categorySlugs: string[];
  subcategoryNames: string[];
  subcategorySlugs: string[];
};

export type CategoryTreeNode = WooCategory & {
  children: WooCategory[];
};

export type PaginatedItems<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  startItem: number;
  endItem: number;
};

export const getAllCategories = cache(async function getAllCategories(): Promise<
  WooCategory[]
> {
  const params = new URLSearchParams({
    per_page: "100",
    hide_empty: "true",
    orderby: "name",
    order: "asc",
  });

  return wooFetchAllPages<WooCategory>(`/products/categories?${params.toString()}`);
});

export function getChildCategories(
  categories: WooCategory[],
  parentId: number,
): WooCategory[] {
  return categories.filter((category) => category.parent === parentId);
}

export function paginateItems<T>(
  items: T[],
  requestedPage: number,
  pageSize: number,
): PaginatedItems<T> {
  const normalizedPageSize = Math.max(1, pageSize);
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / normalizedPageSize));
  const page =
    totalItems === 0
      ? 1
      : Math.min(Math.max(1, requestedPage), totalPages);
  const startIndex = (page - 1) * normalizedPageSize;
  const paginatedItems = items.slice(startIndex, startIndex + normalizedPageSize);
  const startItem = totalItems === 0 ? 0 : startIndex + 1;
  const endItem =
    totalItems === 0 ? 0 : Math.min(startIndex + paginatedItems.length, totalItems);

  return {
    items: paginatedItems,
    page,
    pageSize: normalizedPageSize,
    totalItems,
    totalPages,
    startItem,
    endItem,
  };
}

export function findCategoryBySlug(
  categories: WooCategory[],
  slug: string,
): WooCategory | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryAncestors(
  categories: WooCategory[],
  category: WooCategory,
): WooCategory[] {
  const categoryMap = new Map(categories.map((item) => [item.id, item]));
  const ancestors: WooCategory[] = [];
  let currentParentId = category.parent;

  while (currentParentId !== 0) {
    const parent = categoryMap.get(currentParentId);

    if (!parent) break;

    ancestors.unshift(parent);
    currentParentId = parent.parent;
  }

  return ancestors;
}

export const getTopLevelCategoryTree = cache(async function getTopLevelCategoryTree(
  limit?: number,
): Promise<CategoryTreeNode[]> {
  const categories = await getAllCategories();

  const topLevel = getChildCategories(categories, 0);
  const mapped = topLevel.map((category) => ({
    ...category,
    children: getChildCategories(categories, category.id),
  }));

  return typeof limit === "number" ? mapped.slice(0, limit) : mapped;
});

export async function getProductsByCategoryId(
  categoryId: number,
  limit?: number,
): Promise<WooProduct[]> {
  return getProductsByCategoryIds([categoryId], limit);
}

export async function getProductsByCategoryIds(
  categoryIds: number[],
  limit?: number,
): Promise<WooProduct[]> {
  if (categoryIds.length === 0) return [];
  const categoryIdSet = new Set(categoryIds);
  const products = await getAllProducts();
  const filteredProducts = products.filter((product) =>
    product.categories.some((category) => categoryIdSet.has(category.id)),
  );

  if (typeof limit === "number") {
    return filteredProducts.slice(0, limit);
  }

  return filteredProducts;
}

export const getAllProducts = cache(async function getAllProducts(): Promise<
  WooProduct[]
> {
  const params = new URLSearchParams({
    per_page: "100",
    status: "publish",
    orderby: "date",
    order: "desc",
  });

  return wooFetchAllPages<WooProduct>(`/products?${params.toString()}`);
});

export const getProductBySlug = cache(async function getProductBySlug(
  slug: string,
): Promise<WooProduct | null> {
  const products = await getAllProducts();

  return products.find((product) => product.slug === slug) || null;
});

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateText(text: string, maxLength = 140): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

export function getProductDescription(product: WooProduct): string {
  const shortText = stripHtml(product.short_description || "");
  if (shortText) return truncateText(shortText, 140);

  const fullText = stripHtml(product.description || "");
  if (fullText) return truncateText(fullText, 140);

  return "Opis proizvoda trenutno nije dostupan.";
}

export function getProductDetailDescription(product: WooProduct): string {
  if (product.description?.trim()) {
    return product.description;
  }

  if (product.short_description?.trim()) {
    return product.short_description;
  }

  return "<p>Opis proizvoda trenutno nije dostupan.</p>";
}

export function getCategoryDescription(category: WooCategory): string {
  const description = stripHtml(category.description || "");

  if (description) {
    return truncateText(description, 180);
  }

  if (category.parent === 0) {
    return `Pregled glavne kategorije ${category.name.toLowerCase()} sa fokusom na jasan, read-only prikaz proizvoda i podkategorija.`;
  }

  return `Pregled potkategorije ${category.name.toLowerCase()} sa izdvojenim proizvodima, brendovima i osnovnim informacijama bez prodajnih elemenata.`;
}

export function getProductBrand(product: WooProduct): string {
  const brands = product.brands
    ?.map((brand) => brand.name.trim())
    .filter(Boolean);

  if (brands?.length) {
    return brands.join(", ");
  }

  const brandAttribute = product.attributes.find((attribute) => {
    const normalized = attribute.name.toLowerCase().trim();

    return (
      normalized === "brand" ||
      normalized === "brend" ||
      normalized === "proizvođač" ||
      normalized === "proizvodac" ||
      normalized === "manufacturer"
    );
  });

  if (brandAttribute?.options?.length) {
    return brandAttribute.options.join(", ");
  }

  return "Brand nije naveden";
}

export function getProductImage(product: WooProduct): WooProductImage | null {
  return product.images?.[0] || null;
}

export function resolveProductTaxonomy(
  product: WooProduct,
  categories: WooCategory[],
): ProductTaxonomy {
  const categoryMap = new Map(categories.map((category) => [category.id, category]));
  const resolvedCategories = product.categories
    .map((category) => categoryMap.get(category.id))
    .filter((category): category is WooCategory => Boolean(category));

  const topLevelCategories = new Map<number, WooCategory>();
  const subcategories = new Map<number, WooCategory>();

  resolvedCategories.forEach((category) => {
    const ancestors = getCategoryAncestors(categories, category);
    const topLevelCategory =
      ancestors[0] || (category.parent === 0 ? category : undefined);

    if (topLevelCategory) {
      topLevelCategories.set(topLevelCategory.id, topLevelCategory);
    }

    if (category.parent !== 0) {
      subcategories.set(category.id, category);
    }
  });

  if (topLevelCategories.size === 0 && product.categories[0]) {
    const fallbackCategory = product.categories[0];

    return {
      categoryNames: [fallbackCategory.name],
      categorySlugs: [fallbackCategory.slug],
      subcategoryNames: [],
      subcategorySlugs: [],
    };
  }

  return {
    categoryNames: Array.from(topLevelCategories.values()).map((category) => category.name),
    categorySlugs: Array.from(topLevelCategories.values()).map((category) => category.slug),
    subcategoryNames: Array.from(subcategories.values()).map((category) => category.name),
    subcategorySlugs: Array.from(subcategories.values()).map((category) => category.slug),
  };
}

export function getUniqueBrandsFromProducts(products: WooProduct[]): string[] {
  const brands = new Set<string>();

  products.forEach((product) => {
    const brand = getProductBrand(product);

    if (brand !== "Brand nije naveden") {
      brands.add(brand);
    }
  });

  return Array.from(brands).sort((left, right) => left.localeCompare(right, "sr"));
}
