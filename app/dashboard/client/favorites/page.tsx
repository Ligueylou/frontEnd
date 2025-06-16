"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, Star, MapPin, Phone, Bell, Search, Heart, User, Home, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "../../../contexts/auth-context"
import { useRouter } from "next/navigation"

export default function ClientFavorites() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!loading && (!user || user.role !== "CLIENT")) {
      router.push("/login")
    }
  }, [user, loading, router])

  const favoriteProviders = [
    {
      id: 1,
      name: "Amadou Sow",
      service: "Plomberie",
      rating: 4.8,
      reviews: 156,
      price: "5,000 FCFA/heure",
      location: "Dakar, Plateau",
      phone: "+221 77 123 4567",
      avatar: "/placeholder.svg?height=100&width=100",
      completedJobs: 156,
      description: "Spécialiste en plomberie résidentielle et commerciale",
    },
    {
      id: 2,
      name: "Fatou Diallo",
      service: "Ménage",
      rating: 4.9,
      reviews: 203,
      price: "3,000 FCFA/heure",
      location: "Dakar, Almadies",
      phone: "+221 76 987 6543",
      avatar: "/placeholder.svg?height=100&width=100",
      completedJobs: 203,
      description: "Service de ménage professionnel et repassage",
    },
    {
      id: 3,
      name: "Moussa Kane",
      service: "Électricité",
      rating: 4.7,
      reviews: 89,
      price: "6,000 FCFA/heure",
      location: "Dakar, Mermoz",
      phone: "+221 78 456 7890",
      avatar: "/placeholder.svg?height=100&width=100",
      completedJobs: 89,
      description: "Électricien certifié, installation et dépannage",
    },
    {
      id: 4,
      name: "Aissatou Ba",
      service: "Jardinage",
      rating: 4.6,
      reviews: 124,
      price: "4,000 FCFA/heure",
      location: "Dakar, Sacré-Cœur",
      phone: "+221 77 654 3210",
      avatar: "/placeholder.svg?height=100&width=100",
      completedJobs: 124,
      description: "Entretien de jardins et espaces verts",
    },
  ]

  const sidebarItems = [
    { icon: Home, label: "Tableau de bord", href: "/dashboard/client" },
    { icon: Calendar, label: "Réservations", href: "/dashboard/client/bookings" },
    { icon: Heart, label: "Favoris", href: "/dashboard/client/favorites", active: true },
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
              <h1 className="text-xl font-semibold text-gray-900">Mes favoris</h1>
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
          <div className="max-w-6xl mx-auto">
            {/* Search */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input placeholder="Rechercher dans mes favoris..." className="pl-10" />
              </div>
              <Button className="bg-green-500 hover:bg-green-600" asChild>
                <Link href="/prestataires">Découvrir plus</Link>
              </Button>
            </div>

            {/* Favorites Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteProviders.map((provider) => (
                <Card key={provider.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={provider.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {provider.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{provider.name}</h3>
                          <p className="text-sm text-gray-600">{provider.service}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{provider.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{provider.rating}</span>
                        <span className="text-sm text-gray-500">({provider.reviews} avis)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{provider.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{provider.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <p className="text-sm font-medium text-green-600">{provider.price}</p>
                        <p className="text-xs text-gray-500">{provider.completedJobs} services</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-green-500 hover:bg-green-600">
                          Réserver
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {favoriteProviders.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun favori</h3>
                  <p className="text-gray-600 mb-4">Vous n'avez pas encore ajouté de prestataires à vos favoris.</p>
                  <Button className="bg-green-500 hover:bg-green-600" asChild>
                    <Link href="/prestataires">Découvrir des prestataires</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
