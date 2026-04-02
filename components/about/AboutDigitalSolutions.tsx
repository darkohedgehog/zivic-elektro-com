import Link from "next/link";
import { ArrowRight, MonitorSmartphone } from "lucide-react";
import {
  digitalSolutionsHighlights,
  digitalSolutionsText,
  hedgehogWebDevUrl,
} from "@/components/about/aboutData";

export function AboutDigitalSolutions() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel relative overflow-hidden rounded-4xl p-6 sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(240,235,216,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(116,140,171,0.16),transparent_35%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <div className="theme-icon-badge flex h-12 w-12 items-center justify-center rounded-2xl">
                <MonitorSmartphone className="h-6 w-6" />
              </div>

              <p className="section-eyebrow mt-6">Digitalna rješenja</p>
              <h2 className="theme-heading mt-4 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                Digitalna rješenja i izrada web aplikacija
              </h2>
              <p className="theme-body mt-5 text-base leading-8 sm:text-lg">
                {digitalSolutionsText}
              </p>
            </div>

            <div>
              <div className="theme-feature-box rounded-[1.75rem] p-5 sm:p-6">
                <div className="flex flex-wrap gap-3">
                  {digitalSolutionsHighlights.map((item) => (
                    <div
                      key={item}
                      className="theme-chip-muted px-4 py-2 text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <p className="theme-body-muted mt-6 text-sm leading-7 sm:text-base">
                  Ovaj dio poslovanja predstavljen je kao logičan nastavak
                  savremenog poslovnog pristupa: funkcionalna rješenja, pregledna
                  iskustva i kvalitetnija digitalna prezentacija brenda.
                </p>

                <div className="mt-8">
                  <Link
                    href={hedgehogWebDevUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary w-full px-6 py-3 sm:w-auto"
                  >
                    Posetite Hedgehog Web Dev
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
