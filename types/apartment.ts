export interface Apartment {
  id: number
  name: string
  subName?: string
  description: string
  longDescription?: string
  price: number
  beds: number
  sofaBeds?: number
  baths: number
  guests: number
  rating?: number
  reviews?: number
  amenities?: string[]
  rules?: string[]
  images?: ApartmentImage[]
}

export interface ApartmentImage {
  id: string
  url: string
  alt: string
  isFeatured: boolean
  order: number
}
