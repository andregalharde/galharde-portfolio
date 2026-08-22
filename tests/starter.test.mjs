import assert from "node:assert/strict"
import { after, before, test } from "node:test"
import { spawn } from "node:child_process"
import { once } from "node:events"
import { readFile } from "node:fs/promises"
import path from "node:path"

const hostname = "127.0.0.1"
const port = 4317
const baseUrl = `http://${hostname}:${port}`
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

test("publishes the project grid and generated project routes", async () => {
  const paths = [
    "/",
    "/projetos/fluentify",
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
  const projectHrefs = [...homeHtml.matchAll(/<a[^>]*href="(\/projetos\/[^"]+)"[^>]*>/g)]
    .map((match) => match[1])
    .sort()
  assert.deepEqual(projectHrefs, [
    "/projetos/casa-nova",
    "/projetos/fluentify",
    "/projetos/ui-boost-app",
    "/projetos/ui-boost-landing-page",
  ])
  assert.match(homeHtml, /Fluentify/)
  assert.match(fluentifyHtml, /Moodboard/)
  assert.match(fluentifyHtml, /alt="Moodboard 1"/)
  for (const value of ["Black", "#000000", "Neutral-700", "#2F3037", "12", "32px", "72px", "Barlow Bold", "Inter Medium"]) {
    assert.ok(fluentifyHtml.includes(value), `Fluentify must render ${value}`)
  }
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

test("publishes the profile and portfolio shell", async () => {
  const [home, about] = await Promise.all([fetch(baseUrl), fetch(`${baseUrl}/sobre`)])
  const [homeHtml, aboutHtml, css] = await Promise.all([
    home.text(),
    about.text(),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ])

  assert.equal(about.status, 200)
  assert.match(aboutHtml, /Experi.ncia Profissional/)
  assert.match(aboutHtml, /Educa..o/)
  assert.ok(
    homeHtml.includes(
      "Olá! Sou André Galharde, um designer visual e digital que conecta pessoas através de interfaces.",
    ),
  )
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
})
