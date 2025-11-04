import type React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import Image from "next/image"
import { ThemeProvider } from "@/components/theme-provider"
import { Footer } from "@/components/footer"
import { MobileMenu } from "@/components/mobile-menu"
import { LanguageProvider } from "@/contexts/language-context"
import { TranslatedNav } from "@/components/translated-nav"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Apartmani Majstorić - Vaš savršeni odmor u Medulinu, Hrvatska",
  description:
    "Rezervirajte svoj boravak u našim prekrasnim apartmanima u Medulinu, Hrvatska. Šest jedinstvenih apartmana s prekrasnim pogledom i modernim sadržajima.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="hr">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <div className="relative flex min-h-screen flex-col">
              <MobileMenu />
              <header className="sticky top-0 z-40 w-full border-b border-mediterranean-sand bg-mediterranean-beige/95 backdrop-blur supports-[backdrop-filter]:bg-mediterranean-beige/80">
                <div className="container flex h-16 items-center justify-between">
                  <Link href="/" className="flex items-center space-x-2">
                    <div className="relative hidden md:block h-[50px] w-[120px] overflow-hidden">
                      <Image
                        src="https://sssef5nrxfikvijy.public.blob.vercel-storage.com/palm-beach-logo-1-o%20Kopie-02%20mob%20blau-02-55IjFxINMD4fA8tYUd47aMhzYXriaZ.svg"
                        alt="Majstorić Apartments Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="relative md:hidden h-10 w-10 overflow-hidden">
                      <Image
                        src="https://sssef5nrxfikvijy.public.blob.vercel-storage.com/palm-beach-logo-1-o%20icon-02-yrnUt3aNszyDhZvQJhrct0gru5qyhz.svg"
                        alt="Majstorić Apartments Logo Mobile"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="sr-only">Majstorić Apartments</span>
                  </Link>
                  <TranslatedNav />
                </div>
              </header>
              {children}
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
