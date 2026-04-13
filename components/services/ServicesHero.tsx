import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import { hedgehogWebDevUrl } from "@/components/services/servicesData";
import { ServicesLottie } from "./ServicesLottie";

export function ServicesHero() {
  return (
    <section className="flow-section py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel overflow-hidden rounded-4xl p-6 sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
            <div className="min-w-0">
              <p className="section-eyebrow">Usluge</p>

              <h1 className="theme-heading mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Moderne tehnologije, pouzdana distribucija i poslovna analitika
              </h1>

              <p className="theme-body mt-6 max-w-2xl text-base leading-8 sm:text-lg">
                Objedinjujemo dugogodišnje iskustvo u distribuciji elektromaterijala s razvojem modernih web aplikacija i poslovnih BI
                rješenja.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:max-w-xl">
                <Link
                  href="/kontakt"
                  className="btn-primary inline-flex min-w-0 w-full items-center justify-center gap-2 px-4 py-3 text-center sm:px-5"
                >
                  <span className="truncate">Kontaktirajte nas</span>
                  <PhoneCall className="h-4 w-4 shrink-0" />
                </Link>

                <Link
                  href={hedgehogWebDevUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary inline-flex min-w-0 w-full items-center justify-center gap-2 px-4 py-3 text-center sm:px-5"
                >
                  <span className="truncate">Pogledajte projekte</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </div>
            </div>

            <div className="relative min-w-0">
              <div className="absolute -inset-6 rounded-4xl bg-[radial-gradient(circle_at_top_right,rgba(240,235,216,0.14),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(116,140,171,0.2),transparent_35%)] blur-2xl" />

              <div className="theme-media-shell relative overflow-hidden rounded-4xl p-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-4">
                <div className="theme-media-frame relative overflow-hidden rounded-[1.6rem]">
                  <ServicesLottie />

                  <div className="theme-image-top-fade absolute inset-x-0 top-0 h-28" />
                  <div className="theme-image-bottom-fade absolute inset-x-0 bottom-0 h-32" />

                  <div className="absolute left-4 right-4 top-4 flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-3">
                    <div className="theme-chip-overlay theme-body max-w-full px-3 py-1 text-xs uppercase tracking-[0.18em]">
                      Digitalne usluge • BI • Distribucija
                    </div>

                    <div className="theme-chip-overlay-muted theme-body-muted max-w-full px-3 py-1 text-xs">
                      Sveobuhvatan pristup • Više poslovnih pravaca
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="theme-chip-overlay max-w-full rounded-2xl p-4 sm:max-w-lg">
                      <p className="theme-heading text-sm font-semibold leading-6">
                        Tehnički i komercijalni partner u jednom poslovnom okviru
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
