import type { Metadata } from "next";
import Link from "next/link";
import { Download, ShoppingBag, Store } from "lucide-react";
import { getPriceLists, getRetailPriceLists } from "@/lib/price-lists-server";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: "Cjenici web trgovine i maloprodaje",
  description:
    "Preuzmite odvojene cjenike web trgovine i maloprodaje Živić Elektro.",
  path: "/cjenici",
});

const dateFormatter = new Intl.DateTimeFormat("hr-HR", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "Europe/Zagreb",
});
const dayFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Zagreb",
});
const retailDateFormatter = new Intl.DateTimeFormat("hr-HR", {
  dateStyle: "long",
  timeZone: "UTC",
});

export default async function PriceListPage() {
  const [webshop, retail] = await Promise.all([
    getPriceLists(),
    getRetailPriceLists(),
  ]);
  const manifest = webshop.status === "ready" ? webshop.manifest : null;
  const [latest, ...archive] = manifest?.publications ?? [];
  const isOlder =
    latest &&
    dayFormatter.format(new Date(latest.publishedAt)) !==
      dayFormatter.format(new Date());

  return (
    <section className="flow-section page-section" aria-labelledby="price-list-title">
      <div className="site-shell">
        <div className="surface-panel rounded-4xl p-6 sm:p-8 lg:p-10">
          <p className="section-eyebrow">Živić Elektro</p>
          <h1
            id="price-list-title"
            className="theme-heading mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Cjenici
          </h1>
          <p className="theme-body mt-6 max-w-3xl text-base leading-8 sm:text-lg">
            Cijene i asortiman web trgovine razlikuju se od maloprodaje.
            Odaberite cjenik odgovarajućeg prodajnog mjesta.
          </p>
        </div>

        <section className="mt-12 sm:mt-16" aria-labelledby="webshop-title">
          <div className="flex items-center gap-4">
            <div className="theme-icon-badge-soft flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 id="webshop-title" className="theme-heading text-2xl font-semibold sm:text-3xl">
              Web trgovina
            </h2>
          </div>
          <p className="theme-body mt-4 max-w-3xl leading-7">
            Preuzmite cijene proizvoda web trgovine u CSV formatu. Cijene su
            izražene u eurima s uključenim PDV-om.
          </p>

          <div className="surface-panel mt-6 rounded-3xl p-6 sm:p-8">
            {webshop.status === "unavailable" ? (
              <div role="status">
                <h3 className="theme-heading text-xl font-semibold">Cjenik trenutačno nije dostupan</h3>
                <p className="theme-body mt-3 leading-7">
                  Pokušajte ponovno kasnije ili nam se obratite za informacije o cijenama.
                </p>
                <Link href="/kontakt" className="btn-secondary mt-5">Kontaktirajte nas</Link>
              </div>
            ) : !latest ? (
              <div role="status">
                <h3 className="theme-heading text-xl font-semibold">Cjenik još nije objavljen</h3>
                <p className="theme-body mt-3 leading-7">
                  Nakon objave ovdje ćete moći preuzeti cjenik web trgovine.
                </p>
              </div>
            ) : (
              <>
                <h3 className="theme-heading text-xl font-semibold">Posljednja objava</h3>
                <p className="theme-body mt-3">
                  {manifest?.store.name}{manifest?.store.address && ` · ${manifest.store.address}`}
                </p>
                <p className="theme-body mt-3">
                  Objavljeno: <time dateTime={latest.publishedAt}>{dateFormatter.format(new Date(latest.publishedAt))}</time>
                </p>
                <p className="theme-body-muted mt-2 text-sm">Broj artikala: {latest.productCount}</p>
                {isOlder && (
                  <p className="mt-4 text-amber-200" role="status">
                    Posljednja dostupna objava nije od današnjeg datuma. Provjerite datum cjenika prije korištenja.
                  </p>
                )}
                <a href={latest.url} className="btn-primary mt-6">
                  <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Preuzmi cjenik (CSV)
                </a>
              </>
            )}
          </div>

          {archive.length > 0 && (
            <section className="mt-8" aria-labelledby="archive-title">
              <h3 id="archive-title" className="theme-heading text-xl font-semibold">Prethodni cjenici</h3>
              <ul className="surface-panel-muted mt-4 divide-y divide-(--border-soft) rounded-3xl px-6">
                {archive.map((publication) => (
                  <li key={publication.id} className="py-5">
                    <a href={publication.url} className="theme-heading underline underline-offset-4">
                      Cjenik — <time dateTime={publication.publishedAt}>{dateFormatter.format(new Date(publication.publishedAt))}</time> (CSV)
                    </a>
                    <p className="theme-body-muted mt-2 text-sm">{publication.productCount} artikala</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </section>

        <section className="mt-12 border-t border-(--border-soft) pt-12 sm:mt-16 sm:pt-16" aria-labelledby="retail-title">
          <div className="flex items-center gap-4">
            <div className="theme-icon-badge-soft flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
              <Store className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 id="retail-title" className="theme-heading text-2xl font-semibold sm:text-3xl">
              Maloprodaja
            </h2>
          </div>
          <p className="theme-body mt-4 leading-7">
            Cjenici fizičke prodavaonice. Ažuriraju se ručno nakon promjene cijena.
          </p>

          {retail.status === "unavailable" ? (
            <div className="surface-panel mt-6 rounded-3xl p-6 sm:p-8" role="status">
              <p className="theme-body leading-7">
                Maloprodajni cjenici trenutačno nisu dostupni. Pokušajte ponovno kasnije ili nas kontaktirajte.
              </p>
              <Link href="/kontakt" className="btn-secondary mt-5">Kontaktirajte nas</Link>
            </div>
          ) : retail.manifest.files.length === 0 ? (
            <p className="surface-panel theme-body mt-6 rounded-3xl p-6 sm:p-8" role="status">
              Maloprodajni cjenici još nisu objavljeni.
            </p>
          ) : (
            <>
              <p className="theme-body mt-4">
                {retail.manifest.store.name}{retail.manifest.store.address && ` · ${retail.manifest.store.address}`}
              </p>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {retail.manifest.files.map((file) => (
                  <article key={file.kind} className="surface-panel flex flex-col items-start rounded-3xl p-6 sm:p-8">
                    <h3 className="theme-heading text-xl font-semibold">
                      {file.kind === "current" ? "Aktualni cjenik s usporedbom cijena" : "Cijene na referentni datum"}
                    </h3>
                    <p className="theme-body mt-4">
                      {file.kind === "current" ? "Datum cjenika" : "Referentni datum"}: <time dateTime={file.date}>{retailDateFormatter.format(new Date(file.date))}</time>
                    </p>
                    <p className="theme-body-muted mb-6 mt-2 text-sm">
                      Objavljeno: <time dateTime={file.publishedAt}>{dateFormatter.format(new Date(file.publishedAt))}</time>
                    </p>
                    <a href={file.url} className="btn-primary mt-auto">
                      <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
                      Preuzmi {file.kind === "current" ? "cjenik" : "referentne cijene"} ({file.format.toUpperCase()})
                    </a>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </section>
  );
}
