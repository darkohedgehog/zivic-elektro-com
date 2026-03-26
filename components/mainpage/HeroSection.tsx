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
            "linear-gradient(180deg, #22223b 0%, #2b2d4a 45%, #22223b 100%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(242,233,228,0.12) 0, transparent 25%), radial-gradient(circle at 80% 30%, rgba(201,173,167,0.14) 0, transparent 24%), radial-gradient(circle at 70% 80%, rgba(154,140,152,0.12) 0, transparent 28%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(242,233,228,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(242,233,228,0.22) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="absolute top-20 -left-30 h-72 w-72 rounded-full bg-[#c9ada7]/20 blur-3xl" />
      <div className="absolute -right-25 bottom-10 h-80 w-80 rounded-full bg-[#9a8c98]/20 blur-3xl" />
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
      <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#f2e9e4]/90 backdrop-blur-md">
        Profesionalna podrška • Kvalitetna ponuda • Pouzdana saradnja
      </div>

      <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-[#f2e9e4] sm:text-5xl lg:text-6xl">
        Pouzdana rešenja za elektromaterijal i poslovnu podršku
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-8 text-[#f2e9e4]/72 sm:text-lg">
        Kroz pažljivo odabrane proizvode, jasnu ponudu i profesionalan pristup,
        pomažemo klijentima da brže i sigurnije dođu do pravog rešenja za svoj
        projekat.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/proizvodi"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#c9ada7] px-6 py-3 text-sm font-semibold text-[#22223b] transition duration-200 hover:-translate-y-px hover:bg-white"
        >
          Pregled proizvoda
          <ArrowRight className="h-4 w-4" />
        </Link>

        <Link
          href="/kontakt"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#f2e9e4]/18 bg-white/5 px-6 py-3 text-sm font-semibold text-[#f2e9e4] backdrop-blur-sm transition duration-200 hover:-translate-y-px hover:bg-white/10"
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
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c9ada7]/18 text-[#f2e9e4]">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[#f2e9e4]">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-[#f2e9e4]/65">{text}</p>
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
      <div className="absolute -inset-6 rounded-4xl bg-[radial-gradient(circle_at_top_right,rgba(242,233,228,0.16),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(201,173,167,0.18),transparent_35%)] blur-2xl" />

      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/8 p-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-4">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#2b2d4a]/95">
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

          <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-[#22223b]/70 via-[#22223b]/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#22223b]/90 via-[#22223b]/45 to-transparent" />

          <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3">
            <div className="rounded-full border border-white/10 bg-[#22223b]/70 px-3 py-1 text-xs tracking-[0.18em] text-[#f2e9e4]/80 uppercase backdrop-blur-md">
              Corporate visual
            </div>

            <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-[#f2e9e4]/75 backdrop-blur-md">
              Elektromaterijal • Web • BI
            </div>
          </div>

          <div className="absolute right-4 bottom-4 left-4">
            <div className="max-w-md rounded-2xl border border-white/10 bg-[#22223b]/72 p-4 backdrop-blur-md">
              <p className="text-sm font-semibold text-[#f2e9e4]">
                Integrisana podrška za savremeno poslovanje
              </p>
              <p className="mt-2 text-sm leading-6 text-[#f2e9e4]/68">
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