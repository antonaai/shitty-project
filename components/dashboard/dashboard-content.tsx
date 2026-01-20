"use client"

import { KPICard } from "@/components/dashboard/kpi-card"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { UpcomingAppointments } from "@/components/dashboard/upcoming-appointments"
import { RecentClients } from "@/components/dashboard/recent-clients"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  Calendar,
  DollarSign,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export function DashboardContent() {
  // Mock KPI data
  const kpiData = [
    {
      title: "Ricavi Totali",
      value: formatCurrency(45320),
      icon: TrendingUp,
      trend: { value: 12.5, isPositive: true },
    },
    {
      title: "Costi Totali",
      value: formatCurrency(28150),
      icon: TrendingDown,
      trend: { value: 8.3, isPositive: false },
    },
    {
      title: "Profitto",
      value: formatCurrency(17170),
      icon: DollarSign,
      trend: { value: 18.2, isPositive: true },
    },
    {
      title: "Dipendenti Attivi",
      value: 12,
      icon: Users,
    },
    {
      title: "Clienti Totali",
      value: 48,
      icon: Building2,
      trend: { value: 5.0, isPositive: true },
    },
    {
      title: "Appuntamenti Oggi",
      value: 5,
      icon: Calendar,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Panoramica delle tue attività aziendali
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((kpi, index) => (
          <KPICard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            icon={kpi.icon}
            trend={kpi.trend}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Revenue Chart */}
      <RevenueChart />

      {/* Tables */}
      <div className="grid gap-4 md:grid-cols-2">
        <UpcomingAppointments />
        <RecentClients />
      </div>
    </div>
  )
}
