import { useEffect, useRef, useState, type CSSProperties, type TouchEvent } from "react";
import type { ProjectCase } from "../data/projectCases";
import govBrHeroMockup from "../assets/mockup-gov-br.png";
import govBrHeroSection from "../assets/hero-gov.png";
import govBrDynamicSuggestions from "../assets/sugestoa-dinamica.png";
import govBrCampaigns from "../assets/campanhas-gov.png";
import govBrTopServices from "../assets/servicos-mais-acessados.png";
import govBrCategories from "../assets/navegue-por-categoria.png";
import govBrApps from "../assets/aplicativos-do-gov.png";
import govBrHighlights from "../assets/destaques-gov.png";
import govBrNews from "../assets/ultimas-noticias.png";
import govBrFooter from "../assets/footer-gov.png";
import govBrSatisfaction from "../assets/pesquisa-satisfacao-gov.png";
import SiteHeader from "./SiteHeader";

export default function ProjectCasePage({
  project: _project,
  onBack: _onBack,
}: {
  project: ProjectCase;
  onBack: () => void;
}) {
  const galleryImages = [
    { src: govBrHeroSection, alt: "Busca principal do redesign do Gov.br em destaque" },
    {
      src: govBrDynamicSuggestions,
      alt: "Sugestões dinâmicas abaixo da busca no redesign do Gov.br",
    },
    { src: govBrCampaigns, alt: "Campanhas em destaque no redesign do Gov.br" },
    { src: govBrTopServices, alt: "Serviços mais acessados no redesign do Gov.br" },
    { src: govBrCategories, alt: "Navegação por categoria no redesign do Gov.br" },
    { src: govBrApps, alt: "Seção de aplicativos do Governo Federal no redesign do Gov.br" },
    { src: govBrHighlights, alt: "Seção de destaques estratégicos no redesign do Gov.br" },
    { src: govBrNews, alt: "Seção de últimas notícias no redesign do Gov.br" },
    { src: govBrFooter, alt: "Rodapé reorganizado do redesign do Gov.br" },
    { src: govBrSatisfaction, alt: "Bloco de pesquisa de satisfação do redesign do Gov.br" },
  ];

  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const [galleryZoomScale, setGalleryZoomScale] = useState(1);
  const [galleryOffset, setGalleryOffset] = useState({ x: 0, y: 0 });
  const [isMobileGallery, setIsMobileGallery] = useState(false);
  const galleryFigureRef = useRef<HTMLButtonElement | null>(null);
  const galleryImageRef = useRef<HTMLImageElement | null>(null);
  const touchStateRef = useRef<{
    mode: "none" | "pan" | "pinch";
    startDistance: number;
    startScale: number;
    startOffsetX: number;
    startOffsetY: number;
    startTouchX: number;
    startTouchY: number;
  }>({
    mode: "none",
    startDistance: 0,
    startScale: 1,
    startOffsetX: 0,
    startOffsetY: 0,
    startTouchX: 0,
    startTouchY: 0,
  });
  const mousePanStateRef = useRef<{
    isDragging: boolean;
    startX: number;
    startY: number;
    startOffsetX: number;
    startOffsetY: number;
  }>({
    isDragging: false,
    startX: 0,
    startY: 0,
    startOffsetX: 0,
    startOffsetY: 0,
  });
  const isGalleryZoomed = galleryZoomScale > 1.01;

  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

  const clampGalleryOffset = (x: number, y: number, scale = galleryZoomScale) => {
    const figure = galleryFigureRef.current;
    const image = galleryImageRef.current;

    if (!figure || !image) return { x, y };

    const overflowX = Math.max(0, (image.offsetWidth * scale - figure.clientWidth) / 2);
    const overflowY = Math.max(0, (image.offsetHeight * scale - figure.clientHeight) / 2);

    return {
      x: clamp(x, -overflowX, overflowX),
      y: clamp(y, -overflowY, overflowY),
    };
  };

  const resetGalleryZoom = () => {
    setGalleryZoomScale(1);
    setGalleryOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");
    const updateGalleryMode = () => setIsMobileGallery(mediaQuery.matches);

    updateGalleryMode();
    mediaQuery.addEventListener("change", updateGalleryMode);

    return () => mediaQuery.removeEventListener("change", updateGalleryMode);
  }, []);

  useEffect(() => {
    if (activeGalleryIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isGalleryZoomed) {
          resetGalleryZoom();
          return;
        }
        setActiveGalleryIndex(null);
        return;
      }

      if (event.key === "ArrowRight") {
        if (activeGalleryIndex >= galleryImages.length - 1) return;
        resetGalleryZoom();
        setActiveGalleryIndex((current) =>
          current === null ? current : Math.min(current + 1, galleryImages.length - 1),
        );
      }

      if (event.key === "ArrowLeft") {
        if (activeGalleryIndex <= 0) return;
        resetGalleryZoom();
        setActiveGalleryIndex((current) =>
          current === null ? current : Math.max(current - 1, 0),
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeGalleryIndex, galleryImages.length, isGalleryZoomed]);

  useEffect(() => {
    if (!isGalleryZoomed || isMobileGallery) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!mousePanStateRef.current.isDragging) return;

      const deltaX = event.clientX - mousePanStateRef.current.startX;
      const deltaY = event.clientY - mousePanStateRef.current.startY;

      setGalleryOffset(
        clampGalleryOffset(
          mousePanStateRef.current.startOffsetX + deltaX,
          mousePanStateRef.current.startOffsetY + deltaY,
          galleryZoomScale,
        ),
      );
    };

    const stopDragging = () => {
      mousePanStateRef.current.isDragging = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDragging);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, [galleryZoomScale, isGalleryZoomed, isMobileGallery]);

  const openGalleryImage = (index: number) => {
    resetGalleryZoom();
    setActiveGalleryIndex(index);
  };
  const closeGallery = () => {
    resetGalleryZoom();
    setActiveGalleryIndex(null);
  };
  const goToNextImage = () => {
    if (activeGalleryIndex === null || activeGalleryIndex >= galleryImages.length - 1) return;
    resetGalleryZoom();
    setActiveGalleryIndex((current) =>
      current === null ? current : Math.min(current + 1, galleryImages.length - 1),
    );
  };
  const goToPreviousImage = () => {
    if (activeGalleryIndex === null || activeGalleryIndex <= 0) return;
    resetGalleryZoom();
    setActiveGalleryIndex((current) =>
      current === null ? current : Math.max(current - 1, 0),
    );
  };
  const toggleGalleryZoom = () => {
    if (isMobileGallery) return;

    if (isGalleryZoomed) {
      resetGalleryZoom();
      return;
    }

    setGalleryZoomScale(1.85);
    setGalleryOffset({ x: 0, y: 0 });
  };

  const updateGalleryScale = (nextScale: number) => {
    const boundedScale = clamp(nextScale, 1, 3);
    setGalleryZoomScale(boundedScale);
    setGalleryOffset((current) => (boundedScale <= 1 ? { x: 0, y: 0 } : clampGalleryOffset(current.x, current.y, boundedScale)));
  };

  const zoomInGallery = () => updateGalleryScale(galleryZoomScale + 0.35);
  const zoomOutGallery = () => updateGalleryScale(galleryZoomScale - 0.35);

  const getTouchDistance = (touches: ArrayLike<{ clientX: number; clientY: number }>) => {
    const [firstTouch, secondTouch] = [touches[0], touches[1]];
    return Math.hypot(secondTouch.clientX - firstTouch.clientX, secondTouch.clientY - firstTouch.clientY);
  };

  const handleGalleryTouchStart = (event: TouchEvent<HTMLButtonElement>) => {
    if (!isMobileGallery) return;

    if (event.touches.length === 2) {
      touchStateRef.current = {
        mode: "pinch",
        startDistance: getTouchDistance(event.touches),
        startScale: galleryZoomScale,
        startOffsetX: galleryOffset.x,
        startOffsetY: galleryOffset.y,
        startTouchX: 0,
        startTouchY: 0,
      };
      return;
    }

    if (event.touches.length === 1 && isGalleryZoomed) {
      touchStateRef.current = {
        mode: "pan",
        startDistance: 0,
        startScale: galleryZoomScale,
        startOffsetX: galleryOffset.x,
        startOffsetY: galleryOffset.y,
        startTouchX: event.touches[0].clientX,
        startTouchY: event.touches[0].clientY,
      };
    }
  };

  const handleGalleryTouchMove = (event: TouchEvent<HTMLButtonElement>) => {
    if (!isMobileGallery) return;

    if (touchStateRef.current.mode === "pinch" && event.touches.length === 2) {
      event.preventDefault();
      const distance = getTouchDistance(event.touches);
      const ratio = distance / Math.max(touchStateRef.current.startDistance, 1);
      const nextScale = clamp(touchStateRef.current.startScale * ratio, 1, 3);
      setGalleryZoomScale(nextScale);
      setGalleryOffset((current) =>
        nextScale <= 1
          ? { x: 0, y: 0 }
          : clampGalleryOffset(current.x, current.y, nextScale),
      );
      return;
    }

    if (touchStateRef.current.mode === "pan" && event.touches.length === 1 && isGalleryZoomed) {
      event.preventDefault();
      const deltaX = event.touches[0].clientX - touchStateRef.current.startTouchX;
      const deltaY = event.touches[0].clientY - touchStateRef.current.startTouchY;
      setGalleryOffset(
        clampGalleryOffset(
          touchStateRef.current.startOffsetX + deltaX,
          touchStateRef.current.startOffsetY + deltaY,
          galleryZoomScale,
        ),
      );
    }
  };

  const handleGalleryTouchEnd = () => {
    if (galleryZoomScale <= 1) {
      resetGalleryZoom();
    } else {
      setGalleryOffset((current) =>
        clampGalleryOffset(current.x, current.y, galleryZoomScale),
      );
    }

    touchStateRef.current.mode = "none";
  };

  const handleGalleryMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isMobileGallery || !isGalleryZoomed) return;

    mousePanStateRef.current = {
      isDragging: true,
      startX: event.clientX,
      startY: event.clientY,
      startOffsetX: galleryOffset.x,
      startOffsetY: galleryOffset.y,
    };
  };

  return (
    <>
      <SiteHeader />
      <main className="project-case-page project-case-literal">
        <section className="project-case-topShell">
          <div className="page page--project-top">
            <section className="titleArea">
              <h1 className="title">Reimaginando a experiência do Gov.br</h1>
            </section>

            <section className="visualCard">
              <div className="heroProjectMockup">
                <img src={govBrHeroMockup} alt="Mockup do redesign da página inicial do gov.br" />
              </div>
            </section>
          </div>
        </section>

        <div className="page">
          <section className="summarySection">
            <div className="summaryGrid">
              <div className="summaryMain">
                <h2 className="summaryTitle">Resumo</h2>

                <div className="summaryBlock">
                  <p>
                    O gov.br centraliza uma grande quantidade de serviços públicos digitais. Com o
                    crescimento contínuo da plataforma, surgiu um problema comum em sistemas
                    governamentais: quanto mais funcionalidades são adicionadas, maior se torna a
                    complexidade de organização e navegação.
                  </p>
                  <p>
                    Este projeto propõe um redesign da página inicial com foco na melhoria da
                    hierarquia visual, redução da carga cognitiva e criação de um fluxo mais claro e
                    direto, orientado à resolução de tarefas do usuário.
                  </p>
                </div>

              <div className="summaryBlock">
                <h3>Missão</h3>
                  <p>
                    O principal desafio não estava na ausência de funcionalidades, mas na forma como
                    elas estavam organizadas.
                  </p>
                  <p>
                    O site atual apresenta excesso de informações sem uma curadoria clara, onde todos
                    os elementos competem pelo mesmo nível de atenção. Isso gera confusão, aumenta o
                    esforço cognitivo e dificulta a identificação de caminhos para resolução de
                    tarefas.
                  </p>
                  <p>
                    A missão do projeto foi reorganizar essa experiência, priorizando clareza,
                    escaneabilidade e direcionamento, considerando que o usuário não acessa o portal
                    para navegar, mas para resolver uma necessidade específica.
                  </p>
                </div>

              <div className="summaryBlock">
                <h3>Minhas contribuições</h3>
                  <p>
                    Atuei na análise da experiência atual, identificação de problemas estruturais e
                    desenvolvimento de uma nova proposta de organização da página inicial.
                  </p>
                  <p>
                    O foco do trabalho foi reestruturar a hierarquia da informação, melhorar o fluxo
                    de navegação e tornar o acesso aos serviços mais direto, sem alterar
                    drasticamente a base existente do sistema.
                  </p>
                </div>
              </div>

              <aside className="summarySide">
                <div className="sideBlock">
                  <h3>Cliente</h3>
                  <p>Governo Federal do Brasil</p>
                  <p>Projeto conceitual de redesign do portal gov.br</p>
                </div>

                <div className="sideBlock">
                  <h3>Serviços</h3>
                  <ul>
                    <li>UX Design</li>
                    <li>UI Design</li>
                    <li>Prototipação</li>
                    <li>Análise de usabilidade</li>
                  </ul>
                </div>

                <div className="sideBlock">
                  <h3>Meu papel</h3>
                  <p>Foco em estruturação, acessibilidade e redesign da experiência digital.</p>
                </div>
              </aside>
            </div>

            <div className="impactBlock">
              <h3>Impacto</h3>
              <p>
                O redesign propõe melhorias diretas na experiência do usuário, mesmo em um cenário
                conceitual.
              </p>
              <p>
                A nova estrutura reduz o esforço cognitivo, melhora a escaneabilidade da interface e
                facilita o acesso aos serviços mais relevantes. Além disso, cria um fluxo mais
                previsível e orientado à ação, permitindo que o usuário encontre o que precisa com
                maior rapidez.
              </p>
            </div>
          </section>

          <section className="gettingStarted">
            <div className="gettingContainer">
              <h2 className="gettingTitle">Ponto de partida</h2>

              <div className="gettingBlock">
                <h3>Descoberta</h3>
                <p>
                  A análise inicial evidenciou que o principal problema não era a falta de recursos,
                  mas a ausência de organização.
                </p>
                <p>
                  O sistema atual prioriza sua estrutura interna, sem considerar o comportamento do
                  usuário. Como resultado, todos os elementos possuem o mesmo peso visual,
                  dificultando a leitura e a tomada de decisão.
                </p>
              </div>

              <div className="gettingBlock">
                <h3>Design e estrutura da página</h3>
                <p>
                  A proposta de redesign partiu da premissa de manter a base existente, porém
                  reorganizando os elementos para criar um fluxo mais claro e eficiente.
                </p>

                <h4 className="gettingMiniTitle">Busca em destaque</h4>
                <p>
                  A barra de busca foi mantida no topo da página, porém com maior destaque visual,
                  permitindo que usuários que já sabem o que procuram possam acessar diretamente o
                  serviço desejado.
                </p>
                <div className="gettingMockup gettingMockup--real gettingMockup-search">
                  <button
                    type="button"
                    className="gettingMockupMedia projectGalleryTrigger"
                    onClick={() => openGalleryImage(0)}
                    aria-label="Expandir imagem de busca em destaque"
                  >
                    <img
                      src={govBrHeroSection}
                      alt="Busca principal do redesign do Gov.br em destaque"
                    />
                  </button>
                </div>

                <h4 className="gettingMiniTitle">Sugestões dinâmicas</h4>
                <p>
                  Abaixo da busca, foi implementado um sistema de sugestões dinâmicas baseado em
                  comportamento e sazonalidade, destacando serviços mais relevantes conforme o
                  período do ano.
                </p>
                <div className="gettingMockup gettingMockup--real gettingMockup-suggestions">
                  <button
                    type="button"
                    className="gettingMockupMedia projectGalleryTrigger"
                    onClick={() => openGalleryImage(1)}
                    aria-label="Expandir imagem de sugestões dinâmicas"
                  >
                    <img
                      src={govBrDynamicSuggestions}
                      alt="Sugestões dinâmicas abaixo da busca no redesign do Gov.br"
                    />
                  </button>
                </div>

                <h4 className="gettingMiniTitle">Campanhas em destaque</h4>
                <p>
                  Também foi incluído um carrossel de campanhas em destaque, com o objetivo de dar
                  visibilidade a ações importantes do governo de forma contextual e acessível.
                </p>
                <div className="gettingMockup gettingMockup--real gettingMockup-campaigns">
                  <button
                    type="button"
                    className="gettingMockupMedia projectGalleryTrigger"
                    onClick={() => openGalleryImage(2)}
                    aria-label="Expandir imagem de campanhas em destaque"
                  >
                    <img
                      src={govBrCampaigns}
                      alt="Campanhas em destaque no redesign do Gov.br"
                    />
                  </button>
                </div>

                <h4 className="gettingMiniTitle">Serviços mais acessados</h4>
                <p>
                  Os serviços mais acessados passaram a ser exibidos com maior clareza e hierarquia
                  visual, substituindo o modelo atual que apresenta baixa legibilidade e pouca
                  diferenciação.
                </p>
                <div className="gettingMockup gettingMockup--real gettingMockup-services">
                  <button
                    type="button"
                    className="gettingMockupMedia projectGalleryTrigger"
                    onClick={() => openGalleryImage(3)}
                    aria-label="Expandir imagem de serviços mais acessados"
                  >
                    <img
                      src={govBrTopServices}
                      alt="Serviços mais acessados no redesign do Gov.br"
                    />
                  </button>
                </div>

                <h4 className="gettingMiniTitle">Navegação por categoria</h4>
                <p>
                  A navegação por categorias foi reorganizada com o uso de ícones e descrições,
                  facilitando a escaneabilidade e reduzindo o esforço necessário para encontrar
                  serviços específicos.
                </p>
                <div className="gettingMockup gettingMockup--real gettingMockup-categories">
                  <button
                    type="button"
                    className="gettingMockupMedia projectGalleryTrigger"
                    onClick={() => openGalleryImage(4)}
                    aria-label="Expandir imagem de navegação por categoria"
                  >
                    <img
                      src={govBrCategories}
                      alt="Navegação por categoria no redesign do Gov.br"
                    />
                  </button>
                </div>

                <h4 className="gettingMiniTitle">Aplicativos e conteúdos</h4>
                <p>
                  Além disso, foram criadas seções dedicadas para aplicativos do governo, destaques
                  estratégicos e notícias, mantendo a estrutura existente, mas com melhor
                  organização visual.
                </p>
                <div className="gettingMockupGroup">
                  <div className="gettingMockup gettingMockup--real gettingMockup-content">
                    <button
                      type="button"
                      className="gettingMockupMedia projectGalleryTrigger"
                      onClick={() => openGalleryImage(5)}
                      aria-label="Expandir imagem da seção de aplicativos"
                    >
                      <img
                        src={govBrApps}
                        alt="Seção de aplicativos do Governo Federal no redesign do Gov.br"
                      />
                    </button>
                  </div>
                  <div className="gettingMockup gettingMockup--real gettingMockup-content">
                    <button
                      type="button"
                      className="gettingMockupMedia projectGalleryTrigger"
                      onClick={() => openGalleryImage(6)}
                      aria-label="Expandir imagem da seção de destaques"
                    >
                      <img
                        src={govBrHighlights}
                        alt="Seção de destaques estratégicos no redesign do Gov.br"
                      />
                    </button>
                  </div>
                  <div className="gettingMockup gettingMockup--real gettingMockup-content">
                    <button
                      type="button"
                      className="gettingMockupMedia projectGalleryTrigger"
                      onClick={() => openGalleryImage(7)}
                      aria-label="Expandir imagem da seção de últimas notícias"
                    >
                      <img
                        src={govBrNews}
                        alt="Seção de últimas notícias no redesign do Gov.br"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="updateSection">
            <div className="updateContainer">
              <h2 className="updateTitle">Atualizando a experiência</h2>
              <p className="updateText">
                Outro ponto importante foi a simplificação do rodapé.
              </p>
              <p className="updateText">
                O modelo atual apresenta excesso de informações e baixa organização, dificultando a
                navegação. A nova proposta prioriza apenas o essencial, estruturado por categorias,
                facilitando o acesso.
              </p>
              <p className="updateText">
                Também foi mantido o sistema de coleta de feedback do usuário, permitindo monitorar
                a percepção da experiência e identificar pontos de melhoria contínua.
              </p>
              <div className="updateVisualGroup">
                <button
                  type="button"
                  className="updateVisualCard projectGalleryTrigger"
                  onClick={() => openGalleryImage(8)}
                  aria-label="Expandir imagem do rodapé reorganizado"
                >
                  <img
                    src={govBrFooter}
                    alt="Rodapé reorganizado do redesign do Gov.br"
                  />
                </button>
                <button
                  type="button"
                  className="updateVisualCard projectGalleryTrigger"
                  onClick={() => openGalleryImage(9)}
                  aria-label="Expandir imagem da pesquisa de satisfação"
                >
                  <img
                    src={govBrSatisfaction}
                    alt="Bloco de pesquisa de satisfação do redesign do Gov.br"
                  />
                </button>
              </div>
            </div>
          </section>

          <section className="techSection">
            <div className="websiteContainer">
              <h2 className="techTitle">Insight principal</h2>
              <p className="websiteIntro">
                O principal diferencial do projeto não foi apenas o redesign visual, mas a mudança
                de abordagem.
              </p>
              <p className="websiteIntro">
                A proposta deixa de priorizar o sistema e passa a priorizar o usuário, criando um
                fluxo mais claro, previsível e orientado à ação.
              </p>

              <h2 className="techTitle">Visão do produto</h2>
              <p className="websiteIntro">
                Com a reestruturação da página inicial, o portal passa a atuar de forma mais
                eficiente como um hub de serviços.
              </p>
              <p className="websiteIntro">
                A nova abordagem melhora o acesso à informação, reduz fricções e torna a experiência
                mais simples, direta e intuitiva, alinhando o sistema às reais necessidades do
                usuário.
              </p>
            </div>
          </section>

          <section className="ctaSection">
            <div className="ctaContainer">
              <h2 className="ctaTitle">
                Tem um projeto
                <br />
                que precisa tirar do papel?
              </h2>
              <a
                className="ctaButton"
                href="https://api.whatsapp.com/send/?phone=5512992540651&text=Ol%C3%A1%2C%20vim%20pelo%20seu%20site%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.&type=phone_number&app_absent=0"
                target="_blank"
                rel="noreferrer"
              >
                Vamos conversar
              </a>
            </div>
          </section>
        </div>
        {activeGalleryIndex !== null ? (
          <div
            className="projectGalleryLightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Visualização ampliada da imagem do projeto"
            onClick={closeGallery}
          >
            <div
              className={`projectGalleryLightboxInner ${isGalleryZoomed ? "is-zoomed" : ""}`}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="projectGalleryClose"
                onClick={closeGallery}
                aria-label="Fechar imagem ampliada"
              >
                X
              </button>

              <button
                type="button"
                className={`projectGalleryNav projectGalleryNav--prev ${activeGalleryIndex <= 0 ? "is-disabled" : ""}`}
                onClick={goToPreviousImage}
                aria-label="Ver imagem anterior"
                disabled={activeGalleryIndex <= 0}
              >
                &lt;
              </button>

              <button
                type="button"
                className={`projectGalleryFigure ${isGalleryZoomed ? "is-zoomed" : ""}`}
                onClick={toggleGalleryZoom}
                onMouseDown={handleGalleryMouseDown}
                onTouchStart={handleGalleryTouchStart}
                onTouchMove={handleGalleryTouchMove}
                onTouchEnd={handleGalleryTouchEnd}
                onTouchCancel={handleGalleryTouchEnd}
                ref={galleryFigureRef}
                aria-label={isGalleryZoomed ? "Reduzir imagem ampliada" : "Ampliar imagem"}
              >
                <img
                  src={galleryImages[activeGalleryIndex].src}
                  alt={galleryImages[activeGalleryIndex].alt}
                  ref={galleryImageRef}
                  style={
                    {
                      "--gallery-scale": galleryZoomScale,
                      "--gallery-offset-x": `${galleryOffset.x}px`,
                      "--gallery-offset-y": `${galleryOffset.y}px`,
                    } as CSSProperties
                  }
                />
              </button>

              <button
                type="button"
                className={`projectGalleryNav projectGalleryNav--next ${activeGalleryIndex >= galleryImages.length - 1 ? "is-disabled" : ""}`}
                onClick={goToNextImage}
                aria-label="Ver próxima imagem"
                disabled={activeGalleryIndex >= galleryImages.length - 1}
              >
                &gt;
              </button>

              <div className="projectGalleryZoomControls" aria-label="Controles de zoom">
                <button
                  type="button"
                  className="projectGalleryZoomButton"
                  onClick={zoomOutGallery}
                  aria-label="Diminuir zoom"
                >
                  -
                </button>
                <button
                  type="button"
                  className="projectGalleryZoomButton"
                  onClick={zoomInGallery}
                  aria-label="Aumentar zoom"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </>
  );
}

