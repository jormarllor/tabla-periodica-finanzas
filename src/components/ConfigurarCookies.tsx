"use client";

/** Permite retirar o cambiar el consentimiento de cookies en cualquier momento. */
export default function ConfigurarCookies() {
  return (
    <button
      type="button"
      onClick={() => {
        try {
          localStorage.removeItem("cookie-consent");
        } catch {
          /* ignora */
        }
        window.dispatchEvent(new Event("cookie-consent-reset"));
      }}
      className="underline underline-offset-2 hover:text-[var(--color-primary)]"
    >
      Configurar cookies
    </button>
  );
}
