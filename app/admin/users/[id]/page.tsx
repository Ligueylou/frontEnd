"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft } from "lucide-react"
import { apiService, type Client, type Prestataire } from "../../../lib/api"
import Link from "next/link"
import { toast } from "sonner"

export default function UserDetailPage() {
  const params = useParams()
  const router = useRouter()
  const userId = Number(params.id)
  const [user, setUser] = useState<Client | Prestataire | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return
    loadUser()
    // eslint-disable-next-line
  }, [userId])

  const loadUser = async () => {
    setLoading(true)
    setError(null)
    try {
      // On tente d'abord comme client
      let response = await apiService.getClientById(userId)
      if (response.success && response.data) {
        setUser({ ...response.data, role: "CLIENT" })
        setLoading(false)
        return
      }
    } catch (e) {
      // Si pas trouvé comme client, on tente comme prestataire
      try {
        const response = await apiService.getPrestataireById(userId)
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

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Chargement des informations utilisateur...</span>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">{error || "Utilisateur non trouvé"}</p>
        <Button onClick={() => router.back()} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" /> Retour
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Link href="/admin/users">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <CardTitle>Détails de l'utilisateur</CardTitle>
              <CardDescription>ID: {user.id}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
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
                  {(user as Prestataire).specialites!.map((s) => (
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
        </CardContent>
      </Card>
    </div>
  )
} 