import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { LaunchCadenceChart } from "@/components/dashboard/charts/launch-cadence-chart"
import { PayloadOrbitDonutChart } from "./charts/payload-orbit-donut-chart"
import { MissionMixStackedbarChart } from "./charts/mission-mix-stacked-bar-chart"
import { StarLinkChart } from "./charts/starlink-chart"
import { BoosterFleetBarChart } from "./charts/booster-fleet-leaders-bar-chart"
import { SPCXPriceLineChart } from "./charts/spcx-price-line-chart"
import { RecentLaunchesTable } from "./charts/recent-launches-table"
import { CapabilityProfileChart } from "./charts/capability-profile-chart"

export function Dashboard() {
    return (
        <div className="flex flex-1 flex-col gap-6 p-6">
            <header className="flex flex-col gap-1">
                <h1 className="text-2xl font-semibold tracking-tight">Launch operations</h1>
                <p className="text-sm text-muted-foreground">
                    Welcome back — here&apos;s an overview of your workspace.
                </p>
            </header>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardDescription>Launches YTD</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums">94</CardTitle>
                        <CardAction>
                            <Badge variant="outline" className="text-emerald-500">
                                <TrendingUp className="size-3" /> +18%
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="text-muted-foreground text-sm">
                        vs same period 2025
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardDescription>Mission Success</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums">99.2%</CardTitle>
                        <CardAction>
                            <Badge variant="outline" className="text-emerald-500">
                                <TrendingUp className="size-3" /> +0.4%
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="text-muted-foreground text-sm">
                        93 of 94 nominal
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardDescription>Payload to orbit</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums">1,284 t</CardTitle>
                        <CardAction>
                            <Badge variant="outline" className="text-emerald-500">
                                <TrendingUp className="size-3" /> +22%
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="text-muted-foreground text-sm">
                        ~83% of global mass
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardDescription>SPCX · market cap</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums">$2.04 T</CardTitle>
                        <CardAction>
                            <Badge variant="outline" className="text-emerald-500">
                                <TrendingUp className="size-3" /> +9.8%
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="text-muted-foreground text-sm">
                        since June 12 debut
                    </CardFooter>
                </Card>
            </div>



            <LaunchCadenceChart />

            <div className="grid gap-4 lg:grid-cols-4">
                <PayloadOrbitDonutChart />
                <StarLinkChart />
                <BoosterFleetBarChart />
                <SPCXPriceLineChart />
                <MissionMixStackedbarChart />
                <CapabilityProfileChart />
            </div>






            <RecentLaunchesTable />

            <div className="rounded-xl border bg-card p-5 text-card-foreground shadow-sm">
                <h2 className="text-base font-semibold">Recent activity</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    Nothing here yet. This is a placeholder panel for your main content.
                </p>
            </div>
        </div>
    )
}
