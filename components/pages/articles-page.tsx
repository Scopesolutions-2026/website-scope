"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { 
  BookOpen, Clock, Tag, X, Search, Newspaper
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { client, urlFor } from "@/lib/sanity"
import { articlesQuery } from "@/lib/sanity.queries"
import { PortableText } from "@portabletext/react"

// --- ส่วนปรับแต่งการแสดงผลรูปภาพในเนื้อหาให้ใหญ่และชัดเจน ---
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      const imageUrl = urlFor(value).url();
      return (
        <div className="relative w-full my-6 sm:my-10">
          <div className="relative w-full rounded-2xl overflow-hidden border border-slate-100 shadow-md">
            <img
              src={imageUrl}
              alt="SCOPE Content"
              className="w-full h-auto block bg-white"
            />
          </div>
          <a 
            href={imageUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-[11px] font-bold text-primary/70 hover:text-primary transition-colors bg-primary/5 px-3 py-1.5 rounded-full"
          >
            <Search className="w-3.5 h-3.5" />
            จิ้มเพื่อขยายรูปอ่านแบบเต็มจอ (Zoom)
          </a>
        </div>
      )
    },
  },
  block: {
    normal: ({ children }: any) => <p className="text-slate-600 leading-relaxed mb-4 text-base sm:text-lg">{children}</p>,
    h2: ({ children }: any) => <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mt-10 mb-5">{children}</h2>,
  },
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null)

  // ล็อคการเลื่อนของหน้าหลักเมื่อเปิดดูบทความ
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedArticle]);

  // ดึงข้อมูลจาก Sanity
  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await client.fetch(articlesQuery)
        setArticles(data || [])
      } catch (error) {
        console.error("Fetch error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === "all" || article.category === activeCategory
    const matchesSearch = article.title?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-4 text-center">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 tracking-widest uppercase">
            <Newspaper className="w-4 h-4" /> SCOPE KNOWLEDGE HUB
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
            คลังความรู้ <span className="text-primary">SCOPE</span>
          </h1>
          <div className="max-w-xl mx-auto">
            <div className="relative flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1.5 focus-within:ring-2 ring-primary/20 transition-all">
              <Search className="ml-4 w-5 h-5 text-slate-400" />
              <Input 
                placeholder="ค้นหาบทความที่สนใจ..." 
                className="border-0 focus-visible:ring-0 py-6 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        {loading ? (
          <div className="flex justify-center py-20 text-slate-400 animate-pulse">กำลังดึงข้อมูลบทความ...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article) => (
                <motion.article
                  key={article.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
                  onClick={() => setSelectedArticle(article)}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {article.image && (
                      <Image src={article.image} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  <div className="p-7">
                    <h3 className="font-bold text-slate-900 text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-slate-500 text-xs mt-3 line-clamp-2">{article.excerpt}</p>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* --- Article Detail Modal --- */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
            {/* Background Overlay */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"
              onClick={() => setSelectedArticle(null)}
            />
            
            {/* Content Card */}
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl bg-white rounded-t-[2.5rem] sm:rounded-[3rem] h-[93vh] sm:h-[88vh] flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-slate-50 shrink-0 bg-white z-10">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-tighter">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Article Content</span>
                </div>
                <button 
                  onClick={() => setSelectedArticle(null)} 
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors active:scale-90"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto px-5 py-8 sm:px-12 sm:py-12 scroll-smooth">
                <div className="max-w-2xl mx-auto">
                  {/* Title */}
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
                    {selectedArticle.title}
                  </h2>
                  
                  {/* --- Excerpt Box (นำกลับมาแล้ว) --- */}
                  {(selectedArticle.excerpt || selectedArticle.summary) && (
                    <div className="bg-slate-50 rounded-2xl p-6 mb-10 border-l-4 border-primary/40 shadow-sm">
                      <p className="text-slate-600 text-base sm:text-lg leading-relaxed italic">
                        {selectedArticle.excerpt || selectedArticle.summary}
                      </p>
                    </div>
                  )}

                  {/* Main Body Content */}
                  <div className="prose prose-slate max-w-none article-content">
                    {selectedArticle.body ? (
                      <PortableText value={selectedArticle.body} components={ptComponents} />
                    ) : (
                      // กรณีไม่มี Body ให้แสดง Excerpt ซ้ำเพื่อไม่ให้หน้าว่าง
                      <p className="text-slate-500 text-lg leading-relaxed italic">
                        {selectedArticle.excerpt || selectedArticle.summary}
                      </p>
                    )}
                  </div>

                  {/* Footer Button */}
                  <div className="mt-16 pt-10 border-t border-slate-100 text-center">
                    <Button 
                      onClick={() => setSelectedArticle(null)} 
                      className="rounded-full px-12 h-14 text-base font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
                    >
                      กลับไปหน้าบทความ
                    </Button>
                    <p className="text-slate-400 text-[10px] mt-6 uppercase tracking-widest font-medium">
                      © SCOPE SOLUTIONS - Knowledge Hub
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}