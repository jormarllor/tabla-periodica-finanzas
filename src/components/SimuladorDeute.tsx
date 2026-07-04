"use client";

import { useMemo, useState } from "react";

/**
 * Simulador de reducción de deuda: Avalancha vs Bola de nieve (snowball).
 * Simula mes a mes las dos estrategias con la misma cantidad mensual y
 * compara el tiempo hasta estar libre de deuda y los intereses totales pagados.
 * Sin dependencias: gráfico SVG propio.
 */

const eur0 = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
function num(s: string): number {
  const n = parseFloat(String(s).replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

interface DebtInput { name: string; saldo: string; tae: string; min: string }
interface Debt { name: string; balance: number; tae: number; min: number; paidMonth: number }
type Method = "avalancha" | "bola";

const CAP = 1200;

function simulate(input: Debt[], pool: number, method: Method) {
  const debts = input.map((d) => ({ ...d }));
  let month = 0;
  let totalInterest = 0;
  const schedule: number[] = [debts.reduce((s, d) => s + d.balance, 0)];
  const payoffOrder: string[] = [];

  while (debts.some((d) => d.balance > 0.01) && month < CAP) {
    month++;
    for (const d of debts) {
      if (d.balance > 0) {
        const interest = d.balance * (d.tae / 100 / 12);
        d.balance += interest;
        totalInterest += interest;
      }
    }
    let available = pool;
    for (const d of debts) {
      if (d.balance <= 0) continue;
      const pay = Math.min(d.min, d.balance, available);
      d.balance -= pay;
      available -= pay;
    }
    const order = debts
      .filter((d) => d.balance > 0.01)
      .sort((a, b) => (method === "avalancha" ? b.tae - a.tae : a.balance - b.balance));
    for (const d of order) {
      if (available <= 0) break;
      const pay = Math.min(available, d.balance);
      d.balance -= pay;
      available -= pay;
    }
    for (const d of debts) {
      if (d.balance <= 0.01 && d.paidMonth === 0) {
        d.balance = 0;
        d.paidMonth = month;
        payoffOrder.push(d.name);
      }
    }
    schedule.push(debts.reduce((s, d) => s + Math.max(0, d.balance), 0));
  }

  const firstWin = debts.length
    ? Math.min(...debts.map((d) => d.paidMonth || CAP))
    : 0;
  return { months: month, finished: month < CAP, totalInterest, schedule, payoffOrder, firstWin };
}

function mesosText(m: number): string {
  const y = Math.floor(m / 12);
  const mo = m % 12;
  const parts: string[] = [];
  if (y) parts.push(`${y} ${y === 1 ? "año" : "años"}`);
  if (mo || !y) parts.push(`${mo} ${mo === 1 ? "mes" : "meses"}`);
  return parts.join(" y ");
}

export default function SimuladorDeute() {
  const [debts, setDebts] = useState<DebtInput[]>([
    { name: "Tarjeta de crédito", saldo: "3000", tae: "20", min: "75" },
    { name: "Préstamo del coche", saldo: "8000", tae: "7", min: "160" },
    { name: "Préstamo personal", saldo: "2000", tae: "9", min: "60" },
  ]);
  const [extra, setExtra] = useState("150");

  const upd = (i: number, k: keyof DebtInput, v: string) =>
    setDebts((p) => p.map((d, j) => (j === i ? { ...d, [k]: v } : d)));
  const addDebt = () => setDebts((p) => [...p, { name: "", saldo: "", tae: "", min: "" }]);
  const delDebt = (i: number) => setDebts((p) => p.filter((_, j) => j !== i));

  const r = useMemo(() => {
    const parsed: Debt[] = debts
      .map((d) => ({ name: d.name.trim() || "Deuda", balance: num(d.saldo), tae: num(d.tae), min: num(d.min), paidMonth: 0 }))
      .filter((d) => d.balance > 0);
    if (!parsed.length) return null;
    const sumMin = parsed.reduce((s, d) => s + d.min, 0);
    const pool = sumMin + num(extra);
    const warns: string[] = [];
    parsed.forEach((d) => {
      if (d.min < d.balance * (d.tae / 100 / 12)) warns.push(`La cuota mínima de «${d.name}» no cubre los intereses: crecerá hasta que la priorices.`);
    });
    const allau = simulate(parsed, pool, "avalancha");
    const bola = simulate(parsed, pool, "bola");
    if (!allau.finished || !bola.finished) warns.push("Con estos importes la deuda no se acaba de pagar en un tiempo razonable. Sube la aportación extra.");
    return { allau, bola, pool, sumMin, warns, totalInicial: parsed.reduce((s, d) => s + d.balance, 0) };
  }, [debts, extra]);

  const inputClass =
    "w-full rounded-md border border-[var(--color-paper-strong)] bg-white px-2 py-1.5 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-primary)]";

  // Gráfico
  const W = 640, H = 240, padL = 12, padR = 12, padT = 14, padB = 24;
  const chart = r
    ? (() => {
        const aS = r.allau.schedule, bS = r.bola.schedule;
        const maxM = Math.max(aS.length, bS.length, 2) - 1;
        const maxD = Math.max(r.totalInicial, 1);
        const x = (m: number) => padL + (m / maxM) * (W - padL - padR);
        const y = (v: number) => H - padB - (v / maxD) * (H - padT - padB);
        const line = (s: number[]) => s.map((v, m) => `${x(m)},${y(v)}`).join(" ");
        return { allau: line(aS), bola: line(bS), maxM, x, y };
      })()
    : null;

  return (
    <div className="not-prose rounded-2xl border border-[var(--color-paper-strong)] bg-[var(--color-paper)] p-5 sm:p-6">
      {/* Deudas */}
      <div className="space-y-3">
        {debts.map((d, i) => (
          <div key={i} className="rounded-xl border border-[var(--color-paper-strong)] bg-white/60 p-3">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-[2fr_1fr_1fr_1fr_auto] sm:items-end">
              <Field label="Deuda">
                <input className={inputClass} value={d.name} onChange={(e) => upd(i, "name", e.target.value)} placeholder="Nombre" />
              </Field>
              <Field label="Saldo (€)">
                <input className={inputClass} inputMode="decimal" value={d.saldo} onChange={(e) => upd(i, "saldo", e.target.value)} placeholder="0" />
              </Field>
              <Field label="TAE (%)">
                <input className={inputClass} inputMode="decimal" value={d.tae} onChange={(e) => upd(i, "tae", e.target.value)} placeholder="0" />
              </Field>
              <Field label="Cuota mín. (€)">
                <input className={inputClass} inputMode="decimal" value={d.min} onChange={(e) => upd(i, "min", e.target.value)} placeholder="0" />
              </Field>
              <button
                type="button"
                onClick={() => delDebt(i)}
                disabled={debts.length <= 1}
                aria-label="Quitar deuda"
                className="justify-self-end rounded-md px-2 py-1.5 text-[var(--color-muted)] hover:text-[var(--color-deuda)] disabled:opacity-30"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-end gap-4">
        <button
          type="button"
          onClick={addDebt}
          className="rounded-lg border border-[var(--color-ink-soft)]/30 px-3 py-2 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-paper-strong)]/60"
        >
          + Añade una deuda
        </button>
        <Field label="Puedes pagar de más cada mes (€)">
          <input className={`${inputClass} w-40`} inputMode="decimal" value={extra} onChange={(e) => setExtra(e.target.value)} />
        </Field>
      </div>

      {r && (
        <>
          {r.warns.length > 0 && (
            <div className="mt-5 space-y-1">
              {r.warns.map((w, i) => (
                <p key={i} className="text-sm text-[var(--color-deuda)]">⚠️ {w}</p>
              ))}
            </div>
          )}

          {/* Resultados */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <ResultCard
              title="🏔️ Avalancha"
              subtitle="Ataca primero la TAE más alta"
              accent="var(--color-primary)"
              months={r.allau.months}
              finished={r.allau.finished}
              interest={r.allau.totalInterest}
            />
            <ResultCard
              title="❄️ Bola de nieve"
              subtitle="Ataca primero el saldo más pequeño"
              accent="#2d5a87"
              months={r.bola.months}
              finished={r.bola.finished}
              interest={r.bola.totalInterest}
            />
          </div>

          {/* Comparativa */}
          <div className="mt-4 rounded-xl bg-[var(--color-ink)] p-4 text-[var(--color-paper)] text-sm leading-relaxed">
            {(() => {
              const saved = r.bola.totalInterest - r.allau.totalInterest;
              const mDiff = r.bola.months - r.allau.months;
              return (
                <>
                  <p>
                    Con la <strong>avalancha</strong> pagarías{" "}
                    <span className="text-[var(--color-accent)] font-medium">{eur0.format(Math.abs(saved))}</span>{" "}
                    {saved >= 0 ? "menos" : "más"}{" "}de intereses
                    {mDiff > 0 ? ` y acabarías ${mesosText(mDiff)} antes` : ""}.
                  </p>
                  <p className="mt-1 opacity-90">
                    Con la <strong>bola de nieve</strong>, la primera deuda desaparece en el{" "}
                    <strong>mes {r.bola.firstWin}</strong> — la primera victoria, que ayuda a no abandonar.
                  </p>
                </>
              );
            })()}
          </div>

          {/* Gráfico */}
          {chart && (
            <div className="mt-6">
              <div className="mb-2 flex items-center gap-4 text-xs text-[var(--color-ink-soft)]">
                <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--color-primary)]" />Avalancha</span>
                <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: "#2d5a87" }} />Bola de nieve</span>
                <span className="text-[var(--color-muted)]">· deuda total a lo largo del tiempo</span>
              </div>
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Evolución de la deuda">
                <polyline points={chart.bola} fill="none" stroke="#2d5a87" strokeWidth="2.5" />
                <polyline points={chart.allau} fill="none" stroke="var(--color-primary)" strokeWidth="2.5" />
                <text x={padL} y={H - 8} fontSize="11" fill="var(--color-muted)">0</text>
                <text x={W - padR} y={H - 8} textAnchor="end" fontSize="11" fill="var(--color-muted)">
                  {mesosText(chart.maxM)}
                </text>
                <text x={padL} y={padT} fontSize="11" fill="var(--color-muted)">{eur0.format(r.totalInicial)}</text>
              </svg>
            </div>
          )}

          {/* Orden de pago */}
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm">
            <PayoffList title="Orden con la avalancha" order={r.allau.payoffOrder} />
            <PayoffList title="Orden con la bola de nieve" order={r.bola.payoffOrder} />
          </div>
        </>
      )}

      <p className="mt-6 text-xs leading-relaxed text-[var(--color-muted)]">
        Los dos métodos funcionan. La matemática favorece la avalancha (menos
        intereses); la bola de nieve ayuda cuando necesitas ver resultados pronto
        para no abandonar. La diferencia a menudo es pequeña: el mejor método es el
        que vas a seguir. Simulación orientativa; no incluye comisiones ni cambios de tipo.
      </p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-[var(--color-ink-soft)]">{label}</span>
      {children}
    </label>
  );
}

function ResultCard({ title, subtitle, accent, months, finished, interest }: {
  title: string; subtitle: string; accent: string; months: number; finished: boolean; interest: number;
}) {
  return (
    <div className="rounded-xl border border-[var(--color-paper-strong)] bg-white p-4">
      <p className="font-serif text-lg" style={{ color: accent }}>{title}</p>
      <p className="text-xs text-[var(--color-muted)]">{subtitle}</p>
      <p className="mt-2 text-sm text-[var(--color-ink-soft)]">Libre de deuda en</p>
      <p className="font-serif text-2xl text-[var(--color-ink)]">{finished ? mesosText(months) : "—"}</p>
      <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
        Intereses totales: <span className="font-medium text-[var(--color-ink)]">{eur0.format(interest)}</span>
      </p>
    </div>
  );
}

function PayoffList({ title, order }: { title: string; order: string[] }) {
  return (
    <div>
      <p className="mb-1 font-medium text-[var(--color-ink-soft)]">{title}</p>
      <ol className="list-decimal space-y-0.5 pl-5 text-[var(--color-ink)]">
        {order.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ol>
    </div>
  );
}
