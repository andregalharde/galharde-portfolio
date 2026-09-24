import assert from "node:assert/strict"
import { test } from "node:test"

test("keeps featured hero content linked to real project routes", async () => {
  const { heroSlides } = await import("../lib/hero-slides.ts")

  assert.deepEqual(
    heroSlides.map(({ slug, title, year, ctaLabel, image, href }) => ({
      slug,
      title,
      year,
      ctaLabel,
      image,
      href,
    })),
    [
      {
        slug: "adote-um-pet",
        title: "Adote um Pet",
        year: 2026,
        ctaLabel: "Acessar case",
        image: "/media/hero/adote-um-pet.png",
        href: "/projetos/adote-um-pet",
      },
      {
        slug: "digitart",
        title: "Digitart",
        year: 2026,
        ctaLabel: "Conhecer projeto",
        image: "/media/hero/digitart.png",
        href: "/projetos/digitart",
      },
      {
        slug: "ui-boost-app",
        title: "Entrelinha",
        year: 2024,
        ctaLabel: "Acessar case",
        image: "/media/hero/entrelinha.png",
        href: "/projetos/ui-boost-app",
      },
    ],
  )
})

test("wraps manual hero navigation in both directions", async () => {
  const { getAdjacentHeroSlideIndex } = await import("../lib/hero-slider.ts")

  assert.equal(getAdjacentHeroSlideIndex(0, 3, -1), 2)
  assert.equal(getAdjacentHeroSlideIndex(2, 3, 1), 0)
  assert.equal(getAdjacentHeroSlideIndex(1, 3, 1), 2)
})

test("configures the approved Digitart mobile image position", async () => {
  const { heroSlides } = await import("../lib/hero-slides.ts")
  const digitart = heroSlides.find((slide) => slide.slug === "digitart")

  assert.equal(digitart?.imagePosition, "60% center")
})

test("provides the Digitart banner positioning content", async () => {
  const { heroSlides } = await import("../lib/hero-slides.ts")
  const digitart = heroSlides.find((slide) => slide.slug === "digitart")

  assert.deepEqual(digitart?.campaign, {
    eyebrow: "Agência de sites",
    headline: "Sites que movem marcas para frente.",
    theme: "digitart",
  })
})
