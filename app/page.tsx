"use client"

import Link from "next/link"
import { MapPin, Star, Users } from "lucide-react"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ApartmentCard } from "@/components/apartment-card"
import { HeroSection } from "@/components/hero-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { LocationSection } from "@/components/location-section"
import { useLanguage } from "@/contexts/language-context"

export default function Home() {
  const { translations } = useLanguage()
  const [carouselPosition, setCarouselPosition] = useState(0)

  // Add this safety check to prevent rendering when translations are undefined
  if (!translations) {
    return null
  }

  const getVisibleSlidesCount = () => {
    // Return different number of visible slides based on screen size
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 768) return 3 // Show 3 cards on tablet/desktop
      return 1 // Show 1 card on mobile
    }
    return 1 // Default for SSR
  }

  const handleCarouselNav = (direction: "prev" | "next") => {
    const visibleSlides = getVisibleSlidesCount()
    const totalSlides = apartments.length
    const totalPages = Math.ceil(totalSlides / visibleSlides)

    // Calculate current page index (0-based)
    const currentPageIndex = Math.abs(carouselPosition) / 100

    if (direction === "prev") {
      // If at the first page, go to the last page
      if (currentPageIndex === 0) {
        setCarouselPosition(-((totalPages - 1) * 100))
      } else {
        setCarouselPosition((prev) => prev + 100)
      }
    } else {
      // If at the last page, go to the first page
      if (currentPageIndex >= totalPages - 1) {
        setCarouselPosition(0)
      } else {
        setCarouselPosition((prev) => prev - 100)
      }
    }
  }

  useEffect(() => {
    const handleResize = () => {
      // Reset position when screen size changes to avoid empty spaces
      setCarouselPosition(0)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const apartments = [
    {
      id: 1,
      name: "Suite Apartment Palma",
      subName: "Suite 1",
      description: "place holder text",
      price: 150,
      image: "/placeholder.svg?height=300&width=400",
      beds: 2,
      baths: 1,
      guests: 4,
      sofaBeds: 1,
      images: [
        {
          url: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/apartment1-KuIf1L14B2r2oUZ5J0qr7yKDhKDTI2.jpg",
          alt: "Suite Apartment Palma Featured Image",
          isFeatured: true,
        },
        {
          url: "/placeholder.svg?height=300&width=400",
          alt: "Suite Apartment Palma Image 2",
        },
        {
          url: "/placeholder.svg?height=300&width=400",
          alt: "Suite Apartment Palma Image 3",
        },
        {
          url: "/placeholder.svg?height=300&width=400",
          alt: "Suite Apartment Palma Image 4",
        },
      ],
    },
    {
      id: 2,
      name: "Suite Apartment Pinija",
      subName: "Suite 2",
      description: "place holder text",
      price: 145,
      image: "/placeholder.svg?height=300&width=400",
      beds: 2,
      baths: 1,
      guests: 3,
      sofaBeds: 1,
      images: [
        {
          url: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/apartment1-KuIf1L14B2r2oUZ5J0qr7yKDhKDTI2.jpg",
          alt: "Suite Apartment Pinija Featured Image",
          isFeatured: true,
        },
        {
          url: "/placeholder.svg?height=300&width=400",
          alt: "Suite Apartment Pinija Image 2",
        },
        {
          url: "/placeholder.svg?height=300&width=400",
          alt: "Suite Apartment Pinija Image 3",
        },
        {
          url: "/placeholder.svg?height=300&width=400",
          alt: "Suite Apartment Pinija Image 4",
        },
      ],
    },
    {
      id: 3,
      name: "Studio Apartment Maslina",
      subName: "Studio 3",
      description: "place holder text",
      price: 95,
      image: "/placeholder.svg?height=300&width=400",
      beds: 2,
      baths: 1,
      guests: 3,
      images: [
        {
          url: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/apartment1-KuIf1L14B2r2oUZ5J0qr7yKDhKDTI2.jpg",
          alt: "Studio Apartment Maslina Featured Image",
          isFeatured: true,
        },
        {
          url: "/placeholder.svg?height=300&width=400",
          alt: "Studio Apartment Maslina Image 2",
        },
        {
          url: "/placeholder.svg?height=300&width=400",
          alt: "Studio Apartment Maslina Image 3",
        },
        {
          url: "/placeholder.svg?height=300&width=400",
          alt: "Studio Apartment Maslina Image 4",
        },
      ],
    },
    {
      id: 4,
      name: "Studio Apartment Agava",
      subName: "Studio 4",
      description: "place holder text",
      price: 90,
      image: "/placeholder.svg?height=300&width=400",
      beds: 2,
      baths: 1,
      guests: 3,
      images: [
        {
          url: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/apartment1-KuIf1L14B2r2oUZ5J0qr7yKDhKDTI2.jpg",
          alt: "Studio Apartment Agava Featured Image",
          isFeatured: true,
        },
        {
          url: "/placeholder.svg?height=300&width=400",
          alt: "Studio Apartment Agava Image 2",
        },
        {
          url: "/placeholder.svg?height=300&width=400",
          alt: "Studio Apartment Agava Image 3",
        },
        {
          url: "/placeholder.svg?height=300&width=400",
          alt: "Studio Apartment Agava Image 4",
        },
      ],
    },
    {
      id: 5,
      name: "Studio Apartment Ruzmarin",
      subName: "Studio 5",
      description: "place holder text",
      price: 85,
      image: "/placeholder.svg?height=300&width=400",
      beds: 2,
      baths: 1,
      guests: 3,
      images: [
        {
          url: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/apartment1-KuIf1L14B2r2oUZ5J0qr7yKDhKDTI2.jpg",
          alt: "Studio Apartment Ruzmarin Featured Image",
          isFeatured: true,
        },
        {
          url: "/placeholder.svg?height=300&width=400",
          alt: "Studio Apartment Ruzmarin Image 2",
        },
        {
          url: "/placeholder.svg?height=300&width=400",
          alt: "Studio Apartment Ruzmarin Image 3",
        },
        {
          url: "/placeholder.svg?height=300&width=400",
          alt: "Studio Apartment Ruzmarin Image 4",
        },
      ],
    },
    {
      id: 6,
      name: "Studio Apartment Oleander",
      subName: "Studio 6",
      description: "place holder text",
      price: 85,
      image: "/placeholder.svg?height=300&width=400",
      beds: 2,
      baths: 1,
      guests: 3,
      images: [
        {
          url: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/apartment1-KuIf1L14B2r2oUZ5J0qr7yKDhKDTI2.jpg",
          alt: "Studio Apartment Oleander Featured Image",
          isFeatured: true,
        },
        {
          url: "/placeholder.svg?height=300&width=400",
          alt: "Studio Apartment Oleander Image 2",
        },
        {
          url: "/placeholder.svg?height=300&width=400",
          alt: "Studio Apartment Oleander Image 3",
        },
        {
          url: "/placeholder.svg?height=300&width=400",
          alt: "Studio Apartment Oleander Image 4",
        },
      ],
    },
  ]

  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection subtitle="Six beautiful apartments in the heart of Medulin, Croatia. Experience the perfect blend of comfort, luxury, and authentic Mediterranean charm." />

      <section className="container py-12 md:py-24 lg:py-32">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-mediterranean-blue-dark">
              {translations["home.apartments.title"]}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {translations["home.apartments.subtitle"]}
            </p>
          </div>
        </div>

        <div className="mt-12 relative">
          {/* Carousel container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(${carouselPosition}%)`,
              }}
            >
              {apartments.map((apartment) => (
                <div key={apartment.id} className="px-3 w-full md:w-1/3 flex-shrink-0">
                  <ApartmentCard apartment={apartment} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={() => handleCarouselNav("prev")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md z-10 -ml-4 hover:bg-white transition-colors"
            aria-label="Previous apartment"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-mediterranean-blue-dark"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => handleCarouselNav("next")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md z-10 -mr-4 hover:bg-white transition-colors"
            aria-label="Next apartment"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-mediterranean-blue-dark"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {[0, 1].map((pageIndex) => {
              const position = -(pageIndex * 100)
              return (
                <button
                  key={pageIndex}
                  onClick={() => setCarouselPosition(position)}
                  className={`h-2 rounded-full transition-all ${
                    Math.abs(carouselPosition) === Math.abs(position)
                      ? "w-6 bg-mediterranean-blue"
                      : "w-2 bg-mediterranean-blue/30"
                  }`}
                  aria-label={`Go to slide group ${pageIndex + 1}`}
                />
              )
            })}
          </div>
        </div>
      </section>

      <section className="hidden bg-mediterranean-sand py-12 md:py-24 lg:py-32 hero-pattern">
        <div className="container space-y-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-mediterranean-blue-dark">
                {translations["home.why.title"]}
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {translations["home.why.subtitle"]}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="bg-white border-mediterranean-sand">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-mediterranean-blue/10">
                  <MapPin className="h-10 w-10 text-mediterranean-blue" />
                </div>
                <h3 className="text-xl font-bold text-mediterranean-blue-dark">
                  {translations["home.location.title"]}
                </h3>
                <p className="text-muted-foreground">{translations["home.location.description"]}</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-mediterranean-sand">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-mediterranean-blue/10">
                  <Users className="h-10 w-10 text-mediterranean-blue" />
                </div>
                <h3 className="text-xl font-bold text-mediterranean-blue-dark">{translations["home.service.title"]}</h3>
                <p className="text-muted-foreground">{translations["home.service.description"]}</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-mediterranean-sand">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-mediterranean-blue/10">
                  <Star className="h-10 w-10 text-mediterranean-blue" />
                </div>
                <h3 className="text-xl font-bold text-mediterranean-blue-dark">
                  {translations["home.amenities.title"]}
                </h3>
                <p className="text-muted-foreground">{translations["home.amenities.description"]}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <LocationSection />
      <TestimonialSection />

      <section className="container py-12 md:py-24 lg:py-32">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-mediterranean-blue-dark">
              {translations["home.cta.title"]}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {translations["home.cta.subtitle"]}
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href="/apartments">
              <Button size="lg" className="w-full bg-mediterranean-blue hover:bg-mediterranean-blue-dark text-white">
                {translations["home.cta.viewApartments"]}
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-mediterranean-blue text-mediterranean-blue hover:bg-mediterranean-blue/10"
              >
                {translations["common.contactUs"]}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
