import { useRef } from "react"
import { Moon, Sun } from "lucide-react"

import { useThemeToggle } from "@/hooks/use-theme-toggle"
import { cn } from "@/lib/utils"

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { isDark, mounted, toggleLabel, toggleTheme } = useThemeToggle({
    duration,
  })

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={() => toggleTheme(buttonRef.current)}
      aria-pressed={isDark}
      className={cn(className)}
      {...props}
    >
      {mounted ? (
        isDark ? (
          <Sun />
        ) : (
          <Moon />
        )
      ) : (
        <span aria-hidden="true" className="block h-4 w-4" />
      )}
      <span className="sr-only">{toggleLabel}</span>
    </button>
  )
}
