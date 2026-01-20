import { MOCK_CLIENTS, delay } from "@/lib/mock-db"
import { Client, CreateClientDto, UpdateClientDto, ClientStatus } from "./types"
import { generateId } from "@/lib/utils"

// TODO: Replace with Prisma queries

export const clientsRepository = {
  async getAll(tenantId: string): Promise<Client[]> {
    await delay(300)
    return MOCK_CLIENTS.filter((c) => c.companyId === tenantId)
  },

  async getById(id: string, tenantId: string): Promise<Client | null> {
    await delay(200)
    const client = MOCK_CLIENTS.find(
      (c) => c.id === id && c.companyId === tenantId
    )
    return client || null
  },

  async create(data: CreateClientDto, tenantId: string): Promise<Client> {
    await delay(400)
    const newClient: Client = {
      id: generateId(),
      ...data,
      companyId: tenantId,
      createdAt: new Date().toISOString(),
    }
    MOCK_CLIENTS.push(newClient)
    return newClient
  },

  async update(
    id: string,
    data: UpdateClientDto,
    tenantId: string
  ): Promise<Client | null> {
    await delay(400)
    const index = MOCK_CLIENTS.findIndex(
      (c) => c.id === id && c.companyId === tenantId
    )
    if (index === -1) return null

    MOCK_CLIENTS[index] = {
      ...MOCK_CLIENTS[index],
      ...data,
    }
    return MOCK_CLIENTS[index]
  },

  async delete(id: string, tenantId: string): Promise<boolean> {
    await delay(300)
    const index = MOCK_CLIENTS.findIndex(
      (c) => c.id === id && c.companyId === tenantId
    )
    if (index === -1) return false

    MOCK_CLIENTS.splice(index, 1)
    return true
  },

  async getByStatus(
    status: ClientStatus,
    tenantId: string
  ): Promise<Client[]> {
    await delay(300)
    return MOCK_CLIENTS.filter(
      (c) => c.companyId === tenantId && c.status === status
    )
  },

  async search(query: string, tenantId: string): Promise<Client[]> {
    await delay(300)
    const lowerQuery = query.toLowerCase()
    return MOCK_CLIENTS.filter(
      (c) =>
        c.companyId === tenantId &&
        (c.name.toLowerCase().includes(lowerQuery) ||
          c.email.toLowerCase().includes(lowerQuery))
    )
  },
}
