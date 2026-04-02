import { brandPartners, productRange } from "@/components/about/aboutData";

export function AboutOffer() {
  return (
    <section className="flow-section py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel rounded-4xl p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="section-eyebrow">Ponuda</p>
            <h2 className="theme-heading mt-4 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              Asortiman i partneri
            </h2>
            <p className="theme-body mt-5 text-base leading-8 sm:text-lg">
              U našoj prodajnoj ponudi možete pronaći proizvode iz asortimana
              firmi koje svojom tradicijom kvaliteta garantiraju sigurnost,
              pouzdanost, ljepotu i stil svojih proizvoda.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <OfferPanel
              eyebrow="Partner brendovi"
              title="Brendovi sa tradicijom kvaliteta"
              items={brandPartners}
            />
            <OfferPanel
              eyebrow="Asortiman proizvoda"
              title="Široka elektro ponuda za različite potrebe"
              items={productRange}
            />
          </div>

          <div className="theme-feature-box mt-8 rounded-[1.75rem] p-5 sm:p-6">
            <p className="theme-body text-base leading-8 sm:text-lg">
              U svojoj ponudi predstavljamo široku lepezu proizvoda prilagođenih
              različitim potrebama kupaca i poslovnih partnera.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function OfferPanel({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: readonly string[];
}) {
  return (
    <div className="theme-card-surface rounded-[1.75rem] p-6 sm:p-7 lg:p-8">
      <p className="theme-label text-xs uppercase tracking-[0.16em]">
        {eyebrow}
      </p>
      <h3 className="theme-heading mt-4 text-xl font-semibold sm:text-2xl">
        {title}
      </h3>

      <div className="mt-6 flex flex-wrap gap-3">
        {items.map((item) => (
          <div
            key={item}
            className="theme-inline-panel rounded-2xl px-4 py-3 text-sm leading-7 sm:text-base"
          >
            <span className="theme-body">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
