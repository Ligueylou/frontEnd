"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { apiService, type UserDto } from "../lib/api"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: UserDto | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  loginAdmin: (email: string, password: string) => Promise<void>
  register: (userData: {
    nomComplet: string
    email: string
    password: string
    telephone: string
    role: "CLIENT" | "PRESTATAIRE"
  }) => Promise<void>
  registerAdmin: (userData: {
    nomComplet: string
    email: string
    password: string
    telephone: string
  }) => Promise<void>
  logout: () => void
  loading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDto | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  // Fonction pour vérifier la validité du token
  const validateToken = async (token: string) => {
    try {
      const response = await apiService.getProfile()
      if (response.success) {
        return response.data
      }
      return null
    } catch (error) {
      console.error("Token invalide:", error)
      return null
    }
  }

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user")

        if (storedToken && storedUser) {
          // Vérifier si le token est toujours valide
          const validUser = await validateToken(storedToken)
          
          if (validUser) {
            setToken(storedToken)
            setUser(validUser)
            setIsAuthenticated(true)
          } else {
            // Token invalide, nettoyer le localStorage
            localStorage.removeItem("token")
            localStorage.removeItem("user")
          }
        }
      } catch (error) {
        console.error("Erreur lors de l'initialisation de l'authentification:", error)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
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
        router.push("/admin")
        break
      default:
        router.push("/dashboard")
        break
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.login({ email, password })

      if (response.token) {
        localStorage.setItem("token", response.token)
        setToken(response.token)
        
        // Récupérer les informations utilisateur après connexion
        try {
          const userResponse = await apiService.getProfile()
          if (userResponse.success && userResponse.data) {
            const userData = userResponse.data
            localStorage.setItem("user", JSON.stringify(userData))
            setUser(userData)
            setIsAuthenticated(true)
            
            // Redirection basée sur le rôle
            redirectBasedOnRole(userData.role)
          } else {
            throw new Error("Impossible de récupérer les informations utilisateur")
          }
        } catch (profileError) {
          console.error("Erreur lors de la récupération du profil:", profileError)
          throw new Error("Connexion réussie mais impossible de récupérer le profil")
        }
      } else {
        throw new Error("Token manquant dans la réponse")
      }
    } catch (error) {
      throw error
    }
  }

  const loginAdmin = async (email: string, password: string) => {
    try {
      const response = await apiService.loginAdmin({ email, password })

      if (response.token) {
        localStorage.setItem("token", response.token)
        setToken(response.token)
        
        // Récupérer les informations utilisateur après connexion
        try {
          const userResponse = await apiService.getProfile()
          if (userResponse.success && userResponse.data) {
            const userData = userResponse.data
            
            // Vérifier que l'utilisateur est bien un administrateur
            if (userData.role !== "ADMIN") {
              throw new Error("Accès refusé. Vous devez être administrateur.")
            }
            
            localStorage.setItem("user", JSON.stringify(userData))
            setUser(userData)
            setIsAuthenticated(true)
            
            // Redirection vers le dashboard administrateur
          } else {
            throw new Error("Impossible de récupérer les informations utilisateur")
          }
        } catch (profileError) {
          console.error("Erreur lors de la récupération du profil:", profileError)
          throw new Error("Connexion réussie mais impossible de récupérer le profil")
        }
      } else {
        throw new Error("Token manquant dans la réponse")
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

      if (response.token) {
        localStorage.setItem("token", response.token)
        setToken(response.token)
        
        // Récupérer les informations utilisateur après inscription
        try {
          const userResponse = await apiService.getProfile()
          if (userResponse.success && userResponse.data) {
            const userInfo = userResponse.data
            localStorage.setItem("user", JSON.stringify(userInfo))
            setUser(userInfo)
            setIsAuthenticated(true)
            
            // Redirection basée sur le rôle
            redirectBasedOnRole(userInfo.role)
          } else {
            throw new Error("Impossible de récupérer les informations utilisateur")
          }
        } catch (profileError) {
          console.error("Erreur lors de la récupération du profil:", profileError)
          throw new Error("Inscription réussie mais impossible de récupérer le profil")
        }
      } else {
        throw new Error("Token manquant dans la réponse")
      }
    } catch (error) {
      throw error
    }
  }

  const registerAdmin = async (userData: {
    nomComplet: string
    email: string
    password: string
    telephone: string
  }) => {
    try {
      const response = await apiService.register({
        ...userData,
        role: "ADMIN"
      })

      if (response.token) {
        localStorage.setItem("token", response.token)
        setToken(response.token)
        
        // Récupérer les informations utilisateur après inscription
        try {
          const userResponse = await apiService.getProfile()
          if (userResponse.success && userResponse.data) {
            const userInfo = userResponse.data
            
            // Vérifier que l'utilisateur est bien un administrateur
            if (userInfo.role !== "ADMIN") {
              throw new Error("Erreur lors de la création du compte administrateur")
            }
            
            localStorage.setItem("user", JSON.stringify(userInfo))
            setUser(userInfo)
            setIsAuthenticated(true)
            
            // Redirection vers le dashboard administrateur
          } else {
            throw new Error("Impossible de récupérer les informations utilisateur")
          }
        } catch (profileError) {
          console.error("Erreur lors de la récupération du profil:", profileError)
          throw new Error("Inscription réussie mais impossible de récupérer le profil")
        }
      } else {
        throw new Error("Token manquant dans la réponse")
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
    setIsAuthenticated(false)
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        loginAdmin,
        register,
        registerAdmin,
        logout,
        loading,
        isAuthenticated,
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
