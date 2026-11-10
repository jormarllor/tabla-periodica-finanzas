/** Registro de herramientas/calculadoras. Una página por herramienta en /herramientas/[slug]. */
export interface Eina {
  slug: string;
  title: string;
  /** <title> para Google (sin el sufijo " | Tabla financiera"). */
  seoTitol: string;
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
    seoTitol: "Calculadora de presupuesto personal",
    icon: "🧮",
    desc: "Haz tu presupuesto mensual con el detalle de ingresos y gastos, mira el balance y descárgalo en Excel o imprímelo.",
    element: "/presupuesto/necesidades-50",
    elementText: "la regla 50/30/20",
  },
  {
    slug: "planificador",
    title: "Planificador de ahorro e inversión",
    seoTitol: "Calculadora de interés compuesto y ahorro",
    icon: "📈",
    desc: "Calcula cuánto puedes acumular con interés compuesto, o cuánto tienes que aportar para llegar a un objetivo.",
    element: "/inversion/interes-compuesto",
    elementText: "interés compuesto",
  },
  {
    slug: "hipoteca",
    title: "Simulador de hipoteca / Euríbor",
    seoTitol: "Simulador de hipoteca y Euríbor",
    icon: "🏠",
    desc: "Mira cómo cambia tu cuota según dónde vaya el Euríbor y compara la hipoteca variable con una fija.",
    element: "/deuda/tae-hipoteca-fija",
    elementText: "TAE hipoteca",
  },
  {
    slug: "deuda",
    title: "Reducir deuda: avalancha vs bola de nieve",
    seoTitol: "Simulador para pagar deudas",
    icon: "🏔️",
    desc: "Compara las dos estrategias para pagar tus deudas: cuál es más rápida y cuál te ahorra más intereses.",
    element: "/deuda/metodo-avalancha",
    elementText: "Avalancha",
  },
  {
    slug: "independencia",
    title: "Independencia financiera (25× / 4%)",
    seoTitol: "Calculadora de independencia financiera",
    icon: "🧭",
    desc: "Cuánto patrimonio necesitas para cubrir tu gasto con las inversiones, y cuántos años te quedan para llegar.",
    element: "/jubilacion/regla-25x",
    elementText: "la regla del 25×",
  },
  {
    slug: "habito",
    title: "El coste real de un hábito",
    seoTitol: "Calculadora del coste de un hábito",
    icon: "☕",
    desc: "Suma tus gastos pequeños y repetidos y mira cuánto cuestan al año y qué podrían ser si los invirtieras.",
    element: "/psicologia/coste-oportunidad",
    elementText: "el coste de oportunidad",
  },
  {
    slug: "fondo-emergencia",
    title: "Fondo de emergencia",
    seoTitol: "Calculadora del fondo de emergencia",
    icon: "🛟",
    desc: "Calcula cuánto debería ser tu colchón según tus gastos necesarios y tu situación, y cuándo lo tendrás completo.",
    element: "/proteccion/fondo-emergencia-basico",
    elementText: "el fondo de emergencia",
  },
  {
    slug: "plan-pensiones",
    title: "Plan de pensiones: ahorro fiscal",
    seoTitol: "Calculadora del plan de pensiones e IRPF",
    icon: "🧾",
    desc: "Cuánto te ahorras en la renta según tu tipo marginal y cuánto pagarás al rescatarlo, comparado con un fondo de inversión.",
    element: "/jubilacion/aportacion-plan-pensiones",
    elementText: "la aportación al plan de pensiones",
  },
];

export function getEina(slug: string): Eina | undefined {
  return EINES.find((e) => e.slug === slug);
}
