"use client";

import { useEffect, useRef } from "react";

/** Escala la tabla para que quepa entera dentro del iframe, sea cual sea el ancho. */
export default function EscalaIncrustat({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ajusta = () => {
      el.style.zoom = "1";
      const w = el.scrollWidth;
      el.style.zoom = String(Math.min(1, (window.innerWidth - 8) / w));
    };
    ajusta();
    window.addEventListener("resize", ajusta);
    return () => window.removeEventListener("resize", ajusta);
  }, []);
  return (
    <div ref={ref} style={{ width: "fit-content", margin: "0 auto" }}>
      {children}
    </div>
  );
}
