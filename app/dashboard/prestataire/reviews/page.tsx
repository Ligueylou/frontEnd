"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, Star, User, Home, Menu, Bell, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useAuth } from "../../../contexts/auth-context"
import { useRouter } from "next/navigation"

export default function PrestataireReviews() {
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
    { icon: Calendar, label: "Mes rendez-vous", href: "/dashboard/prestataire/appointments" },
    { icon: Star, label: "Évaluations", href: "/dashboard/prestataire/reviews", active: true },
    { icon: User, label: "Profil", href: "/dashboard/prestataire/profile" },
  ]

  const reviews = [
    {
      id: 1,
      client: "Marie Ndiaye",
      service: "Réparation de fuite",
      rating: 5,
      comment: "Excellent travail ! Très professionnel et ponctuel. Je recommande vivement.",
      date: "12 juin 2025",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      client: "Ousmane Sow",
      service: "Installation de robinetterie",
      rating: 4,
      comment: "Bon travail, mais un peu de retard. Sinon très satisfait du résultat.",
      date: "10 juin 2025",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      client: "Fatou Diallo",
      service: "Débouchage canalisation",
      rating: 5,
      comment: "Parfait ! Problème résolu rapidement et proprement. Merci beaucoup.",
      date: "8 juin 2025",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      client: "Ibrahima Fall",
      service: "Réparation robinet",
      rating: 5,
      comment: "Service impeccable, très professionnel. Je ferai appel à lui à nouveau.",
      date: "5 juin 2025",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      client: "Awa Sarr",
      service: "Installation évier",
      rating: 4,
      comment: "Travail de qualité, mais pourrait être plus rapide. Globalement satisfaite.",
      date: "3 juin 2025",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
    percentage: (reviews.filter((review) => review.rating === rating).length / reviews.length) * 100,
  }))

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
              <h1 className="text-xl font-semibold text-gray-900">Évaluations</h1>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Rating Summary */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Résumé des évaluations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900 mb-2">{averageRating.toFixed(1)}</div>
                      <div className="flex justify-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">{reviews.length} évaluations</p>
                    </div>

                    <div className="space-y-3">
                      {ratingDistribution.map((item) => (
                        <div key={item.rating} className="flex items-center gap-3">
                          <div className="flex items-center gap-1 w-12">
                            <span className="text-sm">{item.rating}</span>
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          </div>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                          </div>
                          <span className="text-sm text-gray-600 w-8">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Reviews List */}
              <div className="lg:col-span-2 space-y-6">
                {/* Filters */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input placeholder="Rechercher dans les évaluations..." className="pl-10" />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrer
                  </Button>
                </div>

                {/* Reviews */}
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={review.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {review.client
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-medium text-gray-900">{review.client}</h4>
                                <p className="text-sm text-gray-600">{review.service}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`h-4 w-4 ${
                                        star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                            </div>

                            <p className="text-gray-700">{review.comment}</p>
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
                      Suivant
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
