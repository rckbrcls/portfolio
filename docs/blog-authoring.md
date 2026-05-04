# Blog Authoring

The blog is local-first. Posts are versioned with the repository as MDX files under `content/blog/*.mdx`.

## How The Blog Loader Works

- `src/lib/blog.ts` reads files from `content/blog`.
- Only `.mdx` files are considered.
- Files whose names start with `_` are ignored.
- `content/blog/_template.mdx` is a template and does not become a public post.
- Public routes filter out posts with `draft: true`.
- Posts are sorted by `publishedAt` in descending order.
- `/blog/[slug]` uses the file name as the slug.

For example:

```text
content/blog/vibe-coding-and-side-project-problem.mdx
```

becomes:

```text
/blog/vibe-coding-and-side-project-problem
```

## Required Frontmatter

Every public post must include:

```yaml
---
title: "Post title"
summary: "One clear sentence explaining what the post is about."
publishedAt: "2026-04-22"
tags:
  - Engineering
  - Writing
draft: false
---
```

Field rules enforced by `src/lib/blog.ts`:

| Field | Type | Notes |
| --- | --- | --- |
| `title` | string | Required and cannot be empty. |
| `summary` | string | Required and cannot be empty. |
| `publishedAt` | string | Required and must parse as a valid date. |
| `tags` | string array | Required. Each tag must be a non-empty string. |
| `draft` | boolean | Required. Use `true` to keep a post out of public routes. |

## Optional Frontmatter

`coverImage` is optional:

```yaml
coverImage: "/images/blog/my-post/cover.svg"
```

When present, it should point to an asset under `public/`. For blog-specific images, prefer:

```text
public/images/blog/<post-slug>/
```

## Basic Writing

Normal Markdown works inside MDX:

```mdx
## Section heading

This is a paragraph with **strong text** and _emphasis_.

- One point
- Another point
- A final detail
```

## Links

Use regular Markdown links:

```mdx
[Visit the project](https://example.com)
```

External HTTP links automatically open in a new tab through the custom MDX anchor renderer in `src/components/blog/mdx-components.tsx`.

## Images

Use standard Markdown images for simple images:

```mdx
![Architecture diagram](/images/blog/my-post/diagram.svg)
```

The path starts at `public/`, so the file should exist at:

```text
public/images/blog/my-post/diagram.svg
```

## Captioned Figures

Use the custom `<Figure />` component when an image needs a caption:

```mdx
<Figure
  src="/images/blog/my-post/cover.svg"
  alt="Diagram showing the content pipeline."
  caption="Local MDX files are parsed into static blog pages."
/>
```

`Figure` is registered in `src/components/blog/mdx-components.tsx`.

## Code Blocks

Use fenced code blocks with a language label:

````mdx
```ts
export function getPostUrl(slug: string) {
  return `/blog/${slug}`;
}
```
````

Inline code also works:

```mdx
The parser lives in `src/lib/blog.ts`.
```

## Tables

Tables are supported through `remark-gfm`:

```mdx
| Field | Required |
| --- | --- |
| title | Yes |
| coverImage | No |
```

## Math

Inline math is supported:

```mdx
The famous identity is $E = mc^2$.
```

Display math is also supported:

```mdx
$$
\sum_{i=1}^{n} i = \frac{n(n + 1)}{2}
$$
```

Math rendering depends on:

- `remark-math` and `rehype-katex` in `next.config.mjs`;
- `katex/dist/katex.min.css` imported in `src/pages/_app.tsx`.

## Publishing Checklist

1. Create a new `.mdx` file in `content/blog/`.
2. Use a lowercase, URL-friendly file name because it becomes the route slug.
3. Copy the frontmatter shape from `content/blog/_template.mdx`.
4. Keep `draft: true` while drafting.
5. Store post images under `public/images/blog/<post-slug>/`.
6. Set `draft: false` when the post should appear on `/blog` and the home page latest-posts section.
7. Check that all image paths and links are valid.

## Current Limitations

- There is no CMS.
- There is no admin UI.
- There is no draft preview route.
- There is no email or feed notification workflow identified in the current codebase.
- Publishing requires changing repository content.
