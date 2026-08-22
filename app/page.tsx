import { ProjectCard } from "@/components/project-card"
import { Section } from "@/components/sections/section"
import { projects } from "@/lib/projects"

export default function HomePage() {
  const introduction = projects[0]?.sections[0]?.paragraphs[0]

  return (
    <Section containerClassName="grid gap-layout">
      <div className="grid gap-component-lg">
        <div className="grid gap-component">
          <h1 className="text-display font-semibold">Projetos</h1>
          {introduction ? <p className="max-w-[var(--content-readable)] text-body text-muted-foreground">{introduction}</p> : null}
        </div>
      </div>
      <div className="grid gap-component sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
      </div>
    </Section>
  )
}
