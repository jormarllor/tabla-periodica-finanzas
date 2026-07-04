import { ImageResponse } from "next/og";
import { SITE_AUTHOR } from "@/lib/site";

export const alt = "Tabla periódica de las finanzas personales — Wellness Financiero";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5ebd6",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 9999,
              background: "#da670e",
            }}
          />
          <div
            style={{
              fontSize: 30,
              color: "#2e3a55",
              letterSpacing: 1,
            }}
          >
            Wellness Financiero
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 700,
              color: "#1a2540",
              lineHeight: 1.05,
              letterSpacing: -1,
            }}
          >
            Tabla periódica de las
          </div>
          <div
            style={{
              fontSize: 78,
              fontWeight: 700,
              color: "#1a2540",
              lineHeight: 1.05,
              letterSpacing: -1,
            }}
          >
            finanzas personales
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 34,
              color: "#2e3a55",
            }}
          >
            61 conceptos clave · 9 familias
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
            color: "#6b6a5b",
          }}
        >
          <div>{SITE_AUTHOR}</div>
          <div style={{ display: "flex", gap: 10 }}>
            {["#1f3a5f", "#3a7d44", "#c8412c", "#c98a3e", "#4a4878"].map(
              (c) => (
                <div
                  key={c}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 5,
                    background: c,
                  }}
                />
              ),
            )}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
