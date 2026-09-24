import assert from "node:assert/strict"
import { test } from "node:test"
import { runInNewContext } from "node:vm"

async function boot({ path = "/", reduced = false, seen = false, denied = false } = {}) {
  const { portfolioIntroBootstrap } = await import("../lib/portfolio-intro.ts")
  const attributes = new Map()
  const storage = new Map(seen ? [["gld:intro:session", "1"]] : [])
  const timers = []
  const listeners = new Map()
  const root = {
    setAttribute: (key, value) => attributes.set(key, value),
    removeAttribute: (key) => attributes.delete(key),
  }
  const context = {
    location: { pathname: path },
    matchMedia: () => ({ matches: reduced }),
    performance: { now: () => 100 },
    sessionStorage: {
      getItem: (key) => { if (denied) throw new Error("Unavailable"); return storage.get(key) },
      setItem: (key, value) => storage.set(key, value),
    },
    document: { documentElement: root, getElementById: () => null },
    setTimeout: (fn, delay) => timers.push({ fn, delay }),
    addEventListener: (name, fn) => listeners.set(name, fn),
    removeEventListener: (name) => listeners.delete(name),
  }
  runInNewContext(portfolioIntroBootstrap, context)
  return { attributes, storage, timers, listeners }
}

test("intro claims only a fresh home entry", async () => {
  const first = await boot()
  assert.equal(first.attributes.get("data-portfolio-intro"), "100")
  assert.equal(first.storage.get("gld:intro:session"), "1")
  assert.equal((await boot({ seen: true })).attributes.size, 0)
})

test("direct case and other-page entries consume the session without an intro", async () => {
  for (const path of ["/projetos/digitart", "/sobre", "/adoteumpet"]) {
    const result = await boot({ path })
    assert.equal(result.attributes.size, 0)
    assert.equal(result.storage.get("gld:intro:session"), "1")
  }
})

test("reduced motion and unavailable storage fail open", async () => {
  assert.equal((await boot({ reduced: true })).attributes.size, 0)
  assert.equal((await boot({ denied: true })).attributes.size, 0)
})

test("the safety deadline allows the full 3.6 second intro and still fails open", async () => {
  const result = await boot()
  assert.equal(result.timers.length, 1)
  assert.ok(result.timers[0].delay >= 3600)
  assert.ok(result.timers[0].delay <= 3800)
  result.timers[0].fn()
  assert.equal(result.attributes.size, 0)
})

test("Escape releases the screen even before React hydrates", async () => {
  const result = await boot()
  result.listeners.get("keydown")({ key: "Escape" })
  assert.equal(result.attributes.size, 0)
})
