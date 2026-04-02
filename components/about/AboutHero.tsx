import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import { AboutLottie } from "@/components/about/AboutLottie";
import { aboutIntro } from "@/components/about/aboutData";

export function AboutHero() {
  return (
    <section className="flow-section py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel overflow-hidden rounded-4xl p-6 sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
            <div>
              <p className="section-eyebrow">O nama</p>

              <h1 className="theme-heading mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Preporučujemo se u vašem budućem snabdjevanju!
              </h1>

              <p className="theme-body mt-6 max-w-2xl text-base leading-8 sm:text-lg">
                {aboutIntro}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Link href="/kontakt" className="btn-primary w-full px-6 py-3 sm:w-auto">
                  Kontaktirajte nas
                  <PhoneCall className="h-4 w-4" />
                </Link>

                <Link
                  href="/proizvodi"
                  className="btn-secondary w-full px-6 py-3 sm:w-auto"
                >
                  Pregledajte ponudu
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-4xl bg-[radial-gradient(circle_at_top_right,rgba(240,235,216,0.14),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(116,140,171,0.2),transparent_35%)] blur-2xl" />

              <div className="theme-media-shell relative overflow-hidden rounded-4xl p-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-4">
                <div className="theme-media-frame relative overflow-hidden rounded-[1.6rem]">
                  <AboutLottie />
                  <div className="theme-image-top-fade absolute inset-x-0 top-0 h-28" />
                  <div className="theme-image-bottom-fade absolute inset-x-0 bottom-0 h-32" />

                  <div className="absolute left-4 right-4 top-4 flex flex-wrap items-start justify-between gap-3">
                    <div className="theme-chip-overlay theme-body px-3 py-1 text-xs uppercase tracking-[0.18em]">
                      Trgovina • Usluge • Dugogodišnje iskustvo
                    </div>

                    <div className="theme-chip-overlay-muted theme-body-muted px-3 py-1 text-xs">
                      Hrvatska • Od 1998.
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="theme-chip-overlay max-w-lg rounded-2xl p-4">
                      <p className="theme-heading text-sm font-semibold">
                        Stabilna saradnja i pregledna poslovna komunikacija
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
