"use client"

import { useState } from "react"
import { ImageUploader } from "@/components/image-uploader"

export default function AdminImagesPage() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const handleUploadComplete = (url: string) => {
    setUploadedImages((prev) => [...prev, url])
  }

  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Image Management</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Upload New Image</h2>
            <ImageUploader onUploadComplete={handleUploadComplete} />
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Recently Uploaded Images</h2>
          {uploadedImages.length > 0 ? (
            <div className="grid gap-4 grid-cols-2">
              {uploadedImages.map((url, index) => (
                <div key={index} className="relative aspect-square overflow-hidden rounded-md border">
                  <img
                    src={url || "/placeholder.svg"}
                    alt={`Uploaded image ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No images uploaded yet.</p>
          )}
        </div>
      </div>
    </main>
  )
}
