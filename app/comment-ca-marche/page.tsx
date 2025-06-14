import Link from "next/link"
import { Shield, CheckCircle, Users, Clock, CreditCard, MessageCircle, Star, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function HowItWorksPage() {
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
            <Link href="/prestataires" className="text-sm font-medium text-muted-foreground">
              Prestataires
            </Link>
            <Link href="/comment-ca-marche" className="text-sm font-medium text-green-600">
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
      <section className="w-full py-12 md:py-24 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Comment fonctionne LIGUEYLU
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Découvrez comment notre plateforme simplifie la recherche et la réservation de services à domicile de
                qualité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:gap-16">
            {/* Step 1 */}
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-full bg-green-100 p-2 w-12 h-12 text-center">
                  <span className="text-green-600 font-bold text-xl">1</span>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Recherchez le service dont vous avez besoin</h2>
                  <p className="text-muted-foreground">
                    Utilisez notre moteur de recherche pour trouver le service qui correspond à vos besoins. Filtrez par
                    localisation, type de service, budget et disponibilité pour affiner vos résultats.
                  </p>
                  <ul className="space-y-2 mt-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Large gamme de services disponibles (plomberie, électricité, ménage, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Filtres avancés pour trouver exactement ce que vous cherchez</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Recherche par localisation pour des prestataires proches de chez vous</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-[500px] h-[300px] bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    alt="Recherche de services"
                    className="object-cover w-full h-full"
                    src="/placeholder.svg?height=300&width=500"
                  />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex justify-center order-last lg:order-first">
                <div className="relative w-full max-w-[500px] h-[300px] bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    alt="Comparaison de prestataires"
                    className="object-cover w-full h-full"
                    src="/placeholder.svg?height=300&width=500"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-full bg-green-100 p-2 w-12 h-12 text-center">
                  <span className="text-green-600 font-bold text-xl">2</span>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Comparez et choisissez le meilleur prestataire</h2>
                  <p className="text-muted-foreground">
                    Consultez les profils détaillés des prestataires, leurs évaluations, leurs tarifs et leurs
                    disponibilités. Choisissez celui qui correspond le mieux à vos attentes.
                  </p>
                  <ul className="space-y-2 mt-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Profils vérifiés avec photos et descriptions détaillées</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Avis et évaluations d&apos;autres clients</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Tarifs transparents affichés pour chaque service</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-full bg-green-100 p-2 w-12 h-12 text-center">
                  <span className="text-green-600 font-bold text-xl">3</span>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Réservez et payez en toute sécurité</h2>
                  <p className="text-muted-foreground">
                    Réservez le service en quelques clics, choisissez la date et l&apos;heure qui vous conviennent, et
                    payez en ligne ou en personne après la prestation.
                  </p>
                  <ul className="space-y-2 mt-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Processus de réservation simple et rapide</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Paiement sécurisé avec plusieurs options disponibles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Confirmation immédiate de votre réservation</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-[500px] h-[300px] bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    alt="Réservation et paiement"
                    className="object-cover w-full h-full"
                    src="/placeholder.svg?height=300&width=500"
                  />
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex justify-center order-last lg:order-first">
                <div className="relative w-full max-w-[500px] h-[300px] bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    alt="Service et évaluation"
                    className="object-cover w-full h-full"
                    src="/placeholder.svg?height=300&width=500"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-full bg-green-100 p-2 w-12 h-12 text-center">
                  <span className="text-green-600 font-bold text-xl">4</span>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Profitez du service et partagez votre expérience</h2>
                  <p className="text-muted-foreground">
                    Après la prestation, évaluez le service reçu et laissez un commentaire pour aider les autres
                    utilisateurs à faire leur choix.
                  </p>
                  <ul className="space-y-2 mt-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Système d&apos;évaluation simple et efficace</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Possibilité de laisser des commentaires détaillés</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Contribuez à améliorer la qualité des services sur la plateforme</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="w-full py-12 md:py-24 bg-green-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Les avantages de LIGUEYLU</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Découvrez pourquoi des milliers d&apos;utilisateurs font confiance à notre plateforme.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <CheckCircle className="h-10 w-10 text-green-500" />,
                title: "Prestataires vérifiés",
                description:
                  "Tous nos prestataires sont soigneusement vérifiés et doivent respecter nos normes de qualité.",
              },
              {
                icon: <CreditCard className="h-10 w-10 text-green-500" />,
                title: "Tarifs transparents",
                description: "Les tarifs sont clairement affichés pour chaque service, sans frais cachés ni surprises.",
              },
              {
                icon: <Clock className="h-10 w-10 text-green-500" />,
                title: "Gain de temps",
                description: "Trouvez rapidement le prestataire idéal sans passer des heures à chercher et à comparer.",
              },
              {
                icon: <Star className="h-10 w-10 text-green-500" />,
                title: "Service de qualité",
                description:
                  "Notre système d'évaluation garantit que vous recevez toujours un service de haute qualité.",
              },
              {
                icon: <MessageCircle className="h-10 w-10 text-green-500" />,
                title: "Communication facile",
                description: "Communiquez directement avec les prestataires pour discuter de vos besoins spécifiques.",
              },
              {
                icon: <Users className="h-10 w-10 text-green-500" />,
                title: "Communauté active",
                description: "Rejoignez une communauté grandissante d'utilisateurs et de prestataires de services.",
              },
            ].map((benefit, index) => (
              <Card key={index} className="transition-all hover:shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-green-100 p-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Reviews Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Donnez votre avis sur LIGUEYLU</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Votre opinion compte ! Partagez votre expérience avec notre plateforme et aidez-nous à nous améliorer.
              </p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Review Form */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Laissez votre avis</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nom</Label>
                      <Input id="name" placeholder="Votre nom" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="votre@email.com" />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Note générale</Label>
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="text-gray-300 hover:text-yellow-400 transition-colors"
                        >
                          <Star className="h-6 w-6 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="review">Votre commentaire</Label>
                    <Textarea
                      id="review"
                      placeholder="Partagez votre expérience avec LIGUEYLU..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
                    <Send className="h-4 w-4 mr-2" />
                    Publier mon avis
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Avis récents</h3>

              {[
                {
                  name: "Aminata Diallo",
                  rating: 5,
                  date: "Il y a 2 jours",
                  comment:
                    "Excellente plateforme ! J'ai trouvé un plombier très compétent en quelques minutes. Le processus est simple et les prestataires sont vraiment professionnels.",
                  avatar: "/placeholder.svg?height=40&width=40",
                },
                {
                  name: "Moussa Sarr",
                  rating: 4,
                  date: "Il y a 1 semaine",
                  comment:
                    "Très pratique pour trouver des services à domicile. L'interface est intuitive et les avis des autres utilisateurs m'ont aidé à faire le bon choix.",
                  avatar: "/placeholder.svg?height=40&width=40",
                },
                {
                  name: "Khadija Ndiaye",
                  rating: 5,
                  date: "Il y a 2 semaines",
                  comment:
                    "Je recommande LIGUEYLU ! Grâce à cette plateforme, j'ai pu trouver une femme de ménage de confiance. Le système de vérification des prestataires est rassurant.",
                  avatar: "/placeholder.svg?height=40&width=40",
                },
              ].map((review, index) => (
                <Card key={index} className="p-4">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                      <AvatarFallback>
                        {review.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{review.name}</h4>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex mb-2">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  </div>
                </Card>
              ))}

              <div className="text-center">
                <Button variant="outline">Voir tous les avis</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Questions fréquentes</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Vous avez des questions ? Consultez nos réponses aux questions les plus fréquemment posées.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Comment puis-je m&apos;inscrire sur LIGUEYLU ?</AccordionTrigger>
                <AccordionContent>
                  L&apos;inscription sur LIGUEYLU est simple et gratuite. Cliquez sur le bouton
                  &quot;S&apos;inscrire&quot; en haut à droite de la page, remplissez le formulaire avec vos
                  informations personnelles, vérifiez votre adresse e-mail et votre compte sera créé.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Comment sont vérifiés les prestataires ?</AccordionTrigger>
                <AccordionContent>
                  Tous les prestataires passent par un processus de vérification rigoureux qui comprend la vérification
                  de leur identité, de leurs qualifications professionnelles et de leurs antécédents. Nous effectuons
                  également des entretiens et des formations pour garantir qu&apos;ils respectent nos normes de qualité.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Comment fonctionne le système de paiement ?</AccordionTrigger>
                <AccordionContent>
                  LIGUEYLU propose plusieurs options de paiement sécurisées. Vous pouvez payer en ligne lors de la
                  réservation ou choisir de payer en personne après la prestation. Dans tous les cas, le paiement
                  n&apos;est libéré au prestataire qu&apos;une fois le service effectué et votre satisfaction confirmée.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Que faire en cas de problème avec un prestataire ?</AccordionTrigger>
                <AccordionContent>
                  Si vous rencontrez un problème avec un prestataire, contactez immédiatement notre service client via
                  la section &quot;Aide&quot; de votre compte. Nous prendrons en charge votre demande et travaillerons à
                  résoudre le problème rapidement. Notre garantie de satisfaction vous protège en cas de service
                  insatisfaisant.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Comment devenir prestataire sur LIGUEYLU ?</AccordionTrigger>
                <AccordionContent>
                  Pour devenir prestataire, cliquez sur &quot;Devenir prestataire&quot; sur notre site, remplissez le
                  formulaire avec vos informations professionnelles et vos compétences. Après soumission, nous
                  examinerons votre candidature et vous contacterons pour la suite du processus de vérification et
                  d&apos;intégration.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>Les services sont-ils garantis ?</AccordionTrigger>
                <AccordionContent>
                  Oui, tous les services réservés via LIGUEYLU sont couverts par notre garantie de satisfaction. Si le
                  service ne répond pas à vos attentes, nous travaillerons avec vous pour résoudre le problème, que ce
                  soit par une nouvelle prestation ou un remboursement partiel ou total selon la situation.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-green-500 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Prêt à essayer LIGUEYLU ?</h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Rejoignez des milliers d&apos;utilisateurs satisfaits et trouvez le service dont vous avez besoin dès
                aujourd&apos;hui.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-white text-green-500 hover:bg-green-50" asChild>
                <Link href="/services">Trouver un service</Link>
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-green-600" asChild>
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
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 LIGUEYLU. Tous droits réservés.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/comment-ca-marche" className="text-gray-400 hover:text-white text-sm">
                Conditions d&apos;utilisation
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
