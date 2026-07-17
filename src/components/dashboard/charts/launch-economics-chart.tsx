"use client"

import * as React from "react"
import { TrendingDown } from "lucide-react"
import { Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

export const description = "Annual launches vs. cost per kg to orbit"

const chartConfig = {
    launches: {
        label: "Launches",
        color: "#4E86CA",
    },
    costPerKg: {
        label: "$ / kg to LEO",
        color: "#E0A458",
    },
} satisfies ChartConfig

type EconomicsDatum = {
    year: string
    launches: number
    costPerKg: number
}

export function LaunchEconomicsChart() {
    const [chartData, setChartData] = React.useState<EconomicsDatum[]>([])

    React.useEffect(() => {
        fetch("/api/launch-economics")
            .then((res) => res.json())
            .then((json) => setChartData(json.data))
    }, [])

    const first = chartData[0]
    const last = chartData.at(-1)
    const costDrop =
        first && last ? ((first.costPerKg - last.costPerKg) / first.costPerKg) * 100 : 0

    return (
        <Card>
            <CardHeader>
                <CardTitle>Launch economics</CardTitle>
                <CardDescription>Annual launches vs. cost per kg to LEO</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <ChartContainer config={chartConfig}>
                    <ComposedChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="year"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <YAxis
                            yAxisId="left"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            width={32}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            width={44}
                            tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            yAxisId="left"
                            dataKey="launches"
                            fill="var(--color-launches)"
                            radius={[4, 4, 0, 0]}
                        />
                        <Line
                            yAxisId="right"
                            dataKey="costPerKg"
                            type="monotone"
                            stroke="var(--color-costPerKg)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </ComposedChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Cost per kg down {costDrop.toFixed(0)}% since {first?.year}<TrendingDown className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    {last ? `$${last.costPerKg.toLocaleString()}/kg to LEO in ${last.year}` : ""}
                </div>
            </CardFooter>
        </Card>
    )
}
