import type { Metadata } from "next";
import { SITE_NAME } from "./site";

/**
 * Open Graph y Twitter Card propios para una página. Sin esto, las páginas que
 * no los declaran heredan los de la portada (og:url "/" y su título).
 * La imagen la pone el archivo opengraph-image.tsx de cada ruta.
 */
export function metaSocial(title: string, description: string, path: string): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: { type: "website", locale: "es_ES", siteName: SITE_NAME, url: path, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}
