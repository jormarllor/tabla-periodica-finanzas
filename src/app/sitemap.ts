import type { MetadataRoute } from "next";
import { ELEMENTS } from "@/lib/elements";
import { EINES } from "@/lib/eines";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/sobre`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/herramientas`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const elementPages: MetadataRoute.Sitemap = ELEMENTS.map((e) => ({
    url: `${SITE_URL}/${e.categoria}/${e.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const einesPages: MetadataRoute.Sitemap = EINES.map((e) => ({
    url: `${SITE_URL}/herramientas/${e.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...elementPages, ...einesPages];
}
