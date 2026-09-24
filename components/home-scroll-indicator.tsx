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
      const active = headings.filter((heading) => heading.getBoundingClientRect().top <= threshold).at(-1)

      if (!active) {
        dot.style.opacity = "0"
        return
      }

      const headingRect = active.getBoundingClientRect()
      dot.style.top = `${headingRect.top - rail.getBoundingClientRect().top + headingRect.height / 2}px`
      dot.style.opacity = "1"
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
