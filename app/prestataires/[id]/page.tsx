"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "../../contexts/auth-context"
import { apiService, type Prestataire } from "../../lib/api"
import { toast } from "sonner"
import Link from "next/link"
import {
  Shield,
  Star,
  MapPin,
  Clock,
  Calendar,
  CheckCircle,
  MessageCircle,
  ThumbsUp,
  Award,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProviderDetailPage() {
  const params = useParams()
  const { user } = useAuth()
  const [provider, setProvider] = useState<Prestataire | null>(null)
  const [loading, setLoading] = useState(true)
  const [reservationLoading, setReservationLoading] = useState(false)
  const [ratingLoading, setRatingLoading] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reservationData, setReservationData] = useState({
    date: "",
    heure: "",
    typeService: "",
    description: ""
  })

  useEffect(() => {
    const fetchProvider = async () => {
      if (!params.id) return
      
      setLoading(true)
      try {
        const response = await apiService.getPrestataireById(Number(params.id))
        if (response.success) {
          setProvider(response.data)
        } else {
          toast.error("Erreur lors du chargement du prestataire")
        }
      } catch (error) {
        console.error("Erreur:", error)
        toast.error("Erreur lors du chargement du prestataire")
      } finally {
        setLoading(false)
      }
    }

    fetchProvider()
  }, [params.id])

  const handleRating = async (rating: number) => {
    if (!user) {
      toast.error("Vous devez être connecté pour noter un prestataire")
      return
    }

    if (!provider) {
      toast.error("Prestataire non trouvé")
      return
    }

    setRatingLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"}/prestataires/score/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          prestataireId: provider.id,
          newScore: rating
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        toast.success("Note envoyée avec succès !")
        setUserRating(rating)
        // Recharger les données du prestataire pour mettre à jour le score affiché
        const providerResponse = await apiService.getPrestataireById(Number(params.id))
        if (providerResponse.success) {
          setProvider(providerResponse.data)
        }
      } else {
        toast.error(data.message || "Erreur lors de l'envoi de la note")
      }
    } catch (error) {
      console.error("Erreur:", error)
      toast.error("Erreur lors de l'envoi de la note")
    } finally {
      setRatingLoading(false)
    }
  }

  const handleReservation = async () => {
    if (!user) {
      toast.error("Vous devez être connecté pour faire une réservation")
      return
    }

    if (!provider) {
      toast.error("Prestataire non trouvé")
      return
    }

    if (!reservationData.date || !reservationData.heure || !reservationData.typeService) {
      toast.error("Veuillez remplir tous les champs obligatoires")
      return
    }

    setReservationLoading(true)
    try {
      const reservationPayload = {
        prestataireId: provider.id,
        reservation: {
          libelle: `Réservation - ${reservationData.typeService}`,
          typeService: reservationData.typeService,
          description: reservationData.description || `Réservation pour le ${reservationData.date} à ${reservationData.heure}`,
          status: "EN_ATTENTE"
        }
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"}/prestataires/reservation/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(reservationPayload)
      })

      const data = await response.json()

      if (response.ok && data.success) {
        toast.success("Réservation créée avec succès !")
        setReservationData({
          date: "",
          heure: "",
          typeService: "",
          description: ""
        })
      } else {
        toast.error(data.message || "Erreur lors de la création de la réservation")
      }
    } catch (error) {
      console.error("Erreur:", error)
      toast.error("Erreur lors de la création de la réservation")
    } finally {
      setReservationLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span>Chargement du prestataire...</span>
      </div>
    )
  }

  if (!provider) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span>Prestataire non trouvé</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-green-500" />
              <span className="text-xl font-bold">LIGUEYLU</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground">
              Accueil
            </Link>
            <Link href="/services" className="text-sm font-medium text-muted-foreground">
              Services
            </Link>
            <Link href="/prestataires" className="text-sm font-medium text-green-600">
              Prestataires
            </Link>
            <Link href="/comment-ca-marche" className="text-sm font-medium text-muted-foreground">
              Comment ça marche
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Se connecter
            </Button>
            <Button size="sm" className="bg-green-500 hover:bg-green-600">
              S&apos;inscrire
            </Button>
          </div>
        </div>
      </header>

      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Provider Profile */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-lg border p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-green-100">
                    <AvatarImage src="/placeholder.svg" alt={provider.nomComplet} />
                    <AvatarFallback className="text-2xl">
                      {provider.nomComplet
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h1 className="text-2xl font-bold">{provider.nomComplet}</h1>
                      <p className="text-muted-foreground">{provider.specialites?.[0]?.nom || "Prestataire"}</p>
                    </div>
                    <Badge className="bg-green-500 hover:bg-green-600 w-fit">Vérifié</Badge>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < Math.round(provider.score ?? 0) ? "fill-green-400 text-green-400" : "text-gray-300"}`}
                          />
                        ))}
                    </div>
                    <span className="ml-2 font-medium">{provider.score ?? "-"}</span>
                    <span className="ml-1 text-muted-foreground">(Score)</span>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="text-sm">{provider.adresse?.ville || "Non spécifié"}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">Disponible</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="text-sm">Membre depuis 2023</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="text-sm">Prestataire vérifié</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">À propos</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Avis</TabsTrigger>
              </TabsList>
              <TabsContent value="about" className="bg-white rounded-lg border p-6 mt-2">
                <h2 className="text-xl font-semibold mb-4">À propos de {provider.nomComplet}</h2>
                <p className="text-muted-foreground mb-6">Prestataire professionnel qualifié et vérifié.</p>

                <h3 className="text-lg font-semibold mb-3">Spécialités</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {provider.specialites?.map((specialite, index) => (
                    <Badge key={index} variant="outline" className="bg-green-50">
                      {specialite.nom}
                    </Badge>
                  )) || <span className="text-muted-foreground">Aucune spécialité spécifiée</span>}
                </div>

                <h3 className="text-lg font-semibold mb-3">Informations</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Award className="h-5 w-5 text-green-500 mr-2" />
                    <span>Prestataire vérifié par LIGUEYLU</span>
                  </li>
                  <li className="flex items-center">
                    <Award className="h-5 w-5 text-green-500 mr-2" />
                    <span>Score: {provider.score ?? "Non évalué"}</span>
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="services" className="bg-white rounded-lg border p-6 mt-2">
                <h2 className="text-xl font-semibold mb-4">Services proposés</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {provider.specialites?.map((specialite, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{specialite.nom}</h3>
                        <p className="text-sm text-muted-foreground">{specialite.description || "Service professionnel"}</p>
                      </CardContent>
                    </Card>
                  )) || (
                    <p className="text-muted-foreground col-span-2">Aucun service spécifié</p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="bg-white rounded-lg border p-6 mt-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Noter ce prestataire</h2>
                </div>
                
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Votre note :</span>
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleRating(i + 1)}
                              onMouseEnter={() => setHoverRating(i + 1)}
                              onMouseLeave={() => setHoverRating(0)}
                              disabled={ratingLoading}
                              className="p-1"
                            >
                              <Star
                                className={`h-6 w-6 transition-colors ${
                                  i < (hoverRating || userRating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300 hover:text-yellow-400"
                                }`}
                              />
                            </button>
                          ))}
                      </div>
                      {ratingLoading && <span className="text-sm text-muted-foreground">Envoi en cours...</span>}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Cliquez sur les étoiles pour noter ce prestataire de 1 à 5 étoiles.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Connectez-vous pour noter ce prestataire</p>
                    <Button className="bg-green-500 hover:bg-green-600">
                      Se connecter
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Reservation Sidebar */}
          <div className="md:w-1/3">
            <div className="sticky top-24">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Réserver un service</h2>
                  <div className="mb-4 pb-4 border-b">
                    <div className="font-bold text-2xl mb-1">Tarif sur devis</div>
                    <div className="text-muted-foreground">Contactez le prestataire pour un devis personnalisé</div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">Date</label>
                      <input 
                        type="date" 
                        className="w-full p-2 border rounded-md"
                        value={reservationData.date}
                        onChange={(e) => setReservationData(prev => ({ ...prev, date: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Heure</label>
                      <select 
                        className="w-full p-2 border rounded-md"
                        value={reservationData.heure}
                        onChange={(e) => setReservationData(prev => ({ ...prev, heure: e.target.value }))}
                      >
                        <option value="">Sélectionner une heure</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Type de service</label>
                      <select 
                        className="w-full p-2 border rounded-md"
                        value={reservationData.typeService}
                        onChange={(e) => setReservationData(prev => ({ ...prev, typeService: e.target.value }))}
                      >
                        <option value="">Sélectionner un service</option>
                        {/* Services basés sur les spécialités du prestataire */}
                        {provider.specialites?.map((specialite) => (
                          <option key={specialite.id} value={specialite.nom}>
                            {specialite.nom}
                          </option>
                        ))}
                        {/* Services génériques disponibles */}
                        <option value="ELECTRICIEN">Électricien</option>
                        <option value="PLOMBIER">Plombier</option>
                        <option value="MACON">Maçon</option>
                        <option value="JARDINIER">Jardinier</option>
                        <option value="PEINTRE">Peintre</option>
                        <option value="MENUISIER">Menuisier</option>
                        <option value="CLIMATICIEN">Climaticien</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Description (optionnel)</label>
                      <textarea 
                        className="w-full p-2 border rounded-md"
                        rows={3}
                        placeholder="Décrivez votre besoin..."
                        value={reservationData.description}
                        onChange={(e) => setReservationData(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-green-500 hover:bg-green-600 mb-4"
                    onClick={handleReservation}
                    disabled={reservationLoading}
                  >
                    {reservationLoading ? "Création en cours..." : "Réserver maintenant"}
                  </Button>

                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Contacter
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Garantie LIGUEYLU</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">Prestataires vérifiés et qualifiés</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">Tarifs transparents sans surprises</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">Paiement sécurisé</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">Support client 7j/7</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 md:py-12 bg-gray-900 text-white mt-auto">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">LIGUEYLU</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Comment ça marche
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Carrières
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Presse
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Plomberie
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Électricité
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Ménage
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Tous les services
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Prestataires</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Devenir prestataire
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Centre d'aide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Formation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Communauté
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Aide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Signaler un problème
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 LIGUEYLU. Tous droits réservés.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Conditions d'utilisation
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Politique de confidentialité
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
