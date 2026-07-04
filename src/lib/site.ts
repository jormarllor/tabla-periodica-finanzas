/**
 * URL base del sitio en producción (dominio definitivo, sin www).
 *
 * Se puede sobrescribir con la variable de entorno NEXT_PUBLIC_SITE_URL si algún
 * día cambia el dominio. La usan el sitemap, los metadatos y las imágenes de
 * compartir para generar URLs absolutas correctas.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tablaperiodicafinanciera.es"
).replace(/\/$/, "");

export const SITE_NAME = "Tabla periódica de las finanzas personales";
export const SITE_AUTHOR = "Jordi Martínez-Llorente";
export const SITE_DESCRIPTION =
  "61 conceptos clave de finanzas personales en una tabla periódica interactiva. Por Jordi Martínez-Llorente (Wellness Financiero).";
