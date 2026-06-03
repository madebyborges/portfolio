import { useEffect, useRef, useState } from "react";
import macbookImg from "../../photos/MACBOOK.avif";
import headphoneImg from "../../photos/HEADPHONE.png";
import cameraImg from "../../photos/CAMERA-ZVE10.png";
import cappuccinoImg from "../../photos/CAPUCCINO.avif";
import postItImg from "../../photos/POST-IT.png";
import prendedoresImg from "../../photos/PRENDEDORES.png";
import ticketImg from "../../photos/ticket aviao.png";
import ticketDarkImg from "../../photos/ticket-dark-theme.png";
import clipImg from "../../photos/CLIP.avif";
import plantaImg from "../../photos/PLANTA.avif";
import papelAmassadoImg from "../../photos/PAPEL-AMASSADO.avif";
import cameraAudio from "../../audio/camera-sound-effect.mp3";
import headphoneAudio from "../../audio/headphone-audio-3-AM Coding Session - Lofi Hip Hop Mix [Study & Coding Beats] - Lofi Ghostie.mp3";
import macbookAudio from "../../audio/macbook-sound-effect.mp3";
import ticketAudio from "../../audio/ticket-audio.mp3";
import mobileCameraImg from "../assets/camera-mobile.png";
import mobileClipImg from "../assets/clip-mobile.png";
import mobileClipsImg from "../assets/clips-mobile.png";
import mobileCoffeeImg from "../assets/coffee-mobile.png";
import glassesHeroImg from "../assets/glasses-hero.png";
import mobileGlassesImg from "../assets/glasses-mobile.png";
import mobileHeadphoneImg from "../assets/headphone-mobile.png";
import mobileNotebookImg from "../assets/notabeook-mobile.png";
import mobilePaperImg from "../assets/paper-mobile.png";
import mobilePlantImg from "../assets/plant-mobile.png";
import mobilePostItImg from "../assets/postit-mobile.png";
import mobileTicketImg from "../assets/ticket-mobile.png";
import SiteHeader, { type ThemeMode } from "./SiteHeader";

const audioByItem = {
  notebook: macbookAudio,
  headphone: headphoneAudio,
  camera: cameraAudio,
  ticket: ticketAudio,
} as const;

type AudioKey = keyof typeof audioByItem;
type HeroVisualItem = {
  key: string;
  src: string;
  className: string;
  animation: string;
  audio?: AudioKey;
  cursor?: "media";
};

function HeroDecorativeImage({
  item,
  onAudioEnter,
  onAudioLeave,
}: {
  item: HeroVisualItem;
  onAudioEnter?: (key: AudioKey) => void;
  onAudioLeave?: (key: AudioKey) => void;
}) {
  const interactiveAudio = item.audio;

  return (
    <img
      src={item.src}
      alt=""
      aria-hidden="true"
      className={`${
        interactiveAudio ? "pointer-events-auto" : "pointer-events-none"
      } select-none will-change-transform motion-reduce:transform-none motion-reduce:animate-none ${item.className}`}
      style={{ animation: item.animation }}
      decoding="async"
      data-cursor={item.cursor}
      onMouseEnter={interactiveAudio ? () => onAudioEnter?.(interactiveAudio) : undefined}
      onMouseLeave={interactiveAudio ? () => onAudioLeave?.(interactiveAudio) : undefined}
    />
  );
}

export default function PortfolioHero() {
  const audioRefs = useRef<Partial<Record<AudioKey, HTMLAudioElement>>>({});
  const [headphoneActive, setHeadphoneActive] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const entries = Object.entries(audioByItem) as Array<[AudioKey, string]>;

    for (const [key, src] of entries) {
      const audio = new Audio(src);
      audio.preload = "auto";
      audio.loop = key === "headphone";
      audioRefs.current[key] = audio;
    }

    return () => {
      for (const audio of Object.values(audioRefs.current)) {
        audio?.pause();
      }
    };
  }, []);

  useEffect(() => {
    const nextTheme: ThemeMode = localStorage.getItem("theme") === "dark" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  }, []);

  const handleAudioEnter = (key: AudioKey) => {
    const audio = audioRefs.current[key];
    if (!audio) return;

    audio.currentTime = 0;
    void audio.play().catch(() => {});

    if (key === "headphone") {
      setHeadphoneActive(true);
    }
  };

  const handleAudioLeave = (key: AudioKey) => {
    const audio = audioRefs.current[key];
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    if (key === "headphone") {
      setHeadphoneActive(false);
    }
  };

  const handleToggleTheme = () => {
    const nextTheme: ThemeMode = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const currentTicketImg = theme === "dark" ? ticketDarkImg : ticketImg;
  const currentMobileTicketImg = theme === "dark" ? ticketDarkImg : mobileTicketImg;

  const mobileItems: HeroVisualItem[] = [
    {
      key: "notebook",
      src: mobileNotebookImg,
      className: "hero-mobile-item hero-mobile-item--notebook",
      animation: "heroFloat 6.2s cubic-bezier(0.4,0,0.2,1) infinite",
    },
    {
      key: "headphone",
      src: mobileHeadphoneImg,
      className: "hero-mobile-item hero-mobile-item--headphone",
      animation: "heroFloat 6.8s cubic-bezier(0.4,0,0.2,1) infinite",
    },
    {
      key: "coffee",
      src: mobileCoffeeImg,
      className: "hero-mobile-item hero-mobile-item--cafe",
      animation: "heroFloat 6.4s cubic-bezier(0.4,0,0.2,1) infinite",
    },
    {
      key: "plant",
      src: mobilePlantImg,
      className: "hero-mobile-item hero-mobile-item--plant",
      animation: "heroFloat 6.9s cubic-bezier(0.4,0,0.2,1) infinite",
    },
    {
      key: "camera",
      src: mobileCameraImg,
      className: "hero-mobile-item hero-mobile-item--camera",
      animation: "heroFloat 7.4s cubic-bezier(0.4,0,0.2,1) infinite",
    },
    {
      key: "ticket",
      src: currentMobileTicketImg,
      className: "hero-mobile-item hero-mobile-item--ticket",
      animation: "heroFloat 6.7s cubic-bezier(0.4,0,0.2,1) infinite",
    },
    {
      key: "clip",
      src: mobileClipImg,
      className: "hero-mobile-item hero-mobile-item--clip",
      animation: "heroFloat 6.1s cubic-bezier(0.4,0,0.2,1) infinite",
    },
    {
      key: "glasses",
      src: mobileGlassesImg,
      className: "hero-mobile-item hero-mobile-item--glasses",
      animation: "heroFloat 6.6s cubic-bezier(0.4,0,0.2,1) infinite",
    },
    {
      key: "paper",
      src: mobilePaperImg,
      className: "hero-mobile-item hero-mobile-item--paper",
      animation: "heroFloat 6.3s cubic-bezier(0.4,0,0.2,1) infinite",
    },
    {
      key: "clips",
      src: mobileClipsImg,
      className: "hero-mobile-item hero-mobile-item--clips",
      animation: "heroFloat 6.1s cubic-bezier(0.4,0,0.2,1) infinite",
    },
  ];

  const desktopItems: HeroVisualItem[] = [
    {
      key: "notebook",
      src: macbookImg,
      className: "hero-scene-item hero-scene-item--notebook",
      animation: "heroFloat 6.2s cubic-bezier(0.4,0,0.2,1) infinite",
      audio: "notebook",
      cursor: "media",
    },
    {
      key: "headphone",
      src: headphoneImg,
      className: "hero-scene-item hero-scene-item--headphone",
      animation: "heroFloat 6.8s cubic-bezier(0.4,0,0.2,1) infinite",
      audio: "headphone",
      cursor: "media",
    },
    {
      key: "cafe",
      src: cappuccinoImg,
      className: "hero-scene-item hero-scene-item--cafe",
      animation: "heroFloat 6.4s cubic-bezier(0.4,0,0.2,1) infinite",
    },
    {
      key: "camera",
      src: cameraImg,
      className: "hero-scene-item hero-scene-item--camera",
      animation: "heroFloat 7.4s cubic-bezier(0.4,0,0.2,1) infinite",
      audio: "camera",
      cursor: "media",
    },
    {
      key: "prendedores",
      src: prendedoresImg,
      className: "hero-scene-item hero-scene-item--prendedores",
      animation: "heroFloat 5.8s cubic-bezier(0.4,0,0.2,1) infinite",
    },
    {
      key: "ticket",
      src: currentTicketImg,
      className: "hero-scene-item hero-scene-item--ticket",
      animation: "heroFloat 6.7s cubic-bezier(0.4,0,0.2,1) infinite",
      audio: "ticket",
      cursor: "media",
    },
    {
      key: "clip",
      src: clipImg,
      className: "hero-scene-item hero-scene-item--clip",
      animation: "heroFloat 7.2s cubic-bezier(0.4,0,0.2,1) infinite",
    },
    {
      key: "plant",
      src: plantaImg,
      className: "hero-scene-item hero-scene-item--plant",
      animation: "heroFloat 6.3s cubic-bezier(0.4,0,0.2,1) infinite",
    },
    {
      key: "paper",
      src: papelAmassadoImg,
      className: "hero-scene-item hero-scene-item--paper",
      animation: "heroFloat 6.1s cubic-bezier(0.4,0,0.2,1) infinite",
    },
    {
      key: "glasses",
      src: glassesHeroImg,
      className: "hero-scene-item hero-scene-item--glasses",
      animation: "heroFloat 6.5s cubic-bezier(0.4,0,0.2,1) infinite",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-frame)] p-[14px] [font-family:Inter,system-ui,sans-serif]">
      <main
        id="home"
        className="relative min-h-[calc(100vh-28px)] overflow-hidden rounded-[32px] bg-[var(--bg-primary)] shadow-[var(--shadow-soft)]"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 mx-auto min-h-[calc(100vh-28px)] max-w-[1728px] px-4 pt-28 md:px-6 md:pt-32 lg:px-7">
          <SiteHeader homePrefix="" theme={theme} onToggleTheme={handleToggleTheme} />

          <section className="hero-mobile-stage relative flex min-h-[calc(100vh-160px)] flex-col items-center justify-start px-3 pb-8 pt-3 text-center md:hidden">
            {mobileItems.map((item) => (
              <HeroDecorativeImage key={item.key} item={item} />
            ))}

            <img
              src={mobilePostItImg}
              alt="Post-its com a frase Insights transformam experiências"
              className="hero-mobile-postit"
              decoding="async"
            />

            <div className="hero-mobile-title-wrap relative z-10 inline-flex flex-col items-start">
              <span
                aria-hidden="true"
                className="hero-title-highlight hero-mobile-title-highlight hero-mobile-title-highlight--top absolute -z-10 rounded-[4px]"
              />
              <span
                aria-hidden="true"
                className="hero-title-highlight hero-mobile-title-highlight hero-mobile-title-highlight--bottom absolute -z-10 rounded-[4px]"
              />

              <h1 className="hero-title hero-mobile-title text-left font-bold uppercase">
                UX-UI
                <br />
                DESIGNER
              </h1>
            </div>

            <p className="hero-mobile-copy relative z-10 text-left font-normal text-[var(--text-secondary)]">
              Transformando sistemas complexos
              <br /> em <span className="font-extrabold">experiências simples e intuitivas</span>
            </p>

            <a
              href="#projetos"
              className="hero-cta hero-mobile-cta relative z-10 inline-flex items-center justify-center rounded-full font-extrabold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
            >
              Ver projetos
            </a>
          </section>

          <section className="relative hidden min-h-[700px] items-start justify-center py-8 sm:min-h-[760px] md:flex md:min-h-[820px] lg:min-h-[900px]">
            {desktopItems.map((item) => (
              <HeroDecorativeImage
                key={item.key}
                item={item}
                onAudioEnter={handleAudioEnter}
                onAudioLeave={handleAudioLeave}
              />
            ))}

            {headphoneActive ? (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-[118px] top-[28px] hidden h-[170px] w-[170px] md:block lg:right-[132px] lg:top-[18px] lg:h-[220px] lg:w-[220px]"
              >
                <span
                  className="hero-headphone-note hero-headphone-note--one"
                  style={{ animation: "musicNoteCurveLeft 1.5s ease-out infinite" }}
                >
                  ♪
                </span>
                <span
                  className="hero-headphone-note hero-headphone-note--two"
                  style={{ animation: "musicNoteCurveLeft 1.5s ease-out 0.25s infinite" }}
                >
                  ♫
                </span>
                <span
                  className="hero-headphone-note hero-headphone-note--three"
                  style={{ animation: "musicNoteCurveLeft 1.5s ease-out 0.45s infinite" }}
                >
                  ♪
                </span>
              </div>
            ) : null}

            <div className="relative z-10 mt-[92px] flex w-full max-w-[980px] flex-col items-start px-4 text-left md:mt-[84px] md:px-0 md:pl-[122px]">
              <img
                src={postItImg}
                alt="Post-its com a frase Insights transformam experiências"
                className="hero-desktop-postit"
                decoding="async"
                data-cursor="note"
              />

              <div className="relative inline-flex flex-col items-start">
                <span
                  aria-hidden="true"
                  className="hero-title-highlight absolute left-[-12px] top-[35%] -z-10 h-[32px] w-[63%] rounded-[4px] sm:h-[42px] md:h-[48px] lg:h-[52px]"
                />
                <span
                  aria-hidden="true"
                  className="hero-title-highlight absolute bottom-[-2%] left-[-12px] -z-10 h-[32px] w-[103.8%] rounded-[4px] sm:h-[42px] md:h-[48px] lg:h-[52px]"
                />

                <h1 className="hero-title text-left text-[64px] font-bold uppercase leading-[0.94] tracking-[-0.04em] sm:text-[58px] md:text-[106px] lg:text-[126px] xl:text-[155px]">
                  UX-UI
                  <br />
                  DESIGNER
                </h1>
              </div>

              <p className="mt-11 max-w-[780px] text-left text-[23px] font-normal leading-[1] tracking-[-0.045em] text-[var(--text-secondary)] sm:text-[28px] md:max-w-[700px] md:text-[34px] lg:max-w-[760px] lg:text-[38px]">
                Transformando sistemas complexos
                <br /> em <span className="font-extrabold">experiências simples e intuitivas</span>
              </p>

              <a
                href="#projetos"
                data-cursor="cta"
                className="hero-cta mt-12 ml-[250px] inline-flex min-h-[62px] min-w-[200px] items-center justify-center rounded-full px-10 text-[22px] font-extrabold tracking-[-0.03em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] md:min-h-[62px] md:min-w-[244px] md:text-[22px]"
              >
                Ver projetos
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
