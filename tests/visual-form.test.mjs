import assert from "node:assert/strict"
import { test } from "node:test"

test("prevents visual form submission without making a network request", async () => {
  let visualForm

  try {
    visualForm = await import("../lib/visual-form.js")
  } catch {
    assert.fail("visual form submit handler is missing")
  }

  let prevented = 0
  let networkRequests = 0
  const originalFetch = globalThis.fetch
  globalThis.fetch = async () => {
    networkRequests += 1
    return new Response()
  }

  try {
    visualForm.preventVisualFormSubmission({
      preventDefault() {
        prevented += 1
      },
    })
  } finally {
    globalThis.fetch = originalFetch
  }

  assert.equal(prevented, 1)
  assert.equal(networkRequests, 0)
})
