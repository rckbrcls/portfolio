import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { BlogPostMeta } from "@/lib/blog-shared";
import { formatBlogDate } from "@/lib/blog-shared";

type BlogPostCardProps = {
  post: BlogPostMeta;
};

const editorialCardClassName =
  "group grid h-full min-h-0 content-start gap-portfolio-md border border-portfolio-border bg-portfolio-surface p-portfolio-lg text-inherit no-underline shadow-portfolio-card transition-[transform,border-color,box-shadow,background-color,color] duration-300 ease-portfolio hover:z-[1] hover:-translate-y-[3px] hover:scale-[1.01] hover:border-portfolio-accent-border hover:bg-portfolio-highlight hover:shadow-portfolio-card-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent";

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article>
      <Link
        data-portfolio-card-surface=""
        href={`/blog/${post.slug}`}
        className={editorialCardClassName}
      >
        <div className="grid gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="m-0 font-mono text-[0.72rem] font-semibold uppercase leading-[1.2] tracking-normal text-portfolio-secondary">
              {formatBlogDate(post.publishedAt)}
            </p>

            <div className="flex flex-wrap gap-2" aria-label="Post tags">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center border border-portfolio-border bg-portfolio-surface-alt px-[0.7rem] py-[0.42rem] font-mono text-[0.68rem] font-semibold uppercase leading-none tracking-normal text-portfolio-secondary transition-colors duration-200 ease-portfolio group-hover:border-portfolio-accent-border group-hover:bg-portfolio-highlight group-hover:text-portfolio-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            <h3 className="m-0 text-[1.65rem] font-semibold leading-[1.02] tracking-normal text-portfolio-primary group-hover:text-portfolio-accent md:text-2xl">
              {post.title}
            </h3>
            <p className="m-0 text-[0.96rem] leading-[1.7] text-portfolio-secondary">
              {post.summary}
            </p>
          </div>

          <span className="inline-flex items-center gap-[0.55rem] font-mono text-[0.8125rem] font-semibold uppercase leading-[1.1] tracking-normal text-portfolio-primary transition-[color,transform] duration-300 ease-portfolio group-hover:text-portfolio-accent">
            Read post
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-portfolio group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}
