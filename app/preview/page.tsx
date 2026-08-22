import type { CSSProperties } from "react"
import type { Metadata } from "next"
import Link from "next/link"

import { ContactForm } from "@/components/forms/contact-form"
import { Section } from "@/components/sections/section"
import { CTA } from "@/components/sections/cta"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Preview",
  description: "Catálogo de tokens, componentes e estados do starter reutilizável.",
  robots: {
    index: false,
    follow: false,
  },
}

const colors = [
  { token: "--background", label: "Background" },
  { token: "--foreground", label: "Foreground" },
  { token: "--card", label: "Card" },
  { token: "--card-foreground", label: "Card foreground" },
  { token: "--muted", label: "Muted" },
  { token: "--muted-foreground", label: "Muted foreground" },
  { token: "--primary", label: "Primary" },
  { token: "--primary-foreground", label: "Primary foreground" },
  { token: "--secondary", label: "Secondary" },
  { token: "--secondary-foreground", label: "Secondary foreground" },
  { token: "--destructive", label: "Destructive" },
  { token: "--destructive-foreground", label: "Destructive foreground" },
  { token: "--border", label: "Border" },
  { token: "--input", label: "Input" },
  { token: "--ring", label: "Ring" },
]

function PreviewHeading({ id, title, description }: { id: string; title: string; description: string }) {
  return (
    <div className="grid max-w-[var(--content-readable)] gap-component-sm">
      <h2 id={id} className="text-heading font-semibold">
        {title}
      </h2>
      <p className="text-body text-muted-foreground">{description}</p>
    </div>
  )
}

export default function PreviewPage() {
  return (
    <>
      <Section containerClassName="grid gap-component-lg" compact>
        <p className="text-small font-semibold text-muted-foreground">Referência interna</p>
        <div className="grid max-w-[var(--content-readable)] gap-component">
          <h1 className="text-display font-semibold">Catálogo de componentes</h1>
          <p className="text-body text-muted-foreground">
            Tokens, primitivas e composições disponíveis antes da identidade de um projeto ser
            definida.
          </p>
        </div>
      </Section>

      <Section aria-labelledby="preview-colors" className="border-t-[length:var(--border-width)]" compact>
        <div className="grid gap-layout-sm">
          <PreviewHeading
            id="preview-colors"
            title="Cores semânticas"
            description="Os componentes consomem papéis de cor, nunca valores de marca isolados."
          />
          <div className="grid gap-component sm:grid-cols-2 lg:grid-cols-4">
            {colors.map((color) => (
              <div key={color.token} className="grid gap-component-sm">
                <div
                  aria-hidden="true"
                  className="h-control-lg rounded-ui border-[length:var(--border-width)] shadow-ui-card"
                  style={{ backgroundColor: `var(${color.token})` } as CSSProperties}
                />
                <div>
                  <p className="text-small font-semibold">{color.label}</p>
                  <code className="text-small text-muted-foreground">{color.token}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section aria-labelledby="preview-type" className="border-t-[length:var(--border-width)]" compact>
        <div className="grid gap-layout-sm">
          <PreviewHeading
            id="preview-type"
            title="Tipografia"
            description="Plus Jakarta Sans entra por uma única variável semântica e pode ser trocada por projeto."
          />
          <div className="grid gap-component-lg">
            <p className="text-display font-semibold">Display</p>
            <p className="text-heading font-semibold">Heading</p>
            <p className="text-title font-semibold">Título de componente</p>
            <p className="max-w-[var(--content-readable)] text-body text-muted-foreground">
              Texto corrido mantém largura de leitura, contraste e entrelinha adequados para
              diferentes densidades de conteúdo.
            </p>
            <p className="text-small text-muted-foreground">Texto auxiliar nunca substitui um label.</p>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="preview-foundations" className="border-t-[length:var(--border-width)]" compact>
        <div className="grid gap-layout-sm">
          <PreviewHeading
            id="preview-foundations"
            title="Espaço, borda, raio e sombra"
            description="A escala global mantém ritmo e acabamento consistentes sem valores espalhados."
          />
          <div className="grid gap-component sm:grid-cols-3">
            <div className="grid gap-component-sm">
              <div className="h-control w-full bg-muted" />
              <code className="text-small text-muted-foreground">--control-height</code>
            </div>
            <div className="grid gap-component-sm">
              <div className="h-control w-full rounded-ui border-[length:var(--border-width)] bg-card" />
              <code className="text-small text-muted-foreground">--radius-control</code>
            </div>
            <div className="grid gap-component-sm">
              <div className="h-control w-full rounded-ui-card border-[length:var(--border-width)] bg-card shadow-ui-elevated" />
              <code className="text-small text-muted-foreground">--shadow-elevated</code>
            </div>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="preview-layout" className="border-t-[length:var(--border-width)]" compact>
        <div className="grid gap-layout-sm">
          <PreviewHeading
            id="preview-layout"
            title="Container e Section"
            description="Section aplica o ritmo vertical; Container limita a largura e mantém gutters responsivos."
          />
          <div className="border-y-[length:var(--border-width)] bg-muted py-component-lg">
            <p className="max-w-[var(--content-readable)] text-body text-muted-foreground">
              Esta faixa ocupa somente o Container interno da Section atual. Redimensione a janela para
              observar a largura máxima e as margens laterais fluidas.
            </p>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="preview-buttons" className="border-t-[length:var(--border-width)]" compact>
        <div className="grid gap-layout-sm">
          <PreviewHeading
            id="preview-buttons"
            title="Button"
            description="Variantes shadcn/ui para hierarquia de ações, com foco visível e estados desabilitados."
          />
          <div className="flex flex-wrap items-center gap-component-sm">
            <Button>Primário</Button>
            <Button variant="secondary">Secundário</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Textual</Button>
            <Button disabled>Desabilitado</Button>
          </div>
          <div className="flex flex-wrap items-center gap-component-sm">
            <Button size="sm">Pequeno</Button>
            <Button>Padrão</Button>
            <Button size="lg">Grande</Button>
            <Button asChild variant="outline">
              <Link href="/">Link com asChild</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="preview-card" className="border-t-[length:var(--border-width)]" compact>
        <div className="grid gap-layout-sm">
          <PreviewHeading
            id="preview-card"
            title="Card"
            description="Reservado para conteúdo independente, não como contêiner padrão de toda seção."
          />
          <Card className="max-w-[var(--content-readable)]">
            <CardHeader>
              <CardTitle>Grupo independente</CardTitle>
              <CardDescription>Exemplo da anatomia disponível no componente.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-body text-muted-foreground">
                Header, conteúdo e footer podem ser combinados conforme a necessidade registrada na
                especificação do projeto.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Ação contextual</Button>
            </CardFooter>
          </Card>
        </div>
      </Section>

      <Section aria-labelledby="preview-cta" className="border-t-[length:var(--border-width)]" compact>
        <div className="grid gap-layout-sm">
          <PreviewHeading
            id="preview-cta"
            title="CTA"
            description="Uma composição curta e neutra, sem pressupor hero ou estrutura comercial."
          />
          <div className="grid gap-layout">
            <div className="grid gap-component">
              <h3 className="text-title font-semibold">CTA com uma ação</h3>
              <CTA
                headingAs="h4"
                title="Próximo passo definido pelo projeto"
                description="Substitua esta orientação pela ação aprovada no PROJECT-SPEC.md."
                primaryAction={<Button>Ação principal</Button>}
              />
            </div>
            <div className="grid gap-component">
              <h3 className="text-title font-semibold">CTA com duas ações</h3>
              <CTA
                headingAs="h4"
                title="Hierarquia entre ações"
                description="Use a segunda ação apenas quando houver um caminho alternativo necessário."
                primaryAction={<Button>Ação principal</Button>}
                secondaryAction={<Button variant="outline">Ação secundária</Button>}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="preview-form" className="border-t-[length:var(--border-width)]" compact>
        <div className="grid gap-layout-sm lg:grid-cols-2">
          <PreviewHeading
            id="preview-form"
            title="ContactForm"
            description="Formulário visual e acessível. A base não envia, persiste ou integra os dados."
          />
          <ContactForm />
        </div>
      </Section>
    </>
  )
}
