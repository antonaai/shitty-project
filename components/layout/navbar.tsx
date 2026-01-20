"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building2 } from "lucide-react"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Building2 className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Micro-SaaS</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Prezzi
          </Link>
          <Link
            href="/features"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Funzionalità
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Chi Siamo
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button>Accedi</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
