"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts"
import { useState } from 'react';
import { useEffect } from "react";


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
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

export const description = "A mixed bar chart"

const chartConfig = {
    flights: { label: "Flights" },
} satisfies ChartConfig

// Light blue -> purple ramp, matching the tone used across the other charts
const barColors = [
    "oklch(0.72 0.10 250)",
    "oklch(0.70 0.12 263)",
    "oklch(0.69 0.13 276)",
    "oklch(0.68 0.14 288)",
    "oklch(0.67 0.15 298)",
]

export function BoosterFleetBarChart() {

    const [boosterData, setBoosterData] = useState<{ booster: string; flights: number; }[]>([])
    useEffect(() => {
        fetch("/api/booster-fleet-leaders")
            .then((res) => res.json())
            .then((json) => setBoosterData(json.data))
    }, [])

    const flightMax = Math.max(...boosterData.map((d) => d.flights))
    const leader = boosterData.reduce(
        (best, d) => (d.flights > best.flights ? d : best),
        boosterData[0]
    )
    return (
        <Card>
            <CardHeader>
                <CardTitle>Booster fleet leaders</CardTitle>
                <CardDescription>Flights flown per first-stage booster</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={boosterData}
                        layout="vertical"
                        margin={{
                            left: 0,
                        }}
                    >
                        <YAxis
                            dataKey="booster"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value}
                        />
                        <XAxis dataKey="flights" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="flights" radius={5}>
                            {boosterData.map((d, i) => (
                                <Cell key={d.booster} fill={barColors[i % barColors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                {leader?.booster} leads the fleet with {leader?.flights} flights
            </CardFooter>
        </Card>
    )
}
