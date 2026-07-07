"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"

export function LightDarkSwitch() {

    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)
    React.useEffect(() => setMounted(true), [])

    return (<div className="flex items-center gap-2">
        <SunIcon className="size-4" />
        <Switch
            checked={mounted && resolvedTheme === "dark"}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            aria-label="Toggle dark mode"
        />
        <MoonIcon className="size-4 text-muted-foreground" />
    </div>)
}

export default LightDarkSwitch
