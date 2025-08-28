import { Badge } from "@/components/ui/badge"
import SentimentGauge from "./SentimentGauge"

export default function TopRow({ timestamp, contract, dailyLevels, probs4h, probs1h }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-6">
          <h2 className="font-serif font-bold text-xl text-card-foreground">Market Overview</h2>
          <div className="block sm:flex items-center gap-2 sm:gap-4 text-base">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Time:</span>
              <Badge variant="outline" className="font-mono text-sm">
                {timestamp ?? "—"}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Contract:</span>
              <Badge variant="secondary" className="font-mono font-semibold text-sm">
                {contract ?? "—"}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <SentimentGauge probs4h={probs4h} probs1h={probs1h} size="medium" />
        </div>
      </div>

      <div className="space-y-3 bg-gradient-to-br from-card/30 to-card/10 rounded-lg p-4 border border-border/30 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="relative z-10">
          <h3 className="font-semibold text-base text-card-foreground">Daily Levels</h3>
          {!dailyLevels ? (
            <div className="flex items-center justify-center py-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span>Loading market data...</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
              {Object.entries(dailyLevels).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-muted/50 rounded-md p-2 border border-border relative overflow-hidden backdrop-blur-sm"
                >
                  <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-[length:8px_8px]"></div>
                  <div className="relative z-10">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">
                      {key.replace(/_/g, " ")}
                    </div>
                    <div className="font-mono font-semibold text-xs text-card-foreground">
                      {value ??
                        (key.toLowerCase().includes("high") || key.toLowerCase().includes("low") ? "Out of RTH" : "—")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
