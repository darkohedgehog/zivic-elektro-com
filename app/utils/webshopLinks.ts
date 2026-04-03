export const WEBSHOP_BASE_URL = "https://www.zivic-elektro.shop";

type WebshopCategoryLike = {
  id: number;
  slug: string;
  parent: number;
};

export function getWebshopProductUrl(slug: string): string {
  return `${WEBSHOP_BASE_URL}/products/${slug}`;
}

export function getWebshopCategoryUrl(
  category: WebshopCategoryLike,
  categories: WebshopCategoryLike[],
): string {
  const categoryMap = new Map(categories.map((item) => [item.id, item]));
  const pathSegments = [category.slug];
  let currentParentId = category.parent;

  while (currentParentId !== 0) {
    const parent = categoryMap.get(currentParentId);

    if (!parent) {
      break;
    }

    pathSegments.unshift(parent.slug);
    currentParentId = parent.parent;
  }

  return `${WEBSHOP_BASE_URL}/categories/${pathSegments.join("/")}`;
}
