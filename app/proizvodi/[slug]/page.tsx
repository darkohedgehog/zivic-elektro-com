import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Boxes,
  FolderTree,
  GalleryVerticalEnd,
  ShoppingCart,
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
import { getWebshopProductUrl } from "@/app/utils/webshopLinks";
import { createPageMetadata, NOINDEX_ROBOTS } from "@/lib/seo";

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
      robots: NOINDEX_ROBOTS,
    };
  }

  return createPageMetadata({
    title: product.name,
    description: getProductDescription(product),
    path: `/proizvodi/${product.slug}`,
    ogImage: product.images[0]?.src ?? null,
  });
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
  const webshopUrl = getWebshopProductUrl(product.slug);
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
    <section className="flow-section relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel overflow-hidden rounded-4xl p-6 sm:p-8 lg:p-10">
          <CategoryBreadcrumbs items={breadcrumbItems} />

          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
            <div>
              <p className="section-eyebrow">Proizvod</p>

              <h1 className="theme-heading mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {product.name}
              </h1>

              <p className="theme-body mt-5 max-w-2xl text-base leading-8 sm:text-lg">
                Detaljan read-only prikaz proizvoda sa slikama, opisom, pripadnom
                kategorijom i brendom, bez cena i kupovine.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {taxonomy.categoryNames.map((name, index) => (
                  <Link
                    key={`${name}-${taxonomy.categorySlugs[index]}`}
                    href={`/kategorije/${taxonomy.categorySlugs[index]}`}
                    className="theme-chip px-3 py-1 text-xs uppercase tracking-[0.14em]"
                  >
                    {name}
                  </Link>
                ))}

                {taxonomy.subcategoryNames.map((name, index) => (
                  <Link
                    key={`${name}-${taxonomy.subcategorySlugs[index]}`}
                    href={`/kategorije/${taxonomy.subcategorySlugs[index]}`}
                    className="theme-chip-muted px-3 py-1 text-xs uppercase tracking-[0.14em]"
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

        <section className="flow-subsection relative py-10 sm:py-12">
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <ProductImageGallery images={product.images} productName={product.name} />

            <div className="grid gap-6">
              <div className="surface-panel overflow-hidden rounded-4xl p-6 sm:p-7">
                <h2 className="theme-heading text-xl font-semibold sm:text-2xl">
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

                <div className="theme-card-surface mt-6 rounded-3xl p-4">
                  <p className="theme-label text-xs uppercase tracking-[0.16em]">
                    Način prikaza
                  </p>
                  <p className="theme-body mt-2 text-sm leading-7">
                    Prezentacijski prikaz bez cena, košarice, zaliha i kupovine.
                  </p>
                </div>
              </div>

              <div className="surface-panel overflow-hidden rounded-4xl p-6 sm:p-7">
                <h2 className="theme-heading text-xl font-semibold sm:text-2xl">
                  Kratak pregled
                </h2>
                <p className="theme-body mt-4 text-sm leading-8 sm:text-base">
                  {getProductDescription(product)}
                </p>
              </div>

              <div className="surface-panel overflow-hidden rounded-4xl p-6 sm:p-7">
                <div className="flex flex-wrap gap-2">
                  <span className="theme-chip px-3 py-1 text-[11px] uppercase tracking-[0.16em]">
                    Dostupno za kupovinu u Živić-Elektro webshopu
                  </span>
                </div>

                <h2 className="theme-heading mt-5 text-xl font-semibold sm:text-2xl">
                  Kupovina
                </h2>
                <p className="theme-body mt-4 text-sm leading-8 sm:text-base">
                  Ovaj proizvod možete kupiti u našem online shopu.
                </p>
                <p className="theme-body-muted mt-3 text-sm leading-7">
                  Za kompletnu dostupnost i online kupovinu posetite webshop.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href={webshopUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary w-full justify-center sm:w-auto"
                  >
                    Kupi u online shopu
                    <ShoppingCart className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flow-subsection relative py-2 sm:py-4">
          <div className="surface-panel overflow-hidden rounded-4xl p-6 sm:p-8">
            <h2 className="theme-heading text-2xl font-semibold sm:text-3xl">
              Opis proizvoda
            </h2>
            <div
              className="theme-body mt-6 text-sm leading-8 sm:text-base [&_a]:text-[#748CAB] [&_li]:ml-5 [&_li]:list-disc [&_li]:marker:text-[#748CAB] [&_p]:mt-4 [&_strong]:text-[#F0EBD8] [&_ul]:mt-4"
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

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="theme-inline-panel flex items-start justify-between gap-4 rounded-2xl px-4 py-3">
      <span className="theme-label text-xs uppercase tracking-[0.16em]">
        {label}
      </span>
      <span className="theme-heading text-right text-sm font-medium">
        {value}
      </span>
    </div>
  );
}
