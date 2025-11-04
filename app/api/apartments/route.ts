import { type NextRequest, NextResponse } from "next/server"
import { getAllApartments } from "@/services/apartment-service"

// GET /api/apartments
export async function GET(request: NextRequest) {
  const apartments = getAllApartments()
  return NextResponse.json(apartments)
}
