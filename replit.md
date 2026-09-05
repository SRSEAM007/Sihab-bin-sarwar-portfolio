# Sihab Bin Sarwar Portfolio

A static React/Vite portfolio and research notebook for Sihab Bin Sarwar, focused on data science, machine learning, software engineering, and technical writing.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- `pnpm --filter @workspace/sihab-portfolio run build` — build the portfolio for static hosting

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/sihab-portfolio/src/App.tsx` — route map and page composition
- `artifacts/sihab-portfolio/src/data/profile.js` — personal details, education, and skills
- `artifacts/sihab-portfolio/src/data/projects.js` — project cards and detail content
- `artifacts/sihab-portfolio/src/data/research.js` — research cards and paper explanations
- `artifacts/sihab-portfolio/src/content/blog.js` — editable technical notes
- `artifacts/sihab-portfolio/public/` — resume, favicon, sitemap, robots, and static-host redirects
- `artifacts/sihab-portfolio/README.md` — local setup, customization, GitHub, Vercel, and Cloudflare instructions

## Architecture decisions

- The portfolio is frontend-only and intentionally has no database, authentication, or runtime API.
- Content is separated from page layout so profile, project, research, and notes updates do not require changing UI components.
- Wouter handles client-side routes, while `vercel.json` and `public/_redirects` make deep links work on static hosts.
- The contact form accepts an optional `VITE_FORM_ENDPOINT`; without it, it validates locally and explains the deployment step.

## Product

Visitors can browse Sihab's selected projects, read project case studies and research notes, explore technical blog posts, view education and skills, download a resume, and start a contact conversation.

## User preferences

- Keep the site easy to maintain and free to host.
- Explain the deployment process after the build is complete.

## Gotchas

- Replit injects `PORT` and `BASE_PATH` for the preview; static hosting uses safe Vite defaults for those values.
- Replace the placeholder `public/resume.pdf` and `your-domain.example` values in `public/sitemap.xml` before publishing.
- The content is intentionally editable placeholder content and should be replaced with verified personal details before going live.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
