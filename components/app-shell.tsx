"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Home, GraduationCap, Wrench, User, Sparkles, Building2, 
  Briefcase, BookOpen, Phone, Menu, X, ChevronRight, Shield, ChevronDown
} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import HomePage from "@/components/pages/home-page"
import AcademyPage from "@/components/pages/academy-page"
import ToolboxPage from "@/components/pages/toolbox-page"
import ProfilePage from "@/components/pages/profile-page"
import AboutPage from "@/components/pages/about-page"
import ServicesPage from "@/components/pages/services-page"
import ArticlesPage from "@/components/pages/articles-page"
import ContactPage from "@/components/pages/contact-page"
import AdminPage from "@/components/pages/admin-page"
import LoginModal from "@/components/auth/login-modal"
import { useAuth } from "@/lib/auth-context"

type PageType = "home" | "about" | "services" | "academy" | "toolbox" | "articles" | "contact" | "profile" | "admin"

interface NavItem {
  id: PageType
  label: string
  labelTh: string
  icon: typeof Home
  color: string
}

const EDGE_SCROLL_THRESHOLD = 8

const mainNavItems: NavItem[] = [
  { id: "home", label: "Home", labelTh: "หน้าแรก", icon: Home, color: "from-sky-400 to-blue-500" },
  { id: "academy", label: "Academy", labelTh: "คอร์สเรียน", icon: GraduationCap, color: "from-violet-400 to-purple-500" },
  { id: "toolbox", label: "Tools", labelTh: "เครื่องมือ", icon: Wrench, color: "from-amber-400 to-orange-500" },
  { id: "services", label: "Services", labelTh: "บริการ", icon: Briefcase, color: "from-emerald-400 to-teal-500" },
  { id: "profile", label: "Profile", labelTh: "โปรไฟล์", icon: User, color: "from-pink-400 to-rose-500" },
]

const allNavItems: NavItem[] = [
  { id: "home", label: "Home", labelTh: "หน้าแรก", icon: Home, color: "from-sky-400 to-blue-500" },
  { id: "academy", label: "Academy", labelTh: "คอร์สเรียน", icon: GraduationCap, color: "from-violet-400 to-purple-500" },
  { id: "toolbox", label: "Tools", labelTh: "เครื่องมือ", icon: Wrench, color: "from-amber-400 to-orange-500" },
  { id: "services", label: "Services", labelTh: "บริการ", icon: Briefcase, color: "from-emerald-400 to-teal-500" },
  { id: "articles", label: "Articles", labelTh: "บทความ", icon: BookOpen, color: "from-indigo-400 to-blue-500" },
  { id: "about", label: "About", labelTh: "เกี่ยวกับเรา", icon: Building2, color: "from-slate-400 to-gray-500" },
  { id: "contact", label: "Contact", labelTh: "ติดต่อเรา", icon: Phone, color: "from-teal-400 to-cyan-500" },
  { id: "profile", label: "Profile", labelTh: "โปรไฟล์", icon: User, color: "from-pink-400 to-rose-500" },
  { id: "admin", label: "Admin", labelTh: "จัดการระบบ", icon: Shield, color: "from-slate-600 to-slate-800" },
]

const orderedPages: PageType[] = ["home", "academy", "toolbox", "services", "articles", "about", "contact", "profile"]

function getNextPageFor(page: PageType): PageType | null {
  const idx = orderedPages.indexOf(page)
  return idx >= 0 && idx < orderedPages.length - 1 ? orderedPages[idx + 1] : null
}

function getPrevPageFor(page: PageType): PageType | null {
  const idx = orderedPages.indexOf(page)
  return idx > 0 ? orderedPages[idx - 1] : null
}

export default function AppShell() {
  const [activePage, setActivePage] = useState<PageType>("home")
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showEdgeWarning, setShowEdgeWarning] = useState<"top" | "bottom" | null>(null)
  const [edgeScrollCount, setEdgeScrollCount] = useState(0)
  const mainRef = useRef<HTMLDivElement>(null)
  const lastScrollTop = useRef(0)
  const { user, isAdmin } = useAuth()

  const nextPage = getNextPageFor(activePage)
  const prevPage = getPrevPageFor(activePage)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollProgress(Math.min(100, Math.max(0, progress)))

      const np = getNextPageFor(activePage)
      const pp = getPrevPageFor(activePage)

      if (progress >= 92 && np) {
        setShowEdgeWarning("bottom")
      } else if (scrollTop <= 10 && pp) {
        setShowEdgeWarning("top")
      } else {
        setShowEdgeWarning(null)
        setEdgeScrollCount(0)
      }
      lastScrollTop.current = scrollTop
    }

    const handleWheel = (e: WheelEvent) => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

      if (scrollTimeout) clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        setEdgeScrollCount(0)
      }, 2000)

      const np = getNextPageFor(activePage)
      const pp = getPrevPageFor(activePage)

      if (e.deltaY > 0 && progress >= 96 && np) {
        setEdgeScrollCount(prev => {
          const next = prev + 1
          if (next >= EDGE_SCROLL_THRESHOLD) {
            setActivePage(np)
            window.scrollTo({ top: 0, behavior: "instant" })
            return 0
          }
          return next
        })
      } else if (e.deltaY < 0 && scrollTop <= 10 && pp) {
        setEdgeScrollCount(prev => {
          const next = prev + 1
          if (next >= EDGE_SCROLL_THRESHOLD) {
            setActivePage(pp)
            setTimeout(() => {
              window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" })
            }, 100)
            return 0
          }
          return next
        })
      }
    }

    let touchStartY = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY
      const diff = touchStartY - touchEndY
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

      const np = getNextPageFor(activePage)
      const pp = getPrevPageFor(activePage)

      if (diff > 30 && progress >= 96 && np) {
        setEdgeScrollCount(prev => {
          const next = prev + 1
          if (next >= EDGE_SCROLL_THRESHOLD) {
            setActivePage(np)
            window.scrollTo({ top: 0, behavior: "instant" })
            return 0
          }
          return next
        })
      } else if (diff < -30 && scrollTop <= 10 && pp) {
        setEdgeScrollCount(prev => {
          const next = prev + 1
          if (next >= EDGE_SCROLL_THRESHOLD) {
            setActivePage(pp)
            setTimeout(() => {
              window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" })
            }, 100)
            return 0
          }
          return next
        })
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("wheel", handleWheel, { passive: true })
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [activePage])

  if (!mounted) return null

  const renderPage = () => {
    switch (activePage) {
      case "home": return <HomePage />
      case "about": return <AboutPage />
      case "services": return <ServicesPage />
      case "academy": return <AcademyPage />
      case "toolbox": return <ToolboxPage />
      case "articles": return <ArticlesPage />
      case "contact": return <ContactPage />
      case "profile": return <ProfilePage onLoginClick={() => setShowLoginModal(true)} />
      case "admin": return <AdminPage />
      default: return <HomePage />
    }
  }

  const handleNavClick = (pageId: PageType) => {
    setActivePage(pageId)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: "instant" })
  }

  const filteredNavItems = allNavItems.filter(item => item.id !== "admin" || isAdmin)

  return (
    <div className="min-h-screen bg-background">
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-border">
        <motion.div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary to-accent" style={{ width: `${scrollProgress}%` }} />
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md">
              <Image src="/logo.png" alt="SCOPE" width={40} height={40} className="object-cover" loading="eager" />
            </div>
            <div>
              <p className="font-bold text-foreground text-sm">SCOPE</p>
              <p className="text-xs text-muted-foreground">Solutions</p>
            </div>
          </div>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </header>

      {/* Mobile Slide Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setMobileMenuOpen(false)} />
            <motion.nav initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="lg:hidden fixed top-0 right-0 bottom-0 w-80 bg-white z-50 shadow-2xl">
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg">
                    <Image src="/logo.png" alt="SCOPE" width={56} height={56} className="object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-lg">SCOPE SOLUTIONS</p>
                    <p className="text-sm text-muted-foreground">Accounting & Engineering</p>
                  </div>
                </div>
              </div>
              <div className="p-4 overflow-y-auto h-[calc(100vh-120px)]">
                <div className="space-y-2">
                  {filteredNavItems.map((item) => (
                    <motion.button key={item.id} onClick={() => handleNavClick(item.id)} whileTap={{ scale: 0.98 }} className={cn("w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200", activePage === item.id ? "bg-gradient-to-r text-white shadow-lg " + item.color : "hover:bg-slate-100 text-foreground")}>
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", activePage === item.id ? "bg-white/20" : "bg-slate-100")}><item.icon className="w-6 h-6" /></div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold">{item.label}</p>
                        <p className={cn("text-sm", activePage === item.id ? "text-white/80" : "text-muted-foreground")}>{item.labelTh}</p>
                      </div>
                      <ChevronRight className={cn("w-5 h-5", activePage === item.id ? "text-white/60" : "text-muted-foreground/40")} />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main ref={mainRef} className="pt-16 lg:pt-0 pb-24 lg:pb-0 lg:pl-72">
        <AnimatePresence mode="wait">
          <motion.div key={activePage} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            {renderPage()}
          </motion.div>
        </AnimatePresence>

        {/* Edge Warning - Bottom (next page) */}
        <AnimatePresence>
          {showEdgeWarning === "bottom" && nextPage && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-28 lg:bottom-8 left-1/2 -translate-x-1/2 z-30">
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }} className="flex flex-col items-center gap-2 px-6 py-4 bg-card/95 backdrop-blur-md text-foreground rounded-2xl shadow-xl border border-border min-w-[200px]">
                <p className="text-sm font-medium text-muted-foreground">
                  {edgeScrollCount >= 1 ? `เลื่อนลงอีก ${EDGE_SCROLL_THRESHOLD - edgeScrollCount} ครั้ง` : "เลื่อนลงต่อเพื่อไปหน้าถัดไป"}
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <span>{filteredNavItems.find(i => i.id === nextPage)?.labelTh}</span>
                  <ChevronDown className="w-5 h-5 animate-bounce" />
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-1">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(edgeScrollCount / EDGE_SCROLL_THRESHOLD) * 100}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">{edgeScrollCount}/{EDGE_SCROLL_THRESHOLD}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edge Warning - Top (previous page) */}
        <AnimatePresence>
          {showEdgeWarning === "top" && prevPage && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed top-20 lg:top-8 left-1/2 -translate-x-1/2 z-30">
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }} className="flex flex-col items-center gap-2 px-6 py-4 bg-card/95 backdrop-blur-md text-foreground rounded-2xl shadow-xl border border-border min-w-[200px]">
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <ChevronDown className="w-5 h-5 animate-bounce rotate-180" />
                  <span>{filteredNavItems.find(i => i.id === prevPage)?.labelTh}</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  {edgeScrollCount >= 1 ? `เลื่อนขึ้นอีก ${EDGE_SCROLL_THRESHOLD - edgeScrollCount} ครั้ง` : "เลื่อนขึ้นต่อเพื่อกลับหน้าก่อน"}
                </p>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-1">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(edgeScrollCount / EDGE_SCROLL_THRESHOLD) * 100}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">{edgeScrollCount}/{EDGE_SCROLL_THRESHOLD}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Desktop Sidebar */}
      <motion.nav initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="hidden lg:flex fixed left-0 top-0 bottom-0 w-72 flex-col bg-white border-r border-border z-50">
        <motion.div className="absolute top-0 left-0 w-1 bg-gradient-to-b from-primary to-accent rounded-full" style={{ height: `${scrollProgress}%` }} />
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg ring-4 ring-primary/10">
              <Image src="/logo.png" alt="SCOPE" width={56} height={56} className="object-cover" loading="eager" />
            </motion.div>
            <div>
              <h1 className="font-bold text-foreground text-lg">SCOPE</h1>
              <p className="text-sm text-muted-foreground">Solutions</p>
            </div>
          </div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex items-center gap-2 px-3 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <p className="text-xs font-bold text-primary uppercase tracking-wider">Navigation</p>
          </div>
          <div className="space-y-1">
            {filteredNavItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleNavClick(item.id)}
                whileHover={{ x: 4 }}
                className={cn(
                  "relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group",
                  activePage === item.id ? "text-white shadow-lg" : "text-muted-foreground hover:bg-slate-100 hover:text-foreground"
                )}
              >
                {activePage === item.id && (
                  <motion.div layoutId="sidebar-active" className={cn("absolute inset-0 rounded-xl bg-gradient-to-r", item.color)} />
                )}
                <div className={cn("relative z-10 w-10 h-10 rounded-lg flex items-center justify-center", activePage === item.id ? "bg-white/20" : "bg-slate-100")}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="relative z-10 flex-1">
                  <span className="block font-semibold text-sm">{item.label}</span>
                  <span className={cn("block text-xs", activePage === item.id ? "text-white/70" : "text-muted-foreground")}>{item.labelTh}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
        <div className="p-4 border-t border-border">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 border border-primary/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">Go Premium</p>
                <p className="text-xs text-muted-foreground">Unlock all features</p>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">
              Upgrade Now
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Bottom Navigation */}
      <motion.nav initial={{ y: 100 }} animate={{ y: 0 }} className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pb-4">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/15 border border-slate-200/50 p-1.5">
          <div className="flex items-center justify-around">
            {mainNavItems.map((item) => (
              <motion.button key={item.id} onClick={() => handleNavClick(item.id)} whileTap={{ scale: 0.9 }} className="relative flex flex-col items-center py-2 px-4 rounded-xl">
                {activePage === item.id && (
                  <motion.div layoutId="mobile-active" className={cn("absolute inset-0 rounded-xl bg-gradient-to-r shadow-lg", item.color)} />
                )}
                <motion.div animate={activePage === item.id ? { scale: 1.1 } : { scale: 1 }} className={cn("relative z-10", activePage === item.id ? "text-white" : "text-muted-foreground")}>
                  <item.icon className="w-5 h-5" />
                </motion.div>
                <span className={cn("relative z-10 text-[10px] font-semibold mt-1", activePage === item.id ? "text-white" : "text-muted-foreground")}>{item.labelTh}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>
    </div>
  )
}
