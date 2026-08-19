import type { Metadata } from "next";
import { InnerPage } from "@/components/inner-page";
import { SiteShell } from "@/components/site-shell";

type Props = { params: Promise<{ slug?: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug = [] } = await params;
  const path = `/${slug.join("/")}`;
  const title = slug.length ? slug[slug.length - 1].split("-").map((word) => word[0]?.toUpperCase() + word.slice(1)).join(" ") : "Doctors Marketing Agency";
  return { title, description: `Explore ${title.toLowerCase()} services, resources and tools from Doctors Marketing Agency.`, alternates: { canonical: path } };
}

export default async function CatchAllPage({ params }: Props) {
  const { slug = [] } = await params;
  const root = slug[0] || "";
  const portal = root === "portal" || ["dashboard", "leads", "clients", "projects", "tasks", "campaigns", "seo", "website", "software", "reports", "documents", "billing", "support", "meetings", "notifications", "settings"].includes(root);
  const auth = ["login", "signup", "forgot-password", "reset-password", "verify-email", "two-factor", "invitation"].includes(root);
  if (portal || auth) return <InnerPage segments={slug} />;
  return <SiteShell><InnerPage segments={slug} /></SiteShell>;
}

