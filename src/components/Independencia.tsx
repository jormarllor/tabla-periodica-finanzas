"use client";

import { useMemo, useState } from "react";

/**
 * Calculadora de independencia financiera (regla del 4% / 25×).
 * Patrimonio objetivo = gasto anual a cubrir / tasa de retirada.
 * Tiempo para llegar según patrimonio actual, aportación y rendimiento real.
 * Sin dependencias: gráfico SVG propio con línea de objetivo.
 */

const eur0 = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
function num(s: string): number {
  const n = parseFloat(String(s).replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : 0;
}
function mesosText(m: number): string {
  const y = Math.floor(m / 12);
  const mo = m % 12;
  const parts: string[] = [];
  if (y) parts.push(`${y} ${y === 1 ? "año" : "años"}`);
  if (mo || !y) parts.push(`${mo} ${mo === 1 ? "mes" : "meses"}`);
  return parts.join(" y ");
}

export default function Independencia() {
  const [despesa, setDespesa] = useState("12000");
  const [taxa, setTaxa] = useState("4");
  const [patrimoni, setPatrimoni] = useState("20000");
  const [aportacio, setAportacio] = useState("400");
  const [rendiment, setRendiment] = useState("5");
  const [edat, setEdat] = useState("");

  const r = useMemo(() => {
    const annual = num(despesa);
    const wr = num(taxa) || 4;
    const multiple = 100 / wr;
    const target = annual * multiple;
    const P0 = num(patrimoni);
    const PMT = num(aportacio);
    const i = num(rendiment) / 100 / 12;

    const CAP = 960;
    const balAt = (n: number) =>
      i === 0 ? P0 + PMT * n : P0 * Math.pow(1 + i, n) + PMT * ((Math.pow(1 + i, n) - 1) / i);

    let months = 0;
    if (target > 0 && P0 < target) {
      while (months < CAP && balAt(months) < target) months++;
    }
    const reached = target > 0 && balAt(months) >= target && months < CAP;
    const already = target > 0 && P0 >= target;

    const horizon = Math.max(1, reached ? Math.ceil(months / 12) : 40);
    const series: number[] = [];
    for (let y = 0; y <= horizon; y++) series.push(balAt(y * 12));

    const progress = target > 0 ? Math.min(1, P0 / target) : 0;
    const rendaMensual = annual / 12;

    return { annual, wr, multiple, target, months, reached, already, series, horizon, progress, rendaMensual };
  }, [despesa, taxa, patrimoni, aportacio, rendiment, edat]);

  // Gráfico
  const W = 640, H = 240, padL = 12, padR = 12, padT = 16, padB = 24;
  const maxY = Math.max(r.target, r.series[r.series.length - 1] || 1, 1);
  const x = (y: number) => padL + (y / r.horizon) * (W - padL - padR);
  const yy = (v: number) => H - padB - (v / maxY) * (H - padT - padB);
  const line = r.series.map((v, y) => `${x(y)},${yy(v)}`).join(" ");
  const targetY = yy(r.target);

  const inputClass =
    "w-full rounded-lg border border-[var(--color-paper-strong)] bg-white px-3 py-2 text-[var(--color-ink)] outline-none focus:border-[var(--color-primary)]";
  const edatNum = num(edat);
  const edatFinal = edatNum && r.reached ? Math.round(edatNum + r.months / 12) : 0;

  return (
    <div className="not-prose rounded-2xl border border-[var(--color-paper-strong)] bg-[var(--color-paper)] p-5 sm:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Gasto anual a cubrir con inversiones (€)" hint="P. ej. lo que no cubre la pensión">
          <input className={inputClass} inputMode="decimal" value={despesa} onChange={(e) => setDespesa(e.target.value)} />
        </Field>
        <Field label="Tasa de retirada anual (%)" hint="La parte del patrimonio que retiras cada año para vivir. 4% = 25×; 3,5% es más prudente.">
          <input className={inputClass} inputMode="decimal" value={taxa} onChange={(e) => setTaxa(e.target.value)} />
        </Field>
        <Field label="Patrimonio invertido actual (€)">
          <input className={inputClass} inputMode="decimal" value={patrimoni} onChange={(e) => setPatrimoni(e.target.value)} />
        </Field>
        <Field label="Aportación mensual (€)">
          <input className={inputClass} inputMode="decimal" value={aportacio} onChange={(e) => setAportacio(e.target.value)} />
        </Field>
        <Field label="Rendimiento anual real estimado (%)" hint="Real = después de inflación">
          <input className={inputClass} inputMode="decimal" value={rendiment} onChange={(e) => setRendiment(e.target.value)} />
        </Field>
        <Field label="Edad actual (opcional)">
          <input className={inputClass} inputMode="numeric" value={edat} onChange={(e) => setEdat(e.target.value)} placeholder="—" />
        </Field>
      </div>

      {/* Resultado */}
      <div className="mt-6 rounded-xl bg-[var(--color-ink)] p-5 text-[var(--color-paper)]">
        <p className="text-sm opacity-80">
          Patrimonio objetivo ({r.multiple.toLocaleString("es-ES", { maximumFractionDigits: 1 })}× el gasto)
        </p>
        <p className="font-serif text-3xl sm:text-4xl">{eur0.format(r.target)}</p>
        <p className="mt-2 text-sm">
          {r.already ? (
            <span className="text-[#7ec98f]">Ya estás: tu patrimonio ya cubriría ese gasto. 🎉</span>
          ) : r.reached ? (
            <>
              Llegarías en{" "}
              <span className="font-serif text-lg text-[var(--color-accent)]">{mesosText(r.months)}</span>
              {edatFinal ? ` · hacia los ${edatFinal} años` : ""}.
            </>
          ) : (
            <span className="text-[var(--color-accent)]">Con estos números el objetivo queda muy lejos. Sube la aportación o ajusta el gasto.</span>
          )}
        </p>
        <p className="mt-1 text-sm opacity-80">
          Generaría una renta de unos {eur0.format(r.rendaMensual)}/mes con una retirada del {r.wr.toLocaleString("es-ES", { maximumFractionDigits: 1 })} %.
        </p>
      </div>

      {/* Progreso */}
      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs text-[var(--color-ink-soft)]">
          <span>Ya tienes {eur0.format(num(patrimoni))}</span>
          <span>{Math.round(r.progress * 100)} %</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-[var(--color-paper-strong)]">
          <div className="h-full rounded-full bg-[var(--color-inversion)]" style={{ width: `${r.progress * 100}%` }} />
        </div>
      </div>

      {/* Gráfico */}
      <div className="mt-6">
        <div className="mb-2 flex items-center gap-4 text-xs text-[var(--color-ink-soft)]">
          <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--color-primary)]" />Patrimonio</span>
          <span className="flex items-center gap-1.5"><span className="inline-block h-0.5 w-4" style={{ background: "var(--color-muted)" }} />Objetivo</span>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Camino hacia la independencia">
          <line x1={padL} y1={targetY} x2={W - padR} y2={targetY} stroke="var(--color-muted)" strokeWidth="1.5" strokeDasharray="5 4" />
          <polyline points={line} fill="none" stroke="var(--color-primary)" strokeWidth="2.5" />
          <text x={padL} y={targetY - 5} fontSize="11" fill="var(--color-muted)">{eur0.format(r.target)}</text>
          <text x={padL} y={H - 8} fontSize="11" fill="var(--color-muted)">hoy</text>
          <text x={W - padR} y={H - 8} textAnchor="end" fontSize="11" fill="var(--color-muted)">{r.horizon} años</text>
        </svg>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-[var(--color-muted)]">
        La regla del 4% (25×) viene de datos históricos de EE. UU. y es una referencia,
        no una garantía. En España la pensión pública cubre buena parte
        de la jubilación, así que suele tener sentido calcularlo sobre lo que la
        pensión no cubre. Trabaja en términos reales (rendimiento ya descontada la
        inflación) y sé prudente: una tasa del 3,5 % exige más patrimonio pero
        da más margen.
      </p>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-[var(--color-ink-soft)]">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-[var(--color-muted)]">{hint}</span>}
    </label>
  );
}
