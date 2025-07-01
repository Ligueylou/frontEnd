"use client"

import { useAuth } from "@/app/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "ADMIN" | "CLIENT" | "PRESTATAIRE"
  redirectTo?: string
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  redirectTo = "/login" 
}: ProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (!loading) {
      // Si pas d'utilisateur connecté
      if (!isAuthenticated || !user) {
        router.push(redirectTo)
        return
      }

      // Si un rôle spécifique est requis
      if (requiredRole && user.role !== requiredRole) {
        // Rediriger vers la page appropriée selon le rôle
        switch (user.role) {
          case "ADMIN":
            router.push("/dashboard/admin")
            break
          case "CLIENT":
            router.push("/dashboard/client")
            break
          case "PRESTATAIRE":
            router.push("/dashboard/prestataire")
            break
          default:
            router.push("/login")
        }
        return
      }

      // Si tout est OK, autoriser l'accès
      setIsAuthorized(true)
    }
  }, [user, loading, isAuthenticated, requiredRole, redirectTo, router])

  // Afficher un loader pendant la vérification
  if (loading || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification de l'authentification...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
} 