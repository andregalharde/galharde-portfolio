"use client"

import { usePathname } from "next/navigation"
import { useLayoutEffect, useRef } from "react"

import { introDot, introLetters, introSymbol } from "@/lib/portfolio-intro-vectors"

import styles from "./portfolio-intro.module.css"

const DURATION = 3600
const introPhoto = "/slider-01.JPEG"

export function PortfolioIntro() {
  const pathname = usePathname()
  const dialogRef = useRef<HTMLDialogElement>(null)

  function finish() {
    const dialog = dialogRef.current
    const hadFocus = dialog?.contains(document.activeElement)
    document.documentElement.removeAttribute("data-portfolio-intro")
    dialog?.close()
    if (hadFocus) {
      const main = document.getElementById("main-content")
      main?.setAttribute("tabindex", "-1")
      main?.focus({ preventScroll: true })
    }
  }

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    const root = document.documentElement
    const started = root.getAttribute("data-portfolio-intro")
    const motion = matchMedia("(prefers-reduced-motion: reduce)")
    if (!dialog || started === null) return
    if (pathname !== "/" || motion.matches) {
      finish()
      return
    }

    const elapsed = performance.now() - Number(started)
    if (elapsed >= DURATION || typeof dialog.showModal !== "function") {
      finish()
      return
    }

    dialog.style.setProperty("--intro-elapsed", `${-elapsed}ms`)
    try {
      dialog.showModal()
    } catch {
      finish()
      return
    }
    const timer = window.setTimeout(finish, DURATION - elapsed)
    // SVG image errors can happen before hydration and are not replayed by React.
    const portrait = new window.Image()
    portrait.addEventListener("error", finish)
    portrait.src = introPhoto
    const onMotionChange = () => { if (motion.matches) finish() }
    motion.addEventListener("change", onMotionChange)
    return () => {
      window.clearTimeout(timer)
      portrait.removeEventListener("error", finish)
      motion.removeEventListener("change", onMotionChange)
      dialog.close()
    }
  }, [pathname])

  return (
    <dialog
      ref={dialogRef}
      id="portfolio-intro"
      className={styles.intro}
      aria-label="Apresentação de André Galharde"
      onKeyDown={(event) => {
        if (event.key === "Tab") {
          event.preventDefault()
          event.currentTarget.querySelector("button")?.focus()
        }
      }}
      onCancel={(event) => { event.preventDefault(); finish() }}
      onAnimationEnd={(event) => { if (event.target === event.currentTarget) finish() }}
    >
      <svg className={styles.scene} viewBox="0 0 600 420" fill="none" aria-hidden="true">
        <defs>
          <clipPath id="intro-portrait-clip">
            <circle className={styles.clip} cx="300" cy="210" r="201.6" />
          </clipPath>
        </defs>
        <g className={styles.dot}>
          <g transform="scale(3.733333) translate(-19.96 -6.36)">
            <path d={introDot} fill="#E73D16" />
          </g>
        </g>
        <g clipPath="url(#intro-portrait-clip)">
          <image
            className={styles.portrait}
            href={introPhoto}
            x="98.4" y="8.4" width="403.2" height="403.2"
            preserveAspectRatio="xMinYMid slice"
            onError={finish}
          />
        </g>
        <g transform="translate(48 139.067) scale(3.733333)">
          <g className={styles.symbol} fill="#1C1917">
            {introSymbol.map((path, index) => <path key={index} d={path} />)}
          </g>
        </g>
        <g transform="translate(48 139.067) scale(3.733333)" fill="#1C1917">
          {introLetters.map((path, index) => (
            <path key={index} d={path} className={styles.letter} style={{ animationDelay: `calc(2000ms + ${index * 40}ms + var(--intro-elapsed, 0ms))` }} />
          ))}
        </g>
      </svg>
      <button type="button" className={styles.skip} onClick={finish}>
        Pular introdução <span aria-hidden="true">Esc</span>
      </button>
    </dialog>
  )
}
