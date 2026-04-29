"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login, register, isLoading } = useAuth()
  const [mode, setMode] = useState<"login" | "register">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (mode === "login") {
      const result = await login(email, password)
      if (result) {
        setSuccess("เข้าสู่ระบบสำเร็จ!")
        setTimeout(() => {
          onClose()
          setEmail("")
          setPassword("")
          setSuccess("")
        }, 1000)
      } else {
        setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง")
      }
    } else {
      if (!name.trim()) {
        setError("กรุณากรอกชื่อ")
        return
      }
      const result = await register(email, password, name)
      if (result) {
        setSuccess("สมัครสมาชิกสำเร็จ!")
        setTimeout(() => {
          onClose()
          setEmail("")
          setPassword("")
          setName("")
          setSuccess("")
        }, 1000)
      } else {
        setError("อีเมลนี้ถูกใช้งานแล้ว")
      }
    }
  }

  const resetForm = () => {
    setEmail("")
    setPassword("")
    setName("")
    setError("")
    setSuccess("")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 px-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-sky-500 to-blue-600 p-6 text-white">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/20 p-1">
                    <Image src="/logo.png" alt="SCOPE" width={64} height={64} className="rounded-xl object-cover" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">SCOPE SOLUTIONS</h2>
                    <p className="text-white/80 text-sm">
                      {mode === "login" ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Mode Toggle */}
                <div className="flex rounded-xl bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => { setMode("login"); resetForm(); }}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                      mode === "login" ? "bg-white shadow text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    เข้าสู่ระบบ
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMode("register"); resetForm(); }}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                      mode === "register" ? "bg-white shadow text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    สมัครสมาชิก
                  </button>
                </div>

                {/* Name Field (Register only) */}
                <AnimatePresence mode="wait">
                  {mode === "register" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label className="block text-sm font-medium text-foreground mb-2">ชื่อ</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="ชื่อของคุณ"
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">อีเมล</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">รหัสผ่าน</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="รหัสผ่าน"
                      required
                      minLength={6}
                      className="w-full pl-12 pr-12 py-3 rounded-xl border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Error/Success Messages */}
                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-600 text-sm"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      {error}
                    </motion.div>
                  )}
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 p-3 rounded-xl bg-green-50 text-green-600 text-sm"
                    >
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      {success}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : mode === "login" ? (
                    "เข้าสู่ระบบ"
                  ) : (
                    "สมัครสมาชิก"
                  )}
                </Button>

                {/* Demo Credentials */}
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center mb-2">บัญชีทดสอบ (Demo)</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-slate-50">
                      <p className="font-semibold text-foreground">Admin</p>
                      <p className="text-muted-foreground">yos@scopesolutions.co.th</p>
                      <p className="text-muted-foreground">admin123</p>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50">
                      <p className="font-semibold text-foreground">Member</p>
                      <p className="text-muted-foreground">member@test.com</p>
                      <p className="text-muted-foreground">member123</p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
