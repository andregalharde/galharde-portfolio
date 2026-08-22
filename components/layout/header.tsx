"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Container } from "@/components/layout/container"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

const navigation = [{ href: "/", label: "Projetos" }, { href: "/sobre", label: "Sobre" }]
const linkClass = "inline-flex min-h-control items-center rounded-ui px-control-x-sm text-small font-medium text-muted-foreground hover:bg-muted hover:text-foreground"

function Header() {
  const pathname = usePathname()
  return <header className="border-b-[length:var(--border-width)] bg-background">
    <Container className="portfolio-header flex min-h-control-lg items-center justify-between gap-component py-component-sm">
      <Link href="/" className="rounded-ui-sm text-small font-semibold tracking-tight text-foreground">André Galharde</Link>
      <nav aria-label="Navegação principal"><ul className="flex list-none items-center gap-component-xs p-0">
        {navigation.map((item) => <li key={item.href}><Link href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={cn(linkClass, pathname === item.href && "bg-muted text-foreground underline decoration-[length:var(--border-width)] underline-offset-[var(--space-2)]")}>{item.label}</Link></li>)}
        <li><a href={siteConfig.curriculumUrl} target="_blank" rel="noreferrer" className={linkClass}>Currículo</a></li>
        <li><a href={siteConfig.emailHref} className={linkClass}>Contato</a></li>
      </ul></nav>
    </Container>
  </header>
}

export { Header }
