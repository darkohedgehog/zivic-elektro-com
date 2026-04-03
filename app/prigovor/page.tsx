import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Mail,
  PackageSearch,
  PhoneCall,
  RotateCcw,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Povrat robe i reklamacije | Živić-elektro",
  description:
    "Informacije o postupku povrata robe, pisanom prigovoru i kontaktu za podršku.",
};

const processSteps = [
  {
    title: "Pripremite podatke",
    description: "Ime, narudžba, proizvod i razlog reklamacije.",
    icon: ClipboardCheck,
  },
  {
    title: "Pošaljite prigovor",
    description: "Pošaljite email na prodaja@zivic-elektro.com.",
    icon: Mail,
  },
  {
    title: "Obrada zahtjeva",
    description: "Provjeravamo reklamaciju i evidentiramo povrat.",
    icon: PackageSearch,
  },
  {
    title: "Povrat sredstava",
    description: "Nakon primitka robe vraćamo iznos uplaćen za robu.",
    icon: RotateCcw,
  },
] as const;

const checklistItems = [
  "Ime i prezime",
  "E-mail adresu",
  "Broj i datum narudžbe",
  "Naziv proizvoda",
  "Razlog povrata ili reklamacije",
  "Količinu proizvoda",
] as const;

const contactCards = [
  {
    title: "Slanje prigovora",
    value: "prodaja@zivic-elektro.com",
    href: "mailto:prodaja@zivic-elektro.com",
    buttonLabel: "Pošalji prigovor",
    icon: Mail,
    detail: "Za pisani prigovor i slanje svih potrebnih podataka o narudžbi.",
  },
  {
    title: "Dodatne informacije",
    value: "+385 32 442 992",
    href: "tel:+38532442992",
    buttonLabel: "Nazovi podršku",
    icon: PhoneCall,
    detail: "Ako trebate pojašnjenje postupka povrata, reklamacije ili isporuke.",
  },
] as const;

export default function ComplaintPage() {
  return (
    <>
      <ComplaintHero />
      <ComplaintProcessSteps />
      <ReturnPolicyPanel />
      <ComplaintChecklist />
      <ComplaintContactCards />
      <ComplaintHelpCTA />
    </>
  );
}

function ComplaintHero() {
  return (
    <section className="flow-section py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel relative overflow-hidden rounded-4xl p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(240,235,216,0.07),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(116,140,171,0.14),transparent_36%)]" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div className="max-w-4xl">
              <p className="section-eyebrow">Podrška kupcima</p>
              <h1 className="theme-heading mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Povrat robe i reklamacije
              </h1>
              <p className="theme-body mt-6 max-w-3xl text-base leading-8 sm:text-lg">
                Informacije o postupku povrata robe, pisanom prigovoru i
                kontaktu za podršku.
              </p>
            </div>

            <div className="surface-panel-muted rounded-[1.75rem] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#748CAB]">
                Brzi pregled
              </p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[#F0EBD8]/76">
                <p>Prigovor šaljete pisanim putem na službeni email.</p>
                <p>Povrat robe moguć je najduže u roku 8 dana od primitka.</p>
                <p>Podrška je dostupna i telefonski za dodatna pojašnjenja.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComplaintProcessSteps() {
  return (
    <section className="flow-subsection py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="section-eyebrow">Postupak</p>
          <h2 className="section-title mt-4 !text-3xl sm:!text-4xl">
            Kako poslati prigovor
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="surface-panel rounded-[1.75rem] p-5 sm:p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="theme-icon-badge-soft flex h-12 w-12 items-center justify-center rounded-2xl">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#748CAB]">
                    Korak {index + 1}
                  </span>
                </div>

                <h3 className="theme-heading mt-6 text-xl font-semibold">
                  {step.title}
                </h3>
                <p className="theme-body-muted mt-3 text-sm leading-7">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ReturnPolicyPanel() {
  return (
    <section className="flow-subsection py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel rounded-[2rem] border p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-center">
            <div className="max-w-3xl">
              <p className="section-eyebrow">Povrat robe</p>
              <h2 className="theme-heading mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Rok za povrat robe
              </h2>
              <p className="theme-body mt-5 text-base leading-8 sm:text-lg">
                Povrat robe se vrši najduže u roku 8 dana od primitka robe.
                Nakon našeg primitka robe i evidencije greške vraćamo iznos
                uplaćen za robu.
              </p>
            </div>

            <div className="surface-panel-muted rounded-[1.75rem] p-5 sm:p-6">
              <div className="theme-icon-badge flex h-12 w-12 items-center justify-center rounded-2xl">
                <AlertCircle className="h-5 w-5" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#748CAB]">
                Važna informacija
              </p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-[#F0EBD8]">
                8 dana
              </p>
              <p className="mt-2 text-sm leading-7 text-[#F0EBD8]/72">
                Rok se računa od trenutka primitka robe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComplaintChecklist() {
  return (
    <section className="flow-subsection py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel rounded-4xl p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="section-eyebrow">Priprema prigovora</p>
            <h2 className="theme-heading mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Što navesti u pisanom prigovoru
            </h2>
            <p className="theme-body mt-5 text-base leading-8">
              Molimo da tijekom pisanja prigovora ispunite sljedeće podatke:
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {checklistItems.map((item) => (
              <div
                key={item}
                className="theme-card-surface rounded-[1.5rem] p-4 sm:p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="theme-icon-badge-soft mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="theme-heading text-base font-medium">{item}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ComplaintContactCards() {
  return (
    <section className="flow-subsection py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="section-eyebrow">Kontakt podrške</p>
          <h2 className="theme-heading mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Obratite nam se putem kanala koji vam najviše odgovara
          </h2>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {contactCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="surface-panel rounded-[2rem] p-6 sm:p-8"
              >
                <div className="theme-icon-badge-soft flex h-12 w-12 items-center justify-center rounded-2xl">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="theme-heading mt-6 text-2xl font-semibold tracking-tight">
                  {card.title}
                </h3>
                <p className="theme-body-muted mt-3 text-sm leading-7">
                  {card.detail}
                </p>

                <Link
                  href={card.href}
                  className="mt-6 inline-flex text-lg font-medium text-[#F0EBD8] underline decoration-[#748CAB]/45 underline-offset-4 transition hover:decoration-[#F0EBD8]"
                >
                  {card.value}
                </Link>

                <div className="mt-8">
                  <Link href={card.href} className="btn-secondary px-5 py-3">
                    {card.buttonLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ComplaintHelpCTA() {
  return (
    <section className="flow-subsection py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel relative overflow-hidden rounded-4xl p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(240,235,216,0.07),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(116,140,171,0.12),transparent_34%)]" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="section-eyebrow">Dodatna pomoć</p>
              <h2 className="theme-heading mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Trebate dodatnu pomoć?
              </h2>
              <p className="theme-body mt-5 text-base leading-8 sm:text-lg">
                Ako trebate više informacija o povratu robe ili reklamacijama
                posjetite našu kontakt stranicu.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/kontakt" className="btn-primary px-6 py-3">
                Idi na kontakt stranicu
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
