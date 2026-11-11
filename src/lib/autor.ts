import { LINKEDIN_PROFILE_URL, NEWSLETTER_URL, SITE_AUTHOR, SITE_URL } from "./site";

/** Datos del autor, compartidos por la caja de autor y los datos estructurados. */
export const AUTOR = {
  nom: SITE_AUTHOR,
  carrec: "Director de Educación Financiera del Instituto de Estudios Financieros (IEF)",
  bio: "Lleva años trabajando en educación financiera para ayudar a personas, familias y estudiantes a entender el dinero y decidir con más criterio. Escribe la newsletter Wellness Financiero.",
  url: `${SITE_URL}/sobre`,
  perfils: [
    NEWSLETTER_URL,
    LINKEDIN_PROFILE_URL,
    "https://instagram.com/jordimarllor",
    "https://x.com/jordimarllor",
  ],
};

export function personaJsonLd() {
  return {
    "@type": "Person",
    name: AUTOR.nom,
    jobTitle: AUTOR.carrec,
    url: AUTOR.url,
    sameAs: AUTOR.perfils,
    worksFor: { "@type": "Organization", name: "Instituto de Estudios Financieros" },
  };
}

const MESOS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

/** "2026-11-06" → "6 de noviembre de 2026". */
export function dataLlarga(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} de ${MESOS[m - 1]} de ${y}`;
}
