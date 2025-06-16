"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, Bell, Heart, User, Home, Menu, Camera, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "../../../contexts/auth-context"
import { apiService } from "../../../lib/api"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function ClientProfile() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profileLoading, setProfileLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)

  // Form states
  const [profileForm, setProfileForm] = useState({
    nomComplet: "",
    email: "",
    telephone: "",
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: true,
    promotionalOffers: false,
    publicProfile: true,
  })

  useEffect(() => {
    if (!loading && (!user || user.role !== "CLIENT")) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      setProfileForm({
        nomComplet: user.nomComplet,
        email: user.email,
        telephone: "", // Will be loaded from backend
      })
      loadProfile()
    }
  }, [user])

  const loadProfile = async () => {
    try {
      const response = await apiService.getProfile()
      if (response.success && response.data) {
        // Update form with complete profile data
        setProfileForm({
          nomComplet: response.data.nomComplet || "",
          email: response.data.email || "",
          telephone: response.data.telephone || "",
        })
      }
    } catch (error) {
      console.error("Error loading profile:", error)
    }
  }

  const handleSaveProfile = async () => {
    if (!profileForm.nomComplet.trim() || !profileForm.email.trim()) {
      toast.error("Veuillez remplir tous les champs obligatoires")
      return
    }

    setProfileLoading(true)
    try {
      const response = await apiService.updateProfile({
        nomComplet: profileForm.nomComplet,
        email: profileForm.email,
        telephone: profileForm.telephone,
      })

      if (response.success) {
        toast.success("Profil mis à jour avec succès")
        setIsEditing(false)
        // Update user in context if needed
        const updatedUser = JSON.parse(localStorage.getItem("user") || "{}")
        updatedUser.nomComplet = profileForm.nomComplet
        updatedUser.email = profileForm.email
        localStorage.setItem("user", JSON.stringify(updatedUser))
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur lors de la mise à jour")
    } finally {
      setProfileLoading(false)
    }
  }

  const handleChangePassword = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error("Veuillez remplir tous les champs de mot de passe")
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Les nouveaux mots de passe ne correspondent pas")
      return
    }

    // Validation du mot de passe selon le pattern du backend
    const passwordPattern = /^[a-zA-Z0-9]{8,20}$/
    if (!passwordPattern.test(passwordForm.newPassword)) {
      toast.error("Le mot de passe doit être alphanumérique, entre 8 et 20 caractères")
      return
    }

    setPasswordLoading(true)
    try {
      const response = await apiService.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      })

      if (response.success) {
        toast.success("Mot de passe modifié avec succès")
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur lors du changement de mot de passe")
    } finally {
      setPasswordLoading(false)
    }
  }

  const sidebarItems = [
    { icon: Home, label: "Tableau de bord", href: "/dashboard/client" },
    { icon: Calendar, label: "Réservations", href: "/dashboard/client/bookings" },
    { icon: Heart, label: "Favoris", href: "/dashboard/client/favorites" },
    { icon: User, label: "Mon profil", href: "/dashboard/client/profile", active: true },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (!user || user.role !== "CLIENT") {
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
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=100&width=100" />
                  <AvatarFallback>
                    {user.nomComplet
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button onClick={logout} variant="outline" size="sm">
                  Déconnexion
                </Button>
              </div>
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
                      <AvatarImage src="/placeholder.svg?height=100&width=100" />
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
                    <p className="text-gray-600">Client depuis janvier 2024</p>
                  </div>
                  <Button
                    onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                    className={isEditing ? "bg-green-500 hover:bg-green-600" : ""}
                    variant={isEditing ? "default" : "outline"}
                    disabled={profileLoading}
                  >
                    {profileLoading ? (
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
                      value={profileForm.nomComplet}
                      onChange={(e) => setProfileForm((prev) => ({ ...prev, nomComplet: e.target.value }))}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm((prev) => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>

                  <div>
                    <Label htmlFor="telephone">Téléphone</Label>
                    <Input
                      id="telephone"
                      value={profileForm.telephone}
                      onChange={(e) => setProfileForm((prev) => ({ ...prev, telephone: e.target.value }))}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                      placeholder="77123456"
                    />
                    <p className="text-xs text-gray-500 mt-1">Entre 7 et 9 chiffres</p>
                  </div>
                </CardContent>
              </Card>

              {/* Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Préférences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Notifications par email</Label>
                      <p className="text-xs text-gray-600">
                        Recevoir des notifications pour les nouvelles réservations
                      </p>
                    </div>
                    <Switch
                      checked={preferences.emailNotifications}
                      onCheckedChange={(checked) =>
                        setPreferences((prev) => ({ ...prev, emailNotifications: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Notifications SMS</Label>
                      <p className="text-xs text-gray-600">Recevoir des rappels par SMS</p>
                    </div>
                    <Switch
                      checked={preferences.smsNotifications}
                      onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, smsNotifications: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Offres promotionnelles</Label>
                      <p className="text-xs text-gray-600">Recevoir des offres spéciales et promotions</p>
                    </div>
                    <Switch
                      checked={preferences.promotionalOffers}
                      onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, promotionalOffers: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Profil public</Label>
                      <p className="text-xs text-gray-600">Permettre aux prestataires de voir votre profil</p>
                    </div>
                    <Switch
                      checked={preferences.publicProfile}
                      onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, publicProfile: checked }))}
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
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                      placeholder="••••••••"
                    />
                    <p className="text-xs text-gray-500 mt-1">Alphanumérique, 8-20 caractères</p>
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    Supprimer mon compte
                  </Button>
                  <Button
                    onClick={handleChangePassword}
                    disabled={passwordLoading}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    {passwordLoading ? "Modification..." : "Changer le mot de passe"}
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
