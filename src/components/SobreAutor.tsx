import Link from "next/link";
import EnllacLinkedin, { IconaLinkedin } from "./EnllacLinkedin";

/** Presentación breve del autor en la portada, con los dos enlaces a LinkedIn. */
export default function SobreAutor() {
  return (
    <section
      aria-labelledby="sobre-el-autor"
      className="mx-auto mt-12 max-w-3xl rounded-2xl border border-[var(--color-paper-strong)] bg-white/70 p-5 sm:p-7"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div
          aria-hidden
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-ink)] font-serif text-xl text-[var(--color-paper)]"
        >
          JM
        </div>
        <div>
          <h2 id="sobre-el-autor" className="font-serif text-2xl text-[var(--color-ink)]">
            Sobre el autor
          </h2>
          <p className="mt-2 leading-relaxed text-[var(--color-ink-soft)]">
            Soy Jordi Martínez-Llorente y me dedico a la educación financiera. He creado
            esta tabla periódica para ayudarte a comprender los conceptos que influyen en tus
            decisiones económicas cotidianas.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <EnllacLinkedin
              kind="perfil"
              location="portada"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-[var(--color-paper)] transition-opacity hover:opacity-90"
            >
              <IconaLinkedin size={16} />
              Sígueme en LinkedIn
            </EnllacLinkedin>
            <EnllacLinkedin
              kind="newsletter"
              location="portada"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-white"
            >
              📬 Lee Wellness Financiero
            </EnllacLinkedin>
          </div>
          <p className="mt-3 text-xs text-[var(--color-muted)]">
            Más sobre mí y sobre este proyecto en{" "}
            <Link href="/sobre" className="underline underline-offset-2 hover:text-[var(--color-primary)]">
              Sobre mí
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
