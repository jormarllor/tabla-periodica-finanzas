export type Categoria =
  | "ahorro"
  | "presupuesto"
  | "inversion"
  | "deuda"
  | "jubilacion"
  | "proteccion"
  | "psicologia"
  | "educacion"
  | "ciberseguridad";

export interface ElementFinancer {
  id: number;
  slug: string;
  categoria: Categoria;
  simbol: string;
  nom: string;
}

export interface CategoriaInfo {
  key: Categoria;
  nom: string;
  color: string;
  /** Número de columnas en la cuadrícula interna del bloque. */
  cols: number;
}

export const CATEGORIES: Record<Categoria, CategoriaInfo> = {
  ahorro:         { key: "ahorro",         nom: "Ahorro",                color: "var(--color-ahorro)",         cols: 1 },
  presupuesto:    { key: "presupuesto",    nom: "Presupuesto",           color: "var(--color-presupuesto)",    cols: 1 },
  inversion:      { key: "inversion",      nom: "Inversión",             color: "var(--color-inversion)",      cols: 7 },
  deuda:          { key: "deuda",          nom: "Deuda",                 color: "var(--color-deuda)",          cols: 8 },
  jubilacion:     { key: "jubilacion",     nom: "Jubilación",            color: "var(--color-jubilacion)",     cols: 3 },
  proteccion:     { key: "proteccion",     nom: "Protección",            color: "var(--color-proteccion)",     cols: 3 },
  psicologia:     { key: "psicologia",     nom: "Psicología financiera", color: "var(--color-psicologia)",     cols: 3 },
  educacion:      { key: "educacion",      nom: "Educación",             color: "var(--color-educacion)",      cols: 4 },
  ciberseguridad: { key: "ciberseguridad", nom: "Ciberseguridad",        color: "var(--color-ciberseguridad)", cols: 4 },
};

export const ELEMENTS: ElementFinancer[] = [
  // AHORRO (7)
  { id: 1,  categoria: "ahorro", slug: "tasa-ahorro",         simbol: "Tasa ahorro",        nom: "Porcentaje de ingresos apartado" },
  { id: 2,  categoria: "ahorro", slug: "fondos-previsibles",  simbol: "Fondos previsibles", nom: "Gastos que ya vendrán" },
  { id: 3,  categoria: "ahorro", slug: "tres-cuentas",        simbol: "3 cuentas",          nom: "Separa necesidades, vida y ahorro" },
  { id: 4,  categoria: "ahorro", slug: "mini-fondo-inicial",  simbol: "1.000 €",            nom: "Mini-fondo inicial" },
  { id: 5,  categoria: "ahorro", slug: "incremento-anual-1",  simbol: "1 punto",            nom: "Incremento anual de ahorro" },
  { id: 6,  categoria: "ahorro", slug: "un-euro-al-dia",      simbol: "1 €/día",            nom: "365 € al año" },
  { id: 7,  categoria: "ahorro", slug: "pay-yourself-first",  simbol: "Págate primero",     nom: "Transfiere el ahorro cuando cobras" },

  // PRESUPUESTO (7)
  { id: 8,  categoria: "presupuesto", slug: "necesidades-50",      simbol: "50%",   nom: "Gastos necesarios" },
  { id: 9,  categoria: "presupuesto", slug: "estilo-vida-30",      simbol: "30%",   nom: "Estilo de vida" },
  { id: 10, categoria: "presupuesto", slug: "ahorro-inversion-20", simbol: "20%",   nom: "Ahorro y objetivos financieros" },
  { id: 11, categoria: "presupuesto", slug: "regla-24-horas",      simbol: "24 h",  nom: "Espera en compras grandes" },
  { id: 12, categoria: "presupuesto", slug: "coste-vivienda-30",   simbol: "≤30%",  nom: "Coste de la vivienda" },
  { id: 13, categoria: "presupuesto", slug: "pareto-gastos",       simbol: "80/20", nom: "Pareto en gastos" },
  { id: 14, categoria: "presupuesto", slug: "gastos-hormiga",      simbol: "5%",    nom: "Gastos hormiga" },

  // INVERSIÓN (11) — 7 cols × 2 filas (la 2ª queda incompleta con 4 celdas)
  { id: 15, categoria: "inversion", slug: "rendimiento-real-bolsa",  simbol: "5-7%",         nom: "Rendimiento real histórico de la bolsa" },
  { id: 16, categoria: "inversion", slug: "diversifica",             simbol: "Diversifica",  nom: "Activos, sectores y geografía" },
  { id: 17, categoria: "inversion", slug: "regla-del-72",            simbol: "72",           nom: "Regla del 72" },
  { id: 18, categoria: "inversion", slug: "dca",                     simbol: "DCA",          nom: "Aportación periódica invariable" },
  { id: 19, categoria: "inversion", slug: "interes-compuesto",       simbol: "8ª maravilla", nom: "Interés compuesto" },
  { id: 20, categoria: "inversion", slug: "ter-fondo-indexado",      simbol: "<0,20%",       nom: "TER fondo indexado" },
  { id: 21, categoria: "inversion", slug: "ter-gestion-activa",      simbol: "<1,50%",       nom: "TER gestión activa" },
  { id: 22, categoria: "inversion", slug: "regla-120-edad",          simbol: "120−edad",     nom: "% renta variable según longevidad" },
  { id: 23, categoria: "inversion", slug: "horizonte-minimo-bolsa",  simbol: "≥10 años",     nom: "Horizonte mínimo para bolsa" },
  { id: 24, categoria: "inversion", slug: "inflacion-media",         simbol: "2-3%",         nom: "Inflación media" },
  { id: 25, categoria: "inversion", slug: "inversion-sostenible",    simbol: "ESG",          nom: "Inversión sostenible" },

  // DEUDA (8) — 8 cols × 1 fila
  { id: 26, categoria: "deuda", slug: "ratio-endeudamiento",   simbol: "≤35%",          nom: "Ratio de endeudamiento" },
  { id: 27, categoria: "deuda", slug: "tae-tarjeta-credito",   simbol: "20-24%",        nom: "TAE tarjeta de crédito" },
  { id: 28, categoria: "deuda", slug: "tae-hipoteca-fija",     simbol: "3-4%",          nom: "TAE hipoteca" },
  { id: 29, categoria: "deuda", slug: "tae-prestamo-personal", simbol: "6-12%",         nom: "TAE préstamo personal" },
  { id: 30, categoria: "deuda", slug: "saldo-cero-tarjeta",    simbol: "0 €",           nom: "Saldo ideal tarjeta" },
  { id: 31, categoria: "deuda", slug: "coste-real-intereses",  simbol: "×2,5",          nom: "Coste real de los intereses" },
  { id: 32, categoria: "deuda", slug: "metodo-avalancha",      simbol: "Avalancha",     nom: "Amortización eficiente" },
  { id: 33, categoria: "deuda", slug: "metodo-bola-nieve",     simbol: "Bola de nieve", nom: "Método motivacional" },

  // JUBILACIÓN (6) — 3 cols × 2 filas
  { id: 34, categoria: "jubilacion", slug: "regla-25x",               simbol: "25×",          nom: "Patrimonio = 25 años de gasto" },
  { id: 35, categoria: "jubilacion", slug: "regla-4-por-ciento",      simbol: "4%",           nom: "Regla de retirada" },
  { id: 36, categoria: "jubilacion", slug: "edad-jubilacion-esp",     simbol: "67 a",         nom: "Edad ordinaria de jubilación" },
  { id: 37, categoria: "jubilacion", slug: "tasa-sustitucion",        simbol: "70%",          nom: "Tasa de sustitución prudente" },
  { id: 38, categoria: "jubilacion", slug: "vida-laboral",            simbol: "Vida laboral", nom: "El dato antes de la teoría" },
  { id: 39, categoria: "jubilacion", slug: "aportacion-plan-pensiones", simbol: "1.500 €",    nom: "Aportación plan de pensiones individual" },

  // PROTECCIÓN (8) — 3 cols × 3 filas (última incompleta)
  { id: 40, categoria: "proteccion", slug: "fondo-emergencia-basico",    simbol: "3-6 m",        nom: "Fondo de emergencia básico" },
  { id: 41, categoria: "proteccion", slug: "fondo-emergencia-autonomos", simbol: "6-12 m",       nom: "Fondo para autónomos" },
  { id: 42, categoria: "proteccion", slug: "cobertura-vida",            simbol: "7-10× sueldo",  nom: "Cobertura de vida" },
  { id: 43, categoria: "proteccion", slug: "liquidez-fondo",            simbol: "100%",          nom: "Liquidez del fondo" },
  { id: 44, categoria: "proteccion", slug: "fgd-depositos",             simbol: "100.000 €",     nom: "FGD por banco y titular" },
  { id: 45, categoria: "proteccion", slug: "testamento-al-dia",         simbol: "1×",            nom: "Testamento al día" },
  { id: 46, categoria: "proteccion", slug: "bancos-diversificados",     simbol: "2-3",           nom: "Bancos con función" },
  { id: 47, categoria: "proteccion", slug: "revision-polizas",          simbol: "1/año",         nom: "Revisión de pólizas" },

  // PSICOLOGÍA (6) — 3 cols × 2 filas
  { id: 48, categoria: "psicologia", slug: "aversion-perdida",       simbol: "2:1",            nom: "Las pérdidas pesan más" },
  { id: 49, categoria: "psicologia", slug: "habito-66-dias",         simbol: "66 d",           nom: "Hábitos que arraigan" },
  { id: 50, categoria: "psicologia", slug: "mejora-continua",        simbol: "1%",             nom: "Mejora continua" },
  { id: 51, categoria: "psicologia", slug: "automatiza",             simbol: "Automatiza",     nom: "Haz que ocurra" },
  { id: 52, categoria: "psicologia", slug: "descuento-hiperbolico",  simbol: "Ahora > mañana", nom: "Descuento hiperbólico" },
  { id: 53, categoria: "psicologia", slug: "coste-oportunidad",      simbol: "Coste oculto",   nom: "Coste de oportunidad" },

  // EDUCACIÓN (4)
  { id: 54, categoria: "educacion", slug: "libros",    simbol: "Libros",    nom: "Fundamentos y perspectiva" },
  { id: 55, categoria: "educacion", slug: "podcasts",  simbol: "Pódcasts",  nom: "Aprende en movimiento" },
  { id: 56, categoria: "educacion", slug: "cursos",    simbol: "Cursos",    nom: "Aprendizaje estructurado" },
  { id: 57, categoria: "educacion", slug: "newsletters", simbol: "Newsletters", nom: "Ideas y reflexiones" },

  // CIBERSEGURIDAD (4)
  { id: 58, categoria: "ciberseguridad", slug: "2fa",                simbol: "2FA",      nom: "Doble factor activo" },
  { id: 59, categoria: "ciberseguridad", slug: "gestor-contrasenas", simbol: "Gestor",   nom: "Contraseñas únicas" },
  { id: 60, categoria: "ciberseguridad", slug: "phishing",           simbol: "Phishing", nom: "Verifica antes de hacer clic" },
  { id: 61, categoria: "ciberseguridad", slug: "copia-3-2-1",        simbol: "3-2-1",    nom: "Copia de seguridad" },
];

export function getElementBySlug(categoria: string, slug: string): ElementFinancer | undefined {
  return ELEMENTS.find((e) => e.categoria === categoria && e.slug === slug);
}

export function getElementsByCategoria(categoria: Categoria): ElementFinancer[] {
  return ELEMENTS.filter((e) => e.categoria === categoria);
}
