import { locations } from "@/components/contact/contactData";
import { ContactLocationCard } from "@/components/contact/ContactLocationCard";

export function ContactLocations() {
  return (
    <section className="flow-section py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel rounded-4xl p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="section-eyebrow">Kontakt lokacije</p>
            <h2 className="theme-heading mt-4 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              Veleprodaja i maloprodaja
            </h2>
            <p className="theme-body mt-5 text-base leading-8 sm:text-lg">
              Svoju djelatnost obavaljamo kroz veleprodaju i maloprodaju, ali smo tu i za sve upite vezane uz razvoj web aplikacija i poslovnu analitiku.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {locations.map((location) => (
              <ContactLocationCard key={location.name} location={location} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
