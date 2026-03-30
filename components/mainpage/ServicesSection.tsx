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

            <h2 className="theme-heading mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Usluge koje podržavaju vaše poslovanje
            </h2>

            <p className="theme-body mt-5 max-w-xl text-base leading-8 sm:text-lg">
              Od prodaje elektromaterijala do digitalnih rešenja i poslovnih
              vizuala, fokusirani smo na usluge koje donose veću preglednost,
              efikasnost i sigurnost u radu.
            </p>

            <div className="theme-card-surface mt-8 rounded-3xl p-5">
              <div className="flex items-start gap-4">
                <div className="theme-icon-badge flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                  <ShieldCheck className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="theme-heading text-base font-semibold">
                    Praktična rešenja sa jasnim poslovnim fokusom
                  </h3>
                  <p className="theme-body-muted mt-2 text-sm leading-7 sm:text-base">
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
              accent="from-[#748CAB]/18 to-transparent"
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
              accent="from-[#3E5C76]/20 to-transparent"
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
              accent="from-[#F0EBD8]/10 to-transparent"
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
    <div className="theme-card-surface theme-interactive-card group relative overflow-hidden rounded-[1.75rem] p-6 sm:p-7">
      <div
        className={`pointer-events-none absolute inset-0 bg-linear-to-br ${accent} opacity-100`}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="theme-icon-badge flex h-12 w-12 items-center justify-center rounded-2xl">
            {icon}
          </div>

          <div className="theme-chip px-3 py-1 text-xs uppercase tracking-[0.18em]">
            Corporate service
          </div>
        </div>

        <h3 className="theme-heading mt-6 text-2xl font-semibold">{title}</h3>

        <p className="theme-body-muted mt-4 max-w-2xl text-sm leading-7 sm:text-base">
          {description}
        </p>

        <ul className="mt-6 grid gap-3">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#748CAB]" />
              <span className="theme-body text-sm leading-7 sm:text-base">
                {bullet}
              </span>
            </li>
          ))}
        </ul>

        <Link
          href={href}
          className="theme-card-link mt-7 inline-flex items-center gap-2 text-sm font-medium group-hover:translate-x-1"
        >
          Saznajte više
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
