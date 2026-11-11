/**
 * Eventos de GA4 para los enlaces a LinkedIn.
 *
 * - click_linkedin_profile: clics al perfil personal.
 * - click_linkedin_newsletter: clics a la newsletter Wellness Financiero.
 *
 * Parámetros: page_path, link_location, link_url y element_number (si aplica).
 * No se envía ningún dato personal. Si el usuario no ha aceptado las cookies,
 * GA no está cargado (window.gtag no existe) y no se envía nada.
 */

export type LinkedinKind = "perfil" | "newsletter";
export type LinkLocation =
  | "cabecera"
  | "portada"
  | "ficha"
  | "pie"
  | "herramienta"
  | "herramientas"
  | "poster"
  | "sobre";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackLinkedin(
  kind: LinkedinKind,
  location: LinkLocation,
  url: string,
  elementNumber?: number,
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", kind === "perfil" ? "click_linkedin_profile" : "click_linkedin_newsletter", {
    page_path: window.location.pathname,
    link_location: location,
    link_url: url,
    ...(elementNumber ? { element_number: elementNumber } : {}),
  });
}
