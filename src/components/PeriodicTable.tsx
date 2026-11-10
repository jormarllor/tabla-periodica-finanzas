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
  externa,
}: {
  categoria: Categoria;
  showLabel?: boolean;
  externa?: boolean;
}) {
  const info = CATEGORIES[categoria];
  const items = getElementsByCategoria(categoria);
  return (
    <div>
      {showLabel && (
        <p
          className="font-serif uppercase tracking-[0.16em] text-[0.78rem] leading-none mb-1 text-center"
          style={{ color: info.color }}
        >
          {info.nom}
        </p>
      )}
      <div
        className="grid gap-px"
        style={{ gridTemplateColumns: `repeat(${info.cols}, var(--cell-w))` }}
      >
        {items.map((el) => (
          <ElementCell key={el.id} element={el} externa={externa} />
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

/** La tabla entera en formato grande (escritorio y póster imprimible). */
export function TaulaGran({ externa }: { externa?: boolean } = {}) {
  return (
    <div className="flex items-start justify-center gap-x-5 mx-auto" style={{ width: "fit-content" }}>
      {/* COLUMNA IZQUIERDA — Ahorro + Presupuesto */}
      <div className="flex gap-x-2">
        <FamilyBlock categoria="ahorro" externa={externa} />
        <FamilyBlock categoria="presupuesto" externa={externa} />
      </div>

      {/* COLUMNA CENTRAL — Título + Inversión + Deuda + Educación + Ciberseguridad */}
      <div className="flex flex-col items-center gap-y-3">
        {/* Solo un H1 en la página: el de la vista móvil (Google indexa la versión móvil). */}
  <header className="text-center pt-2 pb-1">
          <p className="font-serif text-3xl lg:text-[2.4rem] text-[var(--color-ink)] leading-[1.05]">
            Tabla periódica de
            <br />
            las finanzas personales
          </p>
          <p className="mt-2 uppercase tracking-[0.2em] text-[0.62rem] lg:text-[0.7rem] text-[var(--color-muted)]">
            Consejos prácticos para tomar mejores decisiones con el dinero
          </p>
          <span
            className="mt-2 inline-block w-2 h-2 rotate-45"
            style={{ background: "var(--color-primary)" }}
          />
        </header>
        <FamilyBlock categoria="inversion" externa={externa} />
        <FamilyBlock categoria="deuda" externa={externa} />
        <FamilyBlock categoria="educacion" externa={externa} />
        <FamilyBlock categoria="ciberseguridad" externa={externa} />
      </div>

      {/* COLUMNA DERECHA — Jubilación + Protección + Psicología + Glosario */}
      <div className="flex flex-col gap-y-3">
        <FamilyBlock categoria="jubilacion" externa={externa} />
        <FamilyBlock categoria="proteccion" externa={externa} />
        <FamilyBlock categoria="psicologia" externa={externa} />
        <Glossari />
      </div>
    </div>
  );
}

export default function PeriodicTable() {
  return (
    <>
      {/* Vista tabla periódica (≥ md) */}
      <div
        className="hidden md:block tp-grid-scope"
      >
        <div className="overflow-x-auto pb-4">
          <TaulaGran />
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
