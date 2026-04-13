import type { Metadata } from "next";
import { ArrowRight, Boxes, FolderTree, PackageSearch } from "lucide-react";
import {
  CategoryCard,
  CategoryBreadcrumbs,
} from "@/components/categories/CategoryBrowseContent";
import {
  getAllCategories,
  getChildCategories,
} from "@/lib/woocommerce";
import { WebshopCtaPanel } from "@/components/catalog/WebshopCtaPanel";
import { WEBSHOP_BASE_URL } from "@/app/utils/webshopLinks";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Kategorije proizvoda",
  description:
    "Pregled svih glavnih WooCommerce kategorija u prezentacijskom formatu samo za pregled, bez cijena i kupovine.",
  path: "/kategorije",
});

export default async function CategoriesPage() {
  const categories = await getAllCategories();
  const topCategories = getChildCategories(categories, 0);
  const subcategoryCount = categories.length - topCategories.length;

  return (
    <section className="flow-section relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel overflow-hidden rounded-4xl p-6 sm:p-8 lg:p-10">
          <CategoryBreadcrumbs
            items={[
              { label: "Početna", href: "/" },
              { label: "Kategorije" },
            ]}
          />

          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="section-eyebrow">Kategorije</p>

              <h1 className="theme-heading mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Pregled glavnih kategorija kroz jasno iskustvo samo za pregled
              </h1>

              <p className="theme-body mt-5 max-w-2xl text-base leading-8 sm:text-lg">
                Sve glavne WooCommerce kategorije prikazane su u prezentacijskom
                formatu, s fokusom na preglednost, podkategorije i lakše kretanje
                kroz ponudu bez cijena, košarice i kupovine.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <div className="theme-stat-card rounded-2xl px-5 py-4">
                  <p className="theme-label text-xs uppercase tracking-[0.18em]">
                    Glavne kategorije
                  </p>
                  <p className="theme-heading mt-2 text-2xl font-semibold">
                    {topCategories.length}
                  </p>
                </div>

                <div className="theme-stat-card rounded-2xl px-5 py-4">
                  <p className="theme-label text-xs uppercase tracking-[0.18em]">
                    Podkategorije
                  </p>
                  <p className="theme-heading mt-2 text-2xl font-semibold">
                    {subcategoryCount}
                  </p>
                </div>

                <div className="theme-stat-card rounded-2xl px-5 py-4">
                  <p className="theme-label text-xs uppercase tracking-[0.18em]">
                    Režim prikaza
                  </p>
                  <p className="theme-heading mt-2 text-2xl font-semibold">
                    Samo pregled
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <InfoCard
                icon={<FolderTree className="h-5 w-5" />}
                title="Jasna hijerarhija"
                description="Svaka glavna kategorija vodi prema svojoj stranici, gdje se prvo prikazuju podkategorije ako postoje."
              />
              <InfoCard
                icon={<Boxes className="h-5 w-5" />}
                title="Bez prodajnih elemenata"
                description="Prikaz služi informiranju i pregledu asortimana, bez cijena, košarice i naplate."
              />
              <InfoCard
                icon={<PackageSearch className="h-5 w-5" />}
                title="Lakše snalaženje"
                description="Kartice i kratki opisi olakšavaju pregled ponude i prelazak prema užim grupama proizvoda."
              />
            </div>
          </div>
        </div>

        <WebshopCtaPanel
          eyebrow="Online kupovina"
          title="Online kupovina"
          description="Kompletan katalog proizvoda dostupan je u našoj internetskoj trgovini."
          href={WEBSHOP_BASE_URL}
          ctaLabel="Otvori trgovinu"
          caption="Korporativna stranica služi kao pregled i predstavljanje asortimana, dok se kupovina odvija u internetskoj trgovini."
        />

        <div className="flow-subsection mt-10 flex items-center justify-between gap-4">
          <div>
            <p className="section-eyebrow">Sve glavne kategorije</p>
            <h2 className="theme-heading mt-3 text-2xl font-semibold sm:text-3xl">
              Organizovan ulaz u kompletan katalog
            </h2>
          </div>

          <div className="theme-chip-muted hidden gap-2 px-4 py-2 text-sm md:inline-flex">
            Otvorite kategoriju
            <ArrowRight className="theme-label h-4 w-4" />
          </div>
        </div>

        <div className="flow-subsection mt-8 grid gap-6 xl:grid-cols-2">
          {topCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              categories={categories}
              href={`/kategorije/${category.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="theme-stat-card rounded-3xl p-5">
      <div className="theme-icon-badge flex h-11 w-11 items-center justify-center rounded-2xl">
        {icon}
      </div>

      <h2 className="theme-heading mt-5 text-lg font-semibold">{title}</h2>
      <p className="theme-body-muted mt-3 text-sm leading-7">{description}</p>
    </div>
  );
}
