"use client"

import { useAuth } from "../../contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Eye, CheckCircle, X, ArrowLeft, Download, Star, MapPin } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

// Mock data
const mockProviders = [
  {
    id: 1,
    name: "Amadou Diallo",
    email: "amadou@example.com",
    phone: "77 123 45 67",
    service: "Plomberie",
    status: "pending",
    rating: 0,
    completedJobs: 0,
    joinDate: "2025-06-15",
    location: "Dakar, Plateau",
    documents: 3,
  },
  {
    id: 2,
    name: "Aissatou Ba",
    email: "aissatou@example.com",
    phone: "76 987 65 43",
    service: "Ménage",
    status: "active",
    rating: 4.8,
    completedJobs: 45,
    joinDate: "2025-05-20",
    location: "Dakar, Almadies",
    documents: 4,
  },
  {
    id: 3,
    name: "Ibrahima Gueye",
    email: "ibrahima@example.com",
    phone: "78 456 78 90",
    service: "Électricité",
    status: "active",
    rating: 4.6,
    completedJobs: 32,
    joinDate: "2025-05-15",
    location: "Dakar, Sacré-Cœur",
    documents: 5,
  },
  {
    id: 4,
    name: "Marieme Diop",
    email: "marieme@example.com",
    phone: "77 234 56 78",
    service: "Coiffure",
    status: "suspended",
    rating: 3.2,
    completedJobs: 12,
    joinDate: "2025-04-10",
    location: "Dakar, Médina",
    documents: 2,
  },
  {
    id: 5,
    name: "Moussa Seck",
    email: "moussa@example.com",
    phone: "76 345 67 89",
    service: "Jardinage",
    status: "pending",
    rating: 0,
    completedJobs: 0,
    joinDate: "2025-06-12",
    location: "Dakar, Yoff",
    documents: 3,
  },
]

export default function ProvidersPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterService, setFilterService] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [providers, setProviders] = useState(mockProviders)

  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      router.push("/login")
      return
    }
  }, [user, router])

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesService = filterService === "all" || provider.service === filterService
    const matchesStatus = filterStatus === "all" || provider.status === filterStatus

    return matchesSearch && matchesService && matchesStatus
  })

  const handleValidateProvider = (providerId: number) => {
    setProviders(providers.map((p) => (p.id === providerId ? { ...p, status: "active" } : p)))
    toast.success("Prestataire validé avec succès")
  }

  const handleRejectProvider = (providerId: number) => {
    setProviders(providers.map((p) => (p.id === providerId ? { ...p, status: "rejected" } : p)))
    toast.success("Prestataire rejeté")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspendu</Badge>
      case "rejected":
        return <Badge className="bg-gray-100 text-gray-800">Rejeté</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (!user || user.role !== "ADMIN") {
    return <div>Chargement...</div>
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/admin">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Gestion des Prestataires</h1>
            <p className="text-gray-600">Validez et gérez tous les prestataires de services</p>
          </div>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {providers.filter((p) => p.status === "active").length}
            </div>
            <p className="text-sm text-gray-600">Prestataires actifs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {providers.filter((p) => p.status === "pending").length}
            </div>
            <p className="text-sm text-gray-600">En attente de validation</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {providers.filter((p) => p.status === "suspended").length}
            </div>
            <p className="text-sm text-gray-600">Suspendus</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {providers.reduce((sum, p) => sum + p.completedJobs, 0)}
            </div>
            <p className="text-sm text-gray-600">Services terminés</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtres et Recherche
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher par nom, email ou service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterService} onValueChange={setFilterService}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les services</SelectItem>
                <SelectItem value="Plomberie">Plomberie</SelectItem>
                <SelectItem value="Électricité">Électricité</SelectItem>
                <SelectItem value="Ménage">Ménage</SelectItem>
                <SelectItem value="Coiffure">Coiffure</SelectItem>
                <SelectItem value="Jardinage">Jardinage</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="suspended">Suspendu</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Providers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Prestataires ({filteredProviders.length})</CardTitle>
          <CardDescription>Liste de tous les prestataires avec leurs informations et statuts</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prestataire</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Évaluation</TableHead>
                <TableHead>Services terminés</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProviders.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {provider.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{provider.name}</p>
                        <p className="text-sm text-gray-500">{provider.email}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {provider.location}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{provider.service}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(provider.status)}</TableCell>
                  <TableCell>
                    {provider.rating > 0 ? (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{provider.rating}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">Aucune</span>
                    )}
                  </TableCell>
                  <TableCell>{provider.completedJobs}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{provider.documents} docs</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Voir
                      </Button>
                      {provider.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleValidateProvider(provider.id)}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Valider
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleRejectProvider(provider.id)}>
                            <X className="h-4 w-4 mr-1" />
                            Rejeter
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
