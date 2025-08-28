"use client"

import { useEffect, useRef, useState } from "react"
import TopRow from "./TopRow"
import Column4h from "./Column_4h"
import Column1h from "./Column_1h"
import { Card } from "@/components/ui/card"

export default function App() {
  const wsRef = useRef(null)

  // Central state
  const [topRow, setTopRow] = useState({
    timestamp: null,
    contract: null,
    dailyLevels: null,
  })

  const [h4, setH4] = useState({
    snapshot: null,
    probs: null,
    counts: null,
    rangePred: null,
    rangeCurr: null,
    events: null,
  })

  const [h1, setH1] = useState({
    snapshot: null,
    probs: null,
    counts: null,
    rangePred: null,
    rangeCurr: null,
    events: null,
  })

  // Open WebSocket
  useEffect(() => {
    const ws = new WebSocket("wss://render-backend-pl2s.onrender.com/ws/stream")
    wsRef.current = ws

    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data)

      switch (msg.type) {
        case "1min_tick": {
          // Top row
          setTopRow({
            timestamp: msg.timestamp,
            contract: msg.contract,
            dailyLevels: msg.daily_levels,
          })

          // 4h snapshot/probs/counts
          setH4((prev) => ({
            ...prev,
            snapshot: msg.snapshot_4h,
            probs: msg.probs_4h,
            counts: msg.counts_4h,
            rangeCurr: msg.rangeCurr_4h,
            events: msg.events_4h,
          }))

          // 1h snapshot/probs/counts
          setH1((prev) => ({
            ...prev,
            snapshot: msg.snapshot_1h ?? prev.snapshot,
            probs: msg.probs_1h,
            counts: msg.counts_1h,
            rangeCurr: msg.rangeCurr_1h,
            events: msg.events_1h,
          }))
          break
        }

        case "range_prediction": {
          setH4((prev) => ({ ...prev, rangePred: msg.rangePred_4h }))
          setH1((prev) => ({ ...prev, rangePred: msg.rangePred_1h }))
          break
        }

        case "filter_update_4h": {
          setH4((prev) => ({
            ...prev,
            probs: msg.probs_4h,
            counts: msg.counts_4h,
            events: msg.events_4h,
          }))
          break
        }

        case "filter_update_1h": {
          setH1((prev) => ({
            ...prev,
            probs: msg.probs_1h,
            counts: msg.counts_1h,
            events: msg.events_1h,
          }))
          break
        }

        default:
          // ignore unknown messages
          break
      }
    }

    return () => ws.close()
  }, [])

  // Helper to send filter requests
  const sendFilter = (horizon, filters_enabled) => {
    if (!wsRef.current) return
    const type = horizon === "4h" ? "filter_request_4h" : "filter_request_1h"
    wsRef.current.send(JSON.stringify({ type, filters_enabled }))
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">ES</span>
              </div>
              <h1 className="font-serif font-bold text-xl text-foreground">ES Futures Live Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse"></div>
              <span className="text-sm text-muted-foreground font-medium">Live</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-6 space-y-6">
        <Card className="p-4">
          <TopRow
            timestamp={topRow.timestamp}
            contract={topRow.contract}
            dailyLevels={topRow.dailyLevels}
            probs4h={h4.probs}
            probs1h={h1.probs}
          />
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-4">
            <Column4h {...h4} onChangeFilters={(f) => sendFilter("4h", f)} timestamp={topRow.timestamp} />
          </Card>
          <Card className="p-4">
            <Column1h {...h1} onChangeFilters={(f) => sendFilter("1h", f)} timestamp={topRow.timestamp} />
          </Card>
        </div>
      </main>
    </div>
  )
}
