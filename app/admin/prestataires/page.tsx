"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
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
  Trash2,
  ArrowLeft,
  Briefcase,
  Filter,
  Ban,
  Star,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { apiService, type Prestataire } from "../../lib/api"

export default function PrestatairesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatut, setFilterStatut] = useState("all")
  const [filterSpecialite, setFilterSpecialite] = useState("all")
  const [prestataires, setPrestataires] = useState<Prestataire[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<number | null>(null)

  // Charger les prestataires au montage du composant
  useEffect(() => {
    loadPrestataires()
  }, [])

  const loadPrestataires = async () => {
    try {
      setLoading(true)
      console.log("Chargement des prestataires...")
      const response = await apiService.getAllPrestataires()
      console.log("Réponse reçue:", response)

      if (response.success) {
        setPrestataires(response.data || [])
        toast.success("Prestataires chargés avec succès")
      } else {
        toast.error(response.message || "Erreur lors du chargement des prestataires")
      }
    } catch (error) {
      console.error("Erreur détaillée:", error)
      toast.error(error instanceof Error ? error.message : "Erreur lors du chargement des prestataires")
    } finally {
      setLoading(false)
    }
  }

  const handleActivatePrestataire = async (prestataireId: number) => {
    try {
      setActionLoading(prestataireId)
      const response = await apiService.activatePrestataire(prestataireId)
      if (response.success) {
        // Recharger la liste des prestataires
        await loadPrestataires()
        toast.success("Prestataire activé avec succès")
      } else {
        toast.error("Erreur lors de l'activation du prestataire")
      }
    } catch (error) {
      console.error("Erreur:", error)
      toast.error("Erreur lors de l'activation du prestataire")
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeletePrestataire = async (prestataireId: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce prestataire ?")) {
      return
    }

    try {
      setActionLoading(prestataireId)
      const response = await apiService.deletePrestataire(prestataireId)
      if (response.success) {
        // Recharger la liste des prestataires
        await loadPrestataires()
        toast.success("Prestataire supprimé avec succès")
      } else {
        toast.error("Erreur lors de la suppression du prestataire")
      }
    } catch (error) {
      console.error("Erreur:", error)
      toast.error("Erreur lors de la suppression du prestataire")
    } finally {
      setActionLoading(null)
    }
  }

  const filteredPrestataires = prestataires.filter((prestataire) => {
    const matchesSearch =
      prestataire.nomComplet?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prestataire.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (prestataire.specialites &&
        prestataire.specialites.some((s) => s.nom.toLowerCase().includes(searchTerm.toLowerCase())))

    const matchesStatut =
      filterStatut === "all" ||
      (filterStatut === "active" && prestataire.actif) ||
      (filterStatut === "inactive" && !prestataire.actif)

    const matchesSpecialite =
      filterSpecialite === "all" ||
      (prestataire.specialites && prestataire.specialites.some((s) => s.nom === filterSpecialite))

    return matchesSearch && matchesStatut && matchesSpecialite
  })

  const getStatutBadge = (actif: boolean) => {
    return actif ? (
      <Badge className="bg-green-100 text-green-800">Actif</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Inactif</Badge>
    )
  }

  const totalPrestataires = prestataires.length
  const activePrestataires = prestataires.filter((p) => p.actif).length
  const inactivePrestataires = prestataires.filter((p) => !p.actif).length
  const averageScore =
    prestataires.length > 0
      ? (prestataires.reduce((acc, p) => acc + (p.score || 0), 0) / prestataires.length).toFixed(1)
      : "0"

  // Obtenir toutes les spécialités uniques pour le filtre
  const allSpecialites = Array.from(
    new Set(prestataires.filter((p) => p.specialites).flatMap((p) => p.specialites!.map((s) => s.nom))),
  )

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Chargement des prestataires...</span>
          </div>
        </div>
      </div>
    )
  }

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
              className="flex items-center gap-3 px-3 py-2 text-green-600 bg-green-50 rounded-lg"
            >
              <UserCheck className="h-5 w-5" />
              <span className="font-medium">Prestataires</span>
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
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <CreditCard className="h-5 w-5" />
              <span>Services</span>
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
            <Link
              href="/admin/login"
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full"
            >
              <LogOut className="h-5 w-5" />
              <span>Déconnexion</span>
            </Link>
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
                <h1 className="text-2xl font-bold text-gray-900">Gestion des Prestataires</h1>
                <p className="text-gray-600">Gérez tous les prestataires de la plateforme</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un prestataire..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button onClick={loadPrestataires}>
                <Plus className="h-4 w-4 mr-2" />
                Actualiser
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Prestataires</CardTitle>
                <UserCheck className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPrestataires}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Prestataires Actifs</CardTitle>
                <CheckCircle className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activePrestataires}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inactifs</CardTitle>
                <Ban className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inactivePrestataires}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Score Moyen</CardTitle>
                <Star className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageScore}</div>
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
                    <SelectItem value="inactive">Inactif</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterSpecialite} onValueChange={setFilterSpecialite}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Spécialité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les spécialités</SelectItem>
                    {allSpecialites.map((specialite) => (
                      <SelectItem key={specialite} value={specialite}>
                        {specialite}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Prestataires Table */}
          <Card>
            <CardHeader>
              <CardTitle>Prestataires ({filteredPrestataires.length})</CardTitle>
              <CardDescription>Liste de tous les prestataires avec leurs informations</CardDescription>
            </CardHeader>
            <CardContent>
              {prestataires.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Aucun prestataire trouvé</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Prestataire</TableHead>
                      <TableHead>Spécialités</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPrestataires.map((prestataire) => (
                      <TableRow key={prestataire.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>
                                {prestataire.nomComplet
                                  ? prestataire.nomComplet
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")
                                  : "?"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{prestataire.nomComplet || "N/A"}</p>
                              <p className="text-sm text-gray-500">{prestataire.email || "N/A"}</p>
                              <p className="text-sm text-gray-500">{prestataire.telephone || "N/A"}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {prestataire.specialites && prestataire.specialites.length > 0 ? (
                              prestataire.specialites.map((specialite) => (
                                <Badge key={specialite.id} variant="outline" className="text-blue-600">
                                  {specialite.nom}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-gray-400 text-sm">Aucune spécialité</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getStatutBadge(prestataire.actif)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{(prestataire.score || 0).toFixed(1)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </Button>
                            {!prestataire.actif && (
                              <Button
                                size="sm"
                                onClick={() => handleActivatePrestataire(prestataire.id)}
                                disabled={actionLoading === prestataire.id}
                                className="bg-green-500 hover:bg-green-600"
                              >
                                {actionLoading === prestataire.id ? (
                                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                ) : (
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                )}
                                Activer
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeletePrestataire(prestataire.id)}
                              disabled={actionLoading === prestataire.id}
                            >
                              {actionLoading === prestataire.id ? (
                                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4 mr-1" />
                              )}
                              Supprimer
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
