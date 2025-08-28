"use client"

import { useMemo } from "react"

export default function SentimentGauge({ probs4h, probs1h, size = "normal" }) {
  const colorMapping = {
    green: "bullish_continuation",
    yellow: "bearish_reversal",
    blue: "bullish_reversal",
    red: "bearish_continuation",
    gray: "inside_bar",
    maroon: "bearish_expansion",
    purple: "bullish_expansion",
  }

  const remapProbs = (probs) => {
    if (!probs) return {}
    const out = {}
    for (const [color, prob] of Object.entries(probs)) {
      if (colorMapping[color]) {
        out[colorMapping[color]] = prob
      }
    }
    return out
  }

  const sentimentScore = useMemo(() => {
    if (!probs4h || !probs1h) return 50 // Neutral when no data

    const remapped4h = remapProbs(probs4h)
    const remapped1h = remapProbs(probs1h)

    // Calculate bullish vs bearish probabilities
    let bullishScore = 0
    let bearishScore = 0
    let totalWeight = 0

    Object.entries(remapped4h).forEach(([category, prob]) => {
      const weight = 0.6
      totalWeight += weight

      if (
        category.includes("bullish_continuation") ||
        category.includes("bullish_reversal") ||
        category.includes("bullish_expansion")
      ) {
        bullishScore += prob * weight
      } else if (
        category.includes("bearish_continuation") ||
        category.includes("bearish_reversal") ||
        category.includes("bearish_expansion")
      ) {
        bearishScore += prob * weight
      }
      // inside_bar is neutral, so we don't add it to either side
    })

    Object.entries(remapped1h).forEach(([category, prob]) => {
      const weight = 0.4
      totalWeight += weight

      if (
        category.includes("bullish_continuation") ||
        category.includes("bullish_reversal") ||
        category.includes("bullish_expansion")
      ) {
        bullishScore += prob * weight
      } else if (
        category.includes("bearish_continuation") ||
        category.includes("bearish_reversal") ||
        category.includes("bearish_expansion")
      ) {
        bearishScore += prob * weight
      }
    })

    // Calculate final sentiment (0-100)
    if (totalWeight === 0) return 50
    const netBullish = (bullishScore - bearishScore) / totalWeight
    return Math.max(0, Math.min(100, 50 + netBullish * 50))
  }, [probs4h, probs1h])

  const getSentimentColor = (score) => {
    if (score <= 30) return "text-red-400"
    if (score <= 45) return "text-red-300"
    if (score <= 55) return "text-gray-400"
    if (score <= 70) return "text-green-300"
    return "text-green-400"
  }

  const getSentimentLabel = (score) => {
    if (score <= 30) return "Strong Bearish"
    if (score <= 45) return "Bearish"
    if (score <= 55) return "Neutral"
    if (score <= 70) return "Bullish"
    return "Strong Bullish"
  }

  const getGaugeColor = (score) => {
    if (score <= 30) return "#ef4444"
    if (score <= 45) return "#f87171"
    if (score <= 55) return "#9ca3af"
    if (score <= 70) return "#86efac"
    return "#4ade80"
  }

  const isSmall = size === "small"
  const isMedium = size === "medium"
  const gaugeSize = isSmall ? "w-20 h-20" : isMedium ? "w-24 h-24" : "w-28 h-28"
  const textSize = isSmall ? "text-base font-bold" : isMedium ? "text-lg font-bold" : "text-xl font-bold"
  const labelSize = isSmall ? "text-xs font-medium" : isMedium ? "text-sm font-semibold" : "text-sm font-semibold"
  const containerPadding = isSmall ? "p-3" : isMedium ? "p-3" : "p-4"

  return (
    <div
      className={`bg-card/60 rounded-lg ${containerPadding} border border-border/50 backdrop-blur-sm relative overflow-hidden`}
    >
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]"></div>
      <div className="text-center space-y-2 relative z-10">
        {!isSmall && <h3 className="font-semibold text-sm text-card-foreground/90 tracking-wide">Market Sentiment</h3>}

        {/* Circular Gauge */}
        <div className={`relative ${gaugeSize} mx-auto`}>
          <svg className={`${gaugeSize} transform -rotate-90`} viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              className="text-muted/20"
            />
            {/* Progress circle with glow effect */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke={getGaugeColor(sentimentScore)}
              strokeWidth="6"
              fill="none"
              strokeDasharray={`${2.51 * sentimentScore} 251.2`}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out drop-shadow-sm"
              style={{
                filter: `drop-shadow(0 0 4px ${getGaugeColor(sentimentScore)}40)`,
              }}
            />
          </svg>
          {/* Center text with better visibility */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`${textSize} ${getSentimentColor(sentimentScore)} drop-shadow-sm`}>
              {Math.round(sentimentScore)}
            </span>
          </div>
        </div>

        {/* Label with percentage indicator */}
        <div className="space-y-1">
          <div className={`${labelSize} ${getSentimentColor(sentimentScore)}`}>
            {isSmall ? getSentimentLabel(sentimentScore).split(" ")[0] : getSentimentLabel(sentimentScore)}
          </div>
          <div className="flex items-center justify-center gap-1"></div>
        </div>
      </div>
    </div>
  )
}
