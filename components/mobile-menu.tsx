"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { translations = {} } = useLanguage()

  // Close the menu when the path changes (user navigates to a new page)
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  // Safety check to prevent errors during initial load
  if (!translations || Object.keys(translations).length === 0) {
    return null // Don't render menu until translations are loaded
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 right-4 z-50 text-mediterranean-blue"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile menu panel */}
      <div
        className={cn(
          "fixed top-0 right-0 z-40 h-full w-3/4 max-w-sm bg-mediterranean-beige p-6 shadow-xl md:hidden transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="mb-8 mt-8">
            <Link href="/" className="font-semibold text-xl text-mediterranean-blue-dark">
              Majstorić Apartments
            </Link>
          </div>

          <nav className="flex flex-col space-y-6">
            <Link
              href="/"
              className={cn(
                "text-lg font-medium transition-colors hover:text-mediterranean-blue",
                pathname === "/" && "text-mediterranean-blue font-semibold",
              )}
            >
              {translations["nav.home"]}
            </Link>
            <Link
              href="/apartments"
              className={cn(
                "text-lg font-medium transition-colors hover:text-mediterranean-blue",
                pathname === "/apartments" && "text-mediterranean-blue font-semibold",
              )}
            >
              {translations["nav.apartments"]}
            </Link>
            <Link
              href="/about"
              className={cn(
                "text-lg font-medium transition-colors hover:text-mediterranean-blue",
                pathname === "/about" && "text-mediterranean-blue font-semibold",
              )}
            >
              {translations["nav.about"]}
            </Link>
            <Link
              href="/contact"
              className={cn(
                "text-lg font-medium transition-colors hover:text-mediterranean-blue",
                pathname === "/contact" && "text-mediterranean-blue font-semibold",
              )}
            >
              {translations["nav.contact"]}
            </Link>
          </nav>

          <div className="mt-auto pt-6 border-t border-mediterranean-sand">
            <Button className="w-full bg-mediterranean-orange hover:bg-mediterranean-orange-dark text-white">
              {translations["nav.book"]}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
