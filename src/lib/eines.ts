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
  /** Otras fichas (rutas) donde la herramienta es útil y no está incrustada. */
  relacionades: string[];
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
    relacionades: ["/presupuesto/estilo-vida-30", "/presupuesto/ahorro-inversion-20", "/presupuesto/pareto-gastos", "/ahorro/tres-cuentas", "/ahorro/fondos-previsibles", "/ahorro/tasa-ahorro"],
  },
  {
    slug: "planificador",
    title: "Planificador de ahorro e inversión",
    seoTitol: "Calculadora de interés compuesto y ahorro",
    icon: "📈",
    desc: "Calcula cuánto puedes acumular con interés compuesto, o cuánto tienes que aportar para llegar a un objetivo.",
    element: "/inversion/interes-compuesto",
    elementText: "interés compuesto",
    relacionades: ["/inversion/regla-del-72", "/inversion/dca", "/inversion/rendimiento-real-bolsa", "/inversion/horizonte-minimo-bolsa", "/inversion/ter-fondo-indexado", "/inversion/ter-gestion-activa", "/inversion/inflacion-media", "/ahorro/incremento-anual-1", "/ahorro/un-euro-al-dia", "/ahorro/pay-yourself-first"],
  },
  {
    slug: "hipoteca",
    title: "Simulador de hipoteca / Euríbor",
    seoTitol: "Simulador de hipoteca y Euríbor",
    icon: "🏠",
    desc: "Mira cómo cambia tu cuota según dónde vaya el Euríbor y compara la hipoteca variable con una fija.",
    element: "/deuda/tae-hipoteca-fija",
    elementText: "TAE hipoteca",
    relacionades: ["/presupuesto/coste-vivienda-30", "/deuda/ratio-endeudamiento"],
  },
  {
    slug: "deuda",
    title: "Reducir deuda: avalancha vs bola de nieve",
    seoTitol: "Simulador para pagar deudas",
    icon: "🏔️",
    desc: "Compara las dos estrategias para pagar tus deudas: cuál es más rápida y cuál te ahorra más intereses.",
    element: "/deuda/metodo-avalancha",
    elementText: "Avalancha",
    relacionades: ["/deuda/tae-tarjeta-credito", "/deuda/tae-prestamo-personal", "/deuda/saldo-cero-tarjeta", "/deuda/coste-real-intereses", "/deuda/ratio-endeudamiento"],
  },
  {
    slug: "independencia",
    title: "Independencia financiera (25× / 4%)",
    seoTitol: "Calculadora de independencia financiera",
    icon: "🧭",
    desc: "Cuánto patrimonio necesitas para cubrir tu gasto con las inversiones, y cuántos años te quedan para llegar.",
    element: "/jubilacion/regla-25x",
    elementText: "la regla del 25×",
    relacionades: ["/jubilacion/tasa-sustitucion"],
  },
  {
    slug: "habito",
    title: "El coste real de un hábito",
    seoTitol: "Calculadora del coste de un hábito",
    icon: "☕",
    desc: "Suma tus gastos pequeños y repetidos y mira cuánto cuestan al año y qué podrían ser si los invirtieras.",
    element: "/psicologia/coste-oportunidad",
    elementText: "el coste de oportunidad",
    relacionades: ["/psicologia/descuento-hiperbolico", "/presupuesto/regla-24-horas"],
  },
  {
    slug: "fondo-emergencia",
    title: "Fondo de emergencia",
    seoTitol: "Calculadora del fondo de emergencia",
    icon: "🛟",
    desc: "Calcula cuánto debería ser tu colchón según tus gastos necesarios y tu situación, y cuándo lo tendrás completo.",
    element: "/proteccion/fondo-emergencia-basico",
    elementText: "el fondo de emergencia",
    relacionades: ["/ahorro/mini-fondo-inicial", "/proteccion/liquidez-fondo"],
  },
  {
    slug: "plan-pensiones",
    title: "Plan de pensiones: ahorro fiscal",
    seoTitol: "Calculadora del plan de pensiones e IRPF",
    icon: "🧾",
    desc: "Cuánto te ahorras en la renta según tu tipo marginal y cuánto pagarás al rescatarlo, comparado con un fondo de inversión.",
    element: "/jubilacion/aportacion-plan-pensiones",
    elementText: "la aportación al plan de pensiones",
    relacionades: ["/jubilacion/tasa-sustitucion", "/jubilacion/edad-jubilacion-esp", "/jubilacion/vida-laboral"],
  },
];

/** Herramientas relacionadas con una ficha (por ruta), sin las que ya lleva incrustadas. */
export function einesRelacionades(ruta: string): Eina[] {
  return EINES.filter((e) => e.relacionades.includes(ruta));
}

export function getEina(slug: string): Eina | undefined {
  return EINES.find((e) => e.slug === slug);
}
