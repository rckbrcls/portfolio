import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IProject } from "@/interface/IProject";
import {
  getProjectPrimaryLink,
  getProjectStackPreview,
  getProjectSummary,
} from "@/lib/portfolio-content";
import { getWorkCategoryLabel } from "@/lib/work-category";

interface FeaturedProjectCardProps {
  project: IProject;
  index: number;
}

interface WorkProjectCardProps {
  project: IProject;
  index: number;
}

interface ProjectCardFrameProps {
  project: IProject;
  projectLink: ProjectPrimaryLink;
  cardClassName: string;
  previewLabel: string;
  children: ReactNode;
}

type ProjectPrimaryLink = ReturnType<typeof getProjectPrimaryLink>;

const PREVIEW_DELAY_MS = 200;
const PREVIEW_GUTTER_PX = 24;
const PREVIEW_OFFSET_X_PX = 28;
const PREVIEW_OFFSET_Y_PX = 20;
const PREVIEW_LERP = 0.16;
const DEFAULT_PREVIEW_WIDTH_PX = 272;
const DEFAULT_PREVIEW_HEIGHT_PX = 220;
const DESKTOP_PREVIEW_MIN_WIDTH_PX = 1080;

type PreviewHorizontalSide = "left" | "right";
type PreviewVerticalSide = "top" | "bottom";

function ProjectCardFrame({
  project,
  projectLink,
  cardClassName,
  previewLabel,
  children,
}: ProjectCardFrameProps) {
  const iframePreviewHref =
    project.previewMode === "iframe" && typeof project.link === "string"
      ? project.link
      : null;
  const showsIframePreview = Boolean(iframePreviewHref);
  const hasPreview = Boolean(project.coverImage) || showsIframePreview;
  const isLogoPreview =
    typeof project.coverImage === "string" &&
    project.coverImage.toLowerCase().endsWith(".svg");
  const previewRef = useRef<HTMLDivElement | null>(null);
  const revealTimeoutRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const previewSizeRef = useRef({
    width: DEFAULT_PREVIEW_WIDTH_PX,
    height: DEFAULT_PREVIEW_HEIGHT_PX,
  });
  const currentPositionRef = useRef({
    x: PREVIEW_GUTTER_PX,
    y: PREVIEW_GUTTER_PX,
  });
  const targetPositionRef = useRef({
    x: PREVIEW_GUTTER_PX,
    y: PREVIEW_GUTTER_PX,
  });
  const orientationRef = useRef<{
    horizontal: PreviewHorizontalSide;
    vertical: PreviewVerticalSide;
  }>({
    horizontal: "right",
    vertical: "bottom",
  });
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const isPointerInsideRef = useRef(false);
  const reduceMotionRef = useRef(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  function cancelRevealTimeout() {
    if (revealTimeoutRef.current !== null) {
      window.clearTimeout(revealTimeoutRef.current);
      revealTimeoutRef.current = null;
    }
  }

  function stopAnimationFrame() {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }

  function canUseFloatingPreview() {
    if (typeof window === "undefined") {
      return false;
    }

    return (
      window.innerWidth >= DESKTOP_PREVIEW_MIN_WIDTH_PX &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    );
  }

  function measurePreviewSize() {
    const previewElement = previewRef.current;

    if (!previewElement) {
      return previewSizeRef.current;
    }

    const { width, height } = previewElement.getBoundingClientRect();

    if (width > 0 && height > 0) {
      previewSizeRef.current = { width, height };
    }

    return previewSizeRef.current;
  }

  function applyPreviewPosition(
    x: number,
    y: number,
    horizontal: PreviewHorizontalSide,
    vertical: PreviewVerticalSide,
  ) {
    const previewElement = previewRef.current;

    if (!previewElement) {
      return;
    }

    previewElement.style.setProperty("--portfolio-preview-x", `${x}px`);
    previewElement.style.setProperty("--portfolio-preview-y", `${y}px`);
    previewElement.dataset.horizontal = horizontal;
    previewElement.dataset.vertical = vertical;
  }

  function updateTargetPosition(clientX: number, clientY: number) {
    if (typeof window === "undefined") {
      return;
    }

    lastPointerRef.current = { x: clientX, y: clientY };

    const { width, height } = measurePreviewSize();
    const maxX = Math.max(
      PREVIEW_GUTTER_PX,
      window.innerWidth - width - PREVIEW_GUTTER_PX,
    );
    const maxY = Math.max(
      PREVIEW_GUTTER_PX,
      window.innerHeight - height - PREVIEW_GUTTER_PX,
    );

    let nextX = clientX + PREVIEW_OFFSET_X_PX;
    let nextY = clientY + PREVIEW_OFFSET_Y_PX;

    if (nextX + width + PREVIEW_GUTTER_PX > window.innerWidth) {
      nextX = clientX - width - PREVIEW_OFFSET_X_PX;
    }

    if (nextY + height + PREVIEW_GUTTER_PX > window.innerHeight) {
      nextY = clientY - height - PREVIEW_OFFSET_Y_PX;
    }

    nextX = Math.min(Math.max(nextX, PREVIEW_GUTTER_PX), maxX);
    nextY = Math.min(Math.max(nextY, PREVIEW_GUTTER_PX), maxY);

    const horizontal: PreviewHorizontalSide =
      nextX < clientX ? "left" : "right";
    const vertical: PreviewVerticalSide = nextY < clientY ? "top" : "bottom";

    targetPositionRef.current = { x: nextX, y: nextY };
    orientationRef.current = { horizontal, vertical };

    if (reduceMotionRef.current) {
      currentPositionRef.current = { x: nextX, y: nextY };
      applyPreviewPosition(nextX, nextY, horizontal, vertical);
    }
  }

  function animatePreview() {
    const { x: currentX, y: currentY } = currentPositionRef.current;
    const { x: targetX, y: targetY } = targetPositionRef.current;
    const nextX = currentX + (targetX - currentX) * PREVIEW_LERP;
    const nextY = currentY + (targetY - currentY) * PREVIEW_LERP;
    const { horizontal, vertical } = orientationRef.current;

    currentPositionRef.current = { x: nextX, y: nextY };
    applyPreviewPosition(nextX, nextY, horizontal, vertical);

    const isSettled =
      Math.abs(targetX - nextX) < 0.35 && Math.abs(targetY - nextY) < 0.35;

    if (isSettled) {
      animationFrameRef.current = null;
      return;
    }

    animationFrameRef.current = window.requestAnimationFrame(animatePreview);
  }

  function ensureAnimationFrame() {
    if (reduceMotionRef.current || animationFrameRef.current !== null) {
      return;
    }

    animationFrameRef.current = window.requestAnimationFrame(animatePreview);
  }

  function hidePreview() {
    cancelRevealTimeout();
    isPointerInsideRef.current = false;
    setIsPreviewVisible(false);
    stopAnimationFrame();
  }

  function handlePointerEnter(event: ReactPointerEvent<HTMLElement>) {
    if (!hasPreview || !canUseFloatingPreview()) {
      return;
    }

    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    isPointerInsideRef.current = true;

    updateTargetPosition(event.clientX, event.clientY);
    currentPositionRef.current = { ...targetPositionRef.current };
    applyPreviewPosition(
      currentPositionRef.current.x,
      currentPositionRef.current.y,
      orientationRef.current.horizontal,
      orientationRef.current.vertical,
    );

    cancelRevealTimeout();
    revealTimeoutRef.current = window.setTimeout(() => {
      if (!isPointerInsideRef.current) {
        return;
      }

      measurePreviewSize();
      updateTargetPosition(lastPointerRef.current.x, lastPointerRef.current.y);
      setIsPreviewVisible(true);
      ensureAnimationFrame();
    }, PREVIEW_DELAY_MS);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (!hasPreview || !canUseFloatingPreview()) {
      return;
    }

    updateTargetPosition(event.clientX, event.clientY);
    ensureAnimationFrame();
  }

  useEffect(() => {
    return () => {
      cancelRevealTimeout();
      stopAnimationFrame();
    };
  }, []);

  return (
    <article
      className="portfolio-featured-project-card-shell"
      onPointerEnter={hasPreview ? handlePointerEnter : undefined}
      onPointerMove={hasPreview ? handlePointerMove : undefined}
      onPointerLeave={hasPreview ? hidePreview : undefined}
      onPointerCancel={hasPreview ? hidePreview : undefined}
    >
      {projectLink ? (
        <a
          href={projectLink.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(cardClassName, "portfolio-editorial-card")}
        >
          {children}
        </a>
      ) : (
        <div className={cn(cardClassName, "portfolio-editorial-card")}>
          {children}
        </div>
      )}

      {hasPreview ? (
        <div
          ref={previewRef}
          aria-hidden="true"
          className={cn(
            "portfolio-project-preview-popover",
            isPreviewVisible && "portfolio-project-preview-popover--visible",
            isLogoPreview &&
              !showsIframePreview &&
              "portfolio-project-preview-popover--logo",
          )}
        >
          <div
            className={cn(
              "portfolio-project-preview-media",
              showsIframePreview && "portfolio-project-preview-media--iframe",
            )}
          >
            {showsIframePreview && isPreviewVisible ? (
              <iframe
                aria-hidden="true"
                className="portfolio-project-preview-iframe"
                src={iframePreviewHref ?? undefined}
                tabIndex={-1}
                title={`${project.name} preview`}
                loading="eager"
                scrolling="no"
              />
            ) : null}

            {!showsIframePreview && project.coverImage ? (
              <Image
                src={project.coverImage}
                alt=""
                fill
                sizes="288px"
                className="portfolio-project-preview-image"
              />
            ) : null}
          </div>
          <div className="portfolio-project-preview-footer">
            <span className="portfolio-project-preview-label">Preview</span>
            <span className="portfolio-project-preview-name">
              {previewLabel}
            </span>
          </div>
        </div>
      ) : null}
    </article>
  );
}

export function FeaturedProjectCard({
  project,
  index,
}: FeaturedProjectCardProps) {
  const projectLink = getProjectPrimaryLink(project);
  const previewNumber = String(index + 1).padStart(2, "0");
  const categoryLabel = getWorkCategoryLabel(project.workCategory);
  const cardContent = (
    <>
      <div className="portfolio-preview-top">
        <p className="portfolio-kicker">
          {previewNumber} / {categoryLabel}
        </p>
      </div>

      <div className="portfolio-project-copy">
        <h3 className="portfolio-project-title">{project.name}</h3>
        <p className="portfolio-project-summary">{getProjectSummary(project)}</p>
      </div>

      <div className="portfolio-preview-meta">
        <p className="portfolio-project-stack">
          {getProjectStackPreview(project)}
        </p>

        {projectLink ? (
          <span className="portfolio-card-action">
            {projectLink.label}
            <ArrowUpRight className="h-4 w-4" />
          </span>
        ) : (
          <span className="portfolio-project-placeholder">No public link</span>
        )}
      </div>
    </>
  );

  return (
    <ProjectCardFrame
      project={project}
      projectLink={projectLink}
      cardClassName="portfolio-preview-item"
      previewLabel={`${previewNumber} / ${project.name}`}
    >
      {cardContent}
    </ProjectCardFrame>
  );
}

export function WorkProjectCard({ project, index }: WorkProjectCardProps) {
  const projectLink = getProjectPrimaryLink(project);
  const previewNumber = String(index + 1).padStart(2, "0");
  const categoryLabel = getWorkCategoryLabel(project.workCategory);
  const cardContent = (
    <>
      <div className="portfolio-project-item-header">
        <p className="portfolio-kicker">
          {previewNumber} / {categoryLabel}
        </p>
      </div>

      <div className="portfolio-project-item-body">
        <div className="portfolio-project-item-main">
          <h2 className="portfolio-project-title">{project.name}</h2>
          <p className="portfolio-project-summary">{getProjectSummary(project)}</p>
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
            <span className="portfolio-project-placeholder">No public link</span>
          )}
        </div>
      </div>
    </>
  );

  return (
    <ProjectCardFrame
      project={project}
      projectLink={projectLink}
      cardClassName="portfolio-project-item"
      previewLabel={`${previewNumber} / ${project.name}`}
    >
      {cardContent}
    </ProjectCardFrame>
  );
}
