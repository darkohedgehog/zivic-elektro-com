import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Pravila privatnosti i uvjeti korištenja",
  description:
    "Informacije o obradi osobnih podataka, korištenju kolačića i uvjetima korištenja web stranice www.zivic-elektro.com.",
  path: "/pravila-privatnosti",
});

type LegalSection = {
  id: string;
  tocLabel: string;
  title: string;
  paragraphs?: ReactNode[];
  subsections?: LegalSection[];
};

const introParagraphs = [
  "ŽIVIĆ- ELEKTRO j.d.o.o. Vukovar poštuje privatnost svojih korisnika i posjetitelja web stranica. Podatke registriranih korisnika, te ostale podatke o korisniku, ŽIVIĆ- ELEKTRO j.d.o.o. Vukovar neće davati na uvid trećoj strani. Podaci o korisniku neće biti dostupni trećoj strani osim u slučaju kada je takva obaveza regulirana zakonom.",
  "ŽIVIĆ- ELEKTRO j.d.o.o. Vukovar se obavezuje da će čuvati privatnost korisnika web stranica, osim u slučaju teškog kršenja pravila ili nezakonitih aktivnosti korisnika.",
] as const;

const legalSections: LegalSection[] = [
  {
    id: "registrirani-korisnici",
    tocLabel: "Registrirani korisnici",
    title: "Registrirani korisnici",
    paragraphs: [
      "Registrirani korisnik internetske trgovine ŽIVIĆ- ELEKTRO j.d.o.o. Vukovar može biti samo korisnik koji posjeduje korisničko ime i lozinku.",
      "ŽIVIĆ- ELEKTRO j.d.o.o. Vukovar ne može se držati odgovornim za neovlašteno korištenje korisničkog računa, niti eventualnu štetu nastalu na taj način.",
      "ŽIVIĆ- ELEKTRO j.d.o.o. Vukovar zadržava pravo ukinuti ili uskratiti mogućnost korištenja korisničkog računa bez prethodne najave ili/i objašnjenja.",
      "ŽIVIĆ- ELEKTRO j.d.o.o. Vukovar ne snosi odgovornost za štetu nastalu ukidanjem korisničkog računa.",
    ],
  },
  {
    id: "zastita-osobnih-podataka",
    tocLabel: "Zaštita osobnih podataka",
    title:
      "Izjava o zaštiti i prikupljanju osobnih podataka i njihovom korištenju te “kolačića”",
    paragraphs: [
      "Osobni podaci su svi podaci koji se odnose na pojedinca čiji je identitet utvrđen ili se može utvrditi. Pojedinac čiji se identitet može utvrditi jest osoba koja se može identificirati izravno ili neizravno, osobito uz pomoć identifikatora kao što su ime, identifikacijski broj, podaci o lokaciji, mrežni identifikator ili uz pomoć jednog ili više čimbenika svojstvenih za fizički, fiziološki, genetski, mentalni, ekonomski, kulturni ili socijalni identitet tog pojedinca.",
      "ŽIVIĆ- ELEKTRO j.d.o.o. obvezuje se pružati zaštitu osobnim podacima kupaca i korisnika usluga na način da prikuplja samo nužne, osnovne podatke o kupcima/korisnicima, a koji su nužni za ispunjenje naših obveza (podaci o ispunjenju narudžbe); informira kupce o načinu korištenja prikupljenih podataka, redovito daje kupcima mogućnost izbora o upotrebi njihovih podataka, uključujući mogućnost odluke žele li ili ne da se njihovo ime ukloni s lista koje se koriste za marketinške kampanje.",
      "Svi se podaci o korisnicima strogo čuvaju i dostupni su samo djelatnicima kojima su ti podaci nužni za obavljanje posla. Svi djelatnici ŽIVIĆ- ELEKTRO j.d.o.o. i poslovni partneri odgovorni su za poštivanje načela zaštite privatnosti.",
      "Prilikom stvaranja korisničkog računa na www.zivic-elektro.com od vas se traže pojedini osobni podaci, uključujući ime (naziv), adresu, OIB, adresu e-pošte. Adresa e-pošte i lozinka se koristi za prijavu na portal. Vaš je račun na www.zivic-elektro.com zaštićen korisničkim imenom i lozinkom. Korisničko ime i lozinku sustav koristi kako bi provjerio jeste li Vi zaista pretplatnik ili korisnik portala.",
      "Plaćanje koje se obavlja isključivo putem otkupa prilikom preuzimanja robe od predstavnika kurirske službe ako ste fizička osoba, dok tvrtke i obrtnici mogu platiti transakcijski putem virmana po definiranim uvjetima iz kupoprodajnih ugovora. Sve cijene na www.zivic-elektro.com su iskazane sa uračunatim PDV-om. Cijena prijevoza odnosno dostave se prikazuje u konačnom zbiru.",
      "Kupac prihvaćanjem ovih uvjeta kupnje jamči da su uneseni podatci o naručitelju istiniti i ažurni. Sukladno čl. 10. Zakona o zaštiti potrošača, potrošači mogu uložiti pisani prigovor putem elektronske pošte.",
      "Prikupljeni osobni podaci se ne dostavljaju trećim osobama niti komercijalno eksploatiraju od trećih strana i izvan Republike Hrvatske, međutim zadržavamo pravo prijenosa osobnih podataka podružnici, ogranku ili trećoj strani u slučaju reorganizacije, udruživanja ili ustupanja poslova.",
      "www.zivic-elektro.com sadrži dio gdje možete ostaviti komentare pomoću kojeg možete objavljivati informacije i poruke. Imajte na umu kako sve informacije koje na našem web-mjestu objavite kroz takve usluge ili na drugi način mogu postati javne informacije i mogu biti dostupne posjetiteljima web-mjesta i široj javnosti. Potičemo vas na oprez i diskreciju prilikom objavljivanja osobnih podataka ili drugih informacija na našem web-mjestu.",
      "Naše web-mjesto nije namijenjeno pojedincima mlađim od 16 godina te zahtijevamo da nam pojedinci mlađi od 16 godina ne dostavljaju svoje osobne podatke. Ako doznamo da smo prikupili osobne podatke djeteta mlađeg od 16 godina, poduzet ćemo korake da te informacije izbrišemo što je prije moguće, a ako znate za korisnika mlađeg od 16 godina koji se služi našim web-mjestom, obratite nam se u rubrici kontakt.",
      "Možda ćemo s vremena na vrijeme mijenjati ovu Izjavu ili uvjete korištenja kako dodajemo nove proizvode, usluge i aplikacije ili poboljšavamo našu trenutačnu ponudu te kako se tehnologija i zakoni mijenjaju. Datum posljednjeg ažuriranja možete pronaći na dnu ove stranice. Sve će promjene postati važeće nakon što objavimo promjenu na našem web-mjestu. Ako je riječ o materijalnim izmjenama, obavijestit ćemo vas o tome i ako je to potrebno sukladno primjenjivom zakonu, zatražiti vaše dopuštenje.",
      "Vaše osobne podatke čuvat ćemo tijekom razdoblja potrebnog da se ispuni njihova svrha, osim ako je duže čuvanje propisano zakonom.",
      "Za pregled, ispravak, ažuriranje svojih osobnih podataka, svojim osobnim podacima možete pristupiti u „Moj račun“ na glavnom izborniku nakon prijave te ih izmijeniti. Također možete zatražiti brisanje ili ažuriranje Vaših Osobnih podataka i računa putem rubrike „Kontakt“ ili dopisom na službenom papirom poštom.",
      "Sukladno važećem zakonu brzo ćemo odgovoriti na Vaše zahtjeve, zbog Vaše zaštite, možemo provesti samo zahtjeve koji se odnose na osobne podatke, a povezani su s određenom adresom e-pošte koju ste uporabili za slanje zahtjeva, možda ćemo morati provjeriti Vaš identitet prije provođenja zahtjeva. Možemo odbiti provođenje zahtjeva koji ugrožavaju privatnost drugih strana, iznimno su nepraktični ili bismo u njihovom ispunjavanju učinili nešto što nije dopušteno primjenjivim zakonima.",
      "Uz to, u mjeri u kojoj je to dopušteno važećim zakonima, možda ćemo trebati neke osobne podatke čuvati tijekom dužeg vremena za potrebe arhiviranja, poput čuvanja zapisnika o vašim kupnjama za potrebe jamstva ili računovodstva.",
      "Osobni podaci su zaštićeni i čuvaju se dostupnim tehnologijama i procesima. Zahtjeve za pristup, ispravljanje ili brisanje osobnih podataka možete uputiti na našoj stranici za kontakt.",
    ],
  },
  {
    id: "kolacici",
    tocLabel: "Kolačići",
    title: 'Izjava o "kolačićima"',
    paragraphs: [
      "Internet stranica www.zivic-elektro.com koristi kolačiće (eng. ‘cookies’) kako bi korisniku pružili uslugu s potpunim funkcionalnostima. Kolačići su skup podataka koje generira poslužitelj web stranica i koje web preglednik sprema na disk korisnika u obliku male tekstualne datoteke.",
      "Sesijski kolačić se postavlja na računalo posjetitelja Internet stranice www.zivic-elektro.com samo za vrijeme trajanja posjeta našoj Internet stranici kako bi se korisniku omogućila učinkovitija uporaba www.zivic-elektro.com i automatski istječe kada se zatvori svoj preglednik.",
      <>
        www.zivic-elektro.com prate statističku posjećenost radi dobivanja
        nužne informacije o privlačnosti i uspješnosti svojih stranica na
        tržištu. Za to se koristi usluga treće strane pod nazivom Google
        Analytics. Više o tome te regulaciji kolačića koji su za to nužni,
        može se vidjeti na:{" "}
        <a
          href="http://www.google.com/intl/en/analytics/privacyoverview.html"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-[#F0EBD8] underline decoration-[#748CAB]/55 underline-offset-4 transition hover:decoration-[#F0EBD8]"
        >
          http://www.google.com/intl/en/analytics/privacyoverview.html
        </a>
      </>,
      "Internet stranica www.zivic-elektro.com može koristiti kolačiće u svrhu oglašavanja vlastitih usluga ili usluga i proizvoda svojih partnera. To se prikazivanje oglasa omogućuje putem kolačića.",
      "Svi korisnici Internet stranice www.zivic-elektro.com u svakom trenutku mogu samostalno urediti primanje kolačića putem postavki svojeg Internet-preglednika. www.zivic-elektro.com isključuje svaku odgovornost za bilo kakav gubitak funkcionalnosti i/ili kvalitete sadržaja u svim slučajevima odabira regulacije primanja kolačića od strane korisnika.",
      "Korištenjem Internet stranice www.zivic-elektro.com smatra se da su korisnici u svakom trenutku upoznati i suglasni s ovim uvjetima korištenja, uključujući s odredbama o obradi podataka i mogućnostima u vezi s kolačićima.",
      "www.zivic-elektro.com može prikupljati određene podatke o Korisnicima tijekom pristupanja / korištenja www.zivic-elektro.com (IP adresa, session-cookie, ključne riječi korištene kod pretraživanja i sl.), koje koristi za analizu ponašanja Korisnika i rada sustava, kako bi poboljšao rad i funkcionalnost web stranice i njegove sadržaje dodatno usmjerio i prilagodio Korisnicima.",
      "Pružatelj usluge se obvezuje da će u dobroj namjeri koristiti podatke pribavljene od Korisnika, te da pribavljene podatke neće distribuirati trećim osobama. Kupac i korisnik prihvaćanjem ovih uvjeta korištenja i kupnje jamči da je upoznat sa zaštititom i prikupljanjem “kolačića”, svojih osobnih podataka te njihovom korištenju, daje svoju privolu i suglasnost za navedeno korištenje.",
    ],
  },
  {
    id: "uvjeti-koristenja",
    tocLabel: "Uvjeti korištenja",
    title: "Uvjeti korištenja",
    subsections: [
      {
        id: "pruzatelj-usluge",
        tocLabel: "Pružatelj usluge",
        title: "1. Pružatelj usluge",
        paragraphs: [
          "Živić-elektro j.d.o.o., 204. Vukovarske brigade 39, 32000 Vukovar, OIB: 90344764519 (dalje: Pružatelj usluge) svojim korisnicima omogućuje korištenje sadržaja Internet stranice na internetskoj domeni www.zivic-elektro.com, koje je regulirano ovim Uvjetima korištenja (dalje Uvjeti korištenja).",
          "Korisnikom se smatra svaka osoba koja pristupa i/ili koristi stranice www.zivic-elektro.com, bez obzira koristi li besplatne stranice ili stranice za koje je potrebna prijava s korisničkim imenom i lozinkom/zaporkom (dalje: Korisnik).",
        ],
      },
      {
        id: "opce-odredbe",
        tocLabel: "Opće odredbe",
        title: "2. Opće odredbe",
        paragraphs: [
          "Pristupanjem i/ili korištenjem bilo kojeg dijela sadržaja ili servisa koji pripadaju www.zivic-elektro.com smatra se da je Korisnik upoznat s ovim Uvjetima korištenja te da ih u potpunosti razumije i prihvaća. Pružatelj usluge zadržava pravo promjene izgleda, sadržaja i opsega www.zivic-elektro.com, svih usluga, stranica i podstranica koje su sastavni dio stranice kao i ovih Uvjeta korištenja.",
          "Pri korištenju www.zivic-elektro.com Korisnik je u cijelosti dužan poštovati relevantne odredbe ugovora o zasnivanju pretplatničkog odnosa te ovih Uvjeta korištenja. Niti jedan dio sadržaja stranice ne smije se koristiti u nezakonite svrhe ili protivno odredbama ovih Uvjeta korištenja.",
          "Tekstovi objavljeni u bazama znanja predstavljaju autorstvo. Pružatelj usluge ne preuzima odgovornost za bilo kakvu štetu nastalu korisnicima korištenjem www.zivic-elektro.com i njegovog sadržaja, osobito zbog mogućih pogrešaka u prijepisu mišljenja.",
        ],
      },
      {
        id: "intelektualno-vlasnistvo",
        tocLabel: "Intelektualno vlasništvo",
        title: "3. Opseg korištenja i prava intelektualnog vlasništva",
        paragraphs: [
          "Korisnici su upoznati sa sljedećim činjenicama: zbirke dokumenata i pojedinačni dokumenti koji su sastavni dio sadržaja www.zivic-elektro.com mogu biti u cijelosti ili pojedinačno zaštićeni autorskim pravom i drugim propisima. Pojedinačne jedinice, koje su dio sadržaja stranice, mogu imati značaj autorskog djela te su zaštićene autorskim pravom njihovog autora.",
          "Autorska zaštita sadržaja, njegovih pojedinačnih zbirki podataka (baza znanja) i pojedinačnih jedinica u zbirkama, obuhvaća zaštitu u skladu sa Zakonom o autorskom pravu i drugim srodnim pravima. Korisniku je dopušteno korištenje pojedinačnih jedinica objavljenih na stranici isključivo za vlastite potrebe.",
          "Svi oblici daljnje distribucije bilo kojeg dijela www.zivic-elektro.com te umnožavanje, kopiranje odnosno omogućavanje korištenja trećim osobama (npr. reproduciranje u publikacijama, objava na internet stranicama trećih osoba i sl.), izričito su zabranjeni.",
          "Pružatelj usluge polaže autorska prava na vlastite sadržaje (tekstualne sadržaje, grafičke, baze podataka, programski kod i dr.). Neovlašteno korištenje bilo kojeg dijela ovih sadržaja smatra se kršenjem autorskih i drugih prava Pružatelja usluge i www.zivic-elektro.com.",
          "Korisnik odgovara Pružatelju usluge za štetu koja Pružatelju usluge nastane kršenjem odredbi ove glave Uvjeta korištenja, tj. u njemu sadržanih obveza odnosno ograničenja.",
        ],
      },
      {
        id: "korisnicki-racun-i-zaporka",
        tocLabel: "Korisnički račun i zaporka",
        title: "4. Postupak s korisničkim imenom i (lozinkom) zaporkom",
        paragraphs: [
          "Korisnik se obvezuje da će dodijeljenu zaporku čuvati kao poslovnu tajnu te da će zaporku koristiti samo osobno, tj. da iste neće učiniti dostupnima trećim osobama. Korisnik je odgovoran Pružatelju usluge za štetu nastalu pri zloporabi zaporke od strane neovlaštenog korisnika odnosno treće osobe kojoj je omogućio korištenje istima.",
          "Korisnik je obvezan u slučaju saznanja za činjenice koje ukazuju na mogućnost zloporabe zaporke, bez odgode obavijestiti Pružatelja usluge. U slučaju kršenja odredaba Uvjeta korištenja Pružatelj usluge ima pravo ograničiti ili onemogućiti uporabu sadržaja www.zivic-elektro.com.",
        ],
      },
      {
        id: "poveznice-na-druge-stranice",
        tocLabel: "Poveznice na druge stranice",
        title: "5. Povezanost na druge internet stranice",
        paragraphs: [
          "www.zivic-elektro.com može sadržavati i poveznice na druge internet stranice, koje nisu održavane od strane društva. Pružatelj usluge za sadržaj tih stranica ne odgovara.",
        ],
      },
    ],
  },
];

const tocItems = legalSections.flatMap((section) => [
  { id: section.id, label: section.tocLabel },
  ...(section.subsections?.map((subsection) => ({
    id: subsection.id,
    label: subsection.tocLabel,
  })) ?? []),
]);

export default function PrivacyPage() {
  return (
    <div className="flow-section">
      <section className="page-section pt-10 sm:pt-14 lg:pt-20">
        <div className="site-shell">
          <div className="surface-panel relative overflow-hidden rounded-4xl p-6 sm:p-8 lg:p-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(240,235,216,0.08),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(116,140,171,0.14),transparent_34%)]" />
            <div className="relative z-10 max-w-4xl">
              <p className="section-eyebrow">Legal</p>
              <h1 className="section-title mt-4">
                Pravila privatnosti i uvjeti korištenja
              </h1>
              <p className="mt-4 text-sm text-[#8EA3B8] sm:text-base">
                Last updated: 2025.
              </p>
              <p className="section-copy mt-6 max-w-3xl">
                Informacije o obradi osobnih podataka, korištenju kolačića i
                uvjetima korištenja web stranice www.zivic-elektro.com.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flow-subsection pb-20 sm:pb-24">
        <div className="site-shell">
          <div className="mx-auto max-w-4xl">
            <p className="theme-body text-sm leading-7 sm:text-base sm:leading-8">
              Na ovoj stranici objedinjeni su dokumenti Pravila privatnosti i
              Uvjeti korištenja, strukturirani za lakše čitanje i brzo
              pronalaženje pojedinih odredbi bez mijenjanja njihovog pravnog
              značenja.
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-10">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="surface-panel-muted rounded-[1.75rem] p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#748CAB]">
                  Sadržaj
                </p>
                <nav aria-label="Tablica sadržaja" className="mt-4">
                  <ul className="grid gap-2">
                    {tocItems.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={`#${item.id}`}
                          className="theme-hover-surface block rounded-2xl border border-transparent px-3 py-2.5 text-sm leading-6 text-[#F0EBD8]/78 transition hover:border-[#748CAB]/20 hover:text-[#F0EBD8]"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            <article className="surface-panel rounded-4xl p-6 sm:p-8 lg:p-10 mx-auto">
              <div className="max-w-4xl">
                <div className="rounded-3xl border border-[#748CAB]/18 bg-[#0D1321]/36 p-5 sm:p-6 mx-auto">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#748CAB]">
                    Dokument
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#F0EBD8] sm:text-3xl">
                    Pravila privatnosti i uvjeti korištenja web trgovine
                    www.zivic-elektro.com
                  </h2>
                  <div className="mt-5 space-y-4 text-sm leading-7 text-[#F0EBD8]/78 sm:text-base sm:leading-8">
                    {introParagraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div className="mt-10 space-y-10 sm:space-y-12">
                  {legalSections.map((section) => (
                    <LegalSectionBlock key={section.id} section={section} />
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

function LegalSectionBlock({ section }: { section: LegalSection }) {
  return (
    <section id={section.id} className="scroll-mt-32">
      <div className="pb-10">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-[#F0EBD8] sm:text-[1.9rem]">
            {section.title}
          </h2>
          <Link
            href={`#${section.id}`}
            aria-label={`Link na odjeljak ${section.tocLabel}`}
            className="theme-action-icon hidden rounded-full px-3 py-1.5 text-xs text-[#8EA3B8] sm:inline-flex"
          >
            #{section.tocLabel}
          </Link>
        </div>

        {section.paragraphs ? (
          <div className="mt-5 space-y-4 text-sm leading-7 text-[#F0EBD8]/78 sm:text-base sm:leading-8">
            {section.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        ) : null}

        {section.subsections ? (
          <div className="mt-8 space-y-8">
            {section.subsections.map((subsection) => (
              <section
                key={subsection.id}
                id={subsection.id}
                className="scroll-mt-32 rounded-3xl border border-[#748CAB]/14 bg-[#0D1321]/26 p-5 sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold tracking-tight text-[#F0EBD8] sm:text-2xl">
                    {subsection.title}
                  </h3>
                  <Link
                    href={`#${subsection.id}`}
                    aria-label={`Link na odjeljak ${subsection.tocLabel}`}
                    className="theme-action-icon hidden rounded-full px-3 py-1.5 text-xs text-[#8EA3B8] sm:inline-flex"
                  >
                    #{subsection.tocLabel}
                  </Link>
                </div>
                <div className="mt-4 space-y-4 text-sm leading-7 text-[#F0EBD8]/78 sm:text-base sm:leading-8">
                  {subsection.paragraphs?.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
