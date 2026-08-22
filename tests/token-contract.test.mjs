import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { test } from "node:test"

test("defines every semantic token category consumed by the starter", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8")
  const root = css.match(/:root\s*\{(?<declarations>[\s\S]*?)\}/)?.groups?.declarations ?? ""
  const tokens = new Set([...root.matchAll(/(--[\w-]+)\s*:/g)].map((match) => match[1]))

  for (const token of [
    "--background",
    "--foreground",
    "--font-sans",
    "--space-section",
    "--radius-control",
    "--shadow-card",
    "--space-layout",
    "--space-component-lg",
    "--space-component",
    "--space-component-xs",
  ]) {
    assert.ok(tokens.has(token), `missing ${token}`)
  }
})
