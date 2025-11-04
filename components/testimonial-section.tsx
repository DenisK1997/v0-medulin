"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

import { Card, CardContent } from "@/components/ui/card"

export function TestimonialSection() {
  const { translations } = useLanguage()

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "United Kingdom",
      text: "We had an amazing stay at the Sea View Apartment. The views were breathtaking and the apartment was spotless. The hosts were incredibly helpful with local recommendations.",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Marco Rossi",
      location: "Italy",
      text: "The Family Suite was perfect for our vacation with children. Spacious, well-equipped, and the pool was a big hit with the kids. We'll definitely be back next summer!",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Anna Schmidt",
      location: "Germany",
      text: "The Garden Retreat was the perfect place to relax. We loved having breakfast in the garden and the location was ideal for exploring Istria. Highly recommended!",
      rating: 4,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <section className="container py-12 md:py-24 lg:py-32 border-b border-mediterranean-sand mb-0">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-mediterranean-blue-dark">
            {translations["home.testimonials.title"]}
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {translations["home.testimonials.subtitle"]}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-white border-mediterranean-sand">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-mediterranean-blue-dark">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating ? "fill-mediterranean-orange text-mediterranean-orange" : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm">{testimonial.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
