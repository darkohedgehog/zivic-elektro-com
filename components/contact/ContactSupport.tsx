import { BadgeCheck, PhoneCall } from "lucide-react";
import {
  sharedPhoneHref,
  sharedPhoneLabel,
  supportItems,
} from "@/components/contact/contactData";

export function ContactSupport() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel rounded-4xl p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="section-eyebrow">Podrška</p>
              <h2 className="theme-heading mt-4 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                Kako vam možemo pomoći
              </h2>
              <p className="theme-body mt-5 text-base leading-8 sm:text-lg">
                Tu smo za informacije o proizvodima, ponudi i poslovnoj
                suradnji.
              </p>

              <div className="theme-feature-box mt-8 rounded-[1.75rem] p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="theme-icon-badge flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                    <PhoneCall className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="theme-heading text-base font-semibold">
                      Brz pristup telefonskoj podršci
                    </p>
                    <a
                      href={sharedPhoneHref}
                      className="theme-card-link mt-3 inline-flex items-center gap-2 text-base font-medium"
                    >
                      {sharedPhoneLabel}
                    </a>
                    <p className="theme-body-muted mt-2 text-sm leading-7">
                      Jedinstveni kontakt broj ostaje dostupan za veleprodajne i
                      maloprodajne upite kada je potreban izravan razgovor.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {supportItems.map((item) => (
                <div
                  key={item.title}
                  className="theme-inline-panel rounded-3xl px-5 py-5"
                >
                  <div className="theme-icon-badge-soft flex h-10 w-10 items-center justify-center rounded-xl">
                    <BadgeCheck className="h-5 w-5" />
                  </div>
                  <h3 className="theme-heading mt-5 text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="theme-body-muted mt-3 text-sm leading-7 sm:text-base">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
