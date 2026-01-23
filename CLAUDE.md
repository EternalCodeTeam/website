# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EternalCode.pl website - A Next.js 16 website built with React 19, featuring documentation for open-source projects, built with the App Router, MDX content, and Framer Motion animations.

**Key Technologies:**
- Next.js 16 (App Router)
- React 19 with React Compiler enabled
- TypeScript (strict mode)
- Bun as package manager and runtime
- Biome for linting and formatting
- Ultracite for extended linting rules
- Tailwind CSS v4
- Framer Motion for animations
- MDX for documentation content
- Orama for search functionality

## Development Commands

### Core Development
```bash
bun dev              # Start development server at localhost:3000
bun build            # Format, lint, and build for production
bun start            # Start production server
```

### Code Quality
```bash
bun run lint         # Run Biome linter
bun run lint:fix     # Auto-fix linting issues
bun run format       # Check formatting
bun run format:fix   # Auto-fix formatting issues
bun run type-check   # Run TypeScript type checking
```

### Additional Tools
```bash
bun run ultracite:check  # Run Ultracite linter
bun run ultracite:fix    # Auto-fix Ultracite issues
ANALYZE=true bun build   # Build with bundle analyzer
```

## Project Architecture

### Application Structure

The project uses Next.js App Router with the following structure:

```
app/
├── (routes)           # Main pages (home, team, projects, etc.)
├── docs/              # Documentation system
│   ├── layout.tsx     # Docs layout wrapper
│   ├── page.tsx       # Docs landing page
│   └── (content)/     # Route group for doc content
│       └── [...slug]/ # Dynamic catch-all route for docs
├── layout.tsx         # Root layout with providers
├── providers.tsx      # Client-side providers
└── globals.css        # Global styles with Tailwind v4

components/
├── ui/                # Reusable UI components
│   ├── mdx/           # MDX-specific components
│   └── motion/        # Framer Motion wrapper components
├── docs/              # Documentation-specific components
│   ├── sidebar/       # Sidebar navigation
│   ├── search/        # Search functionality
│   ├── content/       # Content rendering components
│   └── view/          # Documentation view components
├── home/              # Home page sections
├── hero/              # Hero section and navbar
└── footer/            # Footer component

lib/
├── docs/              # Documentation system logic
│   ├── loader.ts      # MDX file loading and parsing
│   ├── sidebar.ts     # Sidebar tree generation
│   ├── schema.ts      # Zod schemas for frontmatter
│   └── utils.ts       # Documentation utilities
├── animations/        # Framer Motion animation variants
└── (utilities)        # Various utility modules

content/
└── docs/              # MDX documentation files
    ├── eternalcore/
    ├── eternalcombat/
    ├── multification/
    └── contribute/

hooks/                 # Custom React hooks
```

### Documentation System

The documentation system is file-based using MDX:

1. **Content Storage**: MDX files in `content/docs/` organized by project
2. **Routing**: Dynamic catch-all route `app/docs/(content)/[...slug]/page.tsx` handles all doc pages
3. **Sidebar Generation**: `lib/docs/sidebar.ts` recursively builds navigation tree from file system
4. **Frontmatter**: All MDX files require frontmatter validated by Zod schema (`lib/docs/schema.ts`)
5. **Folder Metadata**: Use `_index.mdx` files to define folder titles, icons, and ordering

**Required Frontmatter Fields:**
```yaml
---
title: "Page Title"
sidebar_position: 1     # Optional: controls ordering (lower = higher in list)
icon: "icon-name"       # Optional: Lucide icon name
---
```

**MDX Processing:**
- Configured in `lib/mdx-config.mjs`
- Plugins: remark-gfm, remark-emoji, rehype-slug, rehype-prism-plus
- Custom MDX components in `components/ui/mdx/`
- Syntax highlighting via Prism.js (configured in `app/prism-languages.ts`)

### Animation System

The project uses a comprehensive Framer Motion animation system:

1. **Animation Variants**: Defined in `lib/animations/variants.ts`
   - Fade, slide, scale, blur, rotation animations
   - Hover and interaction states
   - Scroll-based animations
   - Stagger containers
   - Custom easing curves and spring configurations

2. **Motion Components**: Wrapper components in `components/ui/motion/motion-components.tsx`
   - Provides simplified API for common animations
   - Respects user's reduced motion preferences via `use-reduced-motion` hook
   - Examples: `FadeIn`, `SlideIn`, `ScaleIn`, `HoverScale`, `Parallax`, `MotionSection`

3. **Usage Pattern**:
   ```tsx
   import { FadeIn, SlideIn } from "@/components/ui/motion/motion-components";

   <FadeIn delay={0.2}>
     <Content />
   </FadeIn>
   ```

4. **Accessibility**: All animations check `useReducedMotion()` hook and disable animations when user prefers reduced motion

### Provider Structure

The app uses a layered provider structure in `app/providers.tsx`:
1. `ThemeProvider` (next-themes) - Dark/light mode with system preference support
2. `LazyMotion` (framer-motion) - Lazy-loads Framer Motion features for performance
3. `SearchProvider` - Global search state management
4. `SmoothScrolling` - Lenis smooth scroll wrapper
5. `Toaster` (react-hot-toast) - Toast notifications

### Styling System

- **Tailwind CSS v4**: Uses new CSS-first configuration via `@import "tailwindcss"`
- **CSS Variables**: Theme tokens defined in `globals.css` with dark mode support
- **Utility Functions**: `lib/utils.ts` exports `cn()` for conditional class merging with `tailwind-merge`
- **Custom Fonts**: Poppins (Google Fonts) and Minecraft typeface for specific use cases

### Search Functionality

- Powered by Orama (in-memory search engine)
- Search context in `components/docs/search/search-context.tsx`
- Modal interface with keyboard shortcuts
- Recent searches stored in localStorage via `use-recent-searches` hook

## Code Quality Standards

### Biome Configuration
- Extends ultracite configs: `ultracite/core`, `ultracite/react`, `ultracite/next`
- 2-space indentation
- Line width: 100 characters
- Semicolons required
- Double quotes for JS/JSX
- Auto-organize imports

### TypeScript
- Strict mode enabled
- Path alias: `@/*` maps to project root
- Target: ES5 with ESNext module system
- React Compiler plugin enabled in `next.config.mjs`

### Build Process
The `build` command runs in sequence:
1. Format fix (`format:fix`)
2. Lint fix (`lint:fix`)
3. Next.js build

## Important Conventions

### Component Patterns
1. **Server Components by Default**: Unless client interactivity is needed (use `"use client"` directive)
2. **Motion Components**: Always use wrappers from `components/ui/motion/` instead of raw Framer Motion
3. **MDX Components**: Custom components must be registered in `components/ui/mdx/mdx-components.tsx`

### File Organization
1. Components are organized by feature/section, not by type
2. Shared UI components go in `components/ui/`
3. Feature-specific components stay within their feature folder
4. Hooks are prefixed with `use-` and live in `hooks/`

### Performance Optimizations
- `optimizePackageImports` configured for large libraries (framer-motion, lucide-react, etc.)
- Image optimization enabled with AVIF/WebP formats
- Server components used extensively to reduce client bundle
- Route groups `(content)` used to organize routes without affecting URL structure

### Next.js Configuration Notes
- `reactCompiler: true` - React 19 compiler enabled for automatic memoization
- `transpilePackages: ["next-mdx-remote"]` - Required for MDX processing
- Static generation: `export const dynamic = "force-static"` in layouts
- Revalidation: `export const revalidate = 5` for ISR

## Development Notes

### Working with Documentation
1. Add new docs as `.mdx` files in `content/docs/`
2. Include required frontmatter (title, optional sidebar_position and icon)
3. Use `_index.mdx` for folder metadata
4. Sidebar automatically regenerates from file structure
5. All docs are cached with React's `cache()` for performance

### Working with Animations
1. Prefer existing animation variants from `lib/animations/variants.ts`
2. Use motion component wrappers for consistent behavior
3. Test with reduced motion preferences enabled
4. Combine animations using `MotionSection` for sequential effects

### Smooth Scroll
- Lenis is used globally via `SmoothScrolling` component
- To disable on specific elements, check Lenis documentation
- Smooth scroll is automatically disabled for reduced motion preference

### Hot Module Replacement
- Custom hot reload handling in `components/docs/hot-reload.tsx` for development
- Automatically refreshes docs content when MDX files change

## Agent Skills

This repository uses Claude Code Agent Skills to enforce best practices and guidelines. Skills are located in `.agents/skills/` and activated via symlinks in `.agent/skills/`.

### Available Skills

#### vercel-react-best-practices
**Purpose**: React and Next.js performance optimization guidelines from Vercel Engineering

**When Applied**: Automatically referenced when:
- Writing new React components or Next.js pages
- Implementing data fetching (client or server-side)
- Reviewing code for performance issues
- Refactoring existing React/Next.js code
- Optimizing bundle size or load times

**Key Rule Categories** (by priority):
1. **Eliminating Waterfalls** (CRITICAL) - Async operations optimization
   - Move await into branches, use Promise.all(), parallel fetching
   - Use Suspense boundaries for streaming content
2. **Bundle Size Optimization** (CRITICAL) - Import and loading strategies
   - Avoid barrel imports, use next/dynamic, defer third-party scripts
3. **Server-Side Performance** (HIGH) - Server component optimization
   - React.cache() for deduplication, minimize serialization, parallel fetching
4. **Client-Side Data Fetching** (MEDIUM-HIGH) - SWR patterns, deduplication
5. **Re-render Optimization** (MEDIUM) - Memo, derived state, transitions
6. **Rendering Performance** (MEDIUM) - SVG optimization, content-visibility
7. **JavaScript Performance** (LOW-MEDIUM) - DOM batching, Set/Map usage
8. **Advanced Patterns** (LOW) - Event handler refs, useLatest

**Documentation**:
- Quick reference: `.agents/skills/vercel-react-best-practices/SKILL.md`
- Full guide: `.agents/skills/vercel-react-best-practices/AGENTS.md`
- Individual rules: `.agents/skills/vercel-react-best-practices/rules/*.md`

#### web-design-guidelines
**Purpose**: UI/UX compliance review against Vercel's Web Interface Guidelines

**When Applied**: On request when reviewing:
- UI code for best practices
- Accessibility compliance
- Design system consistency
- UX patterns

**How It Works**:
1. Fetches latest guidelines from: `https://github.com/vercel-labs/web-interface-guidelines`
2. Reviews specified files against all rules
3. Outputs findings in terse format

**Documentation**: `.agents/skills/web-design-guidelines/SKILL.md`

### Using Agent Skills

Skills are automatically available to Claude Code and will be referenced during code generation and review. To manually invoke a skill review, you can ask Claude Code to review specific files or patterns against these guidelines.
