import { Store, Warehouse, type LucideIcon } from "lucide-react";

export type ContactLocation = {
  name: string;
  description: string;
  address: string;
  email: string;
  emailHref: string;
  phoneLabel: string;
  phoneHref: string;
  mapHref: string;
  icon: LucideIcon;
};

export const companyName = "Živić-elektro j.d.o.o.";
export const sharedPhoneNumber = "032442992";
export const sharedPhoneLabel = "032 442 992";
export const sharedPhoneHref = `tel:${sharedPhoneNumber}`;
export const shopUrl = "https://www.zivic-elektro.shop";

export const retailMapQuery = "Lokvanjski sokak 6, 32000 Vukovar, Hrvatska";
export const retailMapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(retailMapQuery)}&z=15&output=embed`;
export const retailMapExternalUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(retailMapQuery)}`;

export const locations: ContactLocation[] = [
  {
    name: "Veleprodaja",
    description:
      "Podrška za poslovne upite, narudžbe i informacije o veleprodajnoj ponudi.",
    address: "Županijska 21, Vukovar",
    email: "prodaja@zivic-elektro.com",
    emailHref: "mailto:prodaja@zivic-elektro.com",
    phoneLabel: sharedPhoneLabel,
    phoneHref: sharedPhoneHref,
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=%C5%BDupanijska%2021%2C%20Vukovar",
    icon: Warehouse,
  },
  {
    name: "Maloprodaja",
    description:
      "Za svakodnevnu kupnju, dostupnost proizvoda i informacije o maloprodajnoj lokaciji.",
    address: "Lokvanjski sokak 6, Vukovar",
    email: "maloprodaja@zivic-elektro.com",
    emailHref: "mailto:maloprodaja@zivic-elektro.com",
    phoneLabel: sharedPhoneLabel,
    phoneHref: sharedPhoneHref,
    mapHref: retailMapExternalUrl,
    icon: Store,
  },
];

export const supportItems = [
  {
    title: "Informacije o proizvodima",
    description:
      "Pomažemo u orijentaciji kroz ponudu i odabiru odgovarajućih kategorija i artikala.",
  },
  {
    title: "Poslovna ponuda za tvrtke",
    description:
      "Podrška za veleprodajne upite, suradnju i pripremu poslovnih ponuda za tvrtke.",
  },
  {
    title: "Dostupnost artikala",
    description:
      "Informacije o maloprodajnoj i veleprodajnoj dostupnosti proizvoda i lokacijama preuzimanja.",
  },
  {
    title: "Tehnička podrška",
    description:
      "Dodatna pomoć pri razumijevanju ponude, specifikacija i organizaciji upita prema pravom timu.",
  },
] as const;
