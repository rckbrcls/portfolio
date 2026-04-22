import type { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { PortfolioLayout } from "@/components/portfolio-shell";
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
            Selected product, native, and tooling work.
          </h1>
          <div className="portfolio-hero-foot">
            <Link href="/work" className="portfolio-button">
              View selected work
            </Link>
          </div>
        </div>
      </section>

      <section className="portfolio-section">
        <div className="portfolio-section-intro">
          <div className="portfolio-section-heading">
            <h2 className="portfolio-section-title">Personal projects.</h2>
          </div>

          <Link href="/work" className="portfolio-inline-link">
            See all work
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="portfolio-preview-grid">
          {featuredProjects.map((project, index) => {
            const projectLink = getProjectPrimaryLink(project);

            return (
              <article key={project.slug} className="portfolio-preview-item">
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
              </article>
            );
          })}
        </div>
      </section>

      <section className="portfolio-section">
        <div className="portfolio-section-intro">
          <div className="portfolio-section-heading">
            <p className="portfolio-kicker">Blog</p>
            <h2 className="portfolio-section-title">Writing.</h2>
          </div>

          <Link href="/blog" className="portfolio-inline-link">
            Open archive
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {latestPosts.length > 0 ? (
          <div className="portfolio-blog-grid">
            {latestPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
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
