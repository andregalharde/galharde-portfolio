import Image from "next/image"

import { siteConfig } from "@/lib/site-config"

const experience = [
  { company: "Innova", role: "UX/UI Designer", period: "2021 - Atual" },
  { company: "Themediagroup", role: "Front-end", period: "2017 - 2021" },
  { company: "", role: "Atendimento ao cliente", period: "2005 - 2017" },
] as const

const education = [
  { school: "Design Circuit", period: "2026 - Cursando" },
  { school: "Design Boost", period: "2025 - Concluído" },
  { school: "Intuitive Pixel", period: "2024 - Concluído" },
  { school: "UI Boost", period: "2022 - Concluído" },
  { school: "Curso de Figma", period: "2021 - Concluído" },
] as const

export function AboutTrajectory({ home = false }: { home?: boolean }) {
  return (
    <section id={home ? "sobre" : undefined} className="about-trajectory" aria-labelledby="trajectory-title" data-scroll-stop={home || undefined}>
      <div className="about-trajectory__inner">
        <div className="about-trajectory__intro">
          <p className="about-kicker" data-home-rail-target={home || undefined}>{home ? "SOBRE MIM" : "TRAJETÓRIA"}</p>
          <h2 id="trajectory-title">Experiência<br />e formação{home && <span className="home-accent">.</span>}</h2>
          <p>Do atendimento ao cliente ao front-end e ao UX/UI: minha trajetória conecta a compreensão das pessoas à construção de interfaces.</p>
          <a href={siteConfig.curriculumUrl} target="_blank" rel="noreferrer" className="about-trajectory__curriculum">
            <span>Baixar currículo</span>
            <span className="about-trajectory__curriculum-arrow" aria-hidden="true">
              <Image src="/brand/cta-arrow-white.svg" alt="" width={9} height={9} unoptimized className="about-trajectory__curriculum-arrow-icon about-trajectory__curriculum-arrow-icon--default" />
              <Image src="/brand/cta-arrow-grafite.svg" alt="" width={9} height={9} unoptimized className="about-trajectory__curriculum-arrow-icon about-trajectory__curriculum-arrow-icon--hover" />
            </span>
          </a>
        </div>
        <div className="about-trajectory__content">
          <section aria-labelledby="professional-experience-title">
            <h3 id="professional-experience-title">EXPERIÊNCIA PROFISSIONAL</h3>
            <ol className="about-experience-list">
              {experience.map((item) => (
                <li key={`${item.role}-${item.period}`}>
                  <strong>{item.company}</strong>
                  <span>{item.role}</span>
                  <span>{item.period}</span>
                </li>
              ))}
            </ol>
          </section>
          <section aria-labelledby="education-title" className="about-education">
            <h3 id="education-title">FORMAÇÃO</h3>
            <ol>
              {education.map((item) => (
                <li key={item.school}>
                  <strong>{item.school}</strong>
                  <span>{item.period}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </section>
  )
}
