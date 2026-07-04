import { ImageResponse } from "next/og";
import { CATEGORIES, ELEMENTS, getElementBySlug } from "@/lib/elements";

export const alt = "Elemento de la tabla periódica de las finanzas personales";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return ELEMENTS.map((e) => ({ categoria: e.categoria, slug: e.slug }));
}

// Color sólido por familia (los tokens CSS no están disponibles dentro de ImageResponse).
const FAMILY_COLORS: Record<string, string> = {
  ahorro: "#1f3a5f",
  presupuesto: "#2d5a87",
  inversion: "#3a7d44",
  deuda: "#c8412c",
  jubilacion: "#c98a3e",
  proteccion: "#4a4878",
  psicologia: "#d2693d",
  educacion: "#2c4a6e",
  ciberseguridad: "#4a5a8a",
};

interface Props {
  params: Promise<{ categoria: string; slug: string }>;
}

export default async function ElementOgImage({ params }: Props) {
  const { categoria, slug } = await params;
  const element = getElementBySlug(categoria, slug);
  const info = element ? CATEGORIES[element.categoria] : undefined;
  const bg = FAMILY_COLORS[categoria] ?? "#1a2540";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: bg,
          color: "#f5ebd6",
          padding: "70px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            textTransform: "uppercase",
            letterSpacing: 4,
            opacity: 0.85,
          }}
        >
          {info ? `${info.nom} · elemento ${element!.id}` : "Finanzas personales"}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 700, lineHeight: 1.02 }}>
            {element ? element.simbol : "Tabla periódica"}
          </div>
          {element && (
            <div style={{ fontSize: 42, marginTop: 18, opacity: 0.95 }}>
              {element.nom}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            opacity: 0.9,
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 9999,
              background: "#da670e",
            }}
          />
          Tabla periódica de las finanzas personales · Wellness Financiero
        </div>
      </div>
    ),
    { ...size },
  );
}
