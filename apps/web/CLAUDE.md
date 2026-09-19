# apps/web content map

All content is hardcoded in code — Payload CMS (`apps/cms`) was removed.
Content lives directly in JSX or in a sibling `data.ts`/`data/*.ts` file next
to the components. No CMS round-trip, no cache to bust — edit, save, the dev
server hot-reloads.

| Route | Page file | Copy/data lives in |
|---|---|---|
| `/` | `app/page.tsx` | Inline arrays in `page.tsx` (slides, paths, differentiators) + `components/home/components/*` |
| `/about` | `app/about/page.tsx` | `components/about/data/partners.ts`, `components/about/data/testimonials.ts`, rest inline in `components/about/components/*` |
| `/organisation` | `app/organisation/page.tsx` | Inline in `components/organisation/components/*` (no separate data file) |
| `/roi` | `app/roi/page.tsx` | `components/roi/data.ts` (all stats/case studies), `components/roi/types.ts` |
| `/leaders` | `app/leaders/page.tsx` | `components/leaders/data/cohortData.ts`, rest inline in `components/leaders/components/*` |
| `/resources` | `app/resources/page.tsx` | `components/resources/data/resources.ts` (every resource card: title, category, download copy) |
| Header/Footer/nav (every page) | `components/layout/Header.tsx`, `Footer.tsx` | Nav structure/labels in `components/layout/navigationData.ts` |

Email gate: `components/resources/components/EmailCaptureModal.tsx` saves to
`localStorage` (`playbook_unlocked_ids`) and also POSTs best-effort to the lead-capture
API (`POST /resources/download`, see `apps/api/routers/resources.py`) via
`submitResourceDownload` in `lib/api.ts`. Set `NEXT_PUBLIC_API_URL` for the deployed API.
Glossary still needs the Maven link from Paige.

## Insights (blog)

`/insights`, `/insights/[slug]` read `lib/content/posts.ts`'s `POSTS` array
(was Payload's Posts collection). Add new articles there, newest first —
`generateStaticParams` picks them up automatically. `app/sitemap.ts` and
`app/llms.txt/route.ts` also read `POSTS`.

`app/layout.tsx` reads `lib/siteSettings.ts`'s `SITE_SETTINGS` for org
JSON-LD (was Payload's site-settings global).

## Images

- `/public/*.png` — local static assets (hero backgrounds, etc.)
- Logo and favicon are hotlinked from `thebradburygroup.com/wp-content/...` —
  not local files, not CMS Media.

## Route renames to know about

`for-organizations` → `organisation`, `our-ai-return` → `roi`,
`the-solomon-engine` → `leaders`. Old paths 308-redirect via
`next.config.ts`. Use the new slugs in any new links/nav.
