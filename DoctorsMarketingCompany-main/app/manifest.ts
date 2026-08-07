import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest { return { name: "Doctors Marketing Agency", short_name: "DMA", description: "Helping Doctors Become the First Choice", start_url: "/", display: "standalone", background_color: "#F8FAFC", theme_color: "#0B213A", icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }] }; }

