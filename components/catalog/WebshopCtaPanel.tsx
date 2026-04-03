import Link from "next/link";
import { ArrowUpRight, ShoppingCart } from "lucide-react";

type WebshopCtaPanelProps = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  caption: string;
};

export function WebshopCtaPanel({
  eyebrow,
  title,
  description,
  href,
  ctaLabel,
  caption,
}: WebshopCtaPanelProps) {
  return (
    <section className="flow-subsection relative py-10 sm:py-12">
      <div className="surface-panel relative overflow-hidden rounded-4xl p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(240,235,216,0.07),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(116,140,171,0.12),transparent_34%)]" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div className="max-w-3xl">
            <p className="section-eyebrow">{eyebrow}</p>
            <h2 className="theme-heading mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h2>
            <p className="theme-body mt-5 text-base leading-8 sm:text-lg">
              {description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={href}
                target="_blank"
                rel="noreferrer"
                className="btn-primary w-full justify-center sm:w-auto"
              >
                {ctaLabel}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="surface-panel-muted rounded-[1.75rem] p-5 sm:p-6">
            <div className="theme-icon-badge-soft flex h-12 w-12 items-center justify-center rounded-2xl">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#748CAB]">
              Online kupovina
            </p>
            <p className="mt-3 text-sm leading-7 text-[#F0EBD8]/78">{caption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
