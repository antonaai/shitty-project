import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// API configuration
const API_BASE_URL = process.env.API_BASE_URL || "https://shitty-project-be.onrender.com"

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
  }

  interface User {
    id: string
    email: string
    name: string
    tenantId: string
    companyId: string
    companyName: string
    accessToken: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    tenantId: string
    companyId: string
    companyName: string
    accessToken: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        try {
          // Call external API for authentication
          const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          })

          if (!response.ok) {
            console.error("Authentication failed:", response.statusText)
            return null
          }

          const data = await response.json()

          if (!data.accessToken) {
            console.error("No access token received")
            return null
          }

          // Return user object with accessToken
          // You can fetch additional user details from another endpoint if needed
          return {
            id: credentials.username, // Using username as ID for now
            email: `${credentials.username}@example.com`, // Placeholder
            name: credentials.username,
            tenantId: "external", // Placeholder - update if API provides this
            companyId: "external", // Placeholder - update if API provides this
            companyName: "External Company", // Placeholder - update if API provides this
            accessToken: data.accessToken,
          }
        } catch (error) {
          console.error("Authentication error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.tenantId = user.tenantId
        token.companyId = user.companyId
        token.companyName = user.companyName
        token.accessToken = user.accessToken
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.tenantId = token.tenantId
        session.user.companyId = token.companyId
        session.user.companyName = token.companyName
      }
      session.accessToken = token.accessToken
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
