import type { Metadata } from "next";
import { metaSocial } from "@/lib/meta";
import QRCode from "qrcode";
import { TaulaGran } from "@/components/PeriodicTable";
import BotoImprimir from "@/components/BotoImprimir";
import SubscriuCTA from "@/components/SubscriuCTA";
import CodiInsercio from "@/components/CodiInsercio";
import { NEWSLETTER_NAME, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Póster imprimible y tabla para insertar",
  description: `Descarga o imprime la ${SITE_NAME.toLowerCase()} en formato póster (A3 apaisado) o insértala en tu web.`,
  alternates: { canonical: "/poster" },
  ...metaSocial(
    "Póster imprimible y tabla para insertar",
    `Descarga o imprime la ${SITE_NAME.toLowerCase()} en formato póster (A3 apaisado) o insértala en tu web.`,
    "/poster",
  ),
};

export default async function PosterPage() {
  const qr = await QRCode.toString(SITE_URL, {
    type: "svg",
    margin: 0,
    color: { dark: "#1f2933", light: "#0000" },
  });
  const host = SITE_URL.replace(/^https?:\/\//, "");

  return (
    <div className="px-4 sm:px-6 py-8">
      <div className="no-print max-w-3xl mx-auto mb-8 text-center">
        <h1 className="font-serif text-3xl sm:text-4xl">Póster imprimible</h1>
        <p className="mt-3 text-[var(--color-ink-soft)]">
          La tabla entera en una sola página, pensada para <strong>A3 apaisado</strong>{" "}
          (también queda bien en A4). En el diálogo de impresión elige «Guardar como PDF» si
          la quieres en archivo, y activa «Gráficos de fondo» para que salgan los colores.
        </p>
        <div className="mt-5">
          <BotoImprimir />
        </div>
      </div>

      <div className="poster-scroll">
        <div className="poster-sheet tp-grid-scope">
          <TaulaGran />
          <div className="poster-peu">
            <div className="poster-qr" dangerouslySetInnerHTML={{ __html: qr }} />
            <div>
              <p className="font-serif text-lg text-[var(--color-ink)]">{host}</p>
              <p className="text-[var(--color-muted)]">
                Cada elemento tiene su ficha explicada · Jordi Martínez-Llorente ·
                Newsletter {NEWSLETTER_NAME} en LinkedIn
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="no-print max-w-3xl mx-auto mt-12">
        <h2 className="font-serif text-2xl">Inserta la tabla en tu web</h2>
        <p className="mt-2 mb-4 text-sm text-[var(--color-ink-soft)]">
          Para colegios, bibliotecas, ayuntamientos o blogs: pega este código y la tabla
          interactiva aparecerá en tu página. Cada elemento abre su ficha. Es gratis; solo te
          pido que mantengas el enlace de debajo.
        </p>
        <CodiInsercio siteUrl={SITE_URL} titol={SITE_NAME} />
      </section>

      <div className="max-w-3xl mx-auto">
        <SubscriuCTA origen="poster" />
      </div>
    </div>
  );
}
