import { ProjectCard } from "@/components/project-card"
import { Section } from "@/components/sections/section"
import { homeProfile } from "@/lib/profile"
import { projects } from "@/lib/projects"

export default function HomePage() {
  return (
    <Section containerClassName="grid gap-layout">
      <div className="grid gap-component-lg">
        <div className="grid gap-component">
          <p className="eyebrow">{homeProfile.role}</p>
          <h1 className="max-w-[var(--content-readable)] text-display font-semibold">
            {homeProfile.introduction}
          </h1>
        </div>
      </div>
      <h2 className="text-heading font-semibold">Projetos</h2>
      <div className="grid gap-component sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
      </div>
    </Section>
  )
}
