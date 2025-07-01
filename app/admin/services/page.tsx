"use client"

import { useAuth } from "../../contexts/auth-context"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  UserCheck,
  DollarSign,
  Search,
  Eye,
  CheckCircle,
  Settings,
  LogOut,
  BarChart3,
  FileText,
  CreditCard,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Briefcase,
  Filter,
  Star,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

// Mock data pour les services
const mockServices = [
  {
    id: 1,
    titre: "Réparation de fuite d'eau",
    description: "Diagnostic et réparation rapide des fuites d'eau",
    specialite: "Plomberie",
    prestataire: "Amadou Diallo",
    prix: 15000,
    duree: "2-3 heures",
    statut: "active",
    note: 4.8,
    reservations_count: 25,
    date_creation: "2025-01-15",
  },
  {
    id: 2,
    titre: "Installation électrique complète",
    description: "Installation électrique pour maison neuve",
    specialite: "Électricité",
    prestataire: "Ibrahima Gueye",
    prix: 75000,
    duree: "1-2 jours",
    statut: "active",
    note: 4.9,
    reservations_count: 12,
    date_creation: "2025-01-10",
  },
  {
    id: 3,
    titre: "Nettoyage de maison",
    description: "Service de nettoyage complet pour maison",
    specialite: "Ménage",
    prestataire: "Marieme Diop",
    prix: 12000,
    duree: "4-5 heures",
    statut: "active",
    note: 4.7,
    reservations_count: 45,
    date_creation: "2025-01-08",
  },
  {
    id: 4,
    titre: "Peinture intérieure",
    description: "Peinture complète de l'intérieur de votre maison",
    specialite: "Peinture",
    prestataire: "Fatou Sow",
    prix: 45000,
    duree: "2-3 jours",
    statut: "pending",
    note: 0,
    reservations_count: 0,
    date_creation: "2025-01-20",
  },
  {
    id: 5,
    titre: "Entretien de jardin",
    description: "Tonte, taille et entretien des espaces verts",
    specialite: "Jardinage",
    prestataire: "Aissatou Ba",
    prix: 18000,
    duree: "3-4 heures",
    statut: "active",
    note: 4.6,
    reservations_count: 18,
    date_creation: "2025-01-12",
  },
  {
    id: 6,
    titre: "Réparation de meubles",
    description: "Réparation et restauration de meubles en bois",
    specialite: "Menuiserie",
    prestataire: "Ousmane Ndiaye",
    prix: 25000,
    duree: "1 jour",
    statut: "suspended",
    note: 3.2,
    reservations_count: 8,
    date_creation: "2024-12-20",
  },
]

export default function ServicesPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatut, setFilterStatut] = useState("all")
  const [filterSpecialite, setFilterSpecialite] = useState("all")
  const [services, setServices] = useState(mockServices)

  const handleValidateService = (serviceId: number) => {
    setServices(
      services.map((s) =>
        s.id === serviceId ? { ...s, statut: "active" } : s
      )
    )
    toast.success("Service validé avec succès")
  }

  const handleSuspendService = (serviceId: number) => {
    setServices(
      services.map((s) =>
        s.id === serviceId ? { ...s, statut: s.statut === "suspended" ? "active" : "suspended" } : s
      )
    )
    toast.success("Statut du service mis à jour")
  }

  const handleDeleteService = (serviceId: number) => {
    setServices(services.filter((s) => s.id !== serviceId))
    toast.success("Service supprimé avec succès")
  }

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.prestataire.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatut = filterStatut === "all" || service.statut === filterStatut
    const matchesSpecialite = filterSpecialite === "all" || service.specialite === filterSpecialite

    return matchesSearch && matchesStatut && matchesSpecialite
  })

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspendu</Badge>
      default:
        return <Badge variant="secondary">{statut}</Badge>
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const totalServices = services.length
  const activeServices = services.filter(s => s.statut === "active").length
  const pendingServices = services.filter(s => s.statut === "pending").length
  const totalRevenus = services.reduce((acc, s) => acc + (s.prix * s.reservations_count), 0)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="font-bold text-lg">LIGUEYLU</span>
          </div>

          {/* Admin Profile */}
          <div className="flex items-center gap-3 mb-8 p-3 bg-gray-50 rounded-lg">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-green-500 text-white">
                {user?.nomComplet
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Admin</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <BarChart3 className="h-5 w-5" />
              <span>Tableau de Bord</span>
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Users className="h-5 w-5" />
              <span>Utilisateurs</span>
            </Link>
            <Link
              href="/admin/prestataires"
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <UserCheck className="h-5 w-5" />
              <span>Prestataires</span>
            </Link>
            <Link
              href="/admin/specialites"
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Briefcase className="h-5 w-5" />
              <span>Spécialités</span>
            </Link>
            <Link
              href="/admin/services"
              className="flex items-center gap-3 px-3 py-2 text-green-600 bg-green-50 rounded-lg"
            >
              <CreditCard className="h-5 w-5" />
              <span className="font-medium">Services</span>
            </Link>
            <Link
              href="/admin/transactions"
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <DollarSign className="h-5 w-5" />
              <span>Transactions</span>
            </Link>
            <Link
              href="/admin/reports"
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <FileText className="h-5 w-5" />
              <span>Rapports</span>
            </Link>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 w-64 p-6 border-t bg-white">
          <div className="space-y-2">
            <Link
              href="/admin/profile"
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full"
            >
              <Settings className="h-5 w-5" />
              <span>Profil</span>
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full"
            >
              <LogOut className="h-5 w-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestion des Services</h1>
                <p className="text-gray-600">Gérez tous les services proposés sur la plateforme</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau Service
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Services</CardTitle>
                <CreditCard className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalServices}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Services Actifs</CardTitle>
                <CheckCircle className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeServices}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">En Attente</CardTitle>
                <BarChart3 className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingServices}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenus Totaux</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalRevenus)}</div>
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
                <Select value={filterStatut} onValueChange={setFilterStatut}>
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
                <Select value={filterSpecialite} onValueChange={setFilterSpecialite}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Spécialité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les spécialités</SelectItem>
                    <SelectItem value="Plomberie">Plomberie</SelectItem>
                    <SelectItem value="Électricité">Électricité</SelectItem>
                    <SelectItem value="Ménage">Ménage</SelectItem>
                    <SelectItem value="Peinture">Peinture</SelectItem>
                    <SelectItem value="Menuiserie">Menuiserie</SelectItem>
                    <SelectItem value="Jardinage">Jardinage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Services Table */}
          <Card>
            <CardHeader>
              <CardTitle>Services ({filteredServices.length})</CardTitle>
              <CardDescription>Liste de tous les services avec leurs informations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Prestataire</TableHead>
                    <TableHead>Spécialité</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead>Réservations</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{service.titre}</p>
                            <p className="text-sm text-gray-500 max-w-xs truncate">
                              {service.description}
                            </p>
                            <p className="text-xs text-gray-400">Durée: {service.duree}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {service.prestataire
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{service.prestataire}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-blue-600">
                          {service.specialite}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-green-600">
                          {formatCurrency(service.prix)}
                        </div>
                      </TableCell>
                      <TableCell>{getStatutBadge(service.statut)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{service.note.toFixed(1)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{service.reservations_count}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Voir
                          </Button>
                          {service.statut === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => handleValidateService(service.id)}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Valider
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant={service.statut === "suspended" ? "default" : "destructive"}
                            onClick={() => handleSuspendService(service.id)}
                          >
                            {service.statut === "suspended" ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Activer
                              </>
                            ) : (
                              <>
                                <BarChart3 className="h-4 w-4 mr-1" />
                                Suspendre
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteService(service.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Supprimer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 