"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, Star, User, Home, Menu, Bell, Clock, MapPin, Phone, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "../../../contexts/auth-context"
import { useRouter } from "next/navigation"

export default function PrestataireAppointments() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== "PRESTATAIRE")) {
      router.push("/login")
    }
  }, [user, loading, router])

  const sidebarItems = [
    { icon: Home, label: "Tableau de bord", href: "/dashboard/prestataire" },
    { icon: Calendar, label: "Mes rendez-vous", href: "/dashboard/prestataire/appointments", active: true },
    { icon: Star, label: "Évaluations", href: "/dashboard/prestataire/reviews" },
    { icon: User, label: "Profil", href: "/dashboard/prestataire/profile" },
  ]

  const upcomingAppointments = [
    {
      id: 1,
      service: "Réparation de fuite",
      client: "Marie Ndiaye",
      clientPhone: "+221 77 123 4567",
      date: "15 juin 2025",
      time: "10:00 - 12:00",
      price: "5 000 FCFA",
      status: "Confirmé",
      statusColor: "bg-green-500",
      address: "123 Rue Princesse, Dakar",
      description: "Réparation d'une fuite d'eau dans la cuisine",
    },
    {
      id: 2,
      service: "Installation de robinetterie",
      client: "Ousmane Sow",
      clientPhone: "+221 76 987 6543",
      date: "18 juin 2025",
      time: "14:00 - 16:00",
      price: "7 500 FCFA",
      status: "En attente",
      statusColor: "bg-orange-500",
      address: "45 Avenue de la République, Dakar",
      description: "Installation d'un nouveau robinet dans la salle de bain",
    },
    {
      id: 3,
      service: "Débouchage canalisation",
      client: "Fatou Diallo",
      clientPhone: "+221 78 456 7890",
      date: "20 juin 2025",
      time: "09:00 - 11:00",
      price: "4 000 FCFA",
      status: "Confirmé",
      statusColor: "bg-green-500",
      address: "67 Rue de la Paix, Dakar",
      description: "Débouchage des canalisations de l'évier",
    },
  ]

  const completedAppointments = [
    {
      id: 4,
      service: "Réparation de fuite",
      client: "Marie Ndiaye",
      clientPhone: "+221 77 123 4567",
      date: "12 juin 2025",
      time: "10:00 - 12:00",
      price: "5 000 FCFA",
      status: "Terminé",
      statusColor: "bg-green-500",
      address: "123 Rue Princesse, Dakar",
      description: "Réparation d'une fuite d'eau dans la cuisine",
      rating: 5,
    },
    {
      id: 5,
      service: "Installation de robinetterie",
      client: "Ousmane Sow",
      clientPhone: "+221 76 987 6543",
      date: "10 juin 2025",
      time: "14:00 - 16:00",
      price: "7 500 FCFA",
      status: "Terminé",
      statusColor: "bg-green-500",
      address: "45 Avenue de la République, Dakar",
      description: "Installation d'un nouveau robinet dans la salle de bain",
      rating: 4,
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (!user) {
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
              <h1 className="text-xl font-semibold text-gray-900">Mes rendez-vous</h1>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>
                  {user.nomComplet
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            {/* Filters */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input placeholder="Rechercher un rendez-vous..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtrer
              </Button>
            </div>

            {/* Appointments Tabs */}
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="upcoming">À venir ({upcomingAppointments.length})</TabsTrigger>
                <TabsTrigger value="completed">Terminés ({completedAppointments.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="/placeholder.svg?height=48&width=48" />
                          <AvatarFallback>
                            {appointment.client
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900">{appointment.service}</h3>
                              <p className="text-gray-600 font-medium">{appointment.client}</p>
                            </div>
                            <Badge className={`${appointment.statusColor} text-white border-0 px-3 py-1`}>
                              {appointment.status}
                            </Badge>
                          </div>

                          <p className="text-gray-700 mb-4">{appointment.description}</p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span className="text-sm">{appointment.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span className="text-sm">{appointment.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Phone className="h-4 w-4" />
                              <span className="text-sm">{appointment.clientPhone}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-gray-600 mb-4">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{appointment.address}</span>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="text-xl font-bold text-green-600">{appointment.price}</div>
                            <div className="flex gap-3">
                              <Button variant="outline" size="sm">
                                <Phone className="h-4 w-4 mr-2" />
                                Appeler
                              </Button>
                              <Button size="sm" className="bg-green-500 hover:bg-green-600">
                                Confirmer
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {completedAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="/placeholder.svg?height=48&width=48" />
                          <AvatarFallback>
                            {appointment.client
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900">{appointment.service}</h3>
                              <p className="text-gray-600 font-medium">{appointment.client}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= (appointment.rating || 0)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <Badge className={`${appointment.statusColor} text-white border-0 px-3 py-1`}>
                                {appointment.status}
                              </Badge>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4">{appointment.description}</p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span className="text-sm">{appointment.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span className="text-sm">{appointment.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span className="text-sm">{appointment.address}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="text-xl font-bold text-green-600">{appointment.price}</div>
                            <Button size="sm" variant="outline">
                              Voir détails
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
