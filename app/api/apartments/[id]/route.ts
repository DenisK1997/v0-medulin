import { type NextRequest, NextResponse } from "next/server"
import { getApartmentById } from "@/services/apartment-service"

// GET /api/apartments/[id]
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const apartmentId = Number.parseInt(params.id)
  const apartment = getApartmentById(apartmentId)

  if (!apartment) {
    return NextResponse.json({ error: "Apartment not found" }, { status: 404 })
  }

  return NextResponse.json(apartment)
}
