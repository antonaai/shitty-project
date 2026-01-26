import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const API_BASE_URL = "https://shitty-project-be.onrender.com"

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    const tenantId = session?.user?.companyId
    const accessToken = session?.user?.accessToken

    if (!tenantId || !accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const params = await context.params
    const id = params.id

    const response = await fetch(`${API_BASE_URL}/dipendenti/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (response.status === 404) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `API Error: ${response.status} - ${errorText}` },
        { status: response.status }
      )
    }

    const employee = await response.json()
    // Verify companyId matches tenantId
    if (employee.companyId !== tenantId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json(employee)
  } catch (error) {
    console.error("Error fetching employee:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    const tenantId = session?.user?.companyId
    const accessToken = session?.user?.accessToken

    if (!tenantId || !accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const params = await context.params
    const id = params.id

    // First verify the employee exists and belongs to the tenant
    const getResponse = await fetch(`${API_BASE_URL}/dipendenti/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (getResponse.status === 404) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    if (!getResponse.ok) {
      const errorText = await getResponse.text()
      return NextResponse.json(
        { error: `API Error: ${getResponse.status} - ${errorText}` },
        { status: getResponse.status }
      )
    }

    const existing = await getResponse.json()
    if (existing.companyId !== tenantId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Now update
    const body = await request.json()
    const response = await fetch(`${API_BASE_URL}/dipendenti/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
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
    console.error("Error updating employee:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    const tenantId = session?.user?.companyId
    const accessToken = session?.user?.accessToken

    if (!tenantId || !accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const params = await context.params
    const id = params.id

    // First verify the employee exists and belongs to the tenant
    const getResponse = await fetch(`${API_BASE_URL}/dipendenti/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (getResponse.status === 404) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    if (!getResponse.ok) {
      const errorText = await getResponse.text()
      return NextResponse.json(
        { error: `API Error: ${getResponse.status} - ${errorText}` },
        { status: getResponse.status }
      )
    }

    const existing = await getResponse.json()
    if (existing.companyId !== tenantId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Now delete
    const response = await fetch(`${API_BASE_URL}/dipendenti/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "Not found" }, { status: 404 })
      }
      const errorText = await response.text()
      return NextResponse.json(
        { error: `API Error: ${response.status} - ${errorText}` },
        { status: response.status }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting employee:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
