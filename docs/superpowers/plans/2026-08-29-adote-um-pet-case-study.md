# Adote um Pet Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render the Figma Adote um Pet case as a reusable data-driven case-study template at the route already linked from the first home banner.

**Architecture:** Extend the current `Project` record with an optional case-study content model. Render that model with an isolated `CaseStudyTemplate`, while retaining the existing editorial route for all projects that do not supply it. Store Figma images locally and scope the new styling to the template.

**Tech Stack:** Next.js App Router, TypeScript, React Server Components, next/image, CSS layers, Node built-in test runner.

**Spec:** `docs/superpowers/specs/2026-08-29-adote-um-pet-case-study-design.md`

## Global Constraints

- Preserve `/projetos/fluentify` as the first slider route and set its slider year to `2026`.
- All case-specific copy, image paths, palettes, and list items stay in project data.
- Use only local Figma assets under `public/media/cases/adote-um-pet/`.
- Reuse the application Header and Footer; never duplicate them in this route.

---

### Task 1: Define the observable case-study route contract

**Files:**
- Modify: `tests/starter.test.mjs`
- Modify: `tests/hero-slider.test.mjs`

**Interfaces:**
- Consumes: `/projetos/fluentify` and `heroSlides`.
- Produces: regression coverage for the rendered case and the first banner route.

- [ ] **Step 1: Write the failing route test**

```js
assert.match(fluentifyHtml, /class="case-study"/)
assert.match(fluentifyHtml, /Adote um Pet\./)
assert.match(fluentifyHtml, /Case 01 · produto digital/)
assert.match(fluentifyHtml, /2026/)
assert.match(fluentifyHtml, /\/media\/cases\/adote-um-pet\/hero\.jpg/)
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm.cmd test -- --test-name-pattern="Adote"`

Expected: FAIL because the generic Fluentify page has no `case-study` markup.

- [ ] **Step 3: Update the slider fixture expectation**

```js
{ slug: "fluentify", title: "Adote um Pet", year: 2026,
  ctaLabel: "Acessar case", image: "/media/hero/adote-um-pet.png",
  href: "/projetos/fluentify" }
```

- [ ] **Step 4: Run the slider test to verify it fails**

Run: `node --test tests/hero-slider.test.mjs`

Expected: FAIL because the fixture still publishes `2025`.

### Task 2: Build the reusable template and data contract

**Files:**
- Create: `components/case-study-template.tsx`
- Modify: `lib/projects.ts`
- Modify: `app/projetos/[slug]/page.tsx`
- Modify: `lib/hero-slides.ts`
- Create: `public/media/cases/adote-um-pet/hero.jpg`
- Create: `public/media/cases/adote-um-pet/product-preview.png`
- Create: `public/media/cases/adote-um-pet/campaign.jpg`
- Create: `public/media/cases/adote-um-pet/solution.jpg`

**Interfaces:**
- Consumes: `Project.caseStudy`.
- Produces: `CaseStudyTemplate({ caseStudy })` and local renderable Figma media.

- [ ] **Step 1: Download the four Figma raw images into their specified local paths**

Use the temporary Figma asset URLs only during download; verify that every
resulting file has a non-zero size.

- [ ] **Step 2: Add the `CaseStudy` data types and Adote um Pet content record**

```ts
caseStudy?: {
  title: string
  year: number
  media: { hero: CaseStudyImage; productPreview: CaseStudyImage }
  solution: { title: string; principles: string[] }
  challenges: Array<{ title: string; body: string }>
  results: Array<{ title: string; body: string }>
}
```

- [ ] **Step 3: Implement `CaseStudyTemplate` using semantic sections and local `next/image` assets**

```tsx
export function CaseStudyTemplate({ caseStudy }: { caseStudy: CaseStudy }) {
  return <article className="case-study">{/* data-driven sections */}</article>
}
```

- [ ] **Step 4: Render the template only when `project.caseStudy` exists and use its metadata title**

```tsx
if (project.caseStudy) return <CaseStudyTemplate caseStudy={project.caseStudy} />
```

- [ ] **Step 5: Set the first hero slide year to `2026`**

- [ ] **Step 6: Run focused tests to verify they pass**

Run: `npm.cmd test -- --test-name-pattern="Adote|featured hero"`

Expected: PASS.

### Task 3: Match the responsive Figma composition

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: the `case-study*` class names emitted by `CaseStudyTemplate`.
- Produces: desktop and mobile layout, colors, typography, visual panels and accessible focus states.

- [ ] **Step 1: Add scoped desktop styling for hero, solution panels, guide, challenges, and results**

```css
.case-study { --case-blue: #284cff; --case-coral: #ed5f2f; }
.case-study__hero { background: var(--case-blush); }
.case-study__challenges { background: var(--case-ink); }
```

- [ ] **Step 2: Add responsive breakpoints that collapse content pairs to one column**

```css
@media (max-width: 48rem) {
  .case-study__hero-grid,
  .case-study__intro-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Run focused route test to verify it remains green**

Run: `npm.cmd test -- --test-name-pattern="Adote"`

Expected: PASS.

### Task 4: Complete verification

**Files:**
- Modify: `tests/starter.test.mjs` only if the generic Fluentify assertions are no longer applicable.

- [ ] **Step 1: Run full test suite**

Run: `npm.cmd test`

Expected: all tests PASS.

- [ ] **Step 2: Run static checks**

Run: `npm.cmd run lint` and `npm.cmd run build`

Expected: both exit with code 0.

- [ ] **Step 3: Check the diff only for intended files**

Run: `git diff --check` and `git status --short`

Expected: no whitespace errors and no unrelated files changed by this work.
