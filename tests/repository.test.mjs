import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import { test } from "node:test"

const requiredTrackedFiles = [
  ".gitignore",
  "app/preview/page.tsx",
  "components.json",
  "components/forms/contact-form.tsx",
  "components/layout/container.tsx",
  "components/sections/cta.tsx",
  "components/sections/section.tsx",
  "components/ui/button.tsx",
  "components/ui/card.tsx",
  "components/ui/input.tsx",
  "components/ui/label.tsx",
  "components/ui/textarea.tsx",
  "eslint.config.mjs",
  "lib/profile.ts",
  "lib/utils.ts",
  "lib/visual-form.d.ts",
  "lib/visual-form.js",
  "next-env.d.ts",
  "next.config.ts",
  "package-lock.json",
  "package.json",
  "postcss.config.mjs",
  "public/favicon.svg",
  "tests/repository.test.mjs",
  "tests/visual-form.test.mjs",
  "tsconfig.json",
]

test("tracks the complete install, build, route, and test runtime", () => {
  const trackedFiles = new Set(
    execFileSync("git", ["ls-files"], { encoding: "utf8" })
      .split(/\r?\n/u)
      .filter(Boolean),
  )

  const missing = requiredTrackedFiles.filter((file) => !trackedFiles.has(file))
  assert.deepEqual(missing, [], `required clean-checkout files are untracked: ${missing.join(", ")}`)
})
