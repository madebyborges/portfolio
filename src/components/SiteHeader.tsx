import { useEffect, useState } from "react";
import moonStarsIcon from "../assets/moon-stars-dark.svg";
import sunLightIcon from "../assets/sun-light.svg";

export type ThemeMode = "light" | "dark";

const APP_BASE_URL = import.meta.env.BASE_URL;

const navItems = [
  { label: "Projetos", hash: "#projetos" },
  { label: "Sobre mim", hash: "#sobre-mim" },
  { label: "Contato", hash: "#contato" },
  { label: "Resumo PDF", hash: "#resumo-pdf" },
];

function isProjectView() {
  const basePath = APP_BASE_URL.replace(/\/$/, "");
  const pathname =
    basePath && window.location.pathname.startsWith(basePath)
      ? window.location.pathname.slice(basePath.length) || "/"
      : window.location.pathname;

  if (/^\/projeto\/[^/]+\/?$/.test(pathname)) return true;

  const params = new URLSearchParams(window.location.search);
  return params.has("project");
}

export default function SiteHeader({
  homePrefix = APP_BASE_URL,
  theme: controlledTheme,
  onToggleTheme: controlledToggleTheme,
}: {
  homePrefix?: string;
  theme?: ThemeMode;
  onToggleTheme?: () => void;
}) {
  const [internalTheme, setInternalTheme] = useState<ThemeMode>("light");
  const theme = controlledTheme ?? internalTheme;

  useEffect(() => {
    if (controlledTheme) {
      document.documentElement.setAttribute("data-theme", controlledTheme);
      return;
    }

    const savedTheme = localStorage.getItem("theme");
    const nextTheme: ThemeMode = savedTheme === "dark" ? "dark" : "light";

    setInternalTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  }, [controlledTheme]);

  const handleToggleTheme = () => {
    if (controlledToggleTheme) {
      controlledToggleTheme();
      return;
    }

    const nextTheme: ThemeMode = theme === "light" ? "dark" : "light";

    setInternalTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const normalizedHomePrefix = homePrefix.endsWith("/") ? homePrefix : `${homePrefix}/`;
  const buildHomeHref = (hash: string) =>
    isProjectView() ? `${normalizedHomePrefix}${hash}` : hash;

  return (
    <header className="fixed left-1/2 top-6 z-50 flex w-[calc(100%-28px)] -translate-x-1/2 justify-center">
      <div className="hero-nav relative flex min-h-[60px] w-full max-w-[730px] items-center justify-between rounded-full bg-[var(--bg-surface)] px-6 shadow-[var(--shadow-nav)] sm:px-7 md:min-h-[68px] md:px-8">
        <a
          href={buildHomeHref("#home")}
          aria-label="Ir para o início"
          className="hero-brand text-[13px] font-extrabold uppercase tracking-[-0.02em] text-[var(--text-inverse)] sm:text-[14px] md:text-[16px]"
        >
          DESIGNED BY <span className="text-[var(--accent-primary)]">EDILSON</span>
        </a>

        <a
          href={buildHomeHref("#resumo-pdf")}
          className="hero-nav-link absolute right-16 top-1/2 inline-flex -translate-y-1/2 items-center text-[13px] font-semibold text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text-inverse)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-surface)] md:hidden"
        >
          Resumo PDF
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={buildHomeHref(item.hash)}
              className="hero-nav-link text-[13px] font-semibold text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text-inverse)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-surface)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label={theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"}
          aria-pressed={theme === "dark"}
          onClick={handleToggleTheme}
          className="hero-theme-toggle absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-alt)] text-[var(--accent-primary)] shadow-[var(--shadow-ui-soft)] transition-[background-color,color,border-color,transform] duration-200 ease-out hover:-translate-y-[52%] hover:bg-[var(--bg-surface-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-surface)] md:right-4"
        >
          <span aria-hidden="true" className="hero-theme-toggle-track">
            <span className="hero-theme-icon hero-theme-icon--sun">
              <img src={sunLightIcon} alt="" className="h-5 w-5 object-contain" />
            </span>
            <span className="hero-theme-icon hero-theme-icon--moon">
              <img src={moonStarsIcon} alt="" className="h-5 w-5 object-contain" />
            </span>
          </span>
        </button>
      </div>
    </header>
  );
}
