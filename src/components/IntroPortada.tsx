import Link from "next/link";

/** "Empieza aquí" y texto de introducción de la portada, bajo la tabla. */

const PORTES = [
  {
    titol: "Quiero ahorrar",
    icona: "🌱",
    color: "var(--color-ahorro)",
    text: "Crea el colchón y el hábito antes que nada.",
    enllacos: [
      { href: "/ahorro/pay-yourself-first", text: "Págate primero" },
      { href: "/proteccion/fondo-emergencia-basico", text: "Fondo de emergencia" },
      { href: "/ahorro/tasa-ahorro", text: "Tu tasa de ahorro" },
    ],
    eina: { href: "/herramientas/fondo-emergencia", text: "Calcula tu fondo de emergencia" },
  },
  {
    titol: "Tengo deudas",
    icona: "🧯",
    color: "var(--color-deuda)",
    text: "Primero, apaga el fuego de las deudas caras.",
    enllacos: [
      { href: "/deuda/tae-tarjeta-credito", text: "Tarjetas y revolving" },
      { href: "/deuda/metodo-avalancha", text: "Método avalancha" },
      { href: "/deuda/ratio-endeudamiento", text: "Ratio de endeudamiento" },
    ],
    eina: { href: "/herramientas/deuda", text: "Simula cómo pagarlas" },
  },
  {
    titol: "Quiero invertir",
    icona: "📈",
    color: "var(--color-inversion)",
    text: "Haz que el tiempo trabaje a tu favor.",
    enllacos: [
      { href: "/inversion/interes-compuesto", text: "Interés compuesto" },
      { href: "/inversion/ter-fondo-indexado", text: "Fondos indexados y comisiones" },
      { href: "/inversion/diversifica", text: "Diversifica" },
    ],
    eina: { href: "/herramientas/planificador", text: "Calcula cuánto puedes acumular" },
  },
];

export default function IntroPortada() {
  return (
    <div className="mx-auto mt-12 max-w-5xl">
      <section aria-labelledby="empieza-aqui">
        <h2 id="empieza-aqui" className="text-center font-serif text-2xl sm:text-3xl text-[var(--color-ink)]">
          Empieza aquí
        </h2>
        <p className="mt-2 text-center text-sm text-[var(--color-muted)]">
          Elige por dónde quieres empezar. Cada puerta te abre tres fichas y una calculadora.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {PORTES.map((p) => (
            <div
              key={p.titol}
              className="rounded-2xl border border-[var(--color-paper-strong)] bg-white/70 p-5"
              style={{ borderTop: `4px solid ${p.color}` }}
            >
              <p className="font-serif text-xl text-[var(--color-ink)]">
                <span className="mr-2" aria-hidden>
                  {p.icona}
                </span>
                {p.titol}
              </p>
              <p className="mt-1 text-sm text-[var(--color-ink-soft)]">{p.text}</p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {p.enllacos.map((e) => (
                  <li key={e.href}>
                    <Link href={e.href} className="text-[var(--color-ink)] underline underline-offset-2 hover:text-[var(--color-primary)]">
                      {e.text}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={p.eina.href} className="mt-4 inline-block text-sm font-medium" style={{ color: p.color }}>
                {p.eina.text} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="element-prose mx-auto mt-12 max-w-3xl">
        <h2>Qué es la tabla periódica de las finanzas personales</h2>
        <p>
          Es un mapa de <strong>61 conceptos clave de finanzas personales</strong>, ordenados
          en nueve familias: ahorro, presupuesto, inversión, deuda, jubilación, protección,
          psicología financiera, educación y ciberseguridad. Cada celda resume una idea con
          una cifra o una palabra fácil de recordar, como el 50/30/20, el fondo de emergencia
          de 3-6 meses o la regla del 72.
        </p>
        <p>
          Si pulsas un elemento, encontrarás una ficha con qué significa, por qué importa, un
          ejemplo con números, cómo aplicarlo hoy y los errores más habituales. Los datos que
          cambian, como el Euríbor, la inflación o los límites fiscales, llevan fecha y
          fuente. También tienes <Link href="/herramientas">calculadoras gratuitas</Link> de
          hipoteca, interés compuesto, fondo de emergencia, plan de pensiones y deudas.
        </p>
        <p>
          Está pensada para cualquier persona que quiera poner orden en su dinero sin letra
          pequeña, y también para docentes y formadores: puedes{" "}
          <Link href="/poster">imprimirla en formato póster</Link>. La he hecho yo,{" "}
          <Link href="/sobre">Jordi Martínez-Llorente</Link>, director de Educación Financiera
          del Instituto de Estudios Financieros.
        </p>
      </section>
    </div>
  );
}
