import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
            Welcome to Majstoric Apartments
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 leading-relaxed px-4">
            Experience comfort and luxury in our premium apartment rentals
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="#apartments">View Apartments</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/admin/login">Admin Login</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Apartments Grid */}
      <section id="apartments" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-8 text-center">Our Apartments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            { name: "Apartment A1", beds: 2, guests: 4, price: "€120/night" },
            { name: "Apartment A2", beds: 1, guests: 2, price: "€85/night" },
            { name: "Apartment B1", beds: 3, guests: 6, price: "€150/night" },
            { name: "Apartment B2", beds: 2, guests: 4, price: "€110/night" },
            { name: "Apartment C1", beds: 1, guests: 2, price: "€90/night" },
            { name: "Apartment C2", beds: 2, guests: 4, price: "€115/night" },
          ].map((apt) => (
            <Card key={apt.name} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="aspect-video bg-slate-200 rounded-lg mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{apt.name}</h3>
                <div className="flex justify-between text-sm text-slate-600 mb-4">
                  <span>{apt.beds} Bedrooms</span>
                  <span>Up to {apt.guests} guests</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-slate-900">{apt.price}</span>
                  <Button size="sm">Book Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-6 sm:py-8 mt-12 sm:mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm sm:text-base">&copy; 2025 Majstoric Apartments. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
