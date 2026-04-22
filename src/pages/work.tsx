import { WorkProjectCard } from "@/components/featured-project-card";
import {
  PortfolioCollection,
  PortfolioLayout,
  PortfolioPageIntro,
  PortfolioSection,
  PortfolioSectionBody,
} from "@/components/portfolio-shell";
import { ProfessionalWorkCard } from "@/components/professional-work-card";
import { MorphingText } from "@/components/ui/morphing-text";
import {
  orderedProfessionalWork,
  orderedProjects,
} from "@/lib/portfolio-content";

const WORK_TITLE_VARIANTS = [
  "Work.",
  "Builds.",
  "Products.",
  "Systems.",
  "Projects.",
];

export default function WorkPage() {
  return (
    <PortfolioLayout
      title="Work | rckbrcls"
      description="Professional work and independent projects by Erick Barcelos."
    >
      <div className="portfolio-editorial-stack">
        <PortfolioPageIntro
          kicker="Work"
          title="Work."
          titleVisual={<MorphingText texts={WORK_TITLE_VARIANTS} />}
        />

        <PortfolioSection spacing="stack-tight">
          <div className="portfolio-section-intro">
            <div className="portfolio-section-heading">
              <h2 className="portfolio-section-title">Professional work.</h2>
            </div>
          </div>

          <PortfolioSectionBody>
            <PortfolioCollection columns={1}>
              {orderedProfessionalWork.map((item, index) => (
                <ProfessionalWorkCard
                  key={item.slug}
                  item={item}
                  index={index}
                />
              ))}
            </PortfolioCollection>
          </PortfolioSectionBody>
        </PortfolioSection>

        <PortfolioSection spacing="stack-tight">
          <div className="portfolio-section-intro">
            <div className="portfolio-section-heading">
              <h2 className="portfolio-section-title">Independent projects.</h2>
            </div>
          </div>

          <PortfolioSectionBody>
            <PortfolioCollection columns={1}>
              {orderedProjects.map((project, index) => (
                <WorkProjectCard
                  key={project.slug}
                  project={project}
                  index={index}
                />
              ))}
            </PortfolioCollection>
          </PortfolioSectionBody>
        </PortfolioSection>
      </div>
    </PortfolioLayout>
  );
}
