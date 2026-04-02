import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Boxes, FolderTree, Layers3 } from "lucide-react";
import {
  CategoryBreadcrumbs,
  CategoryCard,
} from "@/components/categories/CategoryBrowseContent";
import { ProductGridSection } from "@/components/products/ProductBrowseContent";
import {
  findCategoryBySlug,
  getAllCategories,
  getCategoryAncestors,
  getCategoryDescription,
  getChildCategories,
  getProductsByCategoryId,
} from "@/lib/woocommerce";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getAllCategories();
  const category = findCategoryBySlug(categories, slug);

  if (!category) {
    return {
      title: "Kategorija nije pronađena",
    };
  }

  return {
    title: category.name,
    description: getCategoryDescription(category),
  };
}

export default async function CategoryDetailPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;
  const categories = await getAllCategories();
  const category = findCategoryBySlug(categories, slug);

  if (!category) {
    notFound();
  }

  const childCategories = getChildCategories(categories, category.id);
  const ancestors = getCategoryAncestors(categories, category);
  const hasChildren = childCategories.length > 0;
  const products = hasChildren ? [] : await getProductsByCategoryId(category.id);
  const parentPreviewProducts = hasChildren
    ? await getProductsByCategoryId(category.id, 6)
    : [];
  const intro = getCategoryDescription(category);

  const breadcrumbItems = [
    { label: "Početna", href: "/" },
    { label: "Kategorije", href: "/kategorije" },
    ...ancestors.map((ancestor) => ({
      label: ancestor.name,
      href: `/kategorije/${ancestor.slug}`,
    })),
    { label: category.name },
  ];

  return (
    <section className="flow-section relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel overflow-hidden rounded-4xl p-6 sm:p-8 lg:p-10">
          <CategoryBreadcrumbs items={breadcrumbItems} />

          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="section-eyebrow">
                {category.parent === 0 ? "Glavna kategorija" : "Potkategorija"}
              </p>

              <h1 className="theme-heading mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {category.name}
              </h1>

              <p className="theme-body mt-5 max-w-2xl text-base leading-8 sm:text-lg">
                {intro}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/kategorije"
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  Nazad na kategorije
                </Link>

                {ancestors.length > 0 ? (
                  <Link
                    href={`/kategorije/${ancestors[ancestors.length - 1].slug}`}
                    className="btn-primary inline-flex items-center justify-center gap-2"
                  >
                    Otvorite nadređenu kategoriju
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard
                icon={<FolderTree className="h-5 w-5" />}
                label="Podkategorije"
                value={String(childCategories.length)}
              />
              <StatCard
                icon={<Boxes className="h-5 w-5" />}
                label="Artikli"
                value={String(category.count)}
              />
              <StatCard
                icon={<Layers3 className="h-5 w-5" />}
                label="Prikaz"
                value={hasChildren ? "Hijerarhija" : "Proizvodi"}
              />
            </div>
          </div>
        </div>

        {hasChildren ? (
          <section className="flow-subsection relative py-10 sm:py-12">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-eyebrow">Podkategorije</p>
                <h2 className="theme-heading mt-3 text-2xl font-semibold sm:text-3xl">
                  Izaberite užu oblast iz kategorije {category.name}
                </h2>
                <p className="theme-body-muted mt-3 max-w-3xl text-base leading-8">
                  Stranica prvo vodi kroz podkategorije kako bi pregled asortimana
                  bio jasniji i lakši za skeniranje.
                </p>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              {childCategories.map((childCategory) => (
                <CategoryCard
                  key={childCategory.id}
                  category={childCategory}
                  categories={categories}
                  href={`/kategorije/${childCategory.slug}`}
                />
              ))}
            </div>
          </section>
        ) : null}

        {hasChildren && parentPreviewProducts.length > 0 ? (
          <ProductGridSection
            title={`Izdvojeni proizvodi iz kategorije ${category.name}`}
            description="Prikazani su direktno dodeljeni proizvodi iz ove kategorije, bez cena, kupovine i prodajnog interfejsa."
            products={parentPreviewProducts}
            categories={categories}
          />
        ) : null}

        {!hasChildren ? (
          <ProductGridSection
            title={`Proizvodi u kategoriji ${category.name}`}
            description="Proizvodi su prikazani u read-only grid rasporedu sa slikom, kratkim opisom, kategorijom, potkategorijom i brendom."
            products={products}
            categories={categories}
          />
        ) : null}
      </div>
    </section>
  );
}

function StatCard({
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
