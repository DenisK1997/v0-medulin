"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function TranslatedNav() {
  const languageContext = useLanguage()
  const { translations } = languageContext

  // Safety check to prevent accessing undefined translations
  if (!translations) {
    return null
  }

  return (
    <nav className="hidden md:flex items-center gap-6">
      <Link href="/" className="text-sm font-medium transition-colors hover:text-mediterranean-blue">
        {translations["nav.home"] || "Home"}
      </Link>
      <Link href="/apartments" className="text-sm font-medium transition-colors hover:text-mediterranean-blue">
        {translations["nav.apartments"] || "Apartments"}
      </Link>
      <Link href="/about" className="text-sm font-medium transition-colors hover:text-mediterranean-blue">
        {translations["nav.about"] || "About"}
      </Link>
      <Link href="/contact" className="text-sm font-medium transition-colors hover:text-mediterranean-blue">
        {translations["nav.contact"] || "Contact"}
      </Link>
      <Button className="bg-mediterranean-orange hover:bg-mediterranean-orange-dark text-white">
        {translations["nav.book"] || "Book Now"}
      </Button>
    </nav>
  )
}
