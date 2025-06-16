const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  nomComplet: string
  email: string
  password: string
  telephone: string
  role: "CLIENT" | "PRESTATAIRE" | "ADMIN"
}

export interface UserDto {
  id: number
  email: string
  nomComplet: string
  role: string
}

export interface AuthResponse {
  token: string
  message: string
  success: boolean
  user: UserDto
}

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data: T
}

export interface UpdateProfileRequest {
  nomComplet: string
  email: string
  telephone: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}

class ApiService {
  private getHeaders(includeAuth = false): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (includeAuth) {
      const token = localStorage.getItem("token")
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }
    }

    return headers
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(credentials),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Erreur de connexion")
    }

    return data
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(userData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Erreur d'inscription")
    }

    return data
  }

  async getProfile(): Promise<ApiResponse<UserDto>> {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: "GET",
      headers: this.getHeaders(true),
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération du profil")
    }

    return response.json()
  }

  async updateProfile(profileData: UpdateProfileRequest): Promise<ApiResponse<UserDto>> {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: "PUT",
      headers: this.getHeaders(true),
      body: JSON.stringify(profileData),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Erreur lors de la mise à jour du profil" }))
      throw new Error(error.message || "Erreur lors de la mise à jour du profil")
    }

    return response.json()
  }

  async changePassword(passwordData: ChangePasswordRequest): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: "PUT",
      headers: this.getHeaders(true),
      body: JSON.stringify(passwordData),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Erreur lors du changement de mot de passe" }))
      throw new Error(error.message || "Erreur lors du changement de mot de passe")
    }

    return response.json()
  }

  // Méthodes pour les adresses
  async getAllAdresses(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/adresses`, {
      method: "GET",
      headers: this.getHeaders(true),
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des adresses")
    }

    return response.json()
  }

  // Méthodes pour les prestataires
  async getAllPrestataires(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/prestataires`, {
      method: "GET",
      headers: this.getHeaders(true),
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des prestataires")
    }

    return response.json()
  }

  async getPrestataireStats(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/prestataires/stats/specialites`, {
      method: "GET",
      headers: this.getHeaders(true),
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des statistiques")
    }

    return response.json()
  }
}

export const apiService = new ApiService()
