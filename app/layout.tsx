import type { Metadata, Viewport } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { metadata as siteMetadata, rootJsonLd } from "@/lib/seo";
import { LoadProvider } from "@/components/providers/LoadProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { LoadingScreen } from "@/features/loading";
import { Nav } from "@/components/nav";
import { WhatsAppButton } from "@/features/whatsapp";
import { Footer } from "@/features/footer";

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
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');`}
            </Script>
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(rootJsonLd),
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
            <Footer />
          </LenisProvider>
        </LoadProvider>
        <WhatsAppButton />
        <div className="vignette" aria-hidden />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
