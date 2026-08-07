import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { const base = process.env.NEXT_PUBLIC_SITE_URL || "https://doctorsmarketing.agency"; return { rules: [{ userAgent: "*", allow: "/", disallow: ["/portal/", "/login", "/signup", "/reset-password"] }], sitemap: `${base}/sitemap.xml` }; }

