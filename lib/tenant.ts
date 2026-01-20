import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function getTenantId(): Promise<string | null> {
  const session = await getServerSession(authOptions)
  return session?.user?.tenantId || null
}

export async function getCompanyId(): Promise<string | null> {
  const session = await getServerSession(authOptions)
  return session?.user?.companyId || null
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user || null
}

export function filterByTenant<T extends { companyId: string }>(
  items: T[],
  tenantId: string
): T[] {
  return items.filter((item) => item.companyId === tenantId)
}
