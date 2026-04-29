"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { 
  User, 
  Mail, 
  Phone, 
  LogIn, 
  UserPlus, 
  Crown, 
  Star, 
  Shield,
  Settings,
  Bell,
  HelpCircle,
  FileText,
  ChevronRight,
  Sparkles,
  Check,
  Facebook,
  MessageCircle,
  LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

interface ProfilePageProps {
  onLoginClick?: () => void
}

type MembershipTier = "free" | "member" | "premium"

const membershipInfo: Record<MembershipTier, { label: string; labelTh: string; color: string; gradient: string; icon: typeof Star }> = {
  free: { label: "Free User", labelTh: "ผู้ใช้ทั่วไป", color: "text-muted-foreground", gradient: "from-slate-400 to-slate-500", icon: User },
  member: { label: "Member", labelTh: "สมาชิก", color: "text-primary", gradient: "from-sky-400 to-blue-500", icon: Star },
  premium: { label: "Premium", labelTh: "พรีเมียม", color: "text-amber-600", gradient: "from-amber-400 to-orange-500", icon: Crown },
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
}

export default function ProfilePage({ onLoginClick }: ProfilePageProps) {
  const { user, logout, isMember, isPremium } = useAuth()
  const isLoggedIn = !!user

  const menuItems = [
    { icon: Bell, label: "Notifications", sublabel: "การแจ้งเตือน", href: "#", badge: 3 },
    { icon: Settings, label: "Settings", sublabel: "ตั้งค่า", href: "#" },
    { icon: HelpCircle, label: "Help & Support", sublabel: "ช่วยเหลือ", href: "#" },
    { icon: FileText, label: "Terms of Service", sublabel: "เงื่อนไขการใช้งาน", href: "#" },
    { icon: Shield, label: "Privacy Policy", sublabel: "นโยบายความเป็นส่วนตัว", href: "#" },
  ]

  const membershipPlans = [
    {
      tier: "free" as MembershipTier,
      price: "0",
      features: ["เครื่องมือพื้นฐาน", "บทความฟรี", "คอร์สฟรี"],
    },
    {
      tier: "member" as MembershipTier,
      price: "0",
      popular: true,
      features: ["เครื่องมือทั้งหมด", "Template ฟรี", "คอร์ส Member"],
    },
    {
      tier: "premium" as MembershipTier,
      price: "299",
      features: ["ทุกอย่างใน Member", "คอร์ส Premium", "Support ตลอด 24 ชม."],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <section className="relative overflow-hidden px-6 py-16 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-20 right-[20%] w-72 h-72 bg-primary/10 rounded-full blur-3xl" 
        />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-lg mx-auto"
        >
          <div className="bg-card rounded-[2rem] border border-border shadow-2xl overflow-hidden">
            {/* Background Pattern */}
            <div className="h-28 bg-gradient-to-r from-primary via-primary/80 to-accent relative">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-4 left-8 w-20 h-20 border-4 border-white/20 rounded-full" />
                <div className="absolute bottom-4 right-12 w-12 h-12 border-2 border-white/20 rounded-full" />
              </div>
            </div>
            
            <div className="px-8 pb-8 -mt-14">
              {isLoggedIn && user ? (
                <>
                  {/* Logged In State */}
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="w-28 h-28 mx-auto rounded-3xl bg-card border-4 border-card shadow-xl flex items-center justify-center"
                  >
                    <div className="w-full h-full rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">{user.name.charAt(0).toUpperCase()}</span>
                    </div>
                  </motion.div>
                  <h2 className="mt-5 text-2xl font-bold text-foreground text-center">{user.name}</h2>
                  <p className="text-muted-foreground text-center">{user.email}</p>
                  
                  <div className="mt-5 flex justify-center gap-3">
                    <div className={cn(
                      "inline-flex items-center gap-2 px-5 py-2.5 rounded-full border",
                      user.role === "premium" ? "bg-amber-500/10 border-amber-500/20" :
                      user.role === "admin" ? "bg-red-500/10 border-red-500/20" :
                      "bg-primary/10 border-primary/20"
                    )}>
                      {user.role === "premium" ? <Crown className="w-5 h-5 text-amber-600" /> :
                       user.role === "admin" ? <Shield className="w-5 h-5 text-red-600" /> :
                       <Star className="w-5 h-5 text-primary" />}
                      <span className={cn(
                        "font-semibold capitalize",
                        user.role === "premium" ? "text-amber-600" :
                        user.role === "admin" ? "text-red-600" :
                        "text-primary"
                      )}>{user.role}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={logout}
                      className="rounded-full px-4"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      ออกจากระบบ
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* Guest State */}
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="w-28 h-28 mx-auto rounded-3xl bg-card border-4 border-card shadow-xl overflow-hidden"
                  >
                    <Image 
                      src="/logo.png" 
                      alt="SCOPE SOLUTIONS" 
                      width={112} 
                      height={112}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  <h2 className="mt-5 text-2xl font-bold text-foreground text-center">ยินดีต้อนรับ</h2>
                  <p className="text-muted-foreground text-center mb-8">เข้าสู่ระบบเพื่อปลดล็อคทุกฟีเจอร์</p>
                  
                  <div className="flex gap-4">
                    <Button
                      onClick={onLoginClick}
                      className="flex-1 h-14 rounded-2xl text-base font-semibold shadow-lg shadow-primary/30"
                    >
                      <LogIn className="w-5 h-5 mr-2" />
                      เข้าสู่ระบบ
                    </Button>
                    <Button
                      onClick={onLoginClick}
                      variant="outline"
                      className="flex-1 h-14 rounded-2xl text-base font-semibold"
                    >
                      <UserPlus className="w-5 h-5 mr-2" />
                      สมัครสมาชิก
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Membership Plans */}
      <section className="px-6 py-12">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Membership</p>
            <h2 className="text-2xl font-bold text-foreground">แพ็กเกจสมาชิก</h2>
          </motion.div>
          
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {membershipPlans.map((plan) => {
              const info = membershipInfo[plan.tier]
              return (
                <motion.div
                  key={plan.tier}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className={cn(
                    "relative rounded-3xl border-2 p-6 transition-all cursor-pointer",
                    plan.popular 
                      ? "border-primary bg-primary/5 shadow-xl shadow-primary/10" 
                      : plan.tier === "premium"
                        ? "border-amber-300/50 bg-amber-50/50 dark:border-amber-700/50 dark:bg-amber-900/10"
                        : "border-border bg-card"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      แนะนำ
                    </div>
                  )}
                  
                  <div className="flex items-center gap-5">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-lg",
                      info.gradient
                    )}>
                      <info.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-foreground">{info.label}</h4>
                      <p className="text-sm text-muted-foreground">{info.labelTh}</p>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-sm text-muted-foreground"> THB</span>
                      {plan.tier !== "free" && (
                        <p className="text-xs text-muted-foreground">
                          {plan.tier === "member" ? "ฟรีตลอดชีพ!" : "/เดือน"}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 pt-5 border-t border-border/50">
                    <ul className="grid grid-cols-2 gap-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="px-6 py-8">
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-lg">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.a
                  key={item.label}
                  variants={fadeInUp}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 p-5 transition-all hover:bg-muted group",
                    index !== menuItems.length - 1 && "border-b border-border"
                  )}
                >
                  <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.sublabel}</p>
                  </div>
                  {item.badge && (
                    <span className="w-6 h-6 rounded-full bg-destructive text-destructive-foreground text-xs font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </section>

      {/* Social Links */}
      <section className="px-6 py-12">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-sm font-medium text-muted-foreground mb-6">ติดตามเรา</p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.1, y: -3 }}
              href="https://www.facebook.com/SCOPESOLUTIONSCOMPANYLIMITED"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 hover:bg-blue-500/20 transition-colors"
            >
              <Facebook className="w-7 h-7" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -3 }}
              href="https://lin.ee/WnV3iEh"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 hover:bg-emerald-500/20 transition-colors"
            >
              <MessageCircle className="w-7 h-7" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -3 }}
              href="tel:0935560076"
              className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 hover:bg-green-500/20 transition-colors"
            >
              <Phone className="w-7 h-7" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -3 }}
              href="mailto:contact@scopesolutions.co.th"
              className="w-14 h-14 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-600 hover:bg-rose-500/20 transition-colors"
            >
              <Mail className="w-7 h-7" />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="inline-block">
              <Image 
                src="/logo.png" 
                alt="SCOPE SOLUTIONS" 
                width={60} 
                height={60} 
                className="rounded-xl mx-auto opacity-60" 
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              SCOPE SOLUTIONS CO., LTD
            </p>
            <p className="text-xs text-muted-foreground">
              Version 2.0.0
            </p>
          </motion.div>
        </div>
      </section>


    </div>
  )
}
