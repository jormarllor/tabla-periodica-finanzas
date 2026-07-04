/** Registro de herramientas/calculadoras. Una página por herramienta en /herramientas/[slug]. */
export interface Eina {
  slug: string;
  title: string;
  icon: string;
  /** Descripción corta para la tarjeta y la metadescripción. */
  desc: string;
  /** Elemento de la tabla relacionado. */
  element: string;
  elementText: string;
}

export const EINES: Eina[] = [
  {
    slug: "presupuesto",
    title: "Presupuesto personal",
    icon: "🧮",
    desc: "Haz tu presupuesto mensual con el detalle de ingresos y gastos, mira el balance y descárgalo en Excel o imprímelo.",
    element: "/presupuesto/necesidades-50",
    elementText: "la regla 50/30/20",
  },
  {
    slug: "planificador",
    title: "Planificador de ahorro e inversión",
    icon: "📈",
    desc: "Calcula cuánto puedes acumular con interés compuesto, o cuánto tienes que aportar para llegar a un objetivo.",
    element: "/inversion/interes-compuesto",
    elementText: "interés compuesto",
  },
  {
    slug: "hipoteca",
    title: "Simulador de hipoteca / Euríbor",
    icon: "🏠",
    desc: "Mira cómo cambia tu cuota según dónde vaya el Euríbor y compara la hipoteca variable con una fija.",
    element: "/deuda/tae-hipoteca-fija",
    elementText: "TAE hipoteca",
  },
  {
    slug: "deuda",
    title: "Reducir deuda: avalancha vs bola de nieve",
    icon: "🏔️",
    desc: "Compara las dos estrategias para pagar tus deudas: cuál es más rápida y cuál te ahorra más intereses.",
    element: "/deuda/metodo-avalancha",
    elementText: "Avalancha",
  },
  {
    slug: "independencia",
    title: "Independencia financiera (25× / 4%)",
    icon: "🧭",
    desc: "Cuánto patrimonio necesitas para cubrir tu gasto con las inversiones, y cuántos años te quedan para llegar.",
    element: "/jubilacion/regla-25x",
    elementText: "la regla del 25×",
  },
  {
    slug: "habito",
    title: "El coste real de un hábito",
    icon: "☕",
    desc: "Suma tus gastos pequeños y repetidos y mira cuánto cuestan al año y qué podrían ser si los invirtieras.",
    element: "/psicologia/coste-oportunidad",
    elementText: "el coste de oportunidad",
  },
];

export function getEina(slug: string): Eina | undefined {
  return EINES.find((e) => e.slug === slug);
}
