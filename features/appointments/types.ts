export type AppointmentStatus = "scheduled" | "completed" | "cancelled"

export interface Appointment {
  id: string
  clientId: string
  employeeId: string
  date: string
  time: string
  notes: string
  status: AppointmentStatus
  companyId: string
  createdAt: string
}

export interface CreateAppointmentDto {
  clientId: string
  employeeId: string
  date: string
  time: string
  notes: string
  status: AppointmentStatus
}

export interface UpdateAppointmentDto extends Partial<CreateAppointmentDto> {}
