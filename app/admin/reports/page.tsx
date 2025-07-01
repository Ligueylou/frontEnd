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
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  PieChart,
  Activity,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

// Mock data pour les rapports
const mockReports = [
  {
    id: 1,
    titre: "Rapport Mensuel - Janvier 2025",
    type: "mensuel",
    periode: "Janvier 2025",
    statut: "completed",
    generateur: "Admin",
    date_generation: "2025-01-31 23:59",
    taille: "2.5 MB",
    downloads: 15,
  },
  {
    id: 2,
    titre: "Analyse des Prestataires - Q4 2024",
    type: "trimestriel",
    periode: "Q4 2024",
    statut: "completed",
    generateur: "Admin",
    date_generation: "2025-01-15 14:30",
    taille: "1.8 MB",
    downloads: 8,
  },
  {
    id: 3,
    titre: "Rapport des Transactions - Décembre 2024",
    type: "mensuel",
    periode: "Décembre 2024",
    statut: "completed",
    generateur: "Admin",
    date_generation: "2024-12-31 23:59",
    taille: "3.2 MB",
    downloads: 22,
  },
  {
    id: 4,
    titre: "Analyse des Services - 2024",
    type: "annuel",
    periode: "2024",
    statut: "pending",
    generateur: "Système",
    date_generation: "2025-01-01 00:00",
    taille: "0 MB",
    downloads: 0,
  },
  {
    id: 5,
    titre: "Rapport des Utilisateurs - Novembre 2024",
    type: "mensuel",
    periode: "Novembre 2024",
    statut: "completed",
    generateur: "Admin",
    date_generation: "2024-11-30 23:59",
    taille: "2.1 MB",
    downloads: 12,
  },
  {
    id: 6,
    titre: "Analyse des Revenus - Q3 2024",
    type: "trimestriel",
    periode: "Q3 2024",
    statut: "completed",
    generateur: "Admin",
    date_generation: "2024-10-15 16:45",
    taille: "1.5 MB",
    downloads: 18,
  },
]

// Mock data pour les statistiques
const mockStats = {
  totalReports: 156,
  completedReports: 142,
  pendingReports: 14,
  totalDownloads: 2847,
  averageSize: "2.3 MB",
  monthlyGrowth: 12.5,
  popularType: "mensuel",
  lastGenerated: "2025-01-31 23:59",
}

export default function ReportsPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatut, setFilterStatut] = useState("all")
  const [reports, setReports] = useState(mockReports)

  const handleGenerateReport = () => {
    toast.success("Génération de rapport en cours...")
  }

  const handleDownloadReport = (reportId: number) => {
    toast.success("Téléchargement du rapport...")
  }

  const handleDeleteReport = (reportId: number) => {
    setReports(reports.filter((r) => r.id !== reportId))
    toast.success("Rapport supprimé avec succès")
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.periode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || report.type === filterType
    const matchesStatut = filterStatut === "all" || report.statut === filterStatut

    return matchesSearch && matchesType && matchesStatut
  })

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Complété
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
            <Activity className="h-3 w-3" />
            En cours
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Échec
          </Badge>
        )
      default:
        return <Badge variant="secondary">{statut}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "mensuel":
        return (
          <Badge variant="outline" className="text-blue-600">
            Mensuel
          </Badge>
        )
      case "trimestriel":
        return (
          <Badge variant="outline" className="text-purple-600">
            Trimestriel
          </Badge>
        )
      case "annuel":
        return (
          <Badge variant="outline" className="text-green-600">
            Annuel
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
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
              className="flex items-center gap-3 px-3 py-2 text-green-600 bg-green-50 rounded-lg"
            >
              <FileText className="h-5 w-5" />
              <span className="font-medium">Rapports</span>
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
                <h1 className="text-2xl font-bold text-gray-900">Gestion des Rapports</h1>
                <p className="text-gray-600">Générez et gérez tous les rapports de la plateforme</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un rapport..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button onClick={handleGenerateReport}>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau Rapport
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Rapports</CardTitle>
                <FileText className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.totalReports}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rapports Complétés</CardTitle>
                <CheckCircle className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.completedReports}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Téléchargements</CardTitle>
                <Download className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.totalDownloads}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Croissance Mensuelle</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{mockStats.monthlyGrowth}%</div>
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
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Type de rapport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="mensuel">Mensuel</SelectItem>
                    <SelectItem value="trimestriel">Trimestriel</SelectItem>
                    <SelectItem value="annuel">Annuel</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatut} onValueChange={setFilterStatut}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="completed">Complété</SelectItem>
                    <SelectItem value="pending">En cours</SelectItem>
                    <SelectItem value="failed">Échec</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Reports Table */}
          <Card>
            <CardHeader>
              <CardTitle>Rapports ({filteredReports.length})</CardTitle>
              <CardDescription>Liste de tous les rapports générés</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rapport</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Période</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Générateur</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Taille</TableHead>
                    <TableHead>Téléchargements</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{report.titre}</p>
                            <p className="text-sm text-gray-500">ID: {report.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(report.type)}</TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">{report.periode}</div>
                      </TableCell>
                      <TableCell>{getStatutBadge(report.statut)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {report.generateur === "Admin" ? "A" : "S"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{report.generateur}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-500">
                          {new Date(report.date_generation).toLocaleDateString("fr-FR")}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(report.date_generation).toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">{report.taille}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{report.downloads}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Voir
                          </Button>
                          {report.statut === "completed" && (
                            <Button
                              size="sm"
                              onClick={() => handleDownloadReport(report.id)}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Télécharger
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteReport(report.id)}
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
