"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Building2, TrendingUp, Clock, Shield } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

export default function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out",
    })
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Gestisci la tua azienda con{" "}
              <span className="text-primary">semplicità</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              La piattaforma all-in-one per gestire dipendenti, clienti e
              appuntamenti. Tutto in un unico posto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto">
                  Inizia Gratis
                </Button>
              </Link>
              <Link href="/features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Scopri di più
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tutto ciò di cui hai bisogno
            </h2>
            <p className="text-xl text-muted-foreground">
              Funzionalità pensate per semplificare il tuo lavoro quotidiano
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card data-aos="fade-up" data-aos-delay="100">
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Gestione Dipendenti</CardTitle>
                <CardDescription>
                  Tieni traccia di tutti i tuoi dipendenti, ruoli e informazioni
                  di contatto in un unico posto
                </CardDescription>
              </CardHeader>
            </Card>

            <Card data-aos="fade-up" data-aos-delay="200">
              <CardHeader>
                <Building2 className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Database Clienti</CardTitle>
                <CardDescription>
                  Organizza i tuoi clienti, gestisci lead e mantieni relazioni
                  professionali
                </CardDescription>
              </CardHeader>
            </Card>

            <Card data-aos="fade-up" data-aos-delay="300">
              <CardHeader>
                <Calendar className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Appuntamenti</CardTitle>
                <CardDescription>
                  Pianifica e gestisci appuntamenti con clienti, assegna dipendenti
                  e traccia lo stato
                </CardDescription>
              </CardHeader>
            </Card>

            <Card data-aos="fade-up" data-aos-delay="400">
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Analytics e KPI</CardTitle>
                <CardDescription>
                  Visualizza ricavi, costi e profitti con grafici intuitivi e
                  report dettagliati
                </CardDescription>
              </CardHeader>
            </Card>

            <Card data-aos="fade-up" data-aos-delay="500">
              <CardHeader>
                <Clock className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Real-time Updates</CardTitle>
                <CardDescription>
                  Aggiornamenti in tempo reale per mantenere il team sempre
                  sincronizzato
                </CardDescription>
              </CardHeader>
            </Card>

            <Card data-aos="fade-up" data-aos-delay="600">
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Multi-tenant Sicuro</CardTitle>
                <CardDescription>
                  I tuoi dati sono isolati e protetti con la massima sicurezza
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Teaser Section */}
      <section className="py-20 bg-muted/20">
        <div className="container">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prezzi trasparenti
            </h2>
            <p className="text-xl text-muted-foreground">
              Scegli il piano perfetto per la tua azienda
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card data-aos="fade-up" data-aos-delay="100">
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <CardDescription>Per piccole aziende</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">€29</span>
                  <span className="text-muted-foreground">/mese</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Fino a 5 dipendenti</li>
                  <li>✓ 50 clienti</li>
                  <li>✓ Appuntamenti illimitati</li>
                  <li>✓ Supporto email</li>
                </ul>
              </CardContent>
            </Card>

            <Card
              className="border-primary shadow-lg scale-105"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>Per aziende in crescita</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">€79</span>
                  <span className="text-muted-foreground">/mese</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Fino a 20 dipendenti</li>
                  <li>✓ Clienti illimitati</li>
                  <li>✓ Analytics avanzati</li>
                  <li>✓ Supporto prioritario</li>
                </ul>
              </CardContent>
            </Card>

            <Card data-aos="fade-up" data-aos-delay="300">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>Per grandi organizzazioni</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">€199</span>
                  <span className="text-muted-foreground">/mese</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Dipendenti illimitati</li>
                  <li>✓ Clienti illimitati</li>
                  <li>✓ API personalizzate</li>
                  <li>✓ Account manager dedicato</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12" data-aos="fade-up">
            <Link href="/pricing">
              <Button size="lg" variant="outline">
                Vedi tutti i piani
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div
            className="max-w-3xl mx-auto text-center bg-primary text-primary-foreground rounded-lg p-12"
            data-aos="zoom-in"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto per iniziare?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Unisciti a centinaia di aziende che stanno già semplificando la
              loro gestione
            </p>
            <Link href="/login">
              <Button size="lg" variant="secondary">
                Inizia ora gratuitamente
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
