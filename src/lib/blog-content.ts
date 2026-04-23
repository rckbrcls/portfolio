import type { ComponentType } from "react";

const blogPostContext = (require as NodeRequire).context(
  "../../content/blog",
  false,
  /\.mdx$/,
);

type BlogPostModule = {
  default: ComponentType<Record<string, unknown>>;
};

const blogPostModules = new Map<string, BlogPostModule>();

for (const key of blogPostContext.keys()) {
  if (key.startsWith("./_")) {
    continue;
  }

  const slug = key.replace(/^\.\//, "").replace(/\.mdx$/, "");
  blogPostModules.set(slug, blogPostContext<BlogPostModule>(key));
}

export function getBlogPostComponent(slug: string) {
  return blogPostModules.get(slug)?.default ?? null;
}
