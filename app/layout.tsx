import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import { Navbar } from "@/components/navbar/Navbar";
import { PreFooterCTA } from "@/components/footer/PreFooterCTA";
import CookiesToastClient from "@/components/cookies/CookiesToastClient";
import { BackgroundSystem } from "@/components/layout/BackgroundSystem";
import { PwaInstallPrompt } from "@/components/pwa/PwaInstallPrompt";
import { ServiceWorkerRegistration } from "@/components/pwa/ServiceWorkerRegistration";
import {
  createPageMetadata,
  DEFAULT_SITE_DESCRIPTION,
  SITE_NAME,
  SITE_THEME_COLOR,
  SITE_URL,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const homeMetadata = createPageMetadata({
  description: DEFAULT_SITE_DESCRIPTION,
  path: "/",
});

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: SITE_THEME_COLOR,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_SITE_DESCRIPTION,
  alternates: homeMetadata.alternates,
  robots: homeMetadata.robots,
  openGraph: homeMetadata.openGraph,
  twitter: homeMetadata.twitter,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <BackgroundSystem />
        <ServiceWorkerRegistration />
        <PwaInstallPrompt />
        <div className="app-shell flex min-h-full flex-col">
          <Navbar />
          <main className="page-flow flex-1">{children}</main>
          <PreFooterCTA />
          <CookiesToastClient />
          <Footer />
        </div>
      </body>
    </html>
  );
}
