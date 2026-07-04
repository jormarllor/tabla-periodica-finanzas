"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

/**
 * Avís de cookies conforme amb l'RGPD:
 * - Google Analytics NO es carrega fins que l'usuari accepta.
 * - "Accepta" i "Rebutja" tenen la mateixa visibilitat.
 * - La decisió es desa a localStorage i no es torna a preguntar.
 * - GA només s'activa en producció (no embruta les dades en local).
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-7DQPGZ3QKM";
const STORAGE_KEY = "cookie-consent";

type Consent = "granted" | "denied" | null;

export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "granted" || stored === "denied") {
        setConsent(stored);
      }
    } catch {
      /* localStorage no disponible */
    }
  }, []);

  function decide(value: "granted" | "denied") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignora */
    }
    setConsent(value);
  }

  const isProd = process.env.NODE_ENV === "production";
  const showBanner = mounted && consent === null;

  return (
    <>
      {isProd && consent === "granted" && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {showBanner && (
        <div
          role="dialog"
          aria-label="Aviso de cookies"
          className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:max-w-sm rounded-xl border border-white/10 bg-[var(--color-ink)] p-4 text-[var(--color-paper)] shadow-2xl"
        >
          <p className="text-sm leading-relaxed">
            Uso cookies de Google Analytics para ver qué contenidos
            interesan más y mejorar la tabla. Sin tu consentimiento no
            se activa ninguna.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => decide("granted")}
              className="flex-1 rounded-lg bg-[var(--color-primary)] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-dark)]"
            >
              Aceptar
            </button>
            <button
              type="button"
              onClick={() => decide("denied")}
              className="flex-1 rounded-lg border border-white/25 px-3 py-2 text-sm font-medium text-[var(--color-paper)] transition-colors hover:bg-white/10"
            >
              Rechazar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
