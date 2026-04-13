import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import { zivicShopUrl } from "@/components/services/servicesData";

export function ServicesFinalCTA() {
  return (
    <section className="flow-section py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel rounded-4xl p-6 sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <p className="section-eyebrow">Završni korak</p>
              <h2 className="theme-heading mt-4 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                Trebate digitalno rješenje ili pouzdanog partnera?
              </h2>
              <p className="theme-body mt-5 text-base leading-8 sm:text-lg">
                Kontaktirajte nas i razgovarajmo o vašem projektu, poslovnim
                potrebama ili odgovarajućem rješenju.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
              <Link href="/kontakt" className="btn-primary w-full px-6 py-3 sm:w-auto">
                Kontaktirajte nas
                <PhoneCall className="h-4 w-4" />
              </Link>

              <Link
                href={zivicShopUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary w-full px-6 py-3 sm:w-auto"
              >
                Online trgovina
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
