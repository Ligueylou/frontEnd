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

export default function LoginPage() {
  const { login, user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    remember: false,
  })

  useEffect(() => {
    if (isAuthenticated && user && user.role === "ADMIN") {
      router.replace("/admin")
    }
  }, [isAuthenticated, user, router])

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(formData.email, formData.password)
      toast.success("Connexion réussie !")
      // Redirection automatique gérée par le contexte d'authentification
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur de connexion")
    } finally {
      setLoading(false)
    }
  }

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // Implement phone login logic here
    toast.info("Connexion par téléphone non implémentée")
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
              <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
              <CardDescription>
                Connectez-vous à votre compte pour accéder à vos services et réservations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="phone">Téléphone</TabsTrigger>
                </TabsList>
                <TabsContent value="email">
                  <form onSubmit={handleEmailLogin}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          placeholder="exemple@email.com"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          className="border-green-200 focus:border-green-500"
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Mot de passe</Label>
                          <Link href="/forgot-password" className="text-sm text-green-600 hover:text-green-700">
                            Mot de passe oublié?
                          </Link>
                        </div>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            required
                            value={formData.password}
                            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
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
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={formData.remember}
                          onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, remember: !!checked }))}
                        />
                        <Label
                          htmlFor="remember"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Se souvenir de moi
                        </Label>
                      </div>
                      <Button type="submit" className="w-full bg-green-500 hover:bg-green-600" disabled={loading}>
                        {loading ? "Connexion..." : "Se connecter"}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                <TabsContent value="phone">
                  <form onSubmit={handlePhoneLogin}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Numéro de téléphone</Label>
                        <Input
                          id="phone"
                          placeholder="77 123 45 67"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                          className="border-green-200 focus:border-green-500"
                          disabled={loading}
                        />
                      </div>
                      <Button type="submit" className="w-full bg-green-500 hover:bg-green-600" disabled={loading}>
                        {loading ? "Envoi..." : "Recevoir un code"}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">Ou continuer avec</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full" disabled={loading}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  Facebook
                </Button>
                <Button variant="outline" className="w-full" disabled={loading}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  Twitter
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm">
                Vous n&apos;avez pas de compte?{" "}
                <Link href="/register" className="text-green-600 hover:text-green-700 font-medium">
                  S&apos;inscrire
                </Link>
              </div>
              <div className="text-center text-sm">
                <Link href="/admin/login" className="text-red-600 hover:text-red-700 font-medium">
                  Accès administrateur
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
