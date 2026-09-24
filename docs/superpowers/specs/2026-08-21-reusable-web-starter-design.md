# Reusable Web Starter — Design Specification

**Date:** 2026-08-21  
**Status:** Approved in conversation; awaiting written-spec review  
**Scope:** Neutral starter for portfolios, landing pages, and institutional websites

## Objective

Create a reusable technical foundation that can be duplicated for future client projects without imposing a client identity or a ready-made landing-page composition. The starter must make project-specific decisions explicit in `PROJECT-SPEC.md` and keep stable visual and quality rules in `DESIGN.md`.

## Required stack

- Next.js with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- npm as the package manager
- Plus Jakarta Sans loaded through `next/font`

No dependency may be added unless the required stack or an implemented component needs it. There will be no image assets, gradients, client logos, fictional client copy, backend, form integration, analytics, CMS, theme switcher, or complete marketing-page layout.

## Architecture

```text
app/
  globals.css
  layout.tsx
  page.tsx
  preview/
    page.tsx
components/
  forms/
    contact-form.tsx
  layout/
    container.tsx
    footer.tsx
    header.tsx
  sections/
    cta.tsx
    section.tsx
  ui/
    button.tsx
    card.tsx
lib/
  utils.ts
public/
  favicon.svg
DESIGN.md
PROJECT-SPEC.md
README.md
```

The application layer composes pages. Component folders group primitives by responsibility rather than placing every element under `ui`. shadcn/ui primitives remain locally owned source files and may be adapted through the semantic token system. No index-barrel files are required.

## Visual system

The starter uses a restrained light theme. CSS custom properties provide semantic tokens for:

- color: background, foreground, surface/card, muted, primary, secondary, destructive, border, input, and focus ring, including suitable foreground pairs;
- typography: font families, fluid display and heading sizes, body sizes, weights, line heights, and tracking;
- spacing: a reusable scale plus semantic container gutters and section gaps;
- borders: widths and semantic color;
- radii: small, medium, large, and control/card aliases;
- shadows: subtle small, medium, and focus treatments.

Components consume semantic tokens through Tailwind utilities or CSS variables. Repeated hard-coded colors, font families, radii, shadows, and component spacing are prohibited.

Plus Jakarta Sans is loaded through `next/font/google` and assigned to `--font-sans`. Components refer only to this semantic variable. A future project can replace the import and variable assignment with Geist or another family after recording the choice in `PROJECT-SPEC.md`.

## Component contracts

### Container

Controls maximum content width and responsive horizontal gutters. It accepts standard HTML attributes and supports polymorphism only if a concrete need emerges; the initial implementation remains a focused `div` wrapper.

### Section

Provides consistent responsive vertical rhythm, an optional accessible heading relationship, and a configurable semantic HTML element. It may constrain its inner text width without forcing every section into a card or centered layout.

### Header

Uses a semantic `header` and labeled navigation. It includes a text-only starter name and links to Home and Preview. Mobile and desktop use the same simple navigation because only two destinations exist; no drawer dependency is justified. Links expose clear hover, active, and focus-visible feedback.

### Footer

Uses a semantic `footer`, a concise starter description, and structural navigation. It contains no client or copyright fiction.

### Button

Uses the shadcn/ui button pattern with class-variance-authority and Radix Slot as introduced by the shadcn installer. Supported variants are default, secondary, outline, ghost, and link. Supported sizes provide a minimum 44-pixel touch target where the control is used as an action. It supports `asChild`, disabled state, keyboard focus, hover, and active feedback.

### Card

Uses shadcn/ui card primitives for independently grouped content. Card, CardHeader, CardTitle, CardDescription, CardContent, and CardFooter are available. The starter does not use cards as the default wrapper for ordinary text.

### CTA

Composes a section heading, supporting description, and optional primary and secondary actions. It remains layout-neutral and does not imply a hero, background media, marketing claim, or client conversion path.

### ContactForm

Provides visible labels for name, email, subject, and message, suitable autocomplete attributes, descriptive helper text, required indicators expressed in text and markup, and an accessible submit control. Submission is intercepted in the browser and produces no network request, backend call, success fiction, or persistence. A short note states that the form is a visual demonstration.

## Routes

### `/`

The Home page contains only a concise explanation of the starter, links to `DESIGN.md` and `PROJECT-SPEC.md` as concepts rather than downloadable routes, and navigation to `/preview`. It is not a marketing landing page and does not contain a hero-image pattern, social proof, testimonials, pricing, FAQ, or repeated conversion sections.

### `/preview`

The Preview page is a component catalogue and quality reference. It displays:

- semantic color swatches;
- typography hierarchy;
- spacing, radius, border, and shadow samples;
- button variants, sizes, disabled state, and links rendered through `asChild`;
- card anatomy;
- Container and Section behavior;
- CTA with one and two actions;
- ContactForm;
- Header and Footer as part of the shared shell.

Examples use descriptive system text only. Focus styles are tested through actual keyboard interaction rather than simulated decoration.

## Metadata and assets

The root layout defines a metadata base placeholder, title template, concise starter description, robots directives, Open Graph fields, Twitter card fields, icons, and viewport/theme-color configuration using current Next.js metadata APIs. Values are clearly marked and documented for replacement in a new client project.

`public/favicon.svg` is a small monochrome geometric base icon with no logo lettering or client identity. No Open Graph bitmap is generated; metadata documents the location to add the client-approved asset, avoiding a fake branded image.

## Responsiveness and accessibility

- Mobile-first layouts with deliberate tablet and desktop adjustments.
- Semantic landmarks: header, nav, main, section, form, and footer.
- Skip link to the main content.
- Logical heading order and one page-level `h1` per route.
- Visible `:focus-visible` treatment using the ring token.
- Keyboard-operable links, buttons, and form controls.
- Minimum 44-pixel action targets where appropriate.
- Labels remain visible; placeholders never replace them.
- Color contrast targets WCAG AA and state is not communicated by color alone.
- Motion is minimal and respects `prefers-reduced-motion`.

## Data flow and error handling

The starter is static except for the visual form interaction. No server action, route handler, database, or external service is introduced. The ContactForm prevents native submission and keeps the user-entered values in the browser's native form controls. Native HTML constraints communicate missing required fields and invalid email format. Because no operation is performed, the interface does not show false loading, success, or failure states.

Build-time failures, TypeScript errors, lint errors, invalid route composition, or dependency incompatibilities are implementation blockers and must be corrected before completion.

## Testing and verification

Behavioral tests will cover application-owned contracts where a regression is meaningful, particularly ContactForm's no-network submission behavior and component accessibility/variant behavior. Trivial framework passthrough and prose files will not receive source-text tests.

Final verification requires:

1. the complete automated test command, if a test runner is justified and installed;
2. `npm run lint`;
3. `npm run build` with exit code zero;
4. running the development or production server and requesting `/` and `/preview` successfully;
5. visual browser inspection at mobile and desktop widths;
6. keyboard focus and form validation checks;
7. a final review against every requirement in this specification.

## Documentation responsibilities

- `DESIGN.md` is the stable source for visual rules, token usage, component restraint, responsiveness, and accessibility.
- `PROJECT-SPEC.md` is a reusable blank project brief and the source of truth for client-specific identity, content, routes, integrations, SEO, and acceptance criteria.
- `README.md` explains setup, commands, architecture, customization points, verification, and a safe duplication workflow for a new client.

## Acceptance criteria

- The required stack is installed and configured using current compatible versions.
- All listed components exist and are demonstrated on `/preview`.
- Home remains a short starter explanation rather than a client landing page.
- Visual values are centralized as semantic tokens and consumed consistently.
- Plus Jakarta Sans is loaded through `next/font` and replaceable through one semantic font variable.
- Metadata, favicon, SEO, and Open Graph scaffolding are ready for explicit client customization.
- No prohibited content, unnecessary integration, or unjustified dependency is included.
- Accessibility, responsiveness, lint, build, local route responses, and visual rendering are verified before handoff.
