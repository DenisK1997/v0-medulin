"use client"

import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useCallback } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

// Hero images array - replace with your actual images
const heroImages = [
  {
    src: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/cim_associated_03-sTrj0FWeVwaVLEx4LMu3XOJ1yQw7Ew.jpg",
    alt: "Majstorić Apartments Medulin - Beachfront View",
  },
  {
    src: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/cim_associated_01-Zb3VWXlbwrDW4oSKbkxEFakJqBsHWF.jpg",
    alt: "Majstorić Apartments Medulin - Pool Area",
  },
  {
    src: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/cim_associated_04-RXy7J36ANhk6TDY2xRPEv7nmFfhsSN.jpg",
    alt: "Majstorić Apartments Medulin - Garden View",
  },
  {
    src: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/cim_associated_05-ku1RnxiewNhyHx2STxxzU8Rg3yacLR.jpg",
    alt: "Majstorić Apartments Medulin - Apartment Interior",
  },
]

export function HeroSection() {
  const { translations } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Function to go to the next image
  const goToNextImage = useCallback(() => {
    setIsTransitioning(true)
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
  }, [])

  // Function to go to the previous image
  const goToPrevImage = useCallback(() => {
    setIsTransitioning(true)
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length)
  }, [])

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      goToNextImage()
    }, 5000)

    return () => clearInterval(timer)
  }, [goToNextImage])

  // Reset transition state after animation completes
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isTransitioning])

  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48">
      {/* Image carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentImageIndex ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover brightness-[0.7]"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Carousel navigation */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentImageIndex ? "w-6 bg-white" : "bg-white/50",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Arrow navigation */}
        <button
          onClick={goToPrevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors z-10 hidden md:block"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={goToNextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors z-10 hidden md:block"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Content overlay */}
      <div className="container relative z-10 flex flex-col items-center justify-center text-center">
        {/* Logo image - desktop version */}
        <div className="hidden md:block mb-8 relative w-[410px] h-[310px]">
          <Image
            src="https://sssef5nrxfikvijy.public.blob.vercel-storage.com/palm-beach-logo-1-o%20Kopie-02-jdHsQrQl0cIAN4akDSRGhM6C53uZ28.svg"
            alt="Majstorić Apartments Logo - Desktop"
            fill
            className="object-contain drop-shadow-lg"
            priority
          />
        </div>

        {/* Logo image - mobile version */}
        <div className="md:hidden mb-6 relative w-[180px] h-[120px]">
          <Image
            src="https://sssef5nrxfikvijy.public.blob.vercel-storage.com/palm-beach-logo-1-o%20Kopie-02%20mob-02-OxzpTRTBlyZuMutdESFaYaQFLaCclO.svg"
            alt="Majstorić Apartments Logo - Mobile"
            fill
            className="object-contain drop-shadow-lg"
            priority
          />
        </div>

        <div className="space-y-4 text-white">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            {translations["home.hero.title"]}
          </h1>
          <p className="mx-auto max-w-[700px] text-lg md:text-xl">{translations["home.hero.subtitle"]}</p>
        </div>
        <div className="mt-8 w-full max-w-md">
          <Card className="border-0 shadow-lg bg-mediterranean-beige/95">
            <CardContent className="p-4 md:p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <CalendarDays className="h-5 w-5 text-mediterranean-blue" />
                  <h3 className="font-medium">{translations["common.checkAvailability"]}</h3>
                </div>
                <DatePickerWithRange />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{translations["common.guests"]}</label>
                    <select className="w-full rounded-md border border-mediterranean-sand bg-white px-3 py-2 text-sm">
                      <option>1 {translations["common.guests"]}</option>
                      <option>2 {translations["common.guests"]}</option>
                      <option>3 {translations["common.guests"]}</option>
                      <option>4 {translations["common.guests"]}</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{translations["nav.apartments"]}</label>
                    <select className="w-full rounded-md border border-mediterranean-sand bg-white px-3 py-2 text-sm">
                      <option>Any {translations["nav.apartments"]}</option>
                      <option>Suite Apartment Palma</option>
                      <option>Suite Apartment Pinija</option>
                      <option>Studio Apartment Maslina</option>
                      <option>Studio Apartment Agava</option>
                      <option>Studio Apartment Ruzmarin</option>
                      <option>Studio Apartment Oleander</option>
                    </select>
                  </div>
                </div>
                <Button className="w-full bg-mediterranean-blue hover:bg-mediterranean-blue-dark text-white">
                  {translations["common.search"]}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
