"use client";

import { useMemo, useState } from "react";

/**
 * El coste real de un hábito (o de varios gastos hormiga).
 * Suma el coste anual de gastos pequeños y repetidos y lo compara con lo que
 * podrían llegar a ser si se invirtieran (coste de oportunidad).
 * Tono: consciencia, no culpa. Sin dependencias: gráfico SVG propio.
 */

const eur0 = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
function num(s: string): number {
  const n = parseFloat(String(s).replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

const FREQ = [
  { label: "al día", value: 365 },
  { label: "a la semana", value: 52 },
  { label: "al mes", value: 12 },
  { label: "al año", value: 1 },
];

interface Habit { name: string; import: string; freq: number }

const EXEMPLES: (Habit & { icon: string })[] = [
  { icon: "☕", name: "Café", import: "1,80", freq: 365 },
  { icon: "🚬", name: "Tabaco", import: "5", freq: 365 },
  { icon: "🥡", name: "Comida a domicilio", import: "12", freq: 52 },
  { icon: "📺", name: "Suscripciones", import: "15", freq: 12 },
];

export default function CostHabit() {
  const [habits, setHabits] = useState<Habit[]>([{ name: "Café", import: "1,80", freq: 365 }]);
  const [anys, setAnys] = useState("20");
  const [rendiment, setRendiment] = useState("6");

  const upd = (i: number, k: keyof Habit, v: string | number) =>
    setHabits((p) => p.map((h, j) => (j === i ? { ...h, [k]: v } : h)));
  const del = (i: number) => setHabits((p) => p.filter((_, j) => j !== i));
  const addBuit = () => setHabits((p) => [...p, { name: "", import: "", freq: 12 }]);
  const addExemple = (e: Habit) => setHabits((p) => [...p, { name: e.name, import: e.import, freq: e.freq }]);

  const r = useMemo(() => {
    const rows = habits.map((h) => ({ name: h.name.trim() || "Gasto", annual: num(h.import) * h.freq }));
    const totalAnnual = rows.reduce((s, x) => s + x.annual, 0);
    const years = Math.min(60, Math.max(1, Math.round(num(anys)) || 1));
    const monthly = totalAnnual / 12;
    const i = num(rendiment) / 100 / 12;
    const investedAt = (n: number) => (i === 0 ? monthly * n : monthly * ((Math.pow(1 + i, n) - 1) / i));
    const spent = totalAnnual * years;
    const invested = investedAt(Math.round(years * 12));
    const hidden = Math.max(0, invested - spent);
    const series: { spent: number; invested: number }[] = [];
    for (let y = 0; y <= years; y++) series.push({ spent: totalAnnual * y, invested: investedAt(Math.round(y * 12)) });
    return { rows, totalAnnual, years, spent, invested, hidden, series };
  }, [habits, anys, rendiment]);

  const inputClass =
    "rounded-md border border-[var(--color-paper-strong)] bg-white px-2 py-1.5 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-primary)]";

  // Gráfico
  const W = 640, H = 240, padL = 12, padR = 12, padT = 16, padB = 24;
  const maxY = Math.max(r.invested, 1);
  const x = (y: number) => padL + (y / r.years) * (W - padL - padR);
  const yy = (v: number) => H - padB - (v / maxY) * (H - padT - padB);
  const lineSpent = r.series.map((p, y) => `${x(y)},${yy(p.spent)}`).join(" ");
  const lineInv = r.series.map((p, y) => `${x(y)},${yy(p.invested)}`).join(" ");

  return (
    <div className="not-prose rounded-2xl border border-[var(--color-paper-strong)] bg-[var(--color-paper)] p-5 sm:p-6">
      {/* Gastos */}
      <div className="space-y-2">
        {habits.map((h, i) => (
          <div key={i} className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-2">
            <input className={inputClass} value={h.name} onChange={(e) => upd(i, "name", e.target.value)} placeholder="Nombre del gasto" />
            <input className={`${inputClass} w-20 text-right`} inputMode="decimal" value={h.import} onChange={(e) => upd(i, "import", e.target.value)} placeholder="€" />
            <select className={inputClass} value={h.freq} onChange={(e) => upd(i, "freq", Number(e.target.value))}>
              {FREQ.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => del(i)}
              disabled={habits.length <= 1}
              aria-label="Quitar"
              className="px-1.5 text-[var(--color-muted)] hover:text-[var(--color-deuda)] disabled:opacity-30"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Añadir */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button type="button" onClick={addBuit} className="rounded-lg border border-[var(--color-ink-soft)]/30 px-3 py-1.5 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-paper-strong)]/60">
          + Añade un gasto
        </button>
        <span className="text-xs text-[var(--color-muted)]">o ejemplo rápido:</span>
        {EXEMPLES.map((e) => (
          <button
            key={e.name}
            type="button"
            onClick={() => addExemple(e)}
            className="rounded-full border border-[var(--color-paper-strong)] bg-white px-2.5 py-1 text-xs text-[var(--color-ink-soft)] hover:border-[var(--color-primary)]"
          >
            {e.icon} {e.name}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-[var(--color-ink-soft)]">Años</span>
          <input className={`${inputClass} w-28`} inputMode="numeric" value={anys} onChange={(e) => setAnys(e.target.value)} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-[var(--color-ink-soft)]">Rendimiento anual estimado (%)</span>
          <input className={`${inputClass} w-40`} inputMode="decimal" value={rendiment} onChange={(e) => setRendiment(e.target.value)} />
        </label>
      </div>

      {/* Resultado */}
      <div className="mt-6 rounded-xl bg-[var(--color-ink)] p-5 text-[var(--color-paper)]">
        <p className="text-sm opacity-80">Estos gastos te cuestan</p>
        <p className="font-serif text-3xl sm:text-4xl">
          {eur0.format(r.totalAnnual)}<span className="text-lg opacity-80"> / año</span>
        </p>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 text-sm">
          <div className="rounded-lg bg-white/10 p-3">
            <p className="opacity-70">En {r.years} años gastarías</p>
            <p className="font-serif text-lg">{eur0.format(r.spent)}</p>
          </div>
          <div className="rounded-lg bg-white/10 p-3">
            <p className="opacity-70">Si lo invirtieras, podrían ser</p>
            <p className="font-serif text-lg text-[var(--color-accent)]">{eur0.format(r.invested)}</p>
          </div>
        </div>
        <p className="mt-3 text-sm opacity-90">
          Coste oculto (el rendimiento que dejas de ganar):{" "}
          <span className="font-medium text-[var(--color-accent)]">{eur0.format(r.hidden)}</span>
        </p>
      </div>

      {/* Gráfico */}
      <div className="mt-6">
        <div className="mb-2 flex items-center gap-4 text-xs text-[var(--color-ink-soft)]">
          <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--color-ink-soft)]" />Lo que gastas</span>
          <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--color-primary)]" />Si lo invirtieras</span>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Coste gastado vs invertido">
          <polyline points={lineSpent} fill="none" stroke="var(--color-ink-soft)" strokeWidth="2" />
          <polyline points={lineInv} fill="none" stroke="var(--color-primary)" strokeWidth="2.5" />
          <text x={padL} y={padT} fontSize="11" fill="var(--color-muted)">{eur0.format(r.invested)}</text>
          <text x={padL} y={H - 8} fontSize="11" fill="var(--color-muted)">hoy</text>
          <text x={W - padR} y={H - 8} textAnchor="end" fontSize="11" fill="var(--color-muted)">{r.years} años</text>
        </svg>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-[var(--color-muted)]">
        Esto no va de renunciar a todo lo que te gusta: algunos hábitos valen
        cada euro porque te dan salud, tiempo o alegría. La idea es solo ver
        el número a largo plazo y decidir a propósito qué te aporta y qué
        no. Proyección orientativa; el rendimiento no está garantizado.
      </p>
    </div>
  );
}
