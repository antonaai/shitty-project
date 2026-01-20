"use client"

import { SessionProvider } from "next-auth/react"

export const dynamic = "force-dynamic"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { MobileSidebar } from "@/components/layout/mobile-sidebar"
import { Toaster } from "@/components/ui/toaster"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Topbar with Mobile Menu */}
          <div className="flex items-center h-16 border-b px-4 md:px-0">
            <MobileSidebar />
            <div className="flex-1">
              <Topbar />
            </div>
          </div>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-muted/20 p-6">
            {children}
          </main>
        </div>
      </div>
      <Toaster />
    </SessionProvider>
  )
}
