"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Appointment } from "../types"
import { clientsRepository } from "@/features/clients/repository"
import { employeesRepository } from "@/features/employees/repository"
import { Client } from "@/features/clients/types"
import { Employee } from "@/features/employees/types"

const formSchema = z.object({
  clientId: z.string().min(1, "Il cliente è obbligatorio"),
  employeeId: z.string().min(1, "Il dipendente è obbligatorio"),
  date: z.string().min(1, "La data è obbligatoria"),
  time: z.string().min(1, "L'ora è obbligatoria"),
  notes: z.string(),
  status: z.enum(["scheduled", "completed", "cancelled"]),
})

type FormValues = z.infer<typeof formSchema>

interface AppointmentFormProps {
  appointment?: Appointment
  onSubmit: (data: FormValues) => void
  onCancel: () => void
  isLoading?: boolean
  tenantId: string
}

export function AppointmentForm({
  appointment,
  onSubmit,
  onCancel,
  isLoading,
  tenantId,
}: AppointmentFormProps) {
  const [clients, setClients] = useState<Client[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const [clientsData, employeesData] = await Promise.all([
      clientsRepository.getAll(tenantId),
      employeesRepository.getAll(tenantId),
    ])
    setClients(clientsData)
    setEmployees(employeesData)
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: appointment?.clientId || "",
      employeeId: appointment?.employeeId ? String(appointment.employeeId) : "",
      date: appointment?.date || new Date().toISOString().split("T")[0],
      time: appointment?.time || "09:00",
      notes: appointment?.notes || "",
      status: appointment?.status || "scheduled",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="clientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona un cliente" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employeeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dipendente Assegnato</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona un dipendente" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={String(employee.id)}>
                      {employee.firstName} {employee.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ora</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stato</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona stato" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="scheduled">Programmato</SelectItem>
                  <SelectItem value="completed">Completato</SelectItem>
                  <SelectItem value="cancelled">Cancellato</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Inserisci note sull'appuntamento..."
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            Annulla
          </Button>
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading ? "Salvataggio..." : "Salva"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
