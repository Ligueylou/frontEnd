import Link from "next/link"
import { Search, MapPin, Star, Clock, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProvidersPage() {
  const providers = [
    {
      id: 1,
      name: "Amadou Diallo",
      service: "Plomberie",
      rating: 4.8,
      reviews: 56,
      image: "/placeholder.svg?height=80&width=80",
      location: "Dakar Centre",
      available: "Aujourd'hui",
      verified: true,
      experience: "10 ans",
      completedJobs: 124,
      specialties: ["Réparation fuites", "Installation", "Dépannage urgence"],
    },
    {
      id: 2,
      name: "Fatou Sow",
      service: "Ménage",
      rating: 4.9,
      reviews: 124,
      image: "/placeholder.svg?height=80&width=80",
      location: "Plateau",
      available: "Demain",
      verified: true,
      experience: "7 ans",
      completedJobs: 89,
      specialties: ["Nettoyage professionnel", "Repassage", "Entretien"],
    },
    {
      id: 3,
      name: "Ousmane Ndiaye",
      service: "Électricité",
      rating: 4.7,
      reviews: 89,
      image: "/placeholder.svg?height=80&width=80",
      location: "Almadies",
      available: "Aujourd'hui",
      verified: true,
      experience: "12 ans",
      completedJobs: 156,
      specialties: ["Installation électrique", "Dépannage", "Mise aux normes"],
    },
    {
      id: 4,
      name: "Aïda Mbaye",
      service: "Cuisine",
      rating: 4.9,
      reviews: 76,
      image: "/placeholder.svg?height=80&width=80",
      location: "Mermoz",
      available: "Ce weekend",
      verified: true,
      experience: "8 ans",
      completedJobs: 67,
      specialties: ["Cuisine sénégalaise", "Pâtisserie", "Événements"],
    },
    {
      id: 5,
      name: "Ibrahima Gueye",
      service: "Bricolage",
      rating: 4.6,
      reviews: 42,
      image: "/placeholder.svg?height=80&width=80",
      location: "Parcelles",
      available: "Aujourd'hui",
      verified: true,
      experience: "6 ans",
      completedJobs: 78,
      specialties: ["Montage meubles", "Réparations", "Peinture"],
    },
    {
      id: 6,
      name: "Mariama Diop",
      service: "Jardinage",
      rating: 4.8,
      reviews: 31,
      image: "/placeholder.svg?height=80&width=80",
      location: "Yoff",
      available: "Demain",
      verified: true,
      experience: "9 ans",
      completedJobs: 45,
      specialties: ["Entretien jardins", "Plantation", "Taille"],
    },
  ]

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

      {/* Hero Section */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nos Prestataires Vérifiés</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Découvrez des professionnels qualifiés et vérifiés pour tous vos besoins à domicile.
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center mt-8 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Votre localisation"
                className="pl-10 rounded-md border-green-200 focus:border-green-500"
              />
            </div>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Nom ou service"
                className="pl-10 rounded-md border-green-200 focus:border-green-500"
              />
            </div>
            <Button className="bg-green-500 hover:bg-green-600 w-full md:w-auto">Rechercher</Button>
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6 py-6 md:py-10 flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-24 bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Filtres</h3>
              <Button variant="ghost" size="sm" className="text-green-500 h-auto p-0">
                Réinitialiser
              </Button>
            </div>

            <div className="space-y-6">
              {/* Service Filter */}
              <div>
                <h4 className="font-medium mb-2">Service</h4>
                <div className="space-y-2">
                  {["Plomberie", "Électricité", "Ménage", "Bricolage", "Jardinage", "Cuisine"].map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox id={`service-${service}`} />
                      <label
                        htmlFor={`service-${service}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {service}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}

              {/* Rating Filter */}
              <div>
                <h4 className="font-medium mb-2">Évaluation</h4>
                <div className="space-y-2">
                  {[5, 4, 3, 2].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox id={`rating-${rating}`} />
                      <label
                        htmlFor={`rating-${rating}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                      >
                        {Array(rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-green-400 text-green-400" />
                          ))}
                        {Array(5 - rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-gray-300" />
                          ))}
                        <span className="ml-1">et plus</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <h4 className="font-medium mb-2">Expérience</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="exp-1-3" />
                    <label htmlFor="exp-1-3" className="text-sm font-medium">
                      1-3 ans
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="exp-3-5" />
                    <label htmlFor="exp-3-5" className="text-sm font-medium">
                      3-5 ans
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="exp-5-10" />
                    <label htmlFor="exp-5-10" className="text-sm font-medium">
                      5-10 ans
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="exp-10plus" />
                    <label htmlFor="exp-10plus" className="text-sm font-medium">
                      10+ ans
                    </label>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div>
                <h4 className="font-medium mb-2">Disponibilité</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="availability-today" />
                    <label htmlFor="availability-today" className="text-sm font-medium">
                      Aujourd&apos;hui
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="availability-tomorrow" />
                    <label htmlFor="availability-tomorrow" className="text-sm font-medium">
                      Demain
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="availability-weekend" />
                    <label htmlFor="availability-weekend" className="text-sm font-medium">
                      Ce weekend
                    </label>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-green-500 hover:bg-green-600">Appliquer les filtres</Button>
            </div>
          </div>
        </aside>

        {/* Providers Listings */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Prestataires ({providers.length})</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Trier par:</span>
              <Select defaultValue="recommended">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommandés</SelectItem>
                  <SelectItem value="rating">Mieux notés</SelectItem>
                  <SelectItem value="experience">Plus expérimentés</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {providers.map((provider) => (
              <Card key={provider.id} className="overflow-hidden transition-all hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex gap-4">
                      <div className="relative">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={provider.image || "/placeholder.svg"} alt={provider.name} />
                          <AvatarFallback className="text-lg">
                            {provider.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {provider.verified && (
                          <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full">
                            <Shield className="h-3 w-3" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">{provider.name}</h3>
                            <p className="text-green-600 font-medium">{provider.service}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{provider.location}</span>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-green-600">
                            {provider.experience}
                          </Badge>
                        </div>

                        <div className="flex items-center mt-2">
                          <div className="flex">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < Math.floor(provider.rating) ? "fill-green-400 text-green-400" : "text-gray-300"}`}
                                />
                              ))}
                          </div>
                          <span className="ml-1 text-sm font-medium">{provider.rating}</span>
                          <span className="ml-1 text-sm text-muted-foreground">({provider.reviews} avis)</span>
                        </div>

                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm text-muted-foreground">{provider.completedJobs} services</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-sm text-green-600">
                              Disponible {provider.available.toLowerCase()}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {provider.specialties.slice(0, 2).map((specialty, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                          {provider.specialties.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{provider.specialties.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end items-center mt-4 pt-4 border-t">
                      <Link href={`/prestataires/${provider.id}`}>
                        <Button className="bg-green-500 hover:bg-green-600">Voir le profil</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Charger plus de prestataires
            </Button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="w-full py-12 bg-green-500 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Vous êtes un professionnel ?</h2>
              <p className="max-w-[600px] md:text-xl/relaxed">
                Rejoignez notre réseau de prestataires vérifiés et développez votre activité avec LIGUEYLU.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-white text-green-500 hover:bg-green-50">Devenir prestataire</Button>
              <Button variant="outline" className="text-white border-white hover:bg-green-600">
                En savoir plus
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 md:py-12 bg-gray-900 text-white">
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
