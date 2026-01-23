import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const API_BASE_URL = "https://shitty-project-be.onrender.com"

// Tipo per la risposta dell'API di login
interface LoginResponse {
  accessToken: string
  refreshToken: string
  userId: string
  userEmail: string
  userName: string
  companyName: string
  tenantId: string
  companyId: string
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      tenantId: string
      companyId: string
      companyName: string
    }
    accessToken: string
    refreshToken: string
  }

  interface User {
    id: string
    email: string
    name: string
    tenantId: string
    companyId: string
    companyName: string
    accessToken: string
    refreshToken: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    tenantId: string
    companyId: string
    companyName: string
    accessToken: string
    refreshToken: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@acme.it" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Chiamata all'API esterna per l'autenticazione
          const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })

          if (!response.ok) {
            console.error("Login failed:", response.status, response.statusText)
            return null
          }

          const data: LoginResponse = await response.json()

          // Ritorna i dati dell'utente con i token
          return {
            id: data.userId,
            email: data.userEmail,
            name: data.userName,
            tenantId: data.tenantId,
            companyId: data.companyId,
            companyName: data.companyName,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          }
        } catch (error) {
          console.error("Authorization error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Salva i dati dell'utente e i token nel JWT alla prima autenticazione
      if (user) {
        token.id = user.id
        token.tenantId = user.tenantId
        token.companyId = user.companyId
        token.companyName = user.companyName
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }
      return token
    },
    async session({ session, token }) {
      // Passa i dati del JWT alla sessione
      if (session.user) {
        session.user.id = token.id
        session.user.tenantId = token.tenantId
        session.user.companyId = token.companyId
        session.user.companyName = token.companyName
      }
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "demo-secret-key-change-in-production-12345",
}
