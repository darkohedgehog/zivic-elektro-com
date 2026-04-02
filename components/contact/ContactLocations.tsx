import { locations } from "@/components/contact/contactData";
import { ContactLocationCard } from "@/components/contact/ContactLocationCard";

export function ContactLocations() {
  return (
    <section className="flow-section py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-panel rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="section-eyebrow">Kontakt lokacije</p>
            <h2 className="theme-heading mt-4 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              Veleprodaja i maloprodaja prikazane kroz jasan enterprise raspored
            </h2>
            <p className="theme-body mt-5 text-base leading-8 sm:text-lg">
              Svaka lokacija ima zaseban panel s dovoljno prostora za adresu,
              telefon i email kako bi podaci ostali potpuno čitljivi i na većim
              i na manjim ekranima.
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
