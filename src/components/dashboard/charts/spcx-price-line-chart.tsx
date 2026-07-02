"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, Area, AreaChart } from "recharts"
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

export const description = "A line chart"

const chartConfig = {
    close: {
        label: "Close($)",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function SPCXPriceLineChart() {
    const [priceData, setPriceData] = useState<{ month: string; close: number; }[]>([])
    useEffect(() => {
        fetch("/api/spcx-price")
            .then((res) => res.json())
            .then((json) => setPriceData(json.data))
    }, [])

    const latest = priceData.at(-1)?.close ?? 0;
    const prev = priceData.at(-2)?.close ?? 0;
    const change = prev ? ((latest - prev) / prev) * 100 : 0;
    const up = change >= 0


    return (
        <Card>
            <CardHeader>
                <CardTitle>SPCX price</CardTitle>
                <CardDescription>Monthly close, 2026</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={priceData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <defs>
                            <linearGradient id="fillClose" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-close)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-close)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="close"
                            type="natural"
                            fill="url(#fillClose)"
                            stroke="var(--color-close)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Trending {up ? "up" : "down"} by {Math.abs(change).toFixed(1)}% this month<TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}
