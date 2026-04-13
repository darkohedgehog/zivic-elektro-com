import { biBadges, biItems } from "@/components/services/servicesData";

export function ServicesBI() {
  return (
    <section className="flow-section py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel rounded-4xl p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="section-eyebrow">BI i analitika</p>
              <h2 className="theme-heading mt-4 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                Power BI & Data izvještaji
              </h2>
              <p className="theme-body mt-5 text-base leading-8 sm:text-lg">
                Razvijamo i održavamo BI rješenja prilagođena poslovnim procesima,
                s fokusom na kvalitetu podataka, preglednost i podršku odlučivanju.
              </p>

              <div className="theme-feature-box mt-8 rounded-[1.75rem] p-5 sm:p-6">
                <p className="theme-body-muted text-sm leading-7 sm:text-base">
                 Pregled poslovnih mogućnosti:
                  model podataka, DWH, DAX, KPI logika i suradnja s poslovnim
                  timovima objedinjeni su u jednom jasnom BI okviru.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {biBadges.map((badge) => (
                  <div key={badge} className="theme-chip-muted px-4 py-2 text-sm">
                    {badge}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {biItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="theme-card-surface rounded-[1.75rem] p-5 sm:p-6"
                  >
                    <div className="theme-icon-badge-soft flex h-11 w-11 items-center justify-center rounded-2xl">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="theme-heading mt-5 text-lg font-semibold">
                      {item.title}
                    </h3>
                    <p className="theme-body-muted mt-3 text-sm leading-7 sm:text-base">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
