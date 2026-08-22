import Image from "next/image"
import Link from "next/link"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Project } from "@/lib/projects"

type ProjectCardProps = { project: Project }

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projetos/${project.slug}`} className="group block">
      <Card className="h-full gap-component overflow-hidden py-0 transition-transform group-hover:-translate-y-1">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <Image src={project.coverImage} alt={`${project.title} — ${project.type}`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
        </div>
        <CardHeader className="pb-component-lg">
          <CardDescription>{project.type} · {project.year}</CardDescription>
          <CardTitle>{project.title}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  )
}

export { ProjectCard }
