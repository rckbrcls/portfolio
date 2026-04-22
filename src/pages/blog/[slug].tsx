import type { GetStaticPaths, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { blogMdxComponents } from "@/components/blog/mdx-components";
import {
  PortfolioLayout,
  PortfolioSection,
} from "@/components/portfolio-shell";
import ScaleLetterText from "@/components/ui/scale-letter-text";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { getBlogPostComponent } from "@/lib/blog-content";
import { formatBlogDate } from "@/lib/blog-shared";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllBlogPosts();

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
};

export async function getStaticProps({
  params,
}: {
  params?: { slug?: string | string[] };
}) {
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
}

export default function BlogPostPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Content = getBlogPostComponent(post.slug);

  return (
    <PortfolioLayout
      title={`${post.title} | rckbrcls`}
      description={post.summary}
    >
      <PortfolioSection spacing="page-start">
        <div className="portfolio-article-layout">
          <header className="portfolio-article-header">
            <p className="portfolio-kicker">Blog post</p>
            <h1 className="portfolio-article-title">
              <ScaleLetterText text={post.title} />
            </h1>
            <p className="portfolio-article-summary">{post.summary}</p>

            <div className="portfolio-article-meta">
              <span className="portfolio-blog-card-date">
                {formatBlogDate(post.publishedAt)}
              </span>

              <div className="portfolio-tag-list" aria-label="Post tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="portfolio-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Link href="/blog" className="portfolio-inline-link">
              Back to blog
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </header>

          {post.coverImage ? (
            <div className="portfolio-article-cover">
              <img
                src={post.coverImage}
                alt={`${post.title} cover image`}
                className="portfolio-article-cover-image"
              />
            </div>
          ) : null}

          {Content ? (
            <article className="portfolio-prose">
              <Content components={blogMdxComponents} />
            </article>
          ) : (
            <article className="portfolio-empty-state">
              <p className="portfolio-kicker">Content unavailable</p>
              <h2 className="portfolio-empty-state-title">
                The post metadata exists, but the content module could not be
                loaded.
              </h2>
            </article>
          )}
        </div>
      </PortfolioSection>
    </PortfolioLayout>
  );
}
