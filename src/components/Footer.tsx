import SocialLinks from "./SocialLinks";
import EnllacLinkedin from "./EnllacLinkedin";
import ConfigurarCookies from "./ConfigurarCookies";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-paper-strong)] mt-16 py-8 text-center text-sm text-[var(--color-muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-2">
        <p className="font-serif italic text-base text-[var(--color-ink-soft)]">
          — el bienestar financiero es la tranquilidad que experimentamos cuando tenemos el control sobre nuestras finanzas personales —
        </p>
        <p>
          Wellness Financiero ·{" "}
          <EnllacLinkedin kind="newsletter" location="pie" className="hover:text-[var(--color-primary)]">
            Newsletter en LinkedIn
          </EnllacLinkedin>
        </p>
        <SocialLinks className="justify-center pt-1" />
        <p>
          Jordi Martínez-Llorente · {new Date().getFullYear()} · <ConfigurarCookies />
        </p>
      </div>
    </footer>
  );
}
