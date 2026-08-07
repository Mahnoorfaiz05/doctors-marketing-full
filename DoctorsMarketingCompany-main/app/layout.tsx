import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const instrument = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400", style: "italic", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://doctorsmarketing.agency"),
  title: { default: "Doctors Marketing Agency", template: "%s | Doctors Marketing Agency" },
  description: "Helping Doctors Become the First Choice through connected healthcare brand, growth and technology systems.",
  applicationName: "Doctors Marketing Agency",
  openGraph: {
    type: "website",
    siteName: "Doctors Marketing Agency",
    title: "The Future of Healthcare Growth",
    description: "Brand, patient acquisition, websites and healthcare technology—connected.",
    images: [{ url: "/og.png", width: 1792, height: 941, alt: "Doctors Marketing Agency — Helping Doctors Become the First Choice" }],
  },
  twitter: { card: "summary_large_image", title: "Doctors Marketing Agency", description: "Helping Doctors Become the First Choice.", images: ["/og.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#0B213A", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Doctors Marketing Agency",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://doctorsmarketing.agency",
    slogan: "Helping Doctors Become the First Choice",
    description: "Healthcare growth, branding, website and technology services.",
  };
  return <html lang="en"><body className={`${manrope.variable} ${instrument.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />{children}</body></html>;
}
