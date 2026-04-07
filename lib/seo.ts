import type { Metadata } from "next";

export const SITE_NAME = "Živić-elektro";
export const SITE_URL = "https://www.zivic-elektro.com";
export const DEFAULT_SITE_DESCRIPTION =
  "Živić-elektro nudi elektromaterijal, pregled proizvoda, poslovne usluge i pristup webshopu za veleprodaju i maloprodaju.";

const DEFAULT_SOCIAL_IMAGE_PATH = "/icons/android-chrome-512x512.png";

export const DEFAULT_ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export const NOINDEX_ROBOTS: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

function resolveImageUrl(imagePath?: string | null): string {
  const resolvedPath = imagePath || DEFAULT_SOCIAL_IMAGE_PATH;

  if (
    resolvedPath.startsWith("http://") ||
    resolvedPath.startsWith("https://")
  ) {
    return resolvedPath;
  }

  return new URL(normalizePath(resolvedPath), SITE_URL).toString();
}

function getMetadataTitle(title?: string): string {
  return title ? `${title} | ${SITE_NAME}` : SITE_NAME;
}

export function getAbsoluteUrl(pathname = "/"): string {
  return new URL(normalizePath(pathname), SITE_URL).toString();
}

type CreatePageMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string | null;
  robots?: Metadata["robots"];
};

export function createPageMetadata({
  title,
  description = DEFAULT_SITE_DESCRIPTION,
  path = "/",
  ogImage,
  robots = DEFAULT_ROBOTS,
}: CreatePageMetadataOptions): Metadata {
  const canonicalPath = normalizePath(path);
  const absoluteUrl = getAbsoluteUrl(canonicalPath);
  const socialImageUrl = resolveImageUrl(ogImage);
  const metadataTitle = getMetadataTitle(title);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    robots,
    openGraph: {
      type: "website",
      locale: "hr_HR",
      url: absoluteUrl,
      siteName: SITE_NAME,
      title: metadataTitle,
      description,
      images: [
        {
          url: socialImageUrl,
          alt: metadataTitle,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: metadataTitle,
      description,
      images: [socialImageUrl],
    },
  };
}
