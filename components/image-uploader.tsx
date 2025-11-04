"use client"

import type React from "react"

import { useState } from "react"
import { upload } from "@vercel/blob/client"
import { Button } from "@/components/ui/button"

export function ImageUploader({ onUploadComplete }: { onUploadComplete?: (url: string) => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    setError(null)

    if (!selectedFile) return

    // Validate file type
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select an image file")
      return
    }

    // Validate file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB")
      return
    }

    setFile(selectedFile)
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first")
      return
    }

    try {
      setUploading(true)
      setError(null)

      // Generate a unique filename with original extension
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`

      // Upload to Vercel Blob
      const response = await upload(filename, file, {
        access: "public",
        handleUploadUrl: "/api/upload-blob",
      })

      setUploadedUrl(response.url)

      // Call the callback if provided
      if (onUploadComplete) {
        onUploadComplete(response.url)
      }
    } catch (err) {
      console.error("Upload error:", err)
      setError("Failed to upload image. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="image-upload" className="text-sm font-medium">
          Select Image
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border rounded p-2"
          disabled={uploading}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {file && !uploadedUrl && (
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">Selected: {file.name}</p>
          <Button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-mediterranean-blue hover:bg-mediterranean-blue-dark text-white"
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      )}

      {uploadedUrl && (
        <div className="space-y-2">
          <p className="text-sm text-green-600">Upload successful!</p>
          <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-md border">
            <img src={uploadedUrl || "/placeholder.svg"} alt="Uploaded image" className="object-cover w-full h-full" />
          </div>
        </div>
      )}
    </div>
  )
}
