import Image from "next/image"

import type { ProjectGallery as ProjectGalleryData } from "@/lib/projects"

type ProjectGalleryProps = {
  gallery: ProjectGalleryData
  projectTitle: string
  index: number
}

function ProjectGallery({ gallery, projectTitle, index }: ProjectGalleryProps) {
  const headingId = `project-gallery-${index}`

  return (
    <section aria-labelledby={headingId} className="grid gap-component-lg">
      <h2 id={headingId} className="text-heading font-semibold">{projectTitle}: {gallery.title}</h2>
      <div className="grid gap-component sm:grid-cols-2 lg:grid-cols-3">
        {gallery.images.map((image) => (
          <figure key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-ui-card bg-muted">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
          </figure>
        ))}
      </div>
    </section>
  )
}

export { ProjectGallery }
