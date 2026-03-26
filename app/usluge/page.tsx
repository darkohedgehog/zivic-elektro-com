import { CorporatePage } from "@/components/shared/CorporatePage";

const items = [
  {
    title: "Stručna podrška",
    description:
      "Usluge mogu biti predstavljene kroz jasan i profesionalan okvir koji naglašava vrednost saradnje.",
  },
  {
    title: "Jasna komunikacija",
    description:
      "Sekcije su postavljene tako da korisnik brzo razume šta dobija i kako može da vas kontaktira.",
  },
  {
    title: "Mirniji kontrast",
    description:
      "Vizuelni ton je sveden, premium i prikladan za ozbiljnu poslovnu prezentaciju.",
  },
  {
    title: "Lakša nadogradnja",
    description:
      "Ovaj raspored je spreman za buduće module kao što su process steps, reference i case study blokovi.",
  },
];

export default function ServicesPage() {
  return (
    <CorporatePage
      eyebrow="Usluge"
      title="Usluge predstavljene kroz čist, smiren i profesionalan interfejs"
      description="Corporate stil je primenjen i na uslužne stranice kako bi pregled, poverenje i razumevanje ponude bili dosledni na svakom koraku korisničkog iskustva."
      items={items}
    />
  );
}
