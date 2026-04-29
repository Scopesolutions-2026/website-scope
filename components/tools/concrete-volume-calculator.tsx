"use client"

import { useState, useEffect } from "react"
import { X, Box } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ConcreteVolumeCalculatorProps {
  onClose: () => void
}

export default function ConcreteVolumeCalculator({ onClose }: ConcreteVolumeCalculatorProps) {
  const [width, setWidth] = useState<string>("")
  const [length, setLength] = useState<string>("")
  const [depth, setDepth] = useState<string>("")
  const [volume, setVolume] = useState<number | null>(null)

  useEffect(() => {
    const w = parseFloat(width)
    const l = parseFloat(length)
    const d = parseFloat(depth)

    if (isNaN(w) || isNaN(l) || isNaN(d) || w <= 0 || l <= 0 || d <= 0) {
      setVolume(null)
      return
    }

    setVolume(w * l * d)
  }, [width, length, depth])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("th-TH", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(num)
  }

  // Calculate concrete bags (assuming 0.026 m³ per 50kg bag)
  const calculateBags = (vol: number) => {
    return Math.ceil(vol / 0.026)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
              <Box className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Concrete Volume</h2>
              <p className="text-xs text-muted-foreground">Calculate concrete volume</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-muted"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Inputs */}
          <div className="mb-5 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Width (meters)
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="0.00"
                step="0.01"
                className="w-full rounded-lg border border-border bg-input px-4 py-3 text-lg font-semibold text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Length (meters)
              </label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="0.00"
                step="0.01"
                className="w-full rounded-lg border border-border bg-input px-4 py-3 text-lg font-semibold text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Depth/Thickness (meters)
              </label>
              <input
                type="number"
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
                placeholder="0.00"
                step="0.01"
                className="w-full rounded-lg border border-border bg-input px-4 py-3 text-lg font-semibold text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Formula Display */}
          <div className="mb-5 rounded-xl bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Formula: Volume = Width x Length x Depth
            </p>
            {width && length && depth && (
              <p className="mt-2 font-mono text-sm text-foreground">
                {width} x {length} x {depth} = {volume ? formatNumber(volume) : "..."} m&sup3;
              </p>
            )}
          </div>

          {/* Results */}
          {volume !== null && (
            <div className="space-y-3 rounded-xl bg-orange-50 p-4 dark:bg-orange-900/20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Concrete Volume</span>
                <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  {formatNumber(volume)} m&sup3;
                </span>
              </div>
              <div className="border-t border-orange-200 pt-3 dark:border-orange-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Est. Cement Bags (50kg)
                  </span>
                  <span className="font-semibold text-foreground">
                    ~{calculateBags(volume)} bags
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                * Based on average of 0.026 m&sup3; per bag
              </p>
            </div>
          )}

          {/* Empty State */}
          {volume === null && (
            <div className="rounded-xl bg-muted p-6 text-center">
              <p className="text-sm text-muted-foreground">Enter dimensions to calculate</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-5">
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
