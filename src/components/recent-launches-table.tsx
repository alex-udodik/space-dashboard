"use client"

import { Badge } from "@/components/ui/badge"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

type Launch = {
    mission: string
    vehicle: string
    site: string
    orbit: string
    payload: string
    booster: string
    outcome: "success" | "flight-test" | "scheduled"
}

const launches: Launch[] = [
    {
        mission: "Starlink 12-7",
        vehicle: "Falcon 9",
        site: "SLC-40",
        orbit: "LEO",
        payload: "17.5 t",
        booster: "B1067 · flight 24",
        outcome: "success",
    },
    {
        mission: "USSF-124",
        vehicle: "Falcon 9",
        site: "LC-39A",
        orbit: "MEO",
        payload: "6.2 t",
        booster: "B1080 · flight 11",
        outcome: "success",
    },
    {
        mission: "Polaris Dawn II",
        vehicle: "Falcon 9",
        site: "LC-39A",
        orbit: "LEO",
        payload: "12.9 t",
        booster: "B1083 · flight 7",
        outcome: "success",
    },
    {
        mission: "Flight 11",
        vehicle: "Starship",
        site: "Starbase",
        orbit: "Suborbital",
        payload: "—",
        booster: "B16 · flight 2",
        outcome: "flight-test",
    },
    {
        mission: "Transporter-14",
        vehicle: "Falcon 9",
        site: "SLC-4E",
        orbit: "SSO",
        payload: "9.1 t",
        booster: "B1071 · flight 22",
        outcome: "success",
    },
    {
        mission: "Eutelsat 36E",
        vehicle: "Falcon Heavy",
        site: "LC-39A",
        orbit: "GTO",
        payload: "5.8 t",
        booster: "B1085 · flight 3",
        outcome: "scheduled",
    },
]

function OutcomeBadge({ status }: { status: "success" | "flight-test" | "scheduled" }) {
    const styles = {
        success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
        "flight-test": "border-blue-500/30 bg-blue-500/10 text-blue-500",
        scheduled: "border-amber-500/30 bg-amber-500/10 text-amber-500",
    }
    const label = { success: "Success", "flight-test": "Flight test", scheduled: "Scheduled" }
    return (
        <Badge variant="outline" className={`gap-1.5 ${styles[status]}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {label[status]}
        </Badge>
    )
}


export function RecentLaunchesTable() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="grid gap-1">
                    <CardTitle>Recent launches</CardTitle>
                    <CardDescription>Latest 6 missions across all pads</CardDescription>
                </div>
                <Badge variant="outline">live feed</Badge>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Mission</TableHead>
                            <TableHead>Vehicle</TableHead>
                            <TableHead>Site</TableHead>
                            <TableHead>Orbit</TableHead>
                            <TableHead className="text-right">Payload</TableHead>
                            <TableHead>Booster</TableHead>
                            <TableHead>Outcome</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {launches.map((m) => (
                            <TableRow key={m.mission}>
                                <TableCell className="font-medium">{m.mission}</TableCell>
                                <TableCell>{m.vehicle}</TableCell>
                                <TableCell>{m.site}</TableCell>
                                <TableCell className="text-primary">{m.orbit}</TableCell>
                                <TableCell className="text-right font-medium">{m.payload}</TableCell>
                                <TableCell className="text-muted-foreground">{m.booster}</TableCell>
                                <TableCell><OutcomeBadge status={m.outcome} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}