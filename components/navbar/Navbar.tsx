"use client";

import type { ReactNode, RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IconChevronDown as ChevronDown,
  IconChevronRight as ChevronRight,
  IconMenu2 as Menu,
  IconX as X,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  desc: string;
  href: string;
};

const solutions: NavItem[] = [
  {
    title: "Proizvodi",
    desc: "Pregled celokupne ponude i dostupnih artikala.",
    href: "/proizvodi",
  },
  {
    title: "Kategorije",
    desc: "Jasno organizovane kategorije za brže snalaženje.",
    href: "/kategorije",
  },
  {
    title: "Usluge",
    desc: "Podrška i profesionalna pomoć pri izboru rešenja.",
    href: "/usluge",
  },
];

const company: NavItem[] = [
  {
    title: "O nama",
    desc: "Kako pristupamo saradnji i kvalitetu usluge.",
    href: "/o-nama",
  },
  {
    title: "Kontakt",
    desc: "Brza komunikacija i jednostavan put do odgovora.",
    href: "/kontakt",
  },
  {
    title: "Početna",
    desc: "Povratak na uvodnu stranu i ključne informacije.",
    href: "/",
  },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const desktopMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!desktopMenuRef.current?.contains(event.target as Node)) {
        setDesktopMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="site-shell">
        <div className="surface-panel rounded-[1.75rem] px-4 sm:px-6">
          <div className="flex h-18 items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="surface-panel-muted rounded-2xl p-2">
                <Image
                  src="/logo.png"
                  alt="Zivic elektro logo"
                  width={54}
                  height={54}
                  priority
                  className="h-auto w-auto"
                />
              </div>
              <div className="hidden sm:block">
                <p className="theme-label text-xs uppercase tracking-[0.22em]">
                  Zivic Elektro
                </p>
                <p className="theme-body-muted mt-1 text-sm">
                  Pouzdana poslovna podrška i pregledna ponuda
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              <DesktopMegaMenu
                menuRef={desktopMenuRef}
                open={desktopMenuOpen}
                onOpenChange={setDesktopMenuOpen}
              />
              <NavLink href="/usluge">Usluge</NavLink>
              <NavLink href="/o-nama">O nama</NavLink>
              <NavLink href="/kontakt">Kontakt</NavLink>
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex">
               <Link href="/kontakt" className="btn-secondary">
               Zatražite ponudu
              </Link>
              </div>
              <button
                type="button"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
                className="theme-action-icon inline-flex size-11 items-center justify-center rounded-xl active:scale-95 md:hidden"
                onClick={() =>
                  setMobileMenuOpen((open) => {
                    const nextOpen = !open;

                    if (!nextOpen) {
                      setMobileSolutionsOpen(false);
                    }

                    return nextOpen;
                  })
                }
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          <MobileMenu
            mobileMenuOpen={mobileMenuOpen}
            mobileSolutionsOpen={mobileSolutionsOpen}
            onSolutionsToggle={() => setMobileSolutionsOpen((open) => !open)}
          />
        </div>
      </div>
    </header>
  );
}

function DesktopMegaMenu({
  menuRef,
  open,
  onOpenChange,
}: {
  menuRef: RefObject<HTMLDivElement | null>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        className="nav-link"
        onClick={() => onOpenChange(!open)}
      >
        Rešenja
        <ChevronDown
          size={16}
          className={cn(
            "ml-1 transition-transform duration-150",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        className={cn(
          "surface-panel absolute top-full left-0 z-20 mt-3 w-152 rounded-3xl p-5 transition-all duration-150",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <NavMenuSection title="Ponuda" items={solutions} />
          <NavMenuSection title="Kompanija" items={company} />
        </div>
      </div>
    </div>
  );
}

function MobileMenu({
  mobileMenuOpen,
  mobileSolutionsOpen,
  onSolutionsToggle,
}: {
  mobileMenuOpen: boolean;
  mobileSolutionsOpen: boolean;
  onSolutionsToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-200 md:hidden",
        mobileMenuOpen
          ? "max-h-192 border-t border-[color:var(--border-soft)] opacity-100"
          : "max-h-0 border-t border-transparent opacity-0",
      )}
      aria-hidden={!mobileMenuOpen}
    >
      <div className="space-y-2 py-4">
        <div className="surface-panel-muted rounded-2xl px-3 py-2">
          <button
            type="button"
            aria-expanded={mobileSolutionsOpen}
            className="theme-heading flex w-full items-center justify-between rounded-xl py-2 text-sm"
            onClick={onSolutionsToggle}
          >
            <span>Rešenja</span>
            <ChevronDown
              size={16}
              className={cn(
                "transition-transform duration-150",
                mobileSolutionsOpen && "rotate-180",
              )}
            />
          </button>

          <div
            className={cn(
              "overflow-hidden transition-all duration-200",
              mobileSolutionsOpen ? "mt-2 max-h-144 opacity-100" : "max-h-0 opacity-0",
            )}
            >
              <MobileMenuSection items={solutions} />
            <div className="theme-divider my-3 h-px" />
            <MobileMenuSection items={company} />
          </div>
        </div>

        <MobileLink href="/usluge">Usluge</MobileLink>
        <MobileLink href="/o-nama">O nama</MobileLink>
        <MobileLink href="/kontakt">Kontakt</MobileLink>

        <Link href="/kontakt" className="btn-primary w-full">
          Zatražite ponudu
        </Link>
      </div>
    </div>
  );
}

function NavMenuSection({
  title,
  items,
}: {
  title: string;
  items: NavItem[];
}) {
  return (
    <div className="surface-panel-muted rounded-[1.25rem] p-4">
      <p className="section-eyebrow">{title}</p>
      <ul className="mt-4 grid gap-2">
        {items.map((item) => (
          <li key={item.title}>
            <Link
              href={item.href}
              className="theme-hover-surface block rounded-2xl px-3 py-3"
            >
              <p className="theme-heading text-sm font-medium">{item.title}</p>
              <p className="theme-body-muted mt-1 text-sm leading-6">
                {item.desc}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileMenuSection({
  items,
}: {
  items: NavItem[];
}) {
  return (
    <ul className="grid gap-2">
      {items.map((item) => (
        <li key={item.title}>
          <Link
            href={item.href}
            className="theme-hover-surface flex items-center justify-between rounded-xl px-3 py-3"
          >
            <div className="min-w-0">
              <p className="theme-heading text-sm font-medium">{item.title}</p>
              <p className="theme-body-muted mt-1 text-sm leading-6">
                {item.desc}
              </p>
            </div>
            <ChevronRight size={16} className="theme-label ml-3 shrink-0" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className="nav-link">
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="surface-panel-muted theme-heading flex items-center justify-between rounded-2xl px-4 py-3 text-sm"
    >
      <span>{children}</span>
      <ChevronRight size={16} className="theme-label" />
    </Link>
  );
}
