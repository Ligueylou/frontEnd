import Link from "next/link"
import { Shield, Star, MapPin, Clock, CheckCircle, ArrowLeft, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const serviceId = Number.parseInt(id)

  // Mock data for different services
  const services = {
    1: {
      id: 1,
      title: "Plomberie",
      description:
        "Services de plomberie professionnels pour tous vos besoins : réparations, installations, dépannages d'urgence et maintenance. Nos plombiers certifiés interviennent rapidement avec du matériel de qualité.",
      image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&h=400&fit=crop",
      category: "Maison",
      features: [
        "Dépannage 24h/7j disponible",
        "Devis gratuit et sans engagement",
        "Garantie sur tous les travaux",
        "Matériel de qualité professionnelle",
        "Intervention dans toute la région",
        "Paiement après service rendu",
      ],
      subServices: [
        "Réparation de fuites",
        "Installation de robinetterie",
        "Débouchage de canalisations",
        "Installation de chauffe-eau",
        "Rénovation salle de bain",
        "Dépannage d'urgence",
      ],
    },
    2: {
      id: 2,
      title: "Ménage & Nettoyage",
      description:
        "Services de nettoyage professionnel pour votre domicile, bureaux et espaces commerciaux. Nos équipes formées utilisent des produits écologiques et des techniques modernes pour un résultat impeccable.",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop",
      category: "Entretien",
      features: [
        "Produits écologiques certifiés",
        "Équipe formée et assurée",
        "Matériel professionnel fourni",
        "Horaires flexibles",
        "Service régulier ou ponctuel",
        "Satisfaction garantie",
      ],
      subServices: [
        "Ménage régulier",
        "Grand nettoyage",
        "Nettoyage après travaux",
        "Nettoyage de vitres",
        "Repassage",
        "Nettoyage de bureaux",
      ],
    },
    3: {
      id: 3,
      title: "Électricité",
      description:
        "Installation électrique, dépannage et mise aux normes par des électriciens certifiés. Nous intervenons pour tous vos besoins électriques en respectant les normes de sécurité en vigueur.",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop",
      category: "Maison",
      features: [
        "Électriciens certifiés",
        "Mise aux normes électriques",
        "Intervention rapide",
        "Diagnostic gratuit",
        "Matériel aux normes",
        "Garantie décennale",
      ],
      subServices: [
        "Installation électrique",
        "Dépannage électrique",
        "Mise aux normes",
        "Installation éclairage",
        "Tableau électrique",
        "Prise et interrupteur",
      ],
    },
    4: {
      id: 4,
      title: "Jardinage & Paysagisme",
      description:
        "Entretien de jardins, taille, plantation et création d'espaces verts sur mesure. Nos jardiniers expérimentés transforment et entretiennent vos espaces extérieurs avec passion.",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
      category: "Extérieur",
      features: [
        "Conseil personnalisé",
        "Plantes locales adaptées",
        "Entretien régulier",
        "Création d'espaces verts",
        "Taille professionnelle",
        "Respect de l'environnement",
      ],
      subServices: [
        "Tonte de pelouse",
        "Taille d'arbres",
        "Plantation",
        "Arrosage automatique",
        "Création de jardins",
        "Entretien espaces verts",
      ],
    },
    5: {
      id: 5,
      title: "Cuisine à Domicile",
      description:
        "Chefs professionnels pour vos repas quotidiens, événements et occasions spéciales. Découvrez la cuisine sénégalaise authentique et internationale préparée chez vous.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      category: "Culinaire",
      features: [
        "Chefs expérimentés",
        "Cuisine locale et internationale",
        "Menu personnalisé",
        "Ingrédients frais",
        "Service à domicile",
        "Événements spéciaux",
      ],
      subServices: [
        "Repas quotidiens",
        "Cuisine sénégalaise",
        "Événements privés",
        "Cours de cuisine",
        "Pâtisserie",
        "Buffets",
      ],
    },
    6: {
      id: 6,
      title: "Bricolage & Réparations",
      description:
        "Petits travaux, montage de meubles, réparations diverses et aménagements. Nos bricoleurs polyvalents s'occupent de tous vos petits travaux avec précision et efficacité.",
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop",
      category: "Maison",
      features: [
        "Multi-compétences",
        "Outils professionnels fournis",
        "Travail soigné",
        "Devis transparent",
        "Intervention rapide",
        "Petits et gros travaux",
      ],
      subServices: [
        "Montage de meubles",
        "Réparations diverses",
        "Peinture",
        "Pose de étagères",
        "Petite maçonnerie",
        "Aménagement intérieur",
      ],
    },
  }

  // Get the service or default to plomberie
  const service = services[serviceId as keyof typeof services] || services[1]

  // Mock data for providers
  const providers = [
    {
      id: 1,
      name: "Amadou Diallo",
      rating: 4.8,
      reviews: 56,
      image: "/placeholder.svg?height=80&width=80",
      location: "Dakar Centre",
      available: "Aujourd'hui",
      verified: true,
      specialties: ["Réparation fuites", "Installation"],
      experience: "10 ans",
    },
    {
      id: 2,
      name: "Ousmane Ndiaye",
      rating: 4.9,
      reviews: 89,
      image: "/placeholder.svg?height=80&width=80",
      location: "Plateau",
      available: "Demain",
      verified: true,
      specialties: ["Dépannage urgence", "Chauffe-eau"],
      experience: "8 ans",
    },
    {
      id: 3,
      name: "Ibrahima Sow",
      rating: 4.7,
      reviews: 42,
      image: "/placeholder.svg?height=80&width=80",
      location: "Almadies",
      available: "Aujourd'hui",
      verified: true,
      specialties: ["Rénovation", "Installation"],
      experience: "12 ans",
    },
    {
      id: 4,
      name: "Moussa Diop",
      rating: 4.6,
      reviews: 38,
      image: "/placeholder.svg?height=80&width=80",
      location: "Parcelles",
      available: "Ce weekend",
      verified: true,
      specialties: ["Débouchage", "Réparation"],
      experience: "6 ans",
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
            <Link href="/services" className="text-sm font-medium text-green-600">
              Services
            </Link>
            <Link href="/prestataires" className="text-sm font-medium text-muted-foreground">
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

      {/* Breadcrumb */}
      <div className="container px-4 md:px-6 py-4">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/services" className="flex items-center gap-2 text-green-600 hover:text-green-700">
            <ArrowLeft className="h-4 w-4" />
            Retour aux services
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">{service.title}</span>
        </div>
      </div>

      {/* Service Detail Section */}
      <section className="w-full py-8 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div>
                <Badge className="bg-green-500 hover:bg-green-600 mb-4">{service.category}</Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{service.title}</h1>
                <p className="text-muted-foreground mt-4 text-lg">{service.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border">
                  <div className="text-2xl font-bold text-green-600">{providers.length}</div>
                  <div className="text-sm text-muted-foreground">Prestataires disponibles</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Avantages inclus :</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <img
                src={service.image || "/placeholder.svg"}
                alt={service.title}
                className="rounded-xl shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sub-services */}
      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6">Services spécialisés</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {service.subServices.map((subService, index) => (
              <Card key={index} className="text-center p-4 hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="text-sm font-medium">{subService}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Providers List */}
      <section className="w-full py-12 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold">Prestataires disponibles ({providers.length})</h2>
              <p className="text-muted-foreground">Choisissez le professionnel qui correspond à vos besoins</p>
            </div>
            <div className="flex items-center gap-4">
              <Select defaultValue="recommended">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommandés</SelectItem>
                  <SelectItem value="price-low">Prix croissant</SelectItem>
                  <SelectItem value="price-high">Prix décroissant</SelectItem>
                  <SelectItem value="rating">Mieux notés</SelectItem>
                  <SelectItem value="availability">Disponibilité</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {providers.map((provider) => (
              <Card key={provider.id} className="overflow-hidden transition-all hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex gap-4">
                      <div className="relative">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={provider.image || "/placeholder.svg"} alt={provider.name} />
                          <AvatarFallback>
                            {provider.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {provider.verified && (
                          <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full">
                            <CheckCircle className="h-3 w-3" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">{provider.name}</h3>
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

                        <div className="flex flex-wrap gap-1 mt-2">
                          {provider.specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm text-green-600">Disponible {provider.available.toLowerCase()}</span>
                        </div>
                      </div>
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
              Voir plus de prestataires
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 bg-green-500 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Besoin d'aide pour choisir ?</h2>
              <p className="max-w-[600px] md:text-xl/relaxed">
                Nos conseillers sont là pour vous aider à trouver le prestataire idéal selon vos besoins et votre
                budget.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-green-500 text-white hover:bg-green-600">Demander conseil</Button>
              <Button variant="outline" className="bg-white text-green-500 border-green-500 hover:bg-green-50">
                Appeler maintenant
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
