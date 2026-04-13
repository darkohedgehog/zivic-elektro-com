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
    <nav aria-label="Krušne mrvice" className="mb-6">
      <ol className="theme-body-muted flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
            {item.href ? (
              <Link
                href={item.href}
                className="transition duration-200 hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <span className="theme-heading">{item.label}</span>
            )}

            {index < items.length - 1 ? (
              <ChevronRight className="theme-label h-4 w-4" />
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
      className="theme-card-surface theme-interactive-card group overflow-hidden rounded-[1.75rem]"
    >
      <div className="theme-media-frame relative aspect-16/10 overflow-hidden">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt || category.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="theme-body-muted flex h-full items-center justify-center">
            <FolderTree className="h-10 w-10" />
          </div>
        )}

        <div className="theme-image-top-fade absolute inset-x-0 top-0 h-24" />
        <div className="theme-chip-overlay absolute right-4 top-4 px-3 py-1 text-[11px] uppercase tracking-[0.18em] theme-label">
          {category.parent === 0 ? "Glavna kategorija" : "Podkategorija"}
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          <span className="theme-chip px-2.5 py-1 text-[11px] uppercase tracking-[0.14em]">
            {category.count} proizvoda
          </span>

          <span className="theme-chip-muted px-2.5 py-1 text-[11px] uppercase tracking-[0.14em]">
            {childCategories.length} podkategorija
          </span>
        </div>

        <h2 className="theme-heading mt-4 text-xl font-semibold sm:text-2xl">
          {category.name}
        </h2>

        <p className="theme-body-muted mt-3 text-sm leading-7 sm:text-base">
          {description}
        </p>

        <div className="theme-inline-panel mt-5 rounded-3xl p-4">
          <div className="flex items-start gap-3">
            <div className="theme-icon-badge-soft mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
              <Boxes className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="theme-heading text-sm font-semibold">
                Brzi pregled strukture
              </p>

              {childCategories.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {childCategories.slice(0, 4).map((child) => (
                    <span
                      key={child.id}
                      className="theme-chip-muted px-3 py-1 text-xs"
                    >
                      {child.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="theme-body-muted mt-2 text-sm">
                  Kategorija trenutno vodi direktno na prikaz proizvoda.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="theme-card-link mt-5 inline-flex items-center gap-2 text-sm font-medium group-hover:translate-x-1">
          Otvorite pregled
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
