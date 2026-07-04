import type { Metadata } from "next";
import Link from "next/link";
import { EINES } from "@/lib/eines";

export const metadata: Metadata = {
  title: "Herramientas",
  description:
    "Calculadoras de finanzas personales: presupuesto, planificador de ahorro e inversión, simulador de hipoteca y más. Pon números a tus decisiones.",
  alternates: { canonical: "/herramientas" },
  openGraph: {
    type: "website",
    url: "/herramientas",
    title: "Herramientas — Calculadoras de finanzas personales",
    description:
      "Presupuesto, planificador de ahorro e inversión, simulador de hipoteca y más herramientas para poner números a tus decisiones.",
  },
};

export default function EinesPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-serif text-4xl sm:text-5xl leading-tight">Herramientas</h1>
      <p className="font-serif text-xl text-[var(--color-ink-soft)] font-medium mt-4 leading-snug">
        Calculadoras para poner números a las decisiones de la tabla.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {EINES.map((e) => (
          <Link
            key={e.slug}
            href={`/herramientas/${e.slug}`}
            className="group rounded-2xl border border-[var(--color-paper-strong)] bg-[var(--color-paper)] p-5 transition-colors hover:border-[var(--color-primary)]"
          >
            <div className="text-2xl">{e.icon}</div>
            <h2 className="mt-2 font-serif text-xl text-[var(--color-ink)] group-hover:text-[var(--color-primary)]">
              {e.title}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink-soft)]">
              {e.desc}
            </p>
            <span className="mt-3 inline-block text-sm font-medium text-[var(--color-primary)]">
              Abre la herramienta →
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-10 text-sm text-[var(--color-muted)]">
        Iré añadiendo más calculadoras (deuda, independencia financiera, coste
        de un hábito…). Si hay alguna que te ayudaría, me lo
        puedes decir en{" "}
        <a
          href="https://www.linkedin.com/newsletters/wellness-financiero-7115738111975792640/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-primary)] underline underline-offset-2 hover:text-[var(--color-primary-dark)]"
        >
          Wellness Financiero
        </a>
        .
      </p>
    </article>
  );
}
