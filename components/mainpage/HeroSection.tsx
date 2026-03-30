"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ArrowRight,
  PhoneCall,
  ShieldCheck,
  BriefcaseBusiness,
  Boxes,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <BackgroundDecor />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <HeroContent />
          <HeroVisualCard />
        </div>
      </div>
    </section>
  );
}

function BackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0D1321 0%, #15253A 45%, #0D1321 100%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(240,235,216,0.08) 0, transparent 24%), radial-gradient(circle at 80% 30%, rgba(116,140,171,0.16) 0, transparent 24%), radial-gradient(circle at 70% 80%, rgba(62,92,118,0.16) 0, transparent 28%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(240,235,216,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(240,235,216,0.18) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="absolute top-20 -left-30 h-72 w-72 rounded-full bg-[#748CAB]/16 blur-3xl" />
      <div className="absolute -right-25 bottom-10 h-80 w-80 rounded-full bg-[#3E5C76]/22 blur-3xl" />
    </div>
  );
}

function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative z-10"
    >
      <div className="theme-pill text-sm">
        Profesionalna podrška • Kvalitetna ponuda • Pouzdana saradnja
      </div>

      <h1 className="theme-heading mt-6 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
        Pouzdana rešenja za elektromaterijal i poslovnu podršku
      </h1>

      <p className="theme-body mt-6 max-w-2xl text-base leading-8 sm:text-lg">
        Kroz pažljivo odabrane proizvode, jasnu ponudu i profesionalan pristup,
        pomažemo klijentima da brže i sigurnije dođu do pravog rešenja za svoj
        projekat.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/proizvodi"
          className="btn-primary px-6 py-3"
        >
          Pregled proizvoda
          <ArrowRight className="h-4 w-4" />
        </Link>

        <Link
          href="/kontakt"
          className="btn-secondary px-6 py-3"
        >
          Kontaktirajte nas
          <PhoneCall className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <InfoPill
          icon={<ShieldCheck className="h-5 w-5" />}
          title="Pouzdanost"
          text="Stabilna saradnja i odgovoran pristup svakom klijentu."
        />
        <InfoPill
          icon={<Boxes className="h-5 w-5" />}
          title="Ponuda"
          text="Pregled kategorija i proizvoda na jednom mestu."
        />
        <InfoPill
          icon={<BriefcaseBusiness className="h-5 w-5" />}
          title="Podrška"
          text="Stručno savetovanje i pomoć pri izboru rešenja."
        />
      </div>
    </motion.div>
  );
}

function InfoPill({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="theme-card-surface rounded-2xl p-4 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="theme-icon-badge-soft flex h-10 w-10 items-center justify-center rounded-xl">
          {icon}
        </div>
        <div>
          <h3 className="theme-heading text-sm font-semibold">{title}</h3>
          <p className="theme-body-muted mt-1 text-sm leading-6">{text}</p>
        </div>
      </div>
    </div>
  );
}

function HeroVisualCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      className="relative"
    >
      <div className="absolute -inset-6 rounded-4xl bg-[radial-gradient(circle_at_top_right,rgba(240,235,216,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(116,140,171,0.18),transparent_35%)] blur-2xl" />

      <div className="theme-media-shell relative overflow-hidden rounded-[28px] p-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-4">
        <div className="theme-media-frame relative overflow-hidden rounded-3xl">
          <div className="relative aspect-4/3 w-full">
            <Image
              src="https://res.cloudinary.com/dhkmlqg4o/image/upload/v1774549229/HeroBanner_d7fdiz.png"
              alt="Vizual koji prikazuje distribuciju elektromaterijala, razvoj web aplikacija i poslovnu analitiku"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

          <div className="theme-image-top-fade absolute inset-x-0 top-0 h-28" />
          <div className="theme-image-bottom-fade absolute inset-x-0 bottom-0 h-32" />

          <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3">
            <div className="theme-chip-overlay theme-body px-3 py-1 text-xs uppercase tracking-[0.18em]">
              Corporate visual
            </div>

            <div className="theme-chip-overlay-muted theme-body-muted px-3 py-1 text-xs">
              Elektromaterijal • Web • BI
            </div>
          </div>

          <div className="absolute right-4 bottom-4 left-4">
            <div className="theme-chip-overlay max-w-md rounded-2xl p-4">
              <p className="theme-heading text-sm font-semibold">
                Integrisana podrška za savremeno poslovanje
              </p>
              <p className="theme-body mt-2 text-sm leading-6">
                Distribucija elektromaterijala, izrada web aplikacija i poslovni
                vizuali prilagođeni potrebama vašeg projekta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
