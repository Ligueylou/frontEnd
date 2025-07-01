"use client"

import { useAuth } from "../../contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Eye, Ban, CheckCircle, ArrowLeft, Download, UserPlus, Users, UserCheck, DollarSign, Settings, LogOut, BarChart3, FileText, CreditCard, Briefcase, Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { apiService, type Client, type Prestataire, type UserStats } from "../../lib/api"
import UserDetailModal from "./UserDetailModal"

export default function UsersPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [users, setUsers] = useState<Array<Client | Prestataire>>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [stats, setStats] = useState<UserStats | null>(null)
  const [userDetailId, setUserDetailId] = useState<number | null>(null)

  // Charger les utilisateurs au montage du composant
  useEffect(() => {
    loadUsers()
    loadStats()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      console.log("Chargement des utilisateurs...")
      const response = await apiService.getAllUsers()
      console.log("Réponse reçue:", response)

      if (response.success) {
        setUsers(response.data || [])
        toast.success("Utilisateurs chargés avec succès")
      } else {
        toast.error(response.message || "Erreur lors du chargement des utilisateurs")
      }
    } catch (error) {
      console.error("Erreur détaillée:", error)
      toast.error(error instanceof Error ? error.message : "Erreur lors du chargement des utilisateurs")
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const response = await apiService.getUserStats()
      if (response.success) {
        setStats(response.data)
      }
    } catch (error) {
      console.error("Erreur lors du chargement des statistiques:", error)
    }
  }

  const handleActivateUser = async (userId: number, userType: string) => {
    try {
      setActionLoading(userId)
      let response
      
      if (userType === "CLIENT") {
        response = await apiService.activateClient(userId)
      } else {
        response = await apiService.activatePrestataire(userId)
      }

      if (response.success) {
        // Recharger la liste des utilisateurs
        await loadUsers()
        await loadStats()
        toast.success("Utilisateur activé avec succès")
      } else {
        toast.error("Erreur lors de l'activation de l'utilisateur")
      }
    } catch (error) {
      console.error("Erreur:", error)
      toast.error("Erreur lors de l'activation de l'utilisateur")
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeleteUser = async (userId: number, userType: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      return
    }

    try {
      setActionLoading(userId)
      let response
      
      if (userType === "CLIENT") {
        response = await apiService.deleteClient(userId)
      } else {
        response = await apiService.deletePrestataire(userId)
      }

      if (response.success) {
        // Recharger la liste des utilisateurs
        await loadUsers()
        await loadStats()
        toast.success("Utilisateur supprimé avec succès")
      } else {
        toast.error("Erreur lors de la suppression de l'utilisateur")
      }
    } catch (error) {
      console.error("Erreur:", error)
      toast.error("Erreur lors de la suppression de l'utilisateur")
    } finally {
      setActionLoading(null)
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.nomComplet?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || user.role === filterType
    const matchesStatus = 
      filterStatus === "all" || 
      (filterStatus === "active" && user.actif) ||
      (filterStatus === "inactive" && !user.actif)

    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusBadge = (actif: boolean) => {
    return actif ? (
      <Badge className="bg-green-100 text-green-800">Actif</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Inactif</Badge>
    )
  }

  const getTypeBadge = (role: string) => {
    switch (role) {
      case "CLIENT":
        return (
          <Badge variant="outline" className="text-blue-600">
            Client
          </Badge>
        )
      case "PRESTATAIRE":
        return (
          <Badge variant="outline" className="text-purple-600">
            Prestataire
          </Badge>
        )
      case "ADMIN":
        return (
          <Badge variant="outline" className="text-red-600">
            Administrateur
          </Badge>
        )
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Chargement des utilisateurs...</span>
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
              className="flex items-center gap-3 px-3 py-2 text-green-600 bg-green-50 rounded-lg"
            >
              <Users className="h-5 w-5" />
              <span className="font-medium">Utilisateurs</span>
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
                <h1 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
                <p className="text-gray-600">Gérez tous les utilisateurs de la plateforme</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un utilisateur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button onClick={loadUsers}>
                <UserPlus className="h-4 w-4 mr-2" />
                Actualiser
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Utilisateurs</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalClients + stats.totalPrestataires}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clients</CardTitle>
                  <UserCheck className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalClients}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Prestataires</CardTitle>
                  <Briefcase className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalPrestataires}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Utilisateurs Actifs</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeClients + stats.activePrestataires}</div>
                </CardContent>
              </Card>
            </div>
          )}

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
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Type d'utilisateur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="CLIENT">Clients</SelectItem>
                    <SelectItem value="PRESTATAIRE">Prestataires</SelectItem>
                    <SelectItem value="ADMIN">Administrateurs</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Utilisateurs ({filteredUsers.length})</CardTitle>
              <CardDescription>Liste de tous les utilisateurs avec leurs informations et statuts</CardDescription>
            </CardHeader>
            <CardContent>
              {users.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Aucun utilisateur trouvé</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Utilisateur</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>
                                {user.nomComplet
                                  ? user.nomComplet
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")
                                  : "?"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.nomComplet || "N/A"}</p>
                              <p className="text-sm text-gray-500">{user.email || "N/A"}</p>
                              <p className="text-sm text-gray-500">{user.telephone || "N/A"}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getTypeBadge(user.role)}</TableCell>
                        <TableCell>{getStatusBadge(user.actif)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => setUserDetailId(user.id)}>
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </Button>
                            {!user.actif && (
                              <Button
                                size="sm"
                                onClick={() => handleActivateUser(user.id, user.role)}
                                disabled={actionLoading === user.id}
                                className="bg-green-500 hover:bg-green-600"
                              >
                                {actionLoading === user.id ? (
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
                              onClick={() => handleDeleteUser(user.id, user.role)}
                              disabled={actionLoading === user.id}
                            >
                              {actionLoading === user.id ? (
                                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                              ) : (
                                <Ban className="h-4 w-4 mr-1" />
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
      <UserDetailModal userId={userDetailId} onClose={() => setUserDetailId(null)} />
    </div>
  )
}
