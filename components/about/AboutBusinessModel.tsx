import { businessModelItems } from "@/components/about/aboutData";

export function AboutBusinessModel() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel rounded-4xl p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="section-eyebrow">Poslovni model</p>
            <h2 className="theme-heading mt-4 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              Maloprodaja i veleprodaja
            </h2>
            <p className="theme-body mt-5 text-base leading-8 sm:text-lg">
              Svoju djelatnost ostvarujemo kroz dva jasno organizirana poslovna
              pravca, kako bismo osigurali pregledniju komunikaciju i kvalitetniju
              podršku kupcima.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {businessModelItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="theme-card-surface rounded-[1.75rem] p-6 sm:p-7 lg:p-8"
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
