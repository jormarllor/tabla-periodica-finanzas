import { DADES, type ClauDada, type Dada } from "@/lib/dades";

/** Aviso al pie de la ficha con la fecha y la fuente de los datos vivos que usa. */
export default function DadesVives({ claus }: { claus: ClauDada[] }) {
  return (
    <aside className="mt-10 rounded-xl border border-[var(--color-paper-strong)] bg-white/60 p-4 text-sm text-[var(--color-ink-soft)]">
      <p className="font-medium text-[var(--color-ink)]">🔄 Datos actualizados</p>
      <ul className="mt-2 space-y-1">
        {claus.map((clau) => {
          const d: Dada = DADES[clau];
          return (
            <li key={clau}>
              {d.descripcio}: <strong>{d.valor}</strong>{" "}
              <span className="text-[var(--color-muted)]">
                · {d.data} · Fuente:{" "}
                {d.url ? (
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-[var(--color-primary)]"
                  >
                    {d.font}
                  </a>
                ) : (
                  d.font
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
