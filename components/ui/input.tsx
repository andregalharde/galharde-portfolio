import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-control w-full rounded-ui border-[length:var(--border-width)] border-input bg-background px-control-x-sm text-body text-foreground shadow-ui-card placeholder:text-muted-foreground hover:border-foreground/40 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
