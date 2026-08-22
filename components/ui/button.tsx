import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-component-xs whitespace-nowrap rounded-ui border-[length:var(--border-width)] border-transparent text-small font-semibold disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-90 active:opacity-80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-muted active:opacity-80",
        outline:
          "border-border bg-background text-foreground hover:bg-muted active:bg-secondary",
        ghost: "text-foreground hover:bg-muted active:bg-secondary",
        link: "h-auto min-h-control bg-transparent px-0 text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-control px-control-x",
        sm: "h-control px-control-x-sm",
        lg: "h-control-lg px-control-x-lg",
        icon: "size-control p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
