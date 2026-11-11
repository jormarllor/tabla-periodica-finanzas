import Link from "next/link";
import { AUTOR, dataLlarga } from "@/lib/autor";
import { SigueLinkedin } from "./EnllacLinkedin";

/** Caja de autor al final de la ficha. */
export default function AutorFitxa({ revisat, element }: { revisat?: string; element?: number }) {
  return (
    <aside className="mt-10 flex gap-4 rounded-xl border border-[var(--color-paper-strong)] bg-white/60 p-5 text-sm">
      <div
        aria-hidden
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-ink)] font-serif text-lg text-[var(--color-paper)]"
      >
        JM
      </div>
      <div>
        <p className="font-medium text-[var(--color-ink)]">
          Escrito por{" "}
          <Link href="/sobre" className="underline underline-offset-2 hover:text-[var(--color-primary)]">
            {AUTOR.nom}
          </Link>
        </p>
        <p className="text-[var(--color-ink-soft)]">{AUTOR.carrec}.</p>
        <p className="mt-1 text-[var(--color-ink-soft)]">{AUTOR.bio}</p>
        {revisat && (
          <p className="mt-2 text-xs text-[var(--color-muted)]">Revisado el {dataLlarga(revisat)}.</p>
        )}
        <SigueLinkedin location="ficha" element={element} />
      </div>
    </aside>
  );
}
