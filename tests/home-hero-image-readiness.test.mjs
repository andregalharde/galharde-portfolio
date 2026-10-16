import assert from "node:assert/strict"
import { test } from "node:test"

test("a photo that finishes loading later joins the hero gallery", async () => {
  const { watchHeroImages } = await import("../lib/home-hero-image-readiness.ts")
  let finishFirstImage
  let finishSecondImage
  const images = [
    {
      naturalWidth: 0,
      decode: () => new Promise((resolve) => { finishFirstImage = resolve }),
    },
    {
      naturalWidth: 0,
      decode: () => new Promise((resolve) => { finishSecondImage = resolve }),
    },
  ]
  const available = []
  const stop = watchHeroImages(images, (indices) => available.push(indices))

  assert.deepEqual(available.at(-1), [])
  images[0].naturalWidth = 800
  finishFirstImage()
  await new Promise(setImmediate)
  assert.deepEqual(available.at(-1), [0])
  images[1].naturalWidth = 800
  finishSecondImage()
  await new Promise(setImmediate)
  assert.deepEqual(available.at(-1), [0, 1])
  stop()
})
