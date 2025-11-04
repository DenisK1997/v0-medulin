import type { Apartment, ApartmentImage } from "@/types/apartment"

const apartments: Apartment[] = [
  {
    id: 1,
    name: "Suite Apartment Palma",
    subName: "Suite 1",
    description: "Spacious suite apartment for 4 people with stunning sea views from a private balcony",
    longDescription:
      "Experience the beauty of the Adriatic Sea from your private balcony in our Suite Apartment Palma. This spacious apartment offers all the comforts of home with the luxury of a vacation getaway.",
    price: 150,
    beds: 2,
    baths: 1,
    guests: 4,
    rating: 4.9,
    reviews: 24,
    amenities: ["Air conditioning", "Safe", "Garden", "Free WiFi", "TV", "Coffee maker", "Parking"],
    rules: ["No smoking", "No parties", "Check-in: 3:00 PM", "Checkout: 10:00 AM"],
    images: [
      {
        id: "palma-1",
        url: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/apartment1-KuIf1L14B2r2oUZ5J0qr7yKDhKDTI2.jpg",
        alt: "Suite Apartment Palma - Living Room",
        isFeatured: true,
        order: 1,
      },
      {
        id: "palma-2",
        url: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/apartment2-9N8ptVybi9C0stNwAmfb0jfL50zPM4.jpg",
        alt: "Suite Apartment Palma - Bedroom",
        isFeatured: false,
        order: 2,
      },
      {
        id: "palma-3",
        url: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/apartment3-1R52wD1bRTqfJaJkaiPsBxbRRWntpE.jpg",
        alt: "Suite Apartment Palma - Kitchen",
        isFeatured: false,
        order: 3,
      },
      {
        id: "palma-4",
        url: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/apartment4-oIA2aBTPYMpwwRIQsGDQzmZaSFj9jE.jpg",
        alt: "Suite Apartment Palma - Bathroom",
        isFeatured: false,
        order: 4,
      },
    ],
    sofaBeds: 1,
  },
  {
    id: 2,
    name: "Suite Apartment Pinija",
    subName: "Suite 2",
    description: "Comfortable suite apartment for 4 people with direct access to the shared garden and pool",
    longDescription:
      "Our Suite Apartment Pinija offers a comfortable and spacious retreat for up to 4 guests with direct access to our beautiful shared garden and swimming pool.",
    price: 145,
    beds: 2,
    baths: 1,
    guests: 3,
    rating: 4.8,
    reviews: 18,
    amenities: ["Air conditioning", "Safe", "Free WiFi", "TV", "Coffee maker", "Parking"],
    rules: ["No smoking", "No parties", "Check-in: 3:00 PM", "Checkout: 10:00 AM"],
    images: [
      {
        id: "pinija-1",
        url: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/apartment1-KuIf1L14B2r2oUZ5J0qr7yKDhKDTI2.jpg",
        alt: "Suite Apartment Pinija - Living Room",
        isFeatured: true,
        order: 1,
      },
    ],
    sofaBeds: 1,
  },
  {
    id: 3,
    name: "Studio Apartment Maslina",
    subName: "Suite 3",
    description: "Cozy studio apartment for 2 people with modern amenities and beautiful garden view",
    longDescription:
      "Our Studio Apartment Maslina is a cozy retreat perfect for couples or solo travelers looking for comfort and convenience in Medulin.",
    price: 95,
    beds: 2,
    baths: 1,
    guests: 3,
    rating: 4.7,
    reviews: 15,
    amenities: ["Air conditioning", "Kitchenette", "Free WiFi", "TV", "Linens and towels", "Coffee maker", "Parking"],
    rules: ["No smoking", "No parties", "Check-in: 3:00 PM", "Checkout: 10:00 AM"],
    images: [
      {
        id: "maslina-1",
        url: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/apartment2-9N8ptVybi9C0stNwAmfb0jfL50zPM4.jpg",
        alt: "Studio Apartment Maslina - Main View",
        isFeatured: true,
        order: 1,
      },
    ],
  },
  {
    id: 4,
    name: "Studio Apartment Agava",
    subName: "Suite 4",
    description: "Intimate studio apartment for 2 people with private terrace, perfect for couples",
    longDescription:
      "Our Studio Apartment Agava is the perfect choice for couples looking for an intimate getaway in Medulin.",
    price: 90,
    beds: 2,
    baths: 1,
    guests: 3,
    rating: 4.6,
    reviews: 12,
    amenities: ["Air conditioning", "Kitchenette", "Free WiFi", "TV", "Linens and towels", "Coffee maker", "Parking"],
    rules: ["No smoking", "No parties", "Check-in: 3:00 PM", "Checkout: 10:00 AM"],
    images: [
      {
        id: "agava-1",
        url: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/apartment3-1R52wD1bRTqfJaJkaiPsBxbRRWntpE.jpg",
        alt: "Studio Apartment Agava - Main View",
        isFeatured: true,
        order: 1,
      },
    ],
  },
  {
    id: 5,
    name: "Studio Apartment Ruzmarin",
    subName: "Suite 5",
    description: "Charming studio apartment for 2 people with Mediterranean-inspired decor and amenities",
    longDescription:
      "Our Studio Apartment Ruzmarin offers a charming Mediterranean-inspired retreat for couples or solo travelers.",
    price: 85,
    beds: 2,
    baths: 1,
    guests: 3,
    rating: 4.8,
    reviews: 16,
    amenities: ["Air conditioning", "Kitchenette", "Free WiFi", "TV", "Linens and towels", "Coffee maker", "Parking"],
    rules: ["No smoking", "No parties", "Check-in: 3:00 PM", "Checkout: 10:00 AM"],
    images: [
      {
        id: "ruzmarin-1",
        url: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/apartment4-oIA2aBTPYMpwwRIQsGDQzmZaSFj9jE.jpg",
        alt: "Studio Apartment Ruzmarin - Main View",
        isFeatured: true,
        order: 1,
      },
    ],
  },
  {
    id: 6,
    name: "Studio Apartment Oleander",
    subName: "Suite 6",
    description: "Elegant studio apartment for 2 people with modern design and comfortable furnishings",
    longDescription:
      "Our Studio Apartment Oleander combines elegant modern design with comfort to create a perfect retreat for couples or solo travelers.",
    price: 85,
    beds: 2,
    baths: 1,
    guests: 3,
    rating: 4.7,
    reviews: 14,
    amenities: ["Air conditioning", "Kitchenette", "Free WiFi", "TV", "Linens and towels", "Coffee maker", "Parking"],
    rules: ["No smoking", "No parties", "Check-in: 3:00 PM", "Checkout: 10:00 AM"],
    images: [
      {
        id: "oleander-1",
        url: "https://sssef5nrxfikvijy.public.blob.vercel-storage.com/apartment1-KuIf1L14B2r2oUZ5J0qr7yKDhKDTI2.jpg",
        alt: "Studio Apartment Oleander - Main View",
        isFeatured: true,
        order: 1,
      },
    ],
  },
]

export function getAllApartments(): Apartment[] {
  return apartments
}

export function getApartmentById(id: number): Apartment | undefined {
  return apartments.find((apartment) => apartment.id === id)
}

export function addImageToApartment(apartmentId: number, image: Omit<ApartmentImage, "order">): Apartment | undefined {
  const apartmentIndex = apartments.findIndex((a) => a.id === apartmentId)
  if (apartmentIndex === -1) return undefined

  const apartment = apartments[apartmentIndex]
  if (!apartment.images) apartment.images = []

  const newImage = {
    ...image,
    order: apartment.images.length + 1,
  }

  if (apartment.images.length === 0 || newImage.isFeatured) {
    if (newImage.isFeatured) {
      apartment.images = apartment.images.map((img) => ({
        ...img,
        isFeatured: false,
      }))
    }
  }

  apartment.images.push(newImage)
  apartments[apartmentIndex] = apartment

  return apartment
}

export function updateImage(
  apartmentId: number,
  imageId: string,
  updates: Partial<ApartmentImage>,
): Apartment | undefined {
  const apartmentIndex = apartments.findIndex((a) => a.id === apartmentId)
  if (apartmentIndex === -1) return undefined

  const apartment = apartments[apartmentIndex]
  if (!apartment.images) {
    apartment.images = []
    return apartment
  }

  const imageIndex = apartment.images.findIndex((img) => img.id === imageId)
  if (imageIndex === -1) return undefined

  if (updates.isFeatured) {
    apartment.images = apartment.images.map((img) => ({
      ...img,
      isFeatured: img.id === imageId,
    }))
  } else {
    apartment.images[imageIndex] = {
      ...apartment.images[imageIndex],
      ...updates,
    }
  }

  apartments[apartmentIndex] = apartment
  return apartment
}

export function deleteImage(apartmentId: number, imageId: string): Apartment | undefined {
  const apartmentIndex = apartments.findIndex((a) => a.id === apartmentId)
  if (apartmentIndex === -1) return undefined

  const apartment = apartments[apartmentIndex]
  if (!apartment.images) {
    apartment.images = []
    return apartment
  }

  const imageIndex = apartment.images.findIndex((img) => img.id === imageId)
  if (imageIndex === -1) return undefined

  const isDeletedImageFeatured = apartment.images[imageIndex].isFeatured
  apartment.images = apartment.images.filter((img) => img.id !== imageId)

  if (isDeletedImageFeatured && apartment.images.length > 0) {
    apartment.images[0].isFeatured = true
  }

  apartment.images = apartment.images.map((img, idx) => ({
    ...img,
    order: idx + 1,
  }))

  apartments[apartmentIndex] = apartment
  return apartment
}

export function reorderImages(apartmentId: number, imageIds: string[]): Apartment | undefined {
  const apartmentIndex = apartments.findIndex((a) => a.id === apartmentId)
  if (apartmentIndex === -1) return undefined

  const apartment = apartments[apartmentIndex]
  if (!apartment.images) {
    apartment.images = []
    return apartment
  }

  const imageMap = new Map(apartment.images.map((img) => [img.id, img]))
  const reorderedImages = imageIds
    .map((id, index) => {
      const image = imageMap.get(id)
      if (!image) return null
      return {
        ...image,
        order: index + 1,
      }
    })
    .filter(Boolean) as ApartmentImage[]

  if (reorderedImages.length !== apartment.images.length) return undefined

  apartment.images = reorderedImages
  apartments[apartmentIndex] = apartment

  return apartment
}
