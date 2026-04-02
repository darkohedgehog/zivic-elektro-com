import Link from "next/link";
import { ArrowRight, Building2, PhoneCall, Store } from "lucide-react";
import { ContactLottie } from "@/components/contact/ContactLottie";
import {
  companyName,
  sharedPhoneHref,
  sharedPhoneLabel,
  shopUrl,
} from "@/components/contact/contactData";

export function ContactHero() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel overflow-hidden rounded-4xl p-6 sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
            <div className="min-w-0">
              <p className="section-eyebrow">Kontakt</p>

              <h1 className="theme-heading mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Kontakt i poslovne informacije
              </h1>

              <p className="theme-body mt-6 max-w-2xl text-base leading-8 sm:text-lg">
                Za informacije o proizvodima, poslovnoj suradnji i ponudi
                elektromaterijala kontaktirajte naš tim ili pregledajte naš
                online shop.
              </p>

              <p className="theme-body-muted mt-4 max-w-2xl text-sm leading-7 sm:text-base">
                Dostupni smo za upite u vezi ponude, proizvoda i poslovne
                suradnje.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <Link
                  href={sharedPhoneHref}
                  className="btn-primary inline-flex min-w-0 w-full items-center justify-center gap-2 px-4 py-3 text-center sm:px-5"
                >
                  <span className="truncate">Nazovite nas</span>
                  <PhoneCall className="h-4 w-4 shrink-0" />
                </Link>

                <Link
                  href={shopUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary inline-flex min-w-0 w-full items-center justify-center gap-2 px-4 py-3 text-center sm:px-5"
                >
                  <span className="truncate">Pregledajte online shop</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </div>

              <div className="theme-feature-box mt-8 rounded-[1.75rem] p-5 sm:p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="theme-inline-panel rounded-2xl px-4 py-4">
                    <div className="flex items-start gap-3">
                      <div className="theme-icon-badge-soft flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="theme-label text-xs uppercase tracking-[0.16em]">
                          Kompanija
                        </p>
                        <p className="theme-heading mt-2 text-sm font-semibold leading-7 sm:text-base">
                          {companyName}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="theme-inline-panel rounded-2xl px-4 py-4">
                    <div className="flex items-start gap-3">
                      <div className="theme-icon-badge-soft flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                        <Store className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="theme-label text-xs uppercase tracking-[0.16em]">
                          Telefonski kontakt
                        </p>
                        <p className="theme-heading mt-2 text-sm font-semibold leading-7 sm:text-base">
                          {sharedPhoneLabel}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative min-w-0">
              <div className="absolute -inset-6 rounded-4xl bg-[radial-gradient(circle_at_top_right,rgba(240,235,216,0.14),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(116,140,171,0.2),transparent_35%)] blur-2xl" />

              <div className="theme-media-shell relative overflow-hidden rounded-4xl p-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-4">
                <div className="theme-media-frame relative overflow-hidden rounded-[1.6rem]">
                  <ContactLottie />
                  <div className="theme-image-top-fade absolute inset-x-0 top-0 h-28" />
                  <div className="theme-image-bottom-fade absolute inset-x-0 bottom-0 h-32" />

                  <div className="absolute left-4 right-4 top-4 flex flex-wrap items-start justify-between gap-3">
                    <div className="theme-chip-overlay theme-body px-3 py-1 text-xs uppercase tracking-[0.18em]">
                      B2B i maloprodajni kontakt
                    </div>

                    <div className="theme-chip-overlay-muted theme-body-muted px-3 py-1 text-xs">
                      Vukovar • Stabilna poslovna podrška
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="theme-chip-overlay max-w-lg rounded-2xl p-4">
                      <p className="theme-heading text-sm font-semibold">
                        Jasna komunikacija za poslovne i prodajne upite
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