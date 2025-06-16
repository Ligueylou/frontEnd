"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, MapPin, Phone, Bell, Search, Filter, Heart, User, Home, Menu, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "../../../contexts/auth-context"
import { useRouter } from "next/navigation"

export default function ClientBookings() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!loading && (!user || user.role !== "CLIENT")) {
      router.push("/login")
    }
  }, [user, loading, router])

  const bookings = [
    {
      id: 1,
      service: "Plomberie",
      provider: "Amadou Sow",
      date: "20 Jan 2025",
      time: "14:00 - 16:00",
      status: "Confirmé",
      statusColor: "bg-green-500",
      price: "25,000 FCFA",
      address: "Dakar, Plateau",
      phone: "+221 77 123 4567",
      avatar: "/placeholder.svg?height=100&width=100",
      description: "Réparation fuite d'eau cuisine",
    },
    {
      id: 2,
      service: "Ménage",
      provider: "Fatou Diallo",
      date: "22 Jan 2025",
      time: "09:00 - 12:00",
      status: "En attente",
      statusColor: "bg-orange-500",
      price: "15,000 FCFA",
      address: "Dakar, Almadies",
      phone: "+221 76 987 6543",
      avatar: "/placeholder.svg?height=100&width=100",
      description: "Nettoyage complet appartement 3 pièces",
    },
    {
      id: 3,
      service: "Jardinage",
      provider: "Moussa Diop",
      date: "25 Jan 2025",
      time: "08:00 - 11:00",
      status: "Confirmé",
      statusColor: "bg-green-500",
      price: "20,000 FCFA",
      address: "Dakar, Mermoz",
      phone: "+221 78 456 7890",
      avatar: "/placeholder.svg?height=100&width=100",
      description: "Taille des arbres et entretien pelouse",
    },
  ]

  const sidebarItems = [
    { icon: Home, label: "Tableau de bord", href: "/dashboard/client" },
    { icon: Calendar, label: "Réservations", href: "/dashboard/client/bookings", active: true },
    { icon: Heart, label: "Favoris", href: "/dashboard/client/favorites" },
    { icon: User, label: "Mon profil", href: "/dashboard/client/profile" },
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
              <h1 className="text-xl font-semibold text-gray-900">Mes réservations</h1>
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

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Filters */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input placeholder="Rechercher une réservation..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtrer
              </Button>
              <Button className="bg-green-500 hover:bg-green-600" asChild>
                <Link href="/services">Nouvelle réservation</Link>
              </Button>
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={booking.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {booking.provider
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{booking.service}</h3>
                            <p className="text-gray-600 font-medium">{booking.provider}</p>
                          </div>
                          <Badge className={`${booking.statusColor} text-white border-0 px-3 py-1`}>
                            {booking.status}
                          </Badge>
                        </div>

                        <p className="text-gray-700 mb-4">{booking.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">{booking.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">{booking.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{booking.address}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="text-xl font-bold text-green-600">{booking.price}</div>
                          <div className="flex gap-3">
                            <Button variant="outline" size="sm">
                              <Phone className="h-4 w-4 mr-2" />
                              Appeler
                            </Button>
                            <Button size="sm" className="bg-green-500 hover:bg-green-600">
                              Voir détails
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Précédent
                </Button>
                <Button size="sm" className="bg-green-500 hover:bg-green-600">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Suivant
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
