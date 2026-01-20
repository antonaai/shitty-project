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
import { Plus, Search, Pencil, Trash2, Building2 } from "lucide-react"
import { clientsRepository } from "@/features/clients/repository"
import { Client, ClientStatus } from "@/features/clients/types"
import { ClientForm } from "@/features/clients/components/client-form"
import { formatDate } from "@/lib/utils"
import { cn } from "@/lib/utils"

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [filteredClients, setFilteredClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | undefined>()
  const [deleteClient, setDeleteClient] = useState<Client | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const tenantId = "company_1"

  useEffect(() => {
    loadClients()
  }, [])

  useEffect(() => {
    filterClients()
  }, [clients, searchQuery, statusFilter])

  const loadClients = async () => {
    setIsLoading(true)
    try {
      const data = await clientsRepository.getAll(tenantId)
      setClients(data)
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile caricare i clienti",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filterClients = () => {
    let filtered = clients

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (client) =>
          client.name.toLowerCase().includes(query) ||
          client.email.toLowerCase().includes(query)
      )
    }

    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter((client) => client.status === statusFilter)
    }

    setFilteredClients(filtered)
  }

  const handleCreate = () => {
    setSelectedClient(undefined)
    setIsSheetOpen(true)
  }

  const handleEdit = (client: Client) => {
    setSelectedClient(client)
    setIsSheetOpen(true)
  }

  const handleDelete = (client: Client) => {
    setDeleteClient(client)
  }

  const confirmDelete = async () => {
    if (!deleteClient) return

    try {
      await clientsRepository.delete(deleteClient.id, tenantId)
      toast({
        title: "Successo",
        description: "Cliente eliminato con successo",
      })
      loadClients()
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile eliminare il cliente",
        variant: "destructive",
      })
    } finally {
      setDeleteClient(null)
    }
  }

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      if (selectedClient) {
        await clientsRepository.update(selectedClient.id, data, tenantId)
        toast({
          title: "Successo",
          description: "Cliente aggiornato con successo",
        })
      } else {
        await clientsRepository.create(data, tenantId)
        toast({
          title: "Successo",
          description: "Cliente creato con successo",
        })
      }
      setIsSheetOpen(false)
      loadClients()
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile salvare il cliente",
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

  const getStatusBadge = (status: ClientStatus) => {
    const variants = {
      active: { variant: "default" as const, label: "Attivo", className: "bg-green-500" },
      lead: { variant: "secondary" as const, label: "Lead", className: "bg-yellow-500" },
      inactive: { variant: "outline" as const, label: "Inattivo", className: "bg-gray-500" },
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
          <h1 className="text-3xl font-bold">Clienti</h1>
          <p className="text-muted-foreground">
            Gestisci il tuo portfolio clienti
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Nuovo Cliente
        </Button>
      </div>

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
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filtra per stato" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti gli stati</SelectItem>
            <SelectItem value="active">Attivo</SelectItem>
            <SelectItem value="lead">Lead</SelectItem>
            <SelectItem value="inactive">Inattivo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : filteredClients.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="Nessun cliente trovato"
          description={
            searchQuery || statusFilter !== "all"
              ? "Prova a modificare i filtri di ricerca"
              : "Inizia aggiungendo il tuo primo cliente"
          }
          action={
            !searchQuery && statusFilter === "all"
              ? { label: "Aggiungi Cliente", onClick: handleCreate }
              : undefined
          }
        />
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefono</TableHead>
                <TableHead>Città</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead>Data Creazione</TableHead>
                <TableHead className="text-right">Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(client.name)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{client.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.city}</TableCell>
                  <TableCell>{getStatusBadge(client.status)}</TableCell>
                  <TableCell>{formatDate(client.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(client)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(client)}
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
              {selectedClient ? "Modifica Cliente" : "Nuovo Cliente"}
            </SheetTitle>
            <SheetDescription>
              {selectedClient
                ? "Modifica i dati del cliente"
                : "Aggiungi un nuovo cliente al portfolio"}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <ClientForm
              client={selectedClient}
              onSubmit={handleSubmit}
              onCancel={() => setIsSheetOpen(false)}
              isLoading={isSubmitting}
            />
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={!!deleteClient} onOpenChange={() => setDeleteClient(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Conferma eliminazione</AlertDialogTitle>
            <AlertDialogDescription>
              Sei sicuro di voler eliminare {deleteClient?.name}? Questa azione non
              può essere annullata.
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
