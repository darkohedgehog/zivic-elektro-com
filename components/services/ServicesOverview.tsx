import { overviewItems } from "@/components/services/servicesData";

export function ServicesOverview() {
  return (
    <section className="flow-section py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel rounded-4xl p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="section-eyebrow">Pregled</p>
            <h2 className="theme-heading mt-4 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              Naše ključne oblasti
            </h2>
            <p className="theme-body mt-5 text-base leading-8 sm:text-lg">
              Stranica jasno razdvaja digitalne usluge, analitiku i distribuciju
              elektro materijala kako bi posjetilac odmah razumio gdje se nalazi
              odgovarajuća vrijednost za njegov poslovni kontekst.
            </p>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-3">
            {overviewItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="theme-card-surface rounded-[1.75rem] p-6 sm:p-7"
                >
                  <div className="theme-icon-badge flex h-12 w-12 items-center justify-center rounded-2xl">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="theme-heading mt-6 text-2xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="theme-body-muted mt-4 text-sm leading-7 sm:text-base">
                    {item.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {item.bullets.map((bullet) => (
                      <div
                        key={bullet}
                        className="theme-inline-panel rounded-2xl px-4 py-3 text-sm leading-7"
                      >
                        <span className="theme-body">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
