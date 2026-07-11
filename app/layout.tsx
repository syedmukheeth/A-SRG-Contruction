import type { Metadata, Viewport } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { metadata as siteMetadata, constructionJsonLd } from "@/lib/seo";
import { LoadProvider } from "@/components/providers/LoadProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { LoadingScreen } from "@/features/loading";
import { Nav } from "@/components/nav";
import { WhatsAppButton } from "@/features/whatsapp";

const display = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = siteMetadata;

export const viewport: Viewport = {
  themeColor: "#090909",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="bg-ink text-text antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(constructionJsonLd),
          }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <LoadProvider>
          <LenisProvider>
            <LoadingScreen />
            <Nav />
            <main id="main">{children}</main>
          </LenisProvider>
        </LoadProvider>
        <WhatsAppButton />
        <div className="vignette" aria-hidden />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
