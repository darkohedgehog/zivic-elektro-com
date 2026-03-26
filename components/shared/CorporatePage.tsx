"use client";

type CorporatePageItem = {
  title: string;
  description: string;
};

export function CorporatePage({
  eyebrow,
  title,
  description,
  items,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: CorporatePageItem[];
}) {
  return (
    <section className="page-section">
      <div className="site-shell">
        <div className="surface-panel rounded-[2rem] p-5 sm:p-6 lg:p-8">
          <div className="page-layout gap-8 lg:gap-12">
            <div>
              <p className="section-eyebrow">{eyebrow}</p>
              <h1 className="section-title mt-4">{title}</h1>
              <p className="section-copy mt-6">{description}</p>
            </div>

            <div className="theme-card-grid sm:grid-cols-2">
              {items.map((item) => (
                <div key={item.title} className="theme-card">
                  <h2 className="theme-card-title">{item.title}</h2>
                  <p className="theme-card-copy">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
