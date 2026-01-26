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
import { Plus, Search, Pencil, Trash2, Users } from "lucide-react"
import { employeesRepository } from "@/features/employees/repository"
import { Employee } from "@/features/employees/types"
import { EmployeeForm } from "@/features/employees/components/employee-form"
import { formatDate } from "@/lib/utils"

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>()
  const [deleteEmployee, setDeleteEmployee] = useState<Employee | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Mock tenant ID (in real app, get from session)
  const tenantId = "company_1"

  useEffect(() => {
    loadEmployees()
  }, [])

  useEffect(() => {
    filterEmployees()
  }, [employees, searchQuery, roleFilter])

  const loadEmployees = async () => {
    setIsLoading(true)
    try {
      const data = await employeesRepository.getAll(tenantId)
      setEmployees(data)
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile caricare i dipendenti",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filterEmployees = () => {
    let filtered = employees

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (emp) =>
          emp.firstName.toLowerCase().includes(query) ||
          emp.lastName.toLowerCase().includes(query) ||
          emp.email.toLowerCase().includes(query)
      )
    }

    if (roleFilter && roleFilter !== "all") {
      filtered = filtered.filter((emp) => emp.role === roleFilter)
    }

    setFilteredEmployees(filtered)
  }

  const handleCreate = () => {
    setSelectedEmployee(undefined)
    setIsSheetOpen(true)
  }

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsSheetOpen(true)
  }

  const handleDelete = (employee: Employee) => {
    setDeleteEmployee(employee)
  }

  const confirmDelete = async () => {
    if (!deleteEmployee) return

    try {
      await employeesRepository.delete(deleteEmployee.id, tenantId)
      toast({
        title: "Successo",
        description: "Dipendente eliminato con successo",
      })
      loadEmployees()
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile eliminare il dipendente",
        variant: "destructive",
      })
    } finally {
      setDeleteEmployee(null)
    }
  }

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      if (selectedEmployee) {
        await employeesRepository.update(selectedEmployee.id, data, tenantId)
        toast({
          title: "Successo",
          description: "Dipendente aggiornato con successo",
        })
      } else {
        await employeesRepository.create(data, tenantId)
        toast({
          title: "Successo",
          description: "Dipendente creato con successo",
        })
      }
      setIsSheetOpen(false)
      loadEmployees()
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile salvare il dipendente",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase()
  }

  const uniqueRoles = Array.from(new Set(employees.map((emp) => emp.role)))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dipendenti</h1>
          <p className="text-muted-foreground">
            Gestisci il tuo team
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Nuovo Dipendente
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cerca per nome o email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filtra per ruolo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti i ruoli</SelectItem>
            {uniqueRoles.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : filteredEmployees.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Nessun dipendente trovato"
          description={
            searchQuery || roleFilter !== "all"
              ? "Prova a modificare i filtri di ricerca"
              : "Inizia aggiungendo il tuo primo dipendente"
          }
          action={
            !searchQuery && roleFilter === "all"
              ? { label: "Aggiungi Dipendente", onClick: handleCreate }
              : undefined
          }
        />
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dipendente</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Ruolo</TableHead>
                <TableHead>Telefono</TableHead>
                <TableHead>Data Assunzione</TableHead>
                <TableHead className="text-right">Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {getInitials(employee.firstName, employee.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {employee.firstName} {employee.lastName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{employee.role}</Badge>
                  </TableCell>
                  <TableCell>{employee.phone || "-"}</TableCell>
                  <TableCell>{formatDate(employee.hireDate)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(employee)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(employee)}
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

      {/* Form Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {selectedEmployee ? "Modifica Dipendente" : "Nuovo Dipendente"}
            </SheetTitle>
            <SheetDescription>
              {selectedEmployee
                ? "Modifica i dati del dipendente"
                : "Aggiungi un nuovo membro al team"}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <EmployeeForm
              employee={selectedEmployee}
              onSubmit={handleSubmit}
              onCancel={() => setIsSheetOpen(false)}
              isLoading={isSubmitting}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Dialog */}
      <AlertDialog open={!!deleteEmployee} onOpenChange={() => setDeleteEmployee(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Conferma eliminazione</AlertDialogTitle>
            <AlertDialogDescription>
              Sei sicuro di voler eliminare {deleteEmployee?.firstName}{" "}
              {deleteEmployee?.lastName}? Questa azione non può essere annullata.
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
