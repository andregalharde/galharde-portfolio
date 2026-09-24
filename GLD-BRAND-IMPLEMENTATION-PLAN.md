# GLD Brand System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the GLD home and four case-study pages to use the supplied GLD brand system while keeping every existing content string and route intact.

**Architecture:** Centralize brand tokens, typography, responsive layout, interaction, and accessibility in `app/globals.css`. Keep components semantic and data-driven; add only stable styling hooks. Use the existing Node-render test suite to protect page semantics, route coverage, case sequence, and metadata while production builds and rendered routes verify the result.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS, Node built-in test runner, vinext/Cloudflare Workers.

## Global Constraints

- Preserve all existing Portuguese copy, the four `case-0N` routes, case order, and project data.
- Use `#F7F1E7`, `#FFFFFF`, `#181714`, `#25221E`, `#D8CDBB`, `#EFE1C8`, `#D6A33D`, and `#E73D16` as the complete palette.
- Use Satoshi with Inter fallback for display type; Geist with Inter fallback for body and interface type.
- Constrain content to 1280px with 64px/32px/24px desktop/tablet/mobile margins.
- Use 8px, 12px, or 20px radii; prefer 1px subtle borders over shadows.
- Preserve visible focus, 44px targets, WCAG-AA-minded contrast, and reduced motion.
- Limit motion to 180–300ms ease-out, 4px travel, and 1.02 scale maximum.

## Task 1: Protect semantic layout hooks

**Files:** Modify `app/page.tsx`; Modify `tests/rendered-html.test.mjs`.

**Interfaces:** The home page emits `data-brand-surface="warm"`; the rendered-worker test verifies it while retaining one `<h1>`.

- [ ] **Step 1: Write the failing test**

```js
test("home keeps its semantic landmark and a single page heading", async () => {
  const response = await render("/");
  const html = await response.text();
  assert.match(html, /<main[^>]*>/i);
  assert.equal((html.match(/<h1(?:\s[^>]*)?>/gi) ?? []).length, 1);
  assert.match(html, /data-brand-surface="warm"/i);
});
```

- [ ] **Step 2: Verify red**

Run `npm run build && node --test --test-name-pattern="single page heading" tests/rendered-html.test.mjs`.

Expected: FAIL because `data-brand-surface="warm"` is absent.

- [ ] **Step 3: Implement minimal hook**

Change the home wrapper in `app/page.tsx` to `<main data-brand-surface="warm">`. Do not change headings, copy, hrefs, or section order.

- [ ] **Step 4: Verify green**

Run the focused command again. Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx tests/rendered-html.test.mjs
git commit -m "test: protect GLD portfolio visual structure"
```

## Task 2: Establish GLD tokens, typography, and responsive foundation

**Files:** Modify `app/layout.tsx`; Modify `app/globals.css`; Modify `tests/rendered-html.test.mjs`.

**Interfaces:** The body emits `--font-geist-sans` and `--font-satoshi`; CSS exports `--color-*`, typography, radius, border, shadow, and motion tokens for every route.

- [ ] **Step 1: Write the failing test**

```js
test("home emits the GLD display and body font variables", async () => {
  const response = await render("/");
  const html = await response.text();
  assert.match(html, /--font-geist-sans/i);
  assert.match(html, /--font-satoshi/i);
});
```

- [ ] **Step 2: Verify red**

Run `npm run build && node --test --test-name-pattern="display and body font variables" tests/rendered-html.test.mjs`.

Expected: FAIL because `--font-satoshi` is absent.

- [ ] **Step 3: Implement tokens and type**

In `app/layout.tsx`, add `--font-satoshi` as the guideline fallback stack (`Inter`, then sans-serif) unless a licensed local `public/fonts/Satoshi-Variable.woff2` asset exists; retain Geist for `--font-geist-sans`. Do not download an unlicensed font.

Replace the top-level CSS variables in `app/globals.css` with:

```css
:root {
  --color-action: #E73D16;
  --color-text: #181714;
  --color-graphite: #25221E;
  --color-bg-warm: #F7F1E7;
  --color-bg-white: #FFFFFF;
  --color-stone: #D8CDBB;
  --color-parchment: #EFE1C8;
  --color-saffron: #D6A33D;
  --font-display: var(--font-satoshi), "Inter", sans-serif;
  --font-body: var(--font-geist-sans), "Inter", sans-serif;
  --radius-sm: 8px; --radius-md: 12px; --radius-lg: 20px;
  --border-subtle: rgba(24, 23, 20, 0.12);
  --border-strong: rgba(24, 23, 20, 0.24);
  --shadow-soft: 0 16px 48px rgba(24, 23, 20, 0.08);
  --motion-fast: 180ms; --motion-default: 240ms; --motion-slow: 300ms;
}
```

Use `--color-bg-warm`, `--color-text`, and `--font-body` for `body`; use 1280px maximum width and 64px/32px/24px margins at desktop/tablet/mobile. Make focus visibly terracotta, preserve touch targets, and suppress smooth scroll plus non-essential transitions for `prefers-reduced-motion`.

- [ ] **Step 4: Verify green and regression suite**

Run the focused command, then `npm test`. Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/globals.css tests/rendered-html.test.mjs
git commit -m "feat: add GLD brand foundations"
```

## Task 3: Restyle shared components and the home

**Files:** Modify `app/page.tsx`; Modify `app/components/CaseCard.tsx`; Modify `app/components/SiteHeader.tsx`; Modify `app/components/SiteFooter.tsx`; Modify `app/globals.css`; Modify `tests/rendered-html.test.mjs`.

**Interfaces:** `CaseCard` emits `data-case-tone`; the hero uses a `hero-case` presentation and `cases-grid` keeps exactly four repeated case cards.

- [ ] **Step 1: Write the failing test**

```js
test("home presents the selected cases as an editorial list", async () => {
  const response = await render("/");
  const html = await response.text();
  assert.match(html, /class="cases-grid"/i);
  assert.equal((html.match(/class="case-card/g) ?? []).length, 4);
  assert.match(html, /class="hero-case"/i);
});
```

- [ ] **Step 2: Verify red**

Run `npm run build && node --test --test-name-pattern="editorial list" tests/rendered-html.test.mjs`.

Expected: FAIL because the current hero duplicates the `case-card` component.

- [ ] **Step 3: Implement home presentation**

In `app/page.tsx`, replace the hero `CaseCard` with a dedicated `hero-case` article based on `caseStudies[0]`. Preserve the existing title, category, year, summary, index, text, and href. In `CaseCard.tsx`, add `data-case-tone={study.tone}` to the `<article>` and retain its accessible anchor label. Do not change text in header/footer.

In CSS: make the header a 1px subtle-divider 88px bar; use display type for brand/headings and short Geist labels; use a spacious editorial hero; alternate warm and white home surfaces; make cards white with 12px radii, subtle borders, no default shadows, 24px padding, two desktop columns/one mobile column, and only a 2px upward hover; make contact parchment with the email as its only terracotta action. Use terracotta for interaction and identity—not bodies of text.

- [ ] **Step 4: Verify green and quality checks**

Run the focused command, then `npm run lint && npm test`. Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/components/SiteHeader.tsx app/components/SiteFooter.tsx app/components/CaseCard.tsx app/globals.css tests/rendered-html.test.mjs
git commit -m "feat: restyle GLD home and shared components"
```

## Task 4: Apply the GLD system to all case pages

**Files:** Modify `app/cases/[slug]/page.tsx`; Modify `app/globals.css`; Modify `tests/rendered-html.test.mjs`.

**Interfaces:** Case routes retain their data contract but map legacy `tone` values to `parchment`, `warm`, `saffron`, and `graphite` canvas surfaces.

- [ ] **Step 1: Write the failing test**

Add inside the existing every-case test:

```js
assert.match(html, /class="case-page"/i, `${slug}: GLD case layout`);
assert.match(html, /class="project-canvas"[^>]+data-tone=/i, `${slug}: project canvas tone`);
assert.match(html, /class="case-editorial"/i, `${slug}: editorial content`);
```

- [ ] **Step 2: Verify red**

Run `npm run build && node --test --test-name-pattern="every GLD case study contract" tests/rendered-html.test.mjs`.

Expected: FAIL because these structure assertions do not yet exist.

- [ ] **Step 3: Implement case-study presentation**

In `app/cases/[slug]/page.tsx`, retain all content and ordered headings/lists but map canvas data-tone as follows: `lime` to `parchment`, `violet` to `warm`, `coral` to `saffron`, and `blue` to `graphite`.

In CSS: use a spacious display masthead, compact Geist metadata, 20px project canvases, a 12-column editorial grid whose content occupies columns 5–12, 1px subtle dividers, touch-friendly role rows, and a graphite next-case surface with terracotta arrow. At 760px collapse case editorial and next-case grids to one column while preserving a 24px minimum side margin. Do not use old lime, violet, coral, or blue colors.

- [ ] **Step 4: Verify green and regression suite**

Run the focused command, then `npm run lint && npm test`. Expected: PASS for all four routes.

- [ ] **Step 5: Commit**

```bash
git add app/cases/[slug]/page.tsx app/globals.css tests/rendered-html.test.mjs
git commit -m "feat: apply GLD system to case studies"
```

## Task 5: Validate, save, and privately deploy

**Files:** Verify `app/globals.css`, `app/page.tsx`, `app/cases/[slug]/page.tsx`, and `tests/*.test.mjs`.

**Interfaces:** The final source branch is `main`; the existing Sites project is `appgprj_6a578303b6ec8191a20eee07f7dfa260`.

- [ ] **Step 1: Run full verification**

Run `npm run lint && npm test && npm run build`. Expected: all commands exit 0.

- [ ] **Step 2: Inspect responsiveness and accessibility**

Inspect the built home and all four case routes at desktop and mobile widths. Confirm margins, text contrast, focus visibility, GLD-only surfaces, terracotta limited to action/interaction, and reduced-motion behavior.

- [ ] **Step 3: Save and deploy**

Push the exact `main` commit with a short-lived Sites source credential, save it as a new version, then use the owner-only deployment method for project `appgprj_6a578303b6ec8191a20eee07f7dfa260`. Confirm deployment status is `succeeded` before reporting the URL.

- [ ] **Step 4: Commit only if verification changed source**

```bash
git status --short
git add <only-files-changed-during-verification>
git commit -m "chore: finalize GLD brand system"
```

If verification changes no source files, do not create an empty commit.

