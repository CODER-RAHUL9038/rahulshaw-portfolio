# Project Instructions: Portfolio

This is a modern portfolio application built with Next.js 16 and React 19.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS 4 (PostCSS)
- **Animations**: Framer Motion (`motion` package)
- **Icons**: Lucide React
- **AI Integration**: Google Generative AI SDK (`@google/genai`)

## Project Structure
- `src/app`: Page routes, global styles, and API handlers.
- `src/components/layout`: Structural components like Navbar and Footer.
- `src/components/sections`: Major homepage sections (Hero, FeaturedProjects, etc.).
- `src/components/shared`: Reusable UI components (e.g., Modals).
- `src/data`: Centralized data files for projects, skills, and experience.
- `src/types.ts`: Central TypeScript interface definitions.

## Styling & Theme
- **Theme Variables**: Custom colors and fonts are defined in `@theme` within `src/app/globals.css` (e.g., `--color-brand-black`, `--color-brand-surface`).
- **Custom Classes**: Use established utility classes for consistency:
    - `.glass-card`: For glassmorphism effects on cards.
    - `.reveal-active`: For entrance animations.
    - `.pulse-glow`, `.float-avatar`: For subtle background/element animations.
    - `.neon-border-glow`: For animated gradient borders.
- **Fonts**:
    - Sans: `Inter`
    - Heading: `Plus Jakarta Sans`
    - Mono: `JetBrains Mono`

## Coding Conventions
- **Functional Components**: Use functional components with explicit TypeScript interfaces for props.
- **Styling**: Prefer Tailwind CSS utility classes. Avoid custom CSS unless absolutely necessary.
- **Icons**: Use `lucide-react` for all iconography.
- **Data Management**: Keep content separate from components. Add or modify data in `src/data/` and ensure types in `src/types.ts` are updated accordingly.
- **Animations**: Use `motion` from the `motion` package for interactive transitions and animations.
- **Type Safety**: Avoid using `any`. Define and export interfaces in `src/types.ts`.

## Development Workflow
- **Start Dev Server**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Clean**: `npm run clean` (removes `.next` and `dist`)

## Deployment
This app is designed to be deployed via Google AI Studio or similar platforms supporting Next.js.
