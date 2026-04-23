import { WorkProjectCard } from "@/components/featured-project-card";
import {
  PortfolioCollection,
  PortfolioLayout,
  PortfolioPageIntro,
  PortfolioSection,
  PortfolioSectionBody,
} from "@/components/portfolio-shell";
import { ProfessionalWorkCard } from "@/components/professional-work-card";
import { WordRotate } from "@/components/ui/word-rotate";
import {
  orderedProfessionalWork,
  orderedProjects,
} from "@/lib/portfolio-content";

const WORK_TITLE_VARIANTS = ["Builds.", "Products.", "Systems.", "Projects."];

const editorialStackClassName =
  "grid gap-y-20 pb-14 max-md:gap-y-16 max-md:pb-10 [&>section]:mt-0";

const sectionIntroClassName =
  "flex flex-wrap items-end justify-between gap-portfolio-lg";

const sectionHeadingClassName = "grid gap-3";

const sectionTitleClassName =
  "m-0 max-w-[14ch] text-[2rem] font-[650] leading-[1.02] tracking-normal text-portfolio-primary lg:text-5xl";

export default function WorkPage() {
  return (
    <PortfolioLayout
      title="Work | rckbrcls"
      description="Professional work and independent projects by Erick Barcelos."
    >
      <div className={editorialStackClassName}>
        <PortfolioPageIntro
          kicker="Work"
          title="Builds."
          titleVisual={<WordRotate words={WORK_TITLE_VARIANTS} />}
        />

        <PortfolioSection spacing="stack-tight">
          <div className={sectionIntroClassName}>
            <div className={sectionHeadingClassName}>
              <h2 className={sectionTitleClassName}>Professional.</h2>
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
          <div className={sectionIntroClassName}>
            <div className={sectionHeadingClassName}>
              <h2 className={sectionTitleClassName}>Independent.</h2>
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
