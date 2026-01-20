"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { User, Building2, CreditCard, Lock } from "lucide-react"

export default function SettingsPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate save
    setTimeout(() => {
      toast({
        title: "Successo",
        description: "Profilo aggiornato con successo",
      })
      setIsLoading(false)
    }, 1000)
  }

  const handleCompanySave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      toast({
        title: "Successo",
        description: "Informazioni azienda aggiornate",
      })
      setIsLoading(false)
    }, 1000)
  }

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      toast({
        title: "Successo",
        description: "Password modificata con successo",
      })
      setIsLoading(false)
    }, 1000)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Impostazioni</h1>
        <p className="text-muted-foreground">
          Gestisci il tuo profilo e le impostazioni dell'account
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profilo
          </TabsTrigger>
          <TabsTrigger value="company">
            <Building2 className="h-4 w-4 mr-2" />
            Azienda
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="h-4 w-4 mr-2" />
            Fatturazione
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="h-4 w-4 mr-2" />
            Sicurezza
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informazioni Profilo</CardTitle>
              <CardDescription>
                Aggiorna le tue informazioni personali
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSave} className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-2xl">
                      {session?.user?.name ? getInitials(session.user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <Button type="button" variant="outline">
                    Cambia Avatar
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    defaultValue={session?.user?.name || ""}
                    placeholder="Mario Rossi"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={session?.user?.email || ""}
                    placeholder="mario.rossi@example.com"
                  />
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Salvataggio..." : "Salva Modifiche"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informazioni Azienda</CardTitle>
              <CardDescription>
                Gestisci i dati della tua azienda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCompanySave} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nome Azienda</Label>
                  <Input
                    id="companyName"
                    defaultValue={session?.user?.companyName || ""}
                    placeholder="Azienda SRL"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tenantId">Tenant ID</Label>
                  <Input
                    id="tenantId"
                    defaultValue={session?.user?.tenantId || ""}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    Il Tenant ID non può essere modificato
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Indirizzo</Label>
                  <Input
                    id="address"
                    placeholder="Via Roma 123, Milano"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vatNumber">Partita IVA</Label>
                    <Input
                      id="vatNumber"
                      placeholder="IT12345678901"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefono</Label>
                    <Input
                      id="phone"
                      placeholder="+39 02 1234 5678"
                    />
                  </div>
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Salvataggio..." : "Salva Modifiche"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Piano e Fatturazione</CardTitle>
              <CardDescription>
                Gestisci il tuo abbonamento e i metodi di pagamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">Piano Pro</h3>
                    <p className="text-sm text-muted-foreground">
                      €79/mese • Rinnovo: 20 Febbraio 2024
                    </p>
                  </div>
                  <Button variant="outline">Cambia Piano</Button>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Dipendenti</p>
                    <p className="font-medium">12 / 20</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Clienti</p>
                    <p className="font-medium">48 / Illimitati</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Storage</p>
                    <p className="font-medium">2.4GB / 10GB</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Metodi di Pagamento</h4>
                <div className="p-4 border rounded-lg flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <div>
                      <p className="font-medium">•••• 4242</p>
                      <p className="text-xs text-muted-foreground">Scade 12/25</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Modifica
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Cronologia Fatture</h4>
                <div className="space-y-2">
                  {[
                    { date: "01 Gen 2024", amount: "€79,00", status: "Pagata" },
                    { date: "01 Dic 2023", amount: "€79,00", status: "Pagata" },
                    { date: "01 Nov 2023", amount: "€79,00", status: "Pagata" },
                  ].map((invoice, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{invoice.amount}</p>
                        <p className="text-sm text-muted-foreground">{invoice.date}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-green-600">{invoice.status}</span>
                        <Button variant="ghost" size="sm">
                          Scarica
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sicurezza</CardTitle>
              <CardDescription>
                Gestisci la sicurezza del tuo account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSave} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Password Attuale</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nuova Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Conferma Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Aggiornamento..." : "Aggiorna Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
