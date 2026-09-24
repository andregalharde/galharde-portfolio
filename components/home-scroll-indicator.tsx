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

    let frame = 0
    const update = () => {
      frame = 0
      const threshold = window.innerHeight * 0.65
      const reached = headings.filter((heading) => heading.getBoundingClientRect().top <= threshold)
      const active = reached.at(-1)

      reached.forEach((heading) => {
        const section = heading.closest<HTMLElement>("section[data-scroll-stop]")
        if (section) {
          section.dataset.colorRevealed = "true"
        }
      })

      if (!active) {
        dot.dataset.atTarget = "false"
        dot.dataset.visible = "false"
        return
      }

      const headingRect = active.getBoundingClientRect()
      dot.style.top = `${headingRect.top - rail.getBoundingClientRect().top + headingRect.height / 2}px`
      dot.dataset.atTarget = "true"
    }
    const scheduleUpdate = () => {
      dot.dataset.visible = "true"
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
