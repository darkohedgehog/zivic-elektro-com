import Link from "next/link";
import { ArrowRight, PhoneCall, Store } from "lucide-react";
import {
  sharedPhoneHref,
  shopUrl,
} from "@/components/contact/contactData";

export function ContactShopCTA() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(240,235,216,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(116,140,171,0.16),transparent_35%)]" />

          <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <div className="theme-icon-badge-soft flex h-11 w-11 items-center justify-center rounded-2xl">
                <Store className="h-5 w-5" />
              </div>

              <p className="section-eyebrow mt-6">Online shop</p>
              <h2 className="theme-heading mt-4 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                Pregledajte naš online shop
              </h2>
              <p className="theme-body mt-5 text-base leading-8 sm:text-lg">
                Za kompletan pregled proizvoda i kategorija posetite naš online
                shop.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
              <Link
                href={shopUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary w-full px-6 py-3 sm:w-auto"
              >
                Pregledajte ponudu na shopu
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href={sharedPhoneHref}
                className="btn-secondary w-full px-6 py-3 sm:w-auto"
              >
                Kontaktirajte nas
                <PhoneCall className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
