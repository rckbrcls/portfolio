import Head from "next/head";
import Image from "next/image";
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
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
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
  summary?: string;
  action?: ReactNode;
}

interface PortfolioCollectionProps
  extends ComponentPropsWithoutRef<"div"> {
  columns: 1 | 2;
  showCenterCross?: boolean;
}

interface PortfolioSectionProps extends ComponentPropsWithoutRef<"section"> {
  spacing?: PortfolioSectionSpacing;
}

interface PortfolioSectionBodyProps extends ComponentPropsWithoutRef<"div"> {}

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
                <Image
                  src="/images/me.png"
                  alt="Portrait of Erick Barcelos"
                  width={72}
                  height={72}
                  priority
                  className="portfolio-brand-photo"
                />
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
              </nav>
            </header>
          </div>
        </div>

        <AnimatedThemeToggler className="portfolio-floating-theme-toggle" />

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
          <div className="portfolio-footer-card-grid">
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
  summary,
  action,
}: PortfolioPageIntroProps) {
  const hasSide = Boolean(summary || action);

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
            {summary ? (
              <p className="portfolio-section-summary">{summary}</p>
            ) : null}
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
  showCenterCross = false,
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
      {showCenterCross ? (
        <span
          className="portfolio-collection-cross portfolio-collection-cross--center"
          aria-hidden="true"
        />
      ) : null}
      {children}
    </div>
  );
}
