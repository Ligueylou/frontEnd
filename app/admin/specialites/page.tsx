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
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

// Mock data pour les spécialités
const mockSpecialites = [
  {
    id: 1,
    libelle: "Plomberie",
    description: "Installation et réparation de systèmes de plomberie",
    annee_experience: 5,
    certification: "Certification professionnelle",
    prestataires_count: 12,
  },
  {
    id: 2,
    libelle: "Électricité",
    description: "Installation électrique et dépannage",
    annee_experience: 3,
    certification: "Certification électricien",
    prestataires_count: 8,
  },
  {
    id: 3,
    libelle: "Ménage",
    description: "Services de nettoyage et d'entretien",
    annee_experience: 2,
    certification: "Formation professionnelle",
    prestataires_count: 25,
  },
  {
    id: 4,
    libelle: "Jardinage",
    description: "Entretien des espaces verts et aménagement paysager",
    annee_experience: 4,
    certification: "Certification paysagiste",
    prestataires_count: 15,
  },
  {
    id: 5,
    libelle: "Peinture",
    description: "Peinture intérieure et extérieure",
    annee_experience: 6,
    certification: "Certification peintre",
    prestataires_count: 10,
  },
]

export default function SpecialitesPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [specialites, setSpecialites] = useState(mockSpecialites)

  const handleDeleteSpecialite = (specialiteId: number) => {
    setSpecialites(specialites.filter((s) => s.id !== specialiteId))
    toast.success("Spécialité supprimée avec succès")
  }

  const filteredSpecialites = specialites.filter((specialite) =>
    specialite.libelle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    specialite.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
              className="flex items-center gap-3 px-3 py-2 text-green-600 bg-green-50 rounded-lg"
            >
              <Briefcase className="h-5 w-5" />
              <span className="font-medium">Spécialités</span>
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
                <h1 className="text-2xl font-bold text-gray-900">Gestion des Spécialités</h1>
                <p className="text-gray-600">Gérez les spécialités disponibles sur la plateforme</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher une spécialité..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle Spécialité
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spécialités</CardTitle>
                <Briefcase className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{specialites.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Prestataires Actifs</CardTitle>
                <UserCheck className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {specialites.reduce((acc, s) => acc + s.prestataires_count, 0)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expérience Moyenne</CardTitle>
                <BarChart3 className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(specialites.reduce((acc, s) => acc + s.annee_experience, 0) / specialites.length)} ans
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Certifiées</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{specialites.filter(s => s.certification).length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Specialites Table */}
          <Card>
            <CardHeader>
              <CardTitle>Spécialités ({filteredSpecialites.length})</CardTitle>
              <CardDescription>Liste de toutes les spécialités avec leurs informations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Spécialité</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Expérience</TableHead>
                    <TableHead>Certification</TableHead>
                    <TableHead>Prestataires</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSpecialites.map((specialite) => (
                    <TableRow key={specialite.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Briefcase className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">{specialite.libelle}</p>
                            <p className="text-sm text-gray-500">ID: {specialite.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-600 max-w-xs truncate">
                          {specialite.description}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-blue-600">
                          {specialite.annee_experience} ans
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {specialite.certification ? (
                          <Badge className="bg-green-100 text-green-800">Certifiée</Badge>
                        ) : (
                          <Badge variant="secondary">Non certifiée</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{specialite.prestataires_count}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Voir
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Modifier
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteSpecialite(specialite.id)}
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