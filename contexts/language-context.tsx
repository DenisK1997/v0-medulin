"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "de" | "hr"

interface Translations {
  [key: string]: string
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  translations: Translations
}

const translations: Record<Language, Translations> = {
  en: {
    "nav.home": "Home",
    "nav.apartments": "Apartments",
    "nav.about": "About",
    "nav.contact": "Contact",
    "home.apartments.title": "Our Apartments",
    "home.apartments.subtitle": "Choose from our selection of comfortable and well-equipped apartments",
    "home.why.title": "Why Choose Us",
    "home.why.subtitle": "Experience the perfect blend of comfort and location",
    "home.location.title": "Prime Location",
    "home.location.description": "Located just minutes from the beach and Medulin's vibrant promenade",
    "home.service.title": "Personal Service",
    "home.service.description": "We're here to make your stay comfortable and memorable",
    "home.amenities.title": "Modern Amenities",
    "home.amenities.description": "All apartments feature modern conveniences and comfortable furnishings",
    "home.cta.title": "Ready to Book Your Stay?",
    "home.cta.subtitle": "Contact us today to reserve your perfect apartment in Medulin",
    "home.cta.viewApartments": "View All Apartments",
    "apartments.title": "Our Apartments",
    "apartments.subtitle": "Discover your perfect home away from home in Medulin",
    "apartments.search": "Search Apartments",
    "common.dates": "Dates",
    "common.guests": "Guests",
    "common.guest": "Guest",
    "common.searchAvailability": "Search Availability",
    "common.showingApartments": "Showing {count} apartments",
    "common.sortPriceLow": "Price: Low to High",
    "common.sortPriceHigh": "Price: High to Low",
    "common.night": "night",
    "common.bed": "bed",
    "common.beds": "beds",
    "common.bedroom": "bedroom",
    "common.bedrooms": "bedrooms",
    "common.bath": "bath",
    "common.baths": "baths",
    "common.bathroom": "bathroom",
    "common.bathrooms": "bathrooms",
    "common.sofaBed": "sofa bed",
    "common.sofaBeds": "sofa beds",
    "common.viewDetails": "View Details",
    "common.contactUs": "Contact Us",
    "common.backToAll": "Back to All Apartments",
    "common.upTo": "Up to",
    "common.description": "Description",
    "common.amenities": "Amenities",
    "common.rules": "House Rules",
    "common.perNight": "per night",
    "common.total": "Total",
    "common.bookNow": "Book Now",
    "common.youWontBeChargedYet": "You won't be charged yet",
  },
  de: {
    "nav.home": "Startseite",
    "nav.apartments": "Apartments",
    "nav.about": "Über uns",
    "nav.contact": "Kontakt",
    "home.apartments.title": "Unsere Apartments",
    "home.apartments.subtitle": "Wählen Sie aus unserer Auswahl an komfortablen und gut ausgestatteten Apartments",
    "home.why.title": "Warum uns wählen",
    "home.why.subtitle": "Erleben Sie die perfekte Mischung aus Komfort und Lage",
    "home.location.title": "Erstklassige Lage",
    "home.location.description": "Nur wenige Minuten vom Strand und Medulins lebhafter Promenade entfernt",
    "home.service.title": "Persönlicher Service",
    "home.service.description": "Wir sind hier, um Ihren Aufenthalt komfortabel und unvergesslich zu machen",
    "home.amenities.title": "Moderne Ausstattung",
    "home.amenities.description": "Alle Apartments verfügen über moderne Annehmlichkeiten und komfortable Möbel",
    "home.cta.title": "Bereit, Ihren Aufenthalt zu buchen?",
    "home.cta.subtitle": "Kontaktieren Sie uns noch heute, um Ihr perfektes Apartment in Medulin zu reservieren",
    "home.cta.viewApartments": "Alle Apartments ansehen",
    "apartments.title": "Unsere Apartments",
    "apartments.subtitle": "Entdecken Sie Ihr perfektes Zuhause in Medulin",
    "apartments.search": "Apartments suchen",
    "common.dates": "Daten",
    "common.guests": "Gäste",
    "common.guest": "Gast",
    "common.searchAvailability": "Verfügbarkeit prüfen",
    "common.showingApartments": "{count} Apartments werden angezeigt",
    "common.sortPriceLow": "Preis: Niedrig bis Hoch",
    "common.sortPriceHigh": "Preis: Hoch bis Niedrig",
    "common.night": "Nacht",
    "common.bed": "Bett",
    "common.beds": "Betten",
    "common.bedroom": "Schlafzimmer",
    "common.bedrooms": "Schlafzimmer",
    "common.bath": "Bad",
    "common.baths": "Bäder",
    "common.bathroom": "Badezimmer",
    "common.bathrooms": "Badezimmer",
    "common.sofaBed": "Schlafsofa",
    "common.sofaBeds": "Schlafsofas",
    "common.viewDetails": "Details ansehen",
    "common.contactUs": "Kontaktieren Sie uns",
    "common.backToAll": "Zurück zu allen Apartments",
    "common.upTo": "Bis zu",
    "common.description": "Beschreibung",
    "common.amenities": "Ausstattung",
    "common.rules": "Hausregeln",
    "common.perNight": "pro Nacht",
    "common.total": "Gesamt",
    "common.bookNow": "Jetzt buchen",
    "common.youWontBeChargedYet": "Sie werden noch nicht belastet",
  },
  hr: {
    "nav.home": "Početna",
    "nav.apartments": "Apartmani",
    "nav.about": "O nama",
    "nav.contact": "Kontakt",
    "home.apartments.title": "Naši Apartmani",
    "home.apartments.subtitle": "Odaberite iz naše ponude udobnih i dobro opremljenih apartmana",
    "home.why.title": "Zašto odabrati nas",
    "home.why.subtitle": "Doživite savršenu kombinaciju udobnosti i lokacije",
    "home.location.title": "Izvrsna lokacija",
    "home.location.description": "Smješteni samo nekoliko minuta od plaže i živahne šetnice Medulina",
    "home.service.title": "Osobna usluga",
    "home.service.description": "Tu smo da učinimo vaš boravak udobnim i nezaboravnim",
    "home.amenities.title": "Moderni sadržaji",
    "home.amenities.description": "Svi apartmani imaju moderne pogodnosti i udoban namještaj",
    "home.cta.title": "Spremni rezervirati boravak?",
    "home.cta.subtitle": "Kontaktirajte nas danas i rezervirajte svoj savršeni apartman u Medulinu",
    "home.cta.viewApartments": "Pogledaj sve apartmane",
    "apartments.title": "Naši Apartmani",
    "apartments.subtitle": "Otkrijte svoj savršeni dom daleko od kuće u Medulinu",
    "apartments.search": "Pretraži apartmane",
    "common.dates": "Datumi",
    "common.guests": "Gosti",
    "common.guest": "Gost",
    "common.searchAvailability": "Provjeri dostupnost",
    "common.showingApartments": "Prikazuje se {count} apartmana",
    "common.sortPriceLow": "Cijena: Od najniže",
    "common.sortPriceHigh": "Cijena: Od najviše",
    "common.night": "noć",
    "common.bed": "krevet",
    "common.beds": "kreveta",
    "common.bedroom": "spavaća soba",
    "common.bedrooms": "spavaće sobe",
    "common.bath": "kupaonica",
    "common.baths": "kupaonice",
    "common.bathroom": "kupaonica",
    "common.bathrooms": "kupaonice",
    "common.sofaBed": "kauč na razvlačenje",
    "common.sofaBeds": "kauča na razvlačenje",
    "common.viewDetails": "Pogledaj detalje",
    "common.contactUs": "Kontaktirajte nas",
    "common.backToAll": "Natrag na sve apartmane",
    "common.upTo": "Do",
    "common.description": "Opis",
    "common.amenities": "Sadržaji",
    "common.rules": "Kućni red",
    "common.perNight": "po noći",
    "common.total": "Ukupno",
    "common.bookNow": "Rezerviraj sada",
    "common.youWontBeChargedYet": "Nećete biti naplaćeni odmah",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "de", "hr"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        translations: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
