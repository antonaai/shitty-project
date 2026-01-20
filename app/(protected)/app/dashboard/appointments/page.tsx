"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import { useToast } from "@/hooks/use-toast"
import { Plus, Pencil, Trash2, Calendar } from "lucide-react"
import { appointmentsRepository } from "@/features/appointments/repository"
import { clientsRepository } from "@/features/clients/repository"
import { employeesRepository } from "@/features/employees/repository"
import { Appointment, AppointmentStatus } from "@/features/appointments/types"
import { AppointmentForm } from "@/features/appointments/components/appointment-form"
import { formatDate, formatDateTime } from "@/lib/utils"
import { cn } from "@/lib/utils"

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([])
  const [clientsMap, setClientsMap] = useState<Record<string, string>>({})
  const [employeesMap, setEmployeesMap] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [dateFilter, setDateFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | undefined>()
  const [deleteAppointment, setDeleteAppointment] = useState<Appointment | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const tenantId = "company_1"

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    filterAppointments()
  }, [appointments, dateFilter, statusFilter])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [appointmentsData, clientsData, employeesData] = await Promise.all([
        appointmentsRepository.getAll(tenantId),
        clientsRepository.getAll(tenantId),
        employeesRepository.getAll(tenantId),
      ])

      setAppointments(appointmentsData)

      const cMap: Record<string, string> = {}
      clientsData.forEach((c) => {
        cMap[c.id] = c.name
      })
      setClientsMap(cMap)

      const eMap: Record<string, string> = {}
      employeesData.forEach((e) => {
        eMap[e.id] = `${e.firstName} ${e.lastName}`
      })
      setEmployeesMap(eMap)
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile caricare gli appuntamenti",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filterAppointments = () => {
    let filtered = appointments

    if (dateFilter) {
      filtered = filtered.filter((appt) => appt.date === dateFilter)
    }

    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter((appt) => appt.status === statusFilter)
    }

    setFilteredAppointments(filtered.sort((a, b) => {
      const dateCompare = b.date.localeCompare(a.date)
      if (dateCompare !== 0) return dateCompare
      return a.time.localeCompare(b.time)
    }))
  }

  const handleCreate = () => {
    setSelectedAppointment(undefined)
    setIsSheetOpen(true)
  }

  const handleEdit = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsSheetOpen(true)
  }

  const handleDelete = (appointment: Appointment) => {
    setDeleteAppointment(appointment)
  }

  const confirmDelete = async () => {
    if (!deleteAppointment) return

    try {
      await appointmentsRepository.delete(deleteAppointment.id, tenantId)
      toast({
        title: "Successo",
        description: "Appuntamento eliminato con successo",
      })
      loadData()
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile eliminare l'appuntamento",
        variant: "destructive",
      })
    } finally {
      setDeleteAppointment(null)
    }
  }

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      if (selectedAppointment) {
        await appointmentsRepository.update(selectedAppointment.id, data, tenantId)
        toast({
          title: "Successo",
          description: "Appuntamento aggiornato con successo",
        })
      } else {
        await appointmentsRepository.create(data, tenantId)
        toast({
          title: "Successo",
          description: "Appuntamento creato con successo",
        })
      }
      setIsSheetOpen(false)
      loadData()
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile salvare l'appuntamento",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getStatusBadge = (status: AppointmentStatus) => {
    const variants = {
      scheduled: { variant: "default" as const, label: "Programmato", className: "bg-blue-500" },
      completed: { variant: "default" as const, label: "Completato", className: "bg-green-500" },
      cancelled: { variant: "outline" as const, label: "Cancellato", className: "bg-red-500" },
    }
    const config = variants[status]
    return (
      <Badge variant={config.variant} className={cn(config.className, "text-white")}>
        {config.label}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Appuntamenti</h1>
          <p className="text-muted-foreground">
            Gestisci gli appuntamenti con i clienti
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Nuovo Appuntamento
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="date"
          placeholder="Filtra per data"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full sm:w-[200px]"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filtra per stato" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti gli stati</SelectItem>
            <SelectItem value="scheduled">Programmato</SelectItem>
            <SelectItem value="completed">Completato</SelectItem>
            <SelectItem value="cancelled">Cancellato</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : filteredAppointments.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="Nessun appuntamento trovato"
          description={
            dateFilter || statusFilter !== "all"
              ? "Prova a modificare i filtri di ricerca"
              : "Inizia creando il tuo primo appuntamento"
          }
          action={
            !dateFilter && statusFilter === "all"
              ? { label: "Crea Appuntamento", onClick: handleCreate }
              : undefined
          }
        />
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Dipendente</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Ora</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead>Note</TableHead>
                <TableHead className="text-right">Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {getInitials(clientsMap[appointment.clientId] || "?")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {clientsMap[appointment.clientId] || "N/A"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{employeesMap[appointment.employeeId] || "N/A"}</TableCell>
                  <TableCell>{formatDate(appointment.date)}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {appointment.notes || "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(appointment)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(appointment)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {selectedAppointment ? "Modifica Appuntamento" : "Nuovo Appuntamento"}
            </SheetTitle>
            <SheetDescription>
              {selectedAppointment
                ? "Modifica i dettagli dell'appuntamento"
                : "Pianifica un nuovo appuntamento"}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <AppointmentForm
              appointment={selectedAppointment}
              onSubmit={handleSubmit}
              onCancel={() => setIsSheetOpen(false)}
              isLoading={isSubmitting}
              tenantId={tenantId}
            />
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={!!deleteAppointment} onOpenChange={() => setDeleteAppointment(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Conferma eliminazione</AlertDialogTitle>
            <AlertDialogDescription>
              Sei sicuro di voler eliminare questo appuntamento? Questa azione non può
              essere annullata.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Elimina</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
