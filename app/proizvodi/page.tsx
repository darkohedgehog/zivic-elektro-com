import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Boxes, Filter, FolderTree, PackageSearch } from "lucide-react";
import { CategoryBreadcrumbs } from "@/components/categories/CategoryBrowseContent";
import { ProductCard } from "@/components/products/ProductBrowseContent";
import {
  getAllCategories,
  getAllProducts,
  getChildCategories,
  getProductBrand,
  getUniqueBrandsFromProducts,
  resolveProductTaxonomy,
  type WooCategory,
  type WooProduct,
} from "@/lib/woocommerce";

type ProductsPageProps = {
  searchParams: Promise<{
    brand?: string;
    category?: string;
    subcategory?: string;
    sort?: string;
  }>;
};

type SortOption = "newest" | "name-asc" | "name-desc" | "brand-asc";

type SelectOption = {
  value: string;
  label: string;
};

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: "newest", label: "Najnovije prvo" },
  { value: "name-asc", label: "Naziv A-Z" },
  { value: "name-desc", label: "Naziv Z-A" },
  { value: "brand-asc", label: "Brand A-Z" },
];

export const metadata: Metadata = {
  title: "Proizvodi",
  description:
    "Read-only pregled svih WooCommerce proizvoda sa filterima po brandu, kategoriji i podkategoriji, bez cena i kupovine.",
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const [{ brand, category, subcategory, sort }, categories, products] =
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

  const activeFilters = [
    selectedBrand ? `Brand: ${selectedBrand}` : null,
    selectedCategory ? `Kategorija: ${selectedCategory.name}` : null,
    selectedSubcategory
      ? `Podkategorija: ${
          subcategoryOptions.find((item) => item.value === selectedSubcategory)?.label
        }`
      : null,
  ].filter(Boolean);

  const selectedCategoryHasSubcategories = selectedCategory
    ? availableSubcategories.length > 0
    : true;

  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
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

              <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-[#f2e9e4] sm:text-4xl lg:text-5xl">
                Read-only pregled celokupne ponude sa jasnim filterima
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[#f2e9e4]/68 sm:text-lg">
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

        <section className="relative py-10 sm:py-12">
          <div className="surface-panel overflow-hidden rounded-4xl p-5 sm:p-6 lg:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[#f2e9e4] ring-1 ring-white/10">
                <Filter className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#f2e9e4] sm:text-2xl">
                  Filteri i sortiranje
                </h2>
                <p className="mt-1 text-sm leading-7 text-[#f2e9e4]/60">
                  Kombinujte brand, kategoriju i podkategoriju za uži pregled
                  relevantnih proizvoda.
                </p>
              </div>
            </div>

            <form className="grid gap-4 lg:grid-cols-4" method="get">
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
              />

              <FilterField
                label="Sortiranje"
                name="sort"
                value={selectedSort}
                options={SORT_OPTIONS}
                placeholder="Sortiranje"
              />

              <div className="flex flex-col gap-3 lg:col-span-4 lg:flex-row">
                <button type="submit" className="btn-primary">
                  Primenite filtere
                </button>

                <Link href="/proizvodi" className="btn-secondary">
                  Resetujte pregled
                </Link>
              </div>
            </form>
          </div>
        </section>

        <section id="product-results" className="relative py-2 sm:py-4">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-eyebrow">Rezultati</p>
              <h2 className="mt-3 text-2xl font-semibold text-[#f2e9e4] sm:text-3xl">
                {filteredProducts.length} proizvoda u read-only prikazu
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-8 text-[#f2e9e4]/66">
                Svaki proizvod vodi na detaljnu prezentacijsku stranicu sa
                slikama, opisom, kategorijom i brendom.
              </p>
            </div>

            {activeFilters.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.14em] text-[#f2e9e4]/75"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  categories={categories}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-base leading-8 text-[#f2e9e4]/66">
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

function FilterField({
  label,
  name,
  value,
  options,
  placeholder,
  disabled = false,
}: {
  label: string;
  name: string;
  value: string;
  options: SelectOption[];
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-[#f2e9e4]">{label}</span>
      <select
        name={name}
        defaultValue={value}
        disabled={disabled}
        className="rounded-2xl border border-white/10 bg-[#22223b]/70 px-4 py-3 text-sm text-[#f2e9e4] outline-none transition duration-200 focus:border-[#c9ada7] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
