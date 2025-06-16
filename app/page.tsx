import Link from "next/link"
import { Search, MapPin, Star, Shield, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-green-500" />
            <span className="text-xl font-bold">LIGUEYLU</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-green-600">
              Accueil
            </Link>
            <Link href="/services" className="text-sm font-medium text-muted-foreground">
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
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Se connecter</Link>
            </Button>
            <Button size="sm" className="bg-green-500 hover:bg-green-600" asChild>
              <Link href="/register">S&apos;inscrire</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Trouvez des prestataires de confiance pour vos services à domicile
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  LIGUEYLU vous connecte avec des professionnels vérifiés pour tous vos besoins quotidiens.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
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
                    placeholder="Type de service"
                    className="pl-10 rounded-md border-green-200 focus:border-green-500"
                  />
                </div>
                <Button className="bg-green-500 hover:bg-green-600" asChild>
                  <Link href="/services">Rechercher</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                alt="Services à domicile au Sénégal"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                height="550"
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=550&h=550&fit=crop&crop=center"
                width="550"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nos Services</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Découvrez notre large gamme de services à domicile proposés par des professionnels vérifiés.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {[
              { icon: "🔧", title: "Plomberie", description: "Réparation et installation de systèmes de plomberie" },
              { icon: "⚡", title: "Électricité", description: "Installation et dépannage électrique" },
              { icon: "🧹", title: "Ménage", description: "Services de nettoyage professionnel" },
              { icon: "🔨", title: "Bricolage", description: "Petits travaux et réparations diverses" },
              { icon: "🌱", title: "Jardinage", description: "Entretien et aménagement d'espaces verts" },
              { icon: "👨‍🍳", title: "Cuisine", description: "Préparation de repas à domicile" },
            ].map((service, index) => (
              <Card key={index} className="transition-all hover:shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button className="bg-green-500 hover:bg-green-600" asChild>
              <Link href="/services">Voir tous les services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Comment ça marche</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                LIGUEYLU simplifie la recherche et la réservation de services à domicile de qualité.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
            {[
              {
                icon: <Search className="h-10 w-10 text-green-500" />,
                title: "Recherchez",
                description:
                  "Trouvez le service dont vous avez besoin en fonction de votre localisation et de votre budget.",
                image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop",
              },
              {
                icon: <Star className="h-10 w-10 text-green-500" />,
                title: "Choisissez",
                description: "Comparez les prestataires selon leurs évaluations, tarifs et disponibilités.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
              },
              {
                icon: <CreditCard className="h-10 w-10 text-green-500" />,
                title: "Réservez",
                description: "Réservez en toute sécurité et payez en ligne ou en personne après le service.",
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop",
              },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-full h-32 mb-4 rounded-lg overflow-hidden">
                  <img src={step.image || "/placeholder.svg"} alt={step.title} className="w-full h-full object-cover" />
                </div>
                <div className="mb-4 rounded-full bg-green-100 p-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button className="bg-green-500 hover:bg-green-600" asChild>
              <Link href="/comment-ca-marche">En savoir plus</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Témoignages</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Découvrez ce que nos utilisateurs disent de leur expérience avec LIGUEYLU.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-8">
            {[
              {
                name: "Fatou Diop",
                role: "Cliente",
                testimonial:
                  "J'ai trouvé un excellent électricien en quelques minutes. Service rapide et professionnel !",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
              },
              {
                name: "Amadou Sow",
                role: "Plombier",
                testimonial: "Grâce à LIGUEYLU, j'ai pu développer ma clientèle et augmenter mes revenus.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
              },
              {
                name: "Marie Ndiaye",
                role: "Cliente",
                testimonial:
                  "Les tarifs transparents et les évaluations m'ont aidée à choisir le bon prestataire pour mon ménage.",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full overflow-hidden">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="h-12 w-12 object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-2">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-green-400 text-green-400" />
                      ))}
                  </div>
                  <p className="text-muted-foreground">{testimonial.testimonial}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-500 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Rejoignez LIGUEYLU aujourd'hui
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Que vous soyez à la recherche de services ou que vous souhaitiez proposer vos compétences, LIGUEYLU est
                fait pour vous.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-green-500 text-white hover:bg-green-600" asChild>
                <Link href="/services">Trouver un service</Link>
              </Button>
              <Button variant="outline" className="bg-white text-green-500 border-green-500 hover:bg-green-50" asChild>
                <Link href="/register">Devenir prestataire</Link>
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
                  <Link href="/comment-ca-marche" className="text-gray-400 hover:text-white">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="/comment-ca-marche" className="text-gray-400 hover:text-white">
                    Comment ça marche
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-gray-400 hover:text-white">
                    Carrières
                  </Link>
                </li>
                <li>
                  <Link href="/comment-ca-marche" className="text-gray-400 hover:text-white">
                    Presse
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/services" className="text-gray-400 hover:text-white">
                    Plomberie
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-400 hover:text-white">
                    Électricité
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-400 hover:text-white">
                    Ménage
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-400 hover:text-white">
                    Tous les services
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Prestataires</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/register" className="text-gray-400 hover:text-white">
                    Devenir prestataire
                  </Link>
                </li>
                <li>
                  <Link href="/comment-ca-marche" className="text-gray-400 hover:text-white">
                    Centre d'aide
                  </Link>
                </li>
                <li>
                  <Link href="/comment-ca-marche" className="text-gray-400 hover:text-white">
                    Formation
                  </Link>
                </li>
                <li>
                  <Link href="/prestataires" className="text-gray-400 hover:text-white">
                    Communauté
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/comment-ca-marche" className="text-gray-400 hover:text-white">
                    Aide
                  </Link>
                </li>
                <li>
                  <Link href="/comment-ca-marche" className="text-gray-400 hover:text-white">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/comment-ca-marche" className="text-gray-400 hover:text-white">
                    Signaler un problème
                  </Link>
                </li>
              </ul>
              <div className="flex space-x-4 mt-4">
                <Link href="/comment-ca-marche" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link href="/comment-ca-marche" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link href="/comment-ca-marche" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 LIGUEYLU. Tous droits réservés.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/comment-ca-marche" className="text-gray-400 hover:text-white text-sm">
                Conditions d'utilisation
              </Link>
              <Link href="/comment-ca-marche" className="text-gray-400 hover:text-white text-sm">
                Politique de confidentialité
              </Link>
              <Link href="/comment-ca-marche" className="text-gray-400 hover:text-white text-sm">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
