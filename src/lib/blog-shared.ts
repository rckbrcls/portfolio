export type BlogPostFrontmatter = {
  title: string;
  summary: string;
  publishedAt: string;
  tags: string[];
  draft: boolean;
  coverImage?: string;
};

export type BlogPostMeta = BlogPostFrontmatter & {
  slug: string;
};

export function formatBlogDate(publishedAt: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(publishedAt));
}
