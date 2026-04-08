"use client";

import { useEffect } from "react";

const SERVICE_WORKER_SCOPE = "/";
const SERVICE_WORKER_URL = "/sw.js";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    const shouldRegisterInCurrentEnvironment =
      process.env.NODE_ENV === "production" || isLocalhost;

    if (
      !shouldRegisterInCurrentEnvironment ||
      !("serviceWorker" in navigator) ||
      (!window.isSecureContext && !isLocalhost)
    ) {
      return;
    }

    void registerServiceWorker();
  }, []);

  return null;
}

async function registerServiceWorker() {
  try {
    const existingRegistration = await navigator.serviceWorker.getRegistration(
      SERVICE_WORKER_SCOPE,
    );

    if (existingRegistration) {
      await existingRegistration.update();
      return;
    }

    await navigator.serviceWorker.register(SERVICE_WORKER_URL, {
      scope: SERVICE_WORKER_SCOPE,
      updateViaCache: "none",
    });
  } catch {
    return;
  }
}
