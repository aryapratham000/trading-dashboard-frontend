"use client";

export default function MarketClosedOverlay({
  show,
  nextOpen,
  instrument = "ES Futures",
  timeZone = "America/Toronto",
}) {
  if (!show) return null;

  // Prepare formatted "Next Market Open" text if we have a valid timestamp
  let formattedNextOpen = null;
  if (nextOpen) {
    const dt = new Date(nextOpen);
    if (!Number.isNaN(dt.getTime())) {
      formattedNextOpen = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone,
        timeZoneName: "short",
      }).format(dt);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[80] bg-background/95 backdrop-blur-md flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="market-closed-title"
    >
      <div className="text-center space-y-6 max-w-md mx-auto p-8">
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-muted/50 border-2 border-border flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-destructive" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 id="market-closed-title" className="font-serif font-bold text-2xl text-foreground">
              Market Closed
            </h2>
            <p className="text-muted-foreground">
              The {instrument} market is currently closed. Live data will resume when the market
              reopens.
            </p>
          </div>
        </div>

        {formattedNextOpen && (
          <div className="bg-card/50 rounded-lg p-4 border border-border backdrop-blur-sm">
            <div className="text-sm text-muted-foreground mb-1">Next Market Open</div>
            <div className="font-mono font-semibold text-primary">{formattedNextOpen}</div>
          </div>
        )}

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
          <span>Waiting for market to open...</span>
        </div>
      </div>
    </div>
  );
}
