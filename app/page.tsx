import Image from "next/image"

import { Container } from "@/components/layout/container"
import { HomeScrollIndicator } from "@/components/home-scroll-indicator"
import { ProjectCard } from "@/components/project-card"
import { AboutTrajectory } from "@/components/sections/about-trajectory"
import { ClientLogos } from "@/components/sections/client-logos"
import { Button } from "@/components/ui/button"
import { projects } from "@/lib/projects"
import { siteConfig } from "@/lib/site-config"

import styles from "./home.module.css"

const featuredProjects = projects.slice(0, 3)
const [emailLocal, emailDomain] = siteConfig.email.split("@")

export default function HomePage() {
  return (
    <div data-brand-surface="warm" className={`portfolio-home ${styles.home}`}>
      <Container className={styles.container}>
        <HomeScrollIndicator />
        <section className={styles.hero} aria-labelledby="home-title" data-home-hero>
          <div className={styles.heroCopy} data-hero-reveal="copy">
            <p className={styles.eyebrow}>UI/UX DESIGNER</p>
            <h1 id="home-title">Pessoas,<br />ideias e<br />resultados<span className="home-accent">.</span></h1>
            <p className={styles.introduction}>Sou André Galharde, designer especializado em transformar desafios complexos em interfaces claras, úteis e fáceis de usar.</p>
            <Button variant="outline" className={styles.heroSecondaryCta} asChild>
              <a href="#projetos">Conheça meu trabalho<span className="portfolio-cta__arrow" aria-hidden="true" /></a>
            </Button>
          </div>
          <div className={styles.composition} aria-label="Fotografias pessoais de André Galharde">
            <figure className={styles.portrait} data-hero-image="portrait">
              <div data-hero-image-inner>
                <Image src="/media/profile/designer-01.jpg" alt="Retrato de André Galharde" fill preload sizes="(min-width: 1280px) 336px, (min-width: 761px) 30vw, 65vw" />
              </div>
            </figure>
            <figure className={styles.travel} data-hero-image="travel">
              <div data-hero-image-inner>
                <Image src="/media/profile/castelo-portugal.png" alt="Castelo histórico em Portugal, do acervo pessoal de André" fill sizes="(min-width: 1280px) 208px, (min-width: 761px) 18vw, 38vw" />
              </div>
            </figure>
            <figure className={styles.football} data-hero-image="football">
              <div data-hero-image-inner>
                <Image src="/media/profile/estadio-benfica.webp" alt="Estádio da Luz, em Lisboa, do acervo pessoal de André" fill sizes="(min-width: 1280px) 224px, (min-width: 761px) 20vw, 40vw" />
              </div>
            </figure>
          </div>
        </section>

        <section id="projetos" className={styles.projects} aria-labelledby="projects-heading" data-scroll-stop>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow} data-home-rail-target>PROJETOS</p>
            <h2 id="projects-heading">Projetos em destaque<span className="home-accent">.</span></h2>
          </header>
          <div className={styles.projectGrid}>
            {featuredProjects.map((project) => <ProjectCard key={project.slug} project={project} editorial />)}
          </div>
        </section>

        <ClientLogos />
        <AboutTrajectory home />

        <section id="contato" className={styles.contact} aria-labelledby="contact-heading" data-scroll-stop>
          <div>
            <p className={styles.eyebrow} data-home-rail-target>CONTATO</p>
            <h2 id="contact-heading">Vamos<br />conversar<span className="home-accent">?</span></h2>
            <p className={styles.contactCopy}>Ideias fortes começam com uma boa conversa.</p>
            <Button variant="brand" asChild>
              <a href={siteConfig.emailHref}>Enviar uma mensagem<span className="portfolio-cta__arrow" aria-hidden="true" /></a>
            </Button>
          </div>
          <div className={styles.contactDetails}>
            <a href={siteConfig.emailHref} className={styles.email}>
              <span>ESTOU POR AQUI</span>
              <span><span className={styles.emailAddress}>{emailLocal}<wbr />@{emailDomain}</span><Image src="/brand/cta-arrow-grafite.svg" alt="" width={16} height={16} unoptimized /></span>
            </a>
            <nav className={styles.socials} aria-label="Redes sociais">
              <a href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Image src="/brand/footer/linkedin.svg" alt="" width={20} height={20} />LinkedIn</a>
              <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram"><Image src="/brand/footer/instagram.svg" alt="" width={20} height={20} />Instagram</a>
              <a href={siteConfig.behanceUrl} target="_blank" rel="noreferrer" aria-label="Behance"><span className={styles.socialMark} aria-hidden="true">Bē</span>Behance</a>
            </nav>
          </div>
        </section>
      </Container>
    </div>
  )
}
