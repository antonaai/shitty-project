"use client"

import { useSession } from "next-auth/react"
import { useMemo } from "react"

const API_BASE_URL = "https://shitty-project-be.onrender.com"

/**
 * Hook per utilizzare l'API client sul client-side
 * Ottiene automaticamente l'accessToken dalla sessione NextAuth
 * 
 * @example
 * const api = useApiClient()
 * const data = await api.get('/endpoint')
 */
export const useApiClient = () => {
  const { data: session } = useSession()
  const accessToken = session?.accessToken

  return useMemo(() => {
    const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
      if (!accessToken) {
        throw new Error("No access token available. User must be authenticated.")
      }

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
      
      // Espone anche l'accessToken per usi specifici
      accessToken,
    }
  }, [accessToken])
}

/**
 * Hook per ottenere solo l'accessToken
 * Utile quando serve solo il token senza il client API completo
 */
export const useAccessToken = () => {
  const { data: session } = useSession()
  return session?.accessToken || null
}
