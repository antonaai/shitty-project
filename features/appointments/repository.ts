import { MOCK_APPOINTMENTS, delay } from "@/lib/mock-db"
import {
  Appointment,
  CreateAppointmentDto,
  UpdateAppointmentDto,
  AppointmentStatus,
} from "./types"
import { generateId } from "@/lib/utils"

// TODO: Replace with Prisma queries

export const appointmentsRepository = {
  async getAll(tenantId: string): Promise<Appointment[]> {
    await delay(300)
    return MOCK_APPOINTMENTS.filter((a) => a.companyId === tenantId)
  },

  async getById(id: string, tenantId: string): Promise<Appointment | null> {
    await delay(200)
    const appointment = MOCK_APPOINTMENTS.find(
      (a) => a.id === id && a.companyId === tenantId
    )
    return appointment || null
  },

  async create(
    data: CreateAppointmentDto,
    tenantId: string
  ): Promise<Appointment> {
    await delay(400)
    const newAppointment: Appointment = {
      id: generateId(),
      ...data,
      companyId: tenantId,
      createdAt: new Date().toISOString(),
    }
    MOCK_APPOINTMENTS.push(newAppointment)
    return newAppointment
  },

  async update(
    id: string,
    data: UpdateAppointmentDto,
    tenantId: string
  ): Promise<Appointment | null> {
    await delay(400)
    const index = MOCK_APPOINTMENTS.findIndex(
      (a) => a.id === id && a.companyId === tenantId
    )
    if (index === -1) return null

    MOCK_APPOINTMENTS[index] = {
      ...MOCK_APPOINTMENTS[index],
      ...data,
    }
    return MOCK_APPOINTMENTS[index]
  },

  async delete(id: string, tenantId: string): Promise<boolean> {
    await delay(300)
    const index = MOCK_APPOINTMENTS.findIndex(
      (a) => a.id === id && a.companyId === tenantId
    )
    if (index === -1) return false

    MOCK_APPOINTMENTS.splice(index, 1)
    return true
  },

  async getByStatus(
    status: AppointmentStatus,
    tenantId: string
  ): Promise<Appointment[]> {
    await delay(300)
    return MOCK_APPOINTMENTS.filter(
      (a) => a.companyId === tenantId && a.status === status
    )
  },

  async getByDate(date: string, tenantId: string): Promise<Appointment[]> {
    await delay(300)
    return MOCK_APPOINTMENTS.filter(
      (a) => a.companyId === tenantId && a.date === date
    )
  },

  async getUpcoming(tenantId: string, limit: number = 5): Promise<Appointment[]> {
    await delay(300)
    const today = new Date().toISOString().split("T")[0]
    return MOCK_APPOINTMENTS.filter(
      (a) => a.companyId === tenantId && a.date >= today && a.status === "scheduled"
    )
      .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
      .slice(0, limit)
  },
}
