"use client"

import { useState, useEffect } from "react"
import { X, Target } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BreakEvenCalculatorProps {
  onClose: () => void
}

interface BreakEvenResult {
  units: number
  revenue: number
  isValid: boolean
  error?: string
}

export default function BreakEvenCalculator({ onClose }: BreakEvenCalculatorProps) {
  const [fixedCost, setFixedCost] = useState<string>("")
  const [variableCost, setVariableCost] = useState<string>("")
  const [pricePerUnit, setPricePerUnit] = useState<string>("")
  const [result, setResult] = useState<BreakEvenResult | null>(null)

  useEffect(() => {
    const fc = parseFloat(fixedCost)
    const vc = parseFloat(variableCost)
    const price = parseFloat(pricePerUnit)

    if (isNaN(fc) || isNaN(vc) || isNaN(price)) {
      setResult(null)
      return
    }

    if (fc < 0 || vc < 0 || price <= 0) {
      setResult({ units: 0, revenue: 0, isValid: false, error: "Please enter valid values" })
      return
    }

    const contribution = price - vc
    
    if (contribution <= 0) {
      setResult({ 
        units: 0, 
        revenue: 0, 
        isValid: false, 
        error: "Price must be higher than variable cost" 
      })
      return
    }

    const breakEvenUnits = fc / contribution
    const breakEvenRevenue = breakEvenUnits * price

    setResult({
      units: breakEvenUnits,
      revenue: breakEvenRevenue,
      isValid: true
    })
  }, [fixedCost, variableCost, pricePerUnit])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("th-TH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  }

  const formatUnits = (num: number) => {
    return new Intl.NumberFormat("th-TH", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.ceil(num))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
              <Target className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Break-Even Point</h2>
              <p className="text-xs text-muted-foreground">Calculate break-even</p>
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
                Fixed Cost (THB)
              </label>
              <input
                type="number"
                value={fixedCost}
                onChange={(e) => setFixedCost(e.target.value)}
                placeholder="e.g., Rent, Salary"
                className="w-full rounded-lg border border-border bg-input px-4 py-3 text-lg font-semibold text-foreground placeholder:text-sm placeholder:font-normal placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Variable Cost per Unit (THB)
              </label>
              <input
                type="number"
                value={variableCost}
                onChange={(e) => setVariableCost(e.target.value)}
                placeholder="e.g., Material cost per item"
                className="w-full rounded-lg border border-border bg-input px-4 py-3 text-lg font-semibold text-foreground placeholder:text-sm placeholder:font-normal placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Price per Unit (THB)
              </label>
              <input
                type="number"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value)}
                placeholder="Selling price per item"
                className="w-full rounded-lg border border-border bg-input px-4 py-3 text-lg font-semibold text-foreground placeholder:text-sm placeholder:font-normal placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Formula Display */}
          <div className="mb-5 rounded-xl bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Formula: BEP = Fixed Cost / (Price - Variable Cost)
            </p>
          </div>

          {/* Results */}
          {result && result.isValid && (
            <div className="space-y-3 rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
              <div className="text-center">
                <p className="mb-1 text-sm text-muted-foreground">Break-Even Point</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formatUnits(result.units)} units
                </p>
              </div>
              <div className="border-t border-blue-200 pt-3 dark:border-blue-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Required Revenue</span>
                  <span className="font-semibold text-foreground">
                    {formatNumber(result.revenue)} THB
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Contribution Margin</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {formatNumber(parseFloat(pricePerUnit) - parseFloat(variableCost))} THB
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {result && !result.isValid && (
            <div className="rounded-xl bg-red-50 p-4 text-center dark:bg-red-900/20">
              <p className="text-red-600 dark:text-red-400">{result.error}</p>
            </div>
          )}

          {/* Empty State */}
          {!result && (
            <div className="rounded-xl bg-muted p-6 text-center">
              <p className="text-sm text-muted-foreground">Enter data to calculate</p>
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
