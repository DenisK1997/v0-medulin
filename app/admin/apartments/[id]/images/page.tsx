"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Trash2, Star, StarOff, GripVertical, ArrowLeft, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUploader } from "@/components/image-uploader"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Apartment, ApartmentImage } from "@/types/apartment"
import { toast } from "@/components/ui/use-toast"

export default function ApartmentImagesPage() {
  const params = useParams()
  const router = useRouter()
  const apartmentId = Number.parseInt(params.id as string)

  const [apartment, setApartment] = useState<Apartment | null>(null)
  const [loading, setLoading] = useState(true)
  const [editingImage, setEditingImage] = useState<ApartmentImage | null>(null)
  const [newAlt, setNewAlt] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Fetch apartment data
  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const response = await fetch(`/api/apartments/${apartmentId}`)
        if (!response.ok) throw new Error("Failed to fetch apartment")

        const data = await response.json()
        setApartment(data)
      } catch (error) {
        console.error("Error fetching apartment:", error)
        toast({
          title: "Error",
          description: "Failed to load apartment data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchApartment()
  }, [apartmentId])

  // Handle image upload
  const handleImageUpload = async (imageUrl: string) => {
    try {
      const response = await fetch(`/api/apartments/${apartmentId}/images`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: imageUrl,
          alt: `Image for ${apartment?.name || "apartment"}`,
          isFeatured: apartment?.images.length === 0, // Make it featured if it's the first image
        }),
      })

      if (!response.ok) throw new Error("Failed to add image")

      const updatedImages = await response.json()
      setApartment((prev) => (prev ? { ...prev, images: updatedImages } : null))

      toast({
        title: "Success",
        description: "Image added successfully",
      })
    } catch (error) {
      console.error("Error adding image:", error)
      toast({
        title: "Error",
        description: "Failed to add image",
        variant: "destructive",
      })
    }
  }

  // Handle image deletion
  const handleDeleteImage = async (imageId: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return

    try {
      const response = await fetch(`/api/apartments/${apartmentId}/images/${imageId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete image")

      const updatedImages = await response.json()
      setApartment((prev) => (prev ? { ...prev, images: updatedImages } : null))

      toast({
        title: "Success",
        description: "Image deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting image:", error)
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      })
    }
  }

  // Handle setting featured image
  const handleSetFeatured = async (imageId: string) => {
    try {
      const response = await fetch(`/api/apartments/${apartmentId}/images/${imageId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isFeatured: true,
        }),
      })

      if (!response.ok) throw new Error("Failed to update image")

      const updatedImages = await response.json()
      setApartment((prev) => (prev ? { ...prev, images: updatedImages } : null))

      toast({
        title: "Success",
        description: "Featured image updated",
      })
    } catch (error) {
      console.error("Error updating image:", error)
      toast({
        title: "Error",
        description: "Failed to update featured image",
        variant: "destructive",
      })
    }
  }

  // Handle image reordering
  const handleDragEnd = async (result: any) => {
    if (!result.destination || !apartment) return

    const items = Array.from(apartment.images)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update local state immediately for better UX
    setApartment((prev) => (prev ? { ...prev, images: items } : null))

    // Send the reordered IDs to the server
    try {
      const imageIds = items.map((img) => img.id)

      const response = await fetch(`/api/apartments/${apartmentId}/images/reorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageIds }),
      })

      if (!response.ok) throw new Error("Failed to reorder images")

      const updatedImages = await response.json()
      setApartment((prev) => (prev ? { ...prev, images: updatedImages } : null))
    } catch (error) {
      console.error("Error reordering images:", error)
      toast({
        title: "Error",
        description: "Failed to reorder images",
        variant: "destructive",
      })
    }
  }

  // Handle editing image alt text
  const handleEditImage = (image: ApartmentImage) => {
    setEditingImage(image)
    setNewAlt(image.alt)
    setIsDialogOpen(true)
  }

  const handleSaveAlt = async () => {
    if (!editingImage) return

    try {
      const response = await fetch(`/api/apartments/${apartmentId}/images/${editingImage.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          alt: newAlt,
        }),
      })

      if (!response.ok) throw new Error("Failed to update image")

      const updatedImages = await response.json()
      setApartment((prev) => (prev ? { ...prev, images: updatedImages } : null))

      toast({
        title: "Success",
        description: "Image description updated",
      })

      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error updating image:", error)
      toast({
        title: "Error",
        description: "Failed to update image description",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Loading...</h1>
          <p className="text-muted-foreground mt-2">Please wait while we load the apartment data.</p>
        </div>
      </div>
    )
  }

  if (!apartment) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Apartment Not Found</h1>
          <p className="text-muted-foreground mt-2">The apartment you're looking for doesn't exist.</p>
        </div>
        <Button onClick={() => router.push("/admin/apartments")}>Back to Apartments</Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push("/admin/apartments")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{apartment.name} - Images</h1>
          <p className="text-muted-foreground mt-2">Manage images for this apartment</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Manage Images</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">
                Drag and drop to reorder images. The first image will be the main image shown in listings. Click the
                star icon to set an image as featured.
              </p>

              {apartment.images.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                  <p className="text-muted-foreground">No images yet. Upload your first image!</p>
                </div>
              ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="images">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                        {apartment.images.map((image, index) => (
                          <Draggable key={image.id} draggableId={image.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="flex items-center gap-4 p-3 bg-muted/50 border rounded-lg"
                              >
                                <div {...provided.dragHandleProps} className="cursor-grab">
                                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                                </div>

                                <div className="relative h-16 w-24 overflow-hidden rounded-md">
                                  <Image
                                    src={image.url || "/placeholder.svg"}
                                    alt={image.alt}
                                    fill
                                    className="object-cover"
                                  />
                                </div>

                                <div className="flex-1 min-w-0">
                                  <p className="text-sm truncate">{image.alt}</p>
                                  {image.isFeatured && (
                                    <span className="inline-flex items-center px-2 py-1 mt-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                                      Featured
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEditImage(image)}
                                    title="Edit description"
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>

                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleSetFeatured(image.id)}
                                    disabled={image.isFeatured}
                                    title={image.isFeatured ? "Featured image" : "Set as featured"}
                                  >
                                    {image.isFeatured ? (
                                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ) : (
                                      <StarOff className="h-4 w-4" />
                                    )}
                                  </Button>

                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteImage(image.id)}
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                    title="Delete image"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Image</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUploader onUploadComplete={handleImageUpload} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Upload high-quality images (min. 1200x800px)</li>
                <li>• Keep file sizes under 5MB for better performance</li>
                <li>• Use descriptive alt text for better SEO</li>
                <li>• The featured image will be shown first in galleries</li>
                <li>• Drag and drop to change the order of images</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Image Description</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {editingImage && (
              <div className="relative h-40 w-full overflow-hidden rounded-md mb-4">
                <Image
                  src={editingImage.url || "/placeholder.svg"}
                  alt={editingImage.alt}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="alt-text">Image Description (Alt Text)</Label>
              <Input
                id="alt-text"
                value={newAlt}
                onChange={(e) => setNewAlt(e.target.value)}
                placeholder="Describe the image for accessibility"
              />
              <p className="text-xs text-muted-foreground">
                Good alt text helps visually impaired users and improves SEO.
              </p>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveAlt}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
