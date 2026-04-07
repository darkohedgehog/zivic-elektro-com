import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Boxes, Filter, FolderTree, PackageSearch } from "lucide-react";
import { CategoryBreadcrumbs } from "@/components/categories/CategoryBrowseContent";
import { ProductCard } from "@/components/products/ProductBrowseContent";
import { WebshopCtaPanel } from "@/components/catalog/WebshopCtaPanel";
import {
  getAllCategories,
  getAllProducts,
  getChildCategories,
  getProductBrand,
  getUniqueBrandsFromProducts,
  paginateItems,
  resolveProductTaxonomy,
  type WooCategory,
  type WooProduct,
} from "@/lib/woocommerce";
import { WEBSHOP_BASE_URL } from "@/app/utils/webshopLinks";
import { createPageMetadata } from "@/lib/seo";

type ProductsPageSearchParams = {
  brand?: string;
  category?: string;
  subcategory?: string;
  sort?: string;
  page?: string;
};

type ProductsPageProps = {
  searchParams: Promise<ProductsPageSearchParams>;
};

type SortOption = "newest" | "name-asc" | "name-desc" | "brand-asc";

type SelectOption = {
  value: string;
  label: string;
};

type ProductsQueryState = {
  brand: string;
  category: string;
  subcategory: string;
  sort: SortOption;
  page: number;
};

const PRODUCTS_PER_PAGE = 24;

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: "newest", label: "Najnovije prvo" },
  { value: "name-asc", label: "Naziv A-Z" },
  { value: "name-desc", label: "Naziv Z-A" },
  { value: "brand-asc", label: "Brand A-Z" },
];

export const metadata: Metadata = createPageMetadata({
  title: "Proizvodi",
  description:
    "Read-only pregled svih WooCommerce proizvoda sa filterima po brandu, kategoriji i podkategoriji, bez cena i kupovine.",
  path: "/proizvodi",
});

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const [{ brand, category, subcategory, sort, page }, categories, products] =
    await Promise.all([searchParams, getAllCategories(), getAllProducts()]);

  const topCategories = getChildCategories(categories, 0);
  const brandOptions = getUniqueBrandsFromProducts(products).map((item) => ({
    value: item,
    label: item,
  }));
  const selectedCategory = topCategories.find((item) => item.slug === category);
  const availableSubcategories = selectedCategory
    ? getChildCategories(categories, selectedCategory.id)
    : categories.filter((item) => item.parent !== 0);
  const subcategoryOptions = buildSubcategoryOptions(
    availableSubcategories,
    categories,
    !selectedCategory,
  );

  const selectedBrand =
    brand && brandOptions.some((item) => item.value === brand) ? brand : "";
  const selectedCategorySlug = selectedCategory?.slug || "";
  const selectedSubcategory = subcategoryOptions.some(
    (item) => item.value === subcategory,
  )
    ? (subcategory ?? "")
    : "";
  const selectedSort = SORT_OPTIONS.some((item) => item.value === sort)
    ? (sort as SortOption)
    : "newest";
  const requestedPage = parsePageParam(page);

  const filteredProducts = sortProducts(
    products.filter((product) => {
      const taxonomy = resolveProductTaxonomy(product, categories);
      const productBrand = getProductBrand(product);

      return (
        (!selectedBrand || productBrand === selectedBrand) &&
        (!selectedCategorySlug ||
          taxonomy.categorySlugs.includes(selectedCategorySlug)) &&
        (!selectedSubcategory ||
          taxonomy.subcategorySlugs.includes(selectedSubcategory))
      );
    }),
    selectedSort,
  );

  const paginatedProducts = paginateItems(
    filteredProducts,
    requestedPage,
    PRODUCTS_PER_PAGE,
  );
  const currentQueryState: ProductsQueryState = {
    brand: selectedBrand,
    category: selectedCategorySlug,
    subcategory: selectedSubcategory,
    sort: selectedSort,
    page: paginatedProducts.page,
  };

  const activeFilters = [
    selectedBrand ? `Brand: ${selectedBrand}` : null,
    selectedCategory ? `Kategorija: ${selectedCategory.name}` : null,
    selectedSubcategory
      ? `Podkategorija: ${
          subcategoryOptions.find((item) => item.value === selectedSubcategory)?.label
        }`
      : null,
  ].filter((item): item is string => Boolean(item));

  const selectedCategoryHasSubcategories = selectedCategory
    ? availableSubcategories.length > 0
    : true;

  return (
    <section className="flow-section relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel overflow-hidden rounded-4xl p-6 sm:p-8 lg:p-10">
          <CategoryBreadcrumbs
            items={[
              { label: "Početna", href: "/" },
              { label: "Proizvodi" },
            ]}
          />

          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
              <p className="section-eyebrow">Proizvodi</p>

              <h1 className="theme-heading mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Read-only pregled celokupne ponude sa jasnim filterima
              </h1>

              <p className="theme-body mt-5 max-w-2xl text-base leading-8 sm:text-lg">
                Stranica proizvoda omogućava mirno i pregledno istraživanje
                kompletnog asortimana kroz brendove, kategorije i podkategorije,
                bez cena, korpe i kupovine.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/kategorije"
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  Pogledajte kategorije
                </Link>
                <a
                  href="#product-results"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  Otvorite proizvode
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <OverviewStat
                icon={<PackageSearch className="h-5 w-5" />}
                label="Ukupno proizvoda"
                value={String(products.length)}
              />
              <OverviewStat
                icon={<FolderTree className="h-5 w-5" />}
                label="Glavne kategorije"
                value={String(topCategories.length)}
              />
              <OverviewStat
                icon={<Boxes className="h-5 w-5" />}
                label="Brendovi"
                value={String(brandOptions.length)}
              />
            </div>
          </div>
        </div>

        <WebshopCtaPanel
          eyebrow="Online kupovina"
          title="Online kupovina"
          description="Kompletan katalog proizvoda dostupan je u našem webshopu."
          href={WEBSHOP_BASE_URL}
          ctaLabel="Otvori webshop"
          caption="Koristite ovu stranicu za pregled, filtriranje i usporedbu proizvoda, a webshop za potpunu dostupnost i kupnju."
        />

        <section className="flow-subsection relative py-10 sm:py-12">
          <div className="surface-panel overflow-hidden rounded-4xl p-5 sm:p-6 lg:p-8">
            <div className="mb-6 flex items-start gap-3">
              <div className="theme-card-surface theme-heading flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                <Filter className="h-5 w-5" />
              </div>

              <div>
                <h2 className="theme-heading text-xl font-semibold sm:text-2xl">
                  Filteri i sortiranje
                </h2>
                <p className="theme-body-muted mt-1 text-sm leading-7">
                  Na mobilnim ekranima kontrole su složene vertikalno radi
                  jasnijeg pregleda i jednostavnijeg korišćenja.
                </p>
              </div>
            </div>

            <div className="theme-card-surface rounded-3xl p-4 sm:p-5">
              <form className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" method="get">
                <FilterField
                  label="Brand"
                  name="brand"
                  value={selectedBrand}
                  options={brandOptions}
                  placeholder="Svi brendovi"
                />

                <FilterField
                  label="Kategorija"
                  name="category"
                  value={selectedCategorySlug}
                  options={topCategories.map((item) => ({
                    value: item.slug,
                    label: item.name,
                  }))}
                  placeholder="Sve kategorije"
                />

                <FilterField
                  label="Podkategorija"
                  name="subcategory"
                  value={selectedSubcategory}
                  options={subcategoryOptions}
                  placeholder={
                    selectedCategory && !selectedCategoryHasSubcategories
                      ? "Kategorija nema podkategorije"
                      : "Sve podkategorije"
                  }
                  disabled={selectedCategory ? !selectedCategoryHasSubcategories : false}
                  helperText={
                    selectedCategory && !selectedCategoryHasSubcategories
                      ? "Za izabranu kategoriju trenutno nema užeg izbora."
                      : undefined
                  }
                />

                <FilterField
                  label="Sortiranje"
                  name="sort"
                  value={selectedSort}
                  options={SORT_OPTIONS}
                  placeholder="Sortiranje"
                />

                <div className="grid gap-3 sm:col-span-2 xl:col-span-4 xl:grid-cols-[minmax(0,1fr)_auto]">
                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    Primenite filtere
                  </button>

                  <Link
                    href="/proizvodi"
                    className="btn-secondary w-full sm:w-auto xl:justify-self-start"
                  >
                    Resetujte pregled
                  </Link>
                </div>
              </form>

              <div className="mt-5 flex flex-col gap-3 border-t border-(--border-soft) pt-5">
                <div className="flex flex-wrap gap-2">
                  {activeFilters.length > 0 ? (
                    activeFilters.map((item) => (
                      <span
                        key={item}
                        className="theme-chip-muted px-3 py-2 text-xs uppercase tracking-[0.14em]"
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <span className="theme-chip-muted px-3 py-2 text-xs uppercase tracking-[0.14em]">
                      Trenutno nema aktivnih filtera
                    </span>
                  )}
                </div>

                <p className="theme-body-muted text-sm leading-7">
                  Stranica se nakon promene filtera vraća na prvu paginaciju kako bi
                  pregled ostao predvidljiv i lak za skeniranje.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="product-results"
          className="flow-subsection relative py-2 sm:py-4"
        >
          <div className="mb-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <p className="section-eyebrow">Rezultati</p>
              <h2 className="theme-heading mt-3 text-2xl font-semibold sm:text-3xl">
                {paginatedProducts.totalItems} proizvoda u read-only prikazu
              </h2>
              <p className="theme-body-muted mt-3 max-w-3xl text-base leading-8">
                Svaki proizvod vodi na detaljnu prezentacijsku stranicu sa
                slikama, opisom, kategorijom i brendom, uz jasan put prema
                webshop kupovini.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 lg:justify-end">
              <span className="theme-chip-muted px-3 py-2 text-sm normal-case tracking-normal">
                Prikazano {paginatedProducts.startItem}-{paginatedProducts.endItem} od{" "}
                {paginatedProducts.totalItems}
              </span>
              <span className="theme-chip-muted px-3 py-2 text-sm normal-case tracking-normal">
                Stranica {paginatedProducts.page} od {paginatedProducts.totalPages}
              </span>
            </div>
          </div>

          {paginatedProducts.totalItems > 0 ? (
            <>
              <div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3">
                {paginatedProducts.items.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    categories={categories}
                  />
                ))}
              </div>

              <ProductsPagination
                currentPage={paginatedProducts.page}
                totalPages={paginatedProducts.totalPages}
                totalItems={paginatedProducts.totalItems}
                startItem={paginatedProducts.startItem}
                endItem={paginatedProducts.endItem}
                queryState={currentQueryState}
              />
            </>
          ) : (
            <div className="theme-empty-state rounded-3xl p-6 sm:p-8">
              <p className="theme-body-muted text-base leading-8">
                Nijedan proizvod trenutno ne odgovara izabranim filterima.
                Pokušajte sa širom kombinacijom brendova ili kategorija.
              </p>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}

function buildSubcategoryOptions(
  subcategories: WooCategory[],
  categories: WooCategory[],
  includeParentName: boolean,
): SelectOption[] {
  const collator = new Intl.Collator("sr", { sensitivity: "base" });

  return subcategories
    .map((subcategory) => {
      const parent = categories.find((category) => category.id === subcategory.parent);

      return {
        value: subcategory.slug,
        label:
          includeParentName && parent
            ? `${subcategory.name} · ${parent.name}`
            : subcategory.name,
      };
    })
    .sort((left, right) => collator.compare(left.label, right.label));
}

function sortProducts(
  products: WooProduct[],
  sort: SortOption,
): WooProduct[] {
  const collator = new Intl.Collator("sr", { sensitivity: "base" });

  return [...products].sort((left, right) => {
    if (sort === "newest") {
      return 0;
    }

    if (sort === "name-asc") {
      return collator.compare(left.name, right.name);
    }

    if (sort === "name-desc") {
      return collator.compare(right.name, left.name);
    }

    if (sort === "brand-asc") {
      const brandComparison = collator.compare(
        getProductBrand(left),
        getProductBrand(right),
      );

      if (brandComparison !== 0) {
        return brandComparison;
      }

      return collator.compare(left.name, right.name);
    }

    return collator.compare(left.name, right.name);
  });
}

function parsePageParam(value?: string): number {
  const parsedPage = Number(value);

  if (!Number.isInteger(parsedPage) || parsedPage < 1) {
    return 1;
  }

  return parsedPage;
}

function buildProductsHref({
  brand,
  category,
  subcategory,
  sort,
  page,
}: ProductsQueryState): string {
  const params = new URLSearchParams();

  if (brand) {
    params.set("brand", brand);
  }

  if (category) {
    params.set("category", category);
  }

  if (subcategory) {
    params.set("subcategory", subcategory);
  }

  if (sort !== "newest") {
    params.set("sort", sort);
  }

  params.set("page", String(page));

  return `/proizvodi?${params.toString()}`;
}

function getPaginationItems(
  currentPage: number,
  totalPages: number,
): Array<number | "ellipsis"> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [
      1,
      "ellipsis",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPages,
  ];
}

function FilterField({
  label,
  name,
  value,
  options,
  placeholder,
  disabled = false,
  helperText,
}: {
  label: string;
  name: string;
  value: string;
  options: SelectOption[];
  placeholder: string;
  disabled?: boolean;
  helperText?: string;
}) {
  return (
    <label className="grid min-w-0 gap-2">
      <span className="theme-heading text-sm font-medium">{label}</span>
      <select
        name={name}
        defaultValue={value}
        disabled={disabled}
        className="theme-select min-h-12 w-full rounded-2xl px-4 py-3 text-sm outline-none transition duration-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText ? (
        <span className="theme-body-muted text-xs leading-6">{helperText}</span>
      ) : null}
    </label>
  );
}

function OverviewStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="theme-stat-card rounded-3xl p-5">
      <div className="theme-icon-badge flex h-11 w-11 items-center justify-center rounded-2xl">
        {icon}
      </div>

      <p className="theme-label mt-5 text-xs uppercase tracking-[0.18em]">
        {label}
      </p>
      <p className="theme-heading mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function ProductsPagination({
  currentPage,
  totalPages,
  totalItems,
  startItem,
  endItem,
  queryState,
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startItem: number;
  endItem: number;
  queryState: ProductsQueryState;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const paginationItems = getPaginationItems(currentPage, totalPages);

  return (
    <nav
      aria-label="Paginacija proizvoda"
      className="mt-8 rounded-4xl border border-(--border-soft) bg-[rgba(13,19,33,0.32)] p-4 sm:p-5"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="theme-heading text-sm font-medium">
            Prikazano {startItem}-{endItem} od {totalItems} proizvoda
          </p>
          <p className="theme-body-muted mt-1 text-sm">
            Stranica {currentPage} od {totalPages}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {currentPage > 1 ? (
            <Link
              href={buildProductsHref({ ...queryState, page: currentPage - 1 })}
              className="btn-secondary min-h-11 px-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Prethodna
            </Link>
          ) : (
            <span className="btn-secondary min-h-11 cursor-default px-4 opacity-55">
              <ArrowLeft className="h-4 w-4" />
              Prethodna
            </span>
          )}

          <div className="flex flex-wrap items-center gap-2">
            {paginationItems.map((item, index) =>
              item === "ellipsis" ? (
                <span
                  key={`ellipsis-${index}`}
                  className="theme-body-muted inline-flex min-h-11 min-w-11 items-center justify-center px-1 text-sm"
                >
                  ...
                </span>
              ) : item === currentPage ? (
                <span
                  key={item}
                  aria-current="page"
                  className="btn-primary pointer-events-none min-h-11 min-w-11 px-4"
                >
                  {item}
                </span>
              ) : (
                <Link
                  key={item}
                  href={buildProductsHref({ ...queryState, page: item })}
                  className="theme-card-surface theme-heading inline-flex min-h-11 min-w-11 items-center justify-center rounded-2xl px-4 text-sm font-medium transition duration-200 hover:-translate-y-px hover:border-(--border-strong)"
                >
                  {item}
                </Link>
              ),
            )}
          </div>

          {currentPage < totalPages ? (
            <Link
              href={buildProductsHref({ ...queryState, page: currentPage + 1 })}
              className="btn-secondary min-h-11 px-4"
            >
              Sledeća
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <span className="btn-secondary min-h-11 cursor-default px-4 opacity-55">
              Sledeća
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
