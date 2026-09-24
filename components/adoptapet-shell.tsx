"use client"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Inter, Poppins } from "next/font/google"

import styles from "./adoptapet-product-page.module.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-adoptapet-heading",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-adoptapet-body",
  display: "swap",
})

const assetRoot = "/media/cases/adote-um-pet/landing"

type AdoptapetShellProps = {
  ariaLabel: string
  children: ReactNode
  navBaseHref?: "" | "/adoteumpet"
}

export function AdoptapetIcon({ name, className = "" }: { name: string; className?: string }) {
  return <Image src={`${assetRoot}/${name}`} alt="" width={40} height={40} className={className} aria-hidden="true" />
}

function AdoptapetHeader({ navBaseHref }: { navBaseHref: "" | "/adoteumpet" }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerScrollState, setHeaderScrollState] = useState<"top" | "scrolled">("top")
  const href = (anchor: string) => `${navBaseHref}${anchor}`

  useEffect(() => {
    const updateHeaderScrollState = () => {
      setHeaderScrollState(window.scrollY > 16 ? "scrolled" : "top")
    }

    updateHeaderScrollState()
    window.addEventListener("scroll", updateHeaderScrollState, { passive: true })
    return () => window.removeEventListener("scroll", updateHeaderScrollState)
  }, [])

  return (
    <header className={styles.header} data-scroll-state={headerScrollState}>
      <a href={href("#adoptapet-home")} className={styles.logo} aria-label="AdotaPet — início">
        <AdoptapetIcon name="icon-logo-coral.svg" />
        <span>AdotaPet</span>
      </a>
      <nav className={styles.desktopNav} aria-label="Navegação da demonstração AdotaPet">
        <a href={href("#adoptapet-pets")}>Nossos Pets</a>
        <a href={href("#adoptapet-process")}>Quem Somos</a>
        <a href={href("#adoptapet-faq")}>Ajuda</a>
        <a href={href("#adoptapet-contact")}>Contato</a>
      </nav>
      <div className={styles.headerActions}>
        <a href={href("#adoptapet-pets")} className={styles.adoptButton}><AdoptapetIcon name="icon-adopt-coral.svg" />Adote um pet</a>
        <button type="button" className={styles.menuButton} aria-label={menuOpen ? "Fechar menu AdotaPet" : "Abrir menu AdotaPet"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
          <AdoptapetIcon name="icon-menu.svg" />
        </button>
      </div>
      {menuOpen ? (
        <nav className={styles.mobileNav} aria-label="Navegação móvel da demonstração AdotaPet">
          <a href={href("#adoptapet-pets")} onClick={() => setMenuOpen(false)}>Nossos Pets</a>
          <a href={href("#adoptapet-process")} onClick={() => setMenuOpen(false)}>Quem Somos</a>
          <a href={href("#adoptapet-faq")} onClick={() => setMenuOpen(false)}>Ajuda</a>
          <a href={href("#adoptapet-contact")} onClick={() => setMenuOpen(false)}>Contato</a>
        </nav>
      ) : null}
    </header>
  )
}

function AdoptapetFooter({ navBaseHref }: { navBaseHref: "" | "/adoteumpet" }) {
  const href = (anchor: string) => `${navBaseHref}${anchor}`

  return (
    <footer className={styles.footer} id="adoptapet-contact">
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <a href={href("#adoptapet-home")} className={styles.logo}><AdoptapetIcon name="footer-logo.svg" /><span>AdotaPet</span></a>
            <strong>Não compre, Adote!!!</strong>
            <a href="mailto:contato@adotapet.com.br">contato@adotapet.com.br</a>
          </div>
          <div className={styles.footerColumns}>
            <div><strong>Nosso Pets</strong><a href={href("#adoptapet-pets")}>Cachorros</a><a href={href("#adoptapet-pets")}>Gatos</a><a href={href("#adoptapet-pets")}>Cavalos</a><a href={href("#adoptapet-pets")}>Pássaros</a></div>
            <div><strong>Soluções</strong><a href={href("#adoptapet-process")}>Faça parte</a><a href={href("#adoptapet-process")}>Parceiros</a></div>
            <div><strong>Institucional</strong><a href={href("#adoptapet-process")}>Sobre nós</a><a href={href("#adoptapet-faq")}>Ajuda</a><a href={href("#adoptapet-contact")}>Contato</a></div>
            <div><strong>Central de Ajuda</strong><a href={href("#adoptapet-faq")}>Política de Privacidade</a><a href={href("#adoptapet-faq")}>Central de Ajuda</a></div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© Copyright 2026 Adotapet - todos os direitos reservados</p>
          <div><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><AdoptapetIcon name="social-instagram.svg" /></a><a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X"><AdoptapetIcon name="social-twitter.svg" /></a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook"><AdoptapetIcon name="social-facebook.svg" /></a><a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube"><AdoptapetIcon name="social-youtube.svg" /></a></div>
        </div>
      </div>
    </footer>
  )
}

export function AdoptapetShell({ ariaLabel, children, navBaseHref = "" }: AdoptapetShellProps) {
  return (
    <section className={`adoptapet-page ${styles.page} ${poppins.variable} ${inter.variable}`} aria-label={ariaLabel}>
      <AdoptapetHeader navBaseHref={navBaseHref} />
      {children}
      <AdoptapetFooter navBaseHref={navBaseHref} />
    </section>
  )
}
