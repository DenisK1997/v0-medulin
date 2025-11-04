"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { translations } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-mediterranean-sand bg-mediterranean-beige">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-mediterranean-blue-dark">Majstorić Apartments</h3>
            <p className="text-sm text-muted-foreground">{translations["footer.description"]}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-mediterranean-blue-dark">{translations["footer.quickLinks"]}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-mediterranean-blue">
                  {translations["nav.home"]}
                </Link>
              </li>
              <li>
                <Link href="/apartments" className="text-muted-foreground hover:text-mediterranean-blue">
                  {translations["nav.apartments"]}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-mediterranean-blue">
                  {translations["nav.about"]}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-mediterranean-blue">
                  {translations["nav.contact"]}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-mediterranean-blue">
                  {translations["footer.aboutIstria"]}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-mediterranean-blue-dark">{translations["footer.contact"]}</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">123 Coastal Road, Medulin, Croatia</li>
              <li className="text-muted-foreground">+385 12 345 6789</li>
              <li className="text-muted-foreground">info@majstoricapartments.com</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-mediterranean-blue-dark">{translations["footer.followUs"]}</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-mediterranean-blue hover:text-mediterranean-blue-dark">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-mediterranean-blue hover:text-mediterranean-blue-dark">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-mediterranean-blue hover:text-mediterranean-blue-dark">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">{translations["footer.newsletter"]}</p>
            <div className="flex">
              <input
                type="email"
                placeholder={translations["footer.yourEmail"]}
                className="w-full rounded-l-md border border-mediterranean-sand bg-white px-3 py-2 text-sm"
              />
              <button className="rounded-r-md bg-mediterranean-orange px-3 py-2 text-sm font-medium text-white hover:bg-mediterranean-orange-dark">
                {translations["footer.subscribe"]}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-mediterranean-sand pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Majstorić Apartments. {translations["footer.copyright"]}
          </p>
        </div>
      </div>
    </footer>
  )
}
