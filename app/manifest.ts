import type { MetadataRoute } from "next";
import {
  DEFAULT_SITE_DESCRIPTION,
  SITE_BACKGROUND_COLOR,
  SITE_NAME,
  SITE_THEME_COLOR,
} from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: DEFAULT_SITE_DESCRIPTION,
    lang: "hr",
    scope: "/",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    prefer_related_applications: false,
    background_color: SITE_BACKGROUND_COLOR,
    theme_color: SITE_THEME_COLOR,
    icons: [
      {
        src: "/icons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/icons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
