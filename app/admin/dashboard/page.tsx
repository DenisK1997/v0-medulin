"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  BarChart3,
  PlusCircle,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Building2,
  ChevronLeft,
  ChevronRight,
  Edit,
  Shield,
  Eye,
  X,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Booking = {
  id: string
  customerName: string
  email: string
  phone: string
  apartment: string
  checkIn: string
  checkOut: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  notes?: string
  guests?: number
  price?: number
  paymentStatus?: "pending" | "deposit" | "full"
  dateOfBirth?: string
  address?: string
  guestQuery?: string
  adminComment?: string
}

type User = {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "staff"
  status: "active" | "inactive"
  lastLogin: string
}

type Content = {
  id: string
  title: string
  type: "page" | "post"
  status: "published" | "draft"
  lastUpdated: string
}

type Apartment = {
  id: string
  name: string
  capacity: number
  color: string
}

const apartments: Apartment[] = [
  { id: "apt1", name: "Apartment 1", capacity: 4, color: "bg-blue-500" },
  { id: "apt2", name: "Apartment 2", capacity: 2, color: "bg-purple-500" },
  { id: "apt3", name: "Apartment 3", capacity: 6, color: "bg-green-500" },
  { id: "apt4", name: "Apartment 4", capacity: 4, color: "bg-orange-500" },
  { id: "apt5", name: "Apartment 5", capacity: 3, color: "bg-pink-500" },
  { id: "apt6", name: "Apartment 6", capacity: 5, color: "bg-teal-500" },
]

const mockBookings: Booking[] = [
  {
    id: "1",
    customerName: "John Doe",
    email: "john@example.com",
    phone: "+123 456 7890",
    apartment: "apt1",
    checkIn: "2024-01-20",
    checkOut: "2024-01-25",
    status: "confirmed",
    notes: "Early check-in requested",
    guests: 2,
    price: 500,
    paymentStatus: "full",
    dateOfBirth: "1985-03-15",
    address: "123 Main St, New York, NY 10001",
    guestQuery: "Is early check-in at 12pm possible?",
    adminComment: "Confirmed early check-in at 12pm",
  },
  {
    id: "2",
    customerName: "Jane Smith",
    email: "jane@example.com",
    phone: "+123 456 7891",
    apartment: "apt2",
    checkIn: "2024-01-22",
    checkOut: "2024-01-28",
    status: "confirmed",
    notes: "Extra towels needed",
    guests: 4,
    price: 750,
    paymentStatus: "deposit",
    dateOfBirth: "1990-07-22",
    address: "456 Oak Ave, Los Angeles, CA 90001",
    guestQuery: "Can we get extra towels and bedding for 4 people?",
    adminComment: "",
  },
  {
    id: "3",
    customerName: "Mike Johnson",
    email: "mike@example.com",
    phone: "+123 456 7892",
    apartment: "apt3",
    checkIn: "2024-01-15",
    checkOut: "2024-01-20",
    status: "completed",
    notes: "Pet-friendly",
    guests: 3,
    price: 600,
    paymentStatus: "full",
    dateOfBirth: "1988-11-30",
    address: "789 Pine Rd, Chicago, IL 60601",
    guestQuery: "Is a pet allowed in the apartment? We have a small dog.",
    adminComment: "Pet approved - small dog only",
  },
  {
    id: "4",
    customerName: "Sarah Williams",
    email: "sarah@example.com",
    phone: "+123 456 7893",
    apartment: "apt1",
    checkIn: "2024-01-26",
    checkOut: "2024-01-30",
    status: "pending",
    notes: "Anniversary celebration",
    guests: 2,
    price: 400,
    paymentStatus: "deposit",
    dateOfBirth: "1992-05-18",
    address: "321 Elm St, Miami, FL 33101",
    guestQuery: "Can you arrange flowers and champagne for our anniversary?",
    adminComment: "",
  },
  {
    id: "5",
    customerName: "Tom Brown",
    email: "tom@example.com",
    phone: "+123 456 7894",
    apartment: "apt4",
    checkIn: "2024-01-18",
    checkOut: "2024-01-23",
    status: "confirmed",
    notes: "Business trip",
    guests: 1,
    price: 450,
    paymentStatus: "full",
    dateOfBirth: "1980-09-12",
    address: "654 Maple Dr, Boston, MA 02101",
    guestQuery: "Do you have a workspace with good WiFi?",
    adminComment: "Workspace setup in living room",
  },
  {
    id: "6",
    customerName: "Emily Davis",
    email: "emily@example.com",
    phone: "+123 456 7895",
    apartment: "apt5",
    checkIn: "2024-01-10",
    checkOut: "2024-01-15",
    status: "confirmed",
    notes: "Family vacation",
    guests: 5,
    price: 800,
    paymentStatus: "deposit",
    dateOfBirth: "1987-02-28",
    address: "987 Cedar Ln, Seattle, WA 98101",
    guestQuery: "Is there parking available for a large SUV?",
    adminComment: "",
  },
  {
    id: "7",
    customerName: "Robert Wilson",
    email: "robert@example.com",
    phone: "+123 456 7896",
    apartment: "apt5",
    checkIn: "2024-01-15",
    checkOut: "2024-01-20",
    status: "pending",
    notes: "Weekend getaway",
    guests: 2,
    price: 550,
    paymentStatus: "pending",
    dateOfBirth: "1995-12-05",
    address: "147 Birch Ct, Portland, OR 97201",
    guestQuery: "Are there restaurants within walking distance?",
    adminComment: "",
  },
]

const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@majstoric.com",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-20 14:30",
  },
  {
    id: "2",
    name: "John Manager",
    email: "john@majstoric.com",
    role: "manager",
    status: "active",
    lastLogin: "2024-01-19 09:15",
  },
  {
    id: "3",
    name: "Sarah Staff",
    email: "sarah@majstoric.com",
    role: "staff",
    status: "active",
    lastLogin: "2024-01-18 16:45",
  },
  {
    id: "4",
    name: "Mike Staff",
    email: "mike@majstoric.com",
    role: "staff",
    status: "inactive",
    lastLogin: "2024-01-10 11:20",
  },
]

const mockContent: Content[] = [
  { id: "1", title: "Home Page", type: "page", status: "published", lastUpdated: "2024-01-18" },
  { id: "2", title: "About Us", type: "page", status: "published", lastUpdated: "2024-01-15" },
  { id: "3", title: "Welcome Post", type: "post", status: "published", lastUpdated: "2024-01-20" },
  { id: "4", title: "New Features", type: "post", status: "draft", lastUpdated: "2024-01-19" },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeView, setActiveView] = useState("dashboard")
  const [bookings, setBookings] = useState<Booking[]>(mockBookings)
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [content, setContent] = useState<Content[]>(mockContent)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedApartment, setSelectedApartment] = useState<string | null>(null)
  const [viewingBooking, setViewingBooking] = useState<Booking | null>(null)
  const [editingComment, setEditingComment] = useState("")

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (auth !== "true") {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin/login")
  }

  const updateBookingStatus = (bookingId: string, newStatus: Booking["status"]) => {
    setBookings(bookings.map((booking) => (booking.id === bookingId ? { ...booking, status: newStatus } : booking)))
  }

  const deleteBooking = (bookingId: string) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      setBookings(bookings.filter((booking) => booking.id !== bookingId))
    }
  }

  const deleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId))
    }
  }

  const toggleUserStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  const deleteContent = (contentId: string) => {
    if (confirm("Are you sure you want to delete this content?")) {
      setContent(content.filter((item) => item.id !== contentId))
    }
  }

  const toggleContentStatus = (contentId: string) => {
    setContent(
      content.map((item) =>
        item.id === contentId ? { ...item, status: item.status === "published" ? "draft" : "published" } : item,
      ),
    )
  }

  const getUserRoleBadge = (role: User["role"]) => {
    const variants = {
      admin: "bg-purple-100 text-purple-800 hover:bg-purple-100",
      manager: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      staff: "bg-slate-100 text-slate-800 hover:bg-slate-100",
    }
    return variants[role]
  }

  const getStatusBadge = (status: Booking["status"] | User["status"] | Content["status"]) => {
    // Handle booking statuses
    if (["pending", "confirmed", "completed", "cancelled"].includes(status as Booking["status"])) {
      const bookingVariants = {
        pending: "bg-amber-100 text-amber-800 hover:bg-amber-100",
        confirmed: "bg-blue-100 text-blue-800 hover:bg-blue-100",
        completed: "bg-green-100 text-green-800 hover:bg-green-100",
        cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
      }
      return bookingVariants[status as Booking["status"]]
    }
    // Handle user statuses
    if (["active", "inactive"].includes(status as User["status"])) {
      const userVariants = {
        active: "bg-green-100 text-green-800 hover:bg-green-100",
        inactive: "bg-slate-100 text-slate-800 hover:bg-slate-100",
      }
      return userVariants[status as User["status"]]
    }
    // Handle content statuses
    if (["published", "draft"].includes(status as Content["status"])) {
      const contentVariants = {
        published: "bg-green-100 text-green-800 hover:bg-green-100",
        draft: "bg-amber-100 text-amber-800 hover:bg-amber-100",
      }
      return contentVariants[status as Content["status"]]
    }
    return "bg-slate-100 text-slate-800 hover:bg-slate-100" // Default fallback
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek, year, month }
  }

  const isDateBooked = (date: Date, apartmentId: string) => {
    const dateStr = date.toISOString().split("T")[0]
    return bookings.some((booking) => {
      if (booking.apartment !== apartmentId) return false
      if (booking.status === "cancelled") return false
      // Check if the date falls within the booking range (inclusive of check-in and check-out)
      const checkInDate = new Date(booking.checkIn)
      const checkOutDate = new Date(booking.checkOut)
      checkInDate.setHours(0, 0, 0, 0) // Normalize to start of day
      checkOutDate.setHours(0, 0, 0, 0) // Normalize to start of day
      const currentDate = new Date(date)
      currentDate.setHours(0, 0, 0, 0) // Normalize to start of day

      return currentDate >= checkInDate && currentDate < checkOutDate // booking is up to but not including checkout date
    })
  }

  const getBookingForDate = (date: Date, apartmentId: string) => {
    const dateStr = date.toISOString().split("T")[0]

    // First check if this is a split day - if so, don't return a regular booking
    const splitCheck = getSplitDayBookingsRaw(date, apartmentId)
    if (splitCheck) return null

    return bookings.find((booking) => {
      if (booking.apartment !== apartmentId) return false
      if (booking.status === "cancelled") return false
      const checkInDate = new Date(booking.checkIn)
      const checkOutDate = new Date(booking.checkOut)
      checkInDate.setHours(0, 0, 0, 0)
      checkOutDate.setHours(0, 0, 0, 0)
      const currentDate = new Date(date)
      currentDate.setHours(0, 0, 0, 0)

      // Include both check-in and check-out dates in the booking range
      return currentDate >= checkInDate && currentDate <= checkOutDate
    })
  }

  const getSplitDayBookingsRaw = (date: Date, apartmentId: string) => {
    const dateStr = date.toISOString().split("T")[0]
    const checkOut = bookings.find((booking) => {
      return booking.apartment === apartmentId && booking.checkOut === dateStr && booking.status !== "cancelled"
    })
    const checkIn = bookings.find((booking) => {
      return booking.apartment === apartmentId && booking.checkIn === dateStr && booking.status !== "cancelled"
    })

    if (checkOut && checkIn && checkOut.id !== checkIn.id) {
      return { checkOut, checkIn }
    }
    return null
  }

  const getSplitDayBookings = (date: Date, apartmentId: string) => {
    const dateStr = date.toISOString().split("T")[0]
    const checkOut = bookings.find((booking) => {
      return booking.apartment === apartmentId && booking.checkOut === dateStr && booking.status !== "cancelled"
    })
    const checkIn = bookings.find((booking) => {
      return booking.apartment === apartmentId && booking.checkIn === dateStr && booking.status !== "cancelled"
    })

    // Return both if they exist and are different bookings
    if (checkOut && checkIn && checkOut.id !== checkIn.id) {
      return { checkOut, checkIn }
    }
    return null
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate)
  const monthName = new Date(year, month).toLocaleString("default", { month: "long" })

  const displayedBookings = selectedApartment ? bookings.filter((b) => b.apartment === selectedApartment) : bookings

  const totalRevenue = bookings.filter((b) => b.status === "completed").reduce((sum, b) => sum + (b.price || 0), 0)
  const avgBookingDuration =
    bookings.reduce((sum, b) => {
      const checkIn = new Date(b.checkIn)
      const checkOut = new Date(b.checkOut)
      return sum + (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    }, 0) / bookings.length || 0
  const occupancyRate = 68 // Placeholder, actual calculation would be complex
  const monthlyBookings = [
    { month: "Jan", bookings: 12, revenue: 1800 },
    { month: "Feb", bookings: 15, revenue: 2250 },
    { month: "Mar", bookings: 18, revenue: 2700 },
    { month: "Apr", bookings: 14, revenue: 2100 },
    { month: "May", bookings: 20, revenue: 3000 },
    { month: "Jun", bookings: 22, revenue: 3300 },
  ]

  const apartmentStats = apartments.map((apt) => {
    const aptBookings = bookings.filter((b) => b.apartment === apt.id && b.status === "completed")
    return {
      name: apt.name,
      bookings: aptBookings.length,
      color: apt.color,
    }
  })

  const handleDayClick = (date: Date, apartmentId: string) => {
    const booking = getBookingForDate(date, apartmentId)
    const splitBookings = getSplitDayBookings(date, apartmentId)

    if (booking) {
      setViewingBooking(booking)
      setEditingComment(booking.adminComment || "")
    } else if (splitBookings) {
      // For split days, show the check-in booking by default
      setViewingBooking(splitBookings.checkIn)
      setEditingComment(splitBookings.checkIn.adminComment || "")
    }
  }

  const handleSaveComment = () => {
    if (viewingBooking) {
      setBookings(bookings.map((b) => (b.id === viewingBooking.id ? { ...b, adminComment: editingComment } : b)))
      setViewingBooking({ ...viewingBooking, adminComment: editingComment })
    }
  }

  const togglePaymentStatus = (bookingId: string) => {
    setBookings((prevBookings) =>
      prevBookings.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              paymentStatus:
                b.paymentStatus === "full" ? "deposit" : b.paymentStatus === "deposit" ? "pending" : "full",
            }
          : b,
      ),
    )
    setViewingBooking((prevBooking) =>
      prevBooking && prevBooking.id === bookingId
        ? {
            ...prevBooking,
            paymentStatus:
              prevBooking.paymentStatus === "full"
                ? "deposit"
                : prevBooking.paymentStatus === "deposit"
                  ? "pending"
                  : "full",
          }
        : prevBooking,
    )
  }

  const updateAdminComment = (bookingId: string, comment: string) => {
    setBookings((prevBookings) => prevBookings.map((b) => (b.id === bookingId ? { ...b, adminComment: comment } : b)))
  }

  // Correctly define handleTogglePaymentStatus
  const handleTogglePaymentStatus = () => {
    if (viewingBooking) {
      togglePaymentStatus(viewingBooking.id)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
            <h1 className="text-lg sm:text-xl font-bold text-slate-900">Majstoric Admin</h1>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="gap-2 text-sm sm:text-base">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="bg-white border-b lg:border-b-0 lg:border-r border-slate-200 lg:min-h-[calc(100vh-73px)] p-2 sm:p-4 lg:w-64">
          <nav className="flex lg:flex-col gap-1 sm:gap-2 overflow-x-auto lg:overflow-x-visible">
            <Button
              variant={activeView === "dashboard" ? "secondary" : "ghost"}
              className="flex-shrink-0 lg:w-full justify-start gap-2 text-xs sm:text-sm"
              onClick={() => setActiveView("dashboard")}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Button>
            <Button
              variant={activeView === "bookings" ? "secondary" : "ghost"}
              className="flex-shrink-0 lg:w-full justify-start gap-2 text-xs sm:text-sm"
              onClick={() => setActiveView("bookings")}
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Bookings</span>
            </Button>
            <Button
              variant={activeView === "apartments" ? "secondary" : "ghost"}
              className="flex-shrink-0 lg:w-full justify-start gap-2 text-xs sm:text-sm"
              onClick={() => setActiveView("apartments")}
            >
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">Apartments</span>
            </Button>
            <Button
              variant={activeView === "content" ? "secondary" : "ghost"}
              className="flex-shrink-0 lg:w-full justify-start gap-2 text-xs sm:text-sm"
              onClick={() => setActiveView("content")}
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Content</span>
            </Button>
            <Button
              variant={activeView === "users" ? "secondary" : "ghost"}
              className="flex-shrink-0 lg:w-full justify-start gap-2 text-xs sm:text-sm"
              onClick={() => setActiveView("users")}
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Users</span>
            </Button>
            <Button
              variant={activeView === "analytics" ? "secondary" : "ghost"}
              className="flex-shrink-0 lg:w-full justify-start gap-2 text-xs sm:text-sm"
              onClick={() => setActiveView("analytics")}
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </Button>
            <Button
              variant={activeView === "settings" ? "secondary" : "ghost"}
              className="flex-shrink-0 lg:w-full justify-start gap-2 text-xs sm:text-sm"
              onClick={() => setActiveView("settings")}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
            {activeView === "users" ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Users</h2>
                    <p className="text-sm sm:text-base text-slate-600 mt-1">Manage user accounts and permissions</p>
                  </div>
                  <Button className="gap-2 w-full sm:w-auto">
                    <PlusCircle className="w-4 h-4" />
                    Add User
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Total Users</CardDescription>
                      <CardTitle className="text-2xl sm:text-3xl">{users.length}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs sm:text-sm text-slate-600">
                        {users.filter((u) => u.status === "active").length} active users
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Admins</CardDescription>
                      <CardTitle className="text-2xl sm:text-3xl">
                        {users.filter((u) => u.role === "admin").length}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs sm:text-sm text-purple-600">Full access</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Staff</CardDescription>
                      <CardTitle className="text-2xl sm:text-3xl">
                        {users.filter((u) => u.role === "staff").length}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs sm:text-sm text-slate-600">Limited access</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">All Users</CardTitle>
                    <CardDescription className="text-sm">Manage user accounts and roles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {users.map((user) => (
                        <div
                          key={user.id}
                          className="border border-slate-200 rounded-lg p-3 sm:p-4 hover:border-slate-300 transition-colors"
                        >
                          <div className="flex flex-col gap-3">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                                  <Users className="w-5 h-5 text-slate-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h3 className="font-semibold text-base sm:text-lg text-slate-900 truncate">
                                    {user.name}
                                  </h3>
                                  <p className="text-xs sm:text-sm text-slate-600 truncate">{user.email}</p>
                                </div>
                              </div>
                              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 flex-shrink-0">
                                <Badge className={getUserRoleBadge(user.role)}>
                                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                </Badge>
                                <Badge className={getStatusBadge(user.status) as string}>
                                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                </Badge>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-600 overflow-x-auto">
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <Clock className="w-4 h-4" />
                                <span>Last login: {user.lastLogin}</span>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row flex-wrap gap-2 pt-2">
                              <Button size="sm" variant="outline" className="gap-2 w-full sm:w-auto bg-transparent">
                                <Edit className="w-4 h-4" />
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="gap-2 w-full sm:w-auto bg-transparent"
                                onClick={() => toggleUserStatus(user.id)}
                              >
                                {user.status === "active" ? (
                                  <>
                                    <XCircle className="w-4 h-4" />
                                    Deactivate
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="w-4 h-4" />
                                    Activate
                                  </>
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 w-full sm:w-auto bg-transparent"
                                onClick={() => deleteUser(user.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : activeView === "content" ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Content</h2>
                    <p className="text-sm sm:text-base text-slate-600 mt-1">Manage pages, posts, and media</p>
                  </div>
                  <Button className="gap-2 w-full sm:w-auto">
                    <PlusCircle className="w-4 h-4" />
                    Add Content
                  </Button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Total Items</CardDescription>
                      <CardTitle className="text-2xl sm:text-3xl">{content.length}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs sm:text-sm text-slate-600">All content</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Published</CardDescription>
                      <CardTitle className="text-2xl sm:text-3xl">
                        {content.filter((c) => c.status === "published").length}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs sm:text-sm text-green-600">Live content</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Drafts</CardDescription>
                      <CardTitle className="text-2xl sm:text-3xl">
                        {content.filter((c) => c.status === "draft").length}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs sm:text-sm text-amber-600">In progress</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Pages</CardDescription>
                      <CardTitle className="text-2xl sm:text-3xl">
                        {content.filter((c) => c.type === "page").length}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs sm:text-sm text-slate-600">Static pages</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Content Management</CardTitle>
                    <CardDescription className="text-sm">Manage your website content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="all">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="all" className="text-xs sm:text-sm">
                          All Content
                        </TabsTrigger>
                        <TabsTrigger value="pages" className="text-xs sm:text-sm">
                          Pages
                        </TabsTrigger>
                        <TabsTrigger value="posts" className="text-xs sm:text-sm">
                          Posts
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="all" className="mt-4">
                        <div className="space-y-4">
                          {content.map((item) => (
                            <div
                              key={item.id}
                              className="border border-slate-200 rounded-lg p-3 sm:p-4 hover:border-slate-300 transition-colors"
                            >
                              <div className="flex flex-col gap-3">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                  <h3 className="font-semibold text-base sm:text-lg text-slate-900">{item.title}</h3>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-xs">
                                      {item.type}
                                    </Badge>
                                    <Badge className={`${getStatusBadge(item.status)} text-xs`}>
                                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                    </Badge>
                                  </div>
                                </div>
                                <p className="text-xs sm:text-sm text-slate-600">Last updated: {item.lastUpdated}</p>
                                <div className="flex flex-col sm:flex-row gap-2">
                                  <Button size="sm" variant="outline" className="gap-2 w-full sm:w-auto bg-transparent">
                                    <Eye className="w-4 h-4" />
                                    View
                                  </Button>
                                  <Button size="sm" variant="outline" className="gap-2 w-full sm:w-auto bg-transparent">
                                    <Edit className="w-4 h-4" />
                                    Edit
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-full sm:w-auto bg-transparent"
                                    onClick={() => toggleContentStatus(item.id)}
                                  >
                                    {item.status === "published" ? "Unpublish" : "Publish"}
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 w-full sm:w-auto bg-transparent"
                                    onClick={() => deleteContent(item.id)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="pages" className="mt-4">
                        <div className="space-y-4">
                          {content
                            .filter((c) => c.type === "page")
                            .map((item) => (
                              <div key={item.id} className="border border-slate-200 rounded-lg p-4">
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-sm text-slate-600 mt-1">{item.lastUpdated}</p>
                              </div>
                            ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="posts" className="mt-4">
                        <div className="space-y-4">
                          {content
                            .filter((c) => c.type === "post")
                            .map((item) => (
                              <div key={item.id} className="border border-slate-200 rounded-lg p-4">
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-sm text-slate-600 mt-1">{item.lastUpdated}</p>
                              </div>
                            ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </>
            ) : activeView === "settings" ? (
              <>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Settings</h2>
                  <p className="text-sm sm:text-base text-slate-600 mt-1">Manage your application settings</p>
                </div>

                <Tabs defaultValue="general" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                    <TabsTrigger value="general" className="text-xs sm:text-sm">
                      General
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="text-xs sm:text-sm">
                      Appearance
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="text-xs sm:text-sm">
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger value="security" className="text-xs sm:text-sm">
                      Security
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="general" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Site Information</CardTitle>
                        <CardDescription>Update your site details</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="siteName">Site Name</Label>
                          <Input id="siteName" defaultValue="Majstoric" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="siteDescription">Site Description</Label>
                          <Textarea id="siteDescription" defaultValue="Apartment booking and management system" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactEmail">Contact Email</Label>
                          <Input id="contactEmail" type="email" defaultValue="contact@majstoric.com" />
                        </div>
                        <Button>Save Changes</Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Booking Settings</CardTitle>
                        <CardDescription>Configure booking options</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="minStay">Minimum Stay (nights)</Label>
                          <Input id="minStay" type="number" defaultValue="2" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="maxStay">Maximum Stay (nights)</Label>
                          <Input id="maxStay" type="number" defaultValue="30" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="checkInTime">Check-in Time</Label>
                          <Input id="checkInTime" type="time" defaultValue="14:00" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="checkOutTime">Check-out Time</Label>
                          <Input id="checkOutTime" type="time" defaultValue="10:00" />
                        </div>
                        <Button>Save Changes</Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="appearance" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Theme Settings</CardTitle>
                        <CardDescription>Customize the look and feel</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Color Scheme</Label>
                          <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                              <input type="radio" id="light" name="theme" defaultChecked />
                              <Label htmlFor="light">Light</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="radio" id="dark" name="theme" />
                              <Label htmlFor="dark">Dark</Label>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="primaryColor">Primary Color</Label>
                          <Input id="primaryColor" type="color" defaultValue="#3b82f6" />
                        </div>
                        <Button>Save Changes</Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="notifications" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Email Notifications</CardTitle>
                        <CardDescription>Configure notification preferences</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">New Bookings</p>
                            <p className="text-sm text-slate-600">Receive emails for new booking requests</p>
                          </div>
                          <input type="checkbox" defaultChecked className="w-4 h-4" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Booking Confirmations</p>
                            <p className="text-sm text-slate-600">Get notified when bookings are confirmed</p>
                          </div>
                          <input type="checkbox" defaultChecked className="w-4 h-4" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Cancellations</p>
                            <p className="text-sm text-slate-600">Alerts for booking cancellations</p>
                          </div>
                          <input type="checkbox" defaultChecked className="w-4 h-4" />
                        </div>
                        <Button>Save Changes</Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="security" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                        <CardDescription>Manage security and access control</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input id="currentPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm Password</Label>
                          <Input id="confirmPassword" type="password" />
                        </div>
                        <Button>Update Password</Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Two-Factor Authentication</CardTitle>
                        <CardDescription>Add an extra layer of security</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Enable 2FA</p>
                            <p className="text-sm text-slate-600">Secure your account with two-factor authentication</p>
                          </div>
                          <Button variant="outline" className="gap-2 bg-transparent">
                            <Shield className="w-4 h-4" />
                            Enable
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            ) : activeView === "analytics" ? (
              <>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Analytics</h2>
                  <p className="text-sm sm:text-base text-slate-600 mt-1">Track performance and booking insights</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Total Revenue</CardDescription>
                      <CardTitle className="text-2xl sm:text-3xl">${totalRevenue}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs sm:text-sm text-green-600 font-medium">+18% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Occupancy Rate</CardDescription>
                      <CardTitle className="text-2xl sm:text-3xl">{occupancyRate}%</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs sm:text-sm text-blue-600 font-medium">+5% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Total Bookings</CardDescription>
                      <CardTitle className="text-2xl sm:text-3xl">{bookings.length}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs sm:text-sm text-slate-600">
                        {bookings.filter((b) => b.status === "confirmed").length} active
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Avg Stay Duration</CardDescription>
                      <CardTitle className="text-2xl sm:text-3xl">{avgBookingDuration.toFixed(1)}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs sm:text-sm text-slate-600">nights per booking</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Bookings & Revenue Trend</CardTitle>
                    <CardDescription>Monthly performance overview</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {monthlyBookings.map((month) => (
                        <div key={month.month} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-slate-900">{month.month}</span>
                            <div className="flex items-center gap-4">
                              <span className="text-slate-600">{month.bookings} bookings</span>
                              <span className="font-semibold text-slate-900">${month.revenue}</span>
                            </div>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all"
                              style={{ width: `${(month.revenue / 3300) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Apartment Performance</CardTitle>
                    <CardDescription>Completed bookings by apartment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {apartmentStats.map((apt) => (
                        <div key={apt.name} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${apt.color}`}></div>
                              <span className="font-medium text-slate-900">{apt.name}</span>
                            </div>
                            <span className="font-semibold text-slate-900">{apt.bookings} bookings</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2">
                            <div
                              className={`${apt.color} h-2 rounded-full transition-all`}
                              style={{
                                width: `${(apt.bookings / Math.max(...apartmentStats.map((a) => a.bookings))) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Booking Status Distribution</CardTitle>
                      <CardDescription>Current booking statuses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span className="text-sm text-slate-700">Confirmed</span>
                          </div>
                          <span className="font-semibold">
                            {bookings.filter((b) => b.status === "confirmed").length}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                            <span className="text-sm text-slate-700">Pending</span>
                          </div>
                          <span className="font-semibold">{bookings.filter((b) => b.status === "pending").length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-sm text-slate-700">Completed</span>
                          </div>
                          <span className="font-semibold">
                            {bookings.filter((b) => b.status === "completed").length}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <span className="text-sm text-slate-700">Cancelled</span>
                          </div>
                          <span className="font-semibold">
                            {bookings.filter((b) => b.status === "cancelled").length}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Stats</CardTitle>
                      <CardDescription>Additional insights</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-700">Average Daily Rate</span>
                          <span className="font-semibold">$150</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-700">Cancellation Rate</span>
                          <span className="font-semibold">
                            {(
                              (bookings.filter((b) => b.status === "cancelled").length / bookings.length) *
                              100
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-700">Conversion Rate</span>
                          <span className="font-semibold">
                            {(
                              (bookings.filter((b) => b.status === "confirmed" || b.status === "completed").length /
                                bookings.length) *
                              100
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-700">Total Apartments</span>
                          <span className="font-semibold">{apartments.length}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : activeView === "apartments" ? (
              <>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Apartments & Calendar</h2>
                      <p className="text-sm sm:text-base text-slate-600 mt-1">
                        View availability across all apartments
                      </p>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <Button variant="outline" size="sm" onClick={previousMonth}>
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <div className="text-base sm:text-lg font-semibold text-slate-900 min-w-[150px] sm:min-w-[200px] text-center">
                        {monthName} {year}
                      </div>
                      <Button variant="outline" size="sm" onClick={nextMonth}>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Apartment Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {apartments.map((apartment) => {
                    const aptBookings = bookings.filter(
                      (b) => b.apartment === apartment.id && (b.status === "confirmed" || b.status === "pending"),
                    )
                    return (
                      <Card
                        key={apartment.id}
                        className="cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => setSelectedApartment(selectedApartment === apartment.id ? null : apartment.id)}
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded-full ${apartment.color}`}></div>
                              <CardTitle className="text-lg">{apartment.name}</CardTitle>
                            </div>
                            {selectedApartment === apartment.id && <Badge>Selected</Badge>}
                          </div>
                          <CardDescription>Capacity: {apartment.capacity} guests</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-600">Active Bookings</span>
                              <span className="font-semibold">{aptBookings.length}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                {/* Calendar View */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg md:text-xl">
                      {selectedApartment
                        ? `${apartments.find((a) => a.id === selectedApartment)?.name} Calendar`
                        : "All Apartments Calendar"}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      {selectedApartment
                        ? "Click to deselect and view all apartments"
                        : "Click on an apartment card above to filter by specific apartment"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedApartment ? (
                      // Single apartment calendar
                      <div>
                        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
                          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                            <div
                              key={day}
                              className="text-center text-xs sm:text-sm font-semibold text-slate-600 py-1 sm:py-2"
                            >
                              {day}
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1 sm:gap-2">
                          {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                            <div key={`empty-${i}`} />
                          ))}
                          {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1
                            const date = new Date(year, month, day)
                            const isBooked = isDateBooked(date, selectedApartment)
                            const booking = getBookingForDate(date, selectedApartment)
                            const splitBookings = getSplitDayBookings(date, selectedApartment)

                            const getStatusColor = (status?: string) => {
                              if (!status) return "bg-slate-50 border-slate-200"
                              switch (status) {
                                case "confirmed":
                                  return "bg-blue-100 border-blue-300"
                                case "pending":
                                  return "bg-amber-100 border-amber-300"
                                case "completed":
                                  return "bg-green-100 border-green-300"
                                case "cancelled":
                                  return "bg-red-100 border-red-300"
                                default:
                                  return "bg-slate-50 border-slate-200"
                              }
                            }

                            const getStatusBgColor = (status?: string) => {
                              if (!status) return "#f8fafc"
                              switch (status) {
                                case "confirmed":
                                  return "#bfdbfe"
                                case "pending":
                                  return "#fef3c7"
                                case "completed":
                                  return "#dcfce7"
                                case "cancelled":
                                  return "#fee2e2"
                                default:
                                  return "#f8fafc"
                              }
                            }

                            return (
                              <div
                                key={day}
                                onClick={() => (booking || splitBookings) && handleDayClick(date, selectedApartment)}
                                className={`
                                  relative p-1.5 sm:p-3 rounded-lg border text-center transition-all overflow-hidden
                                  ${splitBookings ? "border-slate-400" : getStatusColor(booking?.status)}
                                  ${!booking && !splitBookings ? "hover:border-slate-300" : "cursor-pointer hover:shadow-md"}
                                `}
                                style={
                                  splitBookings
                                    ? {
                                        background: `linear-gradient(135deg, ${getStatusBgColor(splitBookings.checkOut.status)} 0%, ${getStatusBgColor(splitBookings.checkOut.status)} 48%, ${getStatusBgColor(splitBookings.checkIn.status)} 52%, ${getStatusBgColor(splitBookings.checkIn.status)} 100%)`,
                                      }
                                    : {}
                                }
                              >
                                <div className="text-xs sm:text-sm font-medium text-slate-900">{day}</div>
                                {splitBookings ? (
                                  <div className="mt-1 hidden sm:block">
                                    <div
                                      className="text-[10px] font-medium truncate"
                                      title={`Out: ${splitBookings.checkOut.customerName} / In: ${splitBookings.checkIn.customerName}`}
                                    >
                                      Split
                                    </div>
                                    <div className="flex gap-0.5 mt-1 justify-center">
                                      <Badge
                                        className={`${getStatusBadge(splitBookings.checkOut.status)} text-[9px] px-1 py-0`}
                                      >
                                        Out
                                      </Badge>
                                      <Badge
                                        className={`${getStatusBadge(splitBookings.checkIn.status)} text-[9px] px-1 py-0`}
                                      >
                                        In
                                      </Badge>
                                    </div>
                                  </div>
                                ) : booking ? (
                                  <div className="mt-1 hidden sm:block">
                                    <div className="text-xs font-medium truncate" title={booking.customerName}>
                                      {booking.customerName}
                                    </div>
                                    <Badge className={`${getStatusBadge(booking.status)} text-xs mt-1`}>
                                      {booking.status}
                                    </Badge>
                                  </div>
                                ) : null}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ) : (
                      // All apartments overview
                      <div className="space-y-4 sm:space-y-6">
                        {apartments.map((apartment) => (
                          <div key={apartment.id}>
                            <div className="flex items-center gap-2 mb-2 sm:mb-3">
                              <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${apartment.color}`}></div>
                              <h4 className="font-semibold text-sm sm:text-base text-slate-900">{apartment.name}</h4>
                            </div>
                            <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
                              {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                                <div key={`empty-${apartment.id}-${i}`} />
                              ))}
                              {Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1
                                const date = new Date(year, month, day)
                                const isBooked = isDateBooked(date, apartment.id)
                                const booking = getBookingForDate(date, apartment.id)
                                const splitBookings = getSplitDayBookings(date, apartment.id)

                                const getStatusColor = (status?: string) => {
                                  if (!status) return "bg-slate-50"
                                  switch (status) {
                                    case "confirmed":
                                      return "bg-blue-200"
                                    case "pending":
                                      return "bg-amber-200"
                                    case "completed":
                                      return "bg-green-200"
                                    case "cancelled":
                                      return "bg-red-200"
                                    default:
                                      return "bg-slate-50"
                                  }
                                }

                                const getStatusSolidColor = (status?: string) => {
                                  if (!status) return "#f8fafc"
                                  switch (status) {
                                    case "confirmed":
                                      return "#bfdbfe"
                                    case "pending":
                                      return "#fde68a"
                                    case "completed":
                                      return "#bbf7d0"
                                    case "cancelled":
                                      return "#fecaca"
                                    default:
                                      return "#f8fafc"
                                  }
                                }

                                return (
                                  <div
                                    key={`${apartment.id}-${day}`}
                                    className={`
                                      relative p-1 sm:p-2 rounded text-center text-[10px] sm:text-xs transition-all overflow-hidden
                                      ${splitBookings ? "" : getStatusColor(booking?.status)}
                                    `}
                                    style={
                                      splitBookings
                                        ? {
                                            background: `linear-gradient(135deg, ${getStatusSolidColor(splitBookings.checkOut.status)} 0%, ${getStatusSolidColor(splitBookings.checkOut.status)} 48%, ${getStatusSolidColor(splitBookings.checkIn.status)} 52%, ${getStatusSolidColor(splitBookings.checkIn.status)} 100%)`,
                                          }
                                        : {}
                                    }
                                    title={
                                      splitBookings
                                        ? `Out: ${splitBookings.checkOut.customerName} (${splitBookings.checkOut.status}) / In: ${splitBookings.checkIn.customerName} (${splitBookings.checkIn.status})`
                                        : booking
                                          ? `${booking.customerName} (${booking.status})`
                                          : ""
                                    }
                                  >
                                    {day}
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Legend */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Status Legend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-slate-50 border border-slate-200"></div>
                        <span className="text-sm text-slate-600">Available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Confirmed</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : activeView === "bookings" ? (
              <>
                {/* Bookings Header */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Bookings</h2>
                      <p className="text-sm sm:text-base text-slate-600 mt-1">
                        Manage customer bookings and appointments
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <select
                        className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
                        value={selectedApartment || "all"}
                        onChange={(e) => setSelectedApartment(e.target.value === "all" ? null : e.target.value)}
                      >
                        <option value="all">All Apartments</option>
                        {apartments.map((apt) => (
                          <option key={apt.id} value={apt.id}>
                            {apt.name}
                          </option>
                        ))}
                      </select>
                      <Badge variant="secondary" className="text-base sm:text-lg px-4 py-2 justify-center">
                        {displayedBookings.length} Total
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Bookings Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Pending</CardDescription>
                      <CardTitle className="text-2xl sm:text-3xl">
                        {displayedBookings.filter((b) => b.status === "pending").length}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs sm:text-sm text-amber-600 font-medium">Awaiting confirmation</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Confirmed</CardDescription>
                      <CardTitle className="text-2xl sm:text-3xl">
                        {displayedBookings.filter((b) => b.status === "confirmed").length}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs sm:text-sm text-blue-600 font-medium">Scheduled appointments</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Completed</CardDescription>
                      <CardTitle className="text-2xl sm:text-3xl">
                        {displayedBookings.filter((b) => b.status === "completed").length}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs sm:text-sm text-green-600 font-medium">Successfully finished</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Cancelled</CardDescription>
                      <CardTitle className="text-2xl sm:text-3xl">
                        {displayedBookings.filter((b) => b.status === "cancelled").length}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs sm:text-sm text-red-600 font-medium">Cancelled bookings</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Bookings List */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">All Bookings</CardTitle>
                    <CardDescription className="text-sm">View and manage customer appointments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {displayedBookings.map((booking) => {
                        const apartment = apartments.find((a) => a.id === booking.apartment)
                        return (
                          <div
                            key={booking.id}
                            className="border border-slate-200 rounded-lg p-3 sm:p-4 hover:border-slate-300 transition-colors"
                          >
                            <div className="flex flex-col gap-4">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                  <h3 className="font-semibold text-base sm:text-lg text-slate-900">
                                    {booking.customerName}
                                  </h3>
                                  <div className="flex items-center gap-1">
                                    <div className={`w-2 h-2 rounded-full ${apartment?.color}`}></div>
                                    <span className="text-xs sm:text-sm text-slate-600">{apartment?.name}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <select
                                    value={booking.status}
                                    onChange={(e) =>
                                      updateBookingStatus(booking.id, e.target.value as Booking["status"])
                                    }
                                    className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${
                                      booking.status === "confirmed"
                                        ? "bg-blue-100 text-blue-800"
                                        : booking.status === "pending"
                                          ? "bg-amber-100 text-amber-800"
                                          : booking.status === "completed"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                  </select>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => togglePaymentStatus(booking.id)}
                                    className={`text-xs font-medium ${
                                      booking.paymentStatus === "full"
                                        ? "bg-green-100 text-green-800 border-green-300 hover:bg-green-200"
                                        : "bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200"
                                    }`}
                                  >
                                    {booking.paymentStatus === "full" ? "Paid in Full" : "Deposit Paid"}
                                  </Button>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm border-t pt-3">
                                <div>
                                  <p className="text-slate-500 mb-1">Email</p>
                                  <p className="font-medium text-slate-900 truncate">{booking.email}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500 mb-1">Phone</p>
                                  <p className="font-medium text-slate-900">{booking.phone}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500 mb-1">Date of Birth</p>
                                  <p className="font-medium text-slate-900">{booking.dateOfBirth}</p>
                                </div>
                                <div className="sm:col-span-2 lg:col-span-3">
                                  <p className="text-slate-500 mb-1">Address</p>
                                  <p className="font-medium text-slate-900">{booking.address}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500 mb-1">Number of Guests</p>
                                  <p className="font-medium text-slate-900">{booking.guests} guests</p>
                                </div>
                                <div>
                                  <p className="text-slate-500 mb-1">Check-in</p>
                                  <p className="font-medium text-slate-900">{booking.checkIn}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500 mb-1">Check-out</p>
                                  <p className="font-medium text-slate-900">{booking.checkOut}</p>
                                </div>
                              </div>

                              {booking.guestQuery && (
                                <div className="border-t pt-3">
                                  <p className="text-slate-500 text-xs sm:text-sm mb-2">Guest Query</p>
                                  <div className="bg-slate-50 rounded-lg p-3 text-xs sm:text-sm text-slate-700">
                                    {booking.guestQuery}
                                  </div>
                                </div>
                              )}

                              <div className="border-t pt-3">
                                <p className="text-slate-500 text-xs sm:text-sm mb-2">Admin Comment</p>
                                <Textarea
                                  placeholder="Add your response or notes about this booking..."
                                  value={booking.adminComment}
                                  onChange={(e) => updateAdminComment(booking.id, e.target.value)}
                                  className="text-xs sm:text-sm min-h-[80px] resize-none"
                                />
                              </div>

                              <div className="flex flex-col sm:flex-row flex-wrap gap-2 pt-2 border-t">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 w-full sm:w-auto bg-transparent"
                                  onClick={() => deleteBooking(booking.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete Booking
                                </Button>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                {/* Dashboard Default View */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Total Revenue</CardDescription>
                      <CardTitle className="text-2xl sm:text-3xl">${totalRevenue}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs sm:text-sm text-green-600 font-medium">+18% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Occupancy Rate</CardDescription>
                      <CardTitle className="text-2xl sm:text-3xl">{occupancyRate}%</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs sm:text-sm text-blue-600 font-medium">+5% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Total Bookings</CardDescription>
                      <CardTitle className="text-2xl sm:text-3xl">{bookings.length}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs sm:text-sm text-slate-600">
                        {bookings.filter((b) => b.status === "confirmed").length} active
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Bookings & Revenue Trend Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Bookings & Revenue Trend</CardTitle>
                      <CardDescription>Monthly performance overview</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {monthlyBookings.map((month) => (
                          <div key={month.month} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium text-slate-900">{month.month}</span>
                              <div className="flex items-center gap-4">
                                <span className="text-slate-600">{month.bookings} bookings</span>
                                <span className="font-semibold text-slate-900">${month.revenue}</span>
                              </div>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full transition-all"
                                style={{ width: `${(month.revenue / 3300) * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Apartment Performance Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Apartment Performance</CardTitle>
                      <CardDescription>Completed bookings by apartment</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {apartmentStats.map((apt) => (
                          <div key={apt.name} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${apt.color}`}></div>
                                <span className="font-medium text-slate-900">{apt.name}</span>
                              </div>
                              <span className="font-semibold text-slate-900">{apt.bookings} bookings</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                              <div
                                className={`${apt.color} h-2 rounded-full transition-all`}
                                style={{
                                  width: `${(apt.bookings / Math.max(...apartmentStats.map((a) => a.bookings))) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest updates and changes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 pb-4 border-b">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Homepage updated</p>
                          <p className="text-sm text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 pb-4 border-b">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">New user registered</p>
                          <p className="text-sm text-muted-foreground">5 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Settings changed</p>
                          <p className="text-sm text-muted-foreground">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </main>
      </div>

      {viewingBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl sm:text-2xl">Booking Details</CardTitle>
                  <CardDescription>Complete guest information and booking management</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setViewingBooking(null)} className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Guest Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Guest Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-600">Full Name</label>
                    <div className="text-base text-slate-900">{viewingBooking.customerName}</div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-600">Date of Birth</label>
                    <div className="text-base text-slate-900">
                      {viewingBooking.dateOfBirth
                        ? new Date(viewingBooking.dateOfBirth).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Not provided"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-600">Email Address</label>
                    <div className="text-base text-slate-900">{viewingBooking.email}</div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-600">Phone Number</label>
                    <div className="text-base text-slate-900">{viewingBooking.phone}</div>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-slate-600">Residential Address</label>
                    <div className="text-base text-slate-900">{viewingBooking.address || "Not provided"}</div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-600">Number of Guests</label>
                    <div className="text-base text-slate-900">{viewingBooking.guests || "Not specified"}</div>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold text-slate-900">Booking Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-600">Apartment</label>
                    <div className="text-base text-slate-900">
                      {apartments.find((a) => a.id === viewingBooking.apartment)?.name || viewingBooking.apartment}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-600">Status</label>
                    <div>
                      <Badge
                        variant={
                          viewingBooking.status === "confirmed"
                            ? "default"
                            : viewingBooking.status === "pending"
                              ? "secondary"
                              : viewingBooking.status === "completed"
                                ? "default"
                                : "destructive"
                        }
                        className={
                          viewingBooking.status === "confirmed"
                            ? "bg-blue-500"
                            : viewingBooking.status === "completed"
                              ? "bg-green-500"
                              : ""
                        }
                      >
                        {viewingBooking.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-600">Check-in Date</label>
                    <div className="text-base text-slate-900">
                      {new Date(viewingBooking.checkIn).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-600">Check-out Date</label>
                    <div className="text-base text-slate-900">
                      {new Date(viewingBooking.checkOut).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-600">Total Price</label>
                    <div className="text-base text-slate-900 font-semibold">
                      ${viewingBooking.price?.toLocaleString() || "N/A"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-600">Payment Status</label>
                    <div>
                      <Button
                        onClick={handleTogglePaymentStatus}
                        variant={viewingBooking.paymentStatus === "full" ? "default" : "outline"}
                        size="sm"
                        className={
                          viewingBooking.paymentStatus === "full"
                            ? "bg-green-600 hover:bg-green-700"
                            : viewingBooking.paymentStatus === "deposit"
                              ? "border-amber-400 text-amber-700 hover:bg-amber-50"
                              : "border-red-400 text-red-700 hover:bg-red-50"
                        }
                      >
                        {viewingBooking.paymentStatus === "full"
                          ? "Paid in Full"
                          : viewingBooking.paymentStatus === "deposit"
                            ? "Deposit Paid"
                            : "Payment Pending"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guest Query */}
              <div className="space-y-3 pt-4 border-t">
                <h3 className="text-lg font-semibold text-slate-900">Guest Query</h3>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-700">{viewingBooking.guestQuery || "No query from guest"}</p>
                </div>
              </div>

              {/* Admin Comment */}
              <div className="space-y-3 pt-4 border-t">
                <h3 className="text-lg font-semibold text-slate-900">Admin Comment</h3>
                <Textarea
                  value={editingComment}
                  onChange={(e) => setEditingComment(e.target.value)}
                  placeholder="Add your comments or notes about this guest's query..."
                  className="min-h-[100px]"
                />
                <Button onClick={handleSaveComment} className="w-full sm:w-auto">
                  Save Comment
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setViewingBooking(null)}>
                  Close
                </Button>
                <Button
                  variant="default"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    setActiveView("bookings")
                    setViewingBooking(null)
                  }}
                >
                  View All Bookings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
