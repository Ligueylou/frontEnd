"use client"

import { useAuth } from "../contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
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
  Briefcase,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

// Mock data - À remplacer par des appels API réels
const mockStats = {
  totalUsers: 1245,
  totalProviders: 328,
  totalRevenue: 12500000,
  pendingProviders: 3,
}

const mockPendingProviders = [
  {
    id: 1,
    name: "Moussa Seck",
    email: "moussa.seck@example.com",
    service: "Électricité",
    registrationDate: "15 juin 2025",
    documents: 3,
    status: "pending",
  },
  {
    id: 2,
    name: "Aminata Diop",
    email: "aminata.diop@example.com",
    service: "Coiffure",
    registrationDate: "12 juin 2025",
    documents: 2,
    status: "pending",
  },
  {
    id: 3,
    name: "Abdoulaye Faye",
    email: "abdoulaye.faye@example.com",
    service: "Menuiserie",
    registrationDate: "11 juin 2025",
    documents: 4,
    status: "pending",
  },
]

const mockRecentUsers = [
  {
    id: 1,
    name: "Marie Ndiaye",
    email: "marie@example.com",
    type: "Client",
    status: "active",
    joinDate: "Aujourd'hui",
  },
  {
    id: 2,
    name: "Amadou Diallo",
    email: "amadou@example.com",
    type: "Prestataire",
    status: "pending",
    joinDate: "Hier",
  },
  {
    id: 3,
    name: "Fatou Sow",
    email: "fatou@example.com",
    type: "Client",
    status: "active",
    joinDate: "Il y a 2 jours",
  },
  {
    id: 4,
    name: "Ousmane Ndiaye",
    email: "ousmane@example.com",
    type: "Client",
    status: "active",
    joinDate: "Il y a 3 jours",
  },
]

const mockRecentTransactions = [
  {
    id: 1,
    type: "Plomberie",
    provider: "Amadou Diallo",
    client: "Marie Ndiaye",
    amount: 5000,
    commission: 500,
    date: "Aujourd'hui",
  },
  {
    id: 2,
    type: "Ménage",
    provider: "Marieme Diop",
    client: "Cheikh Fall",
    amount: 3500,
    commission: 350,
    date: "Hier",
  },
  {
    id: 3,
    type: "Électricité",
    provider: "Ibrahima Gueye",
    client: "Aida Mbaye",
    amount: 8000,
    commission: 800,
    date: "Il y a 2 jours",
  },
  {
    id: 4,
    type: "Jardinage",
    provider: "Marieme Diop",
    client: "Cheikh Fall",
    amount: 6500,
    commission: 650,
    date: "Il y a 3 jours",
  },
]

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const handleValidateProvider = (providerId: number) => {
    toast.success("Prestataire validé avec succès")
    // Ici, appeler l'API pour valider le prestataire
  }

  const handleViewDetails = (providerId: number) => {
    router.push(`/admin/prestataires/${providerId}`)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(amount)
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
              className="flex items-center gap-3 px-3 py-2 text-green-600 bg-green-50 rounded-lg"
            >
              <BarChart3 className="h-5 w-5" />
              <span className="font-medium">Tableau de Bord</span>
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tableau de bord administrateur</h1>
              <p className="text-gray-600">Vue d'ensemble de la plateforme LIGUEYLU</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <span className="sr-only">Notifications</span>🔔
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Utilisateurs totaux</CardTitle>
                <Users className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.totalUsers}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Prestataires</CardTitle>
                <UserCheck className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.totalProviders}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenu Total</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(mockStats.totalRevenue)}</div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Providers */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Prestataires en attente de validation</CardTitle>
                <CardDescription>Nouveaux prestataires à valider</CardDescription>
              </div>
              <Link href="/admin/prestataires?status=pending">
                <Button variant="outline" size="sm">
                  Voir tout
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prestataire</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date d'inscription</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPendingProviders.map((provider) => (
                    <TableRow key={provider.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
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
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{provider.service}</TableCell>
                      <TableCell>{provider.registrationDate}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{provider.documents} documents</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleViewDetails(provider.id)}>
                            <Eye className="h-4 w-4 mr-1" />
                            Voir détails
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleValidateProvider(provider.id)}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Valider
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Recent Users and Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Users */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Utilisateurs récents</CardTitle>
                  <CardDescription>Derniers utilisateurs inscrits sur la plateforme</CardDescription>
                </div>
                <Link href="/admin/users">
                  <Button variant="outline" size="sm">
                    Voir tout
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={user.status === "active" ? "default" : "secondary"}>
                          {user.type}
                        </Badge>
                        <p className="text-sm text-gray-500">{user.joinDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Transactions récentes</CardTitle>
                  <CardDescription>Dernières transactions effectuées</CardDescription>
                </div>
                <Link href="/admin/transactions">
                  <Button variant="outline" size="sm">
                    Voir tout
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{transaction.type}</p>
                        <p className="text-sm text-gray-500">
                          {transaction.provider} → {transaction.client}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">{formatCurrency(transaction.amount)}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 