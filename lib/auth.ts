import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

declare module "next-auth" {
    interface Session {
        user: {
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
    id?: string
    email?: string
    name?: string
    tenantId?: string
    companyId?: string
    companyName?: string
    accessToken?: string
    refreshToken?: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          )

          if (!res.ok) {
            return null
          }

          const data = await res.json()

          /**
           * Atteso dal backend:
           * {
           *   accessToken: string,
           *   refreshToken: string
           * }
           */

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
          console.error("Login error:", error)
          return null
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.tenantId = user.tenantId
        token.companyId = user.companyId
        token.companyName = user.companyName
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
        session.user.tenantId = token.tenantId
        session.user.companyId = token.companyId
        session.user.companyName = token.companyName
        session.user.accessToken = token.accessToken
        session.user.refreshToken = token.refreshToken
      }
      return session
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
}