"use client";

import { NEWSLETTER_URL } from "@/lib/site";
import EnllacLinkedin from "./EnllacLinkedin";

/**
 * Invitación a suscribirse a la newsletter Wellness Financiero (LinkedIn).
 * Sin pop-ups: se pone donde la persona ya ha sacado provecho de la web (final
 * de ficha, resultado de una herramienta, póster). El clic se registra en GA4
 * como click_linkedin_newsletter (ver src/lib/analytics.ts).
 */

type Origen = "ficha" | "herramienta" | "poster" | "portada";

const TEXTOS: Record<Origen, { titol: string; text: string }> = {
  ficha: {
    titol: "¿Te ha servido esta ficha?",
    text: "En Wellness Financiero escribo sobre finanzas personales con ideas claras y aplicables para tener más margen y más tranquilidad. Gratis, en LinkedIn.",
  },
  herramienta: {
    titol: "Ya tienes los números. ¿Y ahora?",
    text: "En Wellness Financiero te explico cómo convertirlos en decisiones: ahorro, deuda, inversión y jubilación, sin letra pequeña.",
  },
  poster: {
    titol: "¿Quieres estar al día de la tabla?",
    text: "Cuando actualizo los datos o añado herramientas, lo cuento en Wellness Financiero. Suscríbete y te llegará por LinkedIn.",
  },
  portada: {
    titol: "Cada elemento, una idea para aplicar",
    text: "La tabla nace de Wellness Financiero, mi newsletter sobre bienestar financiero. Suscríbete y recibe los nuevos artículos.",
  },
};

export default function SubscriuCTA({
  origen,
  pagina,
  element,
  color = "var(--color-primary)",
}: {
  origen: Origen;
  /** Número del elemento financiero (1-61), en las fichas. */
  element?: number;
  /** Identificador de la página para la analítica (slug de la ficha o la herramienta). */
  pagina?: string;
  color?: string;
}) {
  const t = TEXTOS[origen];
  const sep = NEWSLETTER_URL.includes("?") ? "&" : "?";
  return (
    <aside
      className="no-print not-prose mt-12 rounded-2xl border border-[var(--color-paper-strong)] bg-white/70 p-5 sm:p-6"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <p className="font-serif text-xl text-[var(--color-ink)]">{t.titol}</p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">{t.text}</p>
      <EnllacLinkedin
        kind="newsletter"
        location={origen}
        element={element}
        href={`${NEWSLETTER_URL}${sep}utm_source=tablaperiodica&utm_medium=cta&utm_campaign=${origen}&utm_content=${encodeURIComponent(pagina ?? origen)}`}
        className="mt-4 inline-block rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        style={{ background: color }}
      >
        Suscríbete a Wellness Financiero →
      </EnllacLinkedin>
    </aside>
  );
}
