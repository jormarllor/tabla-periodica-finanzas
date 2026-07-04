"use client";

import { useMemo, useState } from "react";

/**
 * Planificador de ahorro e inversión (interés compuesto).
 * Adaptación nativa del "Planificador Wellness Financiero" con la paleta de la tabla.
 * Dos modos: acumular (cuánto tendré) y objetivo (cuánto tengo que aportar).
 * Sin dependencias: el gráfico es un SVG propio.
 */

const FREQ = [
  { label: "Semanal", value: 52 },
  { label: "Mensual", value: 12 },
  { label: "Trimestral", value: 4 },
  { label: "Semestral", value: 2 },
  { label: "Anual", value: 1 },
];

const eur = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

function num(s: string): number {
  const n = parseFloat(String(s).replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

type Mode = "acumular" | "objetivo";

export default function Planificador() {
  const [mode, setMode] = useState<Mode>("acumular");
  const [inicial, setInicial] = useState("1000");
  const [periodica, setPeriodica] = useState("150");
  const [objectiu, setObjectiu] = useState("100000");
  const [anys, setAnys] = useState("20");
  const [rendiment, setRendiment] = useState("6");
  const [freq, setFreq] = useState(12);

  const r = useMemo(() => {
    const P0 = Math.max(0, num(inicial));
    const years = Math.min(70, Math.max(1, Math.round(num(anys))));
    const n = freq;
    const rPeriod = num(rendiment) / 100 / n;

    const factorAt = (periods: number) =>
      rPeriod === 0 ? periods : (Math.pow(1 + rPeriod, periods) - 1) / rPeriod;
    const growthAt = (periods: number) => Math.pow(1 + rPeriod, periods);

    const N = Math.round(years * n);
    const fvInitial = P0 * growthAt(N);
    const annuity = factorAt(N);

    let contribution: number;
    if (mode === "acumular") {
      contribution = Math.max(0, num(periodica));
    } else {
      const target = Math.max(0, num(objectiu));
      const needed = target - fvInitial;
      contribution = needed <= 0 || annuity === 0 ? 0 : needed / annuity;
    }

    const finalCapital = fvInitial + contribution * annuity;
    const totalAportat = P0 + contribution * N;
    const benefici = Math.max(0, finalCapital - totalAportat);

    const series: { year: number; bal: number; contrib: number }[] = [];
    for (let y = 0; y <= years; y++) {
      const Ny = Math.round(y * n);
      series.push({
        year: y,
        bal: P0 * growthAt(Ny) + contribution * factorAt(Ny),
        contrib: P0 + contribution * Ny,
      });
    }

    return { contribution, finalCapital, totalAportat, benefici, series, years };
  }, [mode, inicial, periodica, objectiu, anys, rendiment, freq]);

  // --- Gráfico SVG ---
  const W = 640;
  const H = 260;
  const padL = 12;
  const padR = 12;
  const padT = 18;
  const padB = 26;
  const maxVal = Math.max(1, r.series[r.series.length - 1]?.bal ?? 1);
  const x = (year: number) =>
    padL + (year / r.years) * (W - padL - padR);
  const y = (val: number) =>
    H - padB - (val / maxVal) * (H - padT - padB);

  const balLine = r.series.map((p) => `${x(p.year)},${y(p.bal)}`).join(" ");
  const contribLine = r.series.map((p) => `${x(p.year)},${y(p.contrib)}`).join(" ");
  const baseline = y(0);
  const areaAportat = `${padL},${baseline} ${contribLine} ${x(r.years)},${baseline}`;
  const areaBenefici = `${contribLine} ${[...r.series].reverse().map((p) => `${x(p.year)},${y(p.bal)}`).join(" ")}`;

  const yearTicks = Array.from(
    new Set([0, Math.round(r.years / 2), r.years]),
  );

  const inputClass =
    "w-full rounded-lg border border-[var(--color-paper-strong)] bg-white px-3 py-2 text-[var(--color-ink)] outline-none focus:border-[var(--color-primary)]";

  return (
    <div className="not-prose rounded-2xl border border-[var(--color-paper-strong)] bg-[var(--color-paper)] p-5 sm:p-6">
      {/* Selector de modo */}
      <div className="mb-5 inline-flex rounded-lg border border-[var(--color-paper-strong)] bg-white p-1 text-sm">
        <button
          type="button"
          onClick={() => setMode("acumular")}
          className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
            mode === "acumular"
              ? "bg-[var(--color-primary)] text-white"
              : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
          }`}
        >
          Cuánto acumularé
        </button>
        <button
          type="button"
          onClick={() => setMode("objetivo")}
          className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
            mode === "objetivo"
              ? "bg-[var(--color-primary)] text-white"
              : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
          }`}
        >
          Cuánto tengo que aportar
        </button>
      </div>

      {/* Entradas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Aportación inicial (€)">
          <input
            className={inputClass}
            inputMode="decimal"
            value={inicial}
            onChange={(e) => setInicial(e.target.value)}
          />
        </Field>

        {mode === "acumular" ? (
          <Field label="Aportación periódica (€)">
            <input
              className={inputClass}
              inputMode="decimal"
              value={periodica}
              onChange={(e) => setPeriodica(e.target.value)}
            />
          </Field>
        ) : (
          <Field label="Capital objetivo (€)">
            <input
              className={inputClass}
              inputMode="decimal"
              value={objectiu}
              onChange={(e) => setObjectiu(e.target.value)}
            />
          </Field>
        )}

        <Field label="Frecuencia de aportación">
          <select
            className={inputClass}
            value={freq}
            onChange={(e) => setFreq(Number(e.target.value))}
          >
            {FREQ.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Años">
          <input
            className={inputClass}
            inputMode="numeric"
            value={anys}
            onChange={(e) => setAnys(e.target.value)}
          />
        </Field>

        <Field label="Rendimiento anual estimado (%)">
          <input
            className={inputClass}
            inputMode="decimal"
            value={rendiment}
            onChange={(e) => setRendiment(e.target.value)}
          />
        </Field>
      </div>

      {/* Resultado */}
      <div className="mt-6 rounded-xl bg-[var(--color-ink)] p-5 text-[var(--color-paper)]">
        {mode === "acumular" ? (
          <>
            <p className="text-sm opacity-80">De aquí a {r.years} años tendrías</p>
            <p className="font-serif text-3xl sm:text-4xl">{eur.format(r.finalCapital)}</p>
          </>
        ) : (
          <>
            <p className="text-sm opacity-80">
              Para llegar a {eur.format(num(objectiu))}{" "}
              tendrías que aportar
            </p>
            <p className="font-serif text-3xl sm:text-4xl">
              {eur.format(r.contribution)}
              <span className="text-lg opacity-80">
                {" "}
                / {FREQ.find((f) => f.value === freq)?.label.toLowerCase()}
              </span>
            </p>
          </>
        )}
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <span>
            <span className="opacity-70">Total aportado:</span>{" "}
            {eur.format(r.totalAportat)}
          </span>
          <span>
            <span className="opacity-70">Beneficio generado:</span>{" "}
            <span className="text-[var(--color-accent)]">{eur.format(r.benefici)}</span>
          </span>
        </div>
      </div>

      {/* Gráfico */}
      <div className="mt-5">
        <div className="mb-2 flex items-center gap-4 text-xs text-[var(--color-ink-soft)]">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--color-primary)]" />
            Patrimonio total
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--color-ink-soft)]" />
            Dinero aportado
          </span>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Evolución del patrimonio">
          <polygon points={areaAportat} fill="var(--color-ink-soft)" opacity="0.16" />
          <polygon points={areaBenefici} fill="var(--color-primary)" opacity="0.18" />
          <polyline
            points={contribLine}
            fill="none"
            stroke="var(--color-ink-soft)"
            strokeWidth="2"
          />
          <polyline
            points={balLine}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2.5"
          />
          {yearTicks.map((t) => (
            <text
              key={t}
              x={x(t)}
              y={H - 8}
              textAnchor={t === 0 ? "start" : t === r.years ? "end" : "middle"}
              fontSize="11"
              fill="var(--color-muted)"
            >
              {t} {t === 1 ? "año" : "años"}
            </text>
          ))}
          <text x={padL} y={padT - 4} fontSize="11" fill="var(--color-muted)">
            {eur.format(maxVal)}
          </text>
        </svg>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-[var(--color-muted)]">
        Proyección orientativa con interés compuesto. Un rendimiento del 5-7% es una
        referencia histórica a largo plazo, no una garantía, y no tiene en cuenta
        la inflación ni los impuestos. Sirve para ver la fuerza del tiempo y la
        constancia, no para predecir el futuro.
      </p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-[var(--color-ink-soft)]">
        {label}
      </span>
      {children}
    </label>
  );
}
