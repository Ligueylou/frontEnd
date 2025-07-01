"use client"

import type React from "react"
import Link from "next/link"
import { Shield, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "../../contexts/auth-context"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function AdminRegisterPage() {
  const { registerAdmin } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    nomComplet: "",
    email: "",
    password: "",
    confirmPassword: "",
    telephone: "",
    acceptTerms: false,
  })

  const validateForm = () => {
    if (!formData.nomComplet.trim()) {
      toast.error("Veuillez entrer votre nom complet")
      return false
    }

    if (!formData.email.includes("@")) {
      toast.error("Veuillez entrer un email valide")
      return false
    }

    if (!formData.telephone.trim()) {
      toast.error("Veuillez entrer votre numéro de téléphone")
      return false
    }

    // Validation du téléphone selon le pattern du backend (7-9 chiffres)
    const phonePattern = /^\d{7,9}$/
    if (!phonePattern.test(formData.telephone.replace(/\s/g, ""))) {
      toast.error("Le numéro de téléphone doit contenir entre 7 et 9 chiffres")
      return false
    }

    // Validation du mot de passe selon le pattern du backend (alphanumérique, 8-20 caractères)
    const passwordPattern = /^[a-zA-Z0-9]{8,20}$/
    if (!passwordPattern.test(formData.password)) {
      toast.error("Le mot de passe doit être alphanumérique, entre 8 et 20 caractères")
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas")
      return false
    }

    if (!formData.acceptTerms) {
      toast.error("Vous devez accepter les conditions d'utilisation")
      return false
    }

    return true
  }

  const handleAdminRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      await registerAdmin({
        nomComplet: formData.nomComplet,
        email: formData.email,
        password: formData.password,
        telephone: formData.telephone.replace(/\s/g, ""), // Enlever les espaces
      })

      toast.success("Inscription administrateur réussie !")
      router.push("/admin")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur lors de l'inscription administrateur")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full border-b bg-white">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-red-500" />
            <span className="text-xl font-bold">LIGUEYLU - ADMIN</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 bg-gradient-to-r from-red-50 to-pink-50">
        <div className="container px-4 md:px-6 flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Créer un compte administrateur</CardTitle>
              <CardDescription>
                Inscrivez-vous en tant qu'administrateur pour gérer la plateforme LIGUEYLU
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdminRegister}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nom-complet">Nom complet</Label>
                    <Input
                      id="nom-complet"
                      placeholder="Prénom Nom"
                      required
                      value={formData.nomComplet}
                      onChange={(e) => setFormData((prev) => ({ ...prev, nomComplet: e.target.value }))}
                      className="border-red-200 focus:border-red-500"
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email administrateur</Label>
                    <Input
                      id="email"
                      placeholder="admin@ligueylu.com"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="border-red-200 focus:border-red-500"
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telephone">Téléphone</Label>
                    <Input
                      id="telephone"
                      placeholder="77123456"
                      type="tel"
                      required
                      value={formData.telephone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, telephone: e.target.value }))}
                      className="border-red-200 focus:border-red-500"
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                        className="border-red-200 focus:border-red-500 pr-10"
                        disabled={loading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                        className="border-red-200 focus:border-red-500 pr-10"
                        disabled={loading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="accept-terms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, acceptTerms: !!checked }))}
                    />
                    <Label
                      htmlFor="accept-terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      J&apos;accepte les conditions d&apos;utilisation et la politique de confidentialité
                    </Label>
                  </div>
                  <Button type="submit" className="w-full bg-red-500 hover:bg-red-600" disabled={loading}>
                    {loading ? "Inscription..." : "Créer le compte administrateur"}
                  </Button>
                </div>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">Déjà un compte?</span>
                </div>
              </div>

              <div className="text-center">
                <Link href="/admin/login" className="text-sm text-red-600 hover:text-red-700">
                  Se connecter en tant qu&apos;administrateur
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
