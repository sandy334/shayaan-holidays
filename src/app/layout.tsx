import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const title = "Shayaan Holidays | Force Traveller & Travel Enquiries";

export const metadata: Metadata = {
  // Origin only: Next already prefixes the base path onto file-based metadata (icons, OG image).
  metadataBase: new URL(new URL(site.url).origin),
  title,
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: `${site.url}/` },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: `${site.url}/`,
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#071B3A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${playfair.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available so scroll-reveal styles only apply when they can be undone. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
