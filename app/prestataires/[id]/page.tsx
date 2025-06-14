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
  // Mock data for a service provider
  const provider = {
    id: 1,
    name: "Amadou Diallo",
    service: "Plomberie",
    rating: 4.8,
    reviews: [
      {
        id: 1,
        user: "Marie Ndiaye",
        rating: 5,
        date: "15 avril 2025",
        comment:
          "Excellent travail ! Amadou a réparé ma fuite rapidement et proprement. Je recommande vivement ses services.",
        userImage: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 2,
        user: "Ousmane Sow",
        rating: 4,
        date: "2 avril 2025",
        comment: "Bon service, ponctuel et efficace. Prix raisonnable pour le travail effectué.",
        userImage: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 3,
        user: "Fatou Diop",
        rating: 5,
        date: "28 mars 2025",
        comment:
          "Amadou a installé toute la plomberie de ma nouvelle cuisine. Travail impeccable et conseils très utiles.",
        userImage: "/placeholder.svg?height=40&width=40",
      },
    ],
    price: "5 000 FCFA / heure",
    image: "/placeholder.svg?height=150&width=150",
    location: "Dakar, Sénégal",
    available: "Aujourd'hui",
    verified: true,
    memberSince: "Janvier 2023",
    completedJobs: 124,
    description:
      "Plombier professionnel avec plus de 10 ans d'expérience. Spécialisé dans les réparations, installations et dépannages d'urgence. Je travaille avec précision et propreté pour garantir votre satisfaction.",
    skills: [
      "Installation de plomberie",
      "Réparation de fuites",
      "Débouchage",
      "Chauffe-eau",
      "Robinetterie",
      "Dépannage d'urgence",
    ],
    certifications: ["Certification Professionnelle en Plomberie", "Formation Sécurité et Hygiène"],
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
                    <AvatarImage src={provider.image || "/placeholder.svg"} alt={provider.name} />
                    <AvatarFallback className="text-2xl">
                      {provider.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {provider.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1 rounded-full">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h1 className="text-2xl font-bold">{provider.name}</h1>
                      <p className="text-muted-foreground">{provider.service}</p>
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
                            className={`h-5 w-5 ${i < Math.floor(provider.rating) ? "fill-green-400 text-green-400" : "text-gray-300"}`}
                          />
                        ))}
                    </div>
                    <span className="ml-2 font-medium">{provider.rating}</span>
                    <span className="ml-1 text-muted-foreground">({provider.reviews.length} avis)</span>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="text-sm">{provider.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">Disponible {provider.available.toLowerCase()}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="text-sm">Membre depuis {provider.memberSince}</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="text-sm">{provider.completedJobs} services réalisés</span>
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
                <h2 className="text-xl font-semibold mb-4">À propos de {provider.name}</h2>
                <p className="text-muted-foreground mb-6">{provider.description}</p>

                <h3 className="text-lg font-semibold mb-3">Compétences</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {provider.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-green-50">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-lg font-semibold mb-3">Certifications</h3>
                <ul className="space-y-2">
                  {provider.certifications.map((cert, index) => (
                    <li key={index} className="flex items-center">
                      <Award className="h-5 w-5 text-green-500 mr-2" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="services" className="bg-white rounded-lg border p-6 mt-2">
                <h2 className="text-xl font-semibold mb-4">Services proposés</h2>
                <div className="grid gap-4">
                  {[
                    {
                      title: "Réparation de fuite",
                      price: "5 000 FCFA",
                      duration: "1 heure",
                      description: "Détection et réparation de fuites d'eau dans les tuyaux, robinets ou toilettes.",
                    },
                    {
                      title: "Installation de robinetterie",
                      price: "7 500 FCFA",
                      duration: "1-2 heures",
                      description: "Installation de nouveaux robinets dans la cuisine ou la salle de bain.",
                    },
                    {
                      title: "Débouchage de canalisation",
                      price: "6 000 FCFA",
                      duration: "1 heure",
                      description: "Débouchage de canalisations bouchées dans la cuisine, salle de bain ou toilettes.",
                    },
                    {
                      title: "Installation de chauffe-eau",
                      price: "15 000 FCFA",
                      duration: "3-4 heures",
                      description: "Installation complète d'un nouveau chauffe-eau, y compris le raccordement.",
                    },
                  ].map((service, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg">{service.title}</h3>
                              <p className="text-muted-foreground mt-1">{service.description}</p>
                              <div className="flex items-center mt-2">
                                <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                                <span className="text-sm">{service.duration}</span>
                              </div>
                            </div>
                            <div className="font-bold text-lg">{service.price}</div>
                          </div>
                        </div>
                        <div className="bg-green-50 p-3 text-center">
                          <Button className="bg-green-500 hover:bg-green-600 w-full">Réserver</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="bg-white rounded-lg border p-6 mt-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Avis ({provider.reviews.length})</h2>
                  <div className="flex items-center">
                    <div className="flex">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < Math.floor(provider.rating) ? "fill-green-400 text-green-400" : "text-gray-300"}`}
                          />
                        ))}
                    </div>
                    <span className="ml-2 font-medium">{provider.rating}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {provider.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-0">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={review.userImage || "/placeholder.svg"} alt={review.user} />
                          <AvatarFallback>
                            {review.user
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{review.user}</h3>
                              <div className="flex items-center mt-1">
                                <div className="flex">
                                  {Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < review.rating ? "fill-green-400 text-green-400" : "text-gray-300"}`}
                                      />
                                    ))}
                                </div>
                                <span className="text-sm text-muted-foreground ml-2">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="mt-2">{review.comment}</p>
                          <div className="flex items-center gap-4 mt-3">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              <span>Utile</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="md:w-1/3">
            <div className="sticky top-24">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Réserver un service</h2>
                  <div className="mb-4 pb-4 border-b">
                    <div className="font-bold text-2xl mb-1">{provider.price}</div>
                    <div className="text-muted-foreground">Prix de base par heure</div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">Date</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>Aujourd'hui</option>
                        <option>Demain</option>
                        <option>Après-demain</option>
                        <option>Choisir une autre date</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Heure</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>09:00</option>
                        <option>10:00</option>
                        <option>11:00</option>
                        <option>12:00</option>
                        <option>14:00</option>
                        <option>15:00</option>
                        <option>16:00</option>
                        <option>17:00</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Type de service</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>Réparation de fuite</option>
                        <option>Installation de robinetterie</option>
                        <option>Débouchage de canalisation</option>
                        <option>Installation de chauffe-eau</option>
                      </select>
                    </div>
                  </div>

                  <Button className="w-full bg-green-500 hover:bg-green-600 mb-4">Réserver maintenant</Button>

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
