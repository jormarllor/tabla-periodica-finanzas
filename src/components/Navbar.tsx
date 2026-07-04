import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-[var(--color-paper-strong)] bg-[var(--color-paper)]/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ background: "var(--color-primary)" }}
          />
          <span className="font-serif text-lg text-[var(--color-ink)]">
            Tabla periódica financiera
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">
            Tabla
          </Link>
          <Link href="/herramientas" className="hover:text-[var(--color-primary)] transition-colors">
            Herramientas
          </Link>
          <Link href="/sobre" className="hover:text-[var(--color-primary)] transition-colors">
            Sobre mí
          </Link>
          <a
            href="https://www.linkedin.com/newsletters/wellness-financiero-7115738111975792640/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
          >
            Newsletter ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
