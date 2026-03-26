import { CorporatePage } from "@/components/shared/CorporatePage";

const items = [
  {
    title: "Poverenje i ton",
    description:
      "Stranica o kompaniji koristi vizuelni pristup koji naglašava ozbiljnost, kontinuitet i stabilnost.",
  },
  {
    title: "Jasna priča",
    description:
      "Tekstualni blokovi su postavljeni u miran raspored koji podržava jasnu i nenametljivu komunikaciju.",
  },
  {
    title: "Corporate identitet",
    description:
      "Paleta i tipografija usklađene su da sajt izgleda kao pouzdan poslovni kanal, a ne kao demo prezentacija.",
  },
  {
    title: "Spremno za reference",
    description:
      "Sekcija se lako može proširiti misijom, istorijom, timom ili poslovnim vrednostima bez menjanja sistema.",
  },
];

export default function AboutUsPage() {
  return (
    <CorporatePage
      eyebrow="O nama"
      title="Stranica kompanije oblikovana kroz pouzdan i moderan corporate ton"
      description="O nama više nije samo placeholder ekran, već deo istog vizuelnog sistema koji gradi stabilnost, profesionalnost i poverenje kroz celu aplikaciju."
      items={items}
    />
  );
}
