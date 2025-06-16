"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, Clock, Star, MapPin, Bell, Search, Heart, User, Home, Menu, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "../../contexts/auth-context"
import { useRouter } from "next/navigation"

export default function ClientDashboard() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!loading && (!user || user.role !== "CLIENT")) {
      router.push("/login")
    }
  }, [user, loading, router])

  const sidebarItems = [
    { icon: Home, label: "Tableau de bord", href: "/dashboard/client", active: true },
    { icon: Calendar, label: "Réservations", href: "/dashboard/client/bookings" },
    { icon: Heart, label: "Favoris", href: "/dashboard/client/favorites" },
    { icon: User, label: "Mon profil", href: "/dashboard/client/profile" },
  ]

  const recentBookings = [
    {
      id: 1,
      service: "Plomberie",
      provider: "Amadou Sow",
      date: "20 Jan 2025",
      time: "14:00",
      status: "Confirmé",
      statusColor: "bg-green-500",
      price: "25,000 FCFA",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      service: "Ménage",
      provider: "Fatou Diallo",
      date: "22 Jan 2025",
      time: "09:00",
      status: "En attente",
      statusColor: "bg-orange-500",
      price: "15,000 FCFA",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  const topProviders = [
    {
      id: 1,
      name: "Amadou Sow",
      service: "Plomberie",
      rating: 4.8,
      reviews: 156,
      price: "5,000 FCFA/heure",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Fatou Diallo",
      service: "Ménage",
      rating: 4.9,
      reviews: 203,
      price: "3,000 FCFA/heure",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Moussa Kane",
      service: "Électricité",
      rating: 4.7,
      reviews: 89,
      price: "6,000 FCFA/heure",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (!user || user.role !== "CLIENT") {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center h-16 px-6 border-b">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="font-bold text-lg text-green-600">LIGUEYLU</span>
          </Link>
        </div>

        <nav className="mt-6">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                item.active
                  ? "bg-green-50 text-green-600 border-r-2 border-green-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Tableau de bord</h1>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=100&width=100" />
                  <AvatarFallback>
                    {user.nomComplet
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button onClick={logout} variant="outline" size="sm">
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Bonjour, {user.nomComplet.split(" ")[0]} !</h2>
              <p className="text-gray-600">Voici un aperçu de vos services et réservations.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Recent Bookings */}
              <div className="lg:col-span-2 space-y-6">
                {/* Recent Bookings */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="text-lg font-semibold">Mes réservations</CardTitle>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard/client/bookings">Voir tout</Link>
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center gap-4 p-4 border rounded-lg bg-white">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={booking.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {booking.provider
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900">{booking.service}</h4>
                            <Badge className={`${booking.statusColor} text-white border-0`}>{booking.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{booking.provider}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {booking.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {booking.time}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{booking.price}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Top Providers */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="text-lg font-semibold">Prestataires recommandés</CardTitle>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/prestataires">Voir tout</Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {topProviders.map((provider) => (
                        <div key={provider.id} className="border rounded-lg p-4 bg-white">
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={provider.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {provider.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{provider.name}</h4>
                              <p className="text-sm text-gray-600">{provider.service}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{provider.rating}</span>
                            </div>
                            <span className="text-sm text-gray-500">({provider.reviews})</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-green-600">{provider.price}</span>
                            <Button size="sm" className="bg-green-500 hover:bg-green-600">
                              Réserver
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Quick Actions */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Actions rapides</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-green-500 hover:bg-green-600" asChild>
                      <Link href="/services">
                        <Plus className="h-4 w-4 mr-2" />
                        Nouvelle réservation
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/dashboard/client/bookings">
                        <Calendar className="h-4 w-4 mr-2" />
                        Mes réservations
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/dashboard/client/favorites">
                        <Heart className="h-4 w-4 mr-2" />
                        Mes favoris
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Search */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Recherche rapide</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="Rechercher un service..." className="pl-10" />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="Votre localisation..." className="pl-10" />
                    </div>
                    <Button className="w-full bg-green-500 hover:bg-green-600">Rechercher</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
