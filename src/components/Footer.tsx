import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-paper-strong)] mt-16 py-8 text-center text-sm text-[var(--color-muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-2">
        <p className="font-serif italic text-base text-[var(--color-ink-soft)]">
          — el bienestar financiero es la tranquilidad que experimentamos cuando tenemos el control sobre nuestras finanzas personales —
        </p>
        <p>
          Wellness Financiero ·{" "}
          <a
            href="https://www.linkedin.com/newsletters/wellness-financiero-7115738111975792640/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-primary)]"
          >
            Newsletter en LinkedIn
          </a>
        </p>
        <SocialLinks className="justify-center pt-1" />
        <p>Jordi Martínez-Llorente · {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
