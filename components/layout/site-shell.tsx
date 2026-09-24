"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { PortfolioIntro } from "@/components/portfolio-intro"

function SiteShell({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname()
  const isStandalone = pathname === "/adoteumpet" || pathname.startsWith("/adoteumpet/")

  if (isStandalone) {
    return <main id="main-content" className="flex-1">{children}</main>
  }

  return (
    <>
      <PortfolioIntro />
      <a
        href="#main-content"
        className="fixed left-container-gutter top-component z-50 -translate-y-[200%] rounded-ui bg-primary px-control-x py-component-sm text-small font-semibold text-primary-foreground focus:translate-y-0"
      >
        Ir para o conteúdo
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer light={pathname === "/"} />
    </>
  )
}

export { SiteShell }
