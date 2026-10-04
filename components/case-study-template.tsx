import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"

import type { CaseStudy } from "@/lib/projects"

type CaseStudyStyle = CSSProperties & Record<"--case-blue" | "--case-coral" | "--case-blush" | "--case-peach" | "--case-ink", string>

export function CaseStudyTemplate({ caseStudy }: { caseStudy: CaseStudy }) {
  const isAdotaPet = caseStudy.liveExperience === "adotapet-home"
  const style: CaseStudyStyle = {
    "--case-blue": caseStudy.styleGuide.colors[0].hex,
    "--case-coral": caseStudy.styleGuide.colors[1].hex,
    "--case-blush": caseStudy.styleGuide.colors[2].hex,
    "--case-peach": caseStudy.styleGuide.colors[3].hex,
    "--case-ink": caseStudy.styleGuide.colors[4].hex,
  }

  return <article className={`case-study${isAdotaPet ? " case-study--adotapet" : ""}`} style={style}>
    <section className="case-study__hero">
      <div className="case-study__container case-study__hero-grid">
        <div className={`case-study__hero-copy${isAdotaPet ? " case-study__hero-copy--adotapet" : ""}`}>
          {!isAdotaPet ? <p className="case-study__eyebrow">{caseStudy.eyebrow}</p> : null}
          <h1>{isAdotaPet ? "Adote um Pet." : caseStudy.title}</h1>
          <p className="case-study__subtitle">{caseStudy.subtitle}</p>
        </div>
        <div className="case-study__hero-summary"><p>{caseStudy.summary}</p><dl><div><dt>Ano</dt><dd>{caseStudy.year}</dd></div><div><dt>Atuação</dt><dd>{caseStudy.discipline}</dd></div></dl></div>
      </div>
      <div className="case-study__container case-study__hero-art"><figure className="case-study__hero-image"><Image src={caseStudy.media.hero.src} alt={caseStudy.media.hero.alt} fill sizes="(min-width: 75rem) 76rem, 100vw" priority /></figure><figure className="case-study__hero-preview">{isAdotaPet ? <picture><source media="(max-width: 47.5rem)" srcSet="/media/cases/adote-um-pet/landing/home-hero-mobile-clean.png" /><Image src="/media/cases/adote-um-pet/landing/home-hero.png" alt="Hero da página inicial do AdotaPet" fill sizes="(min-width: 75rem) 25vw, 50vw" /></picture> : <Image src={caseStudy.media.productPreview.src} alt={caseStudy.media.productPreview.alt} fill sizes="(min-width: 75rem) 20rem, 36vw" />}</figure>{caseStudy.liveExperience === "adotapet-home" ? <Link href="/adoteumpet" target="_blank" rel="noopener noreferrer" className="case-study__site-link"><span>Acesse o site do Adota Pet</span><span className="portfolio-cta__arrow" aria-hidden="true" /></Link> : null}</div>
    </section>

    <section id="case-introduction" className="case-study__intro case-study__container"><div><p className="case-study__eyebrow">Contexto</p><h2>{caseStudy.introduction.title}</h2></div><div className="case-study__intro-copy">{caseStudy.introduction.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>

    <section className="case-study__solution"><div className="case-study__container case-study__solution-grid"><div className="case-study__solution-copy"><p className="case-study__eyebrow">{caseStudy.solution.eyebrow}</p><h2>{caseStudy.solution.title}</h2><p>{caseStudy.solution.description}</p><ul>{caseStudy.solution.principles.map((principle) => <li key={principle}>{principle}</li>)}</ul></div><figure className="case-study__solution-visual"><Image src={caseStudy.media.solution.src} alt={caseStudy.media.solution.alt} fill sizes="(min-width: 64rem) 50vw, 100vw" /></figure></div></section>

    <section className="case-study__affinity"><div className="case-study__container case-study__affinity-grid"><figure><Image src={caseStudy.media.campaign.src} alt={caseStudy.media.campaign.alt} fill sizes="(min-width: 64rem) 40vw, 100vw" /></figure><div><p className="case-study__eyebrow">{caseStudy.solution.eyebrow}</p><h2>{caseStudy.solution.affinityTitle}</h2><p>{caseStudy.solution.affinityDescription}</p></div></div></section>

    <section className="case-study__guide case-study__container"><div><p className="case-study__eyebrow">Style guide</p><h2>{caseStudy.styleGuide.title}</h2><p>{caseStudy.styleGuide.description}</p></div><div className="case-study__guide-details"><p className="case-study__typeface">{caseStudy.styleGuide.typeface}</p><div className="case-study__swatches">{caseStudy.styleGuide.colors.map((color) => <div key={color.hex}><span style={{ backgroundColor: color.hex }} aria-hidden="true" /><strong>{color.label}</strong><code>{color.hex}</code></div>)}</div></div></section>

    <section className="case-study__challenges"><div className="case-study__container"><div className="case-study__challenges-heading"><p className="case-study__eyebrow">Desafios</p><h2>{caseStudy.challenges.title}</h2><p>{caseStudy.challenges.description}</p></div><ol>{caseStudy.challenges.items.map((item, index) => <li key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.title}</strong><p>{item.body}</p></li>)}</ol></div></section>

    <section className="case-study__results case-study__container"><div><p className="case-study__eyebrow">Resultados</p><h2>{caseStudy.results.title}</h2><p>{caseStudy.results.description}</p></div><ol>{caseStudy.results.items.map((item, index) => <li key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.body}</p></li>)}</ol></section>

  </article>
}
