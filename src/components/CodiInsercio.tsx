"use client";

import { useState } from "react";

/** Código para insertar la tabla en otra web, con botón de copiar. */
export default function CodiInsercio({ siteUrl, titol }: { siteUrl: string; titol: string }) {
  const [copiat, setCopiat] = useState(false);
  const codi = `<iframe src="${siteUrl}/incrustar" title="${titol}" width="100%" style="aspect-ratio:5/4;border:0" loading="lazy"></iframe>
<p><a href="${siteUrl}">${titol}</a>, de Jordi Martínez-Llorente</p>`;

  async function copia() {
    try {
      await navigator.clipboard.writeText(codi);
      setCopiat(true);
      setTimeout(() => setCopiat(false), 2000);
    } catch {
      window.prompt("Copia el código:", codi);
    }
  }

  return (
    <div>
      <pre className="overflow-x-auto whitespace-pre-wrap break-all rounded-lg bg-[var(--color-ink)] p-3 text-xs text-[var(--color-paper)]">
        {codi}
      </pre>
      <button
        type="button"
        onClick={copia}
        className="mt-2 rounded-lg border border-[var(--color-paper-strong)] bg-white px-3 py-1.5 text-sm text-[var(--color-ink-soft)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
      >
        {copiat ? "Código copiado ✓" : "Copiar el código"}
      </button>
    </div>
  );
}
