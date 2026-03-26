import { CorporatePage } from "@/components/shared/CorporatePage";

const items = [
  {
    title: "Pregledna organizacija",
    description:
      "Kategorije su zamišljene kao miran navigacioni sloj koji pomaže korisnicima da brže pronađu relevantnu grupu proizvoda.",
  },
  {
    title: "Dosledne kartice",
    description:
      "Isti sistem površina i razmaka korišćen je kako bi se stranice osećale kao deo jedne celine.",
  },
  {
    title: "Mutirani akcenti",
    description:
      "Akcentna boja se koristi štedljivo, samo za naglaske i hijerarhiju, bez prenaglašene dinamike.",
  },
  {
    title: "Spremno za katalog",
    description:
      "Struktura podržava kasnije dodavanje podkategorija, kratkih opisa i navigacionih kartica.",
  },
];

export default function CategoriesPage() {
  return (
    <CorporatePage
      eyebrow="Kategorije"
      title="Kategorije organizovane kao deo konzistentnog corporate iskustva"
      description="Vizuelna struktura kategorija sada prati isti jezik kao navigacija, hero i ostale stranice, što jača utisak reda, kvaliteta i poverenja."
      items={items}
    />
  );
}
