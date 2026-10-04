import { gsap } from "gsap"

export function createHeroPhotoTimeline(photos: gsap.TweenTarget[]) {
  const timeline = gsap.timeline({ paused: true })

  photos.forEach((photo, index) => {
    const slide = gsap.timeline({ repeat: -1 })
    slide
      .fromTo(photo, { opacity: 0, scale: 1 }, { opacity: 1, duration: 0.4, ease: "none", immediateRender: false }, 0)
      .to(photo, { scale: 1.04, duration: 2.9, ease: "none" }, 0)
      .to(photo, { opacity: 0, duration: 0.4, ease: "none" }, 2.5)
      .set(photo, { opacity: 0 }, 10)
    timeline.add(slide, index * 2.5)
  })

  // Start with the first photograph fully visible, including on a cold load.
  timeline.totalTime(0.4)
  return timeline
}
