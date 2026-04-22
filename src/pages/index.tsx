import Head from "next/head";
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

const identityBlocks = [
  {
    label: "Identity",
    title: "Full-stack engineer",
    description: "Product, native, and tooling work with a calm technical lens.",
  },
  {
    label: "Current focus",
    title: "React, TypeScript, Swift",
    description: "Interfaces, dependable systems, and software meant for real use.",
  },
  {
    label: "Availability",
    title: "Select collaborations",
    description: "Based in Brazil and open to thoughtful product and engineering work.",
  },
];

const featuredProjectSlugs = ["dost", "polter", "converge", "duplizen"];

const featuredProjectSummaries: Record<string, string> = {
  dost: "Commerce platform, operations flows, and mobile expansion for a growing brand.",
  polter: "Developer tooling for orchestrating local infrastructure, pipelines, and daily CLI work.",
  converge: "Native macOS Pomodoro app focused on clarity, history, and uninterrupted flow.",
  duplizen: "Realtime multiplayer social game designed for web-first play and quick mobile access.",
};

const focusAreas = [
  {
    title: "Product engineering",
    note: "From concept to shipped interface",
  },
  {
    title: "Native macOS",
    note: "Swift and focused desktop experiences",
  },
  {
    title: "Developer tooling",
    note: "Internal systems and operational DX",
  },
  {
    title: "Frontend systems",
    note: "Design-aware implementation with restraint",
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
    value: "Selected experience and projects",
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
        <div className="portfolio-container">
          <header className="portfolio-header">
            <div className="portfolio-brand">
              <span className="portfolio-kicker">Erick Barcelos / Portfolio</span>
              <a href="#top" className="portfolio-wordmark">
                rckbrcls
              </a>
            </div>

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

          <main className="portfolio-layout">
            <aside className="portfolio-rail" aria-label="Portfolio overview">
              <div className="portfolio-rail-inner">
                {identityBlocks.map((block, index) => (
                  <section key={block.label} className="portfolio-rail-card">
                    <p className="portfolio-kicker">
                      {String(index + 1).padStart(2, "0")} / {block.label}
                    </p>
                    <h2 className="portfolio-rail-title">{block.title}</h2>
                    <p className="portfolio-rail-copy">{block.description}</p>
                  </section>
                ))}

                <nav className="portfolio-directory" aria-label="Section index">
                  <p className="portfolio-kicker">Section index</p>
                  <div className="portfolio-directory-links">
                    {sectionLinks.map((section) => (
                      <a
                        key={section.href}
                        href={section.href}
                        className="portfolio-directory-link"
                      >
                        <span>
                          {section.number}. {section.label}
                        </span>
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </nav>
              </div>
            </aside>

            <div className="portfolio-main">
              <section id="overview" className="portfolio-section">
                <div className="portfolio-hero-grid">
                  <div className="portfolio-hero-copy">
                    <div className="portfolio-hero-copy-top">
                      <p className="portfolio-kicker">Software engineer</p>
                      <h1 className="portfolio-hero-title">
                        Products, native apps, and tools with a calm technical
                        point of view.
                      </h1>
                      <p className="portfolio-hero-summary">
                        Selected public work across commerce, macOS software, and
                        developer tooling.
                      </p>
                    </div>

                    <div className="portfolio-hero-foot">
                      <a href="#work" className="portfolio-button">
                        View selected work
                      </a>
                      <p className="portfolio-hero-caption">
                        Real projects, concise framing, and direct links to what
                        matters.
                      </p>
                    </div>
                  </div>

                  <div className="portfolio-hero-visual">
                    <div className="portfolio-hero-accent" aria-hidden="true" />
                    <div className="portfolio-hero-structure" aria-hidden="true">
                      <div className="portfolio-hero-plane portfolio-hero-plane-back" />
                      <div className="portfolio-hero-plane portfolio-hero-plane-front" />
                      <div className="portfolio-hero-base" />
                      <div className="portfolio-hero-marker" />
                    </div>

                    <div className="portfolio-hero-panel">
                      <p className="portfolio-kicker">Current frame</p>
                      <p>Shipping software that stays clear, useful, and dependable.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="work" className="portfolio-section">
                <div className="portfolio-section-intro">
                  <div className="portfolio-section-heading">
                    <p className="portfolio-kicker">Selected work</p>
                    <h2 className="portfolio-section-title">
                      A tighter view of the projects that best represent the current
                      mix.
                    </h2>
                  </div>

                  <p className="portfolio-section-summary">
                    Four public projects across commerce, native software, and
                    developer tooling.
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
                      I like work that stays useful after the launch moment.
                    </h2>
                    <p className="portfolio-about-copy">
                      Most projects here sit between product judgment, interface
                      structure, and implementation detail. The goal is simple:
                      fewer unnecessary layers, better defaults, and software that
                      holds up in everyday use.
                    </p>
                    <a href="#contact" className="portfolio-inline-link portfolio-inline-link-light">
                      Start a conversation
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
                      Available for product, platform, and tooling conversations.
                    </h2>
                    <p className="portfolio-section-summary">
                      Email is the fastest path. GitHub, LinkedIn, and the resume
                      stay close behind.
                    </p>
                    <a
                      href="mailto:erickbarcelosdev@gmail.com"
                      className="portfolio-button"
                    >
                      Send an email
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
                <p className="portfolio-footer-note">rckbrcls / Selected public work</p>
                <a href="#top" className="portfolio-inline-link">
                  Back to top
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </footer>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
