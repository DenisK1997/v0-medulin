import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Calendar, ImageIcon, TrendingUp } from "lucide-react"

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/admin/login")
  }

  // Mock data for stats
  const stats = [
    {
      title: "Total Apartments",
      value: "6",
      icon: Building2,
      description: "Active listings",
    },
    {
      title: "Total Bookings",
      value: "24",
      icon: Calendar,
      description: "+12% from last month",
    },
    {
      title: "Total Images",
      value: "48",
      icon: ImageIcon,
      description: "Across all apartments",
    },
    {
      title: "Occupancy Rate",
      value: "78%",
      icon: TrendingUp,
      description: "+5% from last month",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back, here's your overview</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">New booking received</p>
                  <p className="text-xs text-muted-foreground">Suite Apartment Palma - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Images updated</p>
                  <p className="text-xs text-muted-foreground">Studio Apartment Maslina - 5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Review posted</p>
                  <p className="text-xs text-muted-foreground">5 stars for Suite Apartment Pinija - 1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <a
                href="/admin/apartments"
                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted transition-colors"
              >
                <Building2 className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Manage Apartments</p>
                  <p className="text-xs text-muted-foreground">View and edit apartment listings</p>
                </div>
              </a>
              <a
                href="/admin/images"
                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted transition-colors"
              >
                <ImageIcon className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Manage Images</p>
                  <p className="text-xs text-muted-foreground">Upload and organize photos</p>
                </div>
              </a>
              <a
                href="/admin/bookings"
                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted transition-colors"
              >
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">View Bookings</p>
                  <p className="text-xs text-muted-foreground">Check reservations and availability</p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
