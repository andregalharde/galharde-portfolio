import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-32 w-full resize-y rounded-ui border-[length:var(--border-width)] border-input bg-background px-control-x-sm py-component-sm text-body text-foreground shadow-ui-card placeholder:text-muted-foreground hover:border-foreground/40 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
