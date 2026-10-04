"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { createHeroPhotoTimeline } from "@/lib/home-hero-motion"

import styles from "./home-hero-gallery.module.css"

// Replace the paths here to change the photographs without changing the motion.
const photographs = [
  { src: "/slider-01.JPEG", fit: "cover", position: "30% 50%" },
  { src: "/slider-02.JPEG", fit: "cover", position: "50% 50%" },
  { src: "/slider-03.JPEG", fit: "cover", position: "50% 30%" },
  { src: "/slider-04.webp", fit: "cover", position: "50% 50%" },
] as const

export function HomeHeroGallery() {
  const rootRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<SVGGElement>(null)
  const outerOrbitRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const orbit = orbitRef.current
    const outerOrbit = outerOrbitRef.current
    if (!root || !orbit || !outerOrbit) return

    const media = gsap.matchMedia()
    media.add(
      { motion: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)" },
      (context) => {
        if (context.conditions?.reduced) {
          root.dataset.animationState = "static"
          return
        }

        const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-hero-photo]"))
        const images = Array.from(root.querySelectorAll<HTMLImageElement>("img"))
        let photos: gsap.core.Timeline | undefined
        let rotation: gsap.core.Tween | undefined
        let outerRotation: gsap.core.Tween | undefined
        let inView = false
        let ready = false
        let disposed = false

        const updatePlayback = () => {
          const play = ready && inView && !document.hidden
          photos?.paused(!play)
          rotation?.paused(!play)
          outerRotation?.paused(!play)
          root.dataset.animationState = play ? "running" : "paused"
        }
        const observer = new IntersectionObserver(([entry]) => {
          inView = entry.isIntersecting
          updatePlayback()
        })
        observer.observe(root)
        document.addEventListener("visibilitychange", updatePlayback)

        // Start with the images available now; a single slow decode must not hold up the whole hero.
        const decodeAll = Promise.all(images.map((image) => image.decode().catch(() => undefined)))
        const readinessTimeout = new Promise<void>((resolve) => window.setTimeout(resolve, 1200))
        Promise.race([decodeAll, readinessTimeout])
          .then(() => {
            if (disposed) return
            const availableLayers = layers.filter((layer) => layer.querySelector("img")!.naturalWidth > 0)
            if (availableLayers.length === 0) {
              observer.disconnect()
              document.removeEventListener("visibilitychange", updatePlayback)
              root.dataset.animationState = "static"
              return
            }

            photos = createHeroPhotoTimeline(availableLayers)
            rotation = gsap.to(orbit, {
              svgOrigin: "296.91 280",
              rotation: 360,
              duration: 24,
              repeat: -1,
              ease: "none",
              paused: true,
            })
            outerRotation = gsap.to(outerOrbit, {
              svgOrigin: "296.91 280",
              rotation: -360,
              duration: 32,
              repeat: -1,
              ease: "none",
              paused: true,
            })
            ready = true
            updatePlayback()
          })

        return () => {
          disposed = true
          photos?.kill()
          rotation?.kill()
          outerRotation?.kill()
          observer.disconnect()
          document.removeEventListener("visibilitychange", updatePlayback)
        }
      },
      root,
    )

    return () => media.revert()
  }, [])

  return (
    <div ref={rootRef} className={styles.composition} data-hero-media>
      <svg className={styles.decoration} viewBox="0 0 593.81 560" fill="none" aria-hidden="true">
        <g ref={outerOrbitRef} data-hero-orbit="outer">
          <g transform="translate(296.91 280) rotate(180) scale(1.056) translate(-296.91 -280)">
            <image href="/brand/hero-video-arc.svg" x="284.576" y="22.59" width="304.312" height="539.4" opacity="0.75" />
            <image href="/brand/hero-video-dot.svg" x="416.1" y="16.6" width="12" height="12" />
          </g>
        </g>
        <g ref={orbitRef} data-hero-orbit>
          <image href="/brand/hero-video-arc.svg" x="284.576" y="22.59" width="304.312" height="539.4" />
          <image href="/brand/hero-video-dot.svg" x="416.1" y="16.6" width="12" height="12" />
        </g>
      </svg>
      <div className={styles.circle} role="img" aria-label="Fotografias pessoais: evento, pôr do sol, retrato em grupo e estádio do Benfica">
        {photographs.map((photo, index) => (
          <div key={photo.src} className={styles.photo} data-hero-photo>
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="(max-width: 760px) 85vw, (max-width: 1024px) 45vw, 520px"
              preload={index === 0}
              loading={index === 0 ? undefined : "eager"}
              style={{ objectFit: photo.fit, objectPosition: photo.position }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
