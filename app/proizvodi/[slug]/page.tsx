import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Boxes,
  FolderTree,
  GalleryVerticalEnd,
} from "lucide-react";
import { CategoryBreadcrumbs } from "@/components/categories/CategoryBrowseContent";
import { ProductImageGallery } from "@/components/products/ProductImageGallery";
import {
  getAllCategories,
  getProductBrand,
  getProductBySlug,
  getProductDescription,
  getProductDetailDescription,
  resolveProductTaxonomy,
} from "@/lib/woocommerce";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Proizvod nije pronađen",
    };
  }

  return {
    title: product.name,
    description: getProductDescription(product),
  };
}

export default async function ProductDetailPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  const [categories, product] = await Promise.all([
    getAllCategories(),
    getProductBySlug(slug),
  ]);

  if (!product) {
    notFound();
  }

  const taxonomy = resolveProductTaxonomy(product, categories);
  const brand = getProductBrand(product);
  const description = getProductDetailDescription(product);
  const breadcrumbItems = [
    { label: "Početna", href: "/" },
    { label: "Proizvodi", href: "/proizvodi" },
    ...(taxonomy.categoryNames[0]
      ? [
          {
            label: taxonomy.categoryNames[0],
            href: `/kategorije/${taxonomy.categorySlugs[0]}`,
          },
        ]
      : []),
    { label: product.name },
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel overflow-hidden rounded-4xl p-6 sm:p-8 lg:p-10">
          <CategoryBreadcrumbs items={breadcrumbItems} />

          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
            <div>
              <p className="section-eyebrow">Proizvod</p>

              <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-[#f2e9e4] sm:text-4xl lg:text-5xl">
                {product.name}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[#f2e9e4]/68 sm:text-lg">
                Detaljan read-only prikaz proizvoda sa slikama, opisom, pripadnom
                kategorijom i brendom, bez cena i kupovine.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {taxonomy.categoryNames.map((name, index) => (
                  <Link
                    key={`${name}-${taxonomy.categorySlugs[index]}`}
                    href={`/kategorije/${taxonomy.categorySlugs[index]}`}
                    className="rounded-full border border-white/10 bg-[#22223b]/70 px-3 py-1 text-xs uppercase tracking-[0.14em] text-[#c9ada7]"
                  >
                    {name}
                  </Link>
                ))}

                {taxonomy.subcategoryNames.map((name, index) => (
                  <Link
                    key={`${name}-${taxonomy.subcategorySlugs[index]}`}
                    href={`/kategorije/${taxonomy.subcategorySlugs[index]}`}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.14em] text-[#f2e9e4]/75"
                  >
                    {name}
                  </Link>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/proizvodi"
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  Nazad na proizvode
                </Link>
                {taxonomy.categorySlugs[0] ? (
                  <Link
                    href={`/kategorije/${taxonomy.categorySlugs[0]}`}
                    className="btn-primary inline-flex items-center justify-center gap-2"
                  >
                    Otvorite kategoriju
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <DetailStat
                icon={<FolderTree className="h-5 w-5" />}
                label="Kategorije"
                value={String(taxonomy.categoryNames.length || 1)}
              />
              <DetailStat
                icon={<Boxes className="h-5 w-5" />}
                label="Podkategorije"
                value={String(taxonomy.subcategoryNames.length)}
              />
              <DetailStat
                icon={<GalleryVerticalEnd className="h-5 w-5" />}
                label="Slike"
                value={String(product.images.length)}
              />
            </div>
          </div>
        </div>

        <section className="relative py-10 sm:py-12">
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <ProductImageGallery images={product.images} productName={product.name} />

            <div className="grid gap-6">
              <div className="surface-panel overflow-hidden rounded-4xl p-6 sm:p-7">
                <h2 className="text-xl font-semibold text-[#f2e9e4] sm:text-2xl">
                  Osnovne informacije
                </h2>

                <div className="mt-6 grid gap-4">
                  <InfoRow
                    label="Brand"
                    value={brand}
                  />
                  <InfoRow
                    label="Kategorija"
                    value={taxonomy.categoryNames.join(", ") || "Nije izdvojena"}
                  />
                  <InfoRow
                    label="Podkategorija"
                    value={
                      taxonomy.subcategoryNames.join(", ") || "Osnovna kategorija"
                    }
                  />
                </div>

                <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#9a8c98]">
                    Način prikaza
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#f2e9e4]/68">
                    Prezentacijski prikaz bez cena, košarice, zaliha i kupovine.
                  </p>
                </div>
              </div>

              <div className="surface-panel overflow-hidden rounded-4xl p-6 sm:p-7">
                <h2 className="text-xl font-semibold text-[#f2e9e4] sm:text-2xl">
                  Kratak pregled
                </h2>
                <p className="mt-4 text-sm leading-8 text-[#f2e9e4]/68 sm:text-base">
                  {getProductDescription(product)}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-2 sm:py-4">
          <div className="surface-panel overflow-hidden rounded-4xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-[#f2e9e4] sm:text-3xl">
              Opis proizvoda
            </h2>
            <div
              className="mt-6 text-sm leading-8 text-[#f2e9e4]/72 sm:text-base [&_a]:text-[#c9ada7] [&_li]:ml-5 [&_li]:list-disc [&_li]:marker:text-[#c9ada7] [&_p]:mt-4 [&_strong]:text-[#f2e9e4] [&_ul]:mt-4"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </section>
      </div>
    </section>
  );
}

function DetailStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4a4e69] text-[#f2e9e4]">
        {icon}
      </div>

      <p className="mt-5 text-xs uppercase tracking-[0.18em] text-[#9a8c98]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-[#f2e9e4]">{value}</p>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-[#22223b]/55 px-4 py-3">
      <span className="text-xs uppercase tracking-[0.16em] text-[#9a8c98]">
        {label}
      </span>
      <span className="text-right text-sm font-medium text-[#f2e9e4]">
        {value}
      </span>
    </div>
  );
}
