"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, Star, User, Home, Menu, Bell, Camera, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "../../../contexts/auth-context"
import { useRouter } from "next/navigation"
import { apiService } from "../../../lib/api"
import { toast } from "sonner"

export default function PrestataireProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    nomComplet: "",
    email: "",
    telephone: "",
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "PRESTATAIRE")) {
      router.push("/login")
    }
    if (user) {
      setProfileData({
        nomComplet: user.nomComplet,
        email: user.email,
        telephone: "", // À récupérer du backend
      })
    }
  }, [user, authLoading, router])

  const sidebarItems = [
    { icon: Home, label: "Tableau de bord", href: "/dashboard/prestataire" },
    { icon: Calendar, label: "Mes rendez-vous", href: "/dashboard/prestataire/appointments" },
    { icon: Star, label: "Évaluations", href: "/dashboard/prestataire/reviews" },
    { icon: User, label: "Profil", href: "/dashboard/prestataire/profile", active: true },
  ]

  const handleSaveProfile = async () => {
    if (!profileData.nomComplet || !profileData.email) {
      toast.error("Veuillez remplir tous les champs obligatoires")
      return
    }

    setLoading(true)
    try {
      await apiService.updateProfile({
        nomComplet: profileData.nomComplet,
        email: profileData.email,
        telephone: profileData.telephone,
      })

      toast.success("Profil mis à jour avec succès")
      setIsEditing(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur lors de la mise à jour")
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      toast.error("Veuillez remplir tous les champs")
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas")
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères")
      return
    }

    setLoading(true)
    try {
      await apiService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })

      toast.success("Mot de passe modifié avec succès")
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur lors du changement de mot de passe")
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
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
              <h1 className="text-xl font-semibold text-gray-900">Mon profil</h1>
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
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" />
                      <AvatarFallback className="text-2xl">
                        {user.nomComplet
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0 bg-green-500 hover:bg-green-600"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">{user.nomComplet}</h2>
                    <p className="text-gray-600">Prestataire de services</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-orange-100 text-orange-800">En attente de validation</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">4.8</span>
                        <span className="text-sm text-gray-500">(124 avis)</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                    className={isEditing ? "bg-green-500 hover:bg-green-600" : ""}
                    variant={isEditing ? "default" : "outline"}
                    disabled={loading}
                  >
                    {loading ? (
                      "Sauvegarde..."
                    ) : isEditing ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Sauvegarder
                      </>
                    ) : (
                      "Modifier le profil"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="nomComplet">Nom complet</Label>
                    <Input
                      id="nomComplet"
                      value={profileData.nomComplet}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, nomComplet: e.target.value }))}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>

                  <div>
                    <Label htmlFor="telephone">Téléphone</Label>
                    <Input
                      id="telephone"
                      value={profileData.telephone}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, telephone: e.target.value }))}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                      placeholder="+221 XX XXX XXXX"
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialite">Spécialité</Label>
                    <Input
                      id="specialite"
                      defaultValue="Plomberie"
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      defaultValue="Plombier professionnel avec plus de 10 ans d'expérience. Spécialisé dans les réparations et installations."
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Service Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres de service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Disponible pour nouveaux clients</Label>
                      <p className="text-xs text-gray-600">Accepter de nouvelles demandes de service</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Notifications par email</Label>
                      <p className="text-xs text-gray-600">Recevoir des notifications pour les nouvelles demandes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Notifications SMS</Label>
                      <p className="text-xs text-gray-600">Recevoir des rappels par SMS</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Profil public</Label>
                      <p className="text-xs text-gray-600">Permettre aux clients de voir votre profil</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="pt-4 border-t">
                    <Label htmlFor="tarif">Tarif horaire (FCFA)</Label>
                    <Input
                      id="tarif"
                      defaultValue="5000"
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Security Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Sécurité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <Button
                    onClick={handleChangePassword}
                    disabled={loading || !passwordData.currentPassword || !passwordData.newPassword}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    {loading ? "Modification..." : "Changer le mot de passe"}
                  </Button>
                  <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    Supprimer mon compte
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
