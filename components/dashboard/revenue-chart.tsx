"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const data = [
  { month: "Lug", ricavi: 8500, costi: 5200 },
  { month: "Ago", ricavi: 9200, costi: 5800 },
  { month: "Set", ricavi: 7800, costi: 4900 },
  { month: "Ott", ricavi: 10500, costi: 6300 },
  { month: "Nov", ricavi: 11200, costi: 7100 },
  { month: "Dic", ricavi: 12800, costi: 8200 },
]

type ChartType = "both" | "ricavi" | "costi"

export function RevenueChart() {
  const [chartType, setChartType] = useState<ChartType>("both")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-col md:flex-row">
          <div>
            <CardTitle>Andamento Finanziario</CardTitle>
            <CardDescription>Ultimi 6 mesi</CardDescription>
          </div>
          <Tabs value={chartType} onValueChange={(v) => setChartType(v as ChartType)}>
            <TabsList>
              <TabsTrigger value="both">Entrambi</TabsTrigger>
              <TabsTrigger value="ricavi">Ricavi</TabsTrigger>
              <TabsTrigger value="costi">Costi</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value: number) => `€${value.toLocaleString()}`}
            />
            <Legend />
            {(chartType === "both" || chartType === "ricavi") && (
              <Line
                type="monotone"
                dataKey="ricavi"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                name="Ricavi"
              />
            )}
            {(chartType === "both" || chartType === "costi") && (
              <Line
                type="monotone"
                dataKey="costi"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                name="Costi"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
