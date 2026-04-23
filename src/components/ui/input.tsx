import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-background px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-background file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:border-border aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive md:text-sm dark:bg-input dark:disabled:bg-muted dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
