import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type CTAProps = {
  title: string
  description: string
  primaryAction: ReactNode
  secondaryAction?: ReactNode
  headingAs?: "h2" | "h3" | "h4"
  className?: string
}

function CTA({
  title,
  description,
  primaryAction,
  secondaryAction,
  headingAs: Heading = "h2",
  className,
}: CTAProps) {
  return (
    <div
      data-slot="cta"
      className={cn(
        "flex flex-col gap-component-lg border-y-[length:var(--border-width)] py-layout sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="grid max-w-[var(--content-readable)] gap-component-sm">
        <Heading className="text-heading font-semibold">{title}</Heading>
        <p className="text-body text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-col gap-component-sm sm:flex-row">
        {primaryAction}
        {secondaryAction}
      </div>
    </div>
  )
}

export { CTA }
export type { CTAProps }
