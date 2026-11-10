/**
 * DATOS VIVOS — cifras de mercado y normativas que cambian con el tiempo.
 *
 * Revisión trimestral: actualiza `valor`, `data` y, si hace falta, `font` aquí,
 * y toda la web (fichas, simulador, aviso de fecha) se actualiza sola.
 *
 * En las fichas .md se hace referencia con `{{clave}}` (p. ej. `{{euribor12m}}`).
 * content.ts sustituye el texto y la ficha muestra al final cuándo se
 * actualizaron los datos que usa. Una clave inexistente hace fallar el build,
 * así nunca se publica un `{{...}}` por error.
 *
 * Solo van aquí cifras que cambian de verdad. Las estables (FGD 100.000 €,
 * regla del 72...) se quedan escritas en el texto.
 */

export interface Dada {
  /** Texto tal como debe verse en la ficha. */
  valor: string;
  /** Valor numérico, para las herramientas que lo usen. */
  num?: number;
  /** A qué corresponde el dato (se muestra en el aviso de la ficha). */
  descripcio: string;
  /** Periodo o fecha del dato, en texto: "octubre 2026". */
  data: string;
  font: string;
  url?: string;
}

export const DADES = {
  // ── Tipos de interés ─────────────────────────────────────────────────────
  euribor12m: {
    valor: "3,239%",
    num: 3.239,
    descripcio: "Euríbor a 12 meses (media mensual)",
    data: "octubre 2026",
    font: "Banco de España",
  },
  euribor12mAnyAnterior: {
    valor: "2,187%",
    num: 2.187,
    descripcio: "Euríbor a 12 meses un año antes",
    data: "octubre 2025",
    font: "Banco de España",
  },
  hipotecaMitjanaTedr: {
    valor: "2,85%",
    num: 2.85,
    descripcio: "Tipo medio de las nuevas hipotecas (TEDR)",
    data: "mayo 2026",
    font: "Banco de España",
  },
  hipotecaMitjanaTae: {
    valor: "2,92%",
    num: 2.92,
    descripcio: "Tipo medio de las nuevas hipotecas (TAE)",
    data: "mayo 2026",
    font: "Banco de España",
  },
  hipotecaFixaTin: {
    valor: "2,95%",
    num: 2.95,
    descripcio: "Tipo medio de las hipotecas fijas (TIN)",
    data: "mayo 2026",
    font: "Banco de España",
  },

  // ── Inflación ────────────────────────────────────────────────────────────
  ipcAnual: {
    valor: "4,9%",
    num: 4.9,
    descripcio: "Inflación anual del IPC (indicador adelantado)",
    data: "octubre 2026",
    font: "INE",
    url: "https://www.ine.es/dyngs/INEbase/operacion.htm?c=Estadistica_C&cid=1254736176802",
  },

  // ── Plan de pensiones ────────────────────────────────────────────────────
  plaPensionsLimit: {
    valor: "1.500 €",
    num: 1500,
    descripcio: "Límite anual de reducción por aportaciones a planes individuales",
    data: "ejercicio 2026",
    font: "Ley del IRPF (art. 52)",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764",
  },
  plaPensionsLiquidesFins: {
    valor: "31 de diciembre de 2016",
    descripcio: "Aportaciones ya disponibles por el supuesto de 10 años de antigüedad",
    data: "2026",
    font: "Reglamento de planes y fondos de pensiones (RD 304/2004)",
  },

  // ── Crédito al consumo ───────────────────────────────────────────────────
  revolvingTopallTransitori: {
    valor: "22%",
    num: 22,
    descripcio: "Límite transitorio previsto en el anteproyecto de ley de crédito al consumo",
    data: "anteproyecto del 7 de enero de 2026 (pendiente del BOE)",
    font: "Consejo de Ministros",
  },
} satisfies Record<string, Dada>;

export type ClauDada = keyof typeof DADES;

/**
 * Cosas a revisar en la próxima revisión. No se muestran en la web; son el
 * recordatorio para quien mantiene la tabla.
 */
export const PENDENTS_REVISIO = [
  "Ley de crédito al consumo: cuando se publique en el BOE, confirmar si el tope del 22% está vigente (ficha 27).",
  "Presupuestos 2027: revisar el límite del plan de pensiones (ficha 39).",
  "IPC de octubre 2026: sustituir el 4,9% adelantado por el dato definitivo (ficha 24).",
  "Edad de jubilación: desde el 1/1/2027 los 67 años pasan a ser el dato vigente (ficha 36).",
  "Tabla orientativa de tipos marginales del IRPF y escala del ahorro: revisar cada ejercicio (herramienta del plan de pensiones).",
  "Ficha 28: el texto dice que el Euríbor 'ya está subiendo'; revisarlo si cambia la tendencia.",
];

/** Sustituye `{{clave}}` por el valor y devuelve las claves usadas. */
export function aplicaDades(text: string): { text: string; claus: ClauDada[] } {
  const claus = new Set<ClauDada>();
  const out = text.replace(/\{\{\s*([a-zA-Z0-9]+)\s*\}\}/g, (_, clau: string) => {
    if (!(clau in DADES)) {
      throw new Error(`Dato vivo desconocido: {{${clau}}}. Añádelo a src/lib/dades.ts.`);
    }
    claus.add(clau as ClauDada);
    return DADES[clau as ClauDada].valor;
  });
  return { text: out, claus: [...claus] };
}

/** Valor numérico de un dato (para los valores por defecto de las herramientas). */
export function numDada(clau: ClauDada): number {
  const d: Dada = DADES[clau];
  if (d.num === undefined) throw new Error(`El dato ${clau} no tiene valor numérico`);
  return d.num;
}

/** Formato corto para inputs: 3.239 → "3,2". */
export function perInput(n: number, decimals = 1): string {
  return (Math.round(n * 10 ** decimals) / 10 ** decimals).toString().replace(".", ",");
}

// ── IRPF (para la herramienta del plan de pensiones) ────────────────────────
export interface Tram {
  fins: number;
  tipus: number;
}

/**
 * Tipos marginales ORIENTATIVOS de la base general (estatal + autonómico),
 * con la escala autonómica de referencia. Cada comunidad tiene la suya y el
 * marginal real puede variar uno o dos puntos arriba o abajo.
 */
export const MARGINALS_ORIENTATIUS: Tram[] = [
  { fins: 12450, tipus: 19 },
  { fins: 20200, tipus: 24 },
  { fins: 35200, tipus: 30 },
  { fins: 60000, tipus: 37 },
  { fins: 300000, tipus: 45 },
  { fins: Infinity, tipus: 47 },
];

export const IRPF = {
  data: "ejercicio 2026",
  /** Base del ahorro (ganancias de un fondo al reembolsarlo), igual en toda España. */
  estalvi: [
    { fins: 6000, tipus: 19 },
    { fins: 50000, tipus: 21 },
    { fins: 200000, tipus: 23 },
    { fins: 300000, tipus: 27 },
    { fins: Infinity, tipus: 30 },
  ] as Tram[],
};

/** Marginal orientativo (%) para una base liquidable general. */
export function marginalOrientatiu(base: number): number {
  return MARGINALS_ORIENTATIUS.find((t) => base <= t.fins)!.tipus;
}

function quotaEscala(base: number, escala: Tram[]): number {
  let q = 0;
  let prev = 0;
  for (const t of escala) {
    if (base <= prev) break;
    q += (Math.min(base, t.fins) - prev) * (t.tipus / 100);
    prev = t.fins;
  }
  return q;
}

/** Impuesto sobre las ganancias de un fondo de inversión (base del ahorro). */
export function quotaEstalvi(guany: number): number {
  return quotaEscala(Math.max(0, guany), IRPF.estalvi);
}
