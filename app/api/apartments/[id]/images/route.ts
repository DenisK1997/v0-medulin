import { type NextRequest, NextResponse } from "next/server"
import { addImageToApartment, getApartmentById } from "@/services/apartment-service"
import { v4 as uuidv4 } from "uuid"

// GET /api/apartments/[id]/images
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const apartmentId = Number.parseInt(params.id)
  const apartment = getApartmentById(apartmentId)

  if (!apartment) {
    return NextResponse.json({ error: "Apartment not found" }, { status: 404 })
  }

  return NextResponse.json(apartment.images)
}

// POST /api/apartments/[id]/images
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const apartmentId = Number.parseInt(params.id)
    const apartment = getApartmentById(apartmentId)

    if (!apartment) {
      return NextResponse.json({ error: "Apartment not found" }, { status: 404 })
    }

    const { url, alt, isFeatured } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 })
    }

    const newImage = {
      id: uuidv4(),
      url,
      alt: alt || `Image for ${apartment.name}`,
      isFeatured: isFeatured || false,
    }

    const updatedApartment = addImageToApartment(apartmentId, newImage)

    return NextResponse.json(updatedApartment?.images || [])
  } catch (error) {
    console.error("Error adding image:", error)
    return NextResponse.json({ error: "Failed to add image" }, { status: 500 })
  }
}
