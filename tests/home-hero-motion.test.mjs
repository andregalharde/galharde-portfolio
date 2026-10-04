import assert from "node:assert/strict"
import { test } from "node:test"

test("cycles through four photos without an empty frame at the loop boundary", async () => {
  const { createHeroPhotoTimeline } = await import("../lib/home-hero-motion.ts")
  const photos = Array.from({ length: 4 }, () => ({ opacity: 0, scale: 1 }))
  const timeline = createHeroPhotoTimeline(photos)

  try {
    for (const [time, visible] of [[0.4, 0], [2.9, 1], [5.4, 2], [7.9, 3], [10.4, 0], [12.9, 1]]) {
      timeline.totalTime(time)
      assert.ok(photos[visible].opacity > 0.99, `Photo ${visible} must be visible at ${time}s`)
      assert.ok(photos.every((photo) => photo.scale >= 1 && photo.scale <= 1.0401))
    }

    timeline.totalTime(10.2)
    assert.ok(Math.abs(photos[0].opacity - 0.5) < 0.01)
    assert.ok(Math.abs(photos[3].opacity - 0.5) < 0.01)

    for (let time = 0.4; time < 21; time += 0.1) {
      timeline.totalTime(time)
      assert.ok(photos.reduce((sum, photo) => sum + photo.opacity, 0) > 0.99, `Empty frame at ${time}s`)
    }
  } finally {
    timeline.kill()
  }
})
