import { Employee, CreateEmployeeDto, UpdateEmployeeDto } from "./types"

const API_BASE_URL = "https://shitty-project-be.onrender.com"

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`API Error: ${response.status} - ${errorText}`)
  }
  return response.json()
}

export const employeesRepository = {
  async getAll(tenantId: string): Promise<Employee[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/dipendenti`)
      const allEmployees = await handleResponse<Employee[]>(response)
      // Filter by companyId if needed (tenantId)
      return allEmployees.filter((e) => e.companyId === tenantId)
    } catch (error) {
      console.error("Error fetching employees:", error)
      throw error
    }
  },

  async getById(id: number, tenantId: string): Promise<Employee | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/dipendenti/${id}`)
      if (response.status === 404) {
        return null
      }
      const employee = await handleResponse<Employee>(response)
      // Verify companyId matches tenantId
      if (employee.companyId !== tenantId) {
        return null
      }
      return employee
    } catch (error) {
      console.error("Error fetching employee:", error)
      throw error
    }
  },

  async create(data: CreateEmployeeDto, tenantId: string): Promise<Employee> {
    try {
      const payload = {
        ...data,
        companyId: tenantId,
      }
      const response = await fetch(`${API_BASE_URL}/dipendenti`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      return handleResponse<Employee>(response)
    } catch (error) {
      console.error("Error creating employee:", error)
      throw error
    }
  },

  async update(
    id: number,
    data: UpdateEmployeeDto,
    tenantId: string
  ): Promise<Employee | null> {
    try {
      // First verify the employee exists and belongs to the tenant
      const existing = await this.getById(id, tenantId)
      if (!existing) {
        return null
      }

      const response = await fetch(`${API_BASE_URL}/dipendenti/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      return handleResponse<Employee>(response)
    } catch (error) {
      console.error("Error updating employee:", error)
      throw error
    }
  },

  async delete(id: number, tenantId: string): Promise<boolean> {
    try {
      // First verify the employee exists and belongs to the tenant
      const existing = await this.getById(id, tenantId)
      if (!existing) {
        return false
      }

      const response = await fetch(`${API_BASE_URL}/dipendenti/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        if (response.status === 404) {
          return false
        }
        throw new Error(`Delete failed: ${response.status}`)
      }
      return true
    } catch (error) {
      console.error("Error deleting employee:", error)
      throw error
    }
  },

  async search(query: string, tenantId: string): Promise<Employee[]> {
    try {
      const allEmployees = await this.getAll(tenantId)
      const lowerQuery = query.toLowerCase()
      return allEmployees.filter(
        (e) =>
          e.firstName.toLowerCase().includes(lowerQuery) ||
          e.lastName.toLowerCase().includes(lowerQuery) ||
          e.email.toLowerCase().includes(lowerQuery)
      )
    } catch (error) {
      console.error("Error searching employees:", error)
      throw error
    }
  },
}
