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
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

// Mock data pour les transactions
const mockTransactions = [
  {
    id: "TXN-001",
    client: "Marie Ndiaye",
    prestataire: "Amadou Diallo",
    service: "Réparation de fuite d'eau",
    montant: 15000,
    commission: 1500,
    statut: "completed",
    methode_paiement: "Orange Money",
    date_transaction: "2025-01-20 14:30",
    date_service: "2025-01-21",
  },
  {
    id: "TXN-002",
    client: "Fatou Sow",
    prestataire: "Marieme Diop",
    service: "Nettoyage de maison",
    montant: 12000,
    commission: 1200,
    statut: "pending",
    methode_paiement: "Wave",
    date_transaction: "2025-01-20 16:45",
    date_service: "2025-01-22",
  },
  {
    id: "TXN-003",
    client: "Ousmane Ndiaye",
    prestataire: "Ibrahima Gueye",
    service: "Installation électrique",
    montant: 75000,
    commission: 7500,
    statut: "completed",
    methode_paiement: "Free Money",
    date_transaction: "2025-01-19 09:15",
    date_service: "2025-01-20",
  },
  {
    id: "TXN-004",
    client: "Aissatou Ba",
    prestataire: "Fatou Sow",
    service: "Peinture intérieure",
    montant: 45000,
    commission: 4500,
    statut: "cancelled",
    methode_paiement: "Orange Money",
    date_transaction: "2025-01-18 11:20",
    date_service: "2025-01-19",
  },
  {
    id: "TXN-005",
    client: "Ibrahima Gueye",
    prestataire: "Aissatou Ba",
    service: "Entretien de jardin",
    montant: 18000,
    commission: 1800,
    statut: "completed",
    methode_paiement: "Wave",
    date_transaction: "2025-01-17 13:10",
    date_service: "2025-01-18",
  },
  {
    id: "TXN-006",
    client: "Marieme Diop",
    prestataire: "Ousmane Ndiaye",
    service: "Réparation de meubles",
    montant: 25000,
    commission: 2500,
    statut: "pending",
    methode_paiement: "Free Money",
    date_transaction: "2025-01-16 15:30",
    date_service: "2025-01-17",
  },
]

export default function TransactionsPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatut, setFilterStatut] = useState("all")
  const [filterMethode, setFilterMethode] = useState("all")
  const [transactions, setTransactions] = useState(mockTransactions)

  const handleApproveTransaction = (transactionId: string) => {
    setTransactions(
      transactions.map((t) =>
        t.id === transactionId ? { ...t, statut: "completed" } : t
      )
    )
    toast.success("Transaction approuvée avec succès")
  }

  const handleCancelTransaction = (transactionId: string) => {
    setTransactions(
      transactions.map((t) =>
        t.id === transactionId ? { ...t, statut: "cancelled" } : t
      )
    )
    toast.success("Transaction annulée")
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.prestataire.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatut = filterStatut === "all" || transaction.statut === filterStatut
    const matchesMethode = filterMethode === "all" || transaction.methode_paiement === filterMethode

    return matchesSearch && matchesStatut && matchesMethode
  })

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Complétée
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            En attente
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Annulée
          </Badge>
        )
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

  const totalTransactions = transactions.length
  const completedTransactions = transactions.filter(t => t.statut === "completed").length
  const pendingTransactions = transactions.filter(t => t.statut === "pending").length
  const totalRevenus = transactions.reduce((acc, t) => acc + t.commission, 0)
  const totalMontant = transactions.reduce((acc, t) => acc + t.montant, 0)

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
              className="flex items-center gap-3 px-3 py-2 text-green-600 bg-green-50 rounded-lg"
            >
              <DollarSign className="h-5 w-5" />
              <span className="font-medium">Transactions</span>
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
                <h1 className="text-2xl font-bold text-gray-900">Gestion des Transactions</h1>
                <p className="text-gray-600">Suivez et gérez toutes les transactions de la plateforme</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher une transaction..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle Transaction
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTransactions}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transactions Complétées</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedTransactions}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">En Attente</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingTransactions}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenus Totaux</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
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
                    <SelectItem value="completed">Complétée</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="cancelled">Annulée</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterMethode} onValueChange={setFilterMethode}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Méthode de paiement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les méthodes</SelectItem>
                    <SelectItem value="Orange Money">Orange Money</SelectItem>
                    <SelectItem value="Wave">Wave</SelectItem>
                    <SelectItem value="Free Money">Free Money</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Transactions ({filteredTransactions.length})</CardTitle>
              <CardDescription>Liste de toutes les transactions avec leurs détails</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Transaction</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Prestataire</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Méthode</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="font-mono text-sm font-medium">{transaction.id}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {transaction.client
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{transaction.client}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {transaction.prestataire
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{transaction.prestataire}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-600 max-w-xs truncate">
                          {transaction.service}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-green-600">
                          {formatCurrency(transaction.montant)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-blue-600">
                          {formatCurrency(transaction.commission)}
                        </div>
                      </TableCell>
                      <TableCell>{getStatutBadge(transaction.statut)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-purple-600">
                          {transaction.methode_paiement}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-500">
                          {new Date(transaction.date_transaction).toLocaleDateString("fr-FR")}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(transaction.date_transaction).toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Voir
                          </Button>
                          {transaction.statut === "pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleApproveTransaction(transaction.id)}
                                className="bg-green-500 hover:bg-green-600"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approuver
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleCancelTransaction(transaction.id)}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Annuler
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
      </div>
    </div>
  )
}
