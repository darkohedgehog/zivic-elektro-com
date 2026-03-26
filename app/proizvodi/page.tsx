import { CorporatePage } from "@/components/shared/CorporatePage";

const items = [
  {
    title: "Pregled ponude",
    description:
      "Stranica je organizovana tako da proizvodi mogu biti predstavljeni jasno, bez vizuelnog opterećenja.",
  },
  {
    title: "Dosledna hijerarhija",
    description:
      "Naslovi, opisi i CTA elementi dele isti ritam kao ostatak sajta, što povećava preglednost.",
  },
  {
    title: "Profesionalan ton",
    description:
      "Paleta i površine održavaju ozbiljan i pouzdan utisak prikladan za corporate prezentaciju.",
  },
  {
    title: "Spreman za širenje",
    description:
      "Struktura je pogodna za kasnije dodavanje filtera, kategorija i detaljnijih product kartica.",
  },
];

export default function ProductsPage() {
  return (
    <CorporatePage
      eyebrow="Proizvodi"
      title="Pregled proizvoda sa jasnim i pouzdanim vizuelnim sistemom"
      description="Stranica proizvoda sada prati isti corporate jezik kao početna strana i navigacija: smirena paleta, mekše površine i pregledan raspored spreman za dalji razvoj kataloga."
      items={items}
    />
  );
}
