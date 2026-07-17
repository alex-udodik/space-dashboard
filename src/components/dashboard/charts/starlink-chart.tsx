"use client"

import { TrendingDown, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
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

export const description = "An area chart with gradient fill"

const chartConfig = {
    v1: { label: "v1 (Gen1)", color: "var(--chart-2)" },
    v2: { label: "v2 (Gen2)", color: "var(--chart-1)" },
} satisfies ChartConfig

export function StarLinkChart() {

    const [starLinkdata, setStarLinkdata] = useState<{ month: string; v1: number; v2: number }[]>([])
    useEffect(() => {
        fetch("/api/star-link")
            .then((res) => res.json())
            .then((json) => setStarLinkdata(json.data))
    }, [])

    const first = starLinkdata[0]
    const last = starLinkdata.at(-1)
    const firstTotal = first ? first.v1 + first.v2 : 0
    const lastTotal = last ? last.v1 + last.v2 : 0
    const growth = firstTotal ? ((lastTotal - firstTotal) / firstTotal) * 100 : 0

    return (
        <Card>
            <CardHeader>
                <CardTitle>Starlink constellation</CardTitle>
                <CardDescription>
                    Active satellites in orbit
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={starLinkdata}
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
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <defs>
                            <linearGradient id="fillV1" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-v1)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-v1)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillV2" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-v2)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-v2)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="v1"
                            type="natural"
                            fill="url(#fillV1)"
                            fillOpacity={0.4}
                            stroke="var(--color-v1)"
                            stackId="a"
                        />
                        <Area
                            dataKey="v2"
                            type="natural"
                            fill="url(#fillV2)"
                            fillOpacity={0.4}
                            stroke="var(--color-v2)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 leading-none font-medium">
                            Trending {growth > 0 ? "up" : "down"} by {Math.abs(growth).toFixed(1)}%
                            {growth > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
