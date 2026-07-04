"use client";

import { useMemo, useState } from "react";

/**
 * Presupuesto personal detallado (adaptado del Presupuesto ETD de Jordi).
 * Estilo de la tabla, sin dependencias: el donut es un SVG propio.
 * Categorías de ingresos y gastos (fijos, variables, no necesarios, ahorro),
 * resumen con balance (superávit/déficit) y reparto como % de los ingresos.
 * Se puede imprimir / guardar en PDF y descargar en Excel.
 */

type Bucket = "income" | "fixed" | "variable" | "non" | "savings";

const SECTIONS: {
  title: string;
  icon: string;
  open?: boolean;
  groups: { title: string; bucket: Bucket; items: string[] }[];
}[] = [
  {
    title: "Ingresos",
    icon: "💰",
    open: true,
    groups: [
      { title: "Profesionales", bucket: "income", items: ["Sueldo", "Propinas, bonus, pagas extra", "Indemnizaciones", "Otros profesionales"] },
      { title: "Pensiones", bucket: "income", items: ["Jubilación, viudedad, invalidez", "Pensión alimentaria"] },
      { title: "Ingresos financieros", bucket: "income", items: ["Intereses recibidos", "Dividendos", "Alquileres"] },
      { title: "Otros", bucket: "income", items: ["Otros ingresos generales"] },
    ],
  },
  {
    title: "Gastos necesarios fijos",
    icon: "🏠",
    groups: [
      { title: "Vivienda", bucket: "fixed", items: ["Alquiler", "Préstamo hipotecario 1ª residencia", "Gastos de comunidad", "Seguro del hogar"] },
      { title: "Seguros", bucket: "fixed", items: ["Vehículo", "Vida y otros"] },
      { title: "Deudas y gastos financieros", bucket: "fixed", items: ["Préstamo del coche", "Otros préstamos", "Pago aplazado de la tarjeta", "Comisiones"] },
      { title: "Impuestos", bucket: "fixed", items: ["IRPF", "IBI", "Impuesto de circulación"] },
      { title: "Ahorro", bucket: "savings", items: ["Aportación al fondo de emergencia", "Aportación a otros objetivos", "Otros ahorros"] },
      { title: "Otros", bucket: "fixed", items: ["Otros gastos fijos"] },
    ],
  },
  {
    title: "Gastos necesarios variables",
    icon: "🛒",
    groups: [
      { title: "Hogar y suministros", bucket: "variable", items: ["Comida", "Electricidad", "Gas y agua", "Teléfono e internet"] },
      { title: "Transporte y vehículo", bucket: "variable", items: ["Combustible", "Mantenimiento y reparación", "Parking y peajes", "Transporte público"] },
      { title: "Cuidado personal y familiar", bucket: "variable", items: ["Ropa y calzado", "Farmacia y gastos médicos", "Higiene"] },
      { title: "Educación y cuidado de los hijos", bucket: "variable", items: ["Guardería, colegio, universidad", "Libros y extraescolares", "Campamentos y canguros"] },
      { title: "Mascotas", bucket: "variable", items: ["Comida y veterinario"] },
      { title: "Otros", bucket: "variable", items: ["Otros gastos variables"] },
    ],
  },
  {
    title: "Gastos no necesarios",
    icon: "🍹",
    groups: [
      { title: "Cuidado personal y ocio diario", bucket: "non", items: ["Peluquería y tintorería", "Gimnasio y clubes", "Restaurantes, bares y cafés", "Alcohol y tabaco"] },
      { title: "Entretenimiento y estilo de vida", bucket: "non", items: ["Cine, teatro, conciertos", "Plataformas y libros", "Fiestas, bodas, regalos", "Vacaciones y segunda residencia", "Regalos y donaciones"] },
      { title: "Otros", bucket: "non", items: ["Otros gastos no necesarios"] },
    ],
  },
];

const COL = { nec: "#2d5a87", non: "#e8842e", est: "#3a7d44", marge: "#ddd5c2" };

const eur0 = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const pct0 = (n: number) => Math.round(n * 100) + " %";
function num(s: string): number {
  const n = parseFloat(String(s).replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : 0;
}
const keyOf = (si: number, gi: number, ii: number) => `${si}-${gi}-${ii}`;

/** Path de un segmento del donut. */
function donutSeg(cx: number, cy: number, R: number, r: number, a0: number, a1: number) {
  const p = (rad: number, ang: number): [number, number] => [cx + rad * Math.cos(ang), cy + rad * Math.sin(ang)];
  const [x0o, y0o] = p(R, a0), [x1o, y1o] = p(R, a1);
  const [x1i, y1i] = p(r, a1), [x0i, y0i] = p(r, a0);
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M ${x0o} ${y0o} A ${R} ${R} 0 ${large} 1 ${x1o} ${y1o} L ${x1i} ${y1i} A ${r} ${r} 0 ${large} 0 ${x0i} ${y0i} Z`;
}

export default function Pressupost() {
  const [values, setValues] = useState<Record<string, string>>({});
  const set = (k: string, v: string) => setValues((p) => ({ ...p, [k]: v }));

  const t = useMemo(() => {
    let income = 0, fixed = 0, variable = 0, non = 0, savings = 0;
    SECTIONS.forEach((s, si) =>
      s.groups.forEach((g, gi) =>
        g.items.forEach((_, ii) => {
          const v = num(values[keyOf(si, gi, ii)] ?? "");
          if (g.bucket === "income") income += v;
          else if (g.bucket === "fixed") fixed += v;
          else if (g.bucket === "variable") variable += v;
          else if (g.bucket === "non") non += v;
          else savings += v;
        }),
      ),
    );
    const nec = fixed + variable;
    const despeses = nec + non + savings;
    const balanc = income - despeses;
    const base = income > 0 ? income : despeses;

    const raw = [
      { label: "Necesarios", value: nec, color: COL.nec },
      { label: "No necesarios", value: non, color: COL.non },
      { label: "Ahorro", value: savings, color: COL.est },
    ];
    if (income > despeses) raw.push({ label: "Margen sin asignar", value: income - despeses, color: COL.marge });
    const denom = Math.max(base, despeses, 1);
    const segs = raw.filter((s) => s.value > 0).map((s) => ({ ...s, frac: s.value / denom, pct: base > 0 ? s.value / base : 0 }));

    return { income, fixed, variable, non, savings, nec, despeses, balanc, base, segs };
  }, [values]);

  // Donut
  const cx = 110, cy = 110, R = 96, r = 60;
  let acc = -Math.PI / 2;
  const arcs = t.segs.map((s) => {
    const a0 = acc;
    const a1 = acc + s.frac * 2 * Math.PI;
    acc = a1;
    return { ...s, d: donutSeg(cx, cy, R, r, a0, Math.min(a1, a0 + 2 * Math.PI - 0.0001)) };
  });
  const single = t.segs.length === 1;

  function buildHtml(): string {
    const fmt = (n: number) => Math.round(n).toString();
    const pctOf = (v: number) => (t.base > 0 ? Math.round((v / t.base) * 100) + " %" : "");
    const detall = SECTIONS.map((s, si) => {
      const rows = s.groups.flatMap((g, gi) =>
        g.items
          .map((label, ii) => ({ label, v: num(values[keyOf(si, gi, ii)] ?? "") }))
          .filter((x) => x.v > 0)
          .map((x) => `<tr><td>${x.label}</td><td style="text-align:right">${fmt(x.v)}</td></tr>`),
      );
      if (!rows.length) return "";
      return `<tr><td colspan="2" style="background:#f0ead8;font-weight:bold">${s.title}</td></tr>${rows.join("")}`;
    }).join("");
    const data = new Date().toLocaleDateString("es-ES");
    return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>Presupuesto personal</title>
    <style>
      body{font-family:Georgia,'Times New Roman',serif;color:#1a2540;padding:28px;}
      h1{font-size:22px;margin:0 0 10px;}
      table{border-collapse:collapse;width:100%;max-width:620px;font-family:Arial,Helvetica,sans-serif;font-size:13px;margin-bottom:18px;}
      th,td{border:1px solid #d9d2c0;padding:6px 10px;}
      th{background:#1a2540;color:#f5ebd6;text-align:left;}
      .note{color:#6b6a5b;font-size:12px;font-family:Arial,Helvetica,sans-serif;max-width:620px;}
    </style></head><body>
    <h1>Presupuesto personal</h1>
    <table>
      <tr><th>Resumen</th><th style="text-align:right">€</th><th style="text-align:right">% ingresos</th></tr>
      <tr><td>Ingresos</td><td style="text-align:right">${fmt(t.income)}</td><td></td></tr>
      <tr><td>Necesarios (fijos + variables)</td><td style="text-align:right">${fmt(t.nec)}</td><td style="text-align:right">${pctOf(t.nec)}</td></tr>
      <tr><td>No necesarios</td><td style="text-align:right">${fmt(t.non)}</td><td style="text-align:right">${pctOf(t.non)}</td></tr>
      <tr><td>Ahorro</td><td style="text-align:right">${fmt(t.savings)}</td><td style="text-align:right">${pctOf(t.savings)}</td></tr>
      <tr><td>Total gastos</td><td style="text-align:right">${fmt(t.despeses)}</td><td></td></tr>
      <tr><td style="font-weight:bold">Balance (${t.balanc >= 0 ? "superávit" : "déficit"})</td><td style="text-align:right;font-weight:bold">${fmt(t.balanc)}</td><td></td></tr>
    </table>
    ${detall ? `<table><tr><th>Detalle</th><th style="text-align:right">€</th></tr>${detall}</table>` : ""}
    <p class="note">El presupuesto es una foto de tu mes para tomar decisiones con calma. Generado en tablaperiodicafinanzas.es · ${data}</p>
    </body></html>`;
  }

  function imprimir() {
    const w = window.open("", "_blank", "width=820,height=640");
    if (!w) return;
    w.document.write(buildHtml());
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 300);
  }
  function descarregarExcel() {
    const blob = new Blob(["﻿" + buildHtml()], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "presupuesto-personal.xls";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="not-prose grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Columna de entradas */}
      <div className="space-y-3">
        {SECTIONS.map((s, si) => (
          <details
            key={s.title}
            open={s.open}
            className="overflow-hidden rounded-xl border border-[var(--color-paper-strong)] bg-[var(--color-paper)] open:border-[var(--color-primary)]/50"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 font-serif text-[var(--color-ink)] [&::-webkit-details-marker]:hidden">
              <span>
                <span className="mr-2">{s.icon}</span>
                {s.title}
              </span>
              <span className="text-xl leading-none text-[var(--color-muted)]">
                <span className="[[open]_&]:hidden">+</span>
                <span className="hidden [[open]_&]:inline">−</span>
              </span>
            </summary>
            <div className="px-4 pb-4">
              {s.groups.map((g, gi) => (
                <div key={g.title}>
                  <p className="mt-3 mb-1 border-b border-[var(--color-paper-strong)] pb-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                    {g.title}
                  </p>
                  {g.items.map((label, ii) => {
                    const k = keyOf(si, gi, ii);
                    return (
                      <div key={k} className="flex items-center justify-between gap-3 py-1">
                        <label htmlFor={k} className="text-sm text-[var(--color-ink-soft)]">
                          {label}
                        </label>
                        <input
                          id={k}
                          inputMode="decimal"
                          placeholder="0"
                          value={values[k] ?? ""}
                          onChange={(e) => set(k, e.target.value)}
                          className="w-24 shrink-0 rounded-md border border-[var(--color-paper-strong)] bg-white px-2 py-1 text-right text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-primary)]"
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>

      {/* Columna de resultado */}
      <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-2xl bg-[var(--color-ink)] p-5 text-[var(--color-paper)]">
          <p className="text-sm opacity-80">
            {t.balanc >= 0 ? "Superávit (margen del mes)" : "Déficit (atención)"}
          </p>
          <p
            className="font-serif text-4xl"
            style={{ color: t.balanc >= 0 ? "#7ec98f" : "var(--color-accent)" }}
          >
            {eur0.format(t.balanc)}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg bg-white/10 p-3">
              <p className="opacity-70">Ingresos</p>
              <p className="font-serif text-lg">{eur0.format(t.income)}</p>
            </div>
            <div className="rounded-lg bg-white/10 p-3">
              <p className="opacity-70">Gastos</p>
              <p className="font-serif text-lg">{eur0.format(t.despeses)}</p>
            </div>
          </div>
        </div>

        {/* Donut */}
        <div className="rounded-2xl border border-[var(--color-paper-strong)] bg-[var(--color-paper)] p-5">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <svg viewBox="0 0 220 220" className="h-44 w-44 shrink-0" role="img" aria-label="Reparto del presupuesto">
              {t.segs.length === 0 && (
                <circle cx={cx} cy={cy} r={(R + r) / 2} fill="none" stroke="var(--color-paper-strong)" strokeWidth={R - r} />
              )}
              {single && (
                <circle cx={cx} cy={cy} r={(R + r) / 2} fill="none" stroke={t.segs[0].color} strokeWidth={R - r} />
              )}
              {!single && arcs.map((a) => <path key={a.label} d={a.d} fill={a.color} />)}
            </svg>
            <div className="w-full space-y-1.5 text-sm">
              {t.segs.length === 0 && (
                <p className="text-[var(--color-muted)]">Rellena el presupuesto para ver el reparto.</p>
              )}
              {t.segs.map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <span className="inline-block h-3 w-3 shrink-0 rounded-full" style={{ background: s.color }} />
                  <span className="flex-1 text-[var(--color-ink-soft)]">{s.label}</span>
                  <span className="font-medium text-[var(--color-ink)]">{eur0.format(s.value)}</span>
                  {t.base > 0 && <span className="w-12 text-right text-[var(--color-muted)]">{pct0(s.pct)}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={imprimir}
            className="rounded-lg border border-[var(--color-ink-soft)]/30 px-4 py-2 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-paper-strong)]/60"
          >
            🖨️ Imprimir / PDF
          </button>
          <button
            type="button"
            onClick={descarregarExcel}
            className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-dark)]"
          >
            ⬇️ Descargar en Excel
          </button>
        </div>

        <p className="text-xs leading-relaxed text-[var(--color-muted)]">
          El presupuesto es una foto de tu mes para tomar decisiones con calma,
          no un examen. Puedes rellenar solo las casillas que uses; la idea
          es ver adónde va el dinero y qué margen te queda.
        </p>
      </div>
    </div>
  );
}
