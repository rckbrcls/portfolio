import { ArrowUpRight } from "lucide-react";
import { PortfolioLayout, PortfolioPageIntro } from "@/components/portfolio-shell";
import {
  getProjectPrimaryLink,
  getProjectStackPreview,
  getProjectSummary,
  orderedProjects,
  statusCopy,
} from "@/lib/portfolio-content";

export default function WorkPage() {
  return (
    <PortfolioLayout
      title="Work | rckbrcls"
      description="Projects by Erick Barcelos."
    >
      <PortfolioPageIntro
        kicker="Work"
        title="Projects."
      />

      <section className="portfolio-section">
        <div className="portfolio-project-list">
          {orderedProjects.map((project, index) => {
            const projectLink = getProjectPrimaryLink(project);

            return (
              <article key={project.slug} className="portfolio-project-item">
                <div className="portfolio-project-item-header">
                  <p className="portfolio-kicker">
                    {String(index + 1).padStart(2, "0")} / Project
                  </p>
                  <span className="portfolio-status">{statusCopy[project.status]}</span>
                </div>

                <div className="portfolio-project-item-body">
                  <div className="portfolio-project-item-main">
                    <h2 className="portfolio-project-title">{project.name}</h2>
                    <p className="portfolio-project-summary">
                      {getProjectSummary(project)}
                    </p>
                  </div>

                  <p className="portfolio-project-stack">
                    {getProjectStackPreview(project, 5)}
                  </p>

                  <div className="portfolio-project-item-actions">
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
                    ) : (
                      <span className="portfolio-project-placeholder">No public link</span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </PortfolioLayout>
  );
}
