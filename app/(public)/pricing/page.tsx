"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    })
  }, [])

  const plans = [
    {
      name: "Basic",
      description: "Perfetto per piccole aziende",
      priceMonthly: 29,
      priceYearly: 290,
      features: [
        "Fino a 5 dipendenti",
        "Fino a 50 clienti",
        "Appuntamenti illimitati",
        "Dashboard analytics base",
        "Supporto email",
        "1GB di storage",
      ],
    },
    {
      name: "Pro",
      description: "Ideale per aziende in crescita",
      priceMonthly: 79,
      priceYearly: 790,
      popular: true,
      features: [
        "Fino a 20 dipendenti",
        "Clienti illimitati",
        "Appuntamenti illimitati",
        "Analytics avanzati",
        "Supporto prioritario",
        "10GB di storage",
        "Esportazione dati",
        "Integrazioni API",
      ],
    },
    {
      name: "Enterprise",
      description: "Per grandi organizzazioni",
      priceMonthly: 199,
      priceYearly: 1990,
      features: [
        "Dipendenti illimitati",
        "Clienti illimitati",
        "Appuntamenti illimitati",
        "Analytics personalizzati",
        "Account manager dedicato",
        "Storage illimitato",
        "White label",
        "API personalizzate",
        "SLA garantito 99.9%",
      ],
    },
  ]

  return (
    <div className="py-20">
      <div className="container">
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Prezzi semplici e trasparenti
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Scegli il piano perfetto per le tue esigenze
          </p>

          <div className="inline-flex items-center rounded-lg border p-1">
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                billingPeriod === "monthly"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setBillingPeriod("monthly")}
            >
              Mensile
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                billingPeriod === "yearly"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setBillingPeriod("yearly")}
            >
              Annuale
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded">
                Risparmia 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={plan.popular ? "border-primary shadow-xl scale-105" : ""}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {plan.popular && (
                <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold rounded-t-lg">
                  Più Popolare
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold">
                    €{billingPeriod === "monthly" ? plan.priceMonthly : plan.priceYearly}
                  </span>
                  <span className="text-muted-foreground">
                    /{billingPeriod === "monthly" ? "mese" : "anno"}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/login" className="block">
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Inizia ora
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center text-muted-foreground" data-aos="fade-up">
          <p>Tutti i piani includono 14 giorni di prova gratuita. Nessuna carta di credito richiesta.</p>
        </div>
      </div>
    </div>
  )
}
