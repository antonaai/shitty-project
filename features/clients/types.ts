export type ClientStatus = "active" | "inactive" | "lead"

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  zipCode: string
  status: ClientStatus
  companyId: string
  createdAt: string
}

export interface CreateClientDto {
  name: string
  email: string
  phone: string
  address: string
  city: string
  zipCode: string
  status: ClientStatus
}

export interface UpdateClientDto extends Partial<CreateClientDto> {}
