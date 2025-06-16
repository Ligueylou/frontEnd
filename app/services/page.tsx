import Link from "next/link"
import { Search, MapPin, Shield, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: "Plomberie",
      description: "Réparations, installations et dépannages d'urgence pour tous vos problèmes de plomberie",
      image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=200&fit=crop",
      providersCount: 24,
      category: "Maison",
      popular: true,
      features: ["Dépannage 24h/7j", "Devis gratuit", "Garantie travaux"],
      icon: "🔧",
    },
    {
      id: 2,
      title: "Ménage & Nettoyage",
      description: "Services de nettoyage professionnel pour votre domicile, bureaux et espaces commerciaux",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop",
      providersCount: 45,
      category: "Entretien",
      popular: true,
      features: ["Produits écologiques", "Équipe formée", "Assurance incluse"],
      icon: "🧹",
    },
    {
      id: 3,
      title: "Électricité",
      description: "Installation électrique, dépannage et mise aux normes par des électriciens certifiés",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=200&fit=crop",
      providersCount: 18,
      category: "Maison",
      popular: false,
      features: ["Électriciens certifiés", "Mise aux normes", "Intervention rapide"],
      icon: "⚡",
    },
    {
      id: 4,
      title: "Jardinage & Paysagisme",
      description: "Entretien de jardins, taille, plantation et création d'espaces verts sur mesure",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop",
      providersCount: 16,
      category: "Extérieur",
      popular: false,
      features: ["Conseil personnalisé", "Plantes locales", "Entretien régulier"],
      icon: "🌱",
    },
    {
      id: 5,
      title: "Cuisine à Domicile",
      description: "Chefs professionnels pour vos repas quotidiens, événements et occasions spéciales",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
      providersCount: 12,
      category: "Culinaire",
      popular: true,
      features: ["Chefs expérimentés", "Cuisine locale", "Menu personnalisé"],
      icon: "👨‍🍳",
    },
    {
      id: 6,
      title: "Bricolage & Réparations",
      description: "Petits travaux, montage de meubles, réparations diverses et aménagements",
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=200&fit=crop",
      providersCount: 32,
      category: "Maison",
      popular: false,
      features: ["Multi-compétences", "Outils fournis", "Travail soigné"],
      icon: "🔨",
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

      {/* Hero Section */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nos Services à Domicile</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Découvrez notre gamme complète de services professionnels pour votre domicile et votre quotidien.
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
                placeholder="Rechercher un service"
                className="pl-10 rounded-md border-green-200 focus:border-green-500"
              />
            </div>
            <Button className="bg-green-500 hover:bg-green-600 w-full md:w-auto">Rechercher</Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Tous nos services ({services.length})</h2>
            <div className="flex gap-2">
              <Badge variant="outline">Populaires</Badge>
              <Badge variant="outline">Maison</Badge>
              <Badge variant="outline">Entretien</Badge>
              <Badge variant="outline">Extérieur</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card
                key={service.id}
                className="overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 group"
              >
                <div className="relative">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-white/90 text-gray-700 hover:bg-white">{service.category}</Badge>
                    {service.popular && <Badge className="bg-green-500 hover:bg-green-600">Populaire</Badge>}
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 rounded-full p-2 flex items-center gap-1">
                      <Users className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">{service.providersCount}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-white/90 rounded-full w-12 h-12 flex items-center justify-center text-2xl">
                      {service.icon}
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Prestataires disponibles</p>
                      <p className="font-bold text-green-600">{service.providersCount}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Avantages inclus :</p>
                      <div className="flex flex-wrap gap-1">
                        {service.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Link href={`/services/${service.id}`} className="block">
                      <Button className="w-full bg-green-500 hover:bg-green-600 group">
                        Voir les détails
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-16 bg-green-500 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Vous ne trouvez pas le service recherché ?
              </h2>
              <p className="max-w-[600px] md:text-xl/relaxed">
                Contactez-nous et nous vous aiderons à trouver le prestataire idéal pour vos besoins spécifiques.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-green-500 text-white hover:bg-green-600">Demande personnalisée</Button>
              <Button variant="outline" className="bg-white text-green-500 border-green-500 hover:bg-green-50">
                Devenir prestataire
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
