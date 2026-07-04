import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  CATEGORIES,
  ELEMENTS,
  getElementBySlug,
  type Categoria,
} from "@/lib/elements";
import { loadElementContent } from "@/lib/content";
import Planificador from "@/components/Planificador";
import SimuladorHipoteca from "@/components/SimuladorHipoteca";
import Pressupost from "@/components/Pressupost";
import SimuladorDeute from "@/components/SimuladorDeute";
import Independencia from "@/components/Independencia";
import CostHabit from "@/components/CostHabit";

export function generateStaticParams() {
  return ELEMENTS.map((e) => ({ categoria: e.categoria, slug: e.slug }));
}

interface Params {
  params: Promise<{ categoria: string; slug: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { categoria, slug } = await params;
  const element = getElementBySlug(categoria, slug);
  if (!element) return {};

  const info = CATEGORIES[element.categoria];
  const content = loadElementContent(element);
  const resum =
    typeof content?.frontmatter.resum === "string"
      ? content.frontmatter.resum
      : element.nom;
  const title = `${element.simbol} · ${element.nom}`;
  const url = `/${element.categoria}/${element.slug}`;

  return {
    title,
    description: resum,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${title} — ${info.nom}`,
      description: resum,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${info.nom}`,
      description: resum,
    },
  };
}

export default async function ElementPage({ params }: Params) {
  const { categoria, slug } = await params;
  const element = getElementBySlug(categoria, slug);
  if (!element) return notFound();

  const info = CATEGORIES[element.categoria];
  const content = loadElementContent(element);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <nav className="text-xs text-[var(--color-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--color-primary)]">
          Tabla
        </Link>
        <span className="mx-2">/</span>
        <span style={{ color: info.color }}>{info.nom}</span>
      </nav>

      <header
        className="rounded-xl p-6 sm:p-8 text-[var(--color-paper)] shadow-lg"
        style={{ background: info.color }}
      >
        <p className="text-xs uppercase tracking-[0.18em] opacity-80">
          {info.nom} · elemento {element.id}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl mt-2 leading-tight">
          {element.simbol}
        </h1>
        <p className="mt-2 text-base sm:text-lg opacity-95">{element.nom}</p>
      </header>

      <section className="element-prose mt-10">
        {content ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children }) => {
                const external = typeof href === "string" && /^https?:\/\//.test(href);
                return external ? (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ) : (
                  <a href={href}>{children}</a>
                );
              },
            }}
          >
            {content.body}
          </ReactMarkdown>
        ) : (
          <PlaceholderContent
            categoria={element.categoria as Categoria}
            nom={element.nom}
          />
        )}
      </section>

      {element.slug === "interes-compuesto" && (
        <section className="mt-12">
          <h2 className="font-serif text-2xl mb-1">Calcúlalo tú mismo</h2>
          <p className="text-sm text-[var(--color-muted)] mb-5">
            Mueve las cifras y mira cómo el tiempo hace crecer el dinero.
          </p>
          <Planificador />
        </section>
      )}

      {element.slug === "tae-hipoteca-fija" && (
        <section className="mt-12">
          <h2 className="font-serif text-2xl mb-1">Simúlalo tú mismo</h2>
          <p className="text-sm text-[var(--color-muted)] mb-5">
            Mueve el Euríbor y mira cómo te cambia la cuota.
          </p>
          <SimuladorHipoteca />
        </section>
      )}

      {element.slug === "necesidades-50" && (
        <section className="mt-12">
          <h2 className="font-serif text-2xl mb-1">Calcula tu presupuesto</h2>
          <p className="text-sm text-[var(--color-muted)] mb-5">
            Reparte tus ingresos y compáralo con tu reparto real.
          </p>
          <Pressupost />
        </section>
      )}

      {(element.slug === "metodo-avalancha" || element.slug === "metodo-bola-nieve") && (
        <section className="mt-12">
          <h2 className="font-serif text-2xl mb-1">Compáralo tú mismo</h2>
          <p className="text-sm text-[var(--color-muted)] mb-5">
            Pon tus deudas y mira qué método te conviene más.
          </p>
          <SimuladorDeute />
        </section>
      )}

      {(element.slug === "regla-25x" || element.slug === "regla-4-por-ciento") && (
        <section className="mt-12">
          <h2 className="font-serif text-2xl mb-1">Calcúlalo tú mismo</h2>
          <p className="text-sm text-[var(--color-muted)] mb-5">
            Cuánto necesitas y cuántos años te quedan para llegar.
          </p>
          <Independencia />
        </section>
      )}

      {(element.slug === "coste-oportunidad" || element.slug === "gastos-hormiga") && (
        <section className="mt-12">
          <h2 className="font-serif text-2xl mb-1">Haz los números</h2>
          <p className="text-sm text-[var(--color-muted)] mb-5">
            Suma tus gastos hormiga y mira su coste a largo plazo.
          </p>
          <CostHabit />
        </section>
      )}

      <hr className="my-12 border-[var(--color-paper-strong)]" />

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
      >
        ← Volver a la tabla
      </Link>
    </article>
  );
}

function PlaceholderContent({
  categoria,
  nom,
}: {
  categoria: Categoria;
  nom: string;
}) {
  return (
    <div className="rounded-lg border border-dashed border-[var(--color-paper-strong)] bg-white/40 p-8 text-center">
      <p className="font-serif italic text-[var(--color-ink-soft)]">
        Este elemento todavía no tiene contenido publicado.
      </p>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        Pronto estará la explicación detallada de <strong>{nom}</strong> dentro de
        la familia <strong>{CATEGORIES[categoria].nom}</strong>.
      </p>
    </div>
  );
}
