# Architecture

## Overview

`portfolio` is a Next.js Pages Router site with local MDX content, structured project data, and a custom visual direction documented in `DESIGN.md`.

## Components

- `src/pages/`: Pages Router routes and document root.
- `src/components/`: portfolio, blog, work, project, and UI components.
- `src/lib/`: blog parsing, content helpers, and utilities.
- `content/blog/`: local MDX posts.
- `data/`: projects, tech stack, and professional work.
- `public/`: images, animations, and project assets.

## Data Flow

1. Local data files define projects, experience, and tech stack.
2. MDX content under `content/blog/` is parsed by helpers in `src/lib/`.
3. Pages compose reusable components into the public site.

## Trade-offs

- Local-first content avoids a CMS and keeps writing versioned with the site.
- Project claims require manual review when the underlying repositories change.
