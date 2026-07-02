"use client"

import * as React from "react"
import { Pie, PieChart } from "recharts"

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
    mass: {
        label: "Mass (t)",
    },
    leo: {
        label: "LEO",
        color: "var(--chart-1)",
    },
    sso: {
        label: "SSO",
        color: "var(--chart-2)",
    },
    gto: {
        label: "GTO",
        color: "var(--chart-3)",
    },
    meo: {
        label: "MEO",
        color: "var(--chart-4)",
    },
    other: {
        label: "Other",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig

export function PayloadOrbitDonutChart() {
    const [chartData, setChartData] = React.useState<
        { orbit: string; mass: number; fill: string }[]
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
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>

        </Card>
    )
}
