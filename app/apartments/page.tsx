"use client"

import Link from "next/link"
import Image from "next/image"
import { Bath, Bed, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { useLanguage } from "@/contexts/language-context"

export default function ApartmentsPage() {
  const { translations } = useLanguage()

  const apartments = [
    {
      id: 1,
      name: "Suite Apartment Palma",
      subName: "Suite 1",
      description:
        "Just a 5-10 minute walk from the beach and the lively promenade, this ground-floor apartment offers the perfect combination of tranquility and proximity to beach amenities. The apartment features two separate bedrooms, a kitchen, and a bathroom with everything you need for your vacation, including a terrace with a small garden.",
      price: 150,
      image: "/placeholder.svg?height=300&width=400",
      beds: 2,
      baths: 1,
      guests: 4,
      sofaBeds: 1,
      images: [
        {
          url: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/apartment1-KuIf1L14B2r2oUZ5J0qr7yKDhKDTI2.jpg",
          alt: "Palma Suite Living Room",
          isFeatured: true,
        },
        {
          url: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/apartment1-KuIf1L14B2r2oUZ5J0qr7yKDhKDTI2.jpg",
          alt: "Palma Suite Bedroom",
        },
        {
          url: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/apartment1-KuIf1L14B2r2oUZ5J0qr7yKDhKDTI2.jpg",
          alt: "Palma Suite Kitchen",
        },
        {
          url: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/apartment1-KuIf1L14B2r2oUZ5J0qr7yKDhKDTI2.jpg",
          alt: "Palma Suite Bathroom",
        },
      ],
    },
    {
      id: 2,
      name: "Suite Apartment Pinija",
      subName: "Suite 2",
      description:
        "Just a 5-10 minute walk from the beach and the lively promenade, this ground-floor apartment offers the perfect combination of tranquility and proximity to beach amenities. The apartment features two separate bedrooms, a kitchen, and a bathroom with everything you need for your vacation, including a terrace with a small garden.",
      price: 145,
      image: "/placeholder.svg?height=300&width=400",
      beds: 2,
      baths: 1,
      guests: 3,
      sofaBeds: 1,
      images: [
        {
          url: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/apartment1-KuIf1L14B2r2oUZ5J0qr7yKDhKDTI2.jpg",
          alt: "Pinija Suite Living Room",
          isFeatured: true,
        },
        { url: "/placeholder.svg?height=300&width=400", alt: "Pinija Suite Bedroom" },
        { url: "/placeholder.svg?height=300&width=400", alt: "Pinija Suite Kitchen" },
        { url: "/placeholder.svg?height=300&width=400", alt: "Pinija Suite Bathroom" },
      ],
    },
    {
      id: 3,
      name: "Studio Apartment Maslina",
      subName: "Suite 3",
      description:
        "On the upper floor of our holiday home are four charming, smaller apartments. Each apartment has two beds, suitable for up to three adults or two adults with two children. They are also equipped with a bathroom, a balcony, and a small kitchen, providing everything you need for your vacation.",
      price: 95,
      image: "/placeholder.svg?height=300&width=400",
      beds: 2,
      baths: 1,
      guests: 3,
      images: [
        {
          url: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/apartment2-9N8ptVybi9C0stNwAmfb0jfL50zPM4.jpg",
          alt: "Maslina Studio Main View",
          isFeatured: true,
        },
        { url: "/placeholder.svg?height=300&width=400", alt: "Maslina Studio Kitchenette" },
        { url: "/placeholder.svg?height=300&width=400", alt: "Maslina Studio Bathroom" },
        { url: "/placeholder.svg?height=300&width=400", alt: "Maslina Studio Balcony" },
      ],
    },
    {
      id: 4,
      name: "Studio Apartment Agava",
      subName: "Suite 4",
      description:
        "On the upper floor of our holiday home are four charming, smaller apartments. Each apartment has two beds, suitable for up to three adults or two adults with two children. They are also equipped with a bathroom, a balcony, and a small kitchen, providing everything you need for your vacation.",
      price: 90,
      image: "/placeholder.svg?height=300&width=400",
      beds: 2,
      baths: 1,
      guests: 3,
      images: [
        {
          url: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/apartment2-9N8ptVybi9C0stNwAmfb0jfL50zPM4.jpg",
          alt: "Agava Studio Main View",
          isFeatured: true,
        },
        { url: "/placeholder.svg?height=300&width=400", alt: "Agava Studio Kitchenette" },
        { url: "/placeholder.svg?height=300&width=400", alt: "Agava Studio Bathroom" },
        { url: "/placeholder.svg?height=300&width=400", alt: "Agava Studio Terrace" },
      ],
    },
    {
      id: 5,
      name: "Studio Apartment Ruzmarin",
      subName: "Suite 5",
      description:
        "On the upper floor of our holiday home are four charming, smaller apartments. Each apartment has two beds, suitable for up to three adults or two adults with two children. They are also equipped with a bathroom, a balcony, and a small kitchen, providing everything you need for your vacation.",
      price: 85,
      image: "/placeholder.svg?height=300&width=400",
      beds: 2,
      baths: 1,
      guests: 3,
      images: [
        {
          url: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/apartment2-9N8ptVybi9C0stNwAmfb0jfL50zPM4.jpg",
          alt: "Ruzmarin Studio Main View",
          isFeatured: true,
        },
        { url: "/placeholder.svg?height=300&width=400", alt: "Ruzmarin Studio Kitchenette" },
        { url: "/placeholder.svg?height=300&width=400", alt: "Ruzmarin Studio Bathroom" },
        { url: "/placeholder.svg?height=300&width=400", alt: "Ruzmarin Studio Garden View" },
      ],
    },
    {
      id: 6,
      name: "Studio Apartment Oleander",
      subName: "Suite 6",
      description:
        "On the upper floor of our holiday home are four charming, smaller apartments. Each apartment has two beds, suitable for up to three adults or two adults with two children. They are also equipped with a bathroom, a balcony, and a small kitchen, providing everything you need for your vacation.",
      price: 85,
      image: "/placeholder.svg?height=300&width=400",
      beds: 2,
      baths: 1,
      guests: 3,
      images: [
        {
          url: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/apartment2-9N8ptVybi9C0stNwAmfb0jfL50zPM4.jpg",
          alt: "Oleander Studio Main View",
          isFeatured: true,
        },
        { url: "/placeholder.svg?height=300&width=400", alt: "Oleander Studio Kitchenette" },
        { url: "/placeholder.svg?height=300&width=400", alt: "Oleander Studio Bathroom" },
        { url: "/placeholder.svg?height=300&width=400", alt: "Oleander Studio Outdoor Space" },
      ],
    },
  ]

  return (
    <main className="flex min-h-screen flex-col">
      <section className="bg-muted py-12">
        <div className="container">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {translations["apartments.title"]}
          </h1>
          <p className="mt-4 text-muted-foreground max-w-[700px]">{translations["apartments.subtitle"]}</p>
        </div>
      </section>

      <section className="container py-8">
        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <div className="space-y-6">
            <div className="rounded-lg border bg-card p-4">
              <h3 className="font-medium mb-4">{translations["apartments.search"]}</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translations["common.dates"]}</label>
                  <DatePickerWithRange />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translations["common.guests"]}</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option>{translations["common.guest"]}</option>
                    <option>{translations["common.guests"]}</option>
                    <option>{translations["common.guests"]}</option>
                    <option>{translations["common.guests"]}</option>
                  </select>
                </div>
                <Button className="w-full">{translations["common.searchAvailability"]}</Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                {translations["common.showingApartments"].replace("{count}", apartments.length.toString())}
              </p>
              <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                <option>{translations["common.sortPriceLow"]}</option>
                <option>{translations["common.sortPriceHigh"]}</option>
              </select>
            </div>

            <div className="grid gap-6">
              {apartments.map((apartment) => (
                <div key={apartment.id} className="rounded-lg border overflow-hidden">
                  <div className="grid md:grid-cols-[300px_1fr] gap-6">
                    <div className="relative aspect-[4/3] md:aspect-auto">
                      {apartment.images && apartment.images.length > 0 ? (
                        <Image
                          src={
                            apartment.images.find((img) => img.isFeatured)?.url ||
                            apartment.images[0]?.url ||
                            "/placeholder.svg?height=300&width=400" ||
                            "/placeholder.svg" ||
                            "/placeholder.svg" ||
                            "/placeholder.svg"
                          }
                          alt={
                            apartment.images.find((img) => img.isFeatured)?.alt ||
                            apartment.images[0]?.alt ||
                            apartment.name
                          }
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <Image
                          src={apartment.image || "/placeholder.svg?height=300&width=400"}
                          alt={apartment.name}
                          fill
                          className="object-cover"
                        />
                      )}
                      {apartment.images && apartment.images.length > 1 && (
                        <div className="absolute bottom-2 right-2 bg-black/50 rounded-full px-2 py-1 text-xs text-white">
                          <span>{apartment.images.length} photos</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <h2 className="text-xl font-semibold">{apartment.name}</h2>
                        <div className="flex items-center">
                          <span className="font-semibold">€{apartment.price}</span>
                          <span className="text-sm text-muted-foreground ml-1">/ {translations["common.night"]}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">{apartment.description}</p>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center text-sm">
                          <Bed className="h-4 w-4 mr-1" />
                          {apartment.beds}{" "}
                          {apartment.beds === 1 ? translations["common.bed"] : translations["common.beds"]}
                          {apartment.sofaBeds && apartment.sofaBeds > 0 && (
                            <span className="ml-1">
                              + {apartment.sofaBeds}{" "}
                              {apartment.sofaBeds === 1
                                ? translations["common.sofaBed"]
                                : translations["common.sofaBeds"]}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-sm">
                          <Bath className="h-4 w-4 mr-1" />
                          {apartment.baths}{" "}
                          {apartment.baths === 1 ? translations["common.bath"] : translations["common.baths"]}
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-1" />
                          {apartment.guests}{" "}
                          {apartment.guests === 1 ? translations["common.guest"] : translations["common.guests"]}
                        </div>
                      </div>
                      <div className="mt-auto flex justify-end">
                        <Link href={`/apartments/${apartment.id}`}>
                          <Button>{translations["common.viewDetails"]}</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
