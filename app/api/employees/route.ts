import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const API_BASE_URL = "https://shitty-project-be.onrender.com"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const tenantId = session?.user?.companyId
    const accessToken = session?.user?.accessToken

    if (!tenantId || !accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const response = await fetch(`${API_BASE_URL}/dipendenti`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `API Error: ${response.status} - ${errorText}` },
        { status: response.status }
      )
    }

    const allEmployees = await response.json()
    // Filter by companyId (tenantId)
    const filteredEmployees = allEmployees.filter(
      (e: any) => e.companyId === tenantId
    )

    return NextResponse.json(filteredEmployees)
  } catch (error) {
    console.error("Error fetching employees:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const tenantId = session?.user?.companyId
    const accessToken = session?.user?.accessToken

    if (!tenantId || !accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const payload = {
      ...body,
      companyId: tenantId,
    }

    const response = await fetch(`${API_BASE_URL}/dipendenti`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `API Error: ${response.status} - ${errorText}` },
        { status: response.status }
      )
    }

    const employee = await response.json()
    return NextResponse.json(employee)
  } catch (error) {
    console.error("Error creating employee:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
