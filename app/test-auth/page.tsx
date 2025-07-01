"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { apiService } from "../lib/api"
import { toast } from "sonner"

export default function TestAuthPage() {
  const [loading, setLoading] = useState(false)
  const [testResults, setTestResults] = useState<string[]>([])

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testBackendConnection = async () => {
    setLoading(true)
    addResult("Test de connexion au backend...")
    
    try {
      const response = await fetch("http://localhost:8080/api/v1/prestataires")
      if (response.ok) {
        addResult("✅ Backend accessible")
      } else {
        addResult(`❌ Backend accessible mais erreur: ${response.status}`)
      }
    } catch (error) {
      addResult(`❌ Impossible de connecter au backend: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const testRegister = async () => {
    setLoading(true)
    addResult("Test d'inscription...")
    
    try {
      const testUser = {
        nomComplet: "Test User",
        email: `test${Date.now()}@example.com`,
        password: "testpass123",
        telephone: "77123456",
        role: "PRESTATAIRE" as const
      }

      const response = await apiService.register(testUser)
      addResult(`✅ Inscription réussie, token reçu: ${response.token ? "Oui" : "Non"}`)
      
      // Test de récupération des informations utilisateur
      try {
        const userInfo = await apiService.getProfile()
        addResult(`✅ Informations utilisateur récupérées: ${userInfo.data.nomComplet}`)
      } catch (error) {
        addResult(`⚠️ Impossible de récupérer les infos utilisateur: ${error}`)
      }
      
    } catch (error) {
      addResult(`❌ Erreur d'inscription: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const testLogin = async () => {
    setLoading(true)
    addResult("Test de connexion...")
    
    try {
      const response = await apiService.login({
        email: "test@example.com",
        password: "testpass123"
      })
      addResult(`✅ Connexion réussie, token reçu: ${response.token ? "Oui" : "Non"}`)
    } catch (error) {
      addResult(`❌ Erreur de connexion: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const testAdminLogin = async () => {
    setLoading(true)
    addResult("Test de connexion administrateur...")
    
    try {
      const response = await apiService.loginAdmin({
        email: "admin@example.com",
        password: "adminpass123"
      })
      addResult(`✅ Connexion administrateur réussie, token reçu: ${response.token ? "Oui" : "Non"}`)
    } catch (error) {
      addResult(`❌ Erreur de connexion administrateur: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const testAdminRegister = async () => {
    setLoading(true)
    addResult("Test d'inscription administrateur...")
    
    try {
      const testAdmin = {
        nomComplet: "Admin Test",
        email: `admin${Date.now()}@example.com`,
        password: "adminpass123",
        telephone: "77123456",
        role: "ADMIN" as const
      }

      const response = await apiService.register(testAdmin)
      addResult(`✅ Inscription administrateur réussie, token reçu: ${response.token ? "Oui" : "Non"}`)
      
      // Test de récupération des informations utilisateur
      try {
        const userInfo = await apiService.getProfile()
        addResult(`✅ Informations administrateur récupérées: ${userInfo.data.nomComplet}`)
      } catch (error) {
        addResult(`⚠️ Impossible de récupérer les infos administrateur: ${error}`)
      }
      
    } catch (error) {
      addResult(`❌ Erreur d'inscription administrateur: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const clearResults = () => {
    setTestResults([])
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Test d'intégration Frontend-Backend</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={testBackendConnection} 
              disabled={loading}
              variant="outline"
            >
              Test Connexion Backend
            </Button>
            <Button 
              onClick={testRegister} 
              disabled={loading}
              variant="outline"
            >
              Test Inscription
            </Button>
            <Button 
              onClick={testLogin} 
              disabled={loading}
              variant="outline"
            >
              Test Connexion
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={testAdminLogin} 
              disabled={loading}
              variant="outline"
              className="border-red-200 text-red-700 hover:bg-red-50"
            >
              Test Connexion Admin
            </Button>
            <Button 
              onClick={testAdminRegister} 
              disabled={loading}
              variant="outline"
              className="border-red-200 text-red-700 hover:bg-red-50"
            >
              Test Inscription Admin
            </Button>
          </div>
          
          <div className="flex justify-between items-center">
            <Label>Résultats des tests:</Label>
            <Button onClick={clearResults} variant="ghost" size="sm">
              Effacer
            </Button>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-md max-h-96 overflow-y-auto">
            {testResults.length === 0 ? (
              <p className="text-gray-500">Aucun test effectué</p>
            ) : (
              <div className="space-y-1">
                {testResults.map((result, index) => (
                  <div key={index} className="text-sm font-mono">
                    {result}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="text-sm text-gray-600">
            <p><strong>Instructions:</strong></p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Assurez-vous que le backend est démarré sur le port 8080</li>
              <li>Créez un fichier .env.local avec NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1</li>
              <li>Testez d'abord la connexion au backend</li>
              <li>Puis testez l'inscription et la connexion</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 