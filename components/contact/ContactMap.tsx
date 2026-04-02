import Link from "next/link";
import { ExternalLink, MapPin } from "lucide-react";
import {
  retailMapEmbedUrl,
  retailMapExternalUrl,
  retailMapQuery,
} from "@/components/contact/contactData";

export function ContactMap() {
  return (
    <section className="flow-section py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel overflow-hidden rounded-4xl p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="section-eyebrow">Lokacija</p>
              <h2 className="theme-heading mt-4 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                Posetite našu maloprodajnu lokaciju
              </h2>
              <p className="theme-body mt-5 text-base leading-8 sm:text-lg">
                {retailMapQuery}
              </p>
            </div>

            <Link
              href={retailMapExternalUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary w-full px-5 py-3 sm:w-auto"
            >
              Otvorite u Google Maps
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>

          <div className="theme-media-shell mt-8 overflow-hidden rounded-[1.75rem] p-3 sm:p-4">
            <div className="theme-media-frame overflow-hidden rounded-3xl">
              <iframe
                title="Google mapa za Lokvanjski sokak 6, Vukovar"
                src={retailMapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-80 w-full border-0 sm:h-96 lg:h-112"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="theme-inline-panel inline-flex w-fit items-center gap-3 rounded-2xl px-4 py-3">
              <div className="theme-icon-badge-soft flex h-9 w-9 items-center justify-center rounded-xl">
                <MapPin className="h-4 w-4" />
              </div>
              <span className="theme-body text-sm leading-7 sm:text-base">
                Lokvanjski sokak 6, Vukovar
              </span>
            </div>

            <p className="theme-body-muted text-sm leading-7 sm:text-base">
              Maloprodajna lokacija je prikazana kroz čitljivu map sekciju s
              direktnim izlazom prema navigaciji.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
