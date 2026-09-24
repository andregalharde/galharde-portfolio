# GLD Portfolio Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the neutral Next.js starter into André Galharde's data-driven portfolio with four complete case studies and a `/sobre` page.

**Architecture:** Keep project content in a typed `lib/projects.ts` module and render each case through `app/projetos/[slug]/page.tsx`. Components receive data-only props; local assets live in `public/media`, and shared navigation links directly to the existing PDF rather than a fabricated page.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Node test runner, ESLint.

**Spec:** `docs/superpowers/specs/2026-08-22-gld-portfolio-migration-design.md`

## Global Constraints

- Do not modify `C:\Users\andre.galharde\Documents\2026\projetos\galharde.portfolio`.
- Do not use Bootstrap, its assets, classes, scripts, or the old layout.
- Migrate only existing copy, assets, case data, curriculum and links; do not invent content.
- The curriculum menu item must link to the migrated `curriculo-galharde-designer.pdf`.
- All cases use the same dynamic page template and a central data source.
- Preserve normal written capitalization in the primary navigation.

---

### Task 1: Establish testable portfolio data and static assets

**Files:**
- Create: `lib/projects.ts`
- Create: `tests/projects.test.mjs`
- Create: `public/media/projects/*`
- Create: `public/documentos/curriculo-galharde-designer.pdf`

**Interfaces:**
- Produces: `projects`, `getProjectBySlug(slug)`, `Project` and `ProjectGallery` exports.
- Consumes: source-only text, links, PDF and image files from `galharde.portfolio`.

- [ ] **Step 1: Write the failing data contract test**

```js
const projectModule = await import("../lib/projects.ts")
assert.equal(projectModule.projects.length, 4)
assert.deepEqual(projectModule.projects.map((project) => project.slug), [
  "fluentify", "casa-nova", "ui-boost-app", "ui-boost-landing-page",
])
assert.equal(projectModule.getProjectBySlug("missing"), undefined)
```

- [ ] **Step 2: Run the contract test and verify it fails because the data module is absent.**

Run: `node --test tests/projects.test.mjs`

- [ ] **Step 3: Copy only approved local assets and implement the data module.**

```ts
export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}
```

Each record contains exactly the source copy, project year/type, cover and hero image, text sections, galleries and any existing external prototype URL.

- [ ] **Step 4: Run the contract test.**

Run: `node --test tests/projects.test.mjs`

- [ ] **Step 5: Commit the data and media migration.**

```bash
git add lib/projects.ts tests/projects.test.mjs public/media public/documentos
git commit -m "feat: add portfolio project data"
```

### Task 2: Build reusable project-card and gallery components

**Files:**
- Create: `components/project-card.tsx`
- Create: `components/project-gallery.tsx`
- Modify: `tests/starter.test.mjs`

**Interfaces:**
- Consumes: `Project` and `ProjectGallery` from `lib/projects.ts`.
- Produces: `ProjectCard` and `ProjectGallery` server components with meaningful image alt text.

- [ ] **Step 1: Write failing rendered-HTML assertions for the project grid and a gallery section.**

```js
assert.match(homeHtml, /Fluentify/)
assert.match(homeHtml, /href="\/projetos\/fluentify"/)
assert.match(caseHtml, /Moodboard/)
assert.match(caseHtml, /alt="Moodboard 1"/)
```

- [ ] **Step 2: Run the focused test and verify it fails before the components and routes exist.**

Run: `node --test tests/starter.test.mjs`

- [ ] **Step 3: Implement presentational components using `next/image`, `Link`, existing `Container` and semantic figures.**

```tsx
export function ProjectGallery({ title, images }: ProjectGalleryProps) {
  return <section aria-labelledby={id}>{/* figures rendered from images */}</section>
}
```

- [ ] **Step 4: Run the focused test.**

Run: `node --test tests/starter.test.mjs`

- [ ] **Step 5: Commit the reusable presentation layer.**

```bash
git add components/project-card.tsx components/project-gallery.tsx tests/starter.test.mjs
git commit -m "feat: add reusable project presentation"
```

### Task 3: Render the portfolio home and case template

**Files:**
- Modify: `app/page.tsx`
- Create: `app/projetos/[slug]/page.tsx`
- Modify: `tests/starter.test.mjs`

**Interfaces:**
- Consumes: `projects` and `getProjectBySlug` plus the two project components.
- Produces: static home and all four static project routes.

- [ ] **Step 1: Extend the rendered-HTML test for all four route statuses, title/copy source and invalid slug behavior.**

```js
for (const slug of ["fluentify", "casa-nova", "ui-boost-app", "ui-boost-landing-page"]) {
  assert.equal((await fetch(`${baseUrl}/projetos/${slug}`)).status, 200)
}
assert.equal((await fetch(`${baseUrl}/projetos/inexistente`)).status, 404)
```

- [ ] **Step 2: Run the test and verify it fails because the dynamic route does not exist.**

Run: `node --test tests/starter.test.mjs`

- [ ] **Step 3: Implement one dynamic route with static params, awaited params, metadata and `notFound`.**

```tsx
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProjectBySlug((await params).slug)
  if (!project) notFound()
  return <ProjectTemplate project={project} />
}
```

- [ ] **Step 4: Replace the starter home with source-backed introduction and four `ProjectCard` instances.**

- [ ] **Step 5: Run the full rendered-HTML test.**

Run: `node --test tests/starter.test.mjs`

- [ ] **Step 6: Commit the routes.**

```bash
git add app/page.tsx app/projetos/[slug]/page.tsx tests/starter.test.mjs
git commit -m "feat: add portfolio case routes"
```

### Task 4: Add profile, navigation, metadata and portfolio-specific visual composition

**Files:**
- Create: `app/sobre/page.tsx`
- Modify: `components/layout/header.tsx`
- Modify: `components/layout/footer.tsx`
- Modify: `app/layout.tsx`
- Modify: `lib/site-config.ts`
- Modify: `app/globals.css`
- Modify: `tests/starter.test.mjs`

**Interfaces:**
- Consumes: profile copy, contact URLs and CV URL defined as constants.
- Produces: `/sobre`, navigation to projects/about/CV/contact and portfolio metadata.

- [ ] **Step 1: Add failing assertions for `/sobre`, the external PDF URL, Behance, LinkedIn, e-mail, absence of the starter brand and non-uppercase navigation.**

```js
assert.match(aboutHtml, /Experi.ncia Profissional/)
assert.match(homeHtml, /href="\/documentos\/curriculo-galharde-designer\.pdf"/)
assert.doesNotMatch(css, /text-transform:\s*uppercase/)
```

- [ ] **Step 2: Run the test and verify it fails while the starter shell remains.**

Run: `node --test tests/starter.test.mjs`

- [ ] **Step 3: Implement `/sobre` only with source profile data, then update shared layout, site config and CSS tokens/composition.**

```tsx
<a href="/documentos/curriculo-galharde-designer.pdf" target="_blank" rel="noreferrer">
  Currículo
</a>
```

- [ ] **Step 4: Run the full Node test suite and lint.**

Run: `npm test; npm run lint`

- [ ] **Step 5: Commit the portfolio shell.**

```bash
git add app/sobre/page.tsx components/layout app/layout.tsx lib/site-config.ts app/globals.css tests/starter.test.mjs
git commit -m "feat: complete portfolio navigation and profile"
```

### Task 5: Verify the finished portfolio

**Files:**
- Modify: `tests/starter.test.mjs` only if an assertion needed for a verified requirement is missing.

- [ ] **Step 1: Run every automated verification.**

Run: `npm test; npm run lint; npm run build`

- [ ] **Step 2: Start the local server and verify `/`, `/sobre`, all four case URLs and the PDF return the expected HTTP status.**

Run: `npm run dev`

- [ ] **Step 3: Check the pages in a browser at mobile and desktop widths, including keyboard focus and the external curriculum link.**

- [ ] **Step 4: Commit final verification-only test updates, if any.**

```bash
git add tests/starter.test.mjs
git commit -m "test: verify portfolio migration"
```

