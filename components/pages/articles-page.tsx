"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { 
  BookOpen, Clock, Tag, X, Search, Newspaper, ChevronRight
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { client, urlFor } from "@/lib/sanity"
import { articlesQuery } from "@/lib/sanity.queries"
import { PortableText } from "@portabletext/react"

// --- แก้ไขส่วน Custom Components สำหรับแสดงรูปภาพเนื้อหา ---
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      const imageUrl = urlFor(value).url();
      return (
        <div className="relative w-full my-6 sm:my-10 group overflow-hidden">
          {/* ส่วนแสดงรูปภาพ: ปรับให้กว้างที่สุดและสูงตามจริง */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-md border border-slate-100">
            <img
              src={imageUrl}
              alt="เนื้อหาบทความ SCOPE"
              className="w-full h-auto object-contain bg-white"
            />
          </div>
          
          {/* ปุ่มทางลัด: ช่วยให้คนกดไปดูรูปเต็มเพื่อซูมได้ง่ายขึ้น */}
          <a 
            href={imageUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-xs font-bold text-primary hover:underline px-4 py-2 bg-primary/5 rounded-full"
          >
            <Search className="w-3 h-3" />
            จิ้มตรงนี้เพื่อขยายรูปอ่านแบบเต็มจอ
          </a>
        </div>
      )
    },
  },
  block: {
    normal: ({ children }: any) => <p className="text-slate-600 leading-relaxed mb-4 text-base sm:text-lg px-2 sm:px-0">{children}</p>,
    h2: ({ children }: any) => <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mt-8 mb-4 px-2 sm:px-0">{children}</h2>,
  },
}
// ----------------------------------------------------

type ArticleTier = "free" | "member" | "premium"
type ArticleCategory = "all" | "accounting" | "tax" | "business" | "engineering"

interface Article {
  id: string
  title: string
  excerpt: string
  image: string
  category: ArticleCategory
  tier: ArticleTier
  author: string
  date: string
  readTime: string
  body?: any
}

const categories = [
  { id: "all" as ArticleCategory, label: "ทั้งหมด" },
  { id: "accounting" as ArticleCategory, label: "บัญชี & ภาษี" },
  { id: "engineering" as ArticleCategory, label: "วิศวกรรม" },
]

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<ArticleCategory>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await client.fetch(articlesQuery)
        setArticles(data || [])
      } catch (error) {
        console.error("Error fetching articles:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === "all" || article.category === activeCategory
    const matchesSearch = article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-amber-50/30" />
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-bold mb-6 uppercase tracking-wider">
              <Newspaper className="w-4 h-4" />
              SCOPE KNOWLEDGE HUB
            </div>
            <h1 className="text-3xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
              คลังความรู้<span className="text-primary">บัญชี & วิศวกรรม</span>
            </h1>
            <div className="max-w-2xl mx-auto">
               <div className="relative flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1 sm:p-1.5 focus-within:ring-2 ring-primary/20 transition-all">
                <Search className="ml-4 w-5 h-5 text-slate-400" />
                <Input
                  placeholder="ค้นหาเรื่องที่สนใจ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 focus-visible:ring-0 text-sm sm:text-base py-6 bg-transparent"
                />
              </div>
            </div>
          </motion.div>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "default" : "outline"}
                onClick={() => setActiveCategory(cat.id)}
                className="rounded-full px-5 py-0 h-10 text-xs sm:text-sm"
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        {loading ? (
          <div className="flex justify-center items-center py-20 text-slate-400 text-sm">กำลังโหลดคลังความรู้...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article) => (
                <motion.article
                  key={article.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col"
                  onClick={() => setSelectedArticle(article)}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    {article.image && <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">{article.title}</h3>
                    <p className="text-slate-500 text-xs line-clamp-2 mb-6">{article.excerpt}</p>
                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                       <span>{article.author || "SCOPE Team"}</span>
                       <div className="flex gap-2"><Clock className="w-3 h-3" /> {article.readTime || "5 MIN"}</div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* --- แก้ไข Modal: ปรับให้กว้างและลดระยะขอบเพื่อให้รูปภาพตัวใหญ่ที่สุด --- */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center sm:p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={() => setSelectedArticle(null)} />
            
            <motion.div
              layoutId={selectedArticle.id}
              className="relative w-full h-full sm:h-auto sm:max-w-4xl bg-white sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
            >
              <button 
                onClick={() => setSelectedArticle(null)} 
                className="absolute top-4 right-4 z-50 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg text-slate-900 transition-all active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto overflow-x-hidden flex-1 scrollbar-hide">
                <div className="relative h-56 sm:h-80 w-full bg-slate-100">
                  {selectedArticle.image && <Image src={selectedArticle.image} alt={selectedArticle.title} fill className="object-cover" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />
                </div>

                {/* ส่วนเนื้อหา: ลด Padding ซ้ายขวาในมือถือให้เหลือน้อยที่สุด (p-4) เพื่อขยายรูปภาพ */}
                <div className="px-4 py-8 sm:px-12 sm:pb-16 -mt-12 relative z-10">
                  <div className="bg-white rounded-3xl p-5 sm:p-10 shadow-xl border border-slate-50">
                    <div className="flex items-center gap-2 text-primary font-bold text-[10px] sm:text-xs mb-4 uppercase tracking-tighter">
                      <Tag className="w-3 h-3" />
                      {categories.find(c => c.id === selectedArticle.category)?.label}
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
                      {selectedArticle.title}
                    </h2>
                    
                    <div className="h-1 w-20 bg-primary/20 rounded-full mb-10" />

                    {/* Content Area: รูปในนี้จะใหญ่มากเพราะ padding เราน้อย */}
                    <div className="article-content">
                      {selectedArticle.body ? (
                        <PortableText value={selectedArticle.body} components={ptComponents} />
                      ) : (
                        <p className="text-slate-500 italic text-base leading-relaxed">
                          {selectedArticle.excerpt}
                        </p>
                      )}
                    </div>

                    <div className="mt-12 flex flex-col items-center gap-4 border-t border-slate-100 pt-10">
                      <p className="text-xs text-slate-400 font-medium">ขอบคุณที่ติดตามสาระดีๆ จาก SCOPE SOLUTIONS</p>
                      <Button size="lg" className="rounded-full px-10 h-12 w-full sm:w-auto font-bold shadow-lg" onClick={() => setSelectedArticle(null)}>
                        ปิดหน้าบทความ
                      </Button>
                    </div>
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