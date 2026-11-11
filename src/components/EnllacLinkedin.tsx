"use client";

import type { CSSProperties, ReactNode } from "react";
import { trackLinkedin, type LinkedinKind, type LinkLocation } from "@/lib/analytics";
import { LINKEDIN_PROFILE_URL, NEWSLETTER_URL } from "@/lib/site";

/**
 * Enlace a LinkedIn (perfil personal o newsletter) que se abre en una pestaña
 * nueva y registra el clic en GA4 con su ubicación.
 */
export default function EnllacLinkedin({
  kind,
  location,
  element,
  href,
  className,
  style,
  ariaLabel,
  children,
}: {
  kind: LinkedinKind;
  location: LinkLocation;
  /** Número del elemento financiero (1-61), si el enlace está en una ficha. */
  element?: number;
  /** Destino; por defecto, el perfil o la newsletter según `kind`. */
  href?: string;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
  children: ReactNode;
}) {
  const url = href ?? (kind === "perfil" ? LINKEDIN_PROFILE_URL : NEWSLETTER_URL);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      aria-label={ariaLabel}
      onClick={() => trackLinkedin(kind, location, url, element)}
    >
      {children}
    </a>
  );
}

/** Icono de LinkedIn (hereda el color del texto). */
export function IconaLinkedin({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/**
 * Invitación discreta a seguir el perfil personal (fichas y herramientas).
 * Un solo componente reutilizado en las 61 fichas.
 */
export function SigueLinkedin({
  location,
  element,
  text = "¿Te interesa comprender mejor tus finanzas personales?",
}: {
  location: LinkLocation;
  element?: number;
  text?: string;
}) {
  return (
    <p className="no-print mt-3 text-sm text-[var(--color-ink-soft)]">
      {text}{" "}
      <EnllacLinkedin
        kind="perfil"
        location={location}
        element={element}
        className="font-medium text-[var(--color-primary)] underline underline-offset-2 hover:text-[var(--color-primary-dark)]"
      >
        <span className="mr-1 inline-block align-[-2px]">
          <IconaLinkedin size={14} />
        </span>
        Sigue a Jordi Martínez-Llorente en LinkedIn
      </EnllacLinkedin>
      .
    </p>
  );
}
