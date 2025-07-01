"use client"

import type React from "react"
import Link from "next/link"
import { Shield, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    secret: "",
    remember: false,
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Vérification du code secret
    if (formData.secret !== "LIGUEYLU_ADMIN_2024") {
      toast({
        description: (
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>Code secret invalide</span>
          </div>
        ),
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    // Simulation de connexion
    try {
      console.log("Tentative de connexion avec:", formData.email)

      // Ici on ajoutera l'appel API plus tard
      setTimeout(() => {
        toast({
          description: (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Connexion réussie !</span>
            </div>
          ),
        })
        setLoading(false)
        // Redirection vers /admin
        setTimeout(() => {
          window.location.href = "/admin"
        }, 1000)
      }, 1000)
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        description: (
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>Erreur de connexion</span>
          </div>
        ),
        variant: "destructive",
      })
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
              <CardTitle className="text-2xl font-bold">Administration</CardTitle>
              <CardDescription>Connectez-vous à votre compte administrateur pour gérer la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
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
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Link href="/admin/forgot-password" className="text-sm text-red-600 hover:text-red-700">
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
                    <Label htmlFor="secret">Code secret</Label>
                    <Input
                      id="secret"
                      placeholder="Code secret administrateur"
                      type="password"
                      required
                      value={formData.secret}
                      onChange={(e) => setFormData((prev) => ({ ...prev, secret: e.target.value }))}
                      className="border-red-200 focus:border-red-500"
                      disabled={loading}
                    />
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
                  <Button type="submit" className="w-full bg-red-500 hover:bg-red-600" disabled={loading}>
                    {loading ? "Connexion..." : "Se connecter"}
                  </Button>
                </div>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">Accès public</span>
                </div>
              </div>

              <div className="text-center">
                <Link href="/login" className="text-sm text-red-600 hover:text-red-700">
                  ← Retour à la connexion utilisateur
                </Link>
              </div>

              <div className="text-center mt-2">
                <Link href="/admin/register" className="text-sm text-red-600 hover:text-red-700">
                  Créer un compte administrateur
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
