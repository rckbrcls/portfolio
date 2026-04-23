import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { ArrowUp, ArrowUpRight, Moon, Settings2, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useThemeToggle } from "@/hooks/use-theme-toggle";
import { contactLinks, navigationLinks } from "@/lib/portfolio-content";
import { cn } from "@/lib/utils";

type PortfolioSectionSpacing =
  | "page-start"
  | "stack"
  | "stack-tight"
  | "stack-loose";

interface PortfolioLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

interface PortfolioPageIntroProps {
  kicker: string;
  title: string;
  titleVisual?: ReactNode;
  action?: ReactNode;
}

interface PortfolioCollectionProps
  extends ComponentPropsWithoutRef<"div"> {
  columns: 1 | 2;
}

interface PortfolioSectionProps extends ComponentPropsWithoutRef<"section"> {
  spacing?: PortfolioSectionSpacing;
}

interface PortfolioSectionBodyProps extends ComponentPropsWithoutRef<"div"> {}

const HEADER_BRAND_IDLE_FRAME = "/animation/piscar-sorrindo-1(igual).png";
const HEADER_BRAND_CLOSED_SMILE_FRAME = "/animation/fechar-sorriso-2.png";
const HEADER_BRAND_OPEN_SMILE_FRAME = "/animation/abrir-sorriso-2(igual).png";
const HEADER_BRAND_INITIAL_IDLE_HOLD_MS = 1600;

const HEADER_BRAND_BLOCKS = {
  blinkSmiling: {
    frameStepMs: 110,
    cooldownMs: 1800,
    cooldownFrameSrc: HEADER_BRAND_IDLE_FRAME,
    frames: [
      HEADER_BRAND_IDLE_FRAME,
      "/animation/piscar-sorrindo-2.png",
      "/animation/piscar-sorrindo-3.png",
      "/animation/piscar-sorrindo-2.png",
      HEADER_BRAND_IDLE_FRAME,
    ],
  },
  closeSmile: {
    frameStepMs: 160,
    cooldownMs: 2200,
    cooldownFrameSrc: HEADER_BRAND_CLOSED_SMILE_FRAME,
    frames: [
      HEADER_BRAND_IDLE_FRAME,
      "/animation/fechar-sorriso-1.png",
      HEADER_BRAND_CLOSED_SMILE_FRAME,
    ],
  },
  openSmile: {
    frameStepMs: 170,
    cooldownMs: 2600,
    cooldownFrameSrc: HEADER_BRAND_OPEN_SMILE_FRAME,
    frames: [
      HEADER_BRAND_CLOSED_SMILE_FRAME,
      "/animation/abrir-sorriso-1.png",
      HEADER_BRAND_OPEN_SMILE_FRAME,
    ],
  },
} as const;

const HEADER_BRAND_MACRO_CYCLE = [
  "blinkSmiling",
  "closeSmile",
  "openSmile",
] as const;

type HeaderBrandBlockName = keyof typeof HEADER_BRAND_BLOCKS;

function HeaderBrandAnimation() {
  const [frameSrc, setFrameSrc] = useState(HEADER_BRAND_IDLE_FRAME);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const preloadedFrames = Array.from(
      new Set(
        Object.values(HEADER_BRAND_BLOCKS).flatMap((block) => block.frames),
      ),
    ).map((src) => {
      const image = new window.Image();
      image.src = src;
      return image;
    });

    let timeoutId: number | null = null;

    const stopAnimation = () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    const scheduleTimeout = (callback: () => void, delayMs: number) => {
      timeoutId = window.setTimeout(() => {
        callback();
      }, delayMs);
    };

    const scheduleCycleStep = (cycleIndex: number) => {
      const blockName =
        HEADER_BRAND_MACRO_CYCLE[cycleIndex] ?? HEADER_BRAND_MACRO_CYCLE[0];

      playBlock(blockName, 0, cycleIndex);
    };

    const playBlock = (
      blockName: HeaderBrandBlockName,
      frameIndex: number,
      cycleIndex: number,
    ) => {
      const block = HEADER_BRAND_BLOCKS[blockName];
      const currentFrame = block.frames[frameIndex] ?? HEADER_BRAND_IDLE_FRAME;

      setFrameSrc(currentFrame);

      if (frameIndex < block.frames.length - 1) {
        scheduleTimeout(() => {
          playBlock(blockName, frameIndex + 1, cycleIndex);
        }, block.frameStepMs);
        return;
      }

      scheduleTimeout(() => {
        setFrameSrc(block.cooldownFrameSrc);

        scheduleTimeout(() => {
          const nextCycleIndex =
            (cycleIndex + 1) % HEADER_BRAND_MACRO_CYCLE.length;
          scheduleCycleStep(nextCycleIndex);
        }, block.cooldownMs);
      }, block.frameStepMs);
    };

    const syncAnimation = () => {
      stopAnimation();
      setFrameSrc(HEADER_BRAND_IDLE_FRAME);

      if (mediaQuery.matches) {
        return;
      }

      scheduleTimeout(() => {
        scheduleCycleStep(0);
      }, HEADER_BRAND_INITIAL_IDLE_HOLD_MS);
    };

    syncAnimation();

    const handleMediaChange = () => {
      syncAnimation();
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }

    return () => {
      stopAnimation();

      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }

      preloadedFrames.length = 0;
    };
  }, []);

  return (
    <span className="portfolio-brand-animation">
      <img
        src={frameSrc}
        alt=""
        aria-hidden="true"
        className="portfolio-brand-photo"
      />
    </span>
  );
}

function HeaderConfigMenu() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const { isDark, mounted, toggleLabel, toggleTheme } = useThemeToggle();
  const ThemeIcon = mounted && isDark ? Sun : Moon;
  const nextThemeLabel = mounted && isDark ? "Light" : "Dark";

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          aria-label="Open config"
          aria-haspopup="menu"
          aria-expanded={open}
          className="portfolio-nav-button portfolio-nav-icon-button"
        >
          <Settings2 className="portfolio-nav-icon" />
          <span className="sr-only">Config</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="portfolio-config-menu !w-auto !min-w-[14rem] !rounded-none !p-0"
      >
        <DropdownMenuItem
          className="portfolio-config-menu-item !rounded-none"
          aria-label={toggleLabel}
          onSelect={() => {
            toggleTheme(triggerRef.current);
            setOpen(false);
          }}
        >
          <span className="portfolio-config-menu-copy">
            <ThemeIcon className="portfolio-config-menu-icon h-4 w-4" />
            <span className="portfolio-config-menu-label">
              {nextThemeLabel}
            </span>
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function PortfolioLayout({
  title,
  description,
  children,
}: PortfolioLayoutProps) {
  const router = useRouter();
  const footerSentinelRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [backToTopFooterOffset, setBackToTopFooterOffset] = useState(0);

  useEffect(() => {
    const sentinelNode = footerSentinelRef.current;
    const footerNode = footerRef.current;

    if (!sentinelNode || !footerNode || typeof window === "undefined") {
      return;
    }

    let isSentinelVisible = false;
    let frame = 0;

    const syncVisibility = () => {
      setShowBackToTop(isSentinelVisible && window.scrollY > 48);

      const footerRect = footerNode.getBoundingClientRect();
      const footerOffset = Math.max(
        0,
        Math.round(window.innerHeight - footerRect.top),
      );

      setBackToTopFooterOffset(footerOffset);
    };

    const requestSyncVisibility = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        syncVisibility();
      });
    };

    if (typeof IntersectionObserver === "undefined") {
      const onScroll = () => {
        const rect = sentinelNode.getBoundingClientRect();
        isSentinelVisible = rect.top <= window.innerHeight;
        requestSyncVisibility();
      };

      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", requestSyncVisibility);

      return () => {
        if (frame !== 0) {
          window.cancelAnimationFrame(frame);
        }

        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", requestSyncVisibility);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isSentinelVisible = entry.isIntersecting;
        requestSyncVisibility();
      },
      {
        threshold: 0.35,
      },
    );

    const onScroll = () => {
      requestSyncVisibility();
    };

    observer.observe(sentinelNode);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", requestSyncVisibility);
    syncVisibility();

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", requestSyncVisibility);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <div id="top" className="portfolio-shell">
        <div className="portfolio-header-shell">
          <div className="portfolio-header-shell-inner">
            <header className="portfolio-header">
              <Link
                href="/"
                className="portfolio-brand"
                aria-label="Go to home"
              >
                <HeaderBrandAnimation />
              </Link>

              <nav className="portfolio-nav" aria-label="Primary navigation">
                {navigationLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={
                      router.pathname === item.href ||
                      (item.href !== "/" &&
                        router.pathname.startsWith(`${item.href}/`))
                        ? "page"
                        : undefined
                    }
                    className="portfolio-nav-link"
                  >
                    {item.number}. {item.label}
                  </Link>
                ))}

                <HeaderConfigMenu />
              </nav>
            </header>
          </div>
        </div>

        <div className="portfolio-frame">
          <span
            className="portfolio-frame-corner portfolio-frame-corner--top-left"
            aria-hidden="true"
          />
          <span
            className="portfolio-frame-corner portfolio-frame-corner--top-right"
            aria-hidden="true"
          />
          <span
            className="portfolio-frame-corner portfolio-frame-corner--bottom-left"
            aria-hidden="true"
          />
          <span
            className="portfolio-frame-corner portfolio-frame-corner--bottom-right"
            aria-hidden="true"
          />

          <div className="portfolio-container">
            <main className="portfolio-main">{children}</main>
            <div
              ref={footerSentinelRef}
              className="portfolio-end-sentinel"
              aria-hidden="true"
            />
          </div>
        </div>

        <footer ref={footerRef} className="portfolio-footer">
          <div
            className="portfolio-footer-card-grid"
            style={
              {
                "--portfolio-footer-columns": String(contactLinks.length),
              } as CSSProperties
            }
          >
            {contactLinks.map((item) => {
              const Icon = item.icon;
              const opensInNewTab =
                item.href.startsWith("http") || item.href.endsWith(".pdf");

              return (
                <a
                  key={item.title}
                  href={item.href}
                  target={opensInNewTab ? "_blank" : undefined}
                  rel={opensInNewTab ? "noopener noreferrer" : undefined}
                  className="portfolio-footer-card"
                >
                  <div className="portfolio-footer-card-line">
                    <div className="portfolio-footer-card-leading">
                      <Icon className="portfolio-footer-card-icon h-5 w-5" />
                      <div className="portfolio-footer-card-copy">
                        <span className="portfolio-footer-card-title">
                          {item.title}
                        </span>
                        <span className="portfolio-footer-card-value">
                          {item.value}
                        </span>
                      </div>
                    </div>

                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </a>
              );
            })}
          </div>
        </footer>

        <a
          href="#top"
          className={`portfolio-floating-top${showBackToTop ? " is-visible" : ""}`}
          style={
            {
              "--portfolio-floating-top-footer-offset": `${backToTopFooterOffset}px`,
            } as CSSProperties
          }
        >
          <ArrowUp className="h-4 w-4" />
          Back to top
        </a>
      </div>
    </>
  );
}

export function PortfolioPageIntro({
  kicker,
  title,
  titleVisual,
  action,
}: PortfolioPageIntroProps) {
  const hasSide = Boolean(action);

  return (
    <PortfolioSection
      spacing="page-start"
      className="portfolio-page-intro"
    >
      <div
        className={
          hasSide
            ? "portfolio-page-intro-grid"
            : "portfolio-page-intro-grid portfolio-page-intro-grid--compact"
        }
      >
        <div className="portfolio-section-heading">
          <p className="portfolio-kicker">{kicker}</p>
          <h1 className="portfolio-page-title" aria-label={title}>
            {titleVisual ?? title}
          </h1>
        </div>

        {hasSide ? (
          <div className="portfolio-page-intro-side">
            {action ? (
              <div className="portfolio-page-intro-action">{action}</div>
            ) : null}
          </div>
        ) : null}
      </div>
    </PortfolioSection>
  );
}

export function PortfolioSection({
  children,
  className,
  spacing = "stack",
  ...props
}: PortfolioSectionProps) {
  return (
    <section
      className={cn(
        "portfolio-section",
        `portfolio-section--${spacing}`,
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function PortfolioSectionBody({
  children,
  className,
  ...props
}: PortfolioSectionBodyProps) {
  return (
    <div className={cn("portfolio-section-body", className)} {...props}>
      {children}
    </div>
  );
}

export function PortfolioCollection({
  children,
  className,
  columns,
  ...props
}: PortfolioCollectionProps) {
  return (
    <div
      className={cn("portfolio-collection", className)}
      data-columns={columns}
      {...props}
    >
      <span
        className="portfolio-collection-cross portfolio-collection-cross--top-left"
        aria-hidden="true"
      />
      <span
        className="portfolio-collection-cross portfolio-collection-cross--top-right"
        aria-hidden="true"
      />
      <span
        className="portfolio-collection-cross portfolio-collection-cross--bottom-left"
        aria-hidden="true"
      />
      <span
        className="portfolio-collection-cross portfolio-collection-cross--bottom-right"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
