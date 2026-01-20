import { MOCK_EMPLOYEES, delay } from "@/lib/mock-db"
import { Employee, CreateEmployeeDto, UpdateEmployeeDto } from "./types"
import { generateId } from "@/lib/utils"

// TODO: Replace with Prisma queries
// Example: prisma.employee.findMany({ where: { companyId: tenantId } })

export const employeesRepository = {
  async getAll(tenantId: string): Promise<Employee[]> {
    await delay(300)
    return MOCK_EMPLOYEES.filter((e) => e.companyId === tenantId)
  },

  async getById(id: string, tenantId: string): Promise<Employee | null> {
    await delay(200)
    const employee = MOCK_EMPLOYEES.find(
      (e) => e.id === id && e.companyId === tenantId
    )
    return employee || null
  },

  async create(data: CreateEmployeeDto, tenantId: string): Promise<Employee> {
    await delay(400)
    const newEmployee: Employee = {
      id: generateId(),
      ...data,
      companyId: tenantId,
      createdAt: new Date().toISOString(),
    }
    // In real implementation: prisma.employee.create({ data: { ...data, companyId: tenantId } })
    MOCK_EMPLOYEES.push(newEmployee)
    return newEmployee
  },

  async update(
    id: string,
    data: UpdateEmployeeDto,
    tenantId: string
  ): Promise<Employee | null> {
    await delay(400)
    const index = MOCK_EMPLOYEES.findIndex(
      (e) => e.id === id && e.companyId === tenantId
    )
    if (index === -1) return null

    MOCK_EMPLOYEES[index] = {
      ...MOCK_EMPLOYEES[index],
      ...data,
    }
    return MOCK_EMPLOYEES[index]
  },

  async delete(id: string, tenantId: string): Promise<boolean> {
    await delay(300)
    const index = MOCK_EMPLOYEES.findIndex(
      (e) => e.id === id && e.companyId === tenantId
    )
    if (index === -1) return false

    MOCK_EMPLOYEES.splice(index, 1)
    return true
  },

  async search(query: string, tenantId: string): Promise<Employee[]> {
    await delay(300)
    const lowerQuery = query.toLowerCase()
    return MOCK_EMPLOYEES.filter(
      (e) =>
        e.companyId === tenantId &&
        (e.firstName.toLowerCase().includes(lowerQuery) ||
          e.lastName.toLowerCase().includes(lowerQuery) ||
          e.email.toLowerCase().includes(lowerQuery))
    )
  },
}
