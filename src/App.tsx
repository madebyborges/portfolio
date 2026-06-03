import { useEffect, useState } from "react";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import PortfolioHero from "./components/PortfolioHero";
import PortfolioLoading from "./components/PortfolioLoading";
import ProjectCasePage from "./components/ProjectCasePage";
import ProjectsSection from "./components/ProjectsSection";
import ThinkingCardsSection from "./components/ThinkingCardsSection";
import { projectCaseMap, type ProjectCaseSlug } from "./data/projectCases";

const LOADING_SESSION_KEY = "portfolio-loading-seen";
const APP_BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, "");
const APP_TITLE = "Borges UX Portfolio";

type GlobalCursorVariant = "default" | "media" | "note" | "cta" | "card" | "link";

function getProjectFromLocation() {
  const pathname =
    APP_BASE_PATH && window.location.pathname.startsWith(APP_BASE_PATH)
      ? window.location.pathname.slice(APP_BASE_PATH.length) || "/"
      : window.location.pathname;

  const pathMatch = pathname.match(/^\/projeto\/([^/]+)\/?$/);
  if (pathMatch) {
    const slug = decodeURIComponent(pathMatch[1]) as ProjectCaseSlug;
    return slug in projectCaseMap ? slug : null;
  }

  const params = new URLSearchParams(window.location.search);
  const project = params.get("project") as ProjectCaseSlug | null;
  return project && project in projectCaseMap ? project : null;
}

function getCursorVariantFromTarget(target: EventTarget | null): GlobalCursorVariant {
  if (!(target instanceof Element)) return "default";

  const customCursorTarget = target.closest<HTMLElement>("[data-cursor]");
  const customVariant = customCursorTarget?.dataset.cursor;

  if (
    customVariant === "media" ||
    customVariant === "note" ||
    customVariant === "cta" ||
    customVariant === "card" ||
    customVariant === "link"
  ) {
    return customVariant;
  }

  if (target.closest("a, button")) {
    return "link";
  }

  return "default";
}

export default function App() {
  const [activeProject, setActiveProject] = useState<ProjectCaseSlug | null>(getProjectFromLocation);
  const [cursorVariant, setCursorVariant] = useState<GlobalCursorVariant>("default");
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorEnabled, setCursorEnabled] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showMobileDesktopNotice, setShowMobileDesktopNotice] = useState(
    () => window.innerWidth <= 1024 && !getProjectFromLocation(),
  );
  const [showLoading, setShowLoading] = useState(
    () => sessionStorage.getItem(LOADING_SESSION_KEY) !== "true",
  );

  useEffect(() => {
    const handlePopState = () => {
      setActiveProject(getProjectFromLocation());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    document.documentElement.style.removeProperty("overflow");
    document.documentElement.style.removeProperty("overflow-y");
    document.documentElement.style.overflowX = "hidden";
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("overflow-y");
    document.body.style.overflowX = "hidden";

    return () => {
      document.documentElement.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("overflow-y");
      document.documentElement.style.overflowX = "hidden";
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("overflow-y");
      document.body.style.overflowX = "hidden";
    };
  }, [showLoading]);

  useEffect(() => {
    if (showLoading) return;
    setShowMobileDesktopNotice(window.innerWidth <= 1024 && !getProjectFromLocation());
  }, [showLoading, activeProject]);

  useEffect(() => {
    const marqueeSource = `${APP_TITLE}   •   `;
    let index = 0;

    const updateTitle = () => {
      document.title = (marqueeSource.slice(index) + marqueeSource.slice(0, index)).trim();
      index = (index + 1) % marqueeSource.length;
    };

    updateTitle();
    const intervalId = window.setInterval(updateTitle, 220);

    return () => {
      window.clearInterval(intervalId);
      document.title = APP_TITLE;
    };
  }, []);

  useEffect(() => {
    const desktopCursorQuery = window.matchMedia("(min-width: 768px) and (pointer: fine)");

    const syncCursorMode = () => {
      const enabled = desktopCursorQuery.matches;
      setCursorEnabled(enabled);

      if (!enabled) {
        setCursorVisible(false);
        setCursorVariant("default");
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!desktopCursorQuery.matches) return;

      setCursorVisible(true);
      setCursorPosition({ x: event.clientX, y: event.clientY });
      setCursorVariant(getCursorVariantFromTarget(event.target));
    };

    const handleMouseOut = (event: MouseEvent) => {
      if (!desktopCursorQuery.matches || event.relatedTarget !== null) return;

      setCursorVisible(false);
      setCursorVariant("default");
    };

    syncCursorMode();
    desktopCursorQuery.addEventListener("change", syncCursorMode);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      desktopCursorQuery.removeEventListener("change", syncCursorMode);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  const openProject = (slug: ProjectCaseSlug) => {
    const url = new URL(window.location.href);

    if (APP_BASE_PATH) {
      url.pathname = `${APP_BASE_PATH}/`;
      url.searchParams.set("project", slug);
    } else {
      url.pathname = `/projeto/${slug}`;
      url.searchParams.delete("project");
    }

    window.history.pushState({}, "", url);
    setActiveProject(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeProject = () => {
    const url = new URL(window.location.href);
    url.pathname = APP_BASE_PATH ? `${APP_BASE_PATH}/` : "/";
    url.searchParams.delete("project");
    window.history.pushState({}, "", url);
    setActiveProject(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getCursorClasses = () => {
    switch (cursorVariant) {
      case "media":
        return "h-16 w-16 border-[3px] bg-[color:var(--cursor-shell)] after:h-4 after:w-4";
      case "note":
        return "h-14 w-14 rotate-12 rounded-[8px] border-[2px] bg-[color:var(--cursor-shell)] after:h-4 after:w-4";
      case "cta":
        return "h-14 w-28 rounded-full border-[3px] bg-[color:var(--cursor-shell)] after:h-3 after:w-12 after:rounded-full";
      case "card":
        return "h-12 w-12 border-[2px] bg-[color:var(--cursor-shell)] after:h-3 after:w-3";
      case "link":
        return "h-12 w-24 rounded-full border-[2px] bg-[color:var(--cursor-shell)] after:h-2.5 after:w-8 after:rounded-full";
      default:
        return "h-10 w-10 border-[2px] bg-[color:var(--cursor-shell)] after:h-3 after:w-3";
    }
  };

  const project = activeProject ? projectCaseMap[activeProject] : null;

  return (
    <div className={cursorEnabled ? "app-cursor-surface" : undefined}>
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[1400] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[var(--border-subtle)] shadow-[var(--shadow-cursor)] transition-[width,height,opacity,transform,background-color,border-radius] duration-200 ease-out after:rounded-full after:bg-[var(--cursor-core)] after:content-[''] md:flex ${cursorVisible ? "opacity-100" : "opacity-0"} ${getCursorClasses()}`}
        style={{ left: cursorPosition.x, top: cursorPosition.y }}
      />

      {!project && showMobileDesktopNotice ? (
        <div
          className="mobile-desktop-notice"
          role="dialog"
          aria-modal="false"
          aria-labelledby="mobile-desktop-notice-title"
        >
          <div
            className="mobile-desktop-notice__backdrop"
            onClick={() => setShowMobileDesktopNotice(false)}
          />
          <div className="mobile-desktop-notice__card">
            <button
              type="button"
              className="mobile-desktop-notice__close"
              aria-label="Fechar aviso"
              onClick={() => setShowMobileDesktopNotice(false)}
            >
              ×
            </button>
            <p className="mobile-desktop-notice__eyebrow">Aviso</p>
            <h2 id="mobile-desktop-notice-title" className="mobile-desktop-notice__title">
              Para uma melhor experiência
            </h2>
            <p className="mobile-desktop-notice__text">
              Este portfólio foi pensado principalmente para desktop. Se puder, acesse
              em uma tela maior para visualizar melhor os detalhes.
            </p>
            <button
              type="button"
              className="mobile-desktop-notice__button"
              onClick={() => setShowMobileDesktopNotice(false)}
            >
              Entendi
            </button>
          </div>
        </div>
      ) : null}

      {showLoading ? (
        <PortfolioLoading
          onFinish={() => {
            sessionStorage.setItem(LOADING_SESSION_KEY, "true");
            setShowLoading(false);
          }}
        />
      ) : null}

      {project ? (
        <ProjectCasePage project={project} onBack={closeProject} />
      ) : (
        <>
          <PortfolioHero />
          <ProjectsSection onOpenProject={openProject} />
          <AboutSection />
          <ThinkingCardsSection />
          <ContactSection />
        </>
      )}
    </div>
  );
}
