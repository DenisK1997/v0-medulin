import { handleUpload } from "@vercel/blob/client"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const response = await handleUpload({
      request,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error in blob upload:", error)
    return NextResponse.json({ error: "Failed to upload to Vercel Blob" }, { status: 500 })
  }
}
