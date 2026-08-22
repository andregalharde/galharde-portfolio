import assert from "node:assert/strict"
import { test } from "node:test"

test("publishes the four source-backed portfolio projects", async () => {
  const projectModule = await import("../lib/projects.ts")

  assert.equal(projectModule.projects.length, 4)
  assert.deepEqual(projectModule.projects.map((project) => project.slug), [
    "fluentify",
    "casa-nova",
    "ui-boost-app",
    "ui-boost-landing-page",
  ])
  assert.equal(projectModule.getProjectBySlug("missing"), undefined)
})
