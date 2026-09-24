"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"

import { getAdjacentHeroSlideIndex } from "@/lib/hero-slider"
import type { HeroSlide } from "@/lib/hero-slides"

type HeroSliderProps = {
  slides: HeroSlide[]
}

export function HeroSlider({ slides }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const pointerStartX = useRef<number | null>(null)
  const suppressMediaLinkClick = useRef(false)
  const activeSlide = slides[activeIndex]

  if (!activeSlide) return null

  function moveSlide(direction: -1 | 1) {
    setActiveIndex((currentIndex) =>
      getAdjacentHeroSlideIndex(currentIndex, slides.length, direction),
    )
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      moveSlide(-1)
    }

    if (event.key === "ArrowRight") {
      event.preventDefault()
      moveSlide(1)
    }

    if (event.key === "Home") {
      event.preventDefault()
      setActiveIndex(0)
    }

    if (event.key === "End") {
      event.preventDefault()
      setActiveIndex(slides.length - 1)
    }
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (pointerStartX.current === null) return

    const distance = event.clientX - pointerStartX.current
    pointerStartX.current = null

    if (Math.abs(distance) < 48) return
    suppressMediaLinkClick.current = true
    moveSlide(distance > 0 ? -1 : 1)
  }

  return (
    <section
      className="hero-slider"
      aria-label="Cases em destaque"
      aria-roledescription="carousel"
      onKeyDown={handleKeyDown}
    >
      <h1 className="sr-only">Cases em destaque</h1>
      <div className="hero-slider__shell">
        <div className="hero-slider__content">
          <div aria-live="polite" aria-atomic="true">
            <div
              id={"hero-slide-" + activeSlide.slug}
              className="hero-slider__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={activeIndex + 1 + " de " + slides.length}
            >
              <div className="hero-slider__visual">
              <Link
                className="hero-slider__media-link"
                href={activeSlide.href}
                aria-label={"Acessar case " + activeSlide.title}
                onClick={(event) => {
                  if (!suppressMediaLinkClick.current) return
                  event.preventDefault()
                  suppressMediaLinkClick.current = false
                }}
              >
                <div
                  className={
                    "hero-slider__media" +
                    (activeSlide.campaign
                      ? " hero-slider__media--" + activeSlide.campaign.theme
                      : "")
                  }
                  onPointerDown={(event) => {
                    suppressMediaLinkClick.current = false
                    pointerStartX.current = event.clientX
                  }}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={() => {
                    pointerStartX.current = null
                    suppressMediaLinkClick.current = false
                  }}
                >
                  <Image
                    key={activeSlide.image}
                    className="hero-slider__image"
                    src={activeSlide.image}
                    alt={activeSlide.imageAlt}
                    fill
                    preload={activeIndex === 0}
                    sizes="(min-width: 1440px) 1216px, (min-width: 1025px) 84.5vw, (min-width: 761px) calc(100vw - 96px), calc(100vw - 48px)"
                    style={{ objectPosition: activeSlide.imagePosition }}
                    draggable={false}
                  />

                  {activeSlide.campaign ? (
                    <div className="hero-slider__campaign">
                      <Image
                        className="hero-slider__campaign-wordmark"
                        src="/media/cases/digitart/digitart-wordmark.svg"
                        alt=""
                        width={353}
                        height={102}
                        unoptimized
                        draggable={false}
                      />
                      <div className="hero-slider__campaign-copy">
                        <span className="hero-slider__campaign-eyebrow">
                          {activeSlide.campaign.eyebrow}
                        </span>
                        <p className="hero-slider__campaign-headline">
                          {activeSlide.campaign.headline}
                        </p>
                        <span
                          className="hero-slider__campaign-accent"
                          aria-hidden="true"
                        />
                      </div>
                      <span
                        className="hero-slider__campaign-orbit"
                        aria-hidden="true"
                      />
                    </div>
                  ) : null}
                </div>
              </Link>
              </div>

              <div className="hero-slider__meta">
                <div className="hero-slider__case-info">
                  <span className="hero-slider__year">{activeSlide.year}</span>
                  <span className="hero-slider__divider" aria-hidden="true" />
                  <span className="hero-slider__title">{activeSlide.title}</span>
                </div>

                <div className="hero-slider__navigation" role="group" aria-label="Navegação dos cases">
                  <button type="button" className="hero-slider__nav-button" aria-label="Case anterior" onClick={() => moveSlide(-1)}>
                    <Image src="/media/hero/previous.svg" alt="" width={24} height={24} />
                  </button>
                  <span className="hero-slider__counter">{String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
                  <button type="button" className="hero-slider__nav-button" aria-label="Próximo case" onClick={() => moveSlide(1)}>
                    <Image src="/media/hero/next.svg" alt="" width={24} height={24} />
                  </button>
                </div>

                <Link className="hero-slider__case-link" href={activeSlide.href}>
                  <span>{activeSlide.ctaLabel}</span>
                  <span className="hero-slider__case-arrow" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
