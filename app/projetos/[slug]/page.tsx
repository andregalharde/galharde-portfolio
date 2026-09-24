import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

import { ProjectGallery } from "@/components/project-gallery"
import { CaseStudyTemplate } from "@/components/case-study-template"
import { Section } from "@/components/sections/section"
import { Button } from "@/components/ui/button"
import { getProjectBySlug, projects } from "@/lib/projects"

type ProjectPageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  return project ? { title: `${project.caseStudy?.title ?? project.title} — ${project.type}` } : {}
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) notFound()

  if (project.caseStudy) return <CaseStudyTemplate caseStudy={project.caseStudy} />

  return (
    <article className="case-page">
      <Section className="case-masthead" containerClassName="grid gap-layout">
        <div className="grid gap-component">
          <p className="text-small font-semibold text-muted-foreground">{project.type} · {project.year}</p>
          <h1 className="text-display font-semibold">{project.title}</h1>
        </div>
        <figure className="project-canvas relative aspect-[16/9] overflow-hidden rounded-ui-card" data-tone={project.tone}>
          <Image src={project.heroImage} alt={`${project.title} — ${project.type}`} fill sizes="(min-width: 1200px) 1200px, 100vw" className="object-cover" priority />
        </figure>
      </Section>
      <Section className="case-editorial" containerClassName="grid max-w-[var(--content-readable)] gap-layout">
        {project.sections.map((section) => (
          <section key={section.title} className="grid gap-component">
            <h2 className="text-heading font-semibold">{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph} className="text-body text-muted-foreground">{paragraph}</p>)}
            {section.bullets ? <ul className="grid list-disc gap-component-xs pl-component-lg text-body text-muted-foreground">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
            {section.styleGuide ? <div className="grid gap-component-lg">
              <div className="grid gap-component sm:grid-cols-2">
                {section.styleGuide.palettes.map((palette) => <section key={palette.label} className="grid gap-component-sm" aria-label={`Paleta ${palette.label}`}>
                  <h3 className="text-title font-semibold">{palette.label}</h3>
                  <ul className="grid list-none gap-component-sm p-0">
                    {palette.colors.map((color) => <li key={`${color.label}-${color.hex}`} className="flex items-center gap-component-sm">
                      <span aria-hidden="true" className="size-control shrink-0 rounded-ui border-[length:var(--border-width)]" style={{ backgroundColor: color.hex }} />
                      <span className="grid text-small"><strong>{color.label}</strong><code>{color.hex}</code></span>
                    </li>)}
                  </ul>
                </section>)}
              </div>
              <section aria-labelledby={`${project.slug}-grid-heading`} className="grid gap-component-sm">
                <h3 id={`${project.slug}-grid-heading`} className="text-title font-semibold">Grid</h3>
                <dl className="grid gap-component-sm sm:grid-cols-3">
                  {section.styleGuide.grid.map((fact) => <div key={fact.label} className="rounded-ui border-[length:var(--border-width)] p-component"><dt className="text-small text-muted-foreground">{fact.label}</dt><dd className="text-title font-semibold">{fact.value}</dd></div>)}
                </dl>
              </section>
              <section aria-labelledby={`${project.slug}-typography-heading`} className="grid gap-component-sm">
                <h3 id={`${project.slug}-typography-heading`} className="text-title font-semibold">Tipografia</h3>
                <dl className="grid gap-component-sm sm:grid-cols-2">
                  {section.styleGuide.typography.map((group) => <div key={group.label}><dt className="font-semibold">{group.label}</dt>{group.styles.map((style) => <dd key={style} className="text-small text-muted-foreground">{style}</dd>)}</div>)}
                </dl>
              </section>
            </div> : null}
            {section.image ? <figure className="relative aspect-[16/9] overflow-hidden rounded-ui-card bg-muted"><Image src={section.image.src} alt={section.image.alt} fill sizes="(min-width: 768px) 672px, 100vw" className="object-contain" /></figure> : null}
          </section>
        ))}
        {project.prototype ? <div className="grid gap-component"><figure className="relative aspect-[16/9] overflow-hidden rounded-ui-card bg-muted"><Image src={project.prototype.image.src} alt={project.prototype.image.alt} fill sizes="(min-width: 768px) 672px, 100vw" className="object-contain" /></figure><div><Button variant="brand" asChild><a href={project.prototype.url} target="_blank" rel="noreferrer">{project.prototype.label}<span className="portfolio-cta__arrow" aria-hidden="true" /></a></Button></div></div> : null}
      </Section>
      <Section containerClassName="grid gap-layout">
        {project.galleries.map((gallery, index) => <ProjectGallery key={gallery.title} gallery={gallery} projectTitle={project.title} index={index} />)}
      </Section>
    </article>
  )
}
