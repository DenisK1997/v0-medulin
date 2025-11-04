"use client"

import Link from "next/link"
import Image from "next/image"
import { Bath, Bed, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { SofaBedIcon } from "@/components/icons/sofa-bed-icon"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Apartment } from "@/types/apartment"

interface ApartmentCardProps {
  apartment: Apartment
}

export function ApartmentCard({ apartment }: ApartmentCardProps) {
  const { translations } = useLanguage()

  // Get the featured image or the first image
  const featuredImage = apartment.images?.find((img) => img.isFeatured) || apartment.images?.[0]
  const imageUrl = featuredImage?.url || "/placeholder.svg?height=300&width=400"
  const imageAlt = featuredImage?.alt || apartment.name

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border-mediterranean-sand bg-white">
      <div className="relative aspect-[4/3] overflow-hidden group">
        {apartment.images && apartment.images.length > 0 && (
          <>
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {apartment.images.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/50 rounded-full px-2 py-1 text-xs text-white">
                <span>{apartment.images.length} photos</span>
              </div>
            )}
          </>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg text-mediterranean-blue-dark">{apartment.name}</h3>
            {apartment.subName && <p className="text-xs text-muted-foreground">{apartment.subName}</p>}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{apartment.description}</p>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center text-sm">
            <Bed className="h-4 w-4 mr-1 text-mediterranean-blue" />
            {apartment.beds} {apartment.beds === 1 ? translations["common.bed"] : translations["common.beds"]}
            {apartment.sofaBeds && apartment.sofaBeds > 0 && (
              <span className="ml-2 flex items-center">
                <SofaBedIcon className="h-4 w-4 mr-1 text-mediterranean-blue" />
                {apartment.sofaBeds}{" "}
                {apartment.sofaBeds === 1 ? translations["common.sofaBed"] : translations["common.sofaBeds"]}
              </span>
            )}
          </div>
          <div className="flex items-center text-sm">
            <Bath className="h-4 w-4 mr-1 text-mediterranean-blue" />
            {apartment.baths} {apartment.baths === 1 ? translations["common.bath"] : translations["common.baths"]}
          </div>
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-1 text-mediterranean-blue" />
            {apartment.guests} {apartment.guests === 1 ? translations["common.guest"] : translations["common.guests"]}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="font-semibold text-mediterranean-blue-dark">
          €{apartment.price}{" "}
          <span className="text-sm font-normal text-muted-foreground">/ {translations["common.night"]}</span>
        </div>
        <Link href={`/apartments/${apartment.id}`}>
          <Button size="sm" className="bg-mediterranean-orange hover:bg-mediterranean-orange-dark text-white">
            {translations["common.viewDetails"]}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
