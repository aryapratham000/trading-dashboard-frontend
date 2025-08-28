"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function Column1h({
  snapshot,
  probs,
  counts,
  rangePred,
  rangeCurr,
  onChangeFilters,
  events,
  timestamp,
}) {
  const [filters, setFilters] = useState({
    liveUpdates: true,
    prevColor_2: true,
    session: true,
    range_bin: false,
    pdHL: false,
    priceAboveNYOpen: false,
    priceAbovePDNYOpen: false,
  })

  const getMinutesUntilNextHour = () => {
    if (!timestamp) return "—"

    try {
      const now = new Date(timestamp)
      const nextHour = new Date(now)
      nextHour.setHours(nextHour.getHours() + 1, 0, 0, 0)

      const diffMs = nextHour.getTime() - now.getTime()
      const diffMinutes = Math.floor(diffMs / (1000 * 60))

      return diffMinutes > 0 ? `${diffMinutes} min` : "—"
    } catch (error) {
      return "—"
    }
  }

  useEffect(() => {
    onChangeFilters?.(filters)
  }, [filters])

  const label = {
    liveUpdates: "Live Updates",
    prevColor_2: "2 Step Chain",
    session: "Session",
    range_bin: "Relative Range",
    pdHL: "PreviousDay H/L",
    priceAboveNYOpen: "NewYork Open",
    priceAbovePDNYOpen: "PreviousDay NewYork Open",
  }

  const colorToMeaning = {
    green: "Bullish Continuation",
    blue: "Bullish Reversal",
    purple: "Bullish Expansion",
    yellow: "Bearish Reversal",
    red: "Bearish Continuation",
    maroon: "Bearish Expansion",
    gray: "Contraction",
  }

  const colorDescriptions = {
    green: "Green - Breaks previous high and closes above open",
    blue: "Blue - Breaks previous low and closes above open",
    purple: "Purple - Breaks previous high & low, closes above open",
    yellow: "Yellow - Breaks previous high and closes below open",
    red: "Red - Breaks previous low and closes below open",
    maroon: "Maroon - Breaks previous high & low, closes below open",
    gray: "Gray - Price consolidates within previous bar's range",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-serif font-bold text-xl text-card-foreground">1H Analytics</h2>
          <span className="text-sm text-muted-foreground">| {getMinutesUntilNextHour()} till next session</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-muted/30 rounded-lg p-4 border border-border">
          <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">Predicted Range</div>
          <div className="font-mono font-bold text-lg text-primary">{rangePred ?? "—"}</div>
        </div>
        <div className="bg-muted/30 rounded-lg p-4 border border-border">
          <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">Current Range</div>
          <div className="font-mono font-bold text-lg text-accent">{rangeCurr ?? "—"}</div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-card-foreground">Session Regime Probabilities</h3>
        <div className="h-80 overflow-y-auto">
          <div className="grid gap-2">
            {probs ? (
              Object.entries(probs).map(([cls, p]) => (
                <div key={cls} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-card-foreground">{colorToMeaning[cls] || cls}</span>
                      <div className="relative group">
                        <div className="w-3 h-3 rounded-full bg-muted border border-border flex items-center justify-center cursor-help">
                          <span className="text-[8.5px] font-bold text-muted-foreground">i</span>
                        </div>
                        <div className="absolute left-0 top-6 w-64 p-2 bg-popover border border-border rounded-md shadow-lg text-xs text-popover-foreground opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                          {colorDescriptions[cls] || `${cls} - No description available`}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-sm">{Math.round(p * 100)}%</span>
                      <Badge variant="outline" className="text-xs">
                        {counts?.[cls] ?? 0}
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.round(p * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span>Calculating probabilities...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-card-foreground">Events</h3>
        {events ? (
          <div className="grid gap-2">
            {Object.entries(events).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between p-2 bg-muted/30 rounded-lg border border-border"
              >
                <span className="text-xs font-medium text-card-foreground">
                  {key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
                <div
                  className={`font-bold text-sm px-2 py-1 rounded ${
                    String(value).includes("break") || String(value).includes("%")
                      ? "bg-primary text-primary-foreground"
                      : value
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {String(value)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">No events data</div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-card-foreground">Filters</h3>
        <div className="grid gap-4">
          {Object.entries(filters).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <Label htmlFor={`1h-${key}`} className="text-sm font-medium text-card-foreground">
                {label[key] || key}
              </Label>
              <Switch
                id={`1h-${key}`}
                checked={value}
                onCheckedChange={() => setFilters((prev) => ({ ...prev, [key]: !prev[key] }))}
                className="data-[state=unchecked]:border data-[state=unchecked]:border-muted-foreground/30"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-card-foreground">Snapshot</h3>
        {!snapshot ? (
          <div className="text-center py-4 text-muted-foreground">No snapshot data</div>
        ) : (
          <div className="space-y-0.5 max-h-32 overflow-y-auto">
            {Object.entries(snapshot || {}).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between px-2 py-0.5 bg-muted/20 rounded text-xs border border-border"
              >
                <span className="text-muted-foreground font-medium">{key}</span>
                <span className="font-mono text-card-foreground">{String(value)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
