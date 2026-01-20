export interface Employee {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
  hireDate: string
  companyId: string
  createdAt: string
}

export interface CreateEmployeeDto {
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
  hireDate: string
}

export interface UpdateEmployeeDto extends Partial<CreateEmployeeDto> {}
