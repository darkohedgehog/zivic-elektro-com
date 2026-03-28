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
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="section-eyebrow">Izdvojene kategorije</p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#f2e9e4] sm:text-4xl">
              Pregled ponude kroz glavne kategorije i podkategorije
            </h2>

            <p className="mt-5 text-base leading-8 text-[#f2e9e4]/68 sm:text-lg">
              Na prezentacijskoj stranici prikazujemo izdvojene kategorije i deo
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
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4a4e69] text-[#f2e9e4]">
            <FolderTree className="h-6 w-6" />
          </div>

          <h3 className="mt-5 text-2xl font-semibold text-[#f2e9e4]">
            {category.name}
          </h3>

          <p className="mt-3 text-sm leading-7 text-[#f2e9e4]/66 sm:text-base">
            Organizovana kategorija sa jasnim pregledom proizvoda i pripadajućih
            podkategorija, namenjena lakšem snalaženju kroz ponudu.
          </p>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#c9ada7]/18 text-[#f2e9e4]">
                <Boxes className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#f2e9e4]">
                  Podkategorije
                </p>

                {category.children.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {category.children.slice(0, 8).map((child) => (
                      <span
                        key={child.id}
                        className="rounded-full border border-white/10 bg-[#22223b]/70 px-3 py-1 text-xs text-[#f2e9e4]/75"
                      >
                        {child.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-[#f2e9e4]/60">
                    Ova kategorija trenutno nema izdvojene podkategorije.
                  </p>
                )}
              </div>
            </div>
          </div>

          <Link
            href={`/kategorije/${category.slug}`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#c9ada7] transition duration-200 hover:translate-x-1"
          >
            Otvorite kategoriju
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[#f2e9e4] ring-1 ring-white/10">
              <PackageSearch className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#f2e9e4]">
                Izdvojeni proizvodi iz kategorije
              </p>
              <p className="text-sm text-[#f2e9e4]/60">
                Bez cena i košarice, fokus na pregledu ponude.
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
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-[#f2e9e4]/65">
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
      className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition duration-200 hover:-translate-y-0.5 hover:bg-white/7"
    >
      <div className="relative aspect-16/10 w-full overflow-hidden bg-[#2b2d4a]">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt || product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[#f2e9e4]/45">
            <PackageSearch className="h-10 w-10" />
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-[#22223b]/70 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-[#c9ada7]">
            {productCategory}
          </span>

          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-[#f2e9e4]/70">
            {productSubcategory}
          </span>
        </div>

        <h4 className="mt-4 line-clamp-2 text-lg font-semibold text-[#f2e9e4]">
          {product.name}
        </h4>

        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#f2e9e4]/65">
          {description}
        </p>

        <div className="mt-4 grid gap-2 rounded-2xl border border-white/10 bg-[#22223b]/55 p-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs uppercase tracking-[0.16em] text-[#9a8c98]">
              Brand
            </span>
            <span className="text-sm font-medium text-[#f2e9e4]">{brand}</span>
          </div>
        </div>

        <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#c9ada7] transition duration-200 group-hover:translate-x-1">
          Detaljnije
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}