import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Boxes, ChevronRight, FolderTree } from "lucide-react";
import {
  getCategoryDescription,
  getChildCategories,
  type WooCategory,
} from "@/lib/woocommerce";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function CategoryBreadcrumbs({
  items,
}: {
  items: BreadcrumbItem[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-[#f2e9e4]/62">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
            {item.href ? (
              <Link
                href={item.href}
                className="transition duration-200 hover:text-[#f2e9e4]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[#f2e9e4]">{item.label}</span>
            )}

            {index < items.length - 1 ? (
              <ChevronRight className="h-4 w-4 text-[#9a8c98]" />
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function CategoryCard({
  category,
  categories,
  href,
}: {
  category: WooCategory;
  categories: WooCategory[];
  href: string;
}) {
  const childCategories = getChildCategories(categories, category.id);
  const image = category.image;
  const description = getCategoryDescription(category);

  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 transition duration-200 hover:-translate-y-0.5 hover:bg-white/7"
    >
      <div className="relative aspect-16/10 overflow-hidden bg-[#2b2d4a]">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt || category.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[#f2e9e4]/45">
            <FolderTree className="h-10 w-10" />
          </div>
        )}

        <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-[#22223b]/78 via-[#22223b]/30 to-transparent" />
        <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-[#22223b]/72 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#c9ada7] backdrop-blur-md">
          {category.parent === 0 ? "Glavna kategorija" : "Potkategorija"}
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-[#22223b]/70 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-[#c9ada7]">
            {category.count} proizvoda
          </span>

          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-[#f2e9e4]/70">
            {childCategories.length} podkategorija
          </span>
        </div>

        <h2 className="mt-4 text-xl font-semibold text-[#f2e9e4] sm:text-2xl">
          {category.name}
        </h2>

        <p className="mt-3 text-sm leading-7 text-[#f2e9e4]/66 sm:text-base">
          {description}
        </p>

        <div className="mt-5 rounded-3xl border border-white/10 bg-[#22223b]/50 p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#c9ada7]/18 text-[#f2e9e4]">
              <Boxes className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#f2e9e4]">
                Brzi pregled strukture
              </p>

              {childCategories.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {childCategories.slice(0, 4).map((child) => (
                    <span
                      key={child.id}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#f2e9e4]/74"
                    >
                      {child.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-[#f2e9e4]/60">
                  Kategorija trenutno vodi direktno na prikaz proizvoda.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#c9ada7] transition duration-200 group-hover:translate-x-1">
          Otvorite pregled
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
