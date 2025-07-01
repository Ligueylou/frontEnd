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

// Interfaces corrigées pour correspondre à votre structure de base de données
export interface Utilisateur {
  id: number
  nomComplet: string
  email: string
  telephone: string
  role: "ADMIN" | "CLIENT" | "PRESTATAIRE"
  actif: boolean
}

export interface Prestataire {
  id: number
  score: number
  adminId?: number
  adresseId?: number
  // Propriétés héritées de Utilisateur
  nomComplet: string
  email: string
  telephone: string
  role: string
  actif: boolean
  // Relations
  specialites?: Specialite[]
  adresse?: Adresse
}

export interface Specialite {
  id: number
  nom: string
  description: string
}

export interface Adresse {
  id: number
  ville: string
  quartier: string
  rue: string
  codePostal: string
}

export interface AddPrestataireRequest {
  nomComplet: string
  email: string
  telephone: string
  specialiteIds: number[]
  adresseId?: number
}

export interface UpdatePrestataireRequest {
  nomComplet: string
  email: string
  telephone: string
}

export interface Client {
  id: number
  nomComplet: string
  email: string
  telephone: string
  role: string
  actif: boolean
  adresse?: Adresse
}

export interface UserStats {
  totalClients: number
  totalPrestataires: number
  activeClients: number
  activePrestataires: number
  inactiveClients: number
  inactivePrestataires: number
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

  async loginAdmin(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/admin/login`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(credentials),
    })

    const data = await response.json()

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("Accès refusé. Vous devez être administrateur pour vous connecter ici.")
      }
      throw new Error(data.message || "Erreur de connexion administrateur")
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

    const data = await response.json()

    // Transformer la réponse du backend en format UserDto
    if (data.success && data.data) {
      return {
        success: true,
        message: data.message,
        data: {
          id: data.data.id,
          email: data.data.email,
          nomComplet: data.data.nomComplet,
          role: data.data.role,
        },
      }
    }

    throw new Error(data.message || "Erreur lors de la récupération du profil")
  }

  async getUserInfo(email: string): Promise<ApiResponse<UserDto>> {
    // Essayer d'abord de récupérer comme prestataire
    try {
      const response = await fetch(`${API_BASE_URL}/prestataires/email/${email}`, {
        method: "GET",
        headers: this.getHeaders(true),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          return {
            success: true,
            message: "Utilisateur trouvé",
            data: {
              id: data.data.id,
              email: data.data.email,
              nomComplet: data.data.nomComplet,
              role: "PRESTATAIRE",
            },
          }
        }
      }
    } catch (error) {
      console.log("Utilisateur non trouvé comme prestataire, tentative comme client...")
    }

    // Si pas trouvé comme prestataire, essayer comme client
    // Pour l'instant, on retourne une structure basique car le ClientController est vide
    // Vous devrez implémenter l'endpoint client dans le backend plus tard
    throw new Error("Impossible de récupérer les informations utilisateur")
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
  async getAllAdresses(): Promise<ApiResponse<Adresse[]>> {
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
  async getAllPrestataires(): Promise<ApiResponse<Prestataire[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/prestataires`, {
        method: "GET",
        headers: this.getHeaders(true),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Erreur HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log("Réponse API prestataires:", data) // Pour déboguer
      return data
    } catch (error) {
      console.error("Erreur détaillée:", error)
      throw error
    }
  }

  async getPrestataireById(id: number): Promise<ApiResponse<Prestataire>> {
    const response = await fetch(`${API_BASE_URL}/prestataires/${id}`, {
      method: "GET",
      headers: this.getHeaders(true),
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération du prestataire")
    }

    return response.json()
  }

  async addPrestataire(prestataireData: AddPrestataireRequest): Promise<ApiResponse<Prestataire>> {
    const response = await fetch(`${API_BASE_URL}/prestataires`, {
      method: "POST",
      headers: this.getHeaders(true),
      body: JSON.stringify(prestataireData),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Erreur lors de l'ajout du prestataire" }))
      throw new Error(error.message || "Erreur lors de l'ajout du prestataire")
    }

    return response.json()
  }

  async updatePrestataire(id: number, prestataireData: UpdatePrestataireRequest): Promise<ApiResponse<Prestataire>> {
    const response = await fetch(`${API_BASE_URL}/prestataires/${id}`, {
      method: "PUT",
      headers: this.getHeaders(true),
      body: JSON.stringify(prestataireData),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Erreur lors de la mise à jour du prestataire" }))
      throw new Error(error.message || "Erreur lors de la mise à jour du prestataire")
    }

    return response.json()
  }

  async deletePrestataire(id: number): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/prestataires/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(true),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Erreur lors de la suppression du prestataire" }))
      throw new Error(error.message || "Erreur lors de la suppression du prestataire")
    }

    return response.json()
  }

  async activatePrestataire(id: number): Promise<ApiResponse<Prestataire>> {
    const response = await fetch(`${API_BASE_URL}/prestataires/activate/${id}`, {
      method: "GET",
      headers: this.getHeaders(true),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Erreur lors de l'activation du prestataire" }))
      throw new Error(error.message || "Erreur lors de l'activation du prestataire")
    }

    return response.json()
  }

  async getPrestataireStats(): Promise<ApiResponse<Record<string, number>>> {
    const response = await fetch(`${API_BASE_URL}/prestataires/stats/specialites`, {
      method: "GET",
      headers: this.getHeaders(true),
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des statistiques")
    }

    return response.json()
  }

  async searchPrestatairesBySpecialite(specialite: string): Promise<ApiResponse<Prestataire[]>> {
    const response = await fetch(`${API_BASE_URL}/prestataires/search/${specialite}`, {
      method: "GET",
      headers: this.getHeaders(true),
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la recherche par spécialité")
    }

    return response.json()
  }

  // Méthodes pour la gestion des utilisateurs (clients et prestataires)
  async getAllClients(): Promise<ApiResponse<Client[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/clients`, {
        method: "GET",
        headers: this.getHeaders(true),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Erreur HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log("Réponse API clients:", data)
      return data
    } catch (error) {
      console.error("Erreur détaillée:", error)
      throw error
    }
  }

  async getClientById(id: number): Promise<ApiResponse<Client>> {
    const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
      method: "GET",
      headers: this.getHeaders(true),
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération du client")
    }

    return response.json()
  }

  async deleteClient(id: number): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(true),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Erreur lors de la suppression du client" }))
      throw new Error(error.message || "Erreur lors de la suppression du client")
    }

    return response.json()
  }

  async activateClient(id: number): Promise<ApiResponse<Client>> {
    const response = await fetch(`${API_BASE_URL}/clients/activate/${id}`, {
      method: "GET",
      headers: this.getHeaders(true),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Erreur lors de l'activation du client" }))
      throw new Error(error.message || "Erreur lors de l'activation du client")
    }

    return response.json()
  }

  async getUserStats(): Promise<ApiResponse<UserStats>> {
    try {
      // Récupérer les clients et prestataires
      const [clientsResponse, prestatairesResponse] = await Promise.all([
        this.getAllClients(),
        this.getAllPrestataires()
      ])

      const clients = clientsResponse.success ? clientsResponse.data : []
      const prestataires = prestatairesResponse.success ? prestatairesResponse.data : []

      const stats: UserStats = {
        totalClients: clients.length,
        totalPrestataires: prestataires.length,
        activeClients: clients.filter((c: Client) => c.actif).length,
        activePrestataires: prestataires.filter((p: Prestataire) => p.actif).length,
        inactiveClients: clients.filter((c: Client) => !c.actif).length,
        inactivePrestataires: prestataires.filter((p: Prestataire) => !p.actif).length,
      }

      return {
        success: true,
        message: "Statistiques récupérées avec succès",
        data: stats
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques:", error)
      throw error
    }
  }

  async getAllUsers(): Promise<ApiResponse<Array<Client | Prestataire>>> {
    try {
      // Récupérer les clients et prestataires
      const [clientsResponse, prestatairesResponse] = await Promise.all([
        this.getAllClients(),
        this.getAllPrestataires()
      ])

      const clients = clientsResponse.success ? clientsResponse.data : []
      const prestataires = prestatairesResponse.success ? prestatairesResponse.data : []

      // Combiner les deux listes
      const allUsers = [...clients, ...prestataires]

      return {
        success: true,
        message: "Utilisateurs récupérés avec succès",
        data: allUsers
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error)
      throw error
    }
  }
}

export const apiService = new ApiService()
