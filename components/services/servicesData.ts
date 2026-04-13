import {
  BarChart3,
  Boxes,
  BriefcaseBusiness,
  Database,
  Gauge,
  Globe,
  LayoutDashboard,
  MonitorSmartphone,
  Server,
  ShieldCheck,
  ShoppingCart,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type ServiceOverviewItem = {
  title: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
};

export type ServiceFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const hedgehogWebDevUrl = "https://www.hedgehogwebdev.com";
export const zivicShopUrl = "https://www.zivic-elektro.shop";

export const overviewItems: ServiceOverviewItem[] = [
  {
    title: "Web razvoj",
    description:
      "Web aplikacije, moderne tehnologije i poslovni digitalni alati za suvremenu internetsku prisutnost.",
    bullets: [
      "Web aplikacije",
      "Moderne tehnologije",
      "Poslovni digitalni alati",
    ],
    icon: MonitorSmartphone,
  },
  {
    title: "Power BI & Data analitika",
    description:
      "BI izvještaji, nadzorne ploče i KPI analiza poslovanja prilagođeni operativnim i menadžerskim potrebama.",
    bullets: [
      "BI izvještaji",
      "Dashboardi",
      "KPI i analiza poslovanja",
    ],
    icon: BarChart3,
  },
  {
    title: "Distribucija elektromaterijala",
    description:
      "Veleprodaja, maloprodaja i stabilna, pouzdana ponuda elektromaterijala za različite potrebe kupaca.",
    bullets: [
      "Veleprodaja",
      "Maloprodaja",
      "Stabilna i pouzdana ponuda",
    ],
    icon: Boxes,
  },
];

export const webDevelopmentItems: ServiceFeature[] = [
  {
    title: "Web sajtovi & Web aplikacije",
    description:
      "Digitalna rješenja prilagođena poslovnim ciljevima, uz preglednu strukturu i moderne tehnologije.",
    icon: Globe,
  },
  {
    title: "Landing stranice i prezentacije",
    description:
      "Brze, SEO-usmjerene i konverzijski jasne stranice za kvalitetniji nastup na tržištu.",
    icon: MonitorSmartphone,
  },
  {
    title: "Next.js / React aplikacije",
    description:
      "App Router, i18n i CMS integracije za skalabilna i dugoročno održiva web rješenja.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Internetska trgovina",
    description:
      "Kupovna iskustva, tokovi naplate i poslovne integracije za pregledniju internetsku prodaju.",
    icon: ShoppingCart,
  },
  {
    title: "Administracijski paneli i nadzorne ploče",
    description:
      "Interni alati i operativni paneli za bolji pregled procesa, podataka i poslovnih aktivnosti.",
    icon: LayoutDashboard,
  },
  {
    title: "UI animacije i moderni dizajn",
    description:
      "Konzistentan interfejs, kvalitetno korisničko iskustvo i pažljivo odmjereni vizuelni detalji.",
    icon: ShieldCheck,
  },
];

export const maintenanceItems: ServiceFeature[] = [
  {
    title: "Održavanje i redovita ažuriranja",
    description:
      "Next.js, Node, Strapi i WordPress sustavi održavani kroz stabilne i predvidive nadogradnje.",
    icon: Wrench,
  },
  {
    title: "Analiza performansi",
    description:
      "Lighthouse, Core Web Vitals i optimizacija brzine za kvalitetnije korisničko iskustvo.",
    icon: Gauge,
  },
  {
    title: "Implementacija i DevOps",
    description:
      "VPS, Nginx, pm2 i SSL konfiguracije za pouzdanu implementaciju i stabilan produkcijski rad.",
    icon: Server,
  },
  {
    title: "Sigurnost i nadzor",
    description:
      "Backup strategija, sigurnosne prakse i praćenje sustava radi manjeg operativnog rizika.",
    icon: ShieldCheck,
  },
  {
    title: "Tehničke konzultacije",
    description:
      "Planiranje funkcionalnosti, tehnički smjer razvoja i podrška u donošenju produktnih odluka.",
    icon: BriefcaseBusiness,
  },
];

export const biItems: ServiceFeature[] = [
  {
    title: "BI rješenja za Supply Chain, prodaju i financije",
    description:
      "Razvoj i održavanje BI rješenja prilagođenih operativnim i menadžerskim potrebama.",
    icon: BarChart3,
  },
  {
    title: "Azure Data Warehouse okruženje",
    description:
      "ETL/procedure, transformacije podataka i optimizacija modela u DWH okruženju.",
    icon: Database,
  },
  {
    title: "Dimenzioni modeli",
    description:
      "Dizajniranje i održavanje fact/dimension modela usklađenih s poslovnim procesima.",
    icon: LayoutDashboard,
  },
  {
    title: "DAX mjere i tabularni modeli",
    description:
      "Razvoj i optimizacija DAX kalkulacija za preciznije i korisnije poslovno izvještavanje.",
    icon: Gauge,
  },
  {
    title: "Power BI izvještaji i nadzorne ploče",
    description:
      "Operativne i menadžerske nadzorne ploče za preglednije praćenje rezultata i poslovnih tokova.",
    icon: MonitorSmartphone,
  },
  {
    title: "KPI i analitički zahtjevi",
    description:
      "Suradnja s poslovnim timovima na definiranju KPI-jeva i zahtjeva za kvalitetnu analitiku.",
    icon: BriefcaseBusiness,
  },
];

export const biBadges = [
  "Supply Chain",
  "Prodaja",
  "Financije",
  "Power BI",
  "Azure DWH",
  "KPI i nadzorne ploče",
] as const;
