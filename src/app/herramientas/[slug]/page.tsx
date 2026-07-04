import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EINES, getEina } from "@/lib/eines";
import Pressupost from "@/components/Pressupost";
import Planificador from "@/components/Planificador";
import SimuladorHipoteca from "@/components/SimuladorHipoteca";
import SimuladorDeute from "@/components/SimuladorDeute";
import Independencia from "@/components/Independencia";
import CostHabit from "@/components/CostHabit";

const COMPONENTS: Record<string, React.ComponentType> = {
  presupuesto: Pressupost,
  planificador: Planificador,
  hipoteca: SimuladorHipoteca,
  deuda: SimuladorDeute,
  independencia: Independencia,
  habito: CostHabit,
};

export function generateStaticParams() {
  return EINES.map((e) => ({ slug: e.slug }));
}

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const eina = getEina(slug);
  if (!eina) return {};
  const url = `/herramientas/${eina.slug}`;
  return {
    title: eina.title,
    description: eina.desc,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: eina.title, description: eina.desc },
  };
}

export default async function EinaPage({ params }: Params) {
  const { slug } = await params;
  const eina = getEina(slug);
  const Tool = COMPONENTS[slug];
  if (!eina || !Tool) return notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <nav className="text-xs text-[var(--color-muted)] mb-6">
        <Link href="/herramientas" className="hover:text-[var(--color-primary)]">
          Herramientas
        </Link>
        <span className="mx-2">/</span>
        <span>{eina.title}</span>
      </nav>

      <h1 className="font-serif text-3xl sm:text-4xl leading-tight">
        <span className="mr-2">{eina.icon}</span>
        {eina.title}
      </h1>
      <p className="mt-3 text-[var(--color-ink-soft)] leading-relaxed">
        {eina.desc} Ligado a{" "}
        <Link
          href={eina.element}
          className="text-[var(--color-primary)] underline underline-offset-2 hover:text-[var(--color-primary-dark)]"
        >
          {eina.elementText}
        </Link>
        .
      </p>

      <div className="mt-8">
        <Tool />
      </div>

      <hr className="my-12 border-[var(--color-paper-strong)]" />
      <Link
        href="/herramientas"
        className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
      >
        ← Todas las herramientas
      </Link>
    </article>
  );
}
