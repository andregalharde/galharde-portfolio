import type { Metadata } from "next"
import Image from "next/image"

import { getProjectIntroductionBySlug } from "@/lib/projects"

import styles from "./page.module.css"

export const metadata: Metadata = {
  title: "Digitart — Identidade visual",
  description:
    "Identidade visual da Digitart, uma agência especializada na criação de sites.",
}

export default function DigitartPage() {
  const digitart = getProjectIntroductionBySlug("digitart")

  if (!digitart) {
    throw new Error("A introdução do projeto Digitart não foi encontrada.")
  }

  return (
    <article className={styles.page}>
      <section className={styles.hero} aria-labelledby="digitart-title">
        <div className={styles.heroInner}>
          <header className={styles.heroHeader}>
            <p className={styles.eyebrow}>{digitart.eyebrow}</p>
            <Image
              className={styles.wordmark}
              src={digitart.logoImage}
              alt="Digitart"
              width={3534}
              height={1023}
            />
          </header>

          <figure className={styles.heroMedia}>
            <Image
              className={styles.heroImage}
              src={digitart.heroImage}
              alt="Identidade visual Digitart com padrão direcional azul"
              fill
              preload
              sizes="(min-width: 1440px) 1216px, (min-width: 901px) 84.5vw, (min-width: 601px) calc(100vw - 64px), calc(100vw - 48px)"
            />
          </figure>
        </div>
      </section>

      <section className={styles.introduction} aria-labelledby="digitart-introduction-title">
        <div className={styles.introductionInner}>
          <div className={styles.introductionHeading}>
            <p className={styles.kicker}>Sobre o projeto</p>
            <h1 id="digitart-title" className={styles.title}>{digitart.title}</h1>
            <h2 id="digitart-introduction-title" className={styles.headline}>
              {digitart.headline}
            </h2>
          </div>

          <div className={styles.introductionContent}>
            <p className={styles.description}>{digitart.description}</p>
            <div className={styles.palette} aria-label="Paleta de cores da Digitart">
              <p className={styles.paletteTitle}>Cores da marca</p>
              <ul className={styles.colorList}>
                {digitart.colors.map((color) => (
                  <li key={color.hex} className={styles.colorItem}>
                    <span
                      className={styles.colorSwatch}
                      style={{ backgroundColor: color.hex }}
                      aria-hidden="true"
                    />
                    <span className={styles.colorLabel}>{color.label}</span>
                    <span className={styles.colorHex}>{color.hex}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
