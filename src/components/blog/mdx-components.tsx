import type { ComponentPropsWithoutRef } from "react";
import type { MDXComponents } from "mdx/types";

import { cn } from "@/lib/utils";

type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
};

function Figure({ src, alt, caption }: FigureProps) {
  return (
    <figure className="portfolio-prose-figure">
      <img
        src={src}
        alt={alt}
        className="portfolio-prose-image"
        loading="lazy"
      />
      {caption ? (
        <figcaption className="portfolio-prose-caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

function Code({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"code">) {
  const isBlockCode = Boolean(className);

  return (
    <code
      className={cn(
        isBlockCode
          ? "portfolio-prose-code-block"
          : "portfolio-prose-code-inline",
        className,
      )}
      {...props}
    >
      {children}
    </code>
  );
}

export const blogMdxComponents: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1 className={cn("portfolio-prose-h1", className)} {...props} />
  ),
  h2: ({ className, ...props }) => (
    <h2 className={cn("portfolio-prose-h2", className)} {...props} />
  ),
  h3: ({ className, ...props }) => (
    <h3 className={cn("portfolio-prose-h3", className)} {...props} />
  ),
  h4: ({ className, ...props }) => (
    <h4 className={cn("portfolio-prose-h4", className)} {...props} />
  ),
  p: ({ className, ...props }) => (
    <p className={cn("portfolio-prose-paragraph", className)} {...props} />
  ),
  a: ({ className, href, ...props }) => {
    const isExternal = typeof href === "string" && /^https?:\/\//.test(href);

    return (
      <a
        href={href}
        className={cn("portfolio-prose-link", className)}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer noopener" : undefined}
        {...props}
      />
    );
  },
  ul: ({ className, ...props }) => (
    <ul className={cn("portfolio-prose-list", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        "portfolio-prose-list portfolio-prose-list-ordered",
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("portfolio-prose-list-item", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn("portfolio-prose-blockquote", className)}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre className={cn("portfolio-prose-pre", className)} {...props} />
  ),
  code: Code,
  hr: ({ className, ...props }) => (
    <hr className={cn("portfolio-prose-divider", className)} {...props} />
  ),
  strong: ({ className, ...props }) => (
    <strong className={cn("portfolio-prose-strong", className)} {...props} />
  ),
  em: ({ className, ...props }) => (
    <em className={cn("portfolio-prose-emphasis", className)} {...props} />
  ),
  table: ({ className, ...props }) => (
    <div className="portfolio-prose-table-wrap">
      <table className={cn("portfolio-prose-table", className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th className={cn("portfolio-prose-table-head", className)} {...props} />
  ),
  td: ({ className, ...props }) => (
    <td className={cn("portfolio-prose-table-cell", className)} {...props} />
  ),
  img: ({ className, alt = "", ...props }) => (
    <img
      alt={alt}
      className={cn("portfolio-prose-image", className)}
      loading="lazy"
      {...props}
    />
  ),
  Figure,
};
