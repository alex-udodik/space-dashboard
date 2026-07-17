"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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

export const description = "Booster recoveries per month by landing method"

const chartConfig = {
    droneship: {
        label: "Droneship (ASDS)",
        color: "#4E86CA",
    },
    ground: {
        label: "Ground pad (RTLS)",
        color: "#A28CF9",
    },
    expended: {
        label: "Expended",
        color: "#E0A458",
    },
} satisfies ChartConfig

type RecoveryDatum = {
    month: string
    droneship: number
    ground: number
    expended: number
}

export function BoosterRecoveryStackedBarChart() {
    const [chartData, setChartData] = React.useState<RecoveryDatum[]>([])

    React.useEffect(() => {
        fetch("/api/booster-recovery")
            .then((res) => res.json())
            .then((json) => setChartData(json.data))
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Booster recovery</CardTitle>
                <CardDescription>Falcon landings by method, Jan–Jun 2026</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            dataKey="droneship"
                            stackId="a"
                            fill="var(--color-droneship)"
                            radius={[0, 0, 4, 4]}
                        />
                        <Bar
                            dataKey="ground"
                            stackId="a"
                            fill="var(--color-ground)"
                        />
                        <Bar
                            dataKey="expended"
                            stackId="a"
                            fill="var(--color-expended)"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Recovery rate holding above 95% <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Droneship landings dominate; expendable flights are rare
                </div>
            </CardFooter>
        </Card>
    )
}
