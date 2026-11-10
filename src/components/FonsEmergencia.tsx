"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/**
 * Calculadora del fondo de emergencia.
 * Objetivo = gastos necesarios mensuales × meses según la situación
 * (tablas de las fichas 40 y 41). Muestra cuántos meses aguantarías hoy y
 * cuánto tardarías en completarlo con una aportación mensual.
 */

const eur0 = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0, useGrouping: "always" });
function num(s: string): number {
  const n = parseFloat(String(s).replace(/\./g, "").replace(",", "."));
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

const SITUACIONS = [
  { id: "doble", text: "Trabajo estable, doble ingreso y pocas cargas", mesos: 3 },
  { id: "estable-carregues", text: "Trabajo estable con hijos, hipoteca o responsabilidades", mesos: 4 },
  { id: "unic", text: "Ingreso único o sector con cierta incertidumbre", mesos: 5 },
  { id: "precari", text: "Trabajo precario, dependientes o poco apoyo familiar", mesos: 6 },
  { id: "autonom", text: "Autónomo con clientes diversificados", mesos: 6 },
  { id: "autonom-pocs", text: "Autónomo con pocos clientes principales", mesos: 8 },
  { id: "freelance", text: "Freelance con ingresos irregulares", mesos: 9 },
  { id: "estacional", text: "Actividad muy estacional", mesos: 12 },
];

const PARTIDES = [
  { id: "habitatge", text: "Vivienda (alquiler o hipoteca)", def: "800" },
  { id: "subministraments", text: "Suministros (luz, agua, gas, internet)", def: "150" },
  { id: "alimentacio", text: "Alimentación", def: "400" },
  { id: "transport", text: "Transporte", def: "120" },
  { id: "assegurances", text: "Seguros y salud", def: "80" },
  { id: "deutes", text: "Cuotas de deudas", def: "0" },
  { id: "altres", text: "Otros gastos imprescindibles", def: "100" },
];

export default function FonsEmergencia() {
  const [partides, setPartides] = useState<Record<string, string>>(
    Object.fromEntries(PARTIDES.map((p) => [p.id, p.def])),
  );
  const [situacio, setSituacio] = useState("estable-carregues");
  const [estalvi, setEstalvi] = useState("2000");
  const [aportacio, setAportacio] = useState("200");

  const r = useMemo(() => {
    const mensual = PARTIDES.reduce((s, p) => s + num(partides[p.id] ?? ""), 0);
    const mesos = SITUACIONS.find((s) => s.id === situacio)?.mesos ?? 4;
    const objectiu = mensual * mesos;
    const E = num(estalvi);
    const A = num(aportacio);
    const falta = Math.max(0, objectiu - E);
    const mesosFins = falta === 0 ? 0 : A > 0 ? Math.ceil(falta / A) : Infinity;
    const aguantes = mensual > 0 ? E / mensual : 0;
    const progres = objectiu > 0 ? Math.min(1, E / objectiu) : 0;
    return { mensual, mesos, objectiu, falta, mesosFins, aguantes, progres, min3: mensual * 3, max6: mensual * 6 };
  }, [partides, situacio, estalvi, aportacio]);

  const inputClass =
    "w-full rounded-lg border border-[var(--color-paper-strong)] bg-white px-3 py-2 text-[var(--color-ink)] outline-none focus:border-[var(--color-primary)]";

  return (
    <div className="not-prose rounded-2xl border border-[var(--color-paper-strong)] bg-[var(--color-paper)] p-5 sm:p-6">
      <p className="mb-3 text-sm font-medium text-[var(--color-ink)]">
        1. Tus gastos <strong>necesarios</strong> cada mes (no el sueldo)
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {PARTIDES.map((p) => (
          <label key={p.id} className="block">
            <span className="mb-1 block text-sm text-[var(--color-ink-soft)]">{p.text} (€)</span>
            <input
              className={inputClass}
              inputMode="decimal"
              value={partides[p.id]}
              onChange={(e) => setPartides((v) => ({ ...v, [p.id]: e.target.value }))}
            />
          </label>
        ))}
        <div className="flex items-end">
          <p className="w-full rounded-lg bg-white px-3 py-2 text-sm text-[var(--color-ink-soft)]">
            Total mensual: <strong className="text-[var(--color-ink)]">{eur0.format(r.mensual)}</strong>
          </p>
        </div>
      </div>

      <p className="mb-3 mt-6 text-sm font-medium text-[var(--color-ink)]">2. Tu situación</p>
      <select className={inputClass} value={situacio} onChange={(e) => setSituacio(e.target.value)}>
        {SITUACIONS.map((s) => (
          <option key={s.id} value={s.id}>
            {s.text} → {s.mesos} meses
          </option>
        ))}
      </select>

      <p className="mb-3 mt-6 text-sm font-medium text-[var(--color-ink)]">3. Dónde estás ahora</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm text-[var(--color-ink-soft)]">Ahorro líquido ya apartado (€)</span>
          <input className={inputClass} inputMode="decimal" value={estalvi} onChange={(e) => setEstalvi(e.target.value)} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm text-[var(--color-ink-soft)]">Cuánto puedes aportar cada mes (€)</span>
          <input className={inputClass} inputMode="decimal" value={aportacio} onChange={(e) => setAportacio(e.target.value)} />
        </label>
      </div>

      <div className="mt-6 rounded-xl bg-[var(--color-ink)] p-5 text-[var(--color-paper)]">
        <p className="text-sm opacity-80">
          Tu fondo de emergencia ({r.mesos} meses × {eur0.format(r.mensual)})
        </p>
        <p className="font-serif text-3xl sm:text-4xl">{eur0.format(r.objectiu)}</p>
        <p className="mt-2 text-sm">
          {r.objectiu === 0 ? (
            "Pon tus gastos para calcularlo."
          ) : r.falta === 0 ? (
            <span className="text-[#7ec98f]">Ya lo tienes completo. A partir de aquí, el ahorro puede ir a otros objetivos. 🎉</span>
          ) : Number.isFinite(r.mesosFins) ? (
            <>
              Te faltan {eur0.format(r.falta)}: lo tendrás en{" "}
              <span className="font-serif text-lg text-[var(--color-accent)]">{mesosText(r.mesosFins)}</span>.
            </>
          ) : (
            <span className="text-[var(--color-accent)]">Te faltan {eur0.format(r.falta)}. Pon una aportación mensual para ver cuándo llegas.</span>
          )}
        </p>
        <p className="mt-1 text-sm opacity-80">
          Hoy aguantarías unos{" "}
          {r.aguantes.toLocaleString("es-ES", { maximumFractionDigits: 1 })} meses sin ingresos.
          Referencia general: entre {eur0.format(r.min3)} (3 meses) y {eur0.format(r.max6)} (6 meses).
        </p>
      </div>

      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs text-[var(--color-ink-soft)]">
          <span>Tienes {eur0.format(num(estalvi))}</span>
          <span>{Math.round(r.progres * 100)} %</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-[var(--color-paper-strong)]">
          <div className="h-full rounded-full bg-[var(--color-proteccion)]" style={{ width: `${r.progres * 100}%` }} />
        </div>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-[var(--color-muted)]">
        Los meses por situación son orientativos. Si todavía no tienes nada apartado,
        empieza por el <Link className="underline" href="/ahorro/mini-fondo-inicial">mini-fondo inicial</Link>.
        Guárdalo en una cuenta separada y líquida, cubierta por el FGD, y no lo
        mezcles con las inversiones.
      </p>
    </div>
  );
}
