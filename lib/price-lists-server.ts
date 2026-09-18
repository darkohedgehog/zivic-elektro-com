import "server-only";
import { parsePriceListManifest } from "./price-lists";
import { parseRetailPriceListManifest } from "./retail-price-lists";

const WORDPRESS_BASE_URL = "https://wp.zivic-elektro.shop";

type ManifestResult<T> =
  | { status: "ready"; manifest: T }
  | { status: "unavailable" };

export function getPriceLists() {
  return getManifest("publications", parsePriceListManifest);
}

export function getRetailPriceLists() {
  return getManifest("retail", parseRetailPriceListManifest);
}

async function getManifest<T>(
  endpoint: "publications" | "retail",
  parse: (value: unknown, base: string) => T | null,
): Promise<ManifestResult<T>> {
  try {
    // These endpoints are public and do not need WooCommerce credentials.
    const response = await fetch(
      `${WORDPRESS_BASE_URL}/wp-json/zivic-price-lists/v1/${endpoint}`,
      {
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
        redirect: "error",
        headers: { Accept: "application/json" },
      },
    );

    if (!response.ok) return { status: "unavailable" };

    const manifest = parse(await response.json(), WORDPRESS_BASE_URL);
    return manifest ? { status: "ready", manifest } : { status: "unavailable" };
  } catch {
    return { status: "unavailable" };
  }
}
