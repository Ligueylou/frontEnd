"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, X } from "lucide-react"
import { apiService, type Client, type Prestataire, type Specialite } from "../../lib/api"

interface UserDetailModalProps {
  userId: number | null
  onClose: () => void
}

export default function UserDetailModal({ userId, onClose }: UserDetailModalProps) {
  const [user, setUser] = useState<Client | Prestataire | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (userId) {
      loadUser()
    } else {
      setUser(null)
      setError(null)
    }
    // eslint-disable-next-line
  }, [userId])

  const loadUser = async () => {
    setLoading(true)
    setError(null)
    try {
      let response = await apiService.getClientById(userId!)
      if (response.success && response.data) {
        setUser({ ...response.data, role: "CLIENT" })
        setLoading(false)
        return
      }
    } catch (e) {
      try {
        const response = await apiService.getPrestataireById(userId!)
        if (response.success && response.data) {
          setUser({ ...response.data, role: "PRESTATAIRE" })
          setLoading(false)
          return
        }
      } catch (e2) {
        setError("Utilisateur non trouvé")
      }
    }
    setLoading(false)
  }

  if (!userId) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl relative animate-fade-in">
        <Button
          onClick={onClose}
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </Button>
        <Card className="shadow-none border-none">
          <CardHeader>
            <CardTitle>Détails de l'utilisateur</CardTitle>
            <CardDescription>ID: {userId}</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                <span>Chargement...</span>
              </div>
            ) : error || !user ? (
              <div className="text-center py-8 text-red-500">{error || "Utilisateur non trouvé"}</div>
            ) : (
              <div className="space-y-4">
                <div>
                  <span className="font-semibold">Nom complet :</span> {user.nomComplet}
                </div>
                <div>
                  <span className="font-semibold">Email :</span> {user.email}
                </div>
                <div>
                  <span className="font-semibold">Téléphone :</span> {user.telephone}
                </div>
                <div>
                  <span className="font-semibold">Rôle :</span> <Badge>{user.role}</Badge>
                </div>
                <div>
                  <span className="font-semibold">Statut :</span> {user.actif ? <Badge className="bg-green-100 text-green-800">Actif</Badge> : <Badge className="bg-red-100 text-red-800">Inactif</Badge>}
                </div>
                {user.role === "PRESTATAIRE" && (
                  <div>
                    <span className="font-semibold">Score :</span> {(user as Prestataire).score?.toFixed(1) ?? "-"}
                  </div>
                )}
                {user.role === "PRESTATAIRE" && (user as Prestataire).specialites && (
                  <div>
                    <span className="font-semibold">Spécialités :</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {(user as Prestataire).specialites!.map((s: Specialite) => (
                        <Badge key={s.id} variant="outline" className="text-blue-600">{s.nom}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {user.role === "CLIENT" && user.adresse && (
                  <div>
                    <span className="font-semibold">Adresse :</span> {user.adresse.ville}, {user.adresse.rue}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 