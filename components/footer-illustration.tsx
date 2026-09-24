"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

const artwork = "/brand/footer/organic-contours.svg"

export function FooterIllustration({ animated = true }: { animated?: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animated) return
    const host = hostRef.current
    if (!host) return
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    let disposed = false
    let started = false
    let visible = false
    let stop = () => {}
    let sync = () => {}

    async function start() {
      if (started || preference.matches || disposed) return
      started = true
      try {
        const THREE = await import("three")
        if (disposed) return
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        const geometry = new THREE.PlaneGeometry(2, 2, 80, 24)
        const material = new THREE.MeshBasicMaterial({ transparent: true, depthTest: false })
        const scene = new THREE.Scene()
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 2)
        camera.position.z = 1
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.domElement.className = "site-footer__canvas"
        host!.appendChild(renderer.domElement)
        let loaded = false
        let time = 0
        let previous = 0
        const positions = geometry.attributes.position
        const original = Float32Array.from(positions.array)
        const render = (now: number) => {
          time += previous ? Math.min((now - previous) / 1000, 0.05) : 0
          previous = now
          for (let i = 0; i < positions.count; i++) {
            const x = original[i * 3]
            const y = original[i * 3 + 1]
            const edge = (1 - x * x) * (1 - y * y)
            positions.setY(i, y + Math.sin(x * 4 + time * 0.45) * 0.025 * edge)
          }
          positions.needsUpdate = true
          renderer.render(scene, camera)
        }
        sync = () => {
          const active = loaded && visible && !document.hidden && !preference.matches
          previous = 0
          renderer.setAnimationLoop(active ? render : null)
          host!.dataset.animated = String(active)
        }
        const resize = new ResizeObserver(() => {
          renderer.setSize(host!.clientWidth, host!.clientHeight, false)
        })
        resize.observe(host!)
        const texture = new THREE.TextureLoader().load(artwork, (map) => {
          if (disposed) { map.dispose(); return }
          map.colorSpace = THREE.SRGBColorSpace
          material.map = map
          material.needsUpdate = true
          loaded = true
          sync()
        })
        const lost = () => {
          loaded = false
          sync()
        }
        renderer.domElement.addEventListener("webglcontextlost", lost)
        stop = () => {
          resize.disconnect()
          renderer.setAnimationLoop(null)
          renderer.domElement.removeEventListener("webglcontextlost", lost)
          texture.dispose()
          material.dispose()
          geometry.dispose()
          renderer.dispose()
          renderer.domElement.remove()
          delete host!.dataset.animated
        }
      } catch {
        stop()
        // The original SVG remains visible when WebGL is unavailable.
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) void start()
      sync()
    })
    const changed = () => {
      if (visible) void start()
      sync()
    }
    observer.observe(host)
    preference.addEventListener("change", changed)
    document.addEventListener("visibilitychange", changed)
    return () => {
      disposed = true
      observer.disconnect()
      preference.removeEventListener("change", changed)
      document.removeEventListener("visibilitychange", changed)
      stop()
    }
  }, [animated])

  return (
    <div ref={hostRef} className="site-footer__illustration" aria-hidden="true">
      <Image src={artwork} alt="" fill unoptimized sizes="(max-width: 760px) 100vw, 1216px" />
    </div>
  )
}
