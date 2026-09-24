import type { Metadata } from "next"

import { AboutGallerySlider } from "@/components/about-gallery-slider"
import { AboutTrajectory } from "@/components/sections/about-trajectory"

export const metadata: Metadata = {
  title: "Sobre mim",
  description: "Conheça a trajetória, a formação e o trabalho de André Galharde como UI Designer.",
}

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-gallery" aria-labelledby="about-title">
        <div className="about-gallery__inner">
          <div className="about-gallery__copy">
            <p className="about-kicker">SOBRE MIM</p>
            <h1 id="about-title">Sou André<br />Galharde</h1>
            <p>Sou UI Designer. Transformo complexidade em interfaces claras, úteis e fáceis de usar.</p>
          </div>
          <AboutGallerySlider />
        </div>
      </section>
      <AboutTrajectory />
    </div>
  )
}
