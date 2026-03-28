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

export const metadata: Metadata = {
  title: "Kategorije",
  description:
    "Pregled svih glavnih WooCommerce kategorija u read-only prezentacijskom formatu, bez cena i kupovine.",
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();
  const topCategories = getChildCategories(categories, 0);
  const subcategoryCount = categories.length - topCategories.length;

  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
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

              <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-[#f2e9e4] sm:text-4xl lg:text-5xl">
                Pregled glavnih kategorija kroz jasno i read-only corporate iskustvo
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[#f2e9e4]/68 sm:text-lg">
                Sve glavne WooCommerce kategorije prikazane su u prezentacijskom
                formatu, sa fokusom na preglednost, podkategorije i lakše kretanje
                kroz ponudu bez cena, korpe i kupovine.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#9a8c98]">
                    Glavne kategorije
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-[#f2e9e4]">
                    {topCategories.length}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#9a8c98]">
                    Podkategorije
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-[#f2e9e4]">
                    {subcategoryCount}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#9a8c98]">
                    Režim prikaza
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-[#f2e9e4]">
                    Read-only
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <InfoCard
                icon={<FolderTree className="h-5 w-5" />}
                title="Jasna hijerarhija"
                description="Svaka glavna kategorija vodi ka svojoj stranici, gde se prvo prikazuju podkategorije ako postoje."
              />
              <InfoCard
                icon={<Boxes className="h-5 w-5" />}
                title="Bez prodajnih elemenata"
                description="Prikaz služi informisanju i pregledu asortimana, bez cena, korpe i checkout toka."
              />
              <InfoCard
                icon={<PackageSearch className="h-5 w-5" />}
                title="Lakše snalaženje"
                description="Kartice i kratki opisi olakšavaju skeniranje ponude i prelazak ka užim grupama proizvoda."
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <div>
            <p className="section-eyebrow">Sve glavne kategorije</p>
            <h2 className="mt-3 text-2xl font-semibold text-[#f2e9e4] sm:text-3xl">
              Organizovan ulaz u kompletan katalog
            </h2>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#f2e9e4]/68 md:inline-flex">
            Otvorite kategoriju
            <ArrowRight className="h-4 w-4 text-[#c9ada7]" />
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
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
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4a4e69] text-[#f2e9e4]">
        {icon}
      </div>

      <h2 className="mt-5 text-lg font-semibold text-[#f2e9e4]">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-[#f2e9e4]/65">{description}</p>
    </div>
  );
}
