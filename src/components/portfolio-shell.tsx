import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { contactLinks, navigationLinks } from "@/lib/portfolio-content";

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

export function PortfolioLayout({
  title,
  description,
  children,
}: PortfolioLayoutProps) {
  const router = useRouter();

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

        <div className="portfolio-container">
          <main className="portfolio-main">{children}</main>

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

            <div className="portfolio-footer-bottom">
              <a href="#top" className="portfolio-inline-link">
                Back to top
              </a>
            </div>
          </footer>
        </div>
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
    <section className="portfolio-section portfolio-page-intro">
      <div
        className={
          hasSide
            ? "portfolio-page-intro-grid"
            : "portfolio-page-intro-grid portfolio-page-intro-grid--compact"
        }
      >
        <div className="portfolio-section-heading">
          <p className="portfolio-kicker">{kicker}</p>
          <h1 className="portfolio-page-title">{title}</h1>
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
    </section>
  );
}
