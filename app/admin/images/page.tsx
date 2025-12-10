"use client"

import { useState } from "react"
import { ImageUploader } from "@/components/image-uploader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function AdminImagesPage() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const handleUploadComplete = (url: string) => {
    setUploadedImages((prev) => [...prev, url])
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Image Management</h1>
        <p className="text-muted-foreground mt-2">Upload and manage apartment images</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upload New Image</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUploader onUploadComplete={handleUploadComplete} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recently Uploaded Images</CardTitle>
          </CardHeader>
          <CardContent>
            {uploadedImages.length > 0 ? (
              <div className="grid gap-4 grid-cols-2">
                {uploadedImages.map((url, index) => (
                  <div key={index} className="relative aspect-square overflow-hidden rounded-md border">
                    <Image
                      src={url || "/placeholder.svg"}
                      alt={`Uploaded image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No images uploaded in this session yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            To assign images to specific apartments, visit the Apartments section and select the apartment you want to
            manage.
          </p>
          <a
            href="/admin/apartments"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Go to Apartments
          </a>
        </CardContent>
      </Card>
    </div>
  )
}
