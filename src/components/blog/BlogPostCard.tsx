import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { BlogPostMeta } from "@/lib/blog-shared";
import { formatBlogDate } from "@/lib/blog-shared";

type BlogPostCardProps = {
  post: BlogPostMeta;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article>
      <Link
        href={`/blog/${post.slug}`}
        className="portfolio-blog-card portfolio-editorial-card"
      >
        <div className="portfolio-blog-card-body">
          <div className="portfolio-blog-card-meta">
            <p className="portfolio-blog-card-date">
              {formatBlogDate(post.publishedAt)}
            </p>

            <div className="portfolio-tag-list" aria-label="Post tags">
              {post.tags.map((tag) => (
                <span key={tag} className="portfolio-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="portfolio-blog-card-copy">
            <h3 className="portfolio-blog-card-title">{post.title}</h3>
            <p className="portfolio-blog-card-summary">{post.summary}</p>
          </div>

          <span className="portfolio-card-action">
            Read post
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </article>
  );
}
