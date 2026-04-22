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
  { href: "#overview", label: "Overview" },
  { href: "#profile", label: "Profile" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

const summaryDeck = [
  { label: "Discipline", value: "Full-stack engineering" },
  { label: "Focus", value: "Product, native, and tooling" },
  { label: "Stack", value: "React, Next.js, TypeScript, Swift" },
  { label: "Status", value: "Shipping active projects" },
];

const profileNotes = [
  {
    title: "Coding as a long-term practice",
    description:
      "I like building products that feel precise and alive. Writing code is still the part of the work that keeps everything else fun.",
  },
  {
    title: "Range outside the screen",
    description:
      "Drawing, sports, and long walks help me keep the work sharp. Ororu is usually around as a reminder that good systems also need air.",
  },
  {
    title: "Reset creates perspective",
    description:
      "Travel, the beach, and time in nature help me reset. A lot of better interface and product decisions tend to start there.",
  },
];

const contactLinks = [
  {
    title: "GitHub",
    value: "@rckbrcls",
    action: "View profile",
    href: "https://github.com/rckbrcls",
    icon: Github,
  },
  {
    title: "LinkedIn",
    value: "/in/brcls",
    action: "Open profile",
    href: "https://www.linkedin.com/in/brcls/",
    icon: Linkedin,
  },
  {
    title: "Email",
    value: "erickbarcelosdev@gmail.com",
    action: "Send email",
    href: "mailto:erickbarcelosdev@gmail.com",
    icon: Mail,
  },
  {
    title: "Resume",
    value: "Selected work and experience",
    action: "Open PDF",
    href: "/files/Resume.pdf",
    icon: FileText,
  },
];

const statusCopy = {
  working: "Currently shipping",
  finished: "Released",
  designing: "In design",
} as const;

const orderedProjects = [...projects].sort(
  (left, right) => (right.order ?? 0) - (left.order ?? 0),
);

export default function Home() {
  return (
    <>
      <Head>
        <title>rckbrcls | Portfolio</title>
        <meta
          name="description"
          content="Portfolio for Erick Barcelos. Full-stack, native, and tooling work presented with a clear editorial structure."
        />
      </Head>

      <div className="portfolio-shell">
        <div className="portfolio-container">
          <header className="portfolio-header">
            <div className="portfolio-brand">
              <span className="portfolio-kicker">Erick Barcelos / Portfolio</span>
              <a href="#overview" className="portfolio-wordmark">
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
                  {section.label}
                </a>
              ))}
            </nav>
          </header>

          <main>
            <section id="overview" className="portfolio-section">
              <div className="grid gap-8">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="portfolio-kicker">Software engineer</p>
                    <h1 className="max-w-4xl text-[clamp(3.25rem,8vw,5.25rem)] font-bold leading-[0.98] tracking-[-0.04em] text-[color:var(--portfolio-primary)]">
                      Full-stack, native, and tooling work with a clear product
                      point of view.
                    </h1>
                    <p className="max-w-2xl text-base leading-8 text-[color:var(--portfolio-secondary)] sm:text-lg">
                      I build full-stack products, native macOS software, and
                      developer tooling with an emphasis on calm interfaces,
                      dependable systems, and practical product decisions.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a href="#work" className="portfolio-button">
                      View selected work
                    </a>
                    <a
                      href="mailto:erickbarcelosdev@gmail.com"
                      className="portfolio-button-secondary"
                    >
                      <Mail className="h-4 w-4" />
                      Email
                    </a>
                    <a
                      href="/files/Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-button-secondary"
                    >
                      <FileText className="h-4 w-4" />
                      Resume
                    </a>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {summaryDeck.map((item) => (
                      <div key={item.label} className="portfolio-meta-card">
                        <p className="portfolio-kicker">{item.label}</p>
                        <p className="mt-3 text-base font-medium leading-6 text-[color:var(--portfolio-primary)]">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <aside className="portfolio-surface portfolio-surface-muted portfolio-support-note max-w-3xl">
                    <div className="grid gap-4 p-5 sm:p-6">
                      <div className="space-y-2">
                        <p className="portfolio-kicker">Current read</p>
                        <h2 className="text-2xl font-semibold leading-[1.02] tracking-[-0.03em] text-[color:var(--portfolio-primary)]">
                          Building clear interfaces and dependable systems.
                        </h2>
                      </div>
                      <p className="text-sm leading-7 text-[color:var(--portfolio-secondary)]">
                        The portfolio is intentionally simple: real work,
                        visible stack choices, and enough context to understand
                        how I think about product, engineering, and execution.
                      </p>
                    </div>
                  </aside>
                </div>
              </div>
            </section>

            <section id="profile" className="portfolio-section">
              <div className="grid gap-8">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
                  <div className="space-y-5">
                    <div className="space-y-3">
                      <p className="portfolio-kicker">Profile</p>
                      <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[color:var(--portfolio-primary)]">
                        A portfolio shaped by product work, native apps, and
                        tools built for daily use.
                      </h2>
                    </div>
                    <p className="max-w-2xl text-base leading-8 text-[color:var(--portfolio-secondary)]">
                      I like moving between product thinking, interface work, and
                      the operational detail of making systems hold together in
                      the real world. That mix is what keeps the work honest.
                    </p>
                    <p className="max-w-2xl text-base leading-8 text-[color:var(--portfolio-secondary)]">
                      The current body of work spans commerce, developer
                      tooling, multiplayer experiences, native macOS software,
                      and reusable frontend libraries. The common thread is
                      clarity: fewer layers of noise, better defaults, and
                      systems that hold up in practice.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {profileNotes.map((note) => (
                      <article
                        key={note.title}
                        className="portfolio-surface portfolio-note-card grid gap-3 p-4 sm:p-5"
                      >
                        <p className="portfolio-kicker">Profile note</p>
                        <h3 className="text-lg font-semibold leading-[1.08] tracking-[-0.02em] text-[color:var(--portfolio-primary)]">
                          {note.title}
                        </h3>
                        <p className="text-sm leading-7 text-[color:var(--portfolio-secondary)]">
                          {note.description}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section id="work" className="portfolio-section">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="space-y-3">
                  <p className="portfolio-kicker">Project archive</p>
                  <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[color:var(--portfolio-primary)]">
                    Selected work across product, native, and tooling.
                  </h2>
                </div>

                <p className="max-w-2xl text-base leading-8 text-[color:var(--portfolio-secondary)]">
                  Each project keeps the stack, current status, and relevant
                  links visible on the same page. The goal is clarity first, not
                  decoration.
                </p>
              </div>

              <div className="mt-10 grid gap-5">
                {orderedProjects.map((project, index) => (
                  <article
                    key={project.slug}
                    className="portfolio-surface portfolio-project-card overflow-hidden"
                  >
                    <div className="grid gap-6 p-5 sm:p-6">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="portfolio-kicker">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="portfolio-status">
                            {statusCopy[project.status]}
                          </span>
                        </div>
                        <p className="text-sm leading-6 text-[color:var(--portfolio-secondary)]">
                          Built by {project.members.join(", ")}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-3xl font-semibold leading-[1.02] tracking-[-0.03em] text-[color:var(--portfolio-primary)] sm:text-4xl">
                          {project.name}
                        </h3>
                        <p className="max-w-3xl text-base leading-8 text-[color:var(--portfolio-secondary)]">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((item) => (
                          <span key={item} className="portfolio-tag">
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-x-6 gap-y-3">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="portfolio-inline-link"
                          >
                            Open project
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}

                        {project.gitLink && (
                          <a
                            href={project.gitLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="portfolio-inline-link"
                          >
                            View source
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}

                        {project.npmUrl && (
                          <a
                            href={project.npmUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="portfolio-inline-link"
                          >
                            Open package
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="contact" className="portfolio-section border-b-0 pb-0">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
                <div className="space-y-4">
                  <p className="portfolio-kicker">Contact</p>
                  <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[color:var(--portfolio-primary)]">
                    Open for thoughtful conversations about product and
                    engineering.
                  </h2>
                  <p className="max-w-2xl text-base leading-8 text-[color:var(--portfolio-secondary)]">
                    GitHub, LinkedIn, email, and the resume stay here so the
                    portfolio closes with direct next steps instead of another
                    route.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {contactLinks.map((item) => {
                    const Icon = item.icon;
                    const isExternal = !item.href.startsWith("mailto:");

                    return (
                      <a
                        key={item.title}
                        href={item.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="portfolio-contact-card"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <Icon className="h-5 w-5 text-[color:var(--portfolio-accent)]" />
                          <ArrowUpRight className="h-4 w-4 text-[color:var(--portfolio-secondary)]" />
                        </div>

                        <div className="space-y-2">
                          <p className="text-lg font-semibold leading-6 text-[color:var(--portfolio-primary)]">
                            {item.title}
                          </p>
                          <p className="text-sm leading-7 text-[color:var(--portfolio-secondary)]">
                            {item.value}
                          </p>
                        </div>

                        <p className="portfolio-kicker">{item.action}</p>
                      </a>
                    );
                  })}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
