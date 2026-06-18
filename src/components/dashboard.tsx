import { Button } from "@/components/ui/button"

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"


export function Dashboard() {
    return (
        <div className="flex flex-1 flex-col gap-6 p-6">
            <header className="flex flex-col gap-1">
                <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                    Welcome back — here&apos;s an overview of your workspace.
                </p>
            </header>

            <div className="grid  gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
            </div>

            <div className="rounded-xl border bg-card p-5 text-card-foreground shadow-sm">
                <h2 className="text-base font-semibold">Recent activity</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    Nothing here yet. This is a placeholder panel for your main content.
                </p>
            </div>
        </div>
    )
}
