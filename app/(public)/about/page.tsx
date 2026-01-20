"use client"

import { useEffect } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import AOS from "aos"
import "aos/dist/aos.css"

export default function AboutPage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    })
  }, [])

  const faqs = [
    {
      question: "Come funziona la prova gratuita?",
      answer:
        "Offriamo 14 giorni di prova gratuita su tutti i piani. Non è richiesta alcuna carta di credito. Puoi iniziare immediatamente e cancellare in qualsiasi momento.",
    },
    {
      question: "Posso cambiare piano in qualsiasi momento?",
      answer:
        "Sì, puoi effettuare l'upgrade o il downgrade del tuo piano in qualsiasi momento. Le modifiche avranno effetto immediato e la fatturazione sarà proporzionale.",
    },
    {
      question: "I miei dati sono al sicuro?",
      answer:
        "Assolutamente sì. Utilizziamo crittografia end-to-end e architettura multi-tenant per garantire che i tuoi dati siano completamente isolati e protetti. Effettuiamo backup giornalieri automatici.",
    },
    {
      question: "Quanti utenti possono accedere al mio account?",
      answer:
        "Il numero di utenti dipende dal piano scelto. Con il piano Basic puoi avere fino a 5 dipendenti, con il Pro fino a 20, e con l'Enterprise utenti illimitati.",
    },
    {
      question: "Offrite supporto?",
      answer:
        "Sì! Il supporto via email è incluso in tutti i piani. I clienti Pro ricevono supporto prioritario, mentre i clienti Enterprise hanno un account manager dedicato.",
    },
    {
      question: "Posso esportare i miei dati?",
      answer:
        "Sì, puoi esportare tutti i tuoi dati in qualsiasi momento nei formati CSV, Excel o PDF. I tuoi dati sono sempre tuoi.",
    },
    {
      question: "C'è un contratto a lungo termine?",
      answer:
        "No, tutti i nostri piani sono mensili o annuali senza vincoli. Puoi cancellare in qualsiasi momento senza penali.",
    },
    {
      question: "Offrite API per integrazioni?",
      answer:
        "Sì, i piani Pro ed Enterprise includono l'accesso alle nostre API REST per integrare Micro-SaaS con i tuoi sistemi esistenti.",
    },
  ]

  return (
    <div className="py-20">
      <div className="container max-w-4xl">
        {/* About Section */}
        <div className="mb-20" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Chi Siamo</h1>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              Micro-SaaS è nato dalla necessità di semplificare la gestione
              aziendale per piccole e medie imprese. Troppe aziende si trovano a
              destreggiarsi tra fogli Excel, applicazioni separate e processi
              manuali inefficienti.
            </p>
            <p>
              La nostra missione è fornire una piattaforma all-in-one che
              permetta agli imprenditori di concentrarsi su ciò che conta davvero:
              far crescere il proprio business.
            </p>
            <p>
              Con Micro-SaaS, puoi gestire dipendenti, clienti e appuntamenti da
              un'unica interfaccia intuitiva, con la sicurezza e l'affidabilità
              che meriti.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Domande Frequenti
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Section */}
        <div className="mt-20 text-center bg-muted/50 rounded-lg p-12" data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-4">Hai altre domande?</h2>
          <p className="text-muted-foreground mb-6">
            Il nostro team è qui per aiutarti. Contattaci in qualsiasi momento.
          </p>
          <a
            href="mailto:support@micro-saas.com"
            className="text-primary hover:underline font-medium"
          >
            support@micro-saas.com
          </a>
        </div>
      </div>
    </div>
  )
}
