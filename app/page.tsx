import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Doctors Marketing Agency | Healthcare Growth, Brand & Technology",
  description: "Connect healthcare branding, patient acquisition, medical websites and technology into one practical growth system.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <SiteShell><HomePage /></SiteShell>;
}

