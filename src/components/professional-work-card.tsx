import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { IProfessionalWorkItem } from "@/interface/IProfessionalWorkItem";

interface ProfessionalWorkPreviewCardProps {
  item: IProfessionalWorkItem;
  index: number;
}

interface ProfessionalWorkCardProps {
  item: IProfessionalWorkItem;
  index: number;
}

function PreviewCardFrame({
  item,
  index,
}: ProfessionalWorkPreviewCardProps) {
  const previewNumber = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={item.href ?? "/work"}
      className="portfolio-preview-item portfolio-editorial-card"
    >
      <div className="portfolio-preview-top">
        <p className="portfolio-kicker">{previewNumber} / Work</p>
        <span className="portfolio-professional-work-company">
          {item.company}
        </span>
      </div>

      <div className="portfolio-project-copy">
        <h3 className="portfolio-project-title">{item.name}</h3>
        <p className="portfolio-project-summary">{item.description}</p>
      </div>

      <div className="portfolio-preview-meta">
        <p className="portfolio-project-stack">{item.meta}</p>
        <span className="portfolio-card-action">
          Open work
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

export function ProfessionalWorkPreviewCard(
  props: ProfessionalWorkPreviewCardProps,
) {
  return (
    <article>
      <PreviewCardFrame {...props} />
    </article>
  );
}

export function ProfessionalWorkCard({
  item,
  index,
}: ProfessionalWorkCardProps) {
  const previewNumber = String(index + 1).padStart(2, "0");

  return (
    <article>
      <div className="portfolio-project-item portfolio-editorial-card">
        <div className="portfolio-project-item-header">
          <p className="portfolio-kicker">{previewNumber} / Work</p>
          <span className="portfolio-professional-work-company">
            {item.company}
          </span>
        </div>

        <div className="portfolio-professional-work-item-body">
          <div className="portfolio-project-item-main">
            <h2 className="portfolio-project-title">{item.name}</h2>
            <p className="portfolio-project-summary">{item.description}</p>
          </div>

          <p className="portfolio-project-stack">{item.meta}</p>
        </div>
      </div>
    </article>
  );
}
