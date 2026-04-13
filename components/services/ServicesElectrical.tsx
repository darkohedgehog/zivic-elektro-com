import Link from "next/link";
import { ArrowRight, Boxes } from "lucide-react";
import { zivicShopUrl } from "@/components/services/servicesData";

export function ServicesElectrical() {
  return (
    <section className="flow-section py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel relative overflow-hidden rounded-4xl p-6 sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(240,235,216,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(116,140,171,0.16),transparent_35%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <div className="theme-icon-badge flex h-12 w-12 items-center justify-center rounded-2xl">
                <Boxes className="h-6 w-6" />
              </div>

              <p className="section-eyebrow mt-6">Elektro materijal</p>
              <h2 className="theme-heading mt-4 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                Distribucija elektromaterijala
              </h2>
              <p className="theme-body mt-5 text-base leading-8 sm:text-lg">
                Dugogodišnje iskustvo u veleprodaji i maloprodaji elektromaterijala omogućava nam stabilnu i pouzdanu ponudu proizvoda za
                instalacije i svakodnevne potrebe kupaca.
              </p>
            </div>

            <div className="theme-feature-box rounded-[1.75rem] p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="theme-inline-panel rounded-2xl px-4 py-4">
                  <p className="theme-label text-xs uppercase tracking-[0.16em]">
                    Poslovni pravac
                  </p>
                  <p className="theme-heading mt-3 text-base font-semibold leading-7">
                    Veleprodaja i maloprodaja
                  </p>
                </div>

                <div className="theme-inline-panel rounded-2xl px-4 py-4">
                  <p className="theme-label text-xs uppercase tracking-[0.16em]">
                    Fokus
                  </p>
                  <p className="theme-heading mt-3 text-base font-semibold leading-7">
                    Stabilna i pouzdana ponuda
                  </p>
                </div>
              </div>

              <p className="theme-body-muted mt-6 text-sm leading-7 sm:text-base">
                Za pregled asortimana, kategorija i proizvoda posjetite našu
                internetsku trgovinu.
              </p>

              <div className="mt-8">
                <Link
                  href={zivicShopUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary w-full px-6 py-3 sm:w-auto"
                >
                  Pogledajte ponudu u trgovini
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
