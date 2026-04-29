"use client"

import { useState, useEffect } from "react"
import { X, Languages, Copy, Check } from "lucide-react"
import { convertToThaiBahtText } from "@/lib/thai-baht-text"
import { Button } from "@/components/ui/button"

interface ThaiBahtTextConverterProps {
  onClose: () => void
}

export default function ThaiBahtTextConverter({ onClose }: ThaiBahtTextConverterProps) {
  const [amount, setAmount] = useState<string>("")
  const [result, setResult] = useState<string>("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount < 0) {
      setResult("")
      return
    }

    setResult(convertToThaiBahtText(numAmount))
  }, [amount])

  const handleCopy = async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = result
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("th-TH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  }

  const presetAmounts = [100, 500, 1000, 5000, 10000, 50000]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
              <Languages className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Thai Baht Text</h2>
              <p className="text-xs text-muted-foreground">Number to Thai text</p>
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
          {/* Input */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-foreground">
              Amount (THB)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              className="w-full rounded-lg border border-border bg-input px-4 py-3 text-lg font-semibold text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Preset Buttons */}
          <div className="mb-5 flex flex-wrap gap-2">
            {presetAmounts.map((preset) => (
              <button
                key={preset}
                onClick={() => setAmount(preset.toString())}
                className="rounded-lg bg-muted px-3 py-1.5 text-sm font-medium text-foreground transition-all hover:bg-muted/80"
              >
                {formatNumber(preset)}
              </button>
            ))}
          </div>

          {/* Result */}
          {result && (
            <div className="rounded-xl bg-indigo-50 p-4 dark:bg-indigo-900/20">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Result</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 rounded-lg bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-all hover:bg-muted"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <p className="text-lg font-medium leading-relaxed text-indigo-700 dark:text-indigo-300">
                {result}
              </p>
            </div>
          )}

          {/* Empty State */}
          {!result && (
            <div className="rounded-xl bg-muted p-6 text-center">
              <p className="text-sm text-muted-foreground">Enter amount to convert</p>
            </div>
          )}

          {/* Examples */}
          <div className="mt-5">
            <p className="mb-2 text-sm font-medium text-muted-foreground">Examples:</p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>1,500.00 = หนึ่งพันห้าร้อยบาทถ้วน</p>
              <p>25.50 = ยี่สิบห้าบาทห้าสิบสตางค์</p>
            </div>
          </div>
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
