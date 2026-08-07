import type { MetadataRoute } from "next";
import { services, specialties, specialtySlug } from "@/lib/content";
import { publicRoutes } from "@/lib/routes";
export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.NEXT_PUBLIC_SITE_URL || "https://doctorsmarketing.agency"; const routes = [...publicRoutes, ...services.map((service) => `/services/${service.slug}`), ...specialties.map((specialty) => `/specialties/${specialtySlug(specialty)}`)]; return routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: route === "/" ? "weekly" : "monthly", priority: route === "/" ? 1 : 0.7 })); }

