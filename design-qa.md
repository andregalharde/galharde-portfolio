# Design QA — banner “Faça a sua parte” da landing page AdotaPet

- Source visual truth: `C:\Users\andre.galharde\Documents\2026\projetos\gld-portfolio\.qa-artifacts\adotapet-banner-figma-40000020-4473.png`
- Source Figma: `https://www.figma.com/design/5eR4PkGfbo6HwR34VM6Omn/Adote-um-Pet?node-id=40000020-4473`
- Implementation: `/adoteumpet`, banner `aria-label="Convite para adoção"`
- Source pixels and intended CSS viewport: 1440 × 537, density 1
- Implementation screenshot: unavailable because no in-app or external Browser surface is connected
- Density normalization: blocked; there is no current browser-rendered implementation capture

**Full-view comparison evidence**

The Figma node was opened through design context and saved at its natural 1440 × 537 size. The implementation now uses the exact exported Figma SVG contours and masks, the existing source photographs, and the 1440 × 537 frame geometry. A current rendered screenshot could not be captured, so this artifact-level alignment is not a visual sign-off.

**Focused region comparison evidence**

The source region confirms Poppins Bold at 32px/1.35, a 244 × 64 CTA, blue `#284CFF`, coral `#ED5F2F`, peach `#FD9C7B`, and separate masks for the cat and dogs. The matching implementation crop is unavailable, so optical alignment, live image crop, antialiasing and final overlap order cannot be compared side by side.

**Required fidelity surfaces**

- Fonts and typography: source values are implemented, but rendered wrapping and optical weight are unverified.
- Spacing and layout rhythm: the 1440 × 537 frame and source-relative placements are implemented, but current browser geometry is unverified.
- Colors and visual tokens: exact exported SVG colors and the existing blue token are used; rendered color output is unverified.
- Image quality and asset fidelity: source photographs and exact exported Figma vectors/masks are used; live sharpness and crop are unverified.
- Copy and content: heading and CTA copy are preserved exactly.

**Findings**

- [Blocked] Browser-rendered evidence is unavailable.
  - Location: adoption banner on `/adoteumpet`.
  - Evidence: the Figma source is available, but browser discovery returned no connected surfaces.
  - Impact: desktop/mobile layout, CTA interaction, console state and a normalized side-by-side comparison cannot be signed off.
  - Fix: connect the in-app browser or a supported external browser and repeat the capture at 1440px plus the mobile breakpoint.

**Automated evidence**

- Regression test was observed failing before implementation, then passing after the Figma assets and geometry were added.
- Full test suite: 37 passed, 0 failed.
- ESLint: passed.
- Next.js 16.3.2 production build and TypeScript: passed.
- Static route generated: `/adoteumpet`.
- HTTP response before the clean test run: 200 at `/adoteumpet`.
- Primary interactions tested in browser: unavailable.
- Browser console errors checked: unavailable.

**Implementation checklist**

- [x] Replace approximate CSS curves with the exact exported Figma vectors and masks.
- [x] Preserve the source photographs, heading, CTA, icon and anchor target.
- [x] Match the 1440 × 537 source frame and add responsive fallback layout.
- [x] Pass tests, lint, TypeScript and production build.
- [ ] Capture and compare desktop and mobile browser renders.
- [ ] Check CTA focus/hover and console errors in the connected browser.

final result: blocked

---

# Design QA — compact scrolled header

- Source visual truth: `C:\Users\ANDRE~1.GAL\AppData\Local\Temp\codex-clipboard-AMYlHY.png`
- Implementation: `http://localhost:3001/`
- Source pixels: 768 × 441
- Implementation screenshot: unavailable because no Browser surface is connected
- Intended CSS viewport: desktop, at least 712px wide
- Density normalization: not applicable; implementation capture unavailable
- State: page scrolled beyond 16px, `data-scroll-state="scrolled"`

**Full-view comparison evidence**

The source visibly specifies a centered compact header frame labeled `680 × 80 Hug`. The implementation CSS now limits the scrolled frame to `min(calc(100% - 32px), 680px)` while leaving the top state unchanged. A browser-rendered full-view comparison could not be captured.

**Focused region comparison evidence**

The requested header region was inspected in the source image. A matching rendered crop could not be captured, so spacing, typography, colors, logo rendering, image quality, copy, shadow, radius, and optical alignment cannot be signed off visually.

**Findings**

- [Blocked] Browser-rendered evidence is unavailable.
  - Location: scrolled `.site-header__frame`.
  - Evidence: the source image is available, but the in-app Browser reports no connected browser surface.
  - Impact: the computed 680px width, centering, scroll transition, responsive behavior, interactions, and console state cannot be verified visually.
  - Fix: reconnect an in-app or supported external browser and repeat the scrolled-state capture at the matching viewport.

**Automated evidence**

- The focused regression test passed after failing against the previous 1216px and tablet 100% rules.
- Full test suite: 11 passed, 0 failed.
- ESLint: passed.
- Production build: passed.
- Local HTTP response: 200 at `http://localhost:3001/`.
- Primary interactions tested in browser: unavailable.
- Browser console errors checked: unavailable.

**Comparison history**

- Initial static state: scrolled width was capped at 1216px, with a tablet override of 100%.
- Fix: cap changed to 680px and the tablet width override was removed.
- Post-fix visual evidence: blocked because no Browser surface is connected.

**Implementation checklist**

- [x] Preserve the full-width top state.
- [x] Limit only the scrolled header to 680px.
- [x] Keep a 16px responsive gutter on each side below 712px.
- [ ] Capture and compare the rendered scrolled state.
- [ ] Check navigation, CTA, responsive menu, and console in a browser.

final result: blocked

---

# Design QA — página AdotaPet dentro do case Adote um Pet

- Source visual truth: `C:\Users\andre.galharde\Documents\2026\projetos\gld-portfolio\.qa-artifacts\figma-adotapet-home.png`
- Source Figma: `https://www.figma.com/design/5eR4PkGfbo6HwR34VM6Omn/Adote-um-Pet?node-id=309-1751&m=dev`
- Implementation: `http://localhost:3001/projetos/adote-um-pet`
- Desktop implementation screenshot: `C:\Users\andre.galharde\Documents\2026\projetos\gld-portfolio\adotapet-home-desktop-final.png`
- Mobile implementation screenshot: `C:\Users\andre.galharde\Documents\2026\projetos\gld-portfolio\adotapet-home-mobile.png`
- Combined comparison: `C:\Users\andre.galharde\Documents\2026\projetos\gld-portfolio\.qa-artifacts\adotapet-desktop-comparison.png`
- Source pixels: 1440 × 4440
- Desktop implementation pixels: 1425 × 4375 at a 1440 × 900 CSS viewport, `deviceScaleFactor` normalized to CSS scale 1
- Density normalization: implementation resized proportionally to 1440 × 4421 and placed beside the 1440 × 4440 source in a 2880 × 4440 comparison canvas
- Mobile capture: 375 × 6595 content pixels at a 390 × 844 CSS viewport, CSS scale 1
- State: desktop default state with first pet slide, first testimonial slide and first FAQ answer open; mobile default responsive state

**Full-view comparison evidence**

The final 2880 × 4440 side-by-side comparison was inspected at original resolution. The implementation preserves the source hierarchy and section order: rounded hero, search bar, pet carousel, three-step adoption process, overlapping adoption banner, testimonials, FAQ and dark footer. The normalized implementation is 19px shorter than the source, a 0.43% full-page height difference that does not change section hierarchy or density.

**Focused region comparison evidence**

The hero, process cards, adoption banner and FAQ were inspected inside the original-resolution combined image because their typography, icon order, crop and copy remained readable at that scale. The mobile capture was inspected separately because the supplied Figma node has no mobile state; it was used to validate responsive layout safety rather than claim pixel fidelity to an unavailable source breakpoint.

**Required fidelity surfaces**

- Fonts and typography: Poppins is used for display and control text and Inter for body text. Weights, hierarchy, line height and the two-line desktop hero wrapping match the source closely; no truncation or cramped text remains.
- Spacing and layout rhythm: desktop gutters, section order, carousel card density, process grid, banner overlap, FAQ columns and footer proportions follow the 1440px frame. Mobile collapses to a single-column flow without overlap or horizontal page overflow.
- Colors and visual tokens: the implementation maps the source blue `#284CFF`, coral `#ED5F2F`, blush `#FCF5F2`, peach `#FD9B7B` and ink `#0A0D14` directly.
- Image quality and asset fidelity: the hero pet, seven pet cards, banner images, avatars, icons, logos and social marks use exported Figma assets. The banner cat and dogs were corrected to their source positions and retain sharp crops.
- Copy and content: visible headings, labels, pet data, testimonials, FAQ questions, open FAQ answer, email address and footer text now match the source state.

**Findings**

- No actionable P0, P1 or P2 differences remain.
- [P3] The lower hero contour is slightly rounder than the custom Figma contour.
  - Location: AdotaPet hero background.
  - Evidence: the source has a marginally deeper central contour; the implementation uses a responsive CSS radius while preserving the same height and search-bar overlap.
  - Impact: minor decorative difference only; hierarchy and content position are unchanged.
  - Follow-up: replace the responsive radius with a dedicated exported decorative mask only if exact contour parity is required.

The small black Next.js development indicator visible in local captures is a development-only browser overlay and is absent from the production build.

**Comparison history**

1. First pass findings: desktop hero title wrapped to three lines; the process icon colors were in the wrong order; the cat and dogs were reversed in the adoption banner; the sticky portfolio header overlaid the embedded experience.
2. First pass fixes: widened the hero text track, corrected process icon order, swapped the source banner assets and raised the embedded experience stacking context above the outer sticky header.
3. Second pass finding: the first expanded FAQ answer and two visible question labels differed from the Figma state.
4. Second pass fix: synchronized the FAQ copy, repeated source question and coral email link.
5. Post-fix evidence: `adotapet-desktop-comparison.png` shows the revised default state with no remaining P0/P1/P2 differences.

**Interaction and browser evidence**

- Mobile menu opens with `aria-expanded="true"`, exposes the mobile navigation and closes after navigation.
- Pet favorite toggles to `aria-pressed="true"`.
- Pet carousel advances from `--pet-slide: 0` to `--pet-slide: 1`.
- FAQ changes the expanded state from the first to the second question.
- Search accepts `Guarulhos`, preserves the value and scrolls the pet section to the viewport.
- Browser console: 0 errors. Remaining development warnings concern existing outer portfolio images, not the AdotaPet page.
- Local route returned HTTP 200.

**Automated evidence**

- Tests: 27 passed, 0 failed.
- ESLint: passed.
- Next.js 16.3.2 production build and TypeScript: passed.
- Static route generated: `/projetos/adote-um-pet`.

**Implementation checklist**

- [x] Preserve the existing case introduction and route.
- [x] Reproduce every visible Figma section with source assets.
- [x] Implement desktop and mobile responsive layouts.
- [x] Implement navigation, search, carousel, favorite and FAQ interactions.
- [x] Compare source and implementation in one normalized image.
- [x] Resolve all P0/P1/P2 findings.
- [x] Pass tests, lint, build, browser checks and HTTP verification.

final result: passed

---

# Design QA — remoção da faixa de posicionamento da home

- Source visual truth: captura do usuário indicando a faixa preta e seus três textos para remoção completa.
- Implementation: `/`, com o hero novamente posicionado logo abaixo do header.
- Rendered evidence: `.qa-artifacts/home-positioning/home-without-positioning-strip.png`.
- Viewport: 1440 × 1000 desktop, escala CSS 1.

## Evidence

- A captura renderizada confirma que não há faixa preta, textos ou espaço residual entre header e hero.
- O markup não contém `.home-positioning` nem as três copies removidas.
- O CSS base e os estilos responsivos exclusivos da faixa foram excluídos.
- Rotas, hero, logos, projetos, imagens e ordem das demais seções foram preservados.

## Findings

- Nenhuma diferença P0/P1/P2 identificada no escopo da remoção solicitada.

final result: passed

---

# Design QA - AdotaPet full-bleed sections with 1216px content grid

- Source visual truth: `C:\Users\andre.galharde\Documents\2026\projetos\gld-portfolio\.qa-artifacts\figma-adotapet-home.png`
- Implementation: `http://localhost:3000/adoteumpet`
- Implementation screenshot: unavailable because no Browser surface is connected
- Source pixels: 1440 x 4440
- Intended CSS viewport: 1440 x 900 desktop
- Density normalization: unavailable because the current implementation could not be captured
- State: default desktop state

**Full-view comparison evidence**

The source image was opened and confirms full-width hero, FAQ gradient and footer surfaces, with the section content aligned to a centered 1216px grid. The current route returned HTTP 200 and exposes the new internal grid wrappers, but a current rendered screenshot could not be captured for a side-by-side comparison.

**Focused region comparison evidence**

The source hero, FAQ and footer regions were inspected. A matching current implementation crop is unavailable, so the final optical alignment, wrapping, section radii and responsive behavior cannot be signed off visually.

**Required fidelity surfaces**

- Fonts and typography: preserved in code; current browser rendering not captured.
- Spacing and layout rhythm: section content now uses a shared centered 1216px grid; visual comparison is blocked.
- Colors and visual tokens: existing AdotaPet tokens and full-width backgrounds were preserved.
- Image quality and asset fidelity: supplied AdotaPet assets were preserved; current crops were not re-captured.
- Copy and content: existing content and interactions were preserved by the grid-only change.

**Findings**

- [Blocked] Current browser-rendered evidence is unavailable.
  - Location: `/adoteumpet`, especially hero, FAQ and footer.
  - Evidence: the source is available, but the in-app Browser reports no connected browser surface.
  - Impact: desktop and responsive visual fidelity, interactions and browser console state cannot be revalidated after the grid correction.
  - Fix: connect a supported browser and repeat the 1440px and mobile captures against the same source.

**Automated evidence**

- Tests: 28 passed, 0 failed.
- ESLint: passed.
- Next.js 16.3.2 production build and TypeScript: passed.
- HTTP: 200 for `/` and `/adoteumpet`.
- Standalone landing shell: 0 portfolio headers, 0 portfolio footers and 0 outer `adoptapet-route` wrappers.
- Primary interactions tested in browser: unavailable.
- Browser console errors checked: unavailable.

**Comparison history**

1. Previous route layout constrained the entire AdotaPet page to 1216px, including backgrounds and section surfaces.
2. Fix: removed the route-level constraint and added 1216px internal wrappers to hero, pets, process, testimonials, FAQ and footer; the adoption banner remains independently constrained.
3. Post-fix visual evidence: blocked because no Browser surface is connected.

**Implementation checklist**

- [x] Keep page and section backgrounds full width.
- [x] Constrain only internal content to 1216px.
- [x] Preserve the standalone route without the portfolio header and footer.
- [x] Pass tests, lint, build and HTTP checks.
- [ ] Capture desktop and mobile renders and compare them with the source.

final result: blocked

---

# Design QA — seções Logos e Projetos da home

- Source visual truth: `https://www.figma.com/design/341a2M4Ey0nZluritwqE5y/GLD-Portfolio?node-id=126-122&m=dev`
- Source node: `126:122`, com recortes consultados em `156:170` (logos) e `158:170` (projetos)
- Implementation: `http://localhost:3001/`
- Source pixels: frame completo 1440 × 3425; logos 1440 × 608; projetos 1440 × 1329
- Implementation screenshot: indisponível porque nenhuma superfície Browser está conectada
- Intended CSS viewports: desktop 1440px e mobile 390px
- Density normalization: não aplicável; captura renderizada indisponível
- State: home no topo; cards em repouso, hover e foco previstos

**Full-view comparison evidence**

O Figma foi aberto por contexto de design e confirma a grade de logos 3×2, o cabeçalho editorial de projetos e os quatro cards em grade 2×2. A implementação foi servida com HTTP 200, mas não houve captura renderizada para formar uma comparação visual combinada.

**Focused region comparison evidence**

Os dois recortes do Figma foram inspecionados separadamente. A implementação não pôde ser capturada, portanto tipografia, espaçamento, cores, qualidade dos assets, recorte das imagens e copy não podem ser aprovados visualmente nesta execução.

**Findings**

- [Blocked] Evidência renderizada indisponível.
  - Location: `.brand-logos` e `.projects-section`.
  - Evidence: fonte visual do Figma disponível; navegador interno e Chrome retornaram indisponíveis, e a lista de navegadores conectados ficou vazia.
  - Impact: não é possível validar visualmente desktop, mobile, hover, foco ou console.
  - Fix: conectar um navegador compatível ou autorizar uma captura local headless e repetir a comparação nos mesmos viewports.

**Automated evidence**

- Testes: 24 passaram, 0 falharam.
- ESLint: passou.
- Build de produção: passou no Next.js 16.3.2.
- HTTP local: 200 em `http://localhost:3001/`.
- Primary interactions tested in browser: unavailable.
- Browser console errors checked: unavailable.

**Comparison history**

- Initial implementation: não havia seção de logos e os cards usavam o componente genérico anterior.
- Fixes made: assets oficiais do Figma, grade 3×2, cabeçalho editorial, cards 2×2, metadados, CTA circular e breakpoints responsivos.
- Post-fix visual evidence: bloqueada porque nenhum navegador está conectado.

**Implementation checklist**

- [x] Incorporar os seis assets oficiais do Figma.
- [x] Preservar os quatro projetos e suas rotas reais.
- [x] Reproduzir a composição desktop e criar adaptação responsiva.
- [x] Passar testes, lint e build.
- [ ] Capturar desktop 1440px e mobile 390px.
- [ ] Conferir hover, foco e console.
- [ ] Executar comparação visual combinada e fechar P0/P1/P2.

final result: blocked

---

# Latest QA status — AdotaPet page

The detailed AdotaPet report above is the latest completed build QA. Its source, desktop and mobile captures, normalized side-by-side comparison, viewport and density data, interaction checks, comparison history, findings and automated evidence remain authoritative. The unrelated historical blocked reports are preserved for traceability and do not apply to the AdotaPet page.

Source visual truth: `.qa-artifacts/figma-adotapet-home.png`
Implementation screenshot: `adotapet-home-desktop-final.png`
Combined evidence: `.qa-artifacts/adotapet-desktop-comparison.png`
Mobile evidence: `adotapet-home-mobile.png`
Viewport: 1440 × 900 desktop and 390 × 844 mobile
State: desktop default source state; responsive mobile default state
Result basis: no actionable P0/P1/P2 findings remain; 27 tests, ESLint, production build, browser interactions, console error check and HTTP 200 all passed.

final result: passed

---

# Latest QA status - AdotaPet 1216px grid correction

The detailed `AdotaPet full-bleed sections with 1216px content grid` report above is the current QA record. Automated checks pass, but the post-fix implementation screenshot, matched desktop/mobile comparison, interaction pass and console check remain unavailable because no Browser surface is connected.

---

# Design QA — detalhe Xereta e interesse de adoção

Date: 2026-09-01

## Scope

- Figma detail source: node `309:1912` in `Adote um Pet`.
- Figma dialog reference: node `309:1979`, adapted to the approved adoption-interest form.
- Implementation: `/adoteumpet/xereta`, linked from the Xereta feature on `/adoteumpet`.

## Automated evidence

- `npm.cmd test`: 45/45 tests passed.
- `npm.cmd run lint`: exit 0 with no reported errors.
- `npm.cmd run build`: exit 0; `/adoteumpet/xereta` generated as a static route.
- Live checks on the current development server at `http://localhost:3001`:
  - `/adoteumpet`: HTTP 200.
  - `/adoteumpet/xereta`: HTTP 200 and contains the Xereta copy.
  - `/media/cases/adote-um-pet/xereta/xereta-gallery-1.png`: HTTP 200.
- Exact gallery, related-pet, modal-photo, and selected SVG bytes were downloaded from the temporary Figma asset endpoints into `public/media/cases/adote-um-pet/xereta/`.

## Browser boundary

No in-app or extension browser was connected in this session. Desktop/mobile screenshots, implementation-versus-Figma visual comparison, landing-to-detail navigation, modal focus restoration, `Escape`/backdrop close, validation/success interaction, scroll locking, and browser-console inspection remain unverified in a rendered browser. Build and HTTP success are not being treated as visual evidence.

Port 3000 was already occupied, so the current verified development instance started on port 3001.

final result: blocked


---

# Latest QA status � About circular gallery (2026-09-14)

Scope: only the photo slider on /sobre. Source: user screenshot codex-clipboard-MbNABM.png. Full evidence, viewport normalization limits, screenshots, interaction checks and validation are recorded in docs/qa/about-gallery-circle.md. Earlier reports above remain preserved for their own scopes.

final result: passed

