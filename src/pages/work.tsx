import { WorkProjectCard } from "@/components/featured-project-card";
import {
  PortfolioCollection,
  PortfolioLayout,
  PortfolioPageIntro,
  PortfolioSection,
  PortfolioSectionBody,
} from "@/components/portfolio-shell";
import { MorphingText } from "@/components/ui/morphing-text";
import { orderedProjects } from "@/lib/portfolio-content";

const WORK_TITLE_VARIANTS = [
  "Projects.",
  "Work.",
  "Builds.",
  "Products.",
  "Systems.",
];

export default function WorkPage() {
  return (
    <PortfolioLayout
      title="Work | rckbrcls"
      description="Projects by Erick Barcelos."
    >
      <PortfolioPageIntro
        kicker="Work"
        title="Projects."
        titleVisual={<MorphingText texts={WORK_TITLE_VARIANTS} />}
      />

      <PortfolioSection spacing="stack-tight">
        <PortfolioSectionBody>
          <PortfolioCollection className="portfolio-project-list">
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
    </PortfolioLayout>
  );
}
