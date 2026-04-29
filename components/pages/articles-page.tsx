"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { 
  BookOpen, Clock, Eye, Heart, Lock, Crown, Sparkles,
  Search, Filter, ChevronRight, User, Calendar, Tag, X, Share2
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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
}

const articles: Article[] = [
  {
    id: "1",
    title: "วิธีวางแผนภาษีสำหรับ SME ปี 2568",
    excerpt: "เรียนรู้เทคนิคการวางแผนภาษีอย่างถูกกฎหมาย เพื่อประหยัดภาษีและเพิ่มกำไรให้ธุรกิจ...",
    image: "/images/course-tax-planning.jpg",
    category: "tax",
    tier: "free",
    author: "คุณเบียร์",
    authorImage: "/images/ceo-ribeer.jpg",
    date: "28 มี.ค. 68",
    readTime: "5 นาที",
    views: 1250,
    likes: 89
  },
  {
    id: "2",
    title: "5 สิ่งที่ต้องรู้ก่อนเริ่มทำธุรกิจ",
    excerpt: "สิ่งสำคัญที่ผู้ประกอบการใหม่ควรรู้ก่อนเริ่มต้นธุรกิจ ตั้งแต่การวางแผนไปจนถึงการจดทะเบียน...",
    image: "/images/course-business.jpg",
    category: "business",
    tier: "free",
    author: "คุณเบียร์",
    authorImage: "/images/ceo-ribeer.jpg",
    date: "25 มี.ค. 68",
    readTime: "8 นาที",
    views: 2340,
    likes: 156
  },
  {
    id: "3",
    title: "การคำนวณต้นทุนก่อสร้างเบื้องต้น",
    excerpt: "วิธีการประมาณราคาก่อสร้างเบื้องต้นสำหรับผู้ที่ต้องการสร้างบ้านหรืออาคาร...",
    image: "/images/course-construction.jpg",
    category: "engineering",
    tier: "member",
    author: "คุณเบนซ์",
    authorImage: "/images/engineer-benz.png",
    date: "22 มี.ค. 68",
    readTime: "12 นาที",
    views: 890,
    likes: 67
  },
  {
    id: "4",
    title: "เทคนิคการทำบัญชีอย่างถูกต้อง",
    excerpt: "หลักการบันทึกบัญชีที่ถูกต้องตามมาตรฐานการบัญชี สำหรับธุรกิจ SME...",
    image: "/images/course-accounting-basics.jpg",
    category: "accounting",
    tier: "free",
    author: "คุณเบียร์",
    authorImage: "/images/ceo-ribeer.jpg",
    date: "20 มี.ค. 68",
    readTime: "10 นาที",
    views: 1890,
    likes: 134
  },
  {
    id: "5",
    title: "การยื่นภาษีมูลค่าเพิ่ม (VAT) ครบวงจร",
    excerpt: "ขั้นตอนการยื่นภาษีมูลค่าเพิ่มอย่างละเอียด พร้อมตัวอย่างการกรอกแบบ...",
    image: "/images/course-tax-planning.jpg",
    category: "tax",
    tier: "member",
    author: "คุณเบียร์",
    authorImage: "/images/ceo-ribeer.jpg",
    date: "18 มี.ค. 68",
    readTime: "15 นาที",
    views: 756,
    likes: 45
  },
  {
    id: "6",
    title: "สูตรคำนวณปริมาณคอนกรีตและเหล็ก",
    excerpt: "สูตรคำนวณวัสดุก่อสร้างที่วิศวกรใช้จริง พร้อมตัวอย่างการคำนวณ...",
    image: "/images/course-construction.jpg",
    category: "engineering",
    tier: "premium",
    author: "คุณนัท",
    authorImage: "/images/engineer-nut.png",
    date: "15 มี.ค. 68",
    readTime: "20 นาที",
    views: 445,
    likes: 38
  },
  {
    id: "7",
    title: "การวิเคราะห์งบการเงินสำหรับผู้บริหาร",
    excerpt: "เรียนรู้การอ่านและวิเคราะห์งบการเงินเพื่อการตัดสินใจทางธุรกิจ...",
    image: "/images/course-business.jpg",
    category: "business",
    tier: "premium",
    author: "คุณเบียร์",
    authorImage: "/images/ceo-ribeer.jpg",
    date: "12 มี.ค. 68",
    readTime: "25 นาที",
    views: 320,
    likes: 28
  },
  {
    id: "8",
    title: "เทคนิคการใช้ Excel สำหรับงานบัญชี",
    excerpt: "สูตร Excel ที่นักบัญชีต้องรู้ พร้อมไฟล์ตัวอย่างให้ดาวน์โหลด...",
    image: "/images/course-excel.jpg",
    category: "accounting",
    tier: "member",
    author: "คุณเบียร์",
    authorImage: "/images/ceo-ribeer.jpg",
    date: "10 มี.ค. 68",
    readTime: "18 นาที",
    views: 1120,
    likes: 92
  },
]

const categories = [
  { id: "all" as ArticleCategory, label: "ทั้งหมด", count: articles.length },
  { id: "accounting" as ArticleCategory, label: "บัญชี", count: articles.filter(a => a.category === "accounting").length },
  { id: "tax" as ArticleCategory, label: "ภาษี", count: articles.filter(a => a.category === "tax").length },
  { id: "business" as ArticleCategory, label: "ธุรกิจ", count: articles.filter(a => a.category === "business").length },
  { id: "engineering" as ArticleCategory, label: "วิศวกรรม", count: articles.filter(a => a.category === "engineering").length },
]

const tierConfig = {
  free: { label: "ฟรี", color: "bg-emerald-500", icon: BookOpen },
  member: { label: "สมาชิก", color: "bg-sky-500", icon: Sparkles },
  premium: { label: "Premium", color: "bg-amber-500", icon: Crown },
}

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === "all" || article.category === activeCategory
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleArticleClick = (article: Article) => {
    if (article.tier === "free") {
      setSelectedArticle(article)
    } else {
      setShowLoginModal(true)
    }
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50" />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-200/40 to-pink-200/40 rounded-full blur-3xl"
        />
        
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200 mb-6"
            >
              <BookOpen className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-semibold text-purple-600">Knowledge Hub</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              บทความความรู้
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              เรียนรู้เรื่องบัญชี ภาษี ธุรกิจ และวิศวกรรม จากผู้เชี่ยวชาญ
              พร้อมอัพเดทความรู้ใหม่ๆ ทุกสัปดาห์
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="ค้นหาบทความ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-2xl border-purple-100 focus:border-purple-300 bg-white/80 backdrop-blur-sm"
              />
            </div>
          </motion.div>

          {/* Tier Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {Object.entries(tierConfig).map(([key, config]) => (
              <div key={key} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border">
                <div className={`w-3 h-3 rounded-full ${config.color}`} />
                <span className="text-sm font-medium text-foreground">{config.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "text-white shadow-lg"
                    : "bg-white text-muted-foreground hover:bg-purple-50"
                }`}
              >
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="cat-bg"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {cat.label}
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    activeCategory === cat.id ? "bg-white/20" : "bg-purple-100 text-purple-600"
                  }`}>
                    {cat.count}
                  </span>
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredArticles.map((article, i) => {
                const tierInfo = tierConfig[article.tier]
                const TierIcon = tierInfo.icon
                
                return (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -10 }}
                    onClick={() => handleArticleClick(article)}
                    className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Tier Badge */}
                      <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full ${tierInfo.color} text-white text-xs font-bold flex items-center gap-1.5`}>
                        <TierIcon className="w-3.5 h-3.5" />
                        {tierInfo.label}
                      </div>
                      
                      {/* Lock overlay for non-free */}
                      {article.tier !== "free" && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 text-center">
                            <Lock className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                            <p className="text-sm font-semibold text-slate-700">
                              {article.tier === "member" ? "เข้าสู่ระบบเพื่ออ่าน" : "สำหรับ Premium"}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {/* Category */}
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-white/90 text-xs font-medium text-foreground">
                          {categories.find(c => c.id === article.category)?.label}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-bold text-foreground text-lg mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      
                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1.5">
                            {article.authorImage ? (
                              <Image src={article.authorImage} alt={article.author} width={20} height={20} className="w-5 h-5 rounded-full object-cover object-top" />
                            ) : (
                              <User className="w-3.5 h-3.5" />
                            )}
                            {article.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {article.readTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            {article.views.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3.5 h-3.5" />
                            {article.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {filteredArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <BookOpen className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-xl font-semibold text-muted-foreground">ไม่พบบทความ</p>
              <p className="text-muted-foreground mt-2">ลองค้นหาด้วยคำอื่น</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Article View Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-auto"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden my-2 sm:my-8 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
            >
              {/* Header Image */}
              <div className="relative aspect-[16/9] sm:aspect-[21/9]">
                <Image
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white">
                  <span className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold mb-2 sm:mb-3 ${tierConfig[selectedArticle.tier].color}`}>
                    {tierConfig[selectedArticle.tier].label}
                  </span>
                  <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 line-clamp-2">{selectedArticle.title}</h2>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4 sm:p-6 lg:p-8">
                {/* Author Info */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b">
                  <div className="flex items-center gap-3">
                    {selectedArticle.authorImage ? (
                      <Image src={selectedArticle.authorImage} alt={selectedArticle.author} width={48} height={48} className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover object-top flex-shrink-0" />
                    ) : (
                      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-base sm:text-xl flex-shrink-0">
                        {selectedArticle.author[0]}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-foreground text-sm sm:text-base">{selectedArticle.author}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{selectedArticle.date} - {selectedArticle.readTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:ml-auto text-xs sm:text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{selectedArticle.views.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{selectedArticle.likes}</span>
                  </div>
                </div>
                
                {/* Article Content */}
                <div className="prose prose-sm sm:prose-lg max-w-none">
                  <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">{selectedArticle.excerpt}</p>
                  
                  <h3 className="text-base sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">บทนำ</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                    สำหรับผู้ประกอบการและเจ้าของธุรกิจ การทำความเข้าใจหัวข้อนี้เป็นสิ่งสำคัญอย่างยิ่ง 
                    บทความนี้จะพาคุณไปรู้จักกับหลักการพื้นฐานและเทคนิคที่ผู้เชี่ยวชาญใช้ในการทำงาน
                  </p>
                  
                  <h3 className="text-base sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">เนื้อหาหลัก</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                    การเริ่มต้นที่ดีคือการทำความเข้าใจพื้นฐานให้แน่น เมื่อคุณมีความรู้พื้นฐานที่ดี 
                    การต่อยอดไปสู่เรื่องที่ซับซ้อนมากขึ้นจะง่ายขึ้นอย่างมาก
                  </p>
                  <ul className="list-disc pl-4 sm:pl-6 space-y-1.5 sm:space-y-2 text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                    <li>ศึกษาหลักการพื้นฐานให้เข้าใจ</li>
                    <li>ฝึกฝนด้วยตัวอย่างจริง</li>
                    <li>ปรึกษาผู้เชี่ยวชาญเมื่อมีข้อสงสัย</li>
                    <li>อัพเดทความรู้อย่างสม่ำเสมอ</li>
                  </ul>
                  
                  <h3 className="text-base sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">สรุป</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                    หวังว่าบทความนี้จะเป็นประโยชน์กับทุกท่าน หากมีข้อสงสัยสามารถติดต่อสอบถามได้ที่ SCOPE SOLUTIONS 
                    เรายินดีให้คำปรึกษาและช่วยเหลือทุกท่านเสมอ
                  </p>
                </div>
                
                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Button variant="outline" size="sm" className="rounded-full flex-1 sm:flex-none text-xs sm:text-sm">
                      <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                      ถูกใจ
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full flex-1 sm:flex-none text-xs sm:text-sm">
                      <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                      แชร์
                    </Button>
                  </div>
                  <Button onClick={() => setSelectedArticle(null)} className="rounded-full text-xs sm:text-sm">
                    ปิด
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={() => setShowLoginModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-md w-full shadow-2xl mx-2"
            >
              <div className="text-center mb-4 sm:mb-6">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Lock className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1.5 sm:mb-2">เข้าสู่ระบบ</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  เข้าสู่ระบบเพื่ออ่านบทความสำหรับสมาชิก
                </p>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <Input placeholder="อีเมล" type="email" className="py-5 sm:py-6 rounded-lg sm:rounded-xl text-sm sm:text-base" />
                <Input placeholder="รหัสผ่าน" type="password" className="py-5 sm:py-6 rounded-lg sm:rounded-xl text-sm sm:text-base" />
              </div>
              
              <Button className="w-full mt-4 sm:mt-6 py-5 sm:py-6 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm sm:text-base">
                เข้าสู่ระบบ
              </Button>
              
              <p className="text-center text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-4">
                ยังไม่มีบัญชี? <button className="text-purple-500 font-semibold">สมัครสมาชิก</button>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Spacing */}
      <div className="h-8" />
    </div>
  )
}
