"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export default function AboutPage() {
  const { translations } = useLanguage()

  return (
    <main className="flex min-h-screen flex-col">
      <section className="relative md:py-24 md:py-32">
        <div className="absolute inset-0 z-0 md:block hidden">
          <Image
            src="https://sssef5nrxfikvijy.public.blob.vercel-storage.com/zeljkoxveronika-qKwqAGveXOIsXyL44kZxnyk8jqJ9fH.png"
            alt="Majstorić Family in Medulin"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>

        {/* Mobile image (shown only on mobile) */}
        <div className="md:hidden w-full h-[300px] relative">
          <Image
            src="https://sssef5nrxfikvijy.public.blob.vercel-storage.com/unnamed%20%2826%29-6BzMfF2Rrcsukmpmu72KGr0EoHO0N1.jpg"
            alt="Majstorić Family in Medulin - Mobile Version"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="container relative z-10 py-8 md:py-0">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl md:text-white">
              {translations["about.title"]}
            </h1>
            <p className="mt-4 md:text-white/90 text-muted-foreground max-w-[700px] text-lg">
              {translations["about.subtitle"]}
            </p>
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-24">
        <div className="grid gap-12 md:gap-16 items-center">
          <div className="mx-auto max-w-3xl">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=600&width=1200"
                alt="The Kovačić Family"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="mx-auto max-w-3xl space-y-6 text-center sm:text-left">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-mediterranean-blue-dark">
              {translations["about.family"]}
            </h2>

            <p className="text-muted-foreground">
              Živimo u prekrasnoj Švicarskoj i već oko 30 godina imamo posebnu vezu s Medulinom u Hrvatskoj. Sredinom
              1990-ih odlučili smo pustiti novo korijenje u malom ribarskom mjestu i od tada provodimo svoje slobodno
              vrijeme u Medulinu, s ljubavlju održavajući kuću i vrt živima.
            </p>

            <p className="text-muted-foreground">
              Naša ljubav prema ovom slikovitom mjestu na jadranskoj obali, mnogi sunčani dani u godini i miris limuna,
              smokava i maslina nadahnuli su nas da drugima pružimo priliku da dožive ljepotu i gostoljubivost Medulina.
            </p>

            <p className="text-muted-foreground">
              Kao ponosni roditelji triju kćeri koje su sada osnovale vlastite obitelji, uživamo provoditi vrijeme s
              njima, posebno tijekom naših zajedničkih odmora.
            </p>

            <p className="text-muted-foreground">
              Ovi zajednički trenuci u Medulinu su nam neprocjenjivi i radujemo se što ćemo vam pružiti nezaboravan
              boravak u našim apartmanima.
            </p>

            <p className="text-muted-foreground">
              Pozivamo vas da postanete dio naše povijesti i otkrijete ljepotu Medulina!
            </p>

            <p className="font-medium text-mediterranean-blue-dark">
              Dobrodošli!
              <br />
              Veronika i Zeljko Majstorić
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
