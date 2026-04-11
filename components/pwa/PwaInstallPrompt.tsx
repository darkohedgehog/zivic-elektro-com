"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

const DISMISS_STORAGE_KEY = "pwaInstallPromptDismissed";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

function readDismissedState() {
  try {
    return window.sessionStorage.getItem(DISMISS_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function persistDismissedState() {
  try {
    window.sessionStorage.setItem(DISMISS_STORAGE_KEY, "true");
  } catch {
    return;
  }
}

export function PwaInstallPrompt() {
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return readDismissedState();
  });
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
      setIsInstalled(false);
    };

    const handleAppInstalled = () => {
      setInstallEvent(null);
      setIsInstalled(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleDismiss = () => {
    persistDismissedState();
    setIsDismissed(true);
  };

  const handleInstall = async () => {
    if (!installEvent) {
      return;
    }

    try {
      await installEvent.prompt();
      const { outcome } = await installEvent.userChoice;

      setInstallEvent(null);

      if (outcome === "dismissed") {
        persistDismissedState();
        setIsDismissed(true);
      }
    } catch {
      setInstallEvent(null);
    }
  };

  if (!installEvent || isDismissed || isInstalled) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed top-24 right-4 z-50 w-[min(22rem,calc(100vw-2rem))] sm:top-28 sm:right-6">
      <aside className="surface-panel pointer-events-auto relative overflow-hidden rounded-3xl border border-white/10 p-4 shadow-[0_24px_70px_rgba(3,6,11,0.36)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(240,235,216,0.08),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(116,140,171,0.16),transparent_38%)]" />

        <div className="relative z-10">
          <div className="flex items-start gap-3">
            <div className="theme-icon-badge-soft flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl">
              <Download className="h-4.5 w-4.5" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="section-eyebrow text-[11px]">PWA</p>
              <h2 className="theme-heading mt-2 text-base font-semibold">
                Instalirajte aplikaciju
              </h2>
              <p className="theme-body-muted mt-2 text-sm leading-6">
                Otvorite stranicu brže i koristite je kao zasebnu desktop
                aplikaciju.
              </p>
            </div>

            <button
              aria-label="Zatvori instalacijski prijedlog"
              className="theme-action-icon inline-flex h-9 w-9 items-center justify-center rounded-xl"
              onClick={handleDismiss}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              className="btn-secondary min-h-11 w-full justify-center px-4 py-2.5 sm:w-auto"
              onClick={handleDismiss}
              type="button"
            >
              Kasnije
            </button>

            <button
              className="btn-primary min-h-11 w-full justify-center px-4 py-2.5 sm:w-auto"
              onClick={() => void handleInstall()}
              type="button"
            >
              Instaliraj
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
