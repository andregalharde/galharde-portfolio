"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { siteConfig } from "@/lib/site-config"

const pageNavigation = [
  { href: "/", label: "Projetos" },
  { href: "/sobre", label: "Sobre" },
] as const

function Header() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const navigation = isHome
    ? [{ href: "#projetos", label: "Projetos" }, { href: "#sobre", label: "Sobre" }, { href: "#contato", label: "Contato" }]
    : pageNavigation
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 16)

    updateScrollState()
    window.addEventListener("scroll", updateScrollState, { passive: true })

    return () => window.removeEventListener("scroll", updateScrollState)
  }, [])

  const scrollState = isScrolled ? "scrolled" : "top"

  return (
    <header className="site-header" data-scroll-state={scrollState} data-home={isHome || undefined}>
      <div className="site-header__frame">
        <Link href="/" aria-label="Galharde — início" className="site-header__logo-link">
          <Image
            src="/brand/logo-galharde.svg"
            alt="Galharde"
            width={135}
            height={38}
            preload
            unoptimized
            className="site-header__logo site-header__logo--wordmark"
          />
          <Image
            src="/brand/logo-minimal.svg"
            alt=""
            width={26}
            height={38}
            loading="eager"
            unoptimized
            className="site-header__logo site-header__logo--minimal"
          />
        </Link>

        <nav className="site-header__desktop-nav" aria-label="Navegação principal">
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <button
            type="button"
            className="site-header__menu-trigger"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            aria-controls="menu-principal-mobile"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>

          <a href={isHome ? "#contato" : siteConfig.emailHref} className="site-header__cta" onClick={() => setIsMenuOpen(false)}>
            {isHome ? <><span className="site-header__cta-label">Vamos conversar</span><span className="site-header__cta-label-short">Contato</span></> : <span>Contato</span>}
            <span className="site-header__cta-arrow" aria-hidden="true">
              <Image
                src="/brand/cta-arrow-white.svg"
                alt=""
                width={9}
                height={9}
                unoptimized
                className="site-header__cta-arrow-icon site-header__cta-arrow-icon--default"
              />
              <Image
                src="/brand/cta-arrow-grafite.svg"
                alt=""
                width={9}
                height={9}
                unoptimized
                className="site-header__cta-arrow-icon site-header__cta-arrow-icon--hover"
              />
            </span>
          </a>
        </div>
      </div>

      <nav
        id="menu-principal-mobile"
        className="site-header__mobile-nav"
        aria-label="Navegação principal mobile"
        hidden={!isMenuOpen}
      >
        <ul>
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={siteConfig.curriculumUrl} target="_blank" rel="noreferrer">
              Currículo
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export { Header }
