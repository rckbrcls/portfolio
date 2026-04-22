import { ArrowUpRight } from "lucide-react";
import {
  PortfolioCollection,
  PortfolioLayout,
  PortfolioPageIntro,
} from "@/components/portfolio-shell";
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
        <PortfolioCollection className="portfolio-project-list">
          {orderedProjects.map((project, index) => {
            const projectLink = getProjectPrimaryLink(project);
            const projectContent = (
              <>
                <div className="portfolio-project-item-header">
                  <p className="portfolio-kicker">
                    {String(index + 1).padStart(2, "0")} / Project
                  </p>
                  <span className="portfolio-status">
                    {statusCopy[project.status]}
                  </span>
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
                      <span className="portfolio-card-action">
                        {projectLink.label}
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    ) : (
                      <span className="portfolio-project-placeholder">
                        No public link
                      </span>
                    )}
                  </div>
                </div>
              </>
            );

            return (
              <article key={project.slug}>
                {projectLink ? (
                  <a
                    href={projectLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-project-item portfolio-editorial-card"
                  >
                    {projectContent}
                  </a>
                ) : (
                  <div className="portfolio-project-item portfolio-editorial-card">
                    {projectContent}
                  </div>
                )}
              </article>
            );
          })}
        </PortfolioCollection>
      </section>
    </PortfolioLayout>
  );
}
