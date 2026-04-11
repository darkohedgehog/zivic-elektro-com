"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { LuCookie } from "react-icons/lu";

const COOKIE_CONSENT_STORAGE_KEY = "cookieConsentV2";
const LEGACY_COOKIE_CONSENT_STORAGE_KEY = "cookieConsent";
const COOKIE_CONSENT_EVENT = "cookie-consent-change";

type CookieConsentChoice = "accepted" | "declined";

function readCookieConsent(): CookieConsentChoice | null {
  try {
    const storedValue =
      window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) ??
      window.localStorage.getItem(LEGACY_COOKIE_CONSENT_STORAGE_KEY);

    if (storedValue === "accepted" || storedValue === "declined") {
      return storedValue;
    }
  } catch {
    return null;
  }

  return null;
}

function persistCookieConsent(choice: CookieConsentChoice) {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, choice);
    window.localStorage.setItem(LEGACY_COOKIE_CONSENT_STORAGE_KEY, choice);
    window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
  } catch {
    return;
  }
}

function subscribeToCookieConsent(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorageChange = (event: StorageEvent) => {
    if (
      event.key === null ||
      event.key === COOKIE_CONSENT_STORAGE_KEY
    ) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener(COOKIE_CONSENT_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener(COOKIE_CONSENT_EVENT, onStoreChange);
  };
}

function useCookieConsent() {
  return useSyncExternalStore(
    subscribeToCookieConsent,
    readCookieConsent,
    () => null,
  );
}

export default function CookiesToast() {
  const consent = useCookieConsent();
  const [isOpen, setIsOpen] = useState(false);
  const shouldShowBanner = consent === null || isOpen;

  const handleConsent = (choice: CookieConsentChoice) => {
    persistCookieConsent(choice);
    setIsOpen(false);
  };

  const reopenToast = () => {
    setIsOpen(true);
  };

  const closeToast = () => {
    setIsOpen(false);
  };

  return (
    <>
      {shouldShowBanner ? (
        <div className="pointer-events-none fixed inset-x-4 bottom-[calc(env(safe-area-inset-bottom)+1rem)] z-50 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-full sm:max-w-xl">
          <aside
            role="dialog"
            aria-live="polite"
            aria-labelledby="cookie-consent-title"
            aria-describedby="cookie-consent-description"
            className="pointer-events-auto relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#1D2D44]/95 p-5 shadow-[0_28px_80px_rgba(3,6,11,0.46)] backdrop-blur-xl sm:p-6"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(240,235,216,0.09),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(116,140,171,0.18),transparent_38%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(240,235,216,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(240,235,216,0.10)_1px,transparent_1px)] bg-size-[28px_28px] opacity-[0.06]" />
              <div className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-white/25 to-transparent" />
            </div>

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-[#F0EBD8]">
                    <LuCookie className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#8EA3B8]">
                      Privatnost
                    </div>

                    <h2
                      id="cookie-consent-title"
                      className="mt-3 text-xl font-semibold tracking-tight text-[#F0EBD8] sm:text-2xl"
                    >
                      Kolačići i privatnost
                    </h2>

                    <p
                      id="cookie-consent-description"
                      className="mt-3 text-sm leading-7 text-[#C7D2E0] sm:text-[0.95rem]"
                    >
                      Koristimo kolačiće za pouzdan rad stranice i ugodnije
                      pregledavanje sadržaja. Možete prihvatiti sve ili zadržati
                      samo nužne kolačiće. Više detalja dostupno je u{" "}
                      <Link
                        href="/pravila-privatnosti"
                        className="font-medium text-[#F0EBD8] underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
                      >
                        Pravilima privatnosti
                      </Link>{" "}
                      i{" "}
                      <Link
                        href="/uvjeti-koristenja"
                        className="font-medium text-[#F0EBD8] underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
                      >
                        Uvjetima korištenja
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                {consent !== null ? (
                  <button
                    type="button"
                    onClick={closeToast}
                    aria-label="Zatvori postavke kolačića"
                    className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#F0EBD8] transition duration-200 hover:bg-white/10"
                  >
                    Zatvori
                  </button>
                ) : null}
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => handleConsent("declined")}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-[#F0EBD8] transition duration-200 hover:bg-white/10 sm:w-auto"
                >
                  Samo nužno
                </button>

                <button
                  type="button"
                  onClick={() => handleConsent("accepted")}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-[#F0EBD8]/90 bg-[#F0EBD8] px-5 py-3 text-sm font-semibold text-[#0D1321] transition duration-200 hover:bg-white sm:w-auto"
                >
                  Prihvati
                </button>
              </div>
            </div>
          </aside>
        </div>
      ) : null}

      {consent !== null && !isOpen ? (
        <button
          type="button"
          onClick={reopenToast}
          aria-label="Otvori postavke kolačića"
          className="group fixed right-4 bottom-[calc(env(safe-area-inset-bottom)+1rem)] z-50 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#1D2D44]/95 text-[#F0EBD8] shadow-[0_18px_40px_rgba(3,6,11,0.35)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-[#243650] sm:right-6"
        >
          <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top,rgba(240,235,216,0.14),transparent_65%)] opacity-0 transition duration-300 group-hover:opacity-100" />
          <LuCookie className="relative z-10 h-5 w-5" />
        </button>
      ) : null}
    </>
  );
}
