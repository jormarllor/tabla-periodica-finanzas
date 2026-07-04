import {
  CATEGORIES,
  getElementsByCategoria,
  type Categoria,
} from "@/lib/elements";
import ElementCell from "./ElementCell";

/**
 * Muestra el bloque de una familia con su etiqueta encima y la cuadrícula de celdas
 * pegadas (sin separación visible entre celdas del mismo tipo).
 */
function FamilyBlock({
  categoria,
  showLabel = true,
}: {
  categoria: Categoria;
  showLabel?: boolean;
}) {
  const info = CATEGORIES[categoria];
  const items = getElementsByCategoria(categoria);
  return (
    <div>
      {showLabel && (
        <h2
          className="font-serif uppercase tracking-[0.16em] text-[0.78rem] leading-none mb-1 text-center"
          style={{ color: info.color }}
        >
          {info.nom}
        </h2>
      )}
      <div
        className="grid gap-px"
        style={{ gridTemplateColumns: `repeat(${info.cols}, var(--cell-w))` }}
      >
        {items.map((el) => (
          <ElementCell key={el.id} element={el} />
        ))}
      </div>
    </div>
  );
}

function Glossari() {
  return (
    <div className="rounded-lg border border-[var(--color-paper-strong)] bg-[var(--color-paper)]/40 p-3 text-[0.6rem] leading-snug">
      <p className="font-serif uppercase tracking-[0.18em] text-xs text-[var(--color-ink-soft)] mb-2 text-center">
        Glosario rápido
      </p>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[var(--color-ink-soft)]">
        <span><b className="text-[var(--color-ink)]">TAE</b> Tasa anual equivalente</span>
        <span><b className="text-[var(--color-ink)]">72</b> Rend. anual = 72 / años</span>
        <span><b className="text-[var(--color-ink)]">TER</b> Coste total fondo</span>
        <span><b className="text-[var(--color-ink)]">FGD</b> Fondo garantía depósitos</span>
        <span><b className="text-[var(--color-ink)]">DCA</b> Aportación periódica</span>
        <span><b className="text-[var(--color-ink)]">120−edad</b> % renta variable</span>
        <span><b className="text-[var(--color-ink)]">25×</b> Patrimonio IF</span>
        <span><b className="text-[var(--color-ink)]">4%</b> Retirada segura (Trinity)</span>
      </div>
    </div>
  );
}

const ORDRE_STACK: Categoria[] = [
  "ahorro",
  "presupuesto",
  "inversion",
  "deuda",
  "jubilacion",
  "proteccion",
  "psicologia",
  "educacion",
  "ciberseguridad",
];

export default function PeriodicTable() {
  return (
    <>
      {/* Vista tabla periódica (≥ md) */}
      <div
        className="hidden md:block tp-grid-scope"
      >
        <div className="overflow-x-auto pb-4">
          <div className="flex items-start justify-center gap-x-5 mx-auto" style={{ width: "fit-content" }}>
            {/* COLUMNA IZQUIERDA — Ahorro + Presupuesto */}
            <div className="flex gap-x-2">
              <FamilyBlock categoria="ahorro" />
              <FamilyBlock categoria="presupuesto" />
            </div>

            {/* COLUMNA CENTRAL — Título + Inversión + Deuda + Educación + Ciberseguridad */}
            <div className="flex flex-col items-center gap-y-3">
              <header className="text-center pt-2 pb-1">
                <h1 className="font-serif text-3xl lg:text-[2.4rem] text-[var(--color-ink)] leading-[1.05]">
                  Tabla periódica de
                  <br />
                  las finanzas personales
                </h1>
                <p className="mt-2 uppercase tracking-[0.2em] text-[0.62rem] lg:text-[0.7rem] text-[var(--color-muted)]">
                  Consejos prácticos para tomar mejores decisiones con el dinero
                </p>
                <span
                  className="mt-2 inline-block w-2 h-2 rotate-45"
                  style={{ background: "var(--color-primary)" }}
                />
              </header>
              <FamilyBlock categoria="inversion" />
              <FamilyBlock categoria="deuda" />
              <FamilyBlock categoria="educacion" />
              <FamilyBlock categoria="ciberseguridad" />
            </div>

            {/* COLUMNA DERECHA — Jubilación + Protección + Psicología + Glosario */}
            <div className="flex flex-col gap-y-3">
              <FamilyBlock categoria="jubilacion" />
              <FamilyBlock categoria="proteccion" />
              <FamilyBlock categoria="psicologia" />
              <Glossari />
            </div>
          </div>
        </div>
      </div>

      {/* Vista apilada para móvil (< md) */}
      <div className="md:hidden space-y-8">
        <header className="text-center">
          <h1 className="font-serif text-3xl text-[var(--color-ink)] leading-tight">
            Tabla periódica de las finanzas personales
          </h1>
          <p className="mt-2 uppercase tracking-[0.18em] text-[0.65rem] text-[var(--color-muted)]">
            Consejos prácticos para tomar mejores decisiones con el dinero
          </p>
          <span
            className="mt-2 inline-block w-1.5 h-1.5 rotate-45"
            style={{ background: "var(--color-primary)" }}
          />
        </header>
        {ORDRE_STACK.map((cat) => {
          const info = CATEGORIES[cat];
          const items = getElementsByCategoria(cat);
          return (
            <section key={cat}>
              <h2
                className="font-serif text-base uppercase tracking-[0.14em] mb-2"
                style={{ color: info.color }}
              >
                {info.nom}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {items.map((el) => (
                  <ElementCell key={el.id} element={el} fluid />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
