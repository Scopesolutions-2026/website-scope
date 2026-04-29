"use client"

import { useState, useEffect } from "react"
import { X, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface VATCalculatorProps {
  onClose: () => void
}

export default function VATCalculator({ onClose }: VATCalculatorProps) {
  const [amount, setAmount] = useState<string>("")
  const [includeVAT, setIncludeVAT] = useState<boolean>(false)
  const [result, setResult] = useState<{ base: number; vat: number; total: number } | null>(null)

  useEffect(() => {
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      setResult(null)
      return
    }

    if (includeVAT) {
      // Amount includes VAT - need to extract base
      const base = numAmount / 1.07
      const vat = numAmount - base
      setResult({ base, vat, total: numAmount })
    } else {
      // Amount excludes VAT - need to add VAT
      const vat = numAmount * 0.07
      const total = numAmount * 1.07
      setResult({ base: numAmount, vat, total })
    }
  }, [amount, includeVAT])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("th-TH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">VAT Calculator</h2>
              <p className="text-xs text-muted-foreground">Calculate 7% VAT</p>
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
          {/* Toggle */}
          <div className="mb-5 flex rounded-lg bg-muted p-1">
            <button
              onClick={() => setIncludeVAT(false)}
              className={cn(
                "flex-1 rounded-md py-2 text-sm font-medium transition-all",
                !includeVAT 
                  ? "bg-card text-foreground shadow-sm" 
                  : "text-muted-foreground"
              )}
            >
              Exclude VAT
            </button>
            <button
              onClick={() => setIncludeVAT(true)}
              className={cn(
                "flex-1 rounded-md py-2 text-sm font-medium transition-all",
                includeVAT 
                  ? "bg-card text-foreground shadow-sm" 
                  : "text-muted-foreground"
              )}
            >
              Include VAT
            </button>
          </div>

          {/* Input */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-foreground">
              Amount (THB)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-lg border border-border bg-input px-4 py-3 text-lg font-semibold text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-3 rounded-xl bg-emerald-50 p-4 dark:bg-emerald-900/20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Base Price</span>
                <span className="font-semibold text-foreground">
                  {formatNumber(result.base)} THB
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">VAT 7%</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  +{formatNumber(result.vat)} THB
                </span>
              </div>
              <div className="border-t border-emerald-200 pt-3 dark:border-emerald-700">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Total</span>
                  <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                    {formatNumber(result.total)} THB
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!result && (
            <div className="rounded-xl bg-muted p-6 text-center">
              <p className="text-sm text-muted-foreground">Enter amount to calculate</p>
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
