import Link from "next/link";
import {
  BriefcaseBusiness,
  Boxes,
  ShieldCheck,
  PhoneCall,
  ArrowRight,
} from "lucide-react";

export function BusinessOverviewSection() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel overflow-hidden rounded-4xl p-6 sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="section-eyebrow">Corporate overview</p>

              <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-[#f2e9e4] sm:text-4xl">
                Rešenja prilagođena vašem poslovanju
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[#f2e9e4]/68 sm:text-lg">
                Objedinjavamo kvalitetnu ponudu elektromaterijala, stručnu
                podršku i savremena digitalna rešenja kako bismo klijentima
                omogućili efikasniji, pregledniji i sigurniji rad.
              </p>

              <div className="mt-8 rounded-3xl border border-white/10 bg-[#22223b]/70 p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#4a4e69] text-[#f2e9e4]">
                    <ShieldCheck className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-[#f2e9e4]">
                      Vaš partner za sigurnu i profesionalnu saradnju
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#f2e9e4]/65 sm:text-base">
                      Fokusirani smo na pouzdanost, preglednu ponudu i kvalitetnu
                      poslovnu komunikaciju kroz svaki korak saradnje.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/usluge"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  Pogledajte usluge
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/kontakt"
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  Kontaktirajte nas
                  <PhoneCall className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <OverviewCard
                icon={<BriefcaseBusiness className="h-5 w-5" />}
                eyebrow="Usluge"
                title="Stručna podrška"
                description="Jasna i efikasna pomoć pri izboru odgovarajućih rešenja za različite tipove projekata i poslovnih potreba."
                href="/usluge"
              />

              <OverviewCard
                icon={<Boxes className="h-5 w-5" />}
                eyebrow="Kategorije"
                title="Pregledna ponuda"
                description="Lakše pronalaženje proizvoda kroz organizovane kategorije i logičnu strukturu sadržaja."
                href="/kategorije"
              />

              <OverviewCard
                icon={<ShieldCheck className="h-5 w-5" />}
                eyebrow="Proizvodi"
                title="Kvalitetan izbor"
                description="Ponuda koja podržava različite zahteve, uz fokus na pouzdanost, funkcionalnost i dostupnost."
                href="/proizvodi"
              />

              <OverviewCard
                icon={<PhoneCall className="h-5 w-5" />}
                eyebrow="Kontakt"
                title="Brza komunikacija"
                description="Jednostavan način da nas kontaktirate, postavite upit i dobijete pravovremene informacije."
                href="/kontakt"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OverviewCard({
  icon,
  eyebrow,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-white/10 bg-white/5 p-5 transition duration-200 hover:-translate-y-0.5 hover:bg-white/7"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#c9ada7]/18 text-[#f2e9e4]">
        {icon}
      </div>

      <p className="mt-5 text-xs uppercase tracking-[0.18em] text-[#9a8c98]">
        {eyebrow}
      </p>

      <h3 className="mt-2 text-xl font-semibold text-[#f2e9e4]">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-[#f2e9e4]/65 sm:text-base">
        {description}
      </p>

      <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#c9ada7] transition duration-200 group-hover:translate-x-1">
        Saznajte više
        <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}