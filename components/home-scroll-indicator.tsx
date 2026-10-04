"use client"

import { useEffect, useRef } from "react"

export function HomeScrollIndicator() {
  const railRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const rail = railRef.current
    const dot = dotRef.current
    if (!rail || !dot) return

    const headings = Array.from(document.querySelectorAll<HTMLElement>(".portfolio-home [data-home-rail-target]"))
    const colorSections = Array.from(document.querySelectorAll<HTMLElement>(".portfolio-home section[data-scroll-stop]"))
    const contactSurface = document.querySelector<HTMLElement>(".site-footer__main")

    let frame = 0
    const update = () => {
      frame = 0
      const hasScrolled = window.scrollY > 0
      const threshold = window.innerHeight * 0.65
      const colorThreshold = window.innerHeight / 2
      const reached = headings.filter((heading) => heading.getBoundingClientRect().top <= threshold)
      const active = reached.at(-1)

      colorSections.forEach((section) => {
        const sectionMiddle = section.getBoundingClientRect().top + section.offsetHeight / 2
        section.dataset.colorRevealed = String(sectionMiddle <= colorThreshold)
      })

      if (contactSurface) {
        const sectionMiddle = contactSurface.getBoundingClientRect().top + contactSurface.offsetHeight / 2
        contactSurface.dataset.colorRevealed = String(sectionMiddle <= colorThreshold)
      }

      if (!active) {
        dot.dataset.atTarget = "false"
        dot.dataset.visible = "false"
        return
      }

      const headingRect = active.getBoundingClientRect()
      dot.style.top = `${headingRect.top - rail.getBoundingClientRect().top + headingRect.height / 2}px`
      dot.dataset.atTarget = "true"
      dot.dataset.visible = String(hasScrolled)
    }
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
    }
  }, [])

  return <div ref={railRef} className="home-rail" aria-hidden="true"><span ref={dotRef} className="home-rail__dot" /></div>
}
