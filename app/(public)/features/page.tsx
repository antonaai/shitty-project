"use client"

import { useEffect } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  Building2,
  Calendar,
  TrendingUp,
  Shield,
  Clock,
  Bell,
  FileText,
  Search,
  Download,
  Smartphone,
  Zap,
} from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

export default function FeaturesPage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    })
  }, [])

  const features = [
    {
      icon: Users,
      title: "Gestione Dipendenti",
      description:
        "Gestisci tutti i tuoi dipendenti con profili completi, ruoli, contatti e storico delle attività.",
    },
    {
      icon: Building2,
      title: "Database Clienti",
      description:
        "Organizza i clienti con informazioni dettagliate, stato (attivo, lead, inattivo) e storico interazioni.",
    },
    {
      icon: Calendar,
      title: "Sistema Appuntamenti",
      description:
        "Pianifica, assegna e traccia appuntamenti con clienti. Vista calendario e notifiche integrate.",
    },
    {
      icon: TrendingUp,
      title: "Analytics e KPI",
      description:
        "Dashboard con metriche in tempo reale: ricavi, costi, profitto, e grafici personalizzabili.",
    },
    {
      icon: Shield,
      title: "Multi-tenant Sicuro",
      description:
        "Architettura multi-tenant con isolamento dati completo. I tuoi dati sono sempre protetti.",
    },
    {
      icon: Clock,
      title: "Real-time Sync",
      description:
        "Aggiornamenti in tempo reale su tutti i dispositivi. Il team sempre sincronizzato.",
    },
    {
      icon: Bell,
      title: "Notifiche",
      description:
        "Ricevi notifiche per nuovi appuntamenti, scadenze e aggiornamenti importanti.",
    },
    {
      icon: FileText,
      title: "Report Dettagliati",
      description:
        "Genera report personalizzati su dipendenti, clienti, appuntamenti e performance.",
    },
    {
      icon: Search,
      title: "Ricerca Avanzata",
      description:
        "Trova rapidamente dipendenti, clienti e appuntamenti con filtri potenti.",
    },
    {
      icon: Download,
      title: "Esportazione Dati",
      description:
        "Esporta i tuoi dati in CSV, Excel o PDF per analisi esterne e backup.",
    },
    {
      icon: Smartphone,
      title: "Mobile Responsive",
      description:
        "Interfaccia completamente responsive. Gestisci la tua azienda da qualsiasi dispositivo.",
    },
    {
      icon: Zap,
      title: "Veloce e Performante",
      description:
        "Ottimizzato per le massime prestazioni. Caricamenti rapidi e interfaccia fluida.",
    },
  ]

  return (
    <div className="py-20">
      <div className="container">
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tutto ciò di cui hai bisogno
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Una suite completa di strumenti per gestire la tua azienda in modo
            efficiente e professionale
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="hover:shadow-lg transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <CardHeader>
                  <Icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>

        <div className="mt-20 bg-muted/50 rounded-lg p-12 text-center" data-aos="zoom-in">
          <h2 className="text-3xl font-bold mb-4">E molto altro...</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Continuiamo ad aggiungere nuove funzionalità ogni mese in base ai
            feedback dei nostri utenti.
          </p>
        </div>
      </div>
    </div>
  )
}
