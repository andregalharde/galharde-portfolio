import Image from "next/image"
import Link from "next/link"

import type { Project } from "@/lib/projects"

type ProjectCardProps = { project: Project; editorial?: boolean }

function ProjectCard({ project, editorial = false }: ProjectCardProps) {
  const summary = project.caseStudy?.summary
    ?? project.sections.find((section) => section.paragraphs.length > 0)?.paragraphs[0]
    ?? "Conheça o processo e as decisões deste projeto."

  return (
    <Link href={`/projetos/${project.slug}`} data-case-tone={project.tone} data-editorial={editorial || undefined} className="case-card group block">
      <article className="project-card case-card__surface">
        <div className="case-card__media">
          <Image
            src={project.coverImage}
            alt={`${project.title} — ${project.type}`}
            fill
            sizes={editorial ? "(min-width: 1280px) 368px, (min-width: 1025px) 30vw, (min-width: 761px) 45vw, 90vw" : "(min-width: 1280px) 596px, (min-width: 760px) calc(50vw - 48px), calc(100vw - 48px)"}
            className="case-card__image"
          />
          <span className="project-card__year">{project.year}</span>
        </div>
        <div className="case-card__meta">
          <div className="case-card__copy">
            <h3>{project.title}</h3>
            <p className="project-card__category">{project.type}</p>
            {!editorial && <p className="project-card__summary">{summary}</p>}
          </div>
          <span className="project-card__arrow" aria-hidden="true">
            <Image src="/brand/project-arrow.svg" alt="" width={24} height={24} />
          </span>
        </div>
      </article>
    </Link>
  )
}

export { ProjectCard }
