"use client"

import Image from "next/image"
import { useEffect, useState, useSyncExternalStore } from "react"

const AUTOPLAY_DELAY = 5_000

const galleryImages = [
  {
    src: "/media/profile/designer-01.jpg",
    alt: "Retrato de André Galharde",
    objectPosition: "center 20%",
  },
  {
    src: "/media/profile/estadio-benfica.webp",
    alt: "Arquibancada do Estádio da Luz, em Lisboa",
    objectPosition: "center 48%",
  },
  {
    src: "/media/profile/castelo-portugal.png",
    alt: "Castelo histórico sob o céu azul de Portugal",
    objectPosition: "center 42%",
  },
  {
    src: "/media/profile/bambina.png",
    alt: "Bambina, cachorra de estimação de André Galharde",
    objectPosition: "center 45%",
  },
] as const

function subscribeToReducedMotion(onChange: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
  mediaQuery.addEventListener("change", onChange)

  return () => mediaQuery.removeEventListener("change", onChange)
}

function getReducedMotionPreference() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function AboutGallerySlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionPreference,
    () => false,
  )

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return

    const autoplay = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % galleryImages.length)
    }, AUTOPLAY_DELAY)

    return () => window.clearInterval(autoplay)
  }, [activeIndex, isPaused, prefersReducedMotion])

  function handleBlur(event: React.FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsPaused(false)
    }
  }

  return (
    <figure
      className="about-gallery-slider"
      aria-label="Galeria pessoal"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={handleBlur}
    >
      <div className="about-gallery-slider__stage">
      <div className="about-gallery__media" id="about-gallery-photos">
        {galleryImages.map((image, index) => (
          <div
            key={image.src}
            className="about-gallery-slider__image"
            data-active={index === activeIndex}
            data-portrait={index === 0}
            aria-hidden={index !== activeIndex}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload={index === 0}
              sizes="(min-width: 1200px) 416px, (min-width: 768px) 40vw, calc(100vw - 48px)"
              style={{ objectPosition: image.objectPosition }}
            />
          </div>
        ))}
      </div>
      <button
        className="about-gallery-slider__next"
        type="button"
        aria-label="Próxima foto da galeria"
        aria-controls="about-gallery-photos"
        onClick={() => setActiveIndex((index) => (index + 1) % galleryImages.length)}
        onKeyDown={(event) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return
          event.preventDefault()
          const direction = event.key === "ArrowLeft" ? -1 : 1
          setActiveIndex((index) => (index + direction + galleryImages.length) % galleryImages.length)
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
          <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      </div>
    </figure>
  )
}
