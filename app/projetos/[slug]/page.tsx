import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

import { ProjectGallery } from "@/components/project-gallery"
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
  return project ? { title: `${project.title} — ${project.type}` } : {}
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) notFound()

  return (
    <article>
      <Section containerClassName="grid gap-layout">
        <div className="grid gap-component">
          <p className="text-small font-semibold text-muted-foreground">{project.type} · {project.year}</p>
          <h1 className="text-display font-semibold">{project.title}</h1>
        </div>
        <figure className="relative aspect-[16/9] overflow-hidden rounded-ui-card bg-muted">
          <Image src={project.heroImage} alt={`${project.title} — ${project.type}`} fill sizes="(min-width: 1200px) 1200px, 100vw" className="object-cover" priority />
        </figure>
      </Section>
      <Section containerClassName="grid max-w-[var(--content-readable)] gap-layout">
        {project.sections.map((section) => (
          <section key={section.title} className="grid gap-component">
            <h2 className="text-heading font-semibold">{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph} className="text-body text-muted-foreground">{paragraph}</p>)}
            {section.bullets ? <ul className="grid list-disc gap-component-xs pl-component-lg text-body text-muted-foreground">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
            {section.image ? <figure className="relative aspect-[16/9] overflow-hidden rounded-ui-card bg-muted"><Image src={section.image.src} alt={section.image.alt} fill sizes="(min-width: 768px) 672px, 100vw" className="object-contain" /></figure> : null}
          </section>
        ))}
        {project.prototype ? <div className="grid gap-component"><figure className="relative aspect-[16/9] overflow-hidden rounded-ui-card bg-muted"><Image src={project.prototype.image.src} alt={project.prototype.image.alt} fill sizes="(min-width: 768px) 672px, 100vw" className="object-contain" /></figure><div><Button asChild><a href={project.prototype.url} target="_blank" rel="noreferrer">{project.prototype.label}</a></Button></div></div> : null}
      </Section>
      <Section containerClassName="grid gap-layout">
        {project.galleries.map((gallery, index) => <ProjectGallery key={gallery.title} gallery={gallery} projectTitle={project.title} index={index} />)}
      </Section>
    </article>
  )
}
