"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import type { GlobeMethods } from "react-globe.gl"

import trajectories from "@/data/launch-trajectories.json"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

// react-globe.gl touches `window`/WebGL, so it must never render on the server.
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false })

type Flight = (typeof trajectories.flights)[number]

const EARTH_RADIUS_KM = 6371

const outcomeStyles: Record<string, string> = {
    success: "text-emerald-400 bg-emerald-400/10 ring-emerald-400/30",
    "flight-test": "text-amber-400 bg-amber-400/10 ring-amber-400/30",
    scheduled: "text-sky-400 bg-sky-400/10 ring-sky-400/30",
}

export function LaunchGlobe() {
    const flights = trajectories.flights as Flight[]
    const sites = trajectories.sites

    const [selectedMission, setSelectedMission] = React.useState(
        flights[0]?.mission ?? "",
    )
    const selected = flights.find((f) => f.mission === selectedMission) ?? flights[0]

    const globeRef = React.useRef<GlobeMethods | undefined>(undefined)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [size, setSize] = React.useState({ width: 0, height: 0 })

    // Keep the WebGL canvas sized to its container.
    React.useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const ro = new ResizeObserver((entries) => {
            const cr = entries[0].contentRect
            setSize({ width: cr.width, height: cr.height })
        })
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    // Fly the camera to frame whichever trajectory is selected — pull back
    // farther for high-apogee orbits (GTO/MEO) so the whole arc is visible.
    React.useEffect(() => {
        if (!globeRef.current || !selected) return
        const apogeeRadii = selected.apogeeKm / EARTH_RADIUS_KM
        const altitude = Math.min(8, Math.max(1.9, 1.5 + apogeeRadii))
        globeRef.current.pointOfView(
            { lat: selected.launchLat, lng: selected.launchLng, altitude },
            1200,
        )
    }, [selected])

    const handleReady = React.useCallback(() => {
        const g = globeRef.current
        if (!g) return
        const controls = g.controls()
        controls.autoRotate = true
        controls.autoRotateSpeed = 0.35
        controls.enableZoom = false // don't hijack page scroll
        if (selected) {
            const apogeeRadii = selected.apogeeKm / EARTH_RADIUS_KM
            const altitude = Math.min(8, Math.max(1.9, 1.5 + apogeeRadii))
            g.pointOfView(
                { lat: selected.launchLat, lng: selected.launchLng, altitude },
                0,
            )
        }
    }, [selected])

    // Points: every pad, with the active flight's pad lit brighter/larger.
    const pointsData = sites.map((s) => ({
        ...s,
        active: s.id === selected?.site,
    }))

    return (
        <Card className="gap-0 py-0">
            <div className="flex flex-col gap-2 p-2 md:flex-row">
                {/* Flight picker */}
                <div className="flex gap-2 overflow-x-auto pb-1 md:w-64 md:shrink-0 md:flex-col md:overflow-x-visible md:overflow-y-auto md:pb-0 md:pr-1 md:[max-height:560px]">
                    {flights.map((f) => {
                        const isActive = f.mission === selectedMission
                        return (
                            <button
                                key={f.mission}
                                type="button"
                                onClick={() => setSelectedMission(f.mission)}
                                className={cn(
                                    "group shrink-0 rounded-lg border border-transparent bg-muted/40 px-3 py-2.5 text-left transition-colors md:w-full",
                                    "hover:bg-muted",
                                    isActive && "bg-accent ring-1",
                                )}
                                style={
                                    isActive
                                        ? { borderColor: f.color, boxShadow: `inset 3px 0 0 ${f.color}` }
                                        : undefined
                                }
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                        className="size-2.5 shrink-0 rounded-full"
                                        style={{ backgroundColor: f.color }}
                                    />
                                    <span className="text-sm font-medium text-foreground">
                                        {f.mission}
                                    </span>
                                </div>
                                <div className="mt-1 flex items-center gap-2 pl-4.5">
                                    <span className="text-xs text-muted-foreground">
                                        {f.vehicle} · {f.orbit}
                                    </span>
                                    <span
                                        className={cn(
                                            "ml-auto rounded px-1.5 py-0.5 text-[10px] font-medium capitalize ring-1 md:ml-0",
                                            outcomeStyles[f.outcome] ??
                                                "text-muted-foreground bg-muted ring-border",
                                        )}
                                    >
                                        {f.outcome.replace("-", " ")}
                                    </span>
                                </div>
                            </button>
                        )
                    })}
                </div>

                {/* Globe */}
                <div
                    ref={containerRef}
                    className="relative h-[440px] flex-1 overflow-hidden rounded-lg bg-black md:h-[560px]"
                >
                    {/* Title overlay */}
                    <div className="pointer-events-none absolute top-3 left-3 z-10">
                        <h2 className="text-sm font-semibold leading-tight text-white drop-shadow">
                            Flight trajectories
                        </h2>
                        <p className="text-xs leading-tight text-white/60 drop-shadow">
                            Select a mission to trace its ascent and orbit
                        </p>
                    </div>

                    <Globe
                        ref={globeRef as React.MutableRefObject<GlobeMethods | undefined>}
                        width={size.width || undefined}
                        height={size.height || undefined}
                        onGlobeReady={handleReady}
                        backgroundImageUrl="/night-sky.png"
                        globeImageUrl="/earth-night.jpg"
                        bumpImageUrl="/earth-topology.png"
                        atmosphereColor="#6ea8ff"
                        atmosphereAltitude={0.18}
                        pointsData={pointsData}
                        pointLat={(d: object) => (d as (typeof pointsData)[number]).lat}
                        pointLng={(d: object) => (d as (typeof pointsData)[number]).lng}
                        pointColor={(d: object) =>
                            (d as (typeof pointsData)[number]).active ? "#ffffff" : "#e0a458"
                        }
                        pointAltitude={0.01}
                        pointRadius={(d: object) =>
                            (d as (typeof pointsData)[number]).active ? 0.5 : 0.28
                        }
                        pointLabel={(d: object) => (d as (typeof pointsData)[number]).name}
                        ringsData={selected ? [selected] : []}
                        ringLat={(d: object) => (d as Flight).launchLat}
                        ringLng={(d: object) => (d as Flight).launchLng}
                        ringColor={() => (t: number) => `rgba(255,255,255,${1 - t})`}
                        ringMaxRadius={4}
                        ringPropagationSpeed={2.5}
                        ringRepeatPeriod={900}
                        pathsData={selected ? [selected] : []}
                        pathPoints={(d: object) => (d as Flight).path}
                        pathPointLat={(p: unknown) => (p as number[])[0]}
                        pathPointLng={(p: unknown) => (p as number[])[1]}
                        pathPointAlt={(p: unknown) => (p as number[])[2]}
                        pathColor={(d: object) => (d as Flight).color}
                        pathStroke={2.5}
                        pathDashLength={0.4}
                        pathDashGap={0.15}
                        pathDashAnimateTime={6000}
                        pathTransitionDuration={1400}
                    />

                    {/* Stats overlay for the selected flight */}
                    {selected && (
                        <div className="pointer-events-none absolute bottom-3 left-3 rounded-lg bg-card/80 px-3 py-2 text-xs text-card-foreground backdrop-blur-sm ring-1 ring-border">
                            <div className="flex items-center gap-2 font-medium">
                                <span
                                    className="size-2 rounded-full"
                                    style={{ backgroundColor: selected.color }}
                                />
                                {selected.mission}
                            </div>
                            <dl className="mt-1.5 grid grid-cols-[auto_auto] gap-x-3 gap-y-0.5 text-muted-foreground">
                                <dt>Pad</dt>
                                <dd className="text-right text-foreground tabular-nums">
                                    {selected.site}
                                </dd>
                                <dt>Apogee</dt>
                                <dd className="text-right text-foreground tabular-nums">
                                    {selected.apogeeKm.toLocaleString()} km
                                </dd>
                                <dt>Inclination</dt>
                                <dd className="text-right text-foreground tabular-nums">
                                    {selected.inclinationDeg}°
                                </dd>
                            </dl>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    )
}
