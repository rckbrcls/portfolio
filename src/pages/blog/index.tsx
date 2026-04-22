import type { InferGetStaticPropsType } from "next";

import { BlogPostCard } from "@/components/blog/BlogPostCard";
import {
  PortfolioLayout,
  PortfolioPageIntro,
} from "@/components/portfolio-shell";
import { getAllBlogPosts } from "@/lib/blog";

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
      <PortfolioPageIntro kicker="Blog" title="Writing." />

      <section className="portfolio-section">
        {posts.length > 0 ? (
          <div className="portfolio-blog-grid">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
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
      </section>
    </PortfolioLayout>
  );
}
