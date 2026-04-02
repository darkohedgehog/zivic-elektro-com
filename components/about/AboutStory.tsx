import { aboutStoryStats, aboutStoryText } from "@/components/about/aboutData";

export function AboutStory() {
  return (
    <section className="flow-section py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel rounded-4xl p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
              <p className="section-eyebrow">Iskustvo</p>
              <h2 className="theme-heading mt-4 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                Pouzdan partner sa dugogodišnjim iskustvom
              </h2>
              <p className="theme-body mt-5 text-base leading-8 sm:text-lg">
                {aboutStoryText}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {aboutStoryStats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="theme-inline-panel rounded-3xl px-5 py-5"
                  >
                    <div className="theme-icon-badge flex h-11 w-11 items-center justify-center rounded-2xl">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="theme-label mt-5 text-xs uppercase tracking-[0.16em]">
                      {stat.label}
                    </p>
                    <p className="theme-heading mt-3 text-lg font-semibold leading-7 sm:text-xl">
                      {stat.value}
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
