import Link from "next/link";
import EnllacLinkedin, { IconaLinkedin } from "./EnllacLinkedin";

export default function Navbar() {
  return (
    <header className="border-b border-[var(--color-paper-strong)] bg-[var(--color-paper)]/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex flex-col gap-1.5 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="flex items-center gap-2 self-start md:self-auto">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ background: "var(--color-primary)" }}
          />
          <span className="font-serif text-lg text-[var(--color-ink)]">
            Tabla periódica financiera
          </span>
        </Link>
        <nav
          aria-label="Principal"
          className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm lg:gap-x-6"
        >
          <Link href="/" className="hidden sm:inline hover:text-[var(--color-primary)] transition-colors">
            Tabla
          </Link>
          <Link href="/herramientas" className="hover:text-[var(--color-primary)] transition-colors">
            Herramientas
          </Link>
          <Link href="/poster" className="hidden lg:inline hover:text-[var(--color-primary)] transition-colors">
            Póster
          </Link>
          <Link href="/sobre" className="hover:text-[var(--color-primary)] transition-colors">
            Sobre mí
          </Link>
          <EnllacLinkedin
            kind="newsletter"
            location="cabecera"
            className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
          >
            Newsletter ↗
          </EnllacLinkedin>
          <EnllacLinkedin
            kind="perfil"
            location="cabecera"
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-paper-strong)] px-2.5 py-1 text-[var(--color-ink-soft)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            <IconaLinkedin size={14} />
            Sígueme en LinkedIn
          </EnllacLinkedin>
        </nav>
      </div>
    </header>
  );
}
