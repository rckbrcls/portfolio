import type { InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { FeaturedProjectCard } from "@/components/featured-project-card";
import { ProfessionalWorkPreviewCard } from "@/components/professional-work-card";
import {
  PortfolioCollection,
  PortfolioLayout,
  PortfolioSection,
  PortfolioSectionBody,
} from "@/components/portfolio-shell";
import ScaleLetterText from "@/components/ui/scale-letter-text";
import { getLatestBlogPosts } from "@/lib/blog";
import {
  featuredProfessionalWork,
  featuredProjects,
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
      description="Professional work, independent projects, and writing by Erick Barcelos."
    >
      <div className="portfolio-home portfolio-editorial-stack">
        <PortfolioSection spacing="page-start">
          <div className="portfolio-hero">
            <div className="portfolio-hero-copy">
              <h1 className="portfolio-hero-title">
                <ScaleLetterText text="Erick Barcelos." />
              </h1>
              <p className="portfolio-hero-summary">
                Software engineer building products, experiences, and better
                tools. Lifelong learner.
              </p>
            </div>

            <div className="portfolio-hero-media">
              <Image
                src="/images/turing.png"
                alt="Portrait illustration of Erick Barcelos"
                width={1019}
                height={917}
                priority
                sizes="(min-width: 1200px) 384px, (min-width: 901px) 32vw, (min-width: 769px) 300px, 72vw"
                className="portfolio-hero-image"
              />
            </div>
          </div>
        </PortfolioSection>

        {featuredProfessionalWork.length > 0 ? (
          <PortfolioSection spacing="stack-loose">
            <div className="portfolio-section-intro">
              <div className="portfolio-section-heading">
                <p className="portfolio-kicker">Work</p>
                <h2 className="portfolio-section-title">Professional.</h2>
              </div>

              <Link href="/work" className="portfolio-inline-link">
                See all work
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <PortfolioSectionBody>
              <PortfolioCollection columns={2}>
                {featuredProfessionalWork.map((item, index) => (
                  <ProfessionalWorkPreviewCard
                    key={item.slug}
                    item={item}
                    index={index}
                  />
                ))}
              </PortfolioCollection>
            </PortfolioSectionBody>
          </PortfolioSection>
        ) : null}

        <PortfolioSection spacing="stack-loose">
          <div className="portfolio-section-intro">
            <div className="portfolio-section-heading">
              <p className="portfolio-kicker">Work</p>
              <h2 className="portfolio-section-title">Independent.</h2>
            </div>

            <Link href="/work" className="portfolio-inline-link">
              See all work
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <PortfolioSectionBody>
            <PortfolioCollection columns={2}>
              {featuredProjects.map((project, index) => (
                <FeaturedProjectCard
                  key={project.slug}
                  project={project}
                  index={index}
                />
              ))}
            </PortfolioCollection>
          </PortfolioSectionBody>
        </PortfolioSection>

        <PortfolioSection spacing="stack-loose">
          <div className="portfolio-section-intro">
            <div className="portfolio-section-heading">
              <p className="portfolio-kicker">Blog</p>
              <h2 className="portfolio-section-title">Writing.</h2>
            </div>

            <Link href="/blog" className="portfolio-inline-link">
              See all posts
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <PortfolioSectionBody>
            {latestPosts.length > 0 ? (
              <PortfolioCollection columns={1}>
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
          </PortfolioSectionBody>
        </PortfolioSection>
      </div>
    </PortfolioLayout>
  );
}
