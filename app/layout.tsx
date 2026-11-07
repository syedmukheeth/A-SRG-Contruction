import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Noto_Sans_Telugu } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { metadata as siteMetadata, rootJsonLd } from "@/lib/seo";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Nav } from "@/components/nav";
import { WhatsAppButton } from "@/features/whatsapp";
import { MobileActionBar } from "@/features/cta";
import { Footer } from "@/features/footer";

// One variable family for both voices: condensed display via the wdth axis,
// normal width for body copy.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Only used for one line (the owner's name as it appears on the flyer).
const telugu = Noto_Sans_Telugu({
  variable: "--font-noto-telugu",
  subsets: ["telugu"],
  weight: ["500"],
  preload: false,
});

export const metadata: Metadata = siteMetadata;

export const viewport: Viewport = {
  themeColor: "#f2eee6",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${mono.variable} ${telugu.variable}`}
    >
      <body className="bg-plaster text-ink antialiased">
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
        <LenisProvider>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </LenisProvider>
        <WhatsAppButton />
        <MobileActionBar />
      </body>
    </html>
  );
}
