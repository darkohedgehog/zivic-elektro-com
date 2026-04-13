import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineArrowUpRight,
  HiOutlineShieldCheck,
  HiOutlineDocumentText,
  HiOutlineScale,
  HiOutlineMap,
  HiOutlineCodeBracket,
} from "react-icons/hi2";
import { FaFacebookF, FaLinkedinIn, FaFacebookMessenger } from "react-icons/fa6";

const navigation = {
  pages: [
    { label: "Početna", href: "/" },
    { label: "O nama", href: "/o-nama" },
    { label: "Usluge", href: "/usluge" },
    { label: "Kategorije", href: "/kategorije" },
    { label: "Proizvodi", href: "/proizvodi" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  legal: [
    {
      label: "Pravila privatnosti",
      href: "/pravila-privatnosti",
      icon: HiOutlineShieldCheck,
    },
    {
      label: "Uvjeti korištenja",
      href: "/uvjeti-koristenja",
      icon: HiOutlineDocumentText,
    },
    {
      label: "Prigovor",
      href: "/prigovor",
      icon: HiOutlineScale,
    },
    {
      label: "Sitemap.xml",
      href: "/sitemap.xml",
      icon: HiOutlineMap,
    },
  ],
  external: [
    {
      label: "Internetska trgovina",
      href: "https://www.zivic-elektro.shop",
    },
    {
      label: "Hedgehog Web Dev",
      href: "https://www.hedgehogwebdev.com",
    },
  ],
  social: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/?locale=hr_HR",
      icon: FaFacebookF,
    },
    {
      label: "Messenger",
      href: "https://business.facebook.com/latest/inbox/messenger?asset_id=137597493551735&business_id=1133499703746344",
      icon: FaFacebookMessenger,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/darko-%C5%BEivi%C4%87/",
      icon: FaLinkedinIn,
    },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer mt-24 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.2fr_0.9fr_0.9fr_0.9fr] lg:gap-12">
          <div className="min-w-0">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <Image
                  src="/logo.png"
                  alt="Živić-Elektro"
                  width={44}
                  height={44}
                  className="h-auto w-auto"
                />
              </div>

              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.24em] text-[#748CAB]">
                  Živić-Elektro
                </p>
                <p className="mt-1 text-base font-semibold text-[#F0EBD8]">
                  Pouzdana poslovna podrška
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#748CAB]">
              Distribucija elektromaterijala, razvoj web aplikacija i poslovna
              analitika u jednom poslovnom okviru. Gradimo pouzdana rješenja za
              moderne tvrtke i svakodnevne potrebe kupaca.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="https://www.zivic-elektro.shop"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#F0EBD8] transition duration-300 hover:-translate-y-px hover:bg-white/10"
              >
                Internetska trgovina
                <HiOutlineArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-xl border border-[#748CAB]/30 px-4 py-2 text-sm font-medium text-[#748CAB] transition duration-300 hover:-translate-y-px hover:border-[#F0EBD8]/20 hover:text-[#F0EBD8]"
              >
                Kontakt
              </Link>
            </div>
          </div>

          <FooterColumn title="Navigacija">
            {navigation.pages.map((item) => (
              <FooterLink key={item.label} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Informacije">
            {navigation.legal.map((item) => {
              const Icon = item.icon;
              return (
                <FooterLink key={item.label} href={item.href} withIcon>
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </FooterLink>
              );
            })}
          </FooterColumn>

          <FooterColumn title="Poveznice">
            <div className="space-y-3">
              {navigation.external.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-sm text-[#748CAB] transition duration-300 hover:text-[#F0EBD8]"
                >
                  <span>{item.label}</span>
                  <HiOutlineArrowUpRight className="h-4 w-4 shrink-0 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/4 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.2em] text-[#748CAB]">
                Društvene mreže
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                {navigation.social.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                      title={item.label}
                      className="group relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#1D2D44]/70 text-[#8EA3B8] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#748CAB]/60 hover:bg-[#243650] hover:text-[#F0EBD8] hover:shadow-[0_12px_28px_rgba(0,0,0,0.28)]"
                    >
                      <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(240,235,216,0.16),transparent_60%)]" />
                      <Icon className="relative z-10 h-4.5 w-4.5 transition duration-300 group-hover:scale-105" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#748CAB]">
            © {year} Živić-Elektro. Sva prava zadržana.
          </p>

          <Link
            href="https://www.hedgehogwebdev.com"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-sm text-[#748CAB] transition-all duration-300 hover:-translate-y-px hover:border-[#748CAB]/40 hover:bg-white/8 hover:text-[#F0EBD8]"
          >
            <HiOutlineCodeBracket className="h-4 w-4 transition duration-300 group-hover:scale-105" />
            <span>Izradio Hedgehog Web Dev</span>
            <HiOutlineArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-px group-hover:-translate-y-px" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <p className="text-xs uppercase tracking-[0.22em] text-[#748CAB]">
        {title}
      </p>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
  withIcon = false,
}: {
  href: string;
  children: React.ReactNode;
  withIcon?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`text-sm text-[#748CAB] transition duration-300 hover:text-[#F0EBD8] ${
        withIcon ? "inline-flex items-center gap-2" : "block"
      }`}
    >
      {children}
    </Link>
  );
}
