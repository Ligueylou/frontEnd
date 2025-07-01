"use client"

import type React from "react"

import Link from "next/link"
import { Shield, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "../contexts/auth-context"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function RegisterPage() {
  const { register, user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("client")

  const [clientForm, setClientForm] = useState({
    nomComplet: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })

  const [providerForm, setProviderForm] = useState({
    nomComplet: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })

  useEffect(() => {
    if (isAuthenticated && user && user.role === "ADMIN") {
      router.replace("/admin")
    }
  }, [isAuthenticated, user, router])

  const validateForm = (form: typeof clientForm | typeof providerForm) => {
    if (!form.nomComplet.trim()) {
      toast.error("Veuillez entrer votre nom complet")
      return false
    }

    if (!form.email.includes("@")) {
      toast.error("Veuillez entrer un email valide")
      return false
    }

    if (!form.phone.trim()) {
      toast.error("Veuillez entrer votre numéro de téléphone")
      return false
    }

    // Validation du téléphone selon le pattern du backend (7-9 chiffres)
    const phonePattern = /^\d{7,9}$/
    if (!phonePattern.test(form.phone.replace(/\s/g, ""))) {
      toast.error("Le numéro de téléphone doit contenir entre 7 et 9 chiffres")
      return false
    }

    // Validation du mot de passe selon le pattern du backend (alphanumérique, 8-20 caractères)
    const passwordPattern = /^[a-zA-Z0-9]{8,20}$/
    if (!passwordPattern.test(form.password)) {
      toast.error("Le mot de passe doit être alphanumérique, entre 8 et 20 caractères")
      return false
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas")
      return false
    }

    if (!form.acceptTerms) {
      toast.error("Vous devez accepter les conditions d'utilisation")
      return false
    }

    return true
  }

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm(clientForm)) return

    setLoading(true)

    try {
      await register({
        nomComplet: clientForm.nomComplet,
        email: clientForm.email,
        password: clientForm.password,
        telephone: clientForm.phone.replace(/\s/g, ""), // Enlever les espaces
        role: "CLIENT",
      })

      toast.success("Inscription réussie !")
      router.push("/dashboard/client")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur lors de l'inscription")
    } finally {
      setLoading(false)
    }
  }

  const handleProviderSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm(providerForm)) return

    setLoading(true)

    try {
      await register({
        nomComplet: providerForm.nomComplet,
        email: providerForm.email,
        password: providerForm.password,
        telephone: providerForm.phone.replace(/\s/g, ""), // Enlever les espaces
        role: "PRESTATAIRE",
      })

      toast.success("Inscription réussie ! Votre compte sera activé après validation.")
      router.push("/dashboard/prestataire")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur lors de l'inscription")
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
            <Shield className="h-8 w-8 text-green-500" />
            <span className="text-xl font-bold">LIGUEYLU</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="container px-4 md:px-6 flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Créer un compte</CardTitle>
              <CardDescription>Inscrivez-vous pour accéder à tous les services de LIGUEYLU</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="client">Client</TabsTrigger>
                  <TabsTrigger value="provider">Prestataire</TabsTrigger>
                </TabsList>

                <TabsContent value="client">
                  <form onSubmit={handleClientSubmit}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="nom-complet">Nom complet</Label>
                        <Input
                          id="nom-complet"
                          placeholder="Prénom Nom"
                          required
                          value={clientForm.nomComplet}
                          onChange={(e) => setClientForm((prev) => ({ ...prev, nomComplet: e.target.value }))}
                          className="border-green-200 focus:border-green-500"
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          placeholder="exemple@email.com"
                          type="email"
                          required
                          value={clientForm.email}
                          onChange={(e) => setClientForm((prev) => ({ ...prev, email: e.target.value }))}
                          className="border-green-200 focus:border-green-500"
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          placeholder="77123456"
                          type="tel"
                          required
                          value={clientForm.phone}
                          onChange={(e) => setClientForm((prev) => ({ ...prev, phone: e.target.value }))}
                          className="border-green-200 focus:border-green-500"
                          disabled={loading}
                        />
                        <p className="text-xs text-gray-500">Entre 7 et 9 chiffres</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            required
                            value={clientForm.password}
                            onChange={(e) => setClientForm((prev) => ({ ...prev, password: e.target.value }))}
                            className="border-green-200 focus:border-green-500 pr-10"
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
                        <p className="text-xs text-gray-500">Alphanumérique, 8-20 caractères</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                        <div className="relative">
                          <Input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            value={clientForm.confirmPassword}
                            onChange={(e) => setClientForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                            className="border-green-200 focus:border-green-500 pr-10"
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
                          id="terms"
                          required
                          checked={clientForm.acceptTerms}
                          onCheckedChange={(checked) => setClientForm((prev) => ({ ...prev, acceptTerms: !!checked }))}
                        />
                        <Label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          J&apos;accepte les{" "}
                          <Link href="#" className="text-green-600 hover:text-green-700">
                            conditions d&apos;utilisation
                          </Link>{" "}
                          et la{" "}
                          <Link href="#" className="text-green-600 hover:text-green-700">
                            politique de confidentialité
                          </Link>
                        </Label>
                      </div>
                      <Button type="submit" className="w-full bg-green-500 hover:bg-green-600" disabled={loading}>
                        {loading ? "Inscription..." : "S'inscrire"}
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="provider">
                  <form onSubmit={handleProviderSubmit}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="provider-nom-complet">Nom complet</Label>
                        <Input
                          id="provider-nom-complet"
                          placeholder="Prénom Nom"
                          required
                          value={providerForm.nomComplet}
                          onChange={(e) => setProviderForm((prev) => ({ ...prev, nomComplet: e.target.value }))}
                          className="border-green-200 focus:border-green-500"
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="provider-email">Email</Label>
                        <Input
                          id="provider-email"
                          placeholder="exemple@email.com"
                          type="email"
                          required
                          value={providerForm.email}
                          onChange={(e) => setProviderForm((prev) => ({ ...prev, email: e.target.value }))}
                          className="border-green-200 focus:border-green-500"
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="provider-phone">Téléphone</Label>
                        <Input
                          id="provider-phone"
                          placeholder="77123456"
                          type="tel"
                          required
                          value={providerForm.phone}
                          onChange={(e) => setProviderForm((prev) => ({ ...prev, phone: e.target.value }))}
                          className="border-green-200 focus:border-green-500"
                          disabled={loading}
                        />
                        <p className="text-xs text-gray-500">Entre 7 et 9 chiffres</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="provider-password">Mot de passe</Label>
                        <div className="relative">
                          <Input
                            id="provider-password"
                            type={showPassword ? "text" : "password"}
                            required
                            value={providerForm.password}
                            onChange={(e) => setProviderForm((prev) => ({ ...prev, password: e.target.value }))}
                            className="border-green-200 focus:border-green-500 pr-10"
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
                        <p className="text-xs text-gray-500">Alphanumérique, 8-20 caractères</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="provider-confirm-password">Confirmer le mot de passe</Label>
                        <div className="relative">
                          <Input
                            id="provider-confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            value={providerForm.confirmPassword}
                            onChange={(e) => setProviderForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                            className="border-green-200 focus:border-green-500 pr-10"
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
                      <div className="bg-yellow-50 p-3 rounded-md">
                        <p className="text-sm text-yellow-800">
                          <strong>Note:</strong> Votre compte prestataire sera activé après validation par un
                          administrateur.
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="provider-terms"
                          required
                          checked={providerForm.acceptTerms}
                          onCheckedChange={(checked) =>
                            setProviderForm((prev) => ({ ...prev, acceptTerms: !!checked }))
                          }
                        />
                        <Label
                          htmlFor="provider-terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          J&apos;accepte les{" "}
                          <Link href="#" className="text-green-600 hover:text-green-700">
                            conditions d&apos;utilisation
                          </Link>{" "}
                          et la{" "}
                          <Link href="#" className="text-green-600 hover:text-green-700">
                            politique de confidentialité
                          </Link>
                        </Label>
                      </div>
                      <Button type="submit" className="w-full bg-green-500 hover:bg-green-600" disabled={loading}>
                        {loading ? "Inscription..." : "S'inscrire comme prestataire"}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm">
                Vous avez déjà un compte?{" "}
                <Link href="/login" className="text-green-600 hover:text-green-700 font-medium">
                  Se connecter
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="w-full py-6 bg-white border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2025 LIGUEYLU. Tous droits réservés.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-muted-foreground hover:text-green-600">
                Conditions d&apos;utilisation
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-green-600">
                Politique de confidentialité
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-green-600">
                Aide
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
