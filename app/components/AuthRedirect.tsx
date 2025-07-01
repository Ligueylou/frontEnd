"use client"

import { useAuth } from "@/app/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface AuthRedirectProps {
  allowedRoles?: string[]
  redirectTo?: string
}

export function AuthRedirect({ allowedRoles, redirectTo }: AuthRedirectProps) {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion appropriée
      if (!isAuthenticated || !user) {
        if (redirectTo) {
          router.push(redirectTo)
        } else {
          router.push("/login")
        }
        return
      }

      // Si des rôles spécifiques sont autorisés et que l'utilisateur n'a pas le bon rôle
      if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
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
      }
    }
  }, [user, loading, isAuthenticated, allowedRoles, redirectTo, router])

  return null
} 