import type { MetadataRoute } from "next";
import { ELEMENTS } from "@/lib/elements";
import { EINES } from "@/lib/eines";
import { loadElementContent } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

/**
 * lastModified = fecha real de revisión (campo `revisat` de cada ficha). Las
 * páginas sin fecha fiable no la declaran, mejor que poner la del build.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const elementPages: MetadataRoute.Sitemap = ELEMENTS.map((e) => {
    const revisat = loadElementContent(e)?.frontmatter.revisat;
    return {
      url: `${SITE_URL}/${e.categoria}/${e.slug}`,
      ...(typeof revisat === "string" ? { lastModified: revisat } : {}),
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });

  const darrera = elementPages
    .map((p) => p.lastModified as string | undefined)
    .filter(Boolean)
    .sort()
    .at(-1);

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, ...(darrera ? { lastModified: darrera } : {}), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/sobre`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/herramientas`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/poster`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const einesPages: MetadataRoute.Sitemap = EINES.map((e) => ({
    url: `${SITE_URL}/herramientas/${e.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...elementPages, ...einesPages];
}
