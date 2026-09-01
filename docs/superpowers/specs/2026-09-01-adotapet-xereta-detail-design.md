# AdotaPet Xereta Detail — Design Specification

## Goal

Implement the Figma pet-detail experience for Xereta at `/adoteumpet/xereta`, link it from the Xereta feature in the existing `/adoteumpet` landing page, and reuse the current AdotaPet header and footer without changing their approved appearance or content.

The detail content is based on Figma node `309:1912`. The adoption dialog takes its visual language from Figma node `309:1979`, but replaces the login fields with a small adoption-interest form appropriate to the “Me adote” action.

## Existing Context

- `/adoteumpet` is a standalone AdotaPet experience rendered by `AdoptapetProductPage`.
- The current header, mobile menu, scroll state, and footer are embedded in that page component.
- The landing hero already presents Xereta using `hero-cat.png` and a card with the name and location.
- The project uses Next.js App Router, React client components where interaction is needed, CSS Modules for the standalone AdotaPet page, `next/image`, Poppins headings, and Inter body copy.
- The portfolio case route `/projetos/adote-um-pet` and the standalone AdotaPet routes remain separate.

## Information Architecture

### Routes

- Existing landing: `/adoteumpet`
- New pet detail: `/adoteumpet/xereta`
- Existing portfolio case: `/projetos/adote-um-pet` (unchanged)

The Xereta hero card on `/adoteumpet` becomes a link to `/adoteumpet/xereta`.

### Shared AdotaPet Shell

Extract the current AdotaPet header and footer into reusable components while preserving their rendered markup, labels, links, responsive behavior, sticky scroll treatment, and styles.

The shared shell owns:

- Poppins and Inter font variables.
- Fixed responsive AdotaPet header.
- Header scroll state and mobile-menu state.
- Existing footer content and social links.
- Page-level AdotaPet color surface.

The landing page continues to own its search, pet carousel, testimonials, FAQ, favorites, and other landing-only state. The new detail page owns only Xereta detail state and the adoption dialog.

## Xereta Detail Content

The detail page reuses the 1216px desktop content grid and follows the Figma content order:

1. Breadcrumb: `home > seu pet está aqui`.
2. Main detail region on the soft neutral background:
   - Xereta heading.
   - Attribute grid: Persa, 3 meses, Caramelo, Fêmea.
   - Primary CTA: `Me adote`.
   - Four-image cat gallery arranged as a 2×2 collage on desktop.
   - Address block: `Vila Venditti, Guarulhos` and the complete street address from Figma.
   - About block with the exact Xereta description from Figma.
3. Related pets region on white:
   - Heading `Pets Relacionados`.
   - Three cards: Rainha, Perigosa, and Charlote, preserving their Figma copy, metadata, images, heart icon, and outgoing-arrow affordance.
4. Existing shared AdotaPet footer.

The page must use semantic headings, lists or articles for related pets, descriptive image alternatives, and a real link for the breadcrumb home destination.

## Assets

Download and commit the exact image and SVG bytes exported from Figma while the provided URLs are valid. Store new files under:

`public/media/cases/adote-um-pet/xereta/`

Reuse existing landing assets only when the exported glyph or image clearly matches. Do not alter or overwrite any existing source asset. Do not inline hand-authored SVG paths or retain temporary Figma URLs in production code.

## Adoption Dialog

Clicking `Me adote` opens a modal dialog inspired by Figma node `309:1979`.

### Content

- Title: `Quero adotar a Xereta`.
- Supporting sentence explaining that the team will contact the interested adopter.
- Required fields: name, email, and phone.
- Optional message field.
- Submit label: `Enviar interesse`.
- Local success state confirming that the interest was registered.

### Behavior

- Use a semantic modal dialog with an accessible name and `aria-modal` behavior.
- Move focus into the dialog when opened and restore focus to `Me adote` when closed.
- Close through the close button, `Escape`, or an intentional backdrop click.
- Prevent background scrolling while open.
- Validate required fields and email format before showing success.
- Submission is local-only and must not make a network request because no adoption backend is in scope.
- Keep entered values when validation fails; clear them only after a successful submission or explicit reset.

### Responsive Treatment

- Desktop: form and Figma image in a two-column modal.
- Tablet: narrower two-column layout while space permits.
- Mobile: single-column form; hide the decorative image panel and keep close control, labels, validation, and submit action visible without horizontal overflow.

## Responsive Page Behavior

- Desktop: left pet-information column and right 2×2 gallery; two-column address/about row; three related-pet cards.
- Tablet: preserve the main two-column relationship where readable, reduce gaps, and allow related cards to wrap.
- Mobile: stack breadcrumb, pet information, CTA, gallery, address, description, and related cards; maintain comfortable 16px outer gutters and touch targets of at least 44px.
- The shared fixed header must keep content offset below it and remain above the scrolling page.

## Error and Empty States

- Asset rendering must provide stable layout dimensions to avoid layout shifts.
- Form validation errors appear beside their fields and are announced accessibly.
- No server-error state is required because submission is local-only.
- The detail route is static and does not require loading or not-found states for this single approved pet.

## Testing and Validation

Use test-driven implementation.

Automated coverage must verify:

- `/adoteumpet/xereta` responds successfully and contains the approved Xereta copy.
- The landing Xereta feature links to `/adoteumpet/xereta`.
- Header and footer remain present on both standalone AdotaPet routes.
- Figma-exported detail assets are served from local project paths.
- The adoption dialog has accessible dialog semantics, required form fields, close control, and local-only submission behavior.
- Desktop and mobile layout contracts are present in the responsive CSS.

Before completion, run the full test suite, lint, production build, and HTTP checks for `/adoteumpet` and `/adoteumpet/xereta`. When a connected browser is available, validate desktop and mobile screenshots, dialog open/close/focus behavior, form validation and success, landing-to-detail navigation, and console output. If browser access is unavailable, report that boundary explicitly rather than inferring visual fidelity from automated checks.

## Non-Goals

- No authentication or password flow.
- No backend, database, email delivery, or external form service.
- No redesign of the existing AdotaPet header or footer.
- No changes to the portfolio case route or copy.
- No generic pet-detail CMS or dynamic `[slug]` route in this iteration.
- No changes to unrelated portfolio pages or assets.

