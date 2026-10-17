"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

function Header() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const NavigationLink = isHome ? "a" : Link
  const navigation = [
    { href: isHome ? "#projetos" : "/#projetos", label: "Projetos" },
    { href: isHome ? "#sobre" : "/#sobre", label: "Sobre Mim" },
    { href: isHome ? "#contato" : "/#contato", label: "Contato" },
  ]
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (pathname !== "/") return

    const sections = ["projetos", "sobre", "contato"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)
    let frame = 0

    const update = () => {
      frame = 0
      const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 0
      const scrollPadding = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
      const reached = sections.filter((section) => {
        const scrollMargin = Number.parseFloat(getComputedStyle(section).scrollMarginTop) || 0
        const activationLine = Math.max(headerBottom, scrollPadding + scrollMargin) + 2
        return section.getBoundingClientRect().top <= activationLine
      })
      const atPageEnd = window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      setActiveSection(atPageEnd ? "contato" : reached.at(-1)?.id ?? null)
    }
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    scheduleUpdate()
    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
    }
  }, [pathname])

  return (
    <header ref={headerRef} className="site-header">
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
        </Link>

        <nav className="site-header__desktop-nav" aria-label="Navegação principal">
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <NavigationLink
                  href={item.href}
                  className={item.label === "Contato" ? "site-header__contact-link" : undefined}
                  aria-current={isHome && activeSection === item.href.slice(1) ? "location" : undefined}
                >
                  {item.label}
                </NavigationLink>
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
              <NavigationLink
                href={item.href}
                className={item.label === "Contato" ? "site-header__contact-link" : undefined}
                aria-current={isHome && activeSection === item.href.slice(1) ? "location" : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NavigationLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export { Header }
