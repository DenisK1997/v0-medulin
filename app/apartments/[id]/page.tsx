"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Bath, Bed, Check, ChevronLeft, Users } from "lucide-react"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePickerWithRange } from "@/components/date-range-picker"
import type { Apartment } from "@/types/apartment"
import { useLanguage } from "@/contexts/language-context"
import { SofaBedIcon } from "@/components/icons/sofa-bed-icon"

export default function ApartmentDetailPage() {
  const params = useParams()
  const apartmentId = Number.parseInt(params.id as string)
  const { translations } = useLanguage()

  const [apartment, setApartment] = useState<Apartment | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const response = await fetch(`/api/apartments/${apartmentId}`)
        if (!response.ok) throw new Error("Failed to fetch apartment")

        const data = await response.json()
        setApartment(data)

        // Find the featured image index
        const featuredIndex = data.images.findIndex((img: any) => img.isFeatured)
        if (featuredIndex !== -1) {
          setSelectedImageIndex(featuredIndex)
        }
      } catch (error) {
        console.error("Error fetching apartment:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchApartment()
  }, [apartmentId])

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col">
        <div className="container py-6">
          <p>Loading apartment details...</p>
        </div>
      </main>
    )
  }

  if (!apartment) {
    return (
      <main className="flex min-h-screen flex-col">
        <div className="container py-6">
          <p>Apartment not found</p>
          <Link href="/apartments" className="text-mediterranean-blue hover:underline mt-4 inline-block">
            Back to all apartments
          </Link>
        </div>
      </main>
    )
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.src = "/placeholder.svg?height=600&width=800"
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="container py-6">
        <Link href="/apartments" className="flex items-center text-sm font-medium mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          {translations["common.backToAll"]}
        </Link>

        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{apartment.name}</h1>
              {apartment.subName && <p className="text-sm text-muted-foreground mt-1">{apartment.subName}</p>}
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  {apartment.beds}{" "}
                  {apartment.beds === 1 ? translations["common.bedroom"] : translations["common.bedrooms"]}
                  {apartment.sofaBeds && apartment.sofaBeds > 0 && (
                    <span className="ml-2 flex items-center">
                      <SofaBedIcon className="h-4 w-4 mr-1" />
                      {apartment.sofaBeds}{" "}
                      {apartment.sofaBeds === 1 ? translations["common.sofaBed"] : translations["common.sofaBeds"]}
                    </span>
                  )}
                </span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  {apartment.baths}{" "}
                  {apartment.baths === 1 ? translations["common.bathroom"] : translations["common.bathrooms"]}
                </span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {translations["common.upTo"]} {apartment.guests} {translations["common.guests"]}
                </span>
              </div>
            </div>

            {apartment.images && apartment.images.length > 0 ? (
              <div className="space-y-2">
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden group">
                  <Image
                    src={apartment.images[selectedImageIndex]?.url || "/placeholder.svg?height=600&width=800"}
                    alt={apartment.images[selectedImageIndex]?.alt || apartment.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                    onError={handleImageError}
                  />

                  {/* Image navigation arrows */}
                  {apartment.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          setSelectedImageIndex((prev) => (prev === 0 ? apartment.images.length - 1 : prev - 1))
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors z-10"
                        aria-label="Previous image"
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
                          className="h-5 w-5"
                        >
                          <path d="m15 18-6-6 6-6" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          setSelectedImageIndex((prev) => (prev + 1) % apartment.images.length)
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors z-10"
                        aria-label="Next image"
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
                          className="h-5 w-5"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Image counter */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm px-2 py-1 rounded-full">
                    {selectedImageIndex + 1} / {apartment.images.length}
                  </div>
                </div>

                {/* Thumbnails */}
                {apartment.images.length > 1 && (
                  <div className="grid grid-cols-5 gap-2">
                    {apartment.images.map((image, index) => (
                      <button
                        key={image.id || index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative aspect-[4/3] rounded-md overflow-hidden transition-all ${
                          index === selectedImageIndex
                            ? "ring-2 ring-mediterranean-blue scale-105 z-10"
                            : "opacity-80 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={image.url || "/placeholder.svg"}
                          alt={image.alt || `${apartment.name} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground">No images available</p>
                </div>
              </div>
            )}

            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">{translations["common.description"]}</TabsTrigger>
                <TabsTrigger value="amenities">{translations["common.amenities"]}</TabsTrigger>
                <TabsTrigger value="rules">{translations["common.rules"]}</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-6">
                <div className="space-y-4">
                  <p>{apartment.longDescription || apartment.description}</p>
                </div>
              </TabsContent>
              <TabsContent value="amenities" className="mt-6">
                <div className="grid grid-cols-2 gap-4">
                  {apartment.amenities?.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-primary" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="rules" className="mt-6">
                <div className="space-y-4">
                  <ul className="space-y-2">
                    {apartment.rules?.map((rule, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>€{apartment.price}</span>
                  <span className="text-sm font-normal text-muted-foreground">{translations["common.perNight"]}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{translations["common.dates"]}</label>
                    <DatePickerWithRange />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{translations["common.guests"]}</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      {[...Array(apartment.guests)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? translations["common.guest"] : translations["common.guests"]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span>
                      €{apartment.price} x 7 {translations["common.night"]}
                    </span>
                    <span>€{apartment.price * 7}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-4 border-t pt-6">
                <div className="flex items-center justify-between font-semibold">
                  <span>{translations["common.total"]}</span>
                  <span>€{apartment.price * 7 + 50 + Math.round(apartment.price * 7 * 0.1)}</span>
                </div>
                <Button className="w-full">{translations["common.bookNow"]}</Button>
                <p className="text-xs text-center text-muted-foreground">
                  {translations["common.youWontBeChargedYet"]}
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
