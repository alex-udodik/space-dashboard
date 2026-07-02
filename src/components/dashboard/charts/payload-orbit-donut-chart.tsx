"use client"

import * as React from "react"
import { Cell, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

export const description = "A donut chart"

const chartConfig = {
    mass: { label: "Mass (t)" },
    leo: { label: "LEO" },
    sso: { label: "SSO" },
    gto: { label: "GTO" },
    meo: { label: "MEO" },
    other: { label: "Other" },
} satisfies ChartConfig

export function PayloadOrbitDonutChart() {
    const [chartData, setChartData] = React.useState<
        { orbit: string; mass: number }[]
    >([])

    React.useEffect(() => {
        fetch("/api/payload-orbit")
            .then((res) => res.json())
            .then((json) => setChartData(json.data))
    }, [])

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Payload by orbit</CardTitle>
                <CardDescription>Share of mass delivered, YTD</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="mass"
                            nameKey="orbit"
                            innerRadius={60}
                        >
                            {chartData.map((d, i) => (
                                <Cell key={d.orbit} fill={`var(--chart-${i + 1})`} />
                            ))}
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>

        </Card>
    )
}
