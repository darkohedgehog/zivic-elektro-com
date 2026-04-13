import {
  BriefcaseBusiness,
  Building2,
  Factory,
  Globe2,
  Layers3,
  ShieldCheck,
  Store,
  Truck,
  type LucideIcon,
} from "lucide-react";

export type AboutStat = {
  label: string;
  value: string;
  icon: LucideIcon;
};

export type BusinessModelItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type CompanyDetailGroup = {
  title: string;
  icon: LucideIcon;
  items: Array<{
    label: string;
    value: string;
  }>;
};

export const aboutIntro =
  "Živić elektro je tvrtka za trgovinu i usluge u privatnom vlasništvu osnovana 1998. godine u Hrvatskoj. Kroz dugogodišnju prisutnost na tržištu gradimo pouzdanu poslovnu suradnju i nudimo kvalitetna rješenja za potrebe maloprodaje i veleprodaje.";

export const aboutStoryText =
  "Na tržištu Republike Hrvatske nastupamo kao generalni distributeri i uvoznici proizvoda Metalke Majur, lidera u proizvodnji elektro galanterije u ovom dijelu Europe. Fokusirani smo na pouzdanost, kvalitetu ponude i profesionalan odnos prema kupcima i partnerima.";

export const aboutStoryStats: AboutStat[] = [
  {
    label: "Osnovani",
    value: "1998.",
    icon: ShieldCheck,
  },
  {
    label: "Vlasništvo",
    value: "Privatno vlasništvo",
    icon: Building2,
  },
  {
    label: "Uloga",
    value: "Generalni distributeri i uvoznici",
    icon: Truck,
  },
  {
    label: "Tržište",
    value: "Prisutnost u Hrvatskoj",
    icon: Globe2,
  },
];

export const brandPartners = [
  "Metalka Majur",
  "Nopallux",
  "Tehnoelektro",
  "Elid",
] as const;

export const productRange = [
  "utičnice",
  "sklopke",
  "tipkala",
  "utikači",
  "elektro instalacijski pribor",
] as const;

export const businessModelItems: BusinessModelItem[] = [
  {
    title: "Maloprodaja",
    description:
      "Direktan pristup kupcima i ponuda proizvoda za svakodnevne potrebe, uz preglednu dostupnost i jednostavniju kupovinu.",
    icon: Store,
  },
  {
    title: "Veleprodaja",
    description:
      "Podrška poslovnim partnerima, organizirana ponuda i suradnja prilagođena profesionalnim i većim narudžbama.",
    icon: BriefcaseBusiness,
  },
];

export const digitalSolutionsText =
  "Pored osnovne djelatnosti, bavimo se i razvojem modernih web aplikacija, poslovnih digitalnih rješenja i suvremenih internetskih prezentacija. Fokus nam je na funkcionalnosti, preglednosti i rješenjima koja klijentima pomažu da kvalitetnije predstave svoje poslovanje i unaprijede digitalnu prisutnost.";

export const digitalSolutionsHighlights = [
  "Web aplikacije",
  "Digitalna rješenja",
  "Suvremeni poslovni pristup",
] as const;

export const hedgehogWebDevUrl = "https://www.hedgehogwebdev.com";

export const companyDetailGroups: CompanyDetailGroup[] = [
  {
    title: "Osnovni podaci",
    icon: Building2,
    items: [
      { label: "Naziv", value: "ŽIVIĆ-ELEKTRO j.d.o.o." },
      {
        label: "Sjedište",
        value: "204. Vukovarske brigade 39, 32000 Vukovar",
      },
    ],
  },
  {
    title: "Identifikacija",
    icon: Layers3,
    items: [
      { label: "MB", value: "2945894" },
      { label: "OIB", value: "90344764519" },
      {
        label: "MBS (Trgovački sud Osijek)",
        value: "030125449",
      },
    ],
  },
  {
    title: "Poslovni račun",
    icon: Factory,
    items: [
      {
        label: "IBAN",
        value: "HR09 2500 0091 1013 8698 0",
      },
    ],
  },
  {
    title: "Temeljni kapital",
    icon: ShieldCheck,
    items: [
      {
        label: "Kapital",
        value: "1,00 EUR (uplaćen u cijelosti)",
      },
    ],
  },
  {
    title: "Pravna forma",
    icon: BriefcaseBusiness,
    items: [
      {
        label: "Pravno ustrojbeni oblik",
        value: "jednostavno društvo s ograničenom odgovornošću",
      },
      { label: "Brojčana oznaka", value: "49" },
    ],
  },
  {
    title: "Djelatnost",
    icon: Store,
    items: [
      {
        label: "Djelatnost",
        value: "brojčana oznaka razreda 4759",
      },
    ],
  },
];
