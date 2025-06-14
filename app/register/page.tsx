import Link from "next/link"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full border-b bg-white">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-green-500" />
            <span className="text-xl font-bold">LIGUEYLU</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="container px-4 md:px-6 flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Créer un compte</CardTitle>
              <CardDescription>Inscrivez-vous pour accéder à tous les services de LIGUEYLU</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="client" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="client">Client</TabsTrigger>
                  <TabsTrigger value="provider">Prestataire</TabsTrigger>
                </TabsList>
                <TabsContent value="client">
                  <form>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">Prénom</Label>
                          <Input
                            id="first-name"
                            placeholder="Prénom"
                            required
                            className="border-green-200 focus:border-green-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Nom</Label>
                          <Input
                            id="last-name"
                            placeholder="Nom"
                            required
                            className="border-green-200 focus:border-green-500"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          placeholder="exemple@email.com"
                          type="email"
                          required
                          className="border-green-200 focus:border-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          placeholder="77 123 45 67"
                          type="tel"
                          required
                          className="border-green-200 focus:border-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input
                          id="password"
                          type="password"
                          required
                          className="border-green-200 focus:border-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          required
                          className="border-green-200 focus:border-green-500"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" required />
                        <Label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          J&apos;accepte les{" "}
                          <Link href="#" className="text-green-600 hover:text-green-700">
                            conditions d&apos;utilisation
                          </Link>{" "}
                          et la{" "}
                          <Link href="#" className="text-green-600 hover:text-green-700">
                            politique de confidentialité
                          </Link>
                        </Label>
                      </div>
                      <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
                        S&apos;inscrire
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                <TabsContent value="provider">
                  <form>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="provider-first-name">Prénom</Label>
                          <Input
                            id="provider-first-name"
                            placeholder="Prénom"
                            required
                            className="border-green-200 focus:border-green-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="provider-last-name">Nom</Label>
                          <Input
                            id="provider-last-name"
                            placeholder="Nom"
                            required
                            className="border-green-200 focus:border-green-500"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="provider-email">Email</Label>
                        <Input
                          id="provider-email"
                          placeholder="exemple@email.com"
                          type="email"
                          required
                          className="border-green-200 focus:border-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="provider-phone">Téléphone</Label>
                        <Input
                          id="provider-phone"
                          placeholder="77 123 45 67"
                          type="tel"
                          required
                          className="border-green-200 focus:border-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service-type">Type de service</Label>
                        <select
                          id="service-type"
                          className="w-full p-2 border rounded-md border-green-200 focus:border-green-500"
                          required
                        >
                          <option value="">Sélectionnez un service</option>
                          <option value="plumbing">Plomberie</option>
                          <option value="electricity">Électricité</option>
                          <option value="cleaning">Ménage</option>
                          <option value="handyman">Bricolage</option>
                          <option value="gardening">Jardinage</option>
                          <option value="cooking">Cuisine</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="provider-password">Mot de passe</Label>
                        <Input
                          id="provider-password"
                          type="password"
                          required
                          className="border-green-200 focus:border-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="provider-confirm-password">Confirmer le mot de passe</Label>
                        <Input
                          id="provider-confirm-password"
                          type="password"
                          required
                          className="border-green-200 focus:border-green-500"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="provider-terms" required />
                        <Label
                          htmlFor="provider-terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          J&apos;accepte les{" "}
                          <Link href="#" className="text-green-600 hover:text-green-700">
                            conditions d&apos;utilisation
                          </Link>{" "}
                          et la{" "}
                          <Link href="#" className="text-green-600 hover:text-green-700">
                            politique de confidentialité
                          </Link>
                        </Label>
                      </div>
                      <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
                        S&apos;inscrire comme prestataire
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">Ou continuer avec</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
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
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  Facebook
                </Button>
                <Button variant="outline" className="w-full">
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
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  Twitter
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm">
                Vous avez déjà un compte?{" "}
                <Link href="/login" className="text-green-600 hover:text-green-700 font-medium">
                  Se connecter
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="w-full py-6 bg-white border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2025 LIGUEYLU. Tous droits réservés.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-muted-foreground hover:text-green-600">
                Conditions d&apos;utilisation
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-green-600">
                Politique de confidentialité
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-green-600">
                Aide
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
