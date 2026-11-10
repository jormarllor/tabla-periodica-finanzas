"use client";

export default function BotoImprimir() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)]"
    >
      🖨️ Imprimir o guardar en PDF
    </button>
  );
}
