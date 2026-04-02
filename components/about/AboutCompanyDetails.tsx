import { companyDetailGroups } from "@/components/about/aboutData";

export function AboutCompanyDetails() {
  return (
    <section className="flow-section py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel rounded-4xl p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="section-eyebrow">Formalni podaci</p>
            <h2 className="theme-heading mt-4 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              Podaci o tvrtki
            </h2>
            <p className="theme-body mt-5 text-base leading-8 sm:text-lg">
              Poslovni i pravni podaci grupirani su u pregledne kartice kako bi
              ključne informacije o društvu ostale formalne, čitljive i lako
              dostupne.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {companyDetailGroups.map((group) => {
              const Icon = group.icon;

              return (
                <div
                  key={group.title}
                  className="theme-card-surface rounded-[1.75rem] p-6 sm:p-7"
                >
                  <div className="theme-icon-badge flex h-12 w-12 items-center justify-center rounded-2xl">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="theme-heading mt-6 text-xl font-semibold">
                    {group.title}
                  </h3>

                  <div className="mt-6 space-y-4">
                    {group.items.map((item) => (
                      <div
                        key={`${group.title}-${item.label}`}
                        className="theme-inline-panel rounded-2xl px-4 py-4"
                      >
                        <p className="theme-label text-xs uppercase tracking-[0.16em]">
                          {item.label}
                        </p>
                        <p className="theme-heading mt-3 text-sm font-medium leading-7 sm:text-base">
                          {item.value}
                        </p>
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
