"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useLayoutEffect, useRef, useState } from "react"

import styles from "./home-featured-project.module.css"

type FeaturedProjectSlide = {
  title: string
  description: string
  image: { src: string; alt: string }
  fit?: "cover" | "contain"
  position?: "top" | "center"
}

type HomeFeaturedProjectProps = {
  title: string
  description: string
  year: number
  href: string
  slides: FeaturedProjectSlide[]
}

function HomeFeaturedProject({ title, description, year, href, slides }: HomeFeaturedProjectProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeSlide = slides[activeIndex]
  const mediaRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = document.documentElement
    root.dataset.homeImageMotionReady = "true"
    return () => { delete root.dataset.homeImageMotionReady }
  }, [])

  useEffect(() => {
    const media = mediaRef.current
    if (!media) return

    const reveal = () => { media.dataset.homeImageVisible = "true" }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal()
      return
    }

    const bounds = media.getBoundingClientRect()
    if (bounds.top < window.innerHeight * 0.92 && bounds.bottom > 0) {
      reveal()
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      reveal()
      observer.unobserve(media)
    }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" })
    observer.observe(media)
    return () => observer.disconnect()
  }, [activeIndex])

  if (!activeSlide) return null

  const goToSlide = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length)
  }

  return (
    <article className={styles.card}>
      <div className={styles.intro}>
        <span className={styles.year}>{year}</span>
        <div className={styles.introCopy}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <Link className={styles.caseLink} href={href}>
          Ver introdução do case
          <span aria-hidden="true" />
        </Link>
      </div>

      <section className={styles.slider} aria-label={`Etapas do projeto ${title}`}>
        <div ref={mediaRef} className={styles.media} data-home-image-reveal data-fit={activeSlide.fit ?? "cover"} data-position={activeSlide.position} key={activeSlide.image.src}>
          <Image src={activeSlide.image.src} alt={activeSlide.image.alt} fill sizes="(min-width: 48rem) 50vw, 100vw" style={{ objectPosition: activeSlide.position }} />
        </div>
        <div className={styles.slideInfo} aria-live="polite" aria-atomic="true">
          <div className={styles.slideCopy} key={activeIndex}>
            <p className={styles.step}>0{activeIndex + 1} <span>/ 0{slides.length}</span></p>
            <h4>{activeSlide.title.replace(/\.$/, "")}</h4>
            <p className={styles.description}>{activeSlide.description}</p>
          </div>
          <div className={styles.controls} role="group" aria-label="Navegação das etapas">
            <button type="button" onClick={() => goToSlide(activeIndex - 1)} aria-label="Etapa anterior">
              <span aria-hidden="true" />
            </button>
            <div className={styles.pagination}>
              {slides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  className={index === activeIndex ? styles.active : undefined}
                  aria-label={`Ir para etapa ${index + 1}: ${slide.title}`}
                  aria-current={index === activeIndex ? "step" : undefined}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
            <button type="button" onClick={() => goToSlide(activeIndex + 1)} aria-label="Próxima etapa">
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </article>
  )
}

export { HomeFeaturedProject }
export type { FeaturedProjectSlide }
