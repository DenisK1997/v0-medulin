"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Bath, Bed, Edit, ImageIcon, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Apartment } from "@/types/apartment"
import { toast } from "@/components/ui/use-toast"

export default function AdminApartmentsPage() {
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await fetch("/api/apartments")
        if (!response.ok) throw new Error("Failed to fetch apartments")

        const data = await response.json()
        setApartments(data)
      } catch (error) {
        console.error("Error fetching apartments:", error)
        toast({
          title: "Error",
          description: "Failed to load apartments",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchApartments()
  }, [])

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Apartments</h1>
          <p className="text-muted-foreground mt-2">Loading apartments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Apartments</h1>
          <p className="text-muted-foreground mt-2">Manage your apartment listings</p>
        </div>
        <Button>Add New Apartment</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {apartments.map((apartment) => {
          const featuredImage = apartment.images.find((img) => img.isFeatured) || apartment.images[0]

          return (
            <Card key={apartment.id} className="overflow-hidden">
              <div className="relative aspect-video">
                {featuredImage ? (
                  <Image
                    src={featuredImage.url || "/placeholder.svg"}
                    alt={featuredImage.alt}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-muted">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">{apartment.name}</h2>
                {apartment.subName && <p className="text-sm text-muted-foreground">{apartment.subName}</p>}

                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center text-sm">
                    <Bed className="h-4 w-4 mr-1" />
                    {apartment.beds}
                  </div>
                  <div className="flex items-center text-sm">
                    <Bath className="h-4 w-4 mr-1" />
                    {apartment.baths}
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-1" />
                    {apartment.guests}
                  </div>
                </div>

                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{apartment.description}</p>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button variant="outline" asChild className="flex-1 bg-transparent">
                  <Link href={`/admin/apartments/${apartment.id}`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                </Button>
                <Button variant="outline" asChild className="flex-1 bg-transparent">
                  <Link href={`/admin/apartments/${apartment.id}/images`}>
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Images ({apartment.images.length})
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
