"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

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

export const description = "Falcon 9 vs Starship capability profile"

const chartConfig = {
    falcon9: {
        label: "Falcon 9",
        color: "#4E86CA",
    },
    starship: {
        label: "Starship",
        color: "#A28CF9",
    },
} satisfies ChartConfig

type CapabilityDatum = {
    metric: string
    falcon9: number
    starship: number
}

export function CapabilityProfileChart() {
    const [chartData, setChartData] = React.useState<CapabilityDatum[]>([])

    React.useEffect(() => {
        fetch("/api/capability-profile")
            .then((res) => res.json())
            .then((json) => setChartData(json.data))
    }, [])

    return (
        <Card>
            <CardHeader className="items-center pb-4">
                <CardTitle>Capability profile</CardTitle>
                <CardDescription>Falcon 9 vs Starship, normalized 0–100</CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadarChart data={chartData}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <PolarGrid />
                        <PolarAngleAxis dataKey="metric" />
                        <Radar
                            dataKey="falcon9"
                            fill="var(--color-falcon9)"
                            fillOpacity={0.5}
                            stroke="var(--color-falcon9)"
                        />
                        <Radar
                            dataKey="starship"
                            fill="var(--color-starship)"
                            fillOpacity={0.4}
                            stroke="var(--color-starship)"
                        />
                        <ChartLegend className="mt-4" content={<ChartLegendContent />} />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    Starship leads on mass; Falcon 9 on cadence &amp; crew{" "}
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                    Relative capability, mid-2026
                </div>
            </CardFooter>
        </Card>
    )
}
