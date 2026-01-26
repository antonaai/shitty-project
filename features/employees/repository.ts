import { Employee, CreateEmployeeDto, UpdateEmployeeDto } from "./types"

const API_BASE_URL = "/api/employees"

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
    throw new Error(errorData.error || `API Error: ${response.status}`)
  }
  return response.json()
}

export const employeesRepository = {
  async getAll(tenantId: string): Promise<Employee[]> {
    try {
      const response = await fetch(API_BASE_URL)
      return handleResponse<Employee[]>(response)
    } catch (error) {
      console.error("Error fetching employees:", error)
      throw error
    }
  },

  async getById(id: number, tenantId: string): Promise<Employee | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`)
      if (response.status === 404) {
        return null
      }
      return handleResponse<Employee>(response)
    } catch (error) {
      console.error("Error fetching employee:", error)
      throw error
    }
  },

  async create(data: CreateEmployeeDto, tenantId: string): Promise<Employee> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      if (response.status === 404) {
        return null
      }
      return handleResponse<Employee>(response)
    } catch (error) {
      console.error("Error updating employee:", error)
      throw error
    }
  },

  async delete(id: number, tenantId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
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
