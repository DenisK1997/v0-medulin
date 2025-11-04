import { type NextRequest, NextResponse } from "next/server"
import { getApartmentById, reorderImages } from "@/services/apartment-service"

// POST /api/apartments/[id]/images/reorder
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const apartmentId = Number.parseInt(params.id)
    const apartment = getApartmentById(apartmentId)

    if (!apartment) {
      return NextResponse.json({ error: "Apartment not found" }, { status: 404 })
    }

    const { imageIds } = await request.json()

    if (!imageIds || !Array.isArray(imageIds)) {
      return NextResponse.json({ error: "Image IDs array is required" }, { status: 400 })
    }

    const updatedApartment = reorderImages(apartmentId, imageIds)

    if (!updatedApartment) {
      return NextResponse.json({ error: "Failed to reorder images" }, { status: 400 })
    }

    return NextResponse.json(updatedApartment.images)
  } catch (error) {
    console.error("Error reordering images:", error)
    return NextResponse.json({ error: "Failed to reorder images" }, { status: 500 })
  }
}
