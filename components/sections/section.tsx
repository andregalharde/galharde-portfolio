import * as React from "react"

import { Container } from "@/components/layout/container"
import { cn } from "@/lib/utils"

type SectionElement = "section" | "article" | "div"

type SectionProps = React.ComponentPropsWithoutRef<"section"> & {
  as?: SectionElement
  containerClassName?: string
  compact?: boolean
}

function Section({
  as: Component = "section",
  className,
  containerClassName,
  compact = false,
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      data-slot="section"
      className={cn(compact ? "py-section-compact" : "py-section", className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </Component>
  )
}

export { Section }
export type { SectionProps }
