# EternalCode Documentation System Redesign

## Objective

Replace the existing documentation system from scratch while preserving the MDX content, public
URLs, and dynamic EternalCore command and placeholder data. The new system must feel native to the
current EternalCode website, remain fast on mobile and desktop, and have a substantially smaller
client-side footprint.

## Non-goals

- Rewriting the factual documentation content.
- Changing established public documentation URLs without redirects.
- Reusing the existing docs UI, filesystem loaders, sidebar, search context, or runtime MDX renderer.
- Turning the documentation into a separately styled application.

## Foundation

Use Fumadocs MDX as the build-time, type-safe content layer and Fumadocs Core in headless mode for
the source API, page tree, table of contents, breadcrumbs, and search primitives. Build all visible
UI specifically for EternalCode instead of adopting Fumadocs UI.

The new implementation must not import UI or system logic from `components/docs` or `lib/docs`.
Those directories are removed after the replacement passes verification.

## Content model

`content/docs/**/*.mdx` remains the single source of documentation content. The first path segment
identifies the project: `eternalcore`, `eternalcombat`, `multification`, or `contribute`.

Frontmatter contains page-level information only:

- `title`: required page title.
- `description`: required summary for metadata, search, and listing cards.
- `sidebar_position`: explicit order inside the current folder.
- `icon`: optional Lucide icon name.
- `draft`: optional build-time visibility flag.
- `toc`: optional table-of-contents visibility flag.

All direct component imports are removed from MDX. Shared primitives such as `Callout`, `Steps`,
`CodeTabs`, `CardGroup`, and `FileTree` are registered once in the global MDX component map. The
existing prose and component usage remains intact unless an obsolete component requires a direct,
mechanical migration.

## Routing

- `/docs` is a dedicated documentation hub.
- `/docs/[project]/[[...slug]]` renders project documentation.
- A project root resolves to the first ordered page in that project.
- Existing document URLs remain stable.
- Historical directory URLs receive explicit permanent or temporary redirects as appropriate.
- Missing projects and pages use a documentation-specific not-found state.

## Navigation model

The docs hub is global, while document navigation is project-scoped.

- The sidebar contains only the active project's pages.
- A project switcher sits at the top of the sidebar.
- Switching projects opens that project's entry page.
- Previous and Next navigation never crosses a project boundary.
- Global search covers every project and labels each result with its project.
- Breadcrumbs expose Docs, project, optional group, and current page.

This prevents EternalCore's 47 pages from dominating EternalCombat and Multification while keeping
all products one command away.

## `/docs` hub design

The page uses the existing EternalCode navigation, Manrope and JetBrains Mono fonts, and global
`--ec-*` design tokens.

The hero contains a compact kicker, a strong editorial heading, a short explanation, and a large
search trigger with the `Ctrl/Command + K` shortcut. Its background uses the same restrained grid
and accent glow language as the homepage.

Below the hero are three substantial product cards for EternalCore, EternalCombat, and
Multification. Each card includes a concise description, selected entry points, and one primary
action. Contribution documentation appears as a separate wide support block instead of pretending
to be a product. A compact Discord support strip closes the page without duplicating the homepage
community CTA.

## Document page design

Desktop uses a three-column reading shell:

- A project-scoped sticky sidebar around 280 pixels wide.
- A central article column between 760 and 820 pixels wide.
- A lightweight sticky `On this page` rail around 220 pixels wide.

The sidebar is visually flat and uses the site's panel, line, text, muted, and accent tokens. It has
no card chrome, footer, counters, animated folders, or custom smooth scrolling. The active item is
identified by accent color and a narrow indicator.

The article header contains breadcrumbs, title, description, and restrained Copy Page and Edit on
GitHub actions. Document typography prioritizes reading density and clear hierarchy. Headings expose
anchors. Code blocks, callouts, tabs, tables, steps, file trees, and inline code receive a coherent
light/dark treatment derived from the global site palette.

The right table of contents follows the current heading with an active indicator. Previous and Next
links are quiet split links at the end of the article.

On mobile, project navigation opens in an accessible drawer, search remains one tap away, the table
of contents becomes a collapsible section below the article header, and all content avoids
horizontal overflow.

## Search

Search uses structured data generated by the Fumadocs content pipeline. It does not scan the
filesystem during a request and does not initialize a database on every page load.

The command dialog and its search code are loaded only when requested. It supports keyboard
navigation, Escape to close, focus restoration, project labels, heading-level results, and a useful
empty state. `Ctrl/Command + K` opens it globally within documentation pages.

## Dynamic EternalCore data

Command and placeholder tables remain dynamic but are isolated from the documentation core.

- Server loaders fetch and validate remote data.
- Responses use explicit caching and revalidation.
- The article renders independently of the data source.
- Client code is limited to filtering, sorting, and retrying.
- Loading, empty, stale, and error states are local to each table.
- A remote failure never prevents the surrounding MDX page from rendering.

## Rendering and performance

Pages and MDX render as React Server Components by default. Client Components are limited to the
search dialog, mobile navigation, project switcher where necessary, and dynamic table controls.

The replacement removes runtime filesystem scanning, `next-mdx-remote`, the current Orama wrapper
and search API, Lenis in the sidebar, and Framer Motion from the docs shell. Motion is limited to
small CSS transitions that respect reduced-motion preferences.

Images use Next.js optimization, search is lazy-loaded, and project data is derived once from the
typed source. The initial document route must not ship code for search or dynamic tables that are
not present on that page.

## Error behavior

- Invalid frontmatter fails the build with the source filename and validation problem.
- Invalid project or page paths render the docs-specific not-found state.
- Project directory routes resolve predictably to the first ordered document.
- Search failures stay inside the search dialog and offer retry.
- Dynamic table failures stay inside the table and offer retry.
- Broken internal documentation links are caught during verification.

## Migration strategy

1. Add the Fumadocs source configuration and new documentation modules in isolated directories.
2. Normalize frontmatter and remove direct imports from MDX without rewriting prose.
3. Build the new hub, document shell, MDX primitives, navigation, TOC, and search from scratch.
4. Rebuild the two dynamic EternalCore tables behind isolated server loaders.
5. Replace the routes atomically while preserving URLs.
6. Verify all content and interactions.
7. Remove the old docs routes, components, libraries, search API, unused hooks, and dependencies.
8. Confirm that no `docs-old`, `docs-next`, compatibility facade, or imports from the old system
   remain.

## Verification

- Unit tests cover source grouping, project scoping, ordering, Previous/Next boundaries, metadata,
  redirects, search mapping, and dynamic data validation.
- Integration tests render every MDX file with the centralized component map.
- Browser tests cover the hub, a representative page from every project, project switching,
  desktop and mobile navigation, keyboard search, light/dark themes, TOC behavior, and both dynamic
  tables.
- Automated checks detect broken internal links and horizontal overflow.
- TypeScript, lint, production build, and the existing site test suite must pass.
- The final review compares initial client JavaScript for a representative old and new document
  page and records the result.

## Completion criteria

The work is complete when all 67 MDX documents are reachable, existing public document URLs are
preserved or redirected, dynamic tables function with failure isolation, the old documentation
system and unused dependencies are removed, and the new interface passes the verification suite in
both themes and at desktop and mobile widths.
