import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Mock users database
const DEMO_USERS = [
  {
    id: "1",
    email: "demo@azienda1.com",
    password: "password",
    name: "Mario Rossi",
    tenantId: "tenant_1",
    companyId: "company_1",
    companyName: "Azienda Demo SRL",
  },
  {
    id: "2",
    email: "admin@test.com",
    password: "admin123",
    name: "Admin Test",
    tenantId: "tenant_2",
    companyId: "company_2",
    companyName: "Test Company",
  },
]

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
  }

  interface User {
    id: string
    email: string
    name: string
    tenantId: string
    companyId: string
    companyName: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    tenantId: string
    companyId: string
    companyName: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "demo@azienda1.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Find user in mock database
        const user = DEMO_USERS.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        )

        if (!user) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          tenantId: user.tenantId,
          companyId: user.companyId,
          companyName: user.companyName,
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
