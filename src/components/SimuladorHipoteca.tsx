"use client";

import { useMemo, useState } from "react";

/**
 * Simulador de hipoteca / Euríbor. Adaptación nativa del "Simulador Euríbor"
 * (jormarllor/simulador-euribor) con la paleta de la tabla.
 * Compara hipoteca variable (Euríbor + diferencial) con un segundo escenario
 * de Euríbor y con una hipoteca fija. Sistema francés de cuota constante.
 * Sin dependencias: gráfico de barras y tabla propios.
 */

const eur0 = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
const eur2 = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const pct = (n: number) =>
  n.toLocaleString("es-ES", { maximumFractionDigits: 2 }) + " %";

function num(s: string): number {
  const n = parseFloat(String(s).replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

/** Cuota mensual por el sistema francés. */
function quota(capital: number, annualPct: number, months: number): number {
  if (months <= 0) return 0;
  const r = annualPct / 100 / 12;
  if (r === 0) return capital / months;
  const g = Math.pow(1 + r, months);
  return (capital * r * g) / (g - 1);
}

const ESCENARIS = [1.5, 2, 2.5, 3, 4, 5];

export default function SimuladorHipoteca() {
  const [capital, setCapital] = useState("180000");
  const [anys, setAnys] = useState("25");
  const [diferencial, setDiferencial] = useState("0,85");
  const [euribor, setEuribor] = useState("2,5");
  const [euriborComp, setEuriborComp] = useState("3,5");
  const [fix, setFix] = useState("2,9");
  const [showTable, setShowTable] = useState(false);

  const r = useMemo(() => {
    const C = Math.max(0, num(capital));
    const months = Math.max(1, Math.round(num(anys) * 12));
    const dif = num(diferencial);
    const rateVar = num(euribor) + dif;
    const rateComp = num(euriborComp) + dif;
    const rateFix = num(fix);

    const quotaVar = quota(C, rateVar, months);
    const quotaComp = quota(C, rateComp, months);
    const quotaFix = quota(C, rateFix, months);

    const difMensual = quotaVar - quotaComp;
    const difFixVar = quotaFix - quotaVar;
    const totalVar = quotaVar * months;
    const interessosVar = Math.max(0, totalVar - C);

    // Tabla de amortización (12 primeros meses) con el tipo variable.
    const rMonth = rateVar / 100 / 12;
    const taula: { mes: number; quota: number; interes: number; capital: number; pendent: number }[] = [];
    let saldo = C;
    for (let i = 1; i <= 12; i++) {
      const interes = saldo * rMonth;
      const amort = quotaVar - interes;
      saldo = Math.max(0, saldo - amort);
      taula.push({ mes: i, quota: quotaVar, interes, capital: amort, pendent: saldo });
    }

    // Escenarios de Euríbor para el gráfico de barras.
    const barres = ESCENARIS.map((e) => ({
      euribor: e,
      quota: quota(C, e + dif, months),
    }));
    const maxQuota = Math.max(...barres.map((b) => b.quota), 1);

    return {
      months, rateVar, rateComp, rateFix, dif,
      quotaVar, quotaComp, quotaFix,
      difMensual, difFixVar, totalVar, interessosVar,
      taula, barres, maxQuota,
    };
  }, [capital, anys, diferencial, euribor, euriborComp, fix]);

  const inputClass =
    "w-full rounded-lg border border-[var(--color-paper-strong)] bg-white px-3 py-2 text-[var(--color-ink)] outline-none focus:border-[var(--color-primary)]";

  const signe = (n: number) => (n > 0 ? "+" : n < 0 ? "−" : "");

  return (
    <div className="not-prose rounded-2xl border border-[var(--color-paper-strong)] bg-[var(--color-paper)] p-5 sm:p-6">
      {/* Entradas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Capital pendiente (€)">
          <input className={inputClass} inputMode="decimal" value={capital} onChange={(e) => setCapital(e.target.value)} />
        </Field>
        <Field label="Plazo (años)">
          <input className={inputClass} inputMode="numeric" value={anys} onChange={(e) => setAnys(e.target.value)} />
        </Field>
        <Field label="Diferencial (%)">
          <input className={inputClass} inputMode="decimal" value={diferencial} onChange={(e) => setDiferencial(e.target.value)} />
        </Field>
        <Field label="Euríbor a simular (%)">
          <input className={inputClass} inputMode="decimal" value={euribor} onChange={(e) => setEuribor(e.target.value)} />
        </Field>
        <Field label="Euríbor de comparación (%)">
          <input className={inputClass} inputMode="decimal" value={euriborComp} onChange={(e) => setEuriborComp(e.target.value)} />
        </Field>
        <Field label="Tipo hipoteca fija (%)">
          <input className={inputClass} inputMode="decimal" value={fix} onChange={(e) => setFix(e.target.value)} />
        </Field>
      </div>

      {/* Resultado principal */}
      <div className="mt-6 rounded-xl bg-[var(--color-ink)] p-5 text-[var(--color-paper)]">
        <p className="text-sm opacity-80">
          Cuota mensual variable · Euríbor {pct(num(euribor))} + {pct(r.dif)} ={" "}
          {pct(r.rateVar)}
        </p>
        <p className="font-serif text-3xl sm:text-4xl">{eur2.format(r.quotaVar)}</p>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <span>
            <span className="opacity-70">Total a pagar:</span> {eur0.format(r.totalVar)}
          </span>
          <span>
            <span className="opacity-70">Intereses:</span>{" "}
            <span className="text-[var(--color-accent)]">{eur0.format(r.interessosVar)}</span>
          </span>
        </div>
      </div>

      {/* Comparativas */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-[var(--color-paper-strong)] bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-[var(--color-muted)]">
            Si el Euríbor fuera {pct(num(euriborComp))}
          </p>
          <p className="font-serif text-2xl text-[var(--color-ink)]">{eur2.format(r.quotaComp)}</p>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            {signe(r.difMensual)}
            {eur2.format(Math.abs(r.difMensual))}/mes ·{" "}
            {signe(r.difMensual)}
            {eur0.format(Math.abs(r.difMensual) * 12)}/año
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-paper-strong)] bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-[var(--color-muted)]">
            Hipoteca fija al {pct(r.rateFix)}
          </p>
          <p className="font-serif text-2xl text-[var(--color-ink)]">{eur2.format(r.quotaFix)}</p>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            {signe(r.difFixVar)}
            {eur2.format(Math.abs(r.difFixVar))}/mes vs la variable de hoy
          </p>
        </div>
      </div>

      {/* Gráfico de escenarios */}
      <div className="mt-6">
        <p className="mb-3 text-sm font-medium text-[var(--color-ink-soft)]">
          Cuota según dónde vaya el Euríbor (diferencial {pct(r.dif)})
        </p>
        <div className="space-y-2">
          {r.barres.map((b) => {
            const actiu = Math.abs(b.euribor - num(euribor)) < 0.001;
            return (
              <div key={b.euribor} className="flex items-center gap-3 text-sm">
                <span className="w-16 shrink-0 text-right text-[var(--color-ink-soft)]">
                  {pct(b.euribor)}
                </span>
                <div className="h-7 flex-1 overflow-hidden rounded-md bg-[var(--color-paper-strong)]/50">
                  <div
                    className="flex h-full items-center justify-end rounded-md px-2 text-xs font-medium text-white"
                    style={{
                      width: `${Math.max(12, (b.quota / r.maxQuota) * 100)}%`,
                      background: actiu ? "var(--color-primary)" : "var(--color-ink-soft)",
                    }}
                  >
                    {eur0.format(b.quota)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cuadro de amortización */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setShowTable((v) => !v)}
          className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
        >
          {showTable ? "Oculta el cuadro de amortización" : "Muestra los primeros 12 meses"}
        </button>
        {showTable && (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-paper-strong)] text-left text-[var(--color-muted)]">
                  <th className="py-2 pr-3 font-medium">Mes</th>
                  <th className="py-2 pr-3 font-medium">Cuota</th>
                  <th className="py-2 pr-3 font-medium">Intereses</th>
                  <th className="py-2 pr-3 font-medium">Capital</th>
                  <th className="py-2 font-medium">Pendiente</th>
                </tr>
              </thead>
              <tbody>
                {r.taula.map((row) => (
                  <tr key={row.mes} className="border-b border-[var(--color-paper-strong)]/50">
                    <td className="py-1.5 pr-3 text-[var(--color-ink-soft)]">{row.mes}</td>
                    <td className="py-1.5 pr-3">{eur2.format(row.quota)}</td>
                    <td className="py-1.5 pr-3 text-[var(--color-deuda)]">{eur2.format(row.interes)}</td>
                    <td className="py-1.5 pr-3 text-[var(--color-inversion)]">{eur2.format(row.capital)}</td>
                    <td className="py-1.5">{eur0.format(row.pendent)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-[var(--color-muted)]">
        Simulación orientativa con el sistema francés de cuota constante y un
        Euríbor constante (no prevé su evolución real). No incluye
        comisiones, productos vinculados (seguros, etc.) ni impuestos. Sirve
        para entender cómo te puede afectar un cambio del Euríbor, no para fijar
        una cuota exacta.
      </p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-[var(--color-ink-soft)]">{label}</span>
      {children}
    </label>
  );
}
