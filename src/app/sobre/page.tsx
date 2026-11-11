import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { personaJsonLd } from "@/lib/autor";
import JsonLd from "@/components/JsonLd";
import { metaSocial } from "@/lib/meta";
import SocialLinks from "@/components/SocialLinks";
import EnllacLinkedin from "@/components/EnllacLinkedin";

const SOBRE_TITOL = "Sobre mí: Jordi Martínez-Llorente";
const SOBRE_DESC =
  "Qué es la tabla periódica de las finanzas personales y quién está detrás: Jordi Martínez-Llorente, director de educación financiera del IEF y creador de Wellness Financiero.";

export const metadata: Metadata = {
  title: SOBRE_TITOL,
  description: SOBRE_DESC,
  alternates: { canonical: "/sobre" },
  ...metaSocial(SOBRE_TITOL, SOBRE_DESC, "/sobre"),
};

export default function SobrePage() {
  return (
    <article className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: `${SITE_URL}/sobre`,
          inLanguage: "es",
          mainEntity: personaJsonLd(),
        }}
      />
      <h1 className="font-serif text-4xl sm:text-5xl leading-tight">
        Sobre mí
      </h1>
      <p className="font-serif text-xl text-[var(--color-ink-soft)] font-medium mt-4 leading-snug">
        El bienestar financiero es la tranquilidad que experimentamos cuando
        tenemos el control sobre nuestras finanzas personales.
      </p>

      <section className="element-prose mt-8">
        <p>
          Esta tabla periódica recoge <strong>61 conceptos clave de finanzas
          personales</strong>, agrupados en <strong>9 familias</strong>. Cada
          celda es un elemento: un punto de partida sencillo para entender una idea,
          tomar mejores decisiones y pasar a la acción.
        </p>

        <h2>¿Por qué una tabla periódica?</h2>
        <p>
          Igual que los elementos químicos forman la materia, estos elementos
          financieros forman la base de un plan personal sólido.
        </p>
        <p>
          Por separado, cada elemento ya puede ayudarte a mejorar una decisión
          concreta: ahorrar un poco mejor, entender una deuda, protegerte
          de un fraude, revisar una póliza, preparar la jubilación o empezar a
          invertir con más criterio.
        </p>
        <p>
          Combinados, construyen algo más importante:{" "}
          <strong>margen, control y tranquilidad</strong>.
        </p>
        <p>
          No se trata de hacerlo todo perfecto. Se trata de ir incorporando
          piezas pequeñas que, con el tiempo, te permitan vivir con menos ruido
          financiero y más capacidad de decisión.
        </p>

        <h2>Quién está detrás</h2>
        <p>
          Soy <strong>Jordi Martínez-Llorente</strong>, director de educación
          financiera del <strong>Instituto de Estudios Financieros</strong> y creador
          de <strong>Wellness Financiero</strong>.
        </p>
        <p>
          Desde hace años trabajo en proyectos de educación financiera para ayudar
          a personas, familias y estudiantes a entender mejor el dinero y tomar
          decisiones con más criterio.
        </p>
        <p>
          Esta tabla nace del mismo objetivo: convertir las finanzas
          personales en ideas claras, útiles y aplicables al día a día.
        </p>
        <p>
          En{" "}
          <EnllacLinkedin kind="newsletter" location="sobre">
            Wellness Financiero
          </EnllacLinkedin>{" "}
          comparto contenidos sobre bienestar financiero, educación financiera y
          finanzas personales con una idea central: el dinero no es solo
          números; también es tranquilidad y calidad de vida.
        </p>
      </section>

      <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-[var(--color-paper-strong)] pt-6">
        <span className="text-sm text-[var(--color-muted)]">Me puedes seguir en</span>
        <SocialLinks location="sobre" />
      </div>

      <p className="mt-8 text-xs leading-relaxed text-[var(--color-muted)]">
        He creado esta web con el apoyo de herramientas de inteligencia
        artificial (Claude y ChatGPT) para el diseño y la programación. Los
        contenidos, el criterio y las decisiones son míos.
      </p>
    </article>
  );
}
