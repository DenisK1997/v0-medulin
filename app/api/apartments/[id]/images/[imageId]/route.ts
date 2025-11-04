import { type NextRequest, NextResponse } from "next/server"
import { deleteImage, getApartmentById, updateImage } from "@/services/apartment-service"

// GET /api/apartments/[id]/images/[imageId]
export async function GET(request: NextRequest, { params }: { params: { id: string; imageId: string } }) {
  const apartmentId = Number.parseInt(params.id)
  const imageId = params.imageId
  const apartment = getApartmentById(apartmentId)

  if (!apartment) {
    return NextResponse.json({ error: "Apartment not found" }, { status: 404 })
  }

  const image = apartment.images.find((img) => img.id === imageId)

  if (!image) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 })
  }

  return NextResponse.json(image)
}

// PATCH /api/apartments/[id]/images/[imageId]
export async function PATCH(request: NextRequest, { params }: { params: { id: string; imageId: string } }) {
  try {
    const apartmentId = Number.parseInt(params.id)
    const imageId = params.imageId
    const apartment = getApartmentById(apartmentId)

    if (!apartment) {
      return NextResponse.json({ error: "Apartment not found" }, { status: 404 })
    }

    const image = apartment.images.find((img) => img.id === imageId)

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    const updates = await request.json()
    const updatedApartment = updateImage(apartmentId, imageId, updates)

    return NextResponse.json(updatedApartment?.images || [])
  } catch (error) {
    console.error("Error updating image:", error)
    return NextResponse.json({ error: "Failed to update image" }, { status: 500 })
  }
}

// DELETE /api/apartments/[id]/images/[imageId]
export async function DELETE(request: NextRequest, { params }: { params: { id: string; imageId: string } }) {
  try {
    const apartmentId = Number.parseInt(params.id)
    const imageId = params.imageId
    const apartment = getApartmentById(apartmentId)

    if (!apartment) {
      return NextResponse.json({ error: "Apartment not found" }, { status: 404 })
    }

    const image = apartment.images.find((img) => img.id === imageId)

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    const updatedApartment = deleteImage(apartmentId, imageId)

    return NextResponse.json(updatedApartment?.images || [])
  } catch (error) {
    console.error("Error deleting image:", error)
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 })
  }
}
