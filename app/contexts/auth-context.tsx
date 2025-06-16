"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { apiService, type UserDto } from "../lib/api"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: UserDto | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: {
    nomComplet: string
    email: string
    password: string
    telephone: string
    role: "CLIENT" | "PRESTATAIRE"
  }) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDto | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
      }
    }
    setLoading(false)
  }, [])

  const redirectBasedOnRole = (userRole: string) => {
    switch (userRole) {
      case "CLIENT":
        router.push("/dashboard/client")
        break
      case "PRESTATAIRE":
        router.push("/dashboard/prestataire")
        break
      case "ADMIN":
        router.push("/dashboard/admin")
        break
      default:
        router.push("/dashboard")
        break
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.login({ email, password })

      if (response.success && response.token && response.user) {
        localStorage.setItem("token", response.token)
        localStorage.setItem("user", JSON.stringify(response.user))
        setToken(response.token)
        setUser(response.user)

        // Redirection basée sur le rôle
        redirectBasedOnRole(response.user.role)
      } else {
        throw new Error(response.message || "Erreur de connexion")
      }
    } catch (error) {
      throw error
    }
  }

  const register = async (userData: {
    nomComplet: string
    email: string
    password: string
    telephone: string
    role: "CLIENT" | "PRESTATAIRE"
  }) => {
    try {
      const response = await apiService.register(userData)

      if (response.success && response.token && response.user) {
        localStorage.setItem("token", response.token)
        localStorage.setItem("user", JSON.stringify(response.user))
        setToken(response.token)
        setUser(response.user)

        // Redirection basée sur le rôle
        redirectBasedOnRole(response.user.role)
      } else {
        throw new Error(response.message || "Erreur d'inscription")
      }
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
