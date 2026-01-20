"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface Appointment {
  id: string
  client: string
  employee: string
  date: string
  time: string
  status: "scheduled" | "completed" | "cancelled"
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    client: "Rossi Impianti SRL",
    employee: "Luca Bianchi",
    date: "2024-01-22",
    time: "09:00",
    status: "scheduled",
  },
  {
    id: "2",
    client: "Condominio Verde",
    employee: "Marco Neri",
    date: "2024-01-22",
    time: "14:00",
    status: "scheduled",
  },
  {
    id: "3",
    client: "Hotel Centrale",
    employee: "Luca Bianchi",
    date: "2024-01-23",
    time: "10:00",
    status: "scheduled",
  },
]

export function UpcomingAppointments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Prossimi Appuntamenti</CardTitle>
        <CardDescription>Appuntamenti programmati</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-start space-x-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{appointment.client}</p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {appointment.employee}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(appointment.date)}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {appointment.time}
                  </span>
                </div>
              </div>
              <Badge variant="secondary">Programmato</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
