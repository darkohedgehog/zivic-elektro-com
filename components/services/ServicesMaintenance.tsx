import { maintenanceItems } from "@/components/services/servicesData";

export function ServicesMaintenance() {
  return (
    <section className="flow-section py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel rounded-4xl p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="section-eyebrow">Održavanje i savjetovanje</p>
              <h2 className="theme-heading mt-4 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                Održavanje i tehničko savjetovanje
              </h2>
              <p className="theme-body mt-5 text-base leading-8 sm:text-lg">
                Pored razvoja, pružamo i dugoročnu tehničku podršku, optimizaciju
                i savjetovanje za stabilan rad digitalnih sistema.
              </p>

              <div className="theme-feature-box mt-8 rounded-[1.75rem] p-5 sm:p-6">
                <p className="theme-body-muted text-sm leading-7 sm:text-base">
                  Ova oblast naglašava operativnu zrelost: kontinuirano održavanje,
                  sigurnost, deployment praksa i tehničke konsultacije za
                  dugoročno pouzdane sisteme.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {maintenanceItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="theme-inline-panel rounded-3xl px-5 py-5"
                  >
                    <div className="theme-icon-badge-soft flex h-10 w-10 items-center justify-center rounded-xl">
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
