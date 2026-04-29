"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wrench, X, AlertCircle, Search, Sparkles, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { tools, categoryColors, categoryNames, type Tool, type ToolCategory } from "@/lib/tools-data"
import VATCalculator from "../tools/vat-calculator"
import ConcreteVolumeCalculator from "../tools/concrete-volume-calculator"
import ThaiBahtTextConverter from "../tools/thai-baht-text-converter"
import BreakEvenCalculator from "../tools/break-even-calculator"
import { Button } from "@/components/ui/button"

type FilterType = "all" | ToolCategory

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
}

export default function ToolboxPage() {
  const [filter, setFilter] = useState<FilterType>("all")
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTools = tools.filter(t => {
    const matchesCategory = filter === "all" || t.category === filter
    const matchesSearch = searchQuery === "" || 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.nameTh.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleToolClick = (tool: Tool) => {
    setSelectedTool(tool)
  }

  const closeModal = () => {
    setSelectedTool(null)
  }

  const renderToolModal = () => {
    if (!selectedTool) return null

    if (selectedTool.isFunctional) {
      switch (selectedTool.id) {
        case "vat-calc":
          return <VATCalculator onClose={closeModal} />
        case "concrete-volume":
          return <ConcreteVolumeCalculator onClose={closeModal} />
        case "thai-baht-text":
          return <ThaiBahtTextConverter onClose={closeModal} />
        case "break-even":
          return <BreakEvenCalculator onClose={closeModal} />
        default:
          return null
      }
    }

    // Fallback modal for non-functional tools
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={closeModal}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl bg-card border border-border shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors z-10"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>

          <div className="p-8 pt-16">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="mb-8 flex justify-center"
            >
              <div className={cn(
                "flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br shadow-2xl",
                selectedTool.gradient
              )}>
                <selectedTool.icon className="h-12 w-12 text-white" />
              </div>
            </motion.div>

            <h3 className="mb-2 text-center text-2xl font-bold text-foreground">
              {selectedTool.nameTh}
            </h3>
            <p className="mb-8 text-center text-muted-foreground">
              {selectedTool.name}
            </p>

            <div className="rounded-2xl bg-amber-50 dark:bg-amber-900/20 p-5 border border-amber-200/50 dark:border-amber-800/50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-800/50 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="font-semibold text-amber-800 dark:text-amber-200">
                    กำลังพัฒนา
                  </p>
                  <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
                    เครื่องมือนี้กำลังอยู่ในระหว่างการพัฒนา กรุณารอติดตามเร็วๆ นี้
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={closeModal}
              className="mt-6 w-full h-14 rounded-2xl text-base font-semibold"
            >
              ปิด
            </Button>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <section className="relative overflow-hidden px-6 py-16 lg:py-20">
        <div className="absolute inset-0">
          <img src="/images/bg-tech.jpg" alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-10 left-[10%] w-64 h-64 bg-primary/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-0 right-[15%] w-48 h-48 bg-accent/10 rounded-full blur-3xl" 
        />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
          >
            <Zap className="w-4 h-4" />
            เครื่องมือฟรี 50+ รายการ
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-bold text-foreground mb-6"
          >
            Mega Toolbox
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            เครื่องมือออนไลน์สำหรับงานบัญชี ธุรกิจ วิศวกรรม และเอกสาร ใช้งานฟรีไม่มีค่าใช้จ่าย
          </motion.p>

          {/* Search */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-xl mx-auto"
          >
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="ค้นหาเครื่องมือ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 rounded-2xl border-2 border-border bg-card pl-14 pr-6 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="px-6 py-6 border-y border-border bg-muted/30 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter("all")}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300",
                filter === "all"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-card text-muted-foreground hover:bg-muted border border-border"
              )}
            >
              ทั้งหมด
              <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-xs">{tools.length}</span>
            </motion.button>
            
            {(Object.keys(categoryNames) as ToolCategory[]).map((category) => {
              const count = tools.filter(t => t.category === category).length
              return (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(category)}
                  className={cn(
                    "px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300",
                    filter === category
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : "bg-card text-muted-foreground hover:bg-muted border border-border"
                  )}
                >
                  {categoryNames[category].th}
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-xs">{count}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {filter === "all" && searchQuery === "" ? (
            // Show by category when "all" is selected
            (Object.keys(categoryNames) as ToolCategory[]).map((category, categoryIndex) => {
              const categoryTools = tools.filter(t => t.category === category)
              const colors = categoryColors[category]
              return (
                <motion.div 
                  key={category} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  className="mb-16"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br",
                      colors.bg
                    )}>
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        {categoryNames[category].th}
                      </h2>
                      <p className="text-sm text-muted-foreground">{categoryNames[category].en}</p>
                    </div>
                    <span className="ml-auto px-3 py-1 rounded-full bg-muted text-sm font-medium text-muted-foreground">
                      {categoryTools.length} tools
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                    {categoryTools.map((tool, index) => (
                      <ToolIcon 
                        key={tool.id} 
                        tool={tool} 
                        onClick={() => handleToolClick(tool)} 
                        index={index}
                      />
                    ))}
                  </div>
                </motion.div>
              )
            })
          ) : (
            // Show filtered/searched tools
            <>
              {filteredTools.length > 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredTools.map((tool, index) => (
                      <ToolIcon 
                        key={tool.id} 
                        tool={tool} 
                        onClick={() => handleToolClick(tool)} 
                        index={index}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-20 text-center"
                >
                  <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                    <Search className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <p className="text-xl font-medium text-foreground mb-2">ไม่พบเครื่องมือ</p>
                  <p className="text-muted-foreground">ลองค้นหาด้วยคำอื่น หรือเลือกหมวดหมู่</p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Tool Count */}
      <section className="px-6 py-8 bg-muted/30 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            แสดง <span className="font-semibold text-foreground">{filteredTools.length}</span> จาก{" "}
            <span className="font-semibold text-foreground">{tools.length}</span> เครื่องมือ
          </p>
        </div>
      </section>

      {/* Tool Modal */}
      <AnimatePresence>
        {selectedTool && renderToolModal()}
      </AnimatePresence>
    </div>
  )
}

// Tool Icon Component with animation
function ToolIcon({ tool, onClick, index }: { tool: Tool; onClick: () => void; index: number }) {
  const Icon = tool.icon
  
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: index * 0.02, duration: 0.3 }}
      whileHover={{ scale: 1.08, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="group flex flex-col items-center gap-3 p-3 rounded-2xl transition-colors hover:bg-card hover:shadow-lg"
    >
      <motion.div 
        whileHover={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 0.4 }}
        className={cn(
          "flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg transition-shadow group-hover:shadow-xl",
          tool.gradient
        )}
      >
        <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
      </motion.div>
      <div className="text-center">
        <span className="block text-xs font-semibold text-foreground line-clamp-1">
          {tool.nameTh}
        </span>
        <span className="block text-[10px] text-muted-foreground line-clamp-1">
          {tool.name}
        </span>
      </div>
      {tool.isFunctional && (
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
      )}
    </motion.button>
  )
}
