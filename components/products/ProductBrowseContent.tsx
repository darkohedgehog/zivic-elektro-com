import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PackageSearch, ShoppingCart } from "lucide-react";
import {
  getProductBrand,
  getProductDescription,
  getProductImage,
  resolveProductTaxonomy,
  type WooCategory,
  type WooProduct,
} from "@/lib/woocommerce";
import { getWebshopProductUrl } from "@/app/utils/webshopLinks";

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
    <section className="flow-subsection relative py-10 sm:py-12">
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
          <div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3">
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
  const webshopUrl = getWebshopProductUrl(product.slug);
  const categoryLabel = taxonomy.categoryNames.join(", ") || "Nije izdvojena";
  const subcategoryLabel =
    taxonomy.subcategoryNames.join(", ") || "Osnovna kategorija";

  return (
    <article className="theme-card-surface theme-interactive-card group h-full overflow-hidden rounded-3xl">
      <Link href={`/proizvodi/${product.slug}`} className="block">
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
      </Link>

      <div className="flex h-full flex-col p-5">
        <div className="flex flex-wrap gap-2">
          <span className="theme-chip px-2.5 py-1 text-[11px] uppercase tracking-[0.14em]">
            {categoryLabel}
          </span>

          <span className="theme-chip-muted px-2.5 py-1 text-[11px] uppercase tracking-[0.14em]">
            {subcategoryLabel}
          </span>
        </div>

        <Link href={`/proizvodi/${product.slug}`} className="block">
          <h3 className="theme-heading mt-4 line-clamp-2 text-lg font-semibold transition duration-200 group-hover:text-white">
            {product.name}
          </h3>
        </Link>

        <p className="theme-body-muted mt-3 line-clamp-3 text-sm leading-7">
          {description}
        </p>

        <div className="theme-inline-panel mt-4 grid gap-2 rounded-2xl p-3">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <span className="theme-label text-xs uppercase tracking-[0.16em]">
              Brend
            </span>
            <span className="theme-heading min-w-0 text-sm font-medium sm:text-right">
              {brand}
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-col items-start gap-3">
          <div className="theme-chip-muted rounded-2xl px-3 py-2 text-xs uppercase tracking-[0.16em] theme-label-muted">
            Samo za pregled
          </div>

          <div className="grid w-full gap-3 sm:grid-cols-2">
            <Link
              href={`/proizvodi/${product.slug}`}
              className="btn-secondary min-h-12 w-full justify-center"
            >
              Detalji
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href={webshopUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary min-h-12 w-full justify-center"
            >
              Kupi u trgovini
              <ShoppingCart className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
