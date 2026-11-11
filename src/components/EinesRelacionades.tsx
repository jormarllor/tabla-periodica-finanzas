import Link from "next/link";
import type { Eina } from "@/lib/eines";

/** Acceso a las calculadoras relacionadas desde una ficha. */
export default function EinesRelacionades({ eines }: { eines: Eina[] }) {
  if (eines.length === 0) return null;
  return (
    <aside className="no-print mt-10" aria-labelledby="herramientas-relacionadas">
      <h2 id="herramientas-relacionadas" className="font-serif text-xl text-[var(--color-ink)]">
        {eines.length === 1 ? "Herramienta relacionada" : "Herramientas relacionadas"}
      </h2>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {eines.map((e) => (
          <Link
            key={e.slug}
            href={`/herramientas/${e.slug}`}
            className="flex gap-3 rounded-xl border border-[var(--color-paper-strong)] bg-white/70 p-4 transition-colors hover:border-[var(--color-primary)]"
          >
            <span className="text-2xl" aria-hidden>
              {e.icon}
            </span>
            <span>
              <span className="block font-medium text-[var(--color-ink)]">{e.title}</span>
              <span className="mt-0.5 block text-sm text-[var(--color-ink-soft)]">{e.desc}</span>
              <span className="mt-1 block text-sm font-medium text-[var(--color-primary)]">
                Abrir la calculadora →
              </span>
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
