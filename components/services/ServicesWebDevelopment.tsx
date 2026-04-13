import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  hedgehogWebDevUrl,
  webDevelopmentItems,
} from "@/components/services/servicesData";

export function ServicesWebDevelopment() {
  return (
    <section className="flow-section py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel rounded-4xl p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="section-eyebrow">Web razvoj</p>
            <h2 className="theme-heading mt-4 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              Web stranice i web aplikacije
            </h2>
            <p className="theme-body mt-5 text-base leading-8 sm:text-lg">
              Razvijamo suvremena digitalna rješenja usmjerena na performanse,
              preglednost i kvalitetno korisničko iskustvo.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {webDevelopmentItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="theme-card-surface rounded-[1.75rem] p-5 sm:p-6 lg:p-7"
                >
                  <div className="theme-icon-badge-soft flex h-11 w-11 items-center justify-center rounded-2xl">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="theme-heading mt-5 text-lg font-semibold sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="theme-body-muted mt-3 text-sm leading-7 sm:text-base">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="theme-feature-box mt-8 rounded-[1.75rem] p-5 sm:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="flex flex-wrap gap-3">
                  <div className="theme-chip-muted px-4 py-2 text-sm">
                    Web aplikacije
                  </div>
                  <div className="theme-chip-muted px-4 py-2 text-sm">
                    Poslovna rješenja
                  </div>
                  <div className="theme-chip-muted px-4 py-2 text-sm">
                    Suvremeni digitalni pristup
                  </div>
                </div>

                <p className="theme-body-muted mt-5 text-sm leading-7 sm:text-base">
                  Poseban fokus stavljamo na rješenja koja objedinjeno pokrivaju
                  tehnologiju, dizajn, sadržaj i operativnu upotrebljivost.
                </p>
              </div>

              <Link
                href={hedgehogWebDevUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary w-full px-6 py-3 sm:w-auto"
              >
                Posjetite Hedgehog Web Dev
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
