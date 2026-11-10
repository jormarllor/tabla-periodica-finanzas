"use client";

import { useState } from "react";

/** Botones de compartir: WhatsApp, LinkedIn y copiar el enlace. */
export default function Compartir({ url, titol }: { url: string; titol: string }) {
  const [copiat, setCopiat] = useState(false);
  const u = encodeURIComponent(url);
  const text = encodeURIComponent(`${titol} ${url}`);
  const boto =
    "inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-paper-strong)] bg-white px-3 py-1.5 text-sm text-[var(--color-ink-soft)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]";

  async function copia() {
    try {
      await navigator.clipboard.writeText(url);
      setCopiat(true);
      setTimeout(() => setCopiat(false), 2000);
    } catch {
      window.prompt("Copia el enlace:", url);
    }
  }

  return (
    <div className="no-print mt-10 flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm text-[var(--color-muted)]">Compártelo:</span>
      <a className={boto} href={`https://wa.me/?text=${text}`} target="_blank" rel="noopener noreferrer">
        WhatsApp
      </a>
      <a
        className={boto}
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      <button type="button" className={boto} onClick={copia}>
        {copiat ? "Enlace copiado ✓" : "Copiar enlace"}
      </button>
    </div>
  );
}
