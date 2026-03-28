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
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[#f2e9e4] ring-1 ring-white/10">
            <PackageSearch className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#f2e9e4] sm:text-2xl">
              {title}
            </h2>
            <p className="mt-1 text-sm leading-7 text-[#f2e9e4]/60">
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
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm leading-7 text-[#f2e9e4]/65">
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
      className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition duration-200 hover:-translate-y-0.5 hover:bg-white/7"
    >
      <div className="relative aspect-16/10 overflow-hidden bg-[#2b2d4a]">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt || product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
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
            {categoryLabel}
          </span>

          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-[#f2e9e4]/70">
            {subcategoryLabel}
          </span>
        </div>

        <h3 className="mt-4 line-clamp-2 text-lg font-semibold text-[#f2e9e4]">
          {product.name}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#f2e9e4]/65">
          {description}
        </p>

        <div className="mt-4 grid gap-2 rounded-2xl border border-white/10 bg-[#22223b]/55 p-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs uppercase tracking-[0.16em] text-[#9a8c98]">
              Brand
            </span>
            <span className="text-right text-sm font-medium text-[#f2e9e4]">
              {brand}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.16em] text-[#9a8c98]">
            Read-only prikaz
          </div>

          <div className="inline-flex items-center gap-2 text-sm font-medium text-[#c9ada7] transition duration-200 group-hover:translate-x-1">
            Otvorite detalje
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
