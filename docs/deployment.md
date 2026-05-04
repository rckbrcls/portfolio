# Deployment

This project is a Next.js portfolio with Vercel-oriented configuration. The current repository does not contain Docker files, GitHub Actions, a custom server, infrastructure code, database migrations, or a documented release script.

## Deployment Target

The codebase contains Vercel-specific signals:

- `vercel.json` exists.
- `@vercel/analytics` is mounted in `src/pages/_app.tsx`.
- `@vercel/speed-insights` is mounted in `src/pages/_app.tsx`.

The exact production deployment process is not fully identified in the current codebase.

## Vercel Configuration

`vercel.json` currently contains:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "git": {
    "deploymentEnabled": false
  }
}
```

This means Git deployments are disabled by the repository configuration. If production is hosted on Vercel, deployments are likely triggered manually, through the Vercel dashboard, or through another workflow not present in this repository.

## Build Process

The production build command defined in `package.json` is:

```bash
pnpm build
```

This runs `next build`.

The local production server command is:

```bash
pnpm start
```

This runs `next start` after a successful build.

Agent note: repository instructions currently forbid running `build`, `dev`, or `start` commands in this environment. These commands are documented because they are part of the project scripts.

## Environment Variables

Only one environment variable was identified:

| Variable | Required | Purpose |
| --- | --- | --- |
| `ANALYZE` | No | Enables the bundle analyzer when set to `true`. |

`.env.example` currently contains:

```bash
ANALYZE=false
```

No required production secrets were identified in the current codebase.

## Bundle Analysis

`next.config.mjs` enables `@next/bundle-analyzer` when `ANALYZE === "true"`.

The script currently defined in `package.json` is:

```bash
pnpm build:analyze
```

Note: the script delegates internally to `npm run build` in the current `package.json`.

## Pre-Deployment Checklist

- Confirm `pnpm install` has completed successfully.
- Confirm required content is published with `draft: false` in `content/blog/*.mdx`.
- Confirm project and work links in `data/projects/projects.ts` and `data/work/professional-work.ts` are public-safe and current.
- Confirm `.env` values match `.env.example`; no required secrets are currently identified.
- Confirm whether Git deployments should remain disabled in `vercel.json`.
- Run the project checks allowed by the current workflow before release.

## Rollback

No rollback process is documented in the current codebase.

For Vercel-hosted deployments, rollback is typically handled by promoting or restoring a previous deployment in Vercel. TODO: not identified in the current codebase.
