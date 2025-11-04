"use client"

import { Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/contexts/language-context"

export default function ContactPage() {
  const { translations } = useLanguage()

  // Add safety check for translations
  if (!translations) return null

  return (
    <main className="flex min-h-screen flex-col">
      <section className="bg-muted py-12">
        <div className="container">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {translations["contact.title"]}
          </h1>
          <p className="mt-4 text-muted-foreground max-w-[700px]">{translations["contact.subtitle"]}</p>
        </div>
      </section>

      <section className="container py-12 md:py-24 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{translations["contact.form.title"]}</CardTitle>
              <CardDescription>{translations["contact.form.description"]}</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">{translations["contact.form.name"]}</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">{translations["contact.form.email"]}</Label>
                  <Input id="email" type="email" placeholder="Your email address" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">{translations["contact.form.subject"]}</Label>
                  <Input id="subject" placeholder="What is this regarding?" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">{translations["contact.form.message"]}</Label>
                  <Textarea id="message" placeholder="Your message" className="min-h-[150px]" />
                </div>
                <Button className="w-full">{translations["contact.form.send"]}</Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">{translations["contact.info.title"]}</h2>
              <p className="mt-2 text-muted-foreground">{translations["contact.info.subtitle"]}</p>
            </div>

            <div className="grid gap-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{translations["contact.info.phone"]}</h3>
                  <p className="text-muted-foreground">+385 12 345 6789</p>
                  <p className="text-sm text-muted-foreground mt-1">{translations["contact.info.phoneHours"]}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{translations["contact.info.email"]}</h3>
                  <p className="text-muted-foreground">info@majstoricapartments.com</p>
                  <p className="text-sm text-muted-foreground mt-1">{translations["contact.info.emailResponse"]}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{translations["contact.info.address"]}</h3>
                  <p className="text-muted-foreground">123 Coastal Road, Medulin, Croatia</p>
                  <p className="text-sm text-muted-foreground mt-1">{translations["contact.info.addressLocation"]}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 aspect-video rounded-lg overflow-hidden border bg-gray-100 flex items-center justify-center">
              <div className="text-center p-4">
                <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Medulin, Croatia</p>
                <p className="text-sm text-muted-foreground mt-1">Map loading is disabled in preview mode</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
