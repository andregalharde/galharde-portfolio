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

  const uiBoostApp = projectModule.getProjectBySlug("ui-boost-app")
  assert.deepEqual(uiBoostApp?.prototype, {
    label: "Acesse o Protótipo",
    url:
      "https://www.figma.com/proto/W1Mid9xrJ5Rus0ValiuLEd/Uiboost---APP?page-id=11325%3A5083&type=design&node-id=11325-7906&viewport=661%2C428%2C0.15&t=twJ2yti6DUEb9OWw-1&scaling=scale-down&starting-point-node-id=11325%3A9912&mode=design",
    image: {
      src: "/media/projects/img-prototipacao.png",
      alt: "Link do Protótipo",
    },
  })
})
