"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatDate } from "@/lib/utils"

interface Client {
  id: string
  name: string
  email: string
  status: "active" | "inactive" | "lead"
  createdAt: string
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Rossi Impianti SRL",
    email: "info@rossiimpianti.it",
    status: "active",
    createdAt: "2023-12-15",
  },
  {
    id: "2",
    name: "Azienda Beta SPA",
    email: "contatti@aziendabeta.it",
    status: "lead",
    createdAt: "2024-01-05",
  },
  {
    id: "3",
    name: "Hotel Centrale",
    email: "info@hotelcentrale.it",
    status: "active",
    createdAt: "2024-01-10",
  },
  {
    id: "4",
    name: "Condominio Verde",
    email: "admin@condominioverde.it",
    status: "active",
    createdAt: "2024-01-12",
  },
]

const statusVariants = {
  active: "default",
  lead: "secondary",
  inactive: "outline",
} as const

const statusLabels = {
  active: "Attivo",
  lead: "Lead",
  inactive: "Inattivo",
}

export function RecentClients() {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clienti Recenti</CardTitle>
        <CardDescription>Ultimi clienti aggiunti</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockClients.map((client) => (
            <div
              key={client.id}
              className="flex items-center space-x-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <Avatar>
                <AvatarFallback>{getInitials(client.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{client.name}</p>
                <p className="text-xs text-muted-foreground">{client.email}</p>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <Badge variant={statusVariants[client.status]}>
                  {statusLabels[client.status]}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {formatDate(client.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
