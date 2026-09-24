import assert from "node:assert/strict"
import { test } from "node:test"

const sharedDesktopStyleGuide = {
  palettes: [
    { label: "Primary", colors: [{ label: "Black", hex: "#000000" }] },
    {
      label: "Neutral",
      colors: [
        { label: "Neutral-700", hex: "#2F3037" },
        { label: "Neutral-600", hex: "#545662" },
        { label: "Neutral-300", hex: "#CFD2DF" },
      ],
    },
  ],
  typography: [
    { label: "Headline", styles: ["Barlow Bold", "Barlow Regular"] },
    { label: "Body", styles: ["Inter Bold", "Inter Medium", "Inter Regular"] },
  ],
}

function sharedUiBoostPalettes(neutralLabels) {
  return [
  {
    label: "Secondary",
    colors: [
      { label: "Dark", hex: "#6818D1" },
      { label: "Default", hex: "#721AE6" },
      { label: "Light", hex: "#D3B8F7" },
    ],
  },
  {
    label: "Neutral",
    colors: [
      { label: neutralLabels[0], hex: "#313131" },
      { label: neutralLabels[1], hex: "#626262" },
      { label: neutralLabels[2], hex: "#939393" },
    ],
  },
  {
    label: "Negative",
    colors: [
      { label: "Dark", hex: "#DE3961" },
      { label: "Default", hex: "#F64F77" },
      { label: "Light", hex: "#FC6F91" },
    ],
  },
  {
    label: "Warning",
    colors: [
      { label: "Dark", hex: "#F49F1F" },
      { label: "Default", hex: "#F8AE3F" },
      { label: "Default", hex: "#FFD569" },
    ],
  },
  {
    label: "Informational",
    colors: [
      { label: "Dark", hex: "#5A67DF" },
      { label: "Dark", hex: "#7683F6" },
      { label: "Light", hex: "#9CA5FB" },
    ],
  },
  {
    label: "Successful",
    colors: [
      { label: "Dark", hex: "#26CECE" },
      { label: "Default", hex: "#44E4E4" },
      { label: "Light", hex: "#4FF6F6" },
    ],
  },
  ]
}

function styleGuideFor(project) {
  return project.sections.find((section) => section.title === "Style Guide")?.styleGuide
}

test("publishes the four source-backed portfolio projects", async () => {
  const projectModule = await import("../lib/projects.ts")

  assert.equal(projectModule.projects.length, 4)
  assert.deepEqual(projectModule.projects.map((project) => project.slug), [
    "adote-um-pet",
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

test("models the exact source home profile independently from project copy", async () => {
  const profileModule = await import("../lib/profile.ts")

  assert.deepEqual(profileModule.homeProfile, {
    role: "UI Designer",
    introduction:
      "Olá! Sou André Galharde, um designer visual e digital que conecta pessoas através de interfaces.",
  })
})

test("models every visible desktop case style-guide fact", async () => {
  const { getProjectBySlug } = await import("../lib/projects.ts")
  const adoteUmPet = styleGuideFor(getProjectBySlug("adote-um-pet"))
  const casaNova = styleGuideFor(getProjectBySlug("casa-nova"))

  assert.deepEqual(adoteUmPet, {
    ...sharedDesktopStyleGuide,
    grid: [
      { label: "Colunas", value: "12" },
      { label: "Margem", value: "32px" },
      { label: "Gutter", value: "72px" },
    ],
  })
  assert.deepEqual(casaNova, {
    ...sharedDesktopStyleGuide,
    grid: [
      { label: "Colunas", value: "12" },
      { label: "Margem", value: "72px" },
      { label: "Gutter", value: "32px" },
    ],
  })
  assert.equal(
    getProjectBySlug("casa-nova").sections.find((section) => section.title === "Style Guide").image.alt,
    "Grid Desktop",
  )
})

test("models Digitart as an intro-only hero destination", async () => {
  const projectModule = await import("../lib/projects.ts")

  assert.equal(typeof projectModule.getProjectIntroductionBySlug, "function")
  assert.deepEqual(projectModule.getProjectIntroductionBySlug("digitart"), {
    slug: "digitart",
    eyebrow: "Identidade visual · 2026",
    title: "Digitart",
    headline: "Uma identidade criada para avançar no digital.",
    description:
      "A Digitart é uma agência especializada na criação de sites. Sua identidade visual une precisão tecnológica e energia criativa, traduzidas por uma linguagem direta, dinâmica e preparada para o ambiente digital.",
    heroImage: "/media/hero/digitart.png",
    logoImage: "/media/cases/digitart/digitart-wordmark.svg",
    colors: [
      { label: "Azul digital", hex: "#1741CA" },
      { label: "Amarelo", hex: "#DEB019" },
      { label: "Azul profundo", hex: "#0B1E5D" },
      { label: "Azul claro", hex: "#E8EDFC" },
    ],
  })
  assert.equal(
    projectModule.projects.some((project) => project.slug === "digitart"),
    false,
  )
})

test("models every visible UI Boost style-guide fact and color-usage paragraph", async () => {
  const { getProjectBySlug } = await import("../lib/projects.ts")
  const colorUsage =
    "A cor Primary: usada nas interações, botão de CTA, a cor Secondary: usada em assets visuais e a cor Neutral: usada nos títulos em fundos claros e escuros."
  const uiBoostApp = getProjectBySlug("ui-boost-app")
  const landingPage = getProjectBySlug("ui-boost-landing-page")
  const expectedTypography = [
    { label: "Headline", styles: ["Poppins Bold", "Poppins Regular"] },
    { label: "Body", styles: ["Inter Bold", "Inter Medium", "Inter Regular"] },
  ]
  const expectedGrid = [
    { label: "Colunas", value: "4" },
    { label: "Margem", value: "20px" },
    { label: "Gutter", value: "16px" },
  ]

  assert.equal(uiBoostApp.sections.find((section) => section.title === "Style Guide").paragraphs[0], colorUsage)
  assert.equal(landingPage.sections.find((section) => section.title === "Style Guide").paragraphs[0], colorUsage)
  assert.deepEqual(styleGuideFor(uiBoostApp), {
    palettes: [
      {
        label: "Primary",
        colors: [
          { label: "Dark", hex: "#EE56BB" },
          { label: "Default", hex: "#F974CC" },
          { label: "Light", hex: "#FF9FDE" },
        ],
      },
      ...sharedUiBoostPalettes(["700", "500", "100"]),
    ],
    grid: expectedGrid,
    typography: expectedTypography,
  })
  assert.deepEqual(styleGuideFor(landingPage), {
    palettes: [
      {
        label: "Primary",
        colors: [
          { label: "Dark", hex: "#E7564D" },
          { label: "Default", hex: "#FE5F55" },
          { label: "Light", hex: "#FFCDCA" },
        ],
      },
      ...sharedUiBoostPalettes(["Neutral-700", "Neutral-500", "Neutral-100"]),
    ],
    grid: expectedGrid,
    typography: expectedTypography,
  })
})
