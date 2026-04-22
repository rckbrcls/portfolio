import type { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import {
  PortfolioCollection,
  PortfolioLayout,
} from "@/components/portfolio-shell";
import ScaleLetterText from "@/components/ui/scale-letter-text";
import { getLatestBlogPosts } from "@/lib/blog";
import {
  featuredProjects,
  getProjectPrimaryLink,
  getProjectStackPreview,
  getProjectSummary,
  statusCopy,
} from "@/lib/portfolio-content";

export async function getStaticProps() {
  return {
    props: {
      latestPosts: getLatestBlogPosts(3),
    },
  };
}

export default function Home({
  latestPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PortfolioLayout
      title="rckbrcls | Portfolio"
      description="Personal projects, selected work, and writing by Erick Barcelos."
    >
      <section className="portfolio-section">
        <div className="portfolio-hero">
          <p className="portfolio-kicker">Software engineer</p>
          <h1 className="portfolio-hero-title">
            <ScaleLetterText text="Erick Barcelos." />
          </h1>
          <p className="portfolio-hero-summary">
            Software engineer building products, native experiences, and better
            tools. Lifelong learner.
          </p>
        </div>
      </section>

      <section className="portfolio-section">
        <div className="portfolio-section-intro">
          <div className="portfolio-section-heading">
            <h2 className="portfolio-section-title">
              <ScaleLetterText text="Personal projects." />
            </h2>
          </div>

          <Link href="/work" className="portfolio-inline-link">
            See all work
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <PortfolioCollection
          className="portfolio-preview-grid"
          showCenterCross
        >
          {featuredProjects.map((project, index) => {
            const projectLink = getProjectPrimaryLink(project);
            const cardContent = (
              <>
                <div className="portfolio-preview-top">
                  <p className="portfolio-kicker">
                    {String(index + 1).padStart(2, "0")} / {project.name}
                  </p>
                  <span className="portfolio-status">
                    {statusCopy[project.status]}
                  </span>
                </div>

                <div className="portfolio-project-copy">
                  <h3 className="portfolio-project-title">{project.name}</h3>
                  <p className="portfolio-project-summary">
                    {getProjectSummary(project)}
                  </p>
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
                    <span className="portfolio-project-placeholder">
                      No public link
                    </span>
                  )}
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
                    className="portfolio-preview-item portfolio-editorial-card"
                  >
                    {cardContent}
                  </a>
                ) : (
                  <div className="portfolio-preview-item portfolio-editorial-card">
                    {cardContent}
                  </div>
                )}
              </article>
            );
          })}
        </PortfolioCollection>
      </section>

      <section className="portfolio-section">
        <div className="portfolio-section-intro">
          <div className="portfolio-section-heading">
            <p className="portfolio-kicker">Blog</p>
            <h2 className="portfolio-section-title">
              <ScaleLetterText text="Writing." />
            </h2>
          </div>

          <Link href="/blog" className="portfolio-inline-link">
            Open archive
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {latestPosts.length > 0 ? (
          <PortfolioCollection className="portfolio-blog-grid">
            {latestPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </PortfolioCollection>
        ) : (
          <article className="portfolio-empty-state">
            <p className="portfolio-kicker">No posts yet</p>
            <h3 className="portfolio-empty-state-title">
              The writing archive is ready.
            </h3>
            <p className="portfolio-empty-state-copy">
              New posts will appear here as soon as they are published.
            </p>
          </article>
        )}
      </section>
    </PortfolioLayout>
  );
}
