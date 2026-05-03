# Portfolio

> **Status:** Active
> This project is currently maintained as Erick Barcelos' personal portfolio and blog.

Personal portfolio and blog for Erick Barcelos. The site presents professional work, independent projects, writing, and a custom visual system for a quieter product-focused portfolio.

## Summary

- Personal Next.js portfolio and local-first MDX blog for Erick Barcelos.
- Solves professional presentation for work, independent projects, experience, writing, and a custom restrained visual system.
- Main stack: Next.js Pages Router, React, TypeScript, MDX, local data files, custom components, and `DESIGN.md`.
- Current status: active personal site; sibling checkout `portfolio` has the same product direction.
- Technical value: combines static project data, local blog parsing, project/work pages, and browser translation hardening.

## Overview

`portfolio` is a Next.js Pages Router site. It combines a curated work index, independent project cards, professional experience, and local MDX blog content.

## Motivation

- Present Erick Barcelos' work in a way that is specific, useful, and not template-like.
- Keep independent projects and professional work easy to scan.
- Publish writing locally through MDX without requiring a CMS.
- Preserve a strong but restrained design direction documented in `DESIGN.md`.

## Features

- Home page with hero, professional work preview, independent projects, and latest posts.
- Work page for broader work/project navigation.
- Blog content under `content/blog`.
- Project and professional-work data under `data/`.

## Project Structure

```text
portfolio/
├── content/blog/  # Local MDX posts
├── data/          # Projects, tech stack, and professional work data
├── public/        # Images, animations, and project assets
├── src/pages/     # Pages Router routes and document root
├── src/components/# Portfolio, blog, project, work, and UI components
├── src/lib/       # Blog parsing, content helpers, and utilities
├── DESIGN.md
└── package.json
```

## Current Status

The repository is a working personal site. There is a sibling checkout named `portfolio` with the same product direction and a different GitHub remote.

## Known Limitations

- Follow `DESIGN.md` for visual decisions.
- Keep browser translation hardening in the document root.
- Keep blog content local-first unless a new publishing workflow is explicitly introduced.
