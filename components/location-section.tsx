"use client"
import { MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function LocationSection() {
  const { translations } = useLanguage()

  const attractions = [
    {
      name: "Medulin Beach",
      distance: "5 min walk",
      description: "Beautiful sandy beach with crystal clear waters, perfect for families",
    },
    {
      name: "Kamenjak Nature Park",
      distance: "15 min drive",
      description: "Stunning nature reserve with cliffs, beaches, and diverse wildlife",
    },
    {
      name: "Pula Arena",
      distance: "20 min drive",
      description: "Ancient Roman amphitheater, one of the best preserved in the world",
    },
    {
      name: "Local Restaurants",
      distance: "5-10 min walk",
      description: "Authentic Croatian cuisine and fresh seafood in nearby restaurants",
    },
  ]

  return (
    <section className="container py-12 md:py-24 lg:py-32 relative">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-mediterranean-blue-dark">
              {translations["home.explore.title"]}
            </h2>
            <p className="text-muted-foreground">{translations["home.explore.subtitle"]}</p>
          </div>

          <div className="space-y-4">
            {attractions.map((attraction, index) => (
              <div key={index} className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-mediterranean-orange mt-0.5" />
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-mediterranean-blue-dark">{attraction.name}</h3>
                    <span className="text-sm text-muted-foreground ml-2">({attraction.distance})</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{attraction.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-square md:aspect-auto md:h-[500px] rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2813.2775429669397!2d13.95072491554301!3d44.82252397909862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47632bc5b0e7e9c3%3A0x3ae35a8456593302!2sFucane%20122A%2C%2052100%2C%20Medulin%2C%20Croatia!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Majstorić Apartments Location"
            className="absolute inset-0"
          ></iframe>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 pointer-events-none">
            <div className="text-white">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <h3 className="font-medium">{translations["home.location.ourLocation"]}</h3>
              </div>
              <p className="text-sm opacity-90">Fucane 122A, 52100, Medulin, Croatia</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-8 flex justify-center">
        <div className="w-0.5 h-8 bg-mediterranean-sand"></div>
      </div>
    </section>
  )
}
