import { getServerSession } from "next-auth"
import { authOptions } from "./auth"

// API configuration
const API_BASE_URL = "https://shitty-project-be.onrender.com"

/**
 * Utility function to make authenticated API requests to the external backend
 * Automatically includes the JWT token from the session
 */
export const authenticatedFetch = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    throw new Error("No access token available. Please login first.")
  }

  const url = `${API_BASE_URL}${endpoint}`

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session.accessToken}`,
    ...options.headers,
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  return response
}

/**
 * Client-side version of authenticatedFetch
 * Use this in client components by passing the accessToken from useSession
 */
export const authenticatedFetchClient = async (
  endpoint: string,
  accessToken: string,
  options: RequestInit = {}
): Promise<Response> => {
  if (!accessToken) {
    throw new Error("No access token available. Please login first.")
  }

  const url = `${API_BASE_URL}${endpoint}`

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    ...options.headers,
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  return response
}

/**
 * Helper function to get the access token in client components
 * Usage:
 * import { useSession } from "next-auth/react"
 * const { data: session } = useSession()
 * const accessToken = session?.accessToken
 */
export const getAccessToken = (session: any): string | null => {
  return session?.accessToken || null
}
