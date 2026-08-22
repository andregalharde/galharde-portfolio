import { Container } from "@/components/layout/container"
import { siteConfig } from "@/lib/site-config"

function Footer() {
  return <footer className="border-t-[length:var(--border-width)] bg-background">
    <Container className="flex flex-col gap-component py-layout-sm text-small text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <p>Galharde Designer</p>
      <nav aria-label="Navegação do rodapé"><ul className="flex list-none gap-component p-0">
        <li><a className="rounded-ui-sm hover:text-foreground" href={siteConfig.behanceUrl} target="_blank" rel="noreferrer">Behance</a></li>
        <li><a className="rounded-ui-sm hover:text-foreground" href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a></li>
        <li><a className="rounded-ui-sm hover:text-foreground" href={siteConfig.emailHref}>E-mail</a></li>
      </ul></nav>
    </Container>
  </footer>
}

export { Footer }
