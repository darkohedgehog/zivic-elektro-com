import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PackageSearch } from "lucide-react";
import {
  getProductBrand,
  getProductDescription,
  getProductImage,
  resolveProductTaxonomy,
  type WooCategory,
  type WooProduct,
} from "@/lib/woocommerce";

export function ProductGridSection({
  title,
  description,
  products,
  categories,
}: {
  title: string;
  description: string;
  products: WooProduct[];
  categories: WooCategory[];
}) {
  return (
    <section className="relative py-10 sm:py-12">
      <div className="surface-panel overflow-hidden rounded-4xl p-5 sm:p-6 lg:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="theme-card-surface theme-heading flex h-10 w-10 items-center justify-center rounded-xl">
            <PackageSearch className="h-5 w-5" />
          </div>

          <div>
            <h2 className="theme-heading text-xl font-semibold sm:text-2xl">
              {title}
            </h2>
            <p className="theme-body-muted mt-1 text-sm leading-7">
              {description}
            </p>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categories={categories}
              />
            ))}
          </div>
        ) : (
          <div className="theme-empty-state rounded-3xl p-5">
            <p className="theme-body-muted text-sm leading-7">
              Trenutno nema izdvojenih proizvoda za ovaj pregled.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export function ProductCard({
  product,
  categories,
}: {
  product: WooProduct;
  categories: WooCategory[];
}) {
  const image = getProductImage(product);
  const taxonomy = resolveProductTaxonomy(product, categories);
  const brand = getProductBrand(product);
  const description = getProductDescription(product);
  const categoryLabel = taxonomy.categoryNames.join(", ") || "Nije izdvojena";
  const subcategoryLabel =
    taxonomy.subcategoryNames.join(", ") || "Osnovna kategorija";

  return (
    <Link
      href={`/proizvodi/${product.slug}`}
      className="theme-card-surface theme-interactive-card group overflow-hidden rounded-3xl"
    >
      <div className="theme-media-frame relative aspect-16/10 overflow-hidden">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt || product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
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
            {categoryLabel}
          </span>

          <span className="theme-chip-muted px-2.5 py-1 text-[11px] uppercase tracking-[0.14em]">
            {subcategoryLabel}
          </span>
        </div>

        <h3 className="theme-heading mt-4 line-clamp-2 text-lg font-semibold">
          {product.name}
        </h3>

        <p className="theme-body-muted mt-3 line-clamp-3 text-sm leading-7">
          {description}
        </p>

        <div className="theme-inline-panel mt-4 grid gap-2 rounded-2xl p-3">
          <div className="flex items-center justify-between gap-3">
            <span className="theme-label text-xs uppercase tracking-[0.16em]">
              Brand
            </span>
            <span className="theme-heading text-right text-sm font-medium">
              {brand}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="theme-chip-muted rounded-2xl px-3 py-2 text-xs uppercase tracking-[0.16em] theme-label-muted">
            Read-only prikaz
          </div>

          <div className="theme-card-link inline-flex items-center gap-2 text-sm font-medium group-hover:translate-x-1">
            Otvorite detalje
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
