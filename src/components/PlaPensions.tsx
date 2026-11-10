"use client";

import { useMemo, useState } from "react";
import { DADES, IRPF, marginalIrpf, numDada, quotaEstalvi, quotaIrpf } from "@/lib/dades";

/**
 * Ahorro fiscal del plan de pensiones según el marginal (IRPF con la escala
 * orientativa estatal + autonómica de referencia; cada comunidad varía).
  * Calcula cuánto te reduce el IRPF la aportación de hoy y cuánto pagarías al
 * rescatarlo en forma de renta, para mostrar que es un APLAZAMIENTO de impuestos.
 * Aproximación: solo mínimo personal general, sin mínimos familiares ni
 * deducciones; el rescate se reparte a partes iguales en N años.
 */

const eur0 = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0, useGrouping: "always" });
const pct = (n: number) => n.toLocaleString("es-ES", { maximumFractionDigits: 1 }) + " %";
function num(s: string): number {
  const n = parseFloat(String(s).replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export default function PlaPensions() {
  const limit = numDada("plaPensionsLimit");
  const [base, setBase] = useState("35000");
  const [saldo, setSaldo] = useState("0");
  const [aportacio, setAportacio] = useState(String(limit));
  const [anys, setAnys] = useState("20");
  const [rendiment, setRendiment] = useState("4");
  const [pensio, setPensio] = useState("22000");
  const [anysRescat, setAnysRescat] = useState("10");

  const r = useMemo(() => {
    const B = num(base);
    const S0 = num(saldo);
    const A = num(aportacio);
    const N = Math.max(1, Math.round(num(anys)));
    const i = num(rendiment) / 100;
    const P = num(pensio);
    const R = Math.max(1, Math.round(num(anysRescat)));

    const deduible = Math.min(A, limit, B * 0.3);
    const estalviAny = quotaIrpf(B) - quotaIrpf(B - deduible);
    const marginal = marginalIrpf(B);
    const estalviTotal = estalviAny * N;

    // Aportación a principio de año, N años, rendimiento i. El saldo actual crece al mismo ritmo.
    const fv = (x: number) => (i === 0 ? x * N : x * ((Math.pow(1 + i, N) - 1) / i) * (1 + i));
    const capitalSaldo = S0 * Math.pow(1 + i, N);
    const capitalNou = fv(A);
    const capital = capitalSaldo + capitalNou;
    const aportat = A * N;

    // IRPF del rescate en forma de renta, repartido en R años encima de la pensión.
    const impostSobre = (cap: number) => (quotaIrpf(P + cap / R) - quotaIrpf(P)) * R;
    const perAny = capital / R;
    const impostRescat = impostSobre(capital);
    // Parte del impuesto que se explica por las aportaciones nuevas (se apilan sobre el saldo existente).
    const impostNou = impostRescat - impostSobre(capitalSaldo);
    const tipusRescat = capital > 0 ? (impostRescat / capital) * 100 : 0;
    const marginalRescat = marginalIrpf(P + perAny);

    // Comparación justa (solo de las aportaciones nuevas; el saldo actual ya está en el plan):
    // el plan te cuesta A − ahorro fiscal cada año. Invertimos ese mismo
    // esfuerzo neto en un fondo; las ganancias tributan en la base del
    // ahorro, reembolsadas en los mismos R años.
    const esforc = Math.max(0, A - estalviAny);
    const capitalFons = fv(esforc);
    const guanyFons = Math.max(0, capitalFons - esforc * N);
    const impostFons = quotaEstalvi(guanyFons / R) * R;
    const netPla = capitalNou - impostNou;
    const tipusNou = capitalNou > 0 ? (impostNou / capitalNou) * 100 : 0;
    const netFons = capitalFons - impostFons;

    return {
      deduible, estalviAny, marginal, estalviTotal, capital, aportat,
      perAny, impostRescat, tipusRescat, marginalRescat, esforc, capitalSaldo, tipusNou, S0, A, netPla, netFons, exces: Math.max(0, A - deduible),
    };
  }, [base, saldo, aportacio, anys, rendiment, pensio, anysRescat, limit]);

  const inputClass =
    "w-full rounded-lg border border-[var(--color-paper-strong)] bg-white px-3 py-2 text-[var(--color-ink)] outline-none focus:border-[var(--color-primary)]";

  const avantatge = r.netPla - r.netFons;

  return (
    <div className="not-prose rounded-2xl border border-[var(--color-paper-strong)] bg-[var(--color-paper)] p-5 sm:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Base liquidable general (€/año)"
          hint="La encontrarás en tu declaración de la renta. Si no, aproxímala con el sueldo bruto menos la Seguridad Social y 2.000 €."
        >
          <input className={inputClass} inputMode="decimal" value={base} onChange={(e) => setBase(e.target.value)} />
        </Field>
        <Field label="Saldo actual del plan (€)" hint="Si ya tienes uno. Pon 0 si empiezas ahora.">
          <input className={inputClass} inputMode="decimal" value={saldo} onChange={(e) => setSaldo(e.target.value)} />
        </Field>
        <Field label="Aportación anual al plan (€)" hint={`Límite general: ${DADES.plaPensionsLimit.valor} y el 30% de los rendimientos del trabajo.`}>
          <input className={inputClass} inputMode="decimal" value={aportacio} onChange={(e) => setAportacio(e.target.value)} />
        </Field>
        <Field label="Años hasta la jubilación">
          <input className={inputClass} inputMode="numeric" value={anys} onChange={(e) => setAnys(e.target.value)} />
        </Field>
        <Field label="Rendimiento anual del plan (%)" hint="Nominal y neto de comisiones.">
          <input className={inputClass} inputMode="decimal" value={rendiment} onChange={(e) => setRendiment(e.target.value)} />
        </Field>
        <Field label="Ingresos anuales previstos en la jubilación (€)" hint="Sobre todo la pensión pública bruta.">
          <input className={inputClass} inputMode="decimal" value={pensio} onChange={(e) => setPensio(e.target.value)} />
        </Field>
        <Field label="Años en los que lo rescatarás" hint="En forma de renta, repartido a partes iguales.">
          <input className={inputClass} inputMode="numeric" value={anysRescat} onChange={(e) => setAnysRescat(e.target.value)} />
        </Field>
      </div>

      <div className="mt-6 rounded-xl bg-[var(--color-ink)] p-5 text-[var(--color-paper)]">
        <p className="text-sm opacity-80">
          Ahorro en la renta cada año · tu marginal orientativo es del {pct(r.marginal)}
        </p>
        <p className="font-serif text-3xl sm:text-4xl">{eur0.format(r.estalviAny)}</p>
        <p className="mt-2 text-sm opacity-90">
          En {num(anys) || 1} años: {eur0.format(r.estalviTotal)}{" "}menos de IRPF.
          {r.exces > 0 && (
            <span className="text-[var(--color-accent)]">
              {" "}Ojo: {eur0.format(r.exces)} de la aportación no reduce la base.
            </span>
          )}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-[var(--color-paper-strong)] bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-[var(--color-muted)]">Capital del plan al jubilarte</p>
          <p className="font-serif text-2xl text-[var(--color-ink)]">{eur0.format(r.capital)}</p>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            {r.S0 > 0
              ? `${eur0.format(r.capitalSaldo)} del saldo actual + ${eur0.format(r.capital - r.capitalSaldo)} de las nuevas aportaciones (${eur0.format(r.aportat)} aportados)`
              : `Has aportado ${eur0.format(r.aportat)}`}
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-paper-strong)] bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-[var(--color-muted)]">IRPF al rescatarlo</p>
          <p className="font-serif text-2xl text-[var(--color-ink)]">{eur0.format(r.impostRescat)}</p>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            {eur0.format(r.perAny)}/año · tipo medio {pct(r.tipusRescat)} · marginal {pct(r.marginalRescat)}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[var(--color-paper-strong)] bg-white p-4 text-sm text-[var(--color-ink-soft)]">
        {r.A > 0 ? (
          <>
          <p>
            <strong className="text-[var(--color-ink)]">Es un aplazamiento, no un regalo.</strong>{" "}
            El IRPF que te ahorras hoy lo pagas al rescatarlo. La pregunta es si
              compensa frente a invertir el mismo esfuerzo neto ({eur0.format(r.esforc)}/año)
              en un fondo de inversión, donde solo tributan las ganancias
            {r.S0 > 0 && <> (la comparación es solo de las aportaciones nuevas: el saldo que ya tienes está igualmente, y hace que las nuevas tributen a un tipo más alto en el rescate)</>}:
          </p>
          <ul className="mt-2 space-y-1">
            <li>Plan de pensiones, neto de impuestos: <strong className="text-[var(--color-ink)]">{eur0.format(r.netPla)}</strong></li>
            <li>Fondo de inversión, neto de impuestos: <strong className="text-[var(--color-ink)]">{eur0.format(r.netFons)}</strong></li>
          </ul>
          <p className="mt-2">
            {avantatge >= 0 ? (
              <>El plan te dejaría unos <strong className="text-[var(--color-ink)]">{eur0.format(avantatge)} más</strong>
              {r.marginal - r.tipusNou >= 1
                ? <>, sobre todo porque tu marginal de hoy ({pct(r.marginal)}) es más alto que el tipo en el rescate de las nuevas aportaciones ({pct(r.tipusNou)}).</>
                : <>. Tu marginal de hoy ({pct(r.marginal)}) y el tipo en el rescate ({pct(r.tipusNou)}) son parecidos: la ventaja viene de invertir la aportación entera y aplazar el impuesto.</>}
            </>
            ) : (
              <>El fondo te dejaría unos <strong className="text-[var(--color-ink)]">{eur0.format(-avantatge)} más</strong>: con estos números, el plan no compensa por fiscalidad.</>
            )}
          </p>
          </>
        ) : (
          <p>
            <strong className="text-[var(--color-ink)]">Sin aportaciones nuevas</strong>, el
            plan sigue creciendo y al rescatarlo pagarás unos {eur0.format(r.impostRescat)}{" "}
            de IRPF (un {pct(r.tipusRescat)} del capital). Pon una aportación anual para
            ver si te compensa seguir aportando.
          </p>
        )}
        <p className="mt-2">
          {r.A > 0 && <>La comparación supone que no te gastas el ahorro en la renta. </>}
          Ten en cuenta la poca liquidez del plan: solo están disponibles las aportaciones con 10 años
          de antigüedad (hoy, las hechas hasta el {DADES.plaPensionsLiquidesFins.valor}).
        </p>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-[var(--color-muted)]">
        Aproximación con una escala de IRPF orientativa (estatal + autonómica de
        referencia, {IRPF.data}): el tipo real de tu comunidad puede variar uno o dos
        puntos. Solo incluye el mínimo personal general: no incluye mínimos por hijos o
        edad, deducciones, rescate en forma de capital ni el régimen de las aportaciones
        anteriores a 2007. Los importes no están descontados de inflación. Para una
        decisión concreta, haz una simulación en Renta Web o consulta a un asesor.
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
