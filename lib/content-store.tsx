"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export interface Article {
  id: string
  title: string
  titleTh: string
  excerpt: string
  content: string
  category: string
  image: string
  tier: "free" | "member" | "premium"
  author: string
  date: string
  readTime: string
  order: number
  published: boolean
}

export interface Course {
  id: string
  title: string
  titleTh: string
  description: string
  image: string
  instructor: string
  duration: string
  lessons: number
  tier: "free" | "member" | "premium"
  category: string
  order: number
  published: boolean
}

export interface Partner {
  id: string
  name: string
  initials: string
  logo?: string
  order: number
  active: boolean
}

interface ContentStore {
  articles: Article[]
  courses: Course[]
  partners: Partner[]
  addArticle: (article: Omit<Article, "id">) => void
  updateArticle: (id: string, article: Partial<Article>) => void
  deleteArticle: (id: string) => void
  addCourse: (course: Omit<Course, "id">) => void
  updateCourse: (id: string, course: Partial<Course>) => void
  deleteCourse: (id: string) => void
  addPartner: (partner: Omit<Partner, "id">) => void
  updatePartner: (id: string, partner: Partial<Partner>) => void
  deletePartner: (id: string) => void
  reorderItems: (type: "articles" | "courses" | "partners", items: { id: string; order: number }[]) => void
}

const defaultArticles: Article[] = [
  {
    id: "art-1",
    title: "VAT Basics for SMEs",
    titleTh: "ภาษีมูลค่าเพิ่มสำหรับ SME",
    excerpt: "เรียนรู้พื้นฐานภาษีมูลค่าเพิ่มที่ผู้ประกอบการต้องรู้",
    content: "เนื้อหาบทความเกี่ยวกับ VAT...",
    category: "tax",
    image: "/images/article-tax.jpg",
    tier: "free",
    author: "คุณเบียร์",
    date: "2024-01-15",
    readTime: "5 นาที",
    order: 1,
    published: true,
  },
  {
    id: "art-2",
    title: "Business Registration Guide",
    titleTh: "คู่มือจดทะเบียนธุรกิจ",
    excerpt: "ขั้นตอนการจดทะเบียนบริษัทและห้างหุ้นส่วน",
    content: "เนื้อหาบทความเกี่ยวกับการจดทะเบียน...",
    category: "business",
    image: "/images/article-business.jpg",
    tier: "member",
    author: "คุณเบียร์",
    date: "2024-02-20",
    readTime: "8 นาที",
    order: 2,
    published: true,
  },
  {
    id: "art-3",
    title: "Construction Cost Estimation",
    titleTh: "ประมาณการต้นทุนก่อสร้าง",
    excerpt: "วิธีคำนวณต้นทุนงานก่อสร้างเบื้องต้น",
    content: "เนื้อหาบทความเกี่ยวกับการประมาณการ...",
    category: "engineering",
    image: "/images/article-construction.jpg",
    tier: "premium",
    author: "ทีมวิศวกร",
    date: "2024-03-10",
    readTime: "12 นาที",
    order: 3,
    published: true,
  },
]

const defaultCourses: Course[] = [
  {
    id: "course-1",
    title: "Accounting Fundamentals",
    titleTh: "พื้นฐานการบัญชี",
    description: "เรียนรู้หลักการบัญชีเบื้องต้นสำหรับผู้เริ่มต้น",
    image: "/images/course-accounting-basics.jpg",
    instructor: "คุณเบียร์",
    duration: "4 ชั่วโมง",
    lessons: 12,
    tier: "free",
    category: "accounting",
    order: 1,
    published: true,
  },
  {
    id: "course-2",
    title: "Tax Planning Strategies",
    titleTh: "กลยุทธ์วางแผนภาษี",
    description: "วางแผนภาษีอย่างถูกต้องตามกฎหมาย",
    image: "/images/course-tax-planning.jpg",
    instructor: "คุณเบียร์",
    duration: "6 ชั่วโมง",
    lessons: 18,
    tier: "member",
    category: "tax",
    order: 2,
    published: true,
  },
  {
    id: "course-3",
    title: "Construction Management",
    titleTh: "การบริหารงานก่อสร้าง",
    description: "หลักการบริหารโครงการก่อสร้างอย่างมืออาชีพ",
    image: "/images/course-construction.jpg",
    instructor: "ทีมวิศวกร",
    duration: "8 ชั่วโมง",
    lessons: 24,
    tier: "premium",
    category: "engineering",
    order: 3,
    published: true,
  },
]

const defaultPartners: Partner[] = [
  { id: "p-1", name: "AY38 FACTORY", initials: "AY", order: 1, active: true },
  { id: "p-2", name: "STARTECH THAILAND", initials: "ST", order: 2, active: true },
  { id: "p-3", name: "EVOLUTIONS GAMETECH", initials: "EG", order: 3, active: true },
  { id: "p-4", name: "LIKEDEE.COM", initials: "LD", order: 4, active: true },
  { id: "p-5", name: "PROJECT MOST COPYCENTER", initials: "PM", order: 5, active: true },
  { id: "p-6", name: "RICHCRAFT FIVEM", initials: "RC", order: 6, active: true },
]

const ContentContext = createContext<ContentStore | undefined>(undefined)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<Article[]>(defaultArticles)
  const [courses, setCourses] = useState<Course[]>(defaultCourses)
  const [partners, setPartners] = useState<Partner[]>(defaultPartners)

  const addArticle = (article: Omit<Article, "id">) => {
    const newArticle = { ...article, id: `art-${Date.now()}` }
    setArticles(prev => [...prev, newArticle])
  }

  const updateArticle = (id: string, updates: Partial<Article>) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a))
  }

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id))
  }

  const addCourse = (course: Omit<Course, "id">) => {
    const newCourse = { ...course, id: `course-${Date.now()}` }
    setCourses(prev => [...prev, newCourse])
  }

  const updateCourse = (id: string, updates: Partial<Course>) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c))
  }

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id))
  }

  const addPartner = (partner: Omit<Partner, "id">) => {
    const newPartner = { ...partner, id: `p-${Date.now()}` }
    setPartners(prev => [...prev, newPartner])
  }

  const updatePartner = (id: string, updates: Partial<Partner>) => {
    setPartners(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const deletePartner = (id: string) => {
    setPartners(prev => prev.filter(p => p.id !== id))
  }

  const reorderItems = (type: "articles" | "courses" | "partners", items: { id: string; order: number }[]) => {
    if (type === "articles") {
      setArticles(prev => prev.map(a => {
        const item = items.find(i => i.id === a.id)
        return item ? { ...a, order: item.order } : a
      }).sort((a, b) => a.order - b.order))
    } else if (type === "courses") {
      setCourses(prev => prev.map(c => {
        const item = items.find(i => i.id === c.id)
        return item ? { ...c, order: item.order } : c
      }).sort((a, b) => a.order - b.order))
    } else {
      setPartners(prev => prev.map(p => {
        const item = items.find(i => i.id === p.id)
        return item ? { ...p, order: item.order } : p
      }).sort((a, b) => a.order - b.order))
    }
  }

  return (
    <ContentContext.Provider
      value={{
        articles,
        courses,
        partners,
        addArticle,
        updateArticle,
        deleteArticle,
        addCourse,
        updateCourse,
        deleteCourse,
        addPartner,
        updatePartner,
        deletePartner,
        reorderItems,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const context = useContext(ContentContext)
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider")
  }
  return context
}
