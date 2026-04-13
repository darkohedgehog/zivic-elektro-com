import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Boxes, FolderTree, PackageSearch } from "lucide-react";
import {
  getTopLevelCategoryTree,
  getProductsByCategoryIds,
  getProductBrand,
  getProductDescription,
  type CategoryTreeNode,
  type WooProduct,
} from "@/lib/woocommerce";

type CategoryWithProducts = {
  category: CategoryTreeNode;
  products: WooProduct[];
};

async function getFeaturedCategoryBlocks(): Promise<CategoryWithProducts[]> {
  const topCategories = await getTopLevelCategoryTree(4);

  const results = await Promise.all(
    topCategories.map(async (category) => {
      const categoryIds = [category.id, ...category.children.map((child) => child.id)];
      const products = await getProductsByCategoryIds(categoryIds, 4);

      return {
        category,
        products,
      };
    }),
  );

  return results;
}

export async function FeaturedCategoriesSection() {
  const categoryBlocks = await getFeaturedCategoryBlocks();

  return (
    <section className="flow-section relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="section-eyebrow">Izdvojene kategorije</p>

            <h2 className="theme-heading mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Pregled ponude kroz glavne kategorije i podkategorije
            </h2>

            <p className="theme-body mt-5 text-base leading-8 sm:text-lg">
              Na prezentacijskoj stranici prikazujemo izdvojene kategorije i dio
              proizvoda iz naše ponude, kako biste brže stekli uvid u asortiman i
              lakše pronašli oblast koja vas zanima.
            </p>
          </div>

          <Link
            href="/kategorije"
            className="btn-secondary inline-flex items-center justify-center gap-2 self-start lg:self-auto"
          >
            Pogledajte sve kategorije
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-8">
          {categoryBlocks.map(({ category, products }) => (
            <CategoryShowcaseCard
              key={category.id}
              category={category}
              products={products}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryShowcaseCard({
  category,
  products,
}: {
  category: CategoryTreeNode;
  products: WooProduct[];
}) {
  return (
    <div className="surface-panel overflow-hidden rounded-4xl p-5 sm:p-6 lg:p-8">
      <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
        <div>
          <div className="theme-icon-badge flex h-12 w-12 items-center justify-center rounded-2xl">
            <FolderTree className="h-6 w-6" />
          </div>

          <h3 className="theme-heading mt-5 text-2xl font-semibold">
            {category.name}
          </h3>

          <p className="theme-body-muted mt-3 text-sm leading-7 sm:text-base">
            Organizirana kategorija s jasnim pregledom proizvoda i pripadajućih
            podkategorija, namijenjena lakšem snalaženju kroz ponudu.
          </p>

          <div className="theme-card-surface mt-6 rounded-3xl p-4">
            <div className="flex items-start gap-3">
              <div className="theme-icon-badge-soft mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                <Boxes className="h-5 w-5" />
              </div>

              <div>
                <p className="theme-heading text-sm font-semibold">
                  Podkategorije
                </p>

                {category.children.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {category.children.slice(0, 8).map((child) => (
                      <span
                        key={child.id}
                        className="theme-chip-muted px-3 py-1 text-xs"
                      >
                        {child.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="theme-body-muted mt-2 text-sm">
                    Ova kategorija trenutno nema izdvojene podkategorije.
                  </p>
                )}
              </div>
            </div>
          </div>

          <Link
            href={`/kategorije/${category.slug}`}
            className="theme-card-link mt-6 inline-flex items-center gap-2 text-sm font-medium hover:translate-x-1"
          >
            Otvorite kategoriju
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="theme-card-surface flex h-10 w-10 items-center justify-center rounded-xl theme-heading">
              <PackageSearch className="h-5 w-5" />
            </div>

            <div>
              <p className="theme-heading text-sm font-semibold">
                Izdvojeni proizvodi iz kategorije
              </p>
              <p className="theme-body-muted text-sm">
                Bez cijena i košarice, fokus na pregledu ponude.
              </p>
            </div>
          </div>

          {products.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {products.map((product) => (
                <ProductPreviewCard
                  key={product.id}
                  product={product}
                  parentCategoryName={category.name}
                  childCategoryNames={category.children.map((child) => child.name)}
                />
              ))}
            </div>
          ) : (
            <div className="theme-empty-state rounded-3xl p-5">
              <p className="theme-body-muted text-sm">
                Trenutno nema izdvojenih proizvoda za ovu kategoriju.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductPreviewCard({
  product,
  parentCategoryName,
  childCategoryNames,
}: {
  product: WooProduct;
  parentCategoryName: string;
  childCategoryNames: string[];
}) {
  const image = product.images?.[0];
  const productCategory =
    product.categories.find((category) => category.name === parentCategoryName)?.name ||
    parentCategoryName;

  const productSubcategory =
    product.categories.find((category) => childCategoryNames.includes(category.name))
      ?.name || "Nije izdvojena";

  const brand = getProductBrand(product);
  const description = getProductDescription(product);

  return (
    <Link
      href={`/proizvodi/${product.slug}`}
      className="theme-card-surface theme-interactive-card group overflow-hidden rounded-3xl"
    >
      <div className="theme-media-frame relative aspect-16/10 w-full overflow-hidden">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt || product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="theme-body-muted flex h-full items-center justify-center">
            <PackageSearch className="h-10 w-10" />
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          <span className="theme-chip px-2.5 py-1 text-[11px] uppercase tracking-[0.14em]">
            {productCategory}
          </span>

          <span className="theme-chip-muted px-2.5 py-1 text-[11px] uppercase tracking-[0.14em]">
            {productSubcategory}
          </span>
        </div>

        <h4 className="theme-heading mt-4 line-clamp-2 text-lg font-semibold">
          {product.name}
        </h4>

        <p className="theme-body-muted mt-3 line-clamp-3 text-sm leading-7">
          {description}
        </p>

        <div className="theme-inline-panel mt-4 grid gap-2 rounded-2xl p-3">
          <div className="flex items-center justify-between gap-3">
            <span className="theme-label text-xs uppercase tracking-[0.16em]">
              Brand
            </span>
            <span className="theme-heading text-sm font-medium">{brand}</span>
          </div>
        </div>

        <div className="theme-card-link mt-4 inline-flex items-center gap-2 text-sm font-medium group-hover:translate-x-1">
          Detaljnije
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
