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
  const [homeHtml, fluentifyHtml] = await Promise.all([home.text(), fluentify.text()])

  assert.equal(home.status, 200)
  assert.equal(fluentify.status, 200)
  assert.equal(casaNova.status, 200)
  assert.equal(uiBoostApp.status, 200)
  assert.equal(uiBoostLanding.status, 200)
  assert.equal(missing.status, 404)
  assert.match(homeHtml, /<a[^>]*href="\/projetos\/fluentify"[^>]*>/)
  assert.match(homeHtml, /Fluentify/)
  assert.match(fluentifyHtml, /Moodboard/)
  assert.match(fluentifyHtml, /alt="Moodboard 1"/)
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
  assert.match(homeHtml, /href="\/documentos\/curriculo-galharde-designer\.pdf"/)
  assert.match(homeHtml, /target="_blank"/)
  assert.match(homeHtml, /Projetos/)
  assert.match(homeHtml, /Sobre/)
  assert.match(homeHtml, /Behance/)
  assert.match(homeHtml, /LinkedIn/)
  assert.match(homeHtml, /mailto:galharde\.design@gmail\.com/)
  assert.doesNotMatch(homeHtml, /Starter|Preview/)
  assert.doesNotMatch(css, /text-transform\s*:\s*uppercase/i)
})
