import type { Metadata } from "next";
import { TaulaGran } from "@/components/PeriodicTable";
import EscalaIncrustat from "@/components/EscalaIncrustat";
import { SITE_URL } from "@/lib/site";

/** Versión de la tabla para insertar en otras webs con un <iframe>. No se indexa. */
export const metadata: Metadata = {
  title: "Tabla para insertar",
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export default function IncrustarPage() {
  const host = SITE_URL.replace(/^https?:\/\//, "");
  return (
    <div className="incrustat tp-grid-scope py-2">
      <EscalaIncrustat>
        <TaulaGran externa />
      </EscalaIncrustat>
      <p className="mt-2 text-center text-xs text-[var(--color-muted)]">
        <a href={SITE_URL} target="_blank" rel="noopener" className="underline underline-offset-2">
          {host}
        </a>{" "}
        · Pulsa cualquier elemento para ver su ficha
      </p>
    </div>
  );
}
