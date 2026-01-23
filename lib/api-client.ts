import { getServerSession } from "next-auth"
import { authOptions } from "./auth"

const API_BASE_URL = "https://shitty-project-be.onrender.com"

/**
 * Crea un client per chiamate API autenticate
 * Utilizza l'accessToken dalla sessione NextAuth
 */
export const createApiClient = (accessToken: string) => {
  const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
    const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  return {
    get: (endpoint: string, options?: RequestInit) => 
      fetchWithAuth(endpoint, { ...options, method: "GET" }),
    
    post: (endpoint: string, data?: unknown, options?: RequestInit) =>
      fetchWithAuth(endpoint, {
        ...options,
        method: "POST",
        body: data ? JSON.stringify(data) : undefined,
      }),
    
    put: (endpoint: string, data?: unknown, options?: RequestInit) =>
      fetchWithAuth(endpoint, {
        ...options,
        method: "PUT",
        body: data ? JSON.stringify(data) : undefined,
      }),
    
    delete: (endpoint: string, options?: RequestInit) =>
      fetchWithAuth(endpoint, { ...options, method: "DELETE" }),
  }
}

/**
 * Ottiene l'accessToken dalla sessione server-side
 */
export const getAccessToken = async (): Promise<string | null> => {
  const session = await getServerSession(authOptions)
  return session?.accessToken || null
}

/**
 * Client API per uso server-side
 * Ottiene automaticamente l'accessToken dalla sessione
 */
export const getApiClient = async () => {
  const accessToken = await getAccessToken()
  
  if (!accessToken) {
    throw new Error("No access token available. User must be authenticated.")
  }
  
  return createApiClient(accessToken)
}
