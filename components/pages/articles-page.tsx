"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { 
  BookOpen, Clock, Eye, Heart, Crown, Sparkles,
  Search, Tag, X, Share2, Newspaper
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// --- ส่วนที่เพิ่ม/แก้ไขใหม่ ---
import { client, urlFor } from "@/lib/sanity"
import { articlesQuery } from "@/lib/sanity.queries"
import { PortableText } from "@portabletext/react" // ตัวอ่านเนื้อหาจาก Sanity
// -----------------------

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
  authorImage?: string
  date: string
  readTime: string
  views: number
  likes: number
  body?: any // เพิ่มฟิลด์ body รองรับเนื้อหาที่มีรูป
}

// สร้าง Custom Components สำหรับจัดการรูปภาพในเนื้อหาบทความ
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="relative w-full aspect-video my-10 rounded-[2rem] overflow-hidden shadow-xl border border-slate-100">
          <Image
            src={urlFor(value).url()}
            alt="เนื้อหาบทความ SCOPE"
            fill
            className="object-contain bg-slate-50"
          />
        </div>
      )
    },
  },
  block: {
    // ปรับแต่งขนาดตัวอักษรของเนื้อหา
    normal: ({ children }: any) => <p className="text-slate-600 leading-extra-relaxed mb-6 text-lg">{children}</p>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold text-slate-800 mt-12 mb-6">{children}</h2>,
  },
}

const categories = [
  { id: "all" as ArticleCategory, label: "ทั้งหมด" },
  { id: "accounting" as ArticleCategory, label: "บัญชี & ภาษี" },
  { id: "engineering" as ArticleCategory, label: "วิศวกรรม" },
]

const tierConfig = {
  free: { label: "อ่านฟรี", color: "bg-emerald-500", icon: BookOpen },
  member: { label: "สมาชิก", color: "bg-sky-500", icon: Sparkles },
  premium: { label: "Premium", color: "bg-amber-500", icon: Crown },
}

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
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-amber-50/30" />
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6">
              <Newspaper className="w-4 h-4" />
              SCOPE KNOWLEDGE HUB
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              คลังความรู้<span className="text-primary">บัญชี & วิศวกรรม</span>
            </h1>
            <div className="max-w-2xl mx-auto relative group">
               <div className="relative flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1.5 focus-within:border-primary transition-all">
                <Search className="ml-4 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="ค้นหาชื่อบทความ หรือเรื่องที่สนใจ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 focus-visible:ring-0 text-base py-6 bg-transparent"
                />
              </div>
            </div>
          </motion.div>
          {/* Categories Nav */}
          <div className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-4">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "default" : "outline"}
                onClick={() => setActiveCategory(cat.id)}
                className="rounded-full px-6"
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        {loading ? (
          <div className="flex justify-center items-center py-20 animate-pulse text-primary">กำลังโหลดข้อมูล...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article, i) => (
                <motion.article
                  key={article.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer"
                  onClick={() => setSelectedArticle(article)}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {article.image && <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />}
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-foreground mb-4 line-clamp-2">{article.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-6">{article.excerpt}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-50 text-[10px] text-muted-foreground">
                       <span>{article.author || "SCOPE Team"}</span>
                       <div className="flex gap-3"><Clock className="w-3 h-3" /> {article.readTime || "5 นาที"}</div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Modal แสดงเนื้อหาบทความแบบละเอียด */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setSelectedArticle(null)} />
            
            <motion.div
              layoutId={selectedArticle.id}
              className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <button onClick={() => setSelectedArticle(null)} className="absolute top-6 right-6 z-20 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-all">
                <X className="w-6 h-6" />
              </button>

              <div className="overflow-y-auto">
                <div className="relative h-72 sm:h-96 w-full">
                  {selectedArticle.image && <Image src={selectedArticle.image} alt={selectedArticle.title} fill className="object-cover" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                </div>

                <div className="p-8 sm:p-12 -mt-20 relative z-10">
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-50">
                    <div className="flex items-center gap-2 text-primary font-bold text-sm mb-4">
                      <Tag className="w-4 h-4" />
                      {categories.find(c => c.id === selectedArticle.category)?.label}
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                      {selectedArticle.title}
                    </h2>
                    
                    {/* --- ส่วนแสดงผลเนื้อหา (Rich Text + Images) --- */}
                    <div className="mt-10">
                      {selectedArticle.body ? (
                        <PortableText value={selectedArticle.body} components={ptComponents} />
                      ) : (
                        <p className="text-slate-500 italic text-lg leading-relaxed">
                          {selectedArticle.excerpt}
                        </p>
                      )}
                    </div>
                    {/* ------------------------------------------- */}

                    <div className="mt-12 flex justify-center border-t pt-8">
                      <Button size="lg" className="rounded-full px-12 h-14 shadow-xl" onClick={() => setSelectedArticle(null)}>
                        ปิดหน้าต่างนี้
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