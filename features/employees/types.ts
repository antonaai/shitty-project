export interface Employee {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string | null
  role: string
  hireDate: string
  companyId: string
  createdAt: string
}

export interface CreateEmployeeDto {
  firstName: string
  lastName: string
  email: string
  phone: string | null
  role: string
  hireDate: string
}

export interface UpdateEmployeeDto extends Partial<CreateEmployeeDto> {}
