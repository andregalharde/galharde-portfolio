import assert from "node:assert/strict"
import { after, before, test } from "node:test"
import { spawn } from "node:child_process"
import { once } from "node:events"
import { readFile } from "node:fs/promises"
import path from "node:path"

const hostname = "127.0.0.1"
const port = 4317
const baseUrl = process.env.TEST_BASE_URL ?? `http://${hostname}:${port}`
let server
let serverOutput = ""

async function waitForServer() {
  const timeoutAt = Date.now() + 30_000

  while (Date.now() < timeoutAt) {
    if (server?.exitCode !== null) {
      throw new Error(`Next.js exited before becoming ready.\n${serverOutput}`)
    }

    try {
      const response = await fetch(baseUrl)
      if (response.ok) return
    } catch {
      // The development server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 250))
  }

  throw new Error(`Timed out waiting for Next.js.\n${serverOutput}`)
}

before(async () => {
  if (process.env.TEST_BASE_URL) {
    assert.equal((await fetch(baseUrl)).status, 200, "The supplied test server must be ready")
    return
  }
  const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next")
  server = spawn(process.execPath, [nextBin, "dev", "--hostname", hostname, "--port", String(port)], {
    cwd: process.cwd(),
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
    stdio: ["ignore", "pipe", "pipe"],
  })

  server.stdout.on("data", (chunk) => {
    serverOutput += chunk.toString()
  })
  server.stderr.on("data", (chunk) => {
    serverOutput += chunk.toString()
  })

  await waitForServer()
})

after(async () => {
  if (!server || server.exitCode !== null) return

  const exited = once(server, "exit")
  server.kill()
  await exited
})

test("publishes the home hero and preserves generated project routes", async () => {
  const paths = [
    "/",
    "/projetos/adote-um-pet",
    "/projetos/casa-nova",
    "/projetos/ui-boost-app",
    "/projetos/ui-boost-landing-page",
    "/projetos/unknown-project",
  ]
  const responses = await Promise.all(paths.map((route) => fetch(`${baseUrl}${route}`)))
  const [home, fluentify, casaNova, uiBoostApp, uiBoostLanding, missing] = responses
  const [homeHtml, fluentifyHtml, casaNovaHtml, uiBoostAppHtml, uiBoostLandingHtml] = await Promise.all([
    home.text(),
    fluentify.text(),
    casaNova.text(),
    uiBoostApp.text(),
    uiBoostLanding.text(),
  ])

  assert.equal(home.status, 200)
  assert.equal(fluentify.status, 200)
  assert.equal(casaNova.status, 200)
  assert.equal(uiBoostApp.status, 200)
  assert.equal(uiBoostLanding.status, 200)
  assert.equal(missing.status, 404)
  const projectHrefs = [...new Set(
    [...homeHtml.matchAll(/<a[^>]*href="(\/projetos\/[^"]+)"[^>]*>/g)].map((match) => match[1]),
  )].sort()
  assert.deepEqual(projectHrefs, [
    "/projetos/adote-um-pet",
    "/projetos/casa-nova",
    "/projetos/ui-boost-app",
  ])
  assert.match(homeHtml, /Adote um Pet/)
  assert.match(homeHtml, /data-brand-surface="warm"/)
  assert.equal((homeHtml.match(/<h1(?:\s[^>]*)?>/gi) ?? []).length, 1)
  assert.match(homeHtml, /data-home-hero/)
  assert.equal((homeHtml.match(/data-editorial="true"/g) ?? []).length, 3)
  assert.match(fluentifyHtml, /class="case-study"/)
  assert.match(fluentifyHtml, /Adote um Pet/)
  assert.match(fluentifyHtml, /Case 01/)
  assert.match(fluentifyHtml, /produto digital/)
  assert.match(fluentifyHtml, /2026/)
  assert.match(fluentifyHtml, /\/media\/cases\/adote-um-pet\/hero\.jpg/)
  assert.match(casaNovaHtml, /alt="Grid Desktop"/)
  for (const value of ["12", "72px", "32px", "Barlow Regular", "Inter Regular"]) {
    assert.ok(casaNovaHtml.includes(value), `Casa Nova must render ${value}`)
  }
  const colorUsage =
    "A cor Primary: usada nas interações, botão de CTA, a cor Secondary: usada em assets visuais e a cor Neutral: usada nos títulos em fundos claros e escuros."
  for (const [label, html, primaryColors] of [
    ["UI Boost APP", uiBoostAppHtml, ["#EE56BB", "#F974CC", "#FF9FDE"]],
    ["UI Boost Landing Page", uiBoostLandingHtml, ["#E7564D", "#FE5F55", "#FFCDCA"]],
  ]) {
    assert.match(html, /class="case-page"/, `${label} must use the GLD case layout`)
    assert.match(html, /class="[^"]*project-canvas[^"]*"[^>]+data-tone=/, `${label} must use a branded project canvas`)
    assert.match(html, /class="[^"]*case-editorial[^"]*"/, `${label} must use editorial case content`)
    assert.ok(html.includes(colorUsage), `${label} must render its source color-usage paragraph`)
    for (const value of [
      ...primaryColors,
      "Secondary",
      "#6818D1",
      "#721AE6",
      "#D3B8F7",
      "Neutral",
      "#313131",
      "#626262",
      "#939393",
      "Negative",
      "#DE3961",
      "#F64F77",
      "#FC6F91",
      "Warning",
      "#F49F1F",
      "#F8AE3F",
      "#FFD569",
      "Informational",
      "#5A67DF",
      "#7683F6",
      "#9CA5FB",
      "Successful",
      "#26CECE",
      "#44E4E4",
      "#4FF6F6",
      "4",
      "20px",
      "16px",
      "Poppins Bold",
      "Poppins Regular",
      "Inter Bold",
      "Inter Medium",
      "Inter Regular",
    ]) {
      assert.ok(html.includes(value), `${label} must render ${value}`)
    }
  }
})

test("preserves the intro-only Digitart destination after the home refactor", async () => {
  const [home, digitart] = await Promise.all([
    fetch(baseUrl),
    fetch(`${baseUrl}/projetos/digitart`),
  ])
  const [homeHtml, digitartHtml] = await Promise.all([home.text(), digitart.text()])

  assert.equal(home.status, 200)
  assert.doesNotMatch(homeHtml, /aria-label="Próximo case"/)
  assert.equal(digitart.status, 200)
  assert.match(digitartHtml, /Uma identidade criada para avançar no digital\./)
  assert.match(digitartHtml, /agência especializada na criação de sites/)
  assert.match(digitartHtml, /digitart-wordmark\.svg/)
  for (const color of ["#1741CA", "#DEB019", "#0B1E5D", "#E8EDFC"]) {
    assert.ok(digitartHtml.includes(color), `Digitart must render ${color}`)
  }
  assert.doesNotMatch(digitartHtml, /class="case-study"/)
})

test("starts the homepage with the hero and no positioning strip", async () => {
  const response = await fetch(`${baseUrl}/`)
  const html = await response.text()

  assert.equal(response.status, 200)
  assert.doesNotMatch(html, /home-positioning/)
  assert.doesNotMatch(html, /André Galharde · UI Designer/)
  assert.doesNotMatch(html, /Estratégia, produto digital e direção visual/)
  assert.match(html, /Conheça meu trabalho/)
})

test("renders the Adote um Pet case through the reusable template", async () => {
  const response = await fetch(`${baseUrl}/projetos/adote-um-pet`)
  const html = await response.text()

  assert.equal(response.status, 200)
  assert.match(html, /Quando a escolha certa encontra uma experi.ncia simples/)
  assert.match(html, /Ado..o n.o deveria parecer um processo frio/)
  assert.match(html, /Uma linguagem otimista e confi.vel/)
  assert.match(html, /Projetar confian.a sem perder a leveza/)
  assert.match(html, /Uma base de produto pronta para crescer/)
  assert.match(html, /\/media\/cases\/adote-um-pet\/product-preview\.png/)
  assert.match(html, /\/media\/cases\/adote-um-pet\/campaign\.jpg/)
  assert.match(html, /\/media\/cases\/adote-um-pet\/solution\.jpg/)
})

test("links the Adote um Pet introductory banner to the standalone site", async () => {
  const response = await fetch(`${baseUrl}/projetos/adote-um-pet`)
  const html = await response.text()

  assert.equal(response.status, 200)
  assert.match(
    html,
    /<a(?=[^>]*href="\/adoteumpet")(?=[^>]*class="case-study__site-link")[^>]*>.*Acesse o site do Adota Pet.*<\/a>/s,
  )
  assert.doesNotMatch(html, /class="adoptapet-page/)
})

test("publishes the complete AdotaPet experience on its own route", async () => {
  const response = await fetch(`${baseUrl}/adoteumpet`)
  const [html, css] = await Promise.all([
    response.text(),
    readFile(new URL("../components/adoptapet-product-page.module.css", import.meta.url), "utf8"),
  ])

  assert.equal(response.status, 200)
  assert.doesNotMatch(html, /class="site-header"/)
  assert.doesNotMatch(html, /class="site-footer"/)
  assert.doesNotMatch(html, /href="#main-content"/)
  assert.doesNotMatch(html, /class="adoptapet-route"/)
  assert.match(
    css,
    /\.heroInner,\s*\.petsInner,\s*\.processInner,\s*\.testimonialsInner,\s*\.faqInner,\s*\.footerInner\s*\{[^}]*width:\s*min\(calc\(100%\s*-\s*96px\),\s*1216px\);[^}]*margin-inline:\s*auto;/s,
  )
  for (const innerClass of ["heroInner", "petsInner", "processInner", "testimonialsInner", "faqInner", "footerInner"]) {
    assert.match(html, new RegExp(`class="[^"]*${innerClass}`))
  }
  assert.match(html, /aria-label="Experiência demonstrativa AdotaPet"/)
  assert.match(html, /class="adoptapet-page/)
  assert.match(html, /Encontre um pet/)
  assert.match(html, /ideal para você/)
  assert.match(html, /Descubra o pet que faz sentido para você/)
  assert.match(html, /Entenda como é fácil adotar um pet/)
  assert.match(html, /feedback de quem já adotou/i)
  assert.match(html, /Dúvidas Frequentes/)
  assert.match(html, /alt="Gato laranja deitado"/)
  assert.match(html, /aria-roledescription="carousel"/)
  assert.match(html, /aria-label="Perguntas frequentes"/)
})

test("shares the AdotaPet shell and links Xereta to its detail route", async () => {
  const response = await fetch(`${baseUrl}/adoteumpet`)
  const html = await response.text()

  assert.equal(response.status, 200)
  assert.match(
    html,
    /<a(?=[^>]*href="\/adoteumpet\/xereta")(?=[^>]*aria-label="Conhecer Xereta")[^>]*>/,
  )
  assert.equal((html.match(/<header[^>]+data-scroll-state="top"/g) ?? []).length, 1)
  assert.equal((html.match(/<footer/g) ?? []).length, 1)
})

test("publishes the Figma-backed Xereta detail route", async () => {
  const response = await fetch(`${baseUrl}/adoteumpet/xereta`)
  const html = await response.text()

  assert.equal(response.status, 200)
  for (const copy of [
    "Xereta",
    "Persa",
    "3 meses",
    "Caramelo",
    "Fêmea",
    "Vila Venditti, Guarulhos",
    "Rua Ana Soares Barcelos, 355 - Apto 113 - Torre 2",
    "Pets Relacionados",
    "Rainha",
    "Perigosa",
    "Charlote",
  ]) {
    assert.ok(html.includes(copy), `detail must render ${copy}`)
  }
  assert.match(html, /href="\/adoteumpet"/)
  for (const asset of [
    "xereta-gallery-1.png",
    "xereta-gallery-2.png",
    "xereta-gallery-3.png",
    "xereta-gallery-4.png",
    "rainha.png",
    "perigosa.png",
    "charlote.png",
  ]) {
    assert.ok(html.includes(asset), `detail must render local asset ${asset}`)
  }
  assert.equal((html.match(/<header[^>]+data-scroll-state="top"/g) ?? []).length, 1)
  assert.equal((html.match(/<footer/g) ?? []).length, 1)
})

test("implements the local-only accessible adoption dialog", async () => {
  const response = await fetch(`${baseUrl}/adoteumpet/xereta`)
  const html = await response.text()

  assert.equal(response.status, 200)
  assert.match(html, /<button(?=[^>]*aria-haspopup="dialog")(?=[^>]*aria-controls="xereta-adoption-dialog")[^>]*>/)
  assert.match(
    html,
    /<dialog(?=[^>]*id="xereta-adoption-dialog")(?=[^>]*aria-labelledby="adoption-dialog-title")[^>]*>/,
  )
  assert.match(html, /Quero adotar a Xereta/)
  assert.match(html, /<input(?=[^>]*name="name")(?=[^>]*required="")[^>]*>/)
  assert.match(html, /<input(?=[^>]*name="email")(?=[^>]*required="")[^>]*>/)
  assert.match(html, /<input(?=[^>]*name="phone")(?=[^>]*required="")[^>]*>/)
  assert.match(html, /name="message"/)
  assert.match(html, /Enviar interesse/)
  assert.doesNotMatch(html, /<form[^>]+action=/)
})

test("keeps the Xereta page and adoption dialog responsive", async () => {
  const css = await readFile(new URL("../components/adoptapet-xereta-page.module.css", import.meta.url), "utf8")

  assert.match(css, /\.mainGrid\s*\{[^}]*grid-template-columns:\s*416px\s+1fr;/s)
  assert.match(css, /@media\s*\(max-width:\s*700px\)/)
  assert.match(css, /\.detailInner,[\s\S]*?\.relatedInner\s*\{[^}]*width:\s*calc\(100%\s*-\s*32px\);/s)
  assert.match(css, /\.dialogImage\s*\{[^}]*display:\s*none;/s)
  assert.match(css, /\.adoptCta\s*\{[^}]*min-height:\s*56px;/s)
  assert.match(css, /\.dialogClose\s*\{[^}]*min-height:\s*44px;/s)
})

test("centers the adoption dialog and keeps Xereta section spacing on the 8-point grid", async () => {
  const css = await readFile(new URL("../components/adoptapet-xereta-page.module.css", import.meta.url), "utf8")

  assert.match(css, /\.detailSurface\s*\{[^}]*padding:\s*96px\s+0\s+80px;/s)
  assert.match(css, /\.relatedSection\s*\{[^}]*padding:\s*80px\s+0;/s)
  assert.match(css, /\.dialog\s*\{[^}]*margin:\s*auto;/s)
  assert.match(
    css,
    /@media\s*\(max-width:\s*700px\)[\s\S]*?\.relatedSection\s*\{[^}]*padding:\s*56px\s+0;/s,
  )
})

test("removes the arrow from Nossos Pets in the AdotaPet header", async () => {
  const response = await fetch(`${baseUrl}/adoteumpet`)
  const html = await response.text()

  assert.equal(response.status, 200)
  assert.doesNotMatch(html, /icon-chevron\.svg/)
})

test("turns the AdotaPet header CTA icon white on hover", async () => {
  const css = await readFile(new URL("../components/adoptapet-product-page.module.css", import.meta.url), "utf8")

  assert.match(
    css,
    /\.adoptButton:hover img,\s*\.adoptButton:focus-visible img\s*\{[^}]*filter:\s*brightness\(0\) invert\(1\);/s,
  )
})

test("keeps the AdotaPet menu above content while the page scrolls underneath", async () => {
  const response = await fetch(`${baseUrl}/adoteumpet`)
  const [html, css] = await Promise.all([
    response.text(),
    readFile(new URL("../components/adoptapet-product-page.module.css", import.meta.url), "utf8"),
  ])

  assert.equal(response.status, 200)
  assert.match(html, /<header(?=[^>]*data-scroll-state="top")(?=[^>]*class="[^"]*header)[^>]*>/)
  assert.match(css, /\.header\s*\{[^}]*position:\s*fixed;[^}]*top:\s*0;[^}]*z-index:\s*20;/s)
  assert.match(css, /\.heroInner\s*\{[^}]*padding-top:\s*96px;/s)
  assert.match(css, /\.header\[data-scroll-state="scrolled"\]\s*\{[^}]*backdrop-filter:\s*blur\(16px\);/s)
})

test("keeps the AdotaPet footer full bleed with 64px between the FAQ and footer", async () => {
  const css = await readFile(new URL("../components/adoptapet-product-page.module.css", import.meta.url), "utf8")

  assert.match(css, /\.faq\s*\{[^}]*min-height:\s*0;[^}]*padding-block:\s*18px 64px;/s)
  assert.match(
    css,
    /\.footer\s*\{[^}]*width:\s*100vw;[^}]*margin-inline:\s*calc\(50% - 50vw\);[^}]*margin-bottom:\s*0;/s,
  )
})

test("keeps the AdotaPet search bar inside the 1216px desktop grid", async () => {
  const css = await readFile(new URL("../components/adoptapet-product-page.module.css", import.meta.url), "utf8")

  assert.match(css, /\.searchBar\s*\{[^}]*right:\s*0;[^}]*left:\s*0;/s)
})

test("matches the AdotaPet adoption banner to the 1440px Figma frame", async () => {
  const response = await fetch(`${baseUrl}/adoteumpet`)
  const [html, css] = await Promise.all([
    response.text(),
    readFile(new URL("../components/adoptapet-product-page.module.css", import.meta.url), "utf8"),
  ])

  assert.equal(response.status, 200)
  assert.match(html, /banner-copy-blue\.svg/)
  assert.match(html, /banner-cat-mask\.svg/)
  assert.match(html, /banner-dogs-mask\.svg/)
  assert.match(css, /\.banner\s*\{[^}]*min-height:\s*537px;/s)
  assert.match(css, /\.bannerCopy\s*\{[^}]*width:\s*38\.75%;[^}]*aspect-ratio:\s*558\s*\/\s*369;/s)
})

test("shows the AdotaPet menu button only on mobile", async () => {
  const css = await readFile(new URL("../components/adoptapet-product-page.module.css", import.meta.url), "utf8")

  assert.match(css, /\.menuButton\s*\{[^}]*display:\s*none;/s)
  assert.match(css, /@media \(max-width:\s*900px\)[\s\S]*?\.menuButton\s*\{\s*display:\s*grid;\s*\}/s)
})

test("keeps the previous pet arrow visible and gives it a hover state", async () => {
  const [pageResponse, arrowResponse, css] = await Promise.all([
    fetch(`${baseUrl}/adoteumpet`),
    fetch(`${baseUrl}/media/cases/adote-um-pet/landing/icon-arrow-left-blue.svg`),
    readFile(new URL("../components/adoptapet-product-page.module.css", import.meta.url), "utf8"),
  ])
  const [html, arrowSvg] = await Promise.all([pageResponse.text(), arrowResponse.text()])

  assert.equal(pageResponse.status, 200)
  assert.equal(arrowResponse.status, 200)
  assert.match(
    html,
    /<button(?=[^>]*aria-label="Ver pets anteriores")[^>]*>[\s\S]*?<img[^>]*src="\/media\/cases\/adote-um-pet\/landing\/icon-arrow-left-blue\.svg"[^>]*>/,
  )
  assert.match(arrowSvg, /stroke="#284CFF"/)
  assert.match(css, /\.petsSection \.carouselControls button:disabled\s*\{[^}]*opacity:\s*\.72;/s)
  assert.match(
    css,
    /\.petsSection \.carouselControls button:hover,[\s\S]*?\{[^}]*background:\s*var\(--blue-soft\);[^}]*opacity:\s*1;[^}]*transform:\s*translateY\(-2px\);/s,
  )
})

test("keeps the testimonial carousel inside its viewport and limits desktop movement", async () => {
  const [component, css] = await Promise.all([
    readFile(new URL("../components/adoptapet-product-page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/adoptapet-product-page.module.css", import.meta.url), "utf8"),
  ])

  assert.match(component, /const lastTestimonialSlide = Math\.max\(0, testimonials\.length - 3\)/)
  assert.match(css, /\.testimonialViewport\s*\{[^}]*overflow:\s*hidden;/s)
})

test("gives the testimonial arrows stronger contrast and hover feedback", async () => {
  const css = await readFile(new URL("../components/adoptapet-product-page.module.css", import.meta.url), "utf8")

  assert.match(css, /\.testimonials \.carouselControls button:disabled\s*\{[^}]*opacity:\s*\.72;/s)
  assert.match(
    css,
    /\.testimonials \.carouselControls button:hover,[\s\S]*?\{[^}]*background:\s*var\(--blue-soft\);[^}]*opacity:\s*1;[^}]*transform:\s*translateY\(-2px\);/s,
  )
})

test("publishes the profile and portfolio shell", async () => {
  const [home, about] = await Promise.all([fetch(baseUrl), fetch(`${baseUrl}/sobre`)])
  const [homeHtml, aboutHtml, css] = await Promise.all([
    home.text(),
    about.text(),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ])

  assert.equal(about.status, 200)
  assert.match(aboutHtml, /EXPERI.NCIA PROFISSIONAL/)
  assert.match(aboutHtml, /FORMA..O/)
  assert.doesNotMatch(homeHtml, /aria-roledescription="carousel"/)
  assert.match(
    homeHtml,
    /<a(?=[^>]*href="\/documentos\/curriculo-galharde-designer\.pdf")(?=[^>]*target="_blank")[^>]*>/,
  )
  assert.match(homeHtml, /Projetos/)
  assert.match(homeHtml, /Sobre/)
  assert.match(homeHtml, /Behance/)
  assert.match(homeHtml, /LinkedIn/)
  assert.match(homeHtml, /mailto:galharde\.design@gmail\.com/)
  assert.doesNotMatch(homeHtml, /Starter|Preview/)
  assert.doesNotMatch(homeHtml, /https:\/\/example\.com/)
  assert.doesNotMatch(homeHtml, /<meta[^>]*property="og:url"/)
  assert.doesNotMatch(css, /text-transform\s*:\s*uppercase/i)
  assert.match(css, /--color-bg-warm:\s*#F7F1E7/)
  assert.match(css, /--color-action:\s*#E73D16/)
  assert.match(css, /--font-display:\s*var\(--font-plus-jakarta\)/)
  assert.match(css, /--radius-sm:\s*8px/)
})

test("publishes the Figma about page with its editorial sections", async () => {
  const response = await fetch(`${baseUrl}/sobre`)
  const html = await response.text()

  assert.equal(response.status, 200)
  assert.match(html, /class="about-page"/)
  assert.match(html, />Sou André<br\/>Galharde<\/h1>/)
  assert.match(html, /UI Boost/)
  assert.match(html, /2022 - Concluído/)
  assert.doesNotMatch(html, /Futebol, viagens e referências além das telas\./)
  assert.doesNotMatch(html, /class="about-contact"/)
  assert.match(html, /aria-label="Enviar e-mail"/)
  assert.match(html, /Transformo complexidade em interfaces claras, .teis e f.ceis de usar\./)
  assert.match(html, /Experi.ncia<br\/>e forma..o/)
  assert.match(html, /2026 - Cursando/)
  assert.match(
    html,
    /<a(?=[^>]*href="\/documentos\/curriculo-galharde-designer\.pdf")(?=[^>]*target="_blank")(?=[^>]*class="about-trajectory__curriculum")[^>]*>/,
  )
  assert.match(html, /Vamos conversar/)
  assert.match(html, /Ideias fortes come.am<br\/>com uma boa conversa\./)
})

test("publishes the about gallery as a four-image carousel", async () => {
  const response = await fetch(`${baseUrl}/sobre`)
  const html = await response.text()
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8")

  assert.equal(response.status, 200)
  assert.match(html, /class="about-gallery-slider"/)
  assert.equal((html.match(/class="about-gallery-slider__image/g) ?? []).length, 4)
  assert.equal((html.match(/class="about-gallery-slider__next"/g) ?? []).length, 1)
  assert.equal((html.match(/object-position:/g) ?? []).length, 4)
  assert.match(html, /aria-roledescription="carousel"/)
  assert.match(css, /\.about-gallery-slider\s*\{[^}]*height:\s*auto;/s)
  assert.match(css, /\.about-gallery__media\s*\{[^}]*aspect-ratio:\s*1;[^}]*border-radius:\s*50%;/s)
  assert.match(html, /aria-label="Próxima foto da galeria"/)
  assert.doesNotMatch(html, /about-gallery-slider__markers|role="tablist"/)
})

test("uses the header CTA arrow states on the about curriculum button", async () => {
  const response = await fetch(`${baseUrl}/sobre`)
  const html = await response.text()
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8")

  assert.equal(response.status, 200)
  assert.match(html, /<img(?=[^>]*src="\/brand\/cta-arrow-white\.svg")(?=[^>]*class="[^"]*about-trajectory__curriculum-arrow-icon--default)[^>]*>/)
  assert.match(html, /<img(?=[^>]*src="\/brand\/cta-arrow-grafite\.svg")(?=[^>]*class="[^"]*about-trajectory__curriculum-arrow-icon--hover)[^>]*>/)
  assert.match(
    css,
    /\.about-trajectory__curriculum:hover \.about-trajectory__curriculum-arrow-icon--default,[\s\S]*?\{\s*opacity:\s*0;/,
  )
  assert.match(
    css,
    /\.about-trajectory__curriculum:hover \.about-trajectory__curriculum-arrow-icon--hover,[\s\S]*?\{\s*opacity:\s*1;/,
  )
})

test("publishes the editorial home with independent photographs and section anchors", async () => {
  const response = await fetch(baseUrl)
  const html = await response.text()
  assert.equal(response.status, 200)
  assert.match(html, /Pessoas,<br\/>ideias e<br\/>resultados/)
  assert.match(html, /UI\/UX DESIGNER/)
  assert.equal((html.match(/data-hero-image="/g) ?? []).length, 3)
  assert.doesNotMatch(html, /aria-roledescription="carousel"|Próximo case/)
  for (const id of ["projetos", "sobre", "contato"]) {
    assert.ok(html.includes(`id="${id}"`))
    assert.ok(html.includes(`href="#${id}"`))
  }
  assert.match(html, /class="home-rail"[^>]*aria-hidden="true"/)
  assert.match(html, /Innova/)
  assert.match(html, /Themediagroup/)
  assert.match(html, /Atendimento ao cliente/)
  assert.match(html, /2026 - Cursando/)
  assert.match(html, /galharde.design@gmail.com/)
})

test("links all three featured project cards to their existing case pages", async () => {
  const response = await fetch(baseUrl)
  const html = await response.text()
  for (const slug of ["adote-um-pet", "casa-nova", "ui-boost-app"]) {
    assert.match(html, new RegExp(`<a(?=[^>]*href="/projetos/${slug}")(?=[^>]*data-editorial="true")[^>]*>`))
    assert.equal((await fetch(`${baseUrl}/projetos/${slug}`)).status, 200)
  }
})

test("preserves the six client logos after the featured projects", async () => {
  const response = await fetch(baseUrl)
  const html = await response.text()

  assert.equal(response.status, 200)
  assert.match(
    html,
    /<section(?=[^>]*class="brand-logos")(?=[^>]*aria-label="Logos")[^>]*>/,
  )
  for (const brand of ["Itaú", "Eucatex", "Natura", "iFood", "Nubank", "Petrobras"]) {
    assert.match(html, new RegExp(`alt="${brand}"`))
  }
  assert.equal((html.match(/class="brand-logos__item/g) ?? []).length, 6)
  assert.equal((html.match(/data-editorial="true"/g) ?? []).length, 3)
  assert.ok(html.indexOf('id="projetos"') < html.indexOf('class="brand-logos"'))

  const projectHrefs = [...new Set(
    [...html.matchAll(/<a[^>]*href="(\/projetos\/[^\"]+)"[^>]*>/g)].map((match) => match[1]),
  )].sort()
  assert.deepEqual(projectHrefs, [
    "/projetos/adote-um-pet",
    "/projetos/casa-nova",
    "/projetos/ui-boost-app",
  ])
})

test("serves each exported client logo from its matching public path", async () => {
  const [itau, ifood, nubank] = await Promise.all(
    ["itau", "ifood", "nubank"].map(async (brand) => {
      const response = await fetch(`${baseUrl}/brand/clients/${brand}.svg`)
      assert.equal(response.status, 200)
      return response.text()
    }),
  )

  assert.match(itau, /Brand \/ Ita/)
  assert.match(ifood, /Brand \/ iFood/)
  assert.match(nubank, /Brand \/ Nubank/)
})

test("rotates the featured case arrow smoothly to point right and turns it terracotta on hover", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8")

  assert.match(
    css,
    /\.hero-slider__case-arrow\s*\{[^}]*transition:\s*transform var\(--motion-standard\) var\(--ease-standard\), background-color var\(--motion-standard\) var\(--ease-standard\);[^}]*\}[\s\S]*?\.hero-slider__case-link:hover \.hero-slider__case-arrow,[\s\S]*?\{[^}]*transform:\s*rotate\(45deg\);[^}]*background:\s*var\(--color-action\);/s,
  )
})

test("publishes an accessible responsive Galharde header", async () => {
  const response = await fetch(baseUrl)
  const html = await response.text()

  assert.equal(response.status, 200)
  assert.match(html, /<header[^>]+data-scroll-state="top"/)
  assert.match(html, /<a(?=[^>]*href="\/")(?=[^>]*aria-label="Galharde[^"]*")[^>]*>/)
  assert.match(html, /<img(?=[^>]*alt="Galharde")(?=[^>]*src="\/brand\/logo-galharde\.svg")[^>]*>/)
  assert.match(html, /<nav[^>]+aria-label="Navega..o principal"/)
  assert.match(html, /<a(?=[^>]*href="#projetos")[^>]*>Projetos<\/a>/)
  assert.match(html, /<a(?=[^>]*href="#sobre")[^>]*>Sobre<\/a>/)
  assert.match(html, /<a(?=[^>]*href="#contato")[^>]*>[^<]*<span[^>]*>Vamos conversar<\/span>/)
  assert.match(html, /<button(?=[^>]*aria-label="Abrir menu")(?=[^>]*aria-expanded="false")(?=[^>]*aria-controls="menu-principal-mobile")[^>]*>/)
})

test("preserves case chrome and uses the light footer only on Home", async () => {
  for (const route of ["/", "/sobre", "/projetos/digitart", "/projetos/adote-um-pet"]) {
    const response = await fetch(baseUrl + route)
    assert.equal(response.status, 200)
    const html = await response.text()
    const header = html.match(/<header[\s\S]*?<\/header>/)[0]
    const footer = html.match(/<footer class="site-footer"[^>]*>[\s\S]*?<\/footer>/)[0]
    assert.match(header, /src="\/brand\/logo-galharde\.svg"/)
    assert.match(header, /src="\/brand\/logo-minimal\.svg"/)
    assert.doesNotMatch(header, /galharde-wordmark/)
    if (route === "/") {
      assert.match(footer, /data-variant="light"/)
      assert.match(footer, /src="\/brand\/logo-galharde\.svg"/)
      assert.doesNotMatch(footer, /Redes sociais|Instagram|Behance|LinkedIn/)
    } else {
      assert.match(footer, /src="\/brand\/logo-minimal-white\.svg"/)
      assert.doesNotMatch(footer, /data-variant="light"/)
    }
    assert.doesNotMatch(footer, /wordmark-main|wordmark-g|wordmark-detail/)
  }
})

test("uses the portfolio pill CTA with a separate arrow circle on Home and case actions", async () => {
  const [home, casePage] = await Promise.all([
    fetch(baseUrl).then((response) => response.text()),
    fetch(`${baseUrl}/projetos/adote-um-pet`).then((response) => response.text()),
  ])

  assert.equal((home.match(/class="portfolio-cta__arrow"/g) ?? []).length, 2)
  assert.match(casePage, /class="case-study__site-link"[^>]*>\s*<span>Acesse o site do Adota Pet<\/span>\s*<span class="portfolio-cta__arrow"/)
})

test("renders the light Home footer with a text back-to-top link above the organic artwork", async () => {
  const response = await fetch(baseUrl)
  const html = await response.text()

  assert.equal(response.status, 200)
  assert.match(
    html,
    /<img(?=[^>]*class="site-footer__logo")(?=[^>]*alt="Galharde")[^>]*>/,
  )
  assert.match(html, /src="\/brand\/footer\/organic-contours\.svg"/)
  assert.doesNotMatch(html, /Design com propósito\./)
  assert.match(html, /aria-label="Navegação do rodapé"/)
  const footer = html.match(/<footer class="site-footer" data-variant="light">[\s\S]*?<\/footer>/)?.[0]
  assert.ok(footer)
  assert.match(footer, /<a(?=[^>]*href="#top")(?=[^>]*class="site-footer__back-to-top-link")[^>]*>\s*Voltar ao topo\s*<span[^>]*aria-hidden="true"[^>]*><\/span>\s*<\/a>/)
  assert.doesNotMatch(footer, /class="site-footer__back-to-top"/)
})

test("links the footer Instagram and gives the borderless back-to-top control the legal text color", async () => {
  const response = await fetch(baseUrl)
  const html = await response.text()
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8")

  assert.equal(response.status, 200)
  assert.match(
    html,
    /<a(?=[^>]*href="https:\/\/www\.instagram\.com\/andregalharde")(?=[^>]*target="_blank")(?=[^>]*aria-label="Instagram")[^>]*>/,
  )
  assert.match(
    css,
    /\.site-footer__back-to-top\s*\{[^}]*border:\s*0;[^}]*color:\s*var\(--color-stone\);/s,
  )
  assert.match(css, /\.site-footer__back-to-top-arrow\s*\{[^}]*background:\s*currentColor;/s)
  assert.match(
    css,
    /\.site-footer__back-to-top:hover,[\s\S]*?\{[^}]*background:\s*var\(--color-action\);[^}]*color:\s*var\(--color-ink\);/,
  )
})

test("compacts the scrolled header around the full logo, menu, and CTA", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8")

  assert.match(
    css,
    /\.site-header\[data-scroll-state="scrolled"\] \.site-header__frame\s*\{[^}]*grid-template-columns:\s*auto auto auto;[^}]*width:\s*min\(calc\(100% - 32px\), 560px\)/s,
  )
  assert.doesNotMatch(
    css,
    /\.site-header\[data-scroll-state="scrolled"\] \.site-header__frame\s*\{[^}]*width:\s*100%/s,
  )
})

test("uses a terracotta dot for navigation hover and keyboard focus", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8")

  assert.match(
    css,
    /\.site-header__desktop-nav a::before,[\s\S]*?\{[^}]*width:\s*8px;[^}]*height:\s*8px;[^}]*border-radius:\s*50%;[^}]*background:\s*var\(--color-action\);/,
  )
  assert.match(css, /\.site-header__mobile-nav a:focus-visible::before\s*\{[^}]*opacity:\s*1;/)
})

test("uses the supplied SVG assets for the CTA arrow states", async () => {
  const response = await fetch(baseUrl)
  const html = await response.text()
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8")

  assert.equal(response.status, 200)
  assert.match(html, /<img(?=[^>]*src="\/brand\/cta-arrow-white\.svg")(?=[^>]*alt="")[^>]*>/)
  assert.match(html, /<img(?=[^>]*src="\/brand\/cta-arrow-grafite\.svg")(?=[^>]*alt="")[^>]*>/)
  assert.doesNotMatch(html, />\s*↗\s*</)
  assert.match(css, /\.site-header__cta-arrow-icon--default\s*\{\s*opacity:\s*1;/)
  assert.match(css, /\.site-header__cta-arrow-icon--hover\s*\{\s*opacity:\s*0;/)
  assert.match(
    css,
    /\.site-header__cta:hover \.site-header__cta-arrow-icon--default,[\s\S]*?\{\s*opacity:\s*0;/,
  )
  assert.match(
    css,
    /\.site-header__cta:hover \.site-header__cta-arrow-icon--hover,[\s\S]*?\{\s*opacity:\s*1;/,
  )
})
