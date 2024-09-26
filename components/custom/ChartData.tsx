"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartData = [
    { date: "2024-04-01", depots: 1000, retraits: 500 },
    { date: "2024-04-02", depots: 1500, retraits: 7400 },
    { date: "2024-04-03", depots: 1200, retraits: 800 },
    { date: "2024-04-04", depots: 2000, retraits: 900 },
    { date: "2024-04-05", depots: 2500, retraits: 1100 },
    { date: "2024-04-06", depots: 2200, retraits: 1300 },
    { date: "2024-04-07", depots: 1800, retraits: 900 },
    { date: "2024-04-08", depots: 2700, retraits: 1500 },
    { date: "2024-04-09", depots: 3000, retraits: 1200 },
    { date: "2024-04-10", depots: 2300, retraits: 1000 },
    { date: "2024-04-11", depots: 2600, retraits: 1400 },
    { date: "2024-04-12", depots: 2800, retraits: 1600 },
    { date: "2024-04-13", depots: 3200, retraits: 1700 },
    { date: "2024-04-14", depots: 3500, retraits: 1900 },
    { date: "2024-04-15", depots: 3400, retraits: 1800 },
    { date: "2024-04-16", depots: 3700, retraits: 2000 },
    { date: "2024-04-17", depots: 4000, retraits: 2200 },
    { date: "2024-04-18", depots: 4200, retraits: 2300 },
    { date: "2024-04-19", depots: 3800, retraits: 2100 },
    { date: "2024-04-20", depots: 3500, retraits: 1900 },
    { date: "2024-04-21", depots: 3600, retraits: 2000 },
    { date: "2024-04-22", depots: 3900, retraits: 2100 },
    { date: "2024-04-23", depots: 4200, retraits: 2200 },
    { date: "2024-04-24", depots: 4500, retraits: 2400 },
    { date: "2024-04-25", depots: 4700, retraits: 2600 },
    { date: "2024-04-26", depots: 4900, retraits: 2700 },
    { date: "2024-04-27", depots: 5100, retraits: 2800 },
    { date: "2024-04-28", depots: 5300, retraits: 2900 },
    { date: "2024-04-29", depots: 5500, retraits: 3000 },
    { date: "2024-04-30", depots: 5700, retraits: 3100 },
    { date: "2024-05-01", depots: 5900, retraits: 3200 },
    { date: "2024-05-02", depots: 6100, retraits: 3300 },
    { date: "2024-05-03", depots: 6300, retraits: 3400 },
    { date: "2024-05-04", depots: 6500, retraits: 3500 },
    { date: "2024-05-05", depots: 6700, retraits: 3600 },
    { date: "2024-05-06", depots: 6900, retraits: 3700 },
    { date: "2024-05-07", depots: 7100, retraits: 3800 },
    { date: "2024-05-08", depots: 7300, retraits: 3900 },
    { date: "2024-05-09", depots: 7500, retraits: 4000 },
    { date: "2024-05-10", depots: 7700, retraits: 4100 },
    { date: "2024-05-11", depots: 7900, retraits: 4200 },
    { date: "2024-05-12", depots: 8100, retraits: 4300 },
    { date: "2024-05-13", depots: 8300, retraits: 4400 },
    { date: "2024-05-14", depots: 800, retraits: 4500 },
    { date: "2024-05-15", depots: 8700, retraits: 4600 },
    { date: "2024-05-16", depots: 8900, retraits: 4700 },
    { date: "2024-05-17", depots: 9100, retraits: 4800 },
    { date: "2024-05-18", depots: 9300, retraits: 4900 },
    { date: "2024-05-19", depots: 9500, retraits: 5000 },
    { date: "2024-05-20", depots: 9700, retraits: 5100 },
    { date: "2024-05-21", depots: 9900, retraits: 5200 },
    { date: "2024-05-22", depots: 10100, retraits: 5300 },
    { date: "2024-05-23", depots: 10300, retraits: 5400 },
    { date: "2024-05-24", depots: 1500, retraits: 550 },
    { date: "2024-05-25", depots: 10700, retraits: 5600 },
    { date: "2024-05-26", depots: 10900, retraits: 5700 },
    { date: "2024-05-27", depots: 11100, retraits: 5800 },
    { date: "2024-05-28", depots: 11300, retraits: 5900 },
    { date: "2024-05-29", depots: 11500, retraits: 6000 },
    { date: "2024-05-30", depots: 11700, retraits: 6100 },
    { date: "2024-05-31", depots: 11900, retraits: 6200 },
    { date: "2024-06-01", depots: 12100, retraits: 6300 },
    { date: "2024-06-02", depots: 12300, retraits: 6400 },
    { date: "2024-06-03", depots: 12500, retraits: 6500 },
    { date: "2024-06-04", depots: 12700, retraits: 6600 },
    { date: "2024-06-05", depots: 12900, retraits: 6700 },
    { date: "2024-06-06", depots: 1300, retraits: 600 },
    { date: "2024-06-07", depots: 13300, retraits: 6900 },
    { date: "2024-06-08", depots: 13500, retraits: 7000 },
    { date: "2024-06-09", depots: 13700, retraits: 7100 },
    { date: "2024-06-10", depots: 1300, retraits: 7200 },
    { date: "2024-06-11", depots: 14100, retraits: 7300 },
    { date: "2024-06-12", depots: 14300, retraits: 7400 },
    { date: "2024-06-13", depots: 14500, retraits: 7500 },
    { date: "2024-06-14", depots: 14700, retraits: 7600 },
    { date: "2024-06-15", depots: 14900, retraits: 7700 },
    { date: "2024-06-16", depots: 15100, retraits: 7800 },
    { date: "2024-06-17", depots: 15300, retraits: 7900 },
    { date: "2024-06-18", depots: 15500, retraits: 8000 },
    { date: "2024-06-19", depots: 15700, retraits: 8100 },
    { date: "2024-06-20", depots: 15900, retraits: 8200 },
    { date: "2024-06-21", depots: 16100, retraits: 8300 }
]

const chartConfig = {
  depots: {
    label: "Dépôts",
    color: "hsl(var(--chart-1))",
  },
  retraits: {
    label: "Retraits",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Charter() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const now = new Date()
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    now.setDate(now.getDate() - daysToSubtract)
    return date >= now
  })

  return (
    <Card className="mt-5">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Graphique des Transactions - Interactif</CardTitle>
          <CardDescription>
            Montre les dépôts et retraits totaux pour les 3 derniers mois
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Sélectionner une période"
          >
            <SelectValue placeholder="Les 3 derniers mois" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Les 3 derniers mois
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Les 30 derniers jours
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Les 7 derniers jours
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDepots" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-depots)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-depots)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillRetraits" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-retraits)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-retraits)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("fr-FR", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("fr-FR", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="retraits"
              type="natural"
              fill="url(#fillRetraits)"
              stroke="var(--color-retraits)"
              stackId="a"
            />
            <Area
              dataKey="depots"
              type="natural"
              fill="url(#fillDepots)"
              stroke="var(--color-depots)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
