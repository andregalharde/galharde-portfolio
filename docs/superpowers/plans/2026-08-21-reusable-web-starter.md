# Reusable Web Starter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a neutral, reusable Next.js starter for portfolios, landing pages, and institutional websites with semantic tokens, accessible components, documentation, and a complete preview route.

**Architecture:** The App Router owns the shared page shell and two static routes. Locally owned shadcn/ui primitives live under `components/ui`, while layout, section, and form components are grouped by responsibility and consume semantic CSS tokens from `app/globals.css`.

**Tech Stack:** Current stable Next.js, React, TypeScript, Tailwind CSS v4, shadcn/ui, npm, Plus Jakarta Sans through `next/font/google`

**Spec:** `docs/superpowers/specs/2026-08-21-reusable-web-starter-design.md`

## Global Constraints

- Use Next.js with App Router, TypeScript, Tailwind CSS, and shadcn/ui.
- Use npm and require Node.js 20.9 or newer.
- Use Plus Jakarta Sans through `next/font`, exposed only through the semantic `--font-sans` token.
- Do not include images, gradients, client logos, fictional client copy, a complete landing-page layout, a backend, or form integration.
- Do not add a dependency unless the required stack or an implemented component needs it.
- Use semantic tokens for colors, type, spacing, borders, radii, and shadows.
- Keep `DESIGN.md` as the visual-rule source and `PROJECT-SPEC.md` as the future project's source of truth.

---

### Task 1: Create the framework baseline and failing integration contract

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `.gitignore`
- Create: `next-env.d.ts`
- Create: `components.json`
- Create: `tests/starter.test.mjs`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`

**Interfaces:**
- Consumes: Node.js 20.9+, npm, official Next.js and shadcn/ui setup conventions.
- Produces: npm scripts `dev`, `build`, `start`, `lint`, and `test`; `@/*` alias; a bootable App Router shell; an HTTP-level starter contract test.

- [ ] **Step 1: Confirm the runtime**

Run: `node --version` and `npm --version`  
Expected: Node.js is at least 20.9 and npm is available.

- [ ] **Step 2: Create the minimal configuration**

Create the Next.js, TypeScript, Tailwind v4, ESLint, and shadcn configuration files. `package.json` must contain:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "test": "node --test"
  }
}
```

Install only the framework dependencies and the dependencies generated or required by shadcn/ui primitives.

- [ ] **Step 3: Add a failing route contract test**

Write `tests/starter.test.mjs` with Node's built-in test runner. The test starts `npm run dev` on a dedicated local port, waits until the server responds, fetches `/` and `/preview`, and asserts literal user-visible and semantic markers:

```js
assert.equal(home.status, 200)
assert.match(homeHtml, /Starter reutilizável/)
assert.equal(preview.status, 200)
assert.match(previewHtml, /Catálogo de componentes/)
assert.match(previewHtml, /<form/)
assert.match(previewHtml, /name="email"/)
```

Use `after()` to terminate the child process reliably. The production break this catches is removal of either required route or the accessible preview form.

- [ ] **Step 4: Run the test to verify RED**

Run: `npm test`  
Expected: FAIL because `/preview` does not exist and required starter content has not been implemented.

- [ ] **Step 5: Keep the baseline minimal**

Retain only a root layout, global Tailwind import, and temporary Home sufficient to boot the test server. Do not implement the approved routes or components in this task.

---

### Task 2: Implement semantic tokens and shadcn/ui primitives

**Files:**
- Modify: `app/globals.css`
- Create: `lib/utils.ts`
- Create: `components/ui/button.tsx`
- Create: `components/ui/card.tsx`
- Create: `components/ui/input.tsx`
- Create: `components/ui/label.tsx`
- Create: `components/ui/textarea.tsx`
- Create: `tests/token-contract.test.mjs`

**Interfaces:**
- Consumes: Tailwind v4 theme mapping and shadcn/ui local-source conventions.
- Produces: `cn(...inputs: ClassValue[]): string`; `Button` with `buttonVariants`; Card primitives; accessible Input, Label, and Textarea; semantic CSS variables and matching Tailwind theme utilities.

- [ ] **Step 1: Write the failing token contract test**

Create a Node test that reads `app/globals.css`, extracts declared custom properties from `:root`, and checks the required semantic categories as literal keys:

```js
for (const token of [
  "--background",
  "--foreground",
  "--font-sans",
  "--space-section",
  "--radius-control",
  "--shadow-card",
]) {
  assert.ok(tokens.has(token), `missing ${token}`)
}
```

The production break this catches is removal of a required semantic token category while components still depend on it.

- [ ] **Step 2: Run the token test to verify RED**

Run: `node --test tests/token-contract.test.mjs`  
Expected: FAIL with the first missing semantic token.

- [ ] **Step 3: Implement the token system**

Define a restrained light palette, type scale, spacing scale, container gutters, section rhythm, border widths, radii, and subtle shadows in `:root`. Map semantic tokens into Tailwind v4 with `@theme inline`. Add base focus-visible, selection, body, reduced-motion, and form-control styles without hard-coded component-level brand values.

- [ ] **Step 4: Add shadcn/ui primitives**

Use locally owned shadcn/ui source for Button, Card, Input, Label, and Textarea. Adapt their utilities to the semantic token names. Button exposes `default`, `secondary`, `outline`, `ghost`, and `link`; sizes preserve accessible control heights. No icon package is used by application code.

- [ ] **Step 5: Verify GREEN**

Run: `node --test tests/token-contract.test.mjs` and `npm run lint`  
Expected: both commands exit zero with no errors.

---

### Task 3: Implement layout, sections, form, and routes

**Files:**
- Create: `components/layout/container.tsx`
- Create: `components/layout/header.tsx`
- Create: `components/layout/footer.tsx`
- Create: `components/sections/section.tsx`
- Create: `components/sections/cta.tsx`
- Create: `components/forms/contact-form.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Create: `app/preview/page.tsx`

**Interfaces:**
- Consumes: `cn`, Button, Card, Input, Label, Textarea, and semantic tokens.
- Produces: shared Header/Footer shell, `Container`, polymorphic semantic `Section`, layout-neutral `CTA`, client-side visual-only `ContactForm`, and the required `/` and `/preview` routes.

- [ ] **Step 1: Confirm the route contract remains RED**

Run: `npm test`  
Expected: FAIL for the missing `/preview` route or its required catalogue/form markers.

- [ ] **Step 2: Implement layout primitives**

`Container` accepts `React.ComponentProps<"div">`. `Section` accepts `as?: "section" | "div" | "article"` and standard HTML attributes. Header and Footer use semantic landmarks, textual navigation, and token-based responsive layout. Root layout adds a visible-on-focus skip link and wraps `children` in `<main id="main-content">`.

- [ ] **Step 3: Implement CTA and ContactForm**

CTA accepts title, description, `primaryAction`, and optional `secondaryAction` as React nodes. ContactForm is a client component whose submit handler calls only `event.preventDefault()`. It uses labels, `required`, `autoComplete`, helper text linked with `aria-describedby`, and a note explaining that no data is sent.

- [ ] **Step 4: Implement the two routes**

Home contains one `h1`, a concise starter explanation, documentation guidance, and a link to Preview. Preview contains one `h1` and labelled catalogue sections for colors, typography, foundational tokens, Buttons, Card, CTA, and ContactForm. Copy remains system-oriented and contains no client claims.

- [ ] **Step 5: Verify GREEN**

Run: `npm test`  
Expected: PASS for both routes and the accessible form markers.

- [ ] **Step 6: Run static checks**

Run: `npm run lint` and `npm run build`  
Expected: both commands exit zero.

---

### Task 4: Complete metadata, documentation, visual QA, and handoff

**Files:**
- Modify: `app/layout.tsx`
- Create: `public/favicon.svg`
- Modify: `DESIGN.md`
- Modify: `PROJECT-SPEC.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: completed starter structure and approved design specification.
- Produces: customizable Metadata API configuration, neutral favicon, stable visual rules, reusable client brief, duplication instructions, and verified handoff commands.

- [ ] **Step 1: Add metadata and favicon**

Configure the root layout with a title default/template, description, metadata base placeholder, robots, Open Graph, Twitter card, icons, and theme color using supported Next.js APIs. Create a monochrome SVG built only from simple geometry and `currentColor`-independent explicit black/white fills so browser tab rendering is predictable.

- [ ] **Step 2: Rewrite the root documentation**

Save all three files as UTF-8. `DESIGN.md` records the semantic token rules and approved visual constraints. `PROJECT-SPEC.md` is a blank, actionable client/project template including font replacement, metadata, routes, integrations, content, legal needs, and acceptance criteria. `README.md` documents requirements, commands, tree, component contracts, customization, duplication, and first-commit instructions.

- [ ] **Step 3: Run the full automated verification**

Run: `npm test`, `npm run lint`, and `npm run build`  
Expected: every command exits zero with no failures.

- [ ] **Step 4: Run the application and verify routes**

Run: `npm run dev` on an available localhost port. Request `/` and `/preview`.  
Expected: HTTP 200 for both routes.

- [ ] **Step 5: Inspect visually and interactively**

Open both routes in a browser at approximately 390px and 1440px widths. Verify no horizontal overflow, readable hierarchy, restrained use of cards, focus-visible keyboard navigation, native required-field validation, and that form submission makes no request.

- [ ] **Step 6: Review every acceptance criterion**

Compare the final tree and UI against `docs/superpowers/specs/2026-08-21-reusable-web-starter-design.md`. Remove any prohibited content or unjustified dependency and rerun the affected verification command.

- [ ] **Step 7: Prepare the local Git handoff**

Leave files unstaged. Provide these commands without running them:

```powershell
npm install
npm test
npm run lint
npm run build
git add .
git commit -m "feat: create reusable Next.js starter"
```
