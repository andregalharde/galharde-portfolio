# AdotaPet Xereta Detail Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved `/adoteumpet/xereta` pet-detail page, link Xereta from the landing page, and provide an accessible local-only adoption-interest dialog.

**Architecture:** Extract the existing AdotaPet header, footer, fonts, and page surface into a shared client shell without changing their rendered content. Render the new static route with a focused client detail component and CSS Module; keep validation in a small pure module so behavior can be tested without a browser.

**Tech Stack:** Next.js 16.3 App Router, React 19, TypeScript, CSS Modules, `next/image`, `next/link`, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-01-adotapet-xereta-detail-design.md`

## Global Constraints

- Read the relevant local Next.js 16.3 documentation in `node_modules/next/dist/docs/` before changing route, link, image, client-component, or CSS behavior.
- Preserve the existing `/adoteumpet` header and footer appearance, copy, links, mobile menu, and scroll state.
- Keep `/projetos/adote-um-pet` unchanged and keep `/adoteumpet/xereta` static rather than introducing a generic `[slug]` route.
- Store exact Figma exports under `public/media/cases/adote-um-pet/xereta/`; do not overwrite existing assets or retain temporary Figma URLs.
- Submission remains local-only: no backend, database, email delivery, authentication, or external form service.
- Use the exact approved Portuguese copy and preserve 16px mobile gutters and 44px minimum touch targets.

---

### Task 1: Shared AdotaPet shell and landing link

**Files:**
- Create: `components/adoptapet-shell.tsx`
- Modify: `components/adoptapet-product-page.tsx`
- Modify: `components/adoptapet-product-page.module.css`
- Test: `tests/starter.test.mjs`

**Interfaces:**
- Produces: `AdoptapetShell({ children, ariaLabel })`, `AdoptapetIcon({ name, className })`.
- Consumes: existing `adoptapet-product-page.module.css` class names and `/media/cases/adote-um-pet/landing` assets.

- [ ] **Step 1: Write the failing integration test**

```js
test("shares the AdotaPet shell and links Xereta to its detail route", async () => {
  const response = await fetch(`${baseUrl}/adoteumpet`)
  const html = await response.text()

  assert.equal(response.status, 200)
  assert.match(html, /<a(?=[^>]*href="\/adoteumpet\/xereta")(?=[^>]*aria-label="Conhecer Xereta")[^>]*>/)
  assert.equal((html.match(/<header[^>]+data-scroll-state="top"/g) ?? []).length, 1)
  assert.equal((html.match(/<footer/g) ?? []).length, 1)
})
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm.cmd test -- --test-name-pattern="shares the AdotaPet shell"`

Expected: FAIL because the landing Xereta feature is not a route link.

- [ ] **Step 3: Extract the shell and add the route link**

```tsx
export function AdoptapetShell({ children, ariaLabel }: AdoptapetShellProps) {
  return (
    <section className={`adoptapet-page ${styles.page} ${poppins.variable} ${inter.variable}`} aria-label={ariaLabel}>
      <AdoptapetHeader />
      {children}
      <AdoptapetFooter />
    </section>
  )
}
```

Use `next/link` for the Xereta feature and keep the current hero layout class on the link.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npm.cmd test -- --test-name-pattern="shares the AdotaPet shell"`

Expected: PASS.

### Task 2: Static Xereta route, exact content, and local assets

**Files:**
- Create: `app/adoteumpet/xereta/page.tsx`
- Create: `components/adoptapet-xereta-page.tsx`
- Create: `components/adoptapet-xereta-page.module.css`
- Create: `public/media/cases/adote-um-pet/xereta/xereta-gallery-1.png`
- Create: `public/media/cases/adote-um-pet/xereta/xereta-gallery-2.png`
- Create: `public/media/cases/adote-um-pet/xereta/xereta-gallery-3.png`
- Create: `public/media/cases/adote-um-pet/xereta/xereta-gallery-4.png`
- Create: `public/media/cases/adote-um-pet/xereta/rainha.png`
- Create: `public/media/cases/adote-um-pet/xereta/perigosa.png`
- Create: `public/media/cases/adote-um-pet/xereta/charlote.png`
- Create: selected exact SVG exports under `public/media/cases/adote-um-pet/xereta/`
- Test: `tests/starter.test.mjs`

**Interfaces:**
- Consumes: `AdoptapetShell`, `AdoptapetIcon`, exact Figma node `309:1912` exports.
- Produces: static route `/adoteumpet/xereta` and `AdoptapetXeretaPage`.

- [ ] **Step 1: Write the failing route/content test**

```js
test("publishes the Figma-backed Xereta detail route", async () => {
  const response = await fetch(`${baseUrl}/adoteumpet/xereta`)
  const html = await response.text()

  assert.equal(response.status, 200)
  for (const copy of ["Xereta", "Persa", "3 meses", "Caramelo", "Fêmea", "Vila Venditti, Guarulhos", "Pets Relacionados", "Rainha", "Perigosa", "Charlote"]) {
    assert.ok(html.includes(copy), `detail must render ${copy}`)
  }
  assert.match(html, /href="\/adoteumpet"/)
  assert.equal((html.match(/\/media\/cases\/adote-um-pet\/xereta\//g) ?? []).length >= 7, true)
})
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm.cmd test -- --test-name-pattern="Figma-backed Xereta"`

Expected: FAIL with HTTP 404.

- [ ] **Step 3: Download the exact Figma bytes and implement the static page**

Create the 1216px content grid, semantic breadcrumb, detail attributes, 2x2 gallery, address/about row, and three related-pet articles. Use `next/image` with explicit dimensions or `fill` inside dimensioned containers.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npm.cmd test -- --test-name-pattern="Figma-backed Xereta"`

Expected: PASS.

### Task 3: Accessible adoption-interest dialog

**Files:**
- Create: `lib/adoption-interest.ts`
- Create: `public/media/cases/adote-um-pet/xereta/adoption-dialog.jpg`
- Modify: `components/adoptapet-xereta-page.tsx`
- Modify: `components/adoptapet-xereta-page.module.css`
- Test: `tests/xereta.test.mjs`
- Test: `tests/starter.test.mjs`

**Interfaces:**
- Produces: `validateAdoptionInterest(values: AdoptionInterestValues): AdoptionInterestErrors`.
- Consumes: fields `name`, `email`, `phone`, `message`; exact Figma node `309:1979` image.

- [ ] **Step 1: Write failing unit tests for validation**

```js
test("requires identity fields and validates email", async () => {
  const { validateAdoptionInterest } = await import("../lib/adoption-interest.ts")
  assert.deepEqual(validateAdoptionInterest({ name: "", email: "bad", phone: "", message: "texto" }), {
    name: "Informe seu nome.",
    email: "Informe um e-mail válido.",
    phone: "Informe seu telefone.",
  })
})
```

- [ ] **Step 2: Run the unit test and verify RED**

Run: `node --test tests/xereta.test.mjs`

Expected: FAIL because `lib/adoption-interest.ts` does not exist.

- [ ] **Step 3: Implement minimal validation**

```ts
export function validateAdoptionInterest(values: AdoptionInterestValues): AdoptionInterestErrors {
  const errors: AdoptionInterestErrors = {}
  if (!values.name.trim()) errors.name = "Informe seu nome."
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = "Informe um e-mail válido."
  if (!values.phone.trim()) errors.phone = "Informe seu telefone."
  return errors
}
```

- [ ] **Step 4: Run the unit test and verify GREEN**

Run: `node --test tests/xereta.test.mjs`

Expected: PASS.

- [ ] **Step 5: Write the failing rendered integration contract for the dialog**

```js
test("implements the local-only accessible adoption dialog", async () => {
  const response = await fetch(`${baseUrl}/adoteumpet/xereta`)
  const html = await response.text()
  assert.match(html, /<dialog(?=[^>]*aria-labelledby="adoption-dialog-title")[^>]*>/)
  assert.match(html, /Quero adotar a Xereta/)
  assert.match(html, /name="name"/)
  assert.match(html, /name="email"/)
  assert.match(html, /name="phone"/)
  assert.match(html, /Enviar interesse/)
  assert.doesNotMatch(html, /<form[^>]+action=/)
})
```

- [ ] **Step 6: Implement modal lifecycle and local success state**

Use trigger and close-button refs, restore focus on close, listen for `Escape`, lock `document.body.style.overflow`, close on intentional backdrop clicks, preserve values on validation errors, and clear values only after success.

- [ ] **Step 7: Run dialog and route tests**

Run: `node --test tests/xereta.test.mjs`

Run: `npm.cmd test -- --test-name-pattern="adoption dialog|Figma-backed Xereta"`

Expected: PASS.

### Task 4: Responsive contracts and full verification

**Files:**
- Modify: `components/adoptapet-xereta-page.module.css`
- Modify: `design-qa.md`
- Test: `tests/starter.test.mjs`

**Interfaces:**
- Consumes: completed page and dialog.
- Produces: desktop, tablet, and mobile responsive contracts plus recorded QA boundary.

- [ ] **Step 1: Write the failing CSS contract test**

```js
test("keeps the Xereta page responsive", async () => {
  const css = await readFile(new URL("../components/adoptapet-xereta-page.module.css", import.meta.url), "utf8")
  assert.match(css, /grid-template-columns:\s*416px\s+1fr/)
  assert.match(css, /@media\s*\(max-width:\s*700px\)/)
  assert.match(css, /width:\s*calc\(100%\s*-\s*32px\)/)
  assert.match(css, /min-height:\s*44px/)
})
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm.cmd test -- --test-name-pattern="keeps the Xereta page responsive"`

Expected: FAIL until all responsive contracts are present.

- [ ] **Step 3: Complete responsive CSS and verify GREEN**

Run: `npm.cmd test -- --test-name-pattern="keeps the Xereta page responsive"`

Expected: PASS.

- [ ] **Step 4: Run full automated validation**

Run: `npm.cmd test`

Run: `npm.cmd run lint`

Run: `npm.cmd run build`

Expected: all commands exit 0 without new warnings.

- [ ] **Step 5: Run HTTP and browser validation**

Start the project with Node 22.22.3, verify HTTP 200 for `/adoteumpet` and `/adoteumpet/xereta`, then check desktop/mobile page screenshots, landing-to-detail navigation, dialog open/close/focus restoration, validation, success, and console output in a connected browser. Record any unavailable boundary in `design-qa.md`.
