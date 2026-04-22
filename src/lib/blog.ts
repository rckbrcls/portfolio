import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import type { BlogPostFrontmatter, BlogPostMeta } from "@/lib/blog-shared";

const BLOG_DIRECTORY = path.join(process.cwd(), "content/blog");

function isBlogSourceFile(fileName: string) {
  return fileName.endsWith(".mdx") && !fileName.startsWith("_");
}

function assertString(value: unknown, field: string, fileName: string) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Invalid "${field}" in blog post "${fileName}".`);
  }

  return value.trim();
}

function parseBlogFrontmatter(
  fileName: string,
  frontmatter: Record<string, unknown>,
): BlogPostFrontmatter {
  const title = assertString(frontmatter.title, "title", fileName);
  const summary = assertString(frontmatter.summary, "summary", fileName);
  const publishedAt = assertString(
    frontmatter.publishedAt,
    "publishedAt",
    fileName,
  );

  if (Number.isNaN(Date.parse(publishedAt))) {
    throw new Error(`Invalid "publishedAt" date in blog post "${fileName}".`);
  }

  if (!Array.isArray(frontmatter.tags)) {
    throw new Error(`Invalid "tags" in blog post "${fileName}".`);
  }

  const tags = frontmatter.tags.map((tag) =>
    assertString(tag, "tags", fileName),
  );

  if (typeof frontmatter.draft !== "boolean") {
    throw new Error(`Invalid "draft" in blog post "${fileName}".`);
  }

  const coverImage =
    typeof frontmatter.coverImage === "string" &&
    frontmatter.coverImage.trim().length > 0
      ? frontmatter.coverImage.trim()
      : undefined;

  const parsedFrontmatter: BlogPostFrontmatter = {
    title,
    summary,
    publishedAt,
    tags,
    draft: frontmatter.draft,
  };

  if (coverImage !== undefined) {
    parsedFrontmatter.coverImage = coverImage;
  }

  return parsedFrontmatter;
}

function sortBlogPosts(posts: BlogPostMeta[]) {
  return posts.sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() -
      new Date(left.publishedAt).getTime(),
  );
}

function readBlogPostFile(fileName: string): BlogPostMeta {
  const absolutePath = path.join(BLOG_DIRECTORY, fileName);
  const source = fs.readFileSync(absolutePath, "utf8");
  const { data } = matter(source);
  const frontmatter = parseBlogFrontmatter(
    fileName,
    data as Record<string, unknown>,
  );

  return {
    slug: fileName.replace(/\.mdx$/, ""),
    ...frontmatter,
  };
}

export function getAllBlogPosts(options?: { includeDrafts?: boolean }) {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return [];
  }

  const includeDrafts = options?.includeDrafts ?? false;

  const posts = fs
    .readdirSync(BLOG_DIRECTORY)
    .filter(isBlogSourceFile)
    .map(readBlogPostFile);

  return sortBlogPosts(
    includeDrafts ? posts : posts.filter((post) => !post.draft),
  );
}

export function getLatestBlogPosts(limit = 3) {
  return getAllBlogPosts().slice(0, limit);
}

export function getBlogPostBySlug(
  slug: string,
  options?: { includeDrafts?: boolean },
) {
  const fileName = `${slug}.mdx`;
  const filePath = path.join(BLOG_DIRECTORY, fileName);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const post = readBlogPostFile(fileName);
  const includeDrafts = options?.includeDrafts ?? false;

  if (!includeDrafts && post.draft) {
    return null;
  }

  return post;
}
