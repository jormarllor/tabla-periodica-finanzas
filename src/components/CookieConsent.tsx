"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

/**
 * Avís de cookies conforme amb l'RGPD:
 * - Google Analytics NO es carrega fins que l'usuari accepta.
 * - "Accepta" i "Rebutja" tenen la mateixa visibilitat.
 * - La decisió es desa a localStorage i no es torna a preguntar.
 * - GA només s'activa en producció (no embruta les dades en local).
 *
 * Mesura (afegit novembre 2026):
 * - Només s'envien dades des del domini de producció (no des de les
 *   previsualitzacions de Vercel ni des de localhost), tret que s'obri una URL
 *   amb ?debug_mode=1 per provar-ho a DebugView.
 * - ?intern=1 marca aquest navegador com a trànsit intern (traffic_type =
 *   "internal") perquè el filtre de GA4 l'exclogui; ?intern=0 ho desfà.
 * - ?debug_mode=1 activa el mode de depuració durant la sessió.
 * - La navegació interna (Next.js) la registra la mesura millorada de GA4
 *   ("canvis de pàgina segons l'historial"); aquí no s'envia cap page_view
 *   manual, per no duplicar-ne.
 */
const HOSTS_PRODUCCIO = ["tablaperiodicafinanciera.es", "www.tablaperiodicafinanciera.es"];

/** Llegeix els paràmetres ?intern= i ?debug_mode= i en desa l'estat. */
function configMesura(): { enabled: boolean; cfg: Record<string, unknown> } {
  const params = new URLSearchParams(window.location.search);
  try {
    if (params.get("intern") === "1") localStorage.setItem("trafico-interno", "1");
    if (params.get("intern") === "0") localStorage.removeItem("trafico-interno");
    if (params.get("debug_mode") === "1") sessionStorage.setItem("ga-debug", "1");
    if (params.get("debug_mode") === "0") sessionStorage.removeItem("ga-debug");
  } catch {
    /* emmagatzematge no disponible */
  }
  let intern = false;
  let debug = false;
  try {
    intern = localStorage.getItem("trafico-interno") === "1";
    debug = sessionStorage.getItem("ga-debug") === "1";
  } catch {
    /* ignora */
  }
  const cfg: Record<string, unknown> = {};
  if (intern) cfg.traffic_type = "internal";
  if (debug) cfg.debug_mode = true;
  return { enabled: HOSTS_PRODUCCIO.includes(window.location.hostname) || debug, cfg };
}
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

  // L'enllaç "Configurar cookies" del peu torna a mostrar l'avís.
  useEffect(() => {
    const reobre = () => setConsent(null);
    window.addEventListener("cookie-consent-reset", reobre);
    return () => window.removeEventListener("cookie-consent-reset", reobre);
  }, []);

  function decide(value: "granted" | "denied") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignora */
    }
    // Si es retira el consentiment amb GA ja carregat, l'atura a l'instant.
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = value === "denied";
    setConsent(value);
  }

  const isProd = process.env.NODE_ENV === "production";
  const showBanner = mounted && consent === null;
  const mesura = mounted && consent === "granted" ? configMesura() : null;

  return (
    <>
      {isProd && mesura?.enabled && GA_ID && (
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
              gtag('config', '${GA_ID}', ${JSON.stringify(mesura.cfg)});
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
