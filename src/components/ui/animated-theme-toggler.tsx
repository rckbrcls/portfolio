import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { flushSync } from "react-dom"

import { cn } from "@/lib/utils"

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

type ThemeName = "light" | "dark"

type ViewTransitionDocument = Document & {
  startViewTransition?: (
    callback: () => void
  ) => {
    ready?: Promise<void>
  }
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isDark = mounted && resolvedTheme === "dark"

  useEffect(() => {
    setMounted(true)
  }, [])

  const syncDocumentTheme = useCallback((nextTheme: ThemeName) => {
    const root = document.documentElement

    root.classList.remove("light", "dark")
    root.classList.add(nextTheme)
    root.style.colorScheme = nextTheme
  }, [])

  const toggleTheme = useCallback(() => {
    if (!mounted) return

    const button = buttonRef.current
    if (!button) return

    const { top, left, width, height } = button.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const viewportWidth = window.visualViewport?.width ?? window.innerWidth
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight
    const maxRadius = Math.hypot(
      Math.max(x, viewportWidth - x),
      Math.max(y, viewportHeight - y)
    )
    const nextTheme: ThemeName = isDark ? "light" : "dark"

    const applyTheme = () => {
      setTheme(nextTheme)
      syncDocumentTheme(nextTheme)
    }

    const themeDocument = document as ViewTransitionDocument

    if (typeof themeDocument.startViewTransition !== "function") {
      applyTheme()
      return
    }

    const transition = themeDocument.startViewTransition(() => {
      flushSync(() => {
        applyTheme()
      })
    })

    const ready = transition?.ready
    if (ready && typeof ready.then === "function") {
      void ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${maxRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration,
              easing: "ease-in-out",
              pseudoElement: "::view-transition-new(root)",
            }
          )
        })
        .catch(() => undefined)
    }
  }, [duration, isDark, mounted, setTheme, syncDocumentTheme])

  const srLabel = mounted
    ? isDark
      ? "Switch to light theme"
      : "Switch to dark theme"
    : "Toggle theme"

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={toggleTheme}
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
      <span className="sr-only">{srLabel}</span>
    </button>
  )
}
