"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, Star, User, Home, Menu, Bell, CheckCircle, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "../../contexts/auth-context"
import { useRouter } from "next/navigation"

export default function PrestataireDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== "PRESTATAIRE")) {
      router.push("/login")
    }
  }, [user, loading, router])

  const sidebarItems = [
    { icon: Home, label: "Tableau de bord", href: "/dashboard/prestataire", active: true },
    { icon: Calendar, label: "Mes rendez-vous", href: "/dashboard/prestataire/appointments" },
    { icon: Star, label: "Évaluations", href: "/dashboard/prestataire/reviews" },
    { icon: User, label: "Profil", href: "/dashboard/prestataire/profile" },
  ]

  const upcomingAppointments = [
    {
      id: 1,
      service: "Réparation de fuite",
      client: "Marie Ndiaye",
      date: "15 juin 2025",
      time: "10:00 - 12:00",
      price: "5 000 FCFA",
      status: "Confirmé",
      statusColor: "bg-green-500",
      address: "123 Rue Princesse, Dakar",
    },
    {
      id: 2,
      service: "Installation de robinetterie",
      client: "Ousmane Sow",
      date: "18 juin 2025",
      time: "14:00 - 16:00",
      price: "7 500 FCFA",
      status: "En attente",
      statusColor: "bg-orange-500",
      address: "45 Avenue de la République, Dakar",
    },
  ]

  const completedAppointments = [
    {
      id: 3,
      service: "Réparation de fuite",
      client: "Marie Ndiaye",
      date: "12 juin 2025",
      time: "10:00 - 12:00",
      price: "5 000 FCFA",
      status: "Terminé",
      statusColor: "bg-green-500",
      address: "123 Rue Princesse, Dakar",
    },
    {
      id: 4,
      service: "Installation de robinetterie",
      client: "Ousmane Sow",
      date: "10 juin 2025",
      time: "14:00 - 16:00",
      price: "7 500 FCFA",
      status: "Terminé",
      statusColor: "bg-green-500",
      address: "45 Avenue de la République, Dakar",
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
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Bonjour, {user.nomComplet.split(" ")[0]}</h1>
                <p className="text-sm text-gray-600">Bienvenue sur votre tableau de bord</p>
              </div>
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
              <Button onClick={logout} variant="outline" size="sm">
                Déconnexion
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Revenus aujourd'hui</p>
                      <p className="text-2xl font-bold text-gray-900">12 500</p>
                      <p className="text-sm text-gray-500">FCFA</p>
                    </div>
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 font-bold">💰</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Revenus totaux</p>
                      <p className="text-2xl font-bold text-gray-900">320 000</p>
                      <p className="text-sm text-gray-500">FCFA</p>
                    </div>
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold">📊</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Services terminés</p>
                      <p className="text-2xl font-bold text-gray-900">124</p>
                    </div>
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Évaluation moyenne</p>
                      <div className="flex items-center gap-1">
                        <p className="text-2xl font-bold text-gray-900">4.8</p>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Star className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Appointments Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold">Rendez-vous</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/prestataire/appointments">Voir tout</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upcoming" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upcoming">À venir</TabsTrigger>
                    <TabsTrigger value="completed">Terminés</TabsTrigger>
                  </TabsList>

                  <TabsContent value="upcoming" className="space-y-4 mt-6">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center gap-4 p-4 border rounded-lg bg-white">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{appointment.service}</h4>
                            <Badge className={`${appointment.statusColor} text-white border-0`}>
                              {appointment.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Client: {appointment.client}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {appointment.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {appointment.time}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <MapPin className="h-4 w-4" />
                            {appointment.address}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600 mb-2">{appointment.price}</p>
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-green-500 hover:bg-green-600">
                              Confirmer
                            </Button>
                            <Button size="sm" variant="outline">
                              Contacter
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="completed" className="space-y-4 mt-6">
                    {completedAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center gap-4 p-4 border rounded-lg bg-white">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{appointment.service}</h4>
                            <Badge className={`${appointment.statusColor} text-white border-0`}>
                              {appointment.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Client: {appointment.client}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {appointment.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {appointment.time}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <MapPin className="h-4 w-4" />
                            {appointment.address}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600 mb-2">{appointment.price}</p>
                          <Button size="sm" variant="outline">
                            Voir détails
                          </Button>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
