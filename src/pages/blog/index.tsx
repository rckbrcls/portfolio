import type { InferGetStaticPropsType } from "next";

import { BlogPostCard } from "@/components/blog/BlogPostCard";
import {
  PortfolioCollection,
  PortfolioLayout,
  PortfolioPageIntro,
  PortfolioSection,
  PortfolioSectionBody,
} from "@/components/portfolio-shell";
import { MorphingText } from "@/components/ui/morphing-text";
import { getAllBlogPosts } from "@/lib/blog";

const BLOG_TITLE_VARIANTS = [
  "Writing.",
  "Notes.",
  "Essays.",
  "Posts.",
  "Journal.",
];

export async function getStaticProps() {
  return {
    props: {
      posts: getAllBlogPosts(),
    },
  };
}

export default function BlogIndexPage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PortfolioLayout
      title="Blog | rckbrcls"
      description="Writing by Erick Barcelos."
    >
      <PortfolioPageIntro
        kicker="Blog"
        title="Writing."
        titleVisual={<MorphingText texts={BLOG_TITLE_VARIANTS} />}
      />

      <PortfolioSection spacing="stack-tight">
        <PortfolioSectionBody>
          {posts.length > 0 ? (
            <PortfolioCollection className="portfolio-blog-grid">
              {posts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </PortfolioCollection>
          ) : (
            <article className="portfolio-empty-state">
              <p className="portfolio-kicker">No posts yet</p>
              <h2 className="portfolio-empty-state-title">
                The archive is ready for the first entry.
              </h2>
              <p className="portfolio-empty-state-copy">
                Publish an MDX post and it will appear here automatically.
              </p>
            </article>
          )}
        </PortfolioSectionBody>
      </PortfolioSection>
    </PortfolioLayout>
  );
}
