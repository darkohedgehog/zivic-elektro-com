import { CorporatePage } from "@/components/shared/CorporatePage";

const items = [
  {
    title: "Jasan kontakt put",
    description:
      "Kontakt stranica koristi isti vizuelni sistem kako bi poziv na akciju ostao pregledan i nenametljiv.",
  },
  {
    title: "Poverenje kroz dizajn",
    description:
      "Mekši borderi, smiren kontrast i ozbiljna paleta podržavaju osećaj stabilnosti i kredibiliteta.",
  },
  {
    title: "Priprema za forme",
    description:
      "Raspored je spreman za kasnije dodavanje forme, kontakt kartica i radnog vremena bez refaktora.",
  },
  {
    title: "Responsive struktura",
    description:
      "Sekcije su postavljene tako da zadrže preglednost i na manjim ekranima i u produkcijskom okruženju.",
  },
];

export default function ContactUsPage() {
  return (
    <CorporatePage
      eyebrow="Kontakt"
      title="Kontakt stranica u skladu sa pouzdanim i smirenim corporate identitetom"
      description="Komunikacioni deo sajta sada deli isti ritam, iste površine i isti ton kao ostatak frontend sistema, što korisniku daje osećaj doslednosti i sigurnosti."
      items={items}
    />
  );
}
