import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  MonitorSmartphone,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

export function ServicesSection() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="section-eyebrow">Usluge</p>

            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-[#f2e9e4] sm:text-4xl">
              Usluge koje podržavaju vaše poslovanje
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-[#f2e9e4]/68 sm:text-lg">
              Od prodaje elektromaterijala do digitalnih rešenja i poslovnih
              vizuala, fokusirani smo na usluge koje donose veću preglednost,
              efikasnost i sigurnost u radu.
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#4a4e69] text-[#f2e9e4]">
                  <ShieldCheck className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="text-base font-semibold text-[#f2e9e4]">
                    Praktična rešenja sa jasnim poslovnim fokusom
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#f2e9e4]/65 sm:text-base">
                    Naš pristup se zasniva na pouzdanoj ponudi, funkcionalnim
                    digitalnim alatima i podršci koja klijentima olakšava izbor
                    i donošenje odluka.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/usluge"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Pogledajte sve usluge
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/kontakt"
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                Zatražite informacije
              </Link>
            </div>
          </div>

          <div className="grid gap-5">
            <ServiceCard
              icon={<Boxes className="h-6 w-6" />}
              title="Distribucija elektromaterijala"
              description="Pregledna i pouzdana ponuda proizvoda namenjenih različitim tipovima projekata, uz fokus na dostupnost, kvalitet i jednostavniji izbor."
              bullets={[
                "Organizovana ponuda proizvoda i kategorija",
                "Jasnije snalaženje kroz asortiman",
                "Podrška pri pronalaženju odgovarajućih artikala",
              ]}
              href="/proizvodi"
              accent="from-[#c9ada7]/18 to-transparent"
            />

            <ServiceCard
              icon={<MonitorSmartphone className="h-6 w-6" />}
              title="Izrada web aplikacija"
              description="Savremena web rešenja prilagođena poslovnim potrebama, sa naglaskom na preglednost, funkcionalnost i kvalitetno korisničko iskustvo."
              bullets={[
                "Poslovne i prezentacione web aplikacije",
                "Pregledna struktura sadržaja i ponude",
                "Moderni i responzivni interfejsi",
              ]}
              href="/usluge"
              accent="from-[#9a8c98]/18 to-transparent"
            />

            <ServiceCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="Poslovni vizuali i izveštavanje"
              description="Vizuelni prikaz ključnih podataka kroz dashboard rešenja i poslovne izveštaje koji pomažu boljem praćenju rezultata i donošenju odluka."
              bullets={[
                "Dashboard prikazi za bolju preglednost",
                "Vizualizacija podataka i trendova",
                "Podrška poslovnom odlučivanju",
              ]}
              href="/kontakt"
              accent="from-[#f2e9e4]/12 to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon,
  title,
  description,
  bullets,
  href,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: string[];
  href: string;
  accent: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-6 transition duration-200 hover:-translate-y-0.5 hover:bg-white/7 sm:p-7">
      <div
        className={`pointer-events-none absolute inset-0 bg-linear-to-br ${accent} opacity-100`}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#22223b] text-[#f2e9e4] ring-1 ring-white/10">
            {icon}
          </div>

          <div className="rounded-full border border-white/10 bg-[#22223b]/70 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#c9ada7]">
            Corporate service
          </div>
        </div>

        <h3 className="mt-6 text-2xl font-semibold text-[#f2e9e4]">{title}</h3>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#f2e9e4]/65 sm:text-base">
          {description}
        </p>

        <ul className="mt-6 grid gap-3">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#c9ada7]" />
              <span className="text-sm leading-7 text-[#f2e9e4]/72 sm:text-base">
                {bullet}
              </span>
            </li>
          ))}
        </ul>

        <Link
          href={href}
          className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#c9ada7] transition duration-200 group-hover:translate-x-1"
        >
          Saznajte više
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}