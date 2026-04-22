import Head from "next/head";
import Image from "next/image";
import {
  ArrowUpRight,
  FileText,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { projects } from "../../data/projects/projects";

const sectionLinks = [
  { href: "#overview", label: "Home", number: "01" },
  { href: "#work", label: "Work", number: "02" },
  { href: "#about", label: "About", number: "03" },
  { href: "#contact", label: "Contact", number: "04" },
];

const featuredProjectSlugs = ["dost", "polter", "converge", "duplizen"];

const featuredProjectSummaries: Record<string, string> = {
  dost: "Commerce platform and operations flows for a growing brand.",
  polter: "CLI tooling for local infrastructure, pipelines, and daily workflows.",
  converge: "Native macOS timer built for focus, history, and calm routines.",
  duplizen: "Realtime social deduction game for quick web and mobile play.",
};

const focusAreas = [
  {
    title: "Product engineering",
    note: "Shipped interfaces and systems",
  },
  {
    title: "Native macOS",
    note: "Swift desktop software",
  },
  {
    title: "Developer tooling",
    note: "Operational workflows and DX",
  },
];

const contactLinks = [
  {
    title: "Email",
    value: "erickbarcelosdev@gmail.com",
    href: "mailto:erickbarcelosdev@gmail.com",
    icon: Mail,
  },
  {
    title: "GitHub",
    value: "@rckbrcls",
    href: "https://github.com/rckbrcls",
    icon: Github,
  },
  {
    title: "LinkedIn",
    value: "/in/brcls",
    href: "https://www.linkedin.com/in/brcls/",
    icon: Linkedin,
  },
  {
    title: "Resume",
    value: "Selected work and experience",
    href: "/files/Resume.pdf",
    icon: FileText,
  },
];

const statusCopy = {
  working: "Shipping",
  finished: "Released",
  designing: "In design",
} as const;

const projectLookup = new Map(projects.map((project) => [project.slug, project]));

const featuredProjects = featuredProjectSlugs.flatMap((slug) => {
  const project = projectLookup.get(slug);
  return project ? [project] : [];
});

function getProjectPrimaryLink(project: (typeof projects)[number]) {
  if (project.link) {
    return { href: project.link, label: "Open project" };
  }

  if (project.gitLink) {
    return { href: project.gitLink, label: "View source" };
  }

  if (project.npmUrl) {
    return { href: project.npmUrl, label: "Open package" };
  }

  return null;
}

function getProjectFrameLabel(slug: string) {
  return slug.replace(/-/g, " ").toUpperCase();
}

export default function Home() {
  return (
    <>
      <Head>
        <title>rckbrcls | Portfolio</title>
        <meta
          name="description"
          content="Selected product, native, and tooling work by Erick Barcelos."
        />
      </Head>

      <div id="top" className="portfolio-shell">
        <div className="portfolio-header-shell">
          <div className="portfolio-header-shell-inner">
            <header className="portfolio-header">
              <a href="#top" className="portfolio-brand" aria-label="Back to top">
                <Image
                  src="/images/me.png"
                  alt="Portrait of Erick Barcelos"
                  width={72}
                  height={72}
                  priority
                  className="portfolio-brand-photo"
                />

                <div className="portfolio-brand-copy">
                  <span className="portfolio-kicker">Erick Barcelos / Portfolio</span>
                  <span className="portfolio-wordmark">rckbrcls</span>
                </div>
              </a>

              <nav className="portfolio-nav" aria-label="Primary navigation">
                {sectionLinks.map((section) => (
                  <a
                    key={section.href}
                    href={section.href}
                    className="portfolio-nav-link"
                  >
                    {section.number}. {section.label}
                  </a>
                ))}
              </nav>

              <a
                href="/files/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-header-cta"
              >
                Resume
              </a>
            </header>
          </div>
        </div>

        <div className="portfolio-container">
          <main className="portfolio-main">
            <section id="overview" className="portfolio-section">
              <div className="portfolio-hero">
                <p className="portfolio-kicker">Software engineer</p>
                <h1 className="portfolio-hero-title">
                  Selected product, native, and tooling work.
                </h1>
                <div className="portfolio-hero-foot">
                  <p className="portfolio-hero-summary">
                    Public projects with concise framing and direct links.
                  </p>
                  <a href="#work" className="portfolio-button">
                    View selected work
                  </a>
                </div>
              </div>
            </section>

            <section id="work" className="portfolio-section">
              <div className="portfolio-section-intro">
                <div className="portfolio-section-heading">
                  <p className="portfolio-kicker">Selected work</p>
                  <h2 className="portfolio-section-title">
                    A small set of projects that reflects the current mix.
                  </h2>
                </div>

                <p className="portfolio-section-summary">
                  Commerce, native software, and developer tooling.
                </p>
              </div>

              <div className="portfolio-work-grid">
                {featuredProjects.map((project, index) => {
                  const projectLink = getProjectPrimaryLink(project);

                  return (
                    <article key={project.slug} className="portfolio-project-card">
                      <div className="portfolio-project-media">
                        <div className="portfolio-project-frame" aria-hidden="true">
                          <p className="portfolio-kicker">Project frame</p>
                          <p className="portfolio-project-frame-number">
                            {String(index + 1).padStart(2, "0")}
                          </p>
                          <p className="portfolio-project-frame-name">
                            {getProjectFrameLabel(project.slug)}
                          </p>
                        </div>
                      </div>

                      <div className="portfolio-project-body">
                        <div className="portfolio-project-meta">
                          <p className="portfolio-kicker">
                            {String(index + 1).padStart(2, "0")} / Project
                          </p>
                          <span className="portfolio-status">
                            {statusCopy[project.status]}
                          </span>
                        </div>

                        <div className="portfolio-project-copy">
                          <h3 className="portfolio-project-title">{project.name}</h3>
                          <p className="portfolio-project-summary">
                            {featuredProjectSummaries[project.slug] ?? project.description}
                          </p>
                        </div>

                        <div className="portfolio-project-footer">
                          <p className="portfolio-project-stack">
                            {project.techStack.slice(0, 3).join(" / ")}
                          </p>

                          {projectLink ? (
                            <a
                              href={projectLink.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="portfolio-inline-link"
                            >
                              {projectLink.label}
                              <ArrowUpRight className="h-4 w-4" />
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <section id="about" className="portfolio-section">
              <div className="portfolio-about-grid">
                <article className="portfolio-about-card portfolio-about-card-dark">
                  <p className="portfolio-kicker">About</p>
                  <h2 className="portfolio-about-title">
                    I prefer software that stays useful after launch.
                  </h2>
                  <p className="portfolio-about-copy">
                    Product sense, interface structure, and implementation detail
                    kept in the same lane.
                  </p>
                  <a
                    href="#contact"
                    className="portfolio-inline-link portfolio-inline-link-light"
                  >
                    Get in touch
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </article>

                <article className="portfolio-about-card">
                  <p className="portfolio-kicker">Focus areas</p>
                  <div className="portfolio-capability-list">
                    {focusAreas.map((item) => (
                      <div key={item.title} className="portfolio-capability-item">
                        <p className="portfolio-capability-title">{item.title}</p>
                        <p className="portfolio-capability-note">{item.note}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </section>

            <section id="contact" className="portfolio-section">
              <div className="portfolio-contact-grid">
                <article className="portfolio-contact-panel">
                  <p className="portfolio-kicker">Contact</p>
                  <h2 className="portfolio-section-title">
                    Open to focused product and engineering conversations.
                  </h2>
                  <p className="portfolio-section-summary">
                    Email first. GitHub, LinkedIn, and resume stay close.
                  </p>
                  <a
                    href="mailto:erickbarcelosdev@gmail.com"
                    className="portfolio-button"
                  >
                    Send email
                  </a>
                </article>

                <div className="portfolio-contact-list">
                  {contactLinks.map((item) => {
                    const Icon = item.icon;
                    const isExternal = !item.href.startsWith("mailto:");

                    return (
                      <a
                        key={item.title}
                        href={item.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="portfolio-contact-row"
                      >
                        <Icon className="portfolio-contact-icon h-5 w-5" />

                        <div className="portfolio-contact-copy">
                          <p className="portfolio-contact-title">{item.title}</p>
                          <p className="portfolio-contact-value">{item.value}</p>
                        </div>

                        <ArrowUpRight className="h-4 w-4 text-[color:var(--portfolio-secondary)]" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </section>

            <footer className="portfolio-footer">
              <p className="portfolio-footer-note">rckbrcls / selected work</p>
              <a href="#top" className="portfolio-inline-link">
                Back to top
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}
