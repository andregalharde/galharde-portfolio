import Image from "next/image"

import { Section } from "@/components/sections/section"
import { siteConfig } from "@/lib/site-config"

const experience = [
  { company: "Innova", roles: [{ title: "UX/UI Designer", period: "2021 - Atual" }, { title: "Front-end", period: "2017 - 2021" }] },
  { company: "Themediagroup", roles: [{ title: "Front-end/Atendimento ao Cliente", period: "2005 - 2017" }] },
]
const education = [
  { school: "Design Circuit", period: "2025 - Cursando" }, { school: "Design Boost", period: "2025 - Cursando" },
  { school: "Intuitive Pixel", period: "2024 - Concluído" }, { school: "UI Boost", period: "2022 - Concluído" }, { school: "Curso de Figma", period: "2021 - Concluído" },
]
const personalPhotos = [
  { src: "/media/profile/estadio-benfica.webp", alt: "Estádio Benfica" }, { src: "/media/profile/bambina.png", alt: "Cachorra Bambina" }, { src: "/media/profile/castelo-portugal.png", alt: "Castelo" },
]

export default function AboutPage() {
  return <>
    <Section className="about-hero" containerClassName="about-hero__grid"><div className="about-hero__copy"><p className="eyebrow">{siteConfig.name}</p><h1 className="text-display font-semibold">UI Designer</h1><p className="about-hero__lede">Eu crio interfaces intuitivas e experiências digitais estratégicas por meio de simplicidade e funcionalidade para clientes em todos os setores.</p></div><figure className="about-hero__portrait"><Image src="/media/profile/designer-01.jpg" alt="Galharde Designer" width={900} height={1200} priority sizes="(min-width: 768px) 42vw, 100vw" /></figure></Section>
    <Section compact containerClassName="about-photo-grid">{personalPhotos.map((photo) => <figure key={photo.src} className="about-photo-grid__item"><Image src={photo.src} alt={photo.alt} width={960} height={720} sizes="(min-width: 768px) 30vw, 100vw" /></figure>)}</Section>
    <Section containerClassName="about-details">
      <section aria-labelledby="experience-heading" className="about-details__section"><h2 id="experience-heading" className="text-heading font-semibold">Experiência Profissional</h2><ol className="about-timeline">{experience.map((item) => <li key={item.company}><h3 className="text-title font-semibold">{item.company}</h3>{item.roles.map((role) => <p key={role.title} className="about-timeline__role"><strong>{role.title}</strong><span>{role.period}</span></p>)}</li>)}</ol></section>
      <section aria-labelledby="education-heading" className="about-details__section"><h2 id="education-heading" className="text-heading font-semibold">Educação</h2><ol className="about-timeline">{education.map((item) => <li key={item.school}><h3 className="text-title font-semibold">{item.school}</h3><p className="about-timeline__role">{item.period}</p></li>)}</ol></section>
      <section aria-labelledby="contact-heading" className="about-details__section"><h2 id="contact-heading" className="text-heading font-semibold">Contato</h2><ul className="about-contact-list"><li><a href={siteConfig.emailHref}>{siteConfig.email}</a></li><li><a href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer">in/andre-galharde</a></li></ul></section>
    </Section>
  </>
}
