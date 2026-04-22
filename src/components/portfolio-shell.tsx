import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import ScaleLetterText from "@/components/ui/scale-letter-text";
import { contactLinks, navigationLinks } from "@/lib/portfolio-content";
import { cn } from "@/lib/utils";

type PortfolioSectionSpacing = "page-start" | "stack" | "stack-tight";

interface PortfolioLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

interface PortfolioPageIntroProps {
  kicker: string;
  title: string;
  summary?: string;
  action?: ReactNode;
}

interface PortfolioCollectionProps {
  children: ReactNode;
  className?: string;
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
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const node = footerSentinelRef.current;

    if (!node || typeof window === "undefined") {
      return;
    }

    let isSentinelVisible = false;

    const syncVisibility = () => {
      setShowBackToTop(isSentinelVisible && window.scrollY > 48);
    };

    if (typeof IntersectionObserver === "undefined") {
      const onScroll = () => {
        const rect = node.getBoundingClientRect();
        isSentinelVisible = rect.top <= window.innerHeight;
        syncVisibility();
      };

      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isSentinelVisible = entry.isIntersecting;
        syncVisibility();
      },
      {
        threshold: 0.35,
      },
    );

    const onScroll = () => {
      syncVisibility();
    };

    observer.observe(node);
    window.addEventListener("scroll", onScroll, { passive: true });
    syncVisibility();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
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

              <div className="portfolio-header-main">
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

                <div className="portfolio-header-controls">
                  <AnimatedThemeToggler className="portfolio-theme-toggle" />
                </div>
              </div>
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

        <footer className="portfolio-footer">
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
          <h1 className="portfolio-page-title">
            <ScaleLetterText text={title} />
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
  showCenterCross = false,
}: PortfolioCollectionProps) {
  return (
    <div className={cn("portfolio-collection", className)}>
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
