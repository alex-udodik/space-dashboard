"use client"

import { Badge } from "@/components/ui/badge"
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

    const [launchData, setLaunchData] = useState<Launch[]>([])
    useEffect(() => {
        fetch("/api/recent-launches")
            .then((res) => res.json())
            .then((json) => setLaunchData(json.data))
    }, [])


    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="grid gap-1">
                    <CardTitle>Recent launches</CardTitle>
                    <CardDescription>Latest {launchData.length} missions across all pads</CardDescription>
                </div>

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
                        {launchData.map((m) => (
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