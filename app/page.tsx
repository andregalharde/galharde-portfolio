import Image from "next/image"

import { Container } from "@/components/layout/container"
import { HomeScrollIndicator } from "@/components/home-scroll-indicator"
import { HomeHeroGallery } from "@/components/home-hero-gallery"
import { HomeFeaturedProject } from "@/components/home-featured-project"
import { AboutTrajectory } from "@/components/sections/about-trajectory"
import { projects } from "@/lib/projects"

import styles from "./home.module.css"

const featuredProject = projects.find((project) => project.slug === "adote-um-pet")

export default function HomePage() {
  return (
    <div data-brand-surface="warm" className={`portfolio-home ${styles.home}`}>
      <Container className={styles.container}>
        <HomeScrollIndicator />
        <section className={styles.hero} aria-labelledby="home-title" data-home-hero>
          <div className={styles.heroCopy} data-hero-reveal="copy">
            <p className={styles.eyebrow} data-home-rail-target>UI/UX DESIGNER</p>
            <h1 id="home-title">
              <span className={styles.heroTitleLine}>Pessoas, ideias</span>
              <span className={styles.heroTitleLine}>e resultados<span className="home-accent">.</span></span>
            </h1>
            <p className={styles.introduction}>Sou André Galharde, designer especializado em transformar desafios complexos em interfaces claras, úteis e fáceis de usar.</p>
            <div className={styles.heroClients}>
              <a href="https://www.eucatex.com.br/" target="_blank" rel="noopener noreferrer">
                <Image src="/brand/eucatex.svg" alt="Eucatex" width={134} height={30} />
              </a>
              <a href="https://sustentabilidade.brkambiental.com.br" target="_blank" rel="noopener noreferrer">
                <Image src="/brand/brk-logo.svg" alt="BRK" width={68} height={24} />
              </a>
            </div>
          </div>
          <HomeHeroGallery />
        </section>

        <section id="projetos" className={styles.projects} aria-labelledby="projects-heading" data-scroll-stop>
          <p className={styles.eyebrow} data-home-rail-target>PROJETOS</p>
          {featuredProject?.caseStudy ? (
            <HomeFeaturedProject
              title={featuredProject.title}
              description="Uma experiência digital para tornar a adoção de pets mais clara, acolhedora e segura."
              year={featuredProject.year}
              href={`/projetos/${featuredProject.slug}#case-introduction`}
              slides={[
                {
                  title: "Escolha certa, experiência simples",
                  description: featuredProject.caseStudy.introduction.paragraphs[0],
                  image: { src: featuredProject.coverImage, alt: "Prévia da landing page do Adote um Pet em desktop e celular" },
                },
                {
                  title: featuredProject.caseStudy.solution.affinityTitle,
                  description: featuredProject.caseStudy.solution.affinityDescription,
                  image: featuredProject.caseStudy.media.productPreview,
                  position: "top",
                },
                {
                  title: featuredProject.caseStudy.solution.principles[1],
                  description: featuredProject.caseStudy.solution.description,
                  image: { src: "/media/cases/adote-um-pet/landing/pet-bambina.png", alt: "Bambina, um dos pets disponíveis para adoção" },
                },
                {
                  title: featuredProject.caseStudy.solution.principles[2],
                  description: featuredProject.caseStudy.introduction.paragraphs[1],
                  image: featuredProject.caseStudy.media.solution,
                },
              ]}
            />
          ) : null}
        </section>

        <AboutTrajectory home />

      </Container>
    </div>
  )
}
