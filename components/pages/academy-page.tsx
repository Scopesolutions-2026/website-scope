"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Lock, Play, Clock, Users, X, BookOpen, FileText, Video, Star, ChevronRight, Sparkles, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CourseStatus = "free" | "member" | "premium"

interface Course {
  id: string
  title: string
  titleTh: string
  description: string
  status: CourseStatus
  duration: string
  students: number
  lessons: number
  image: string
  instructor: string
  instructorImage?: string
}

const courses: Course[] = [
  {
    id: "1",
    title: "Basic VAT Guide",
    titleTh: "พื้นฐานภาษีมูลค่าเพิ่ม",
    description: "เรียนรู้หลักการ VAT 7% การคำนวณ และการยื่นภาษีเบื้องต้น สำหรับเจ้าของธุรกิจและนักบัญชี",
    status: "free",
    duration: "2 ชม.",
    students: 1250,
    lessons: 8,
    image: "/images/course-tax-planning.jpg",
    instructor: "คุณเบียร์",
    instructorImage: "/images/ceo-ribeer.jpg"
  },
  {
    id: "2",
    title: "Excel for Accounting",
    titleTh: "Excel สำหรับงานบัญชี",
    description: "เรียนรู้การใช้ Excel ในงานบัญชี สูตรคำนวณ Pivot Table และการทำรายงาน",
    status: "free",
    duration: "3 ชม.",
    students: 890,
    lessons: 12,
    image: "/images/course-excel.jpg",
    instructor: "คุณเบียร์",
    instructorImage: "/images/ceo-ribeer.jpg"
  },
  {
    id: "3",
    title: "Bookkeeping Basics",
    titleTh: "พื้นฐานการทำบัญชี",
    description: "หลักการบัญชีเบื้องต้น การบันทึกบัญชี สมุดบัญชี และงบการเงิน",
    status: "free",
    duration: "4 ชม.",
    students: 2100,
    lessons: 15,
    image: "/images/course-accounting-basics.jpg",
    instructor: "คุณเบียร์",
    instructorImage: "/images/ceo-ribeer.jpg"
  },
  {
    id: "4",
    title: "Tax Planning Strategies",
    titleTh: "กลยุทธ์วางแผนภาษี",
    description: "เทคนิคการวางแผนภาษีให้ถูกกฎหมายและประหยัดที่สุด สำหรับธุรกิจ SME",
    status: "member",
    duration: "5 ชม.",
    students: 567,
    lessons: 18,
    image: "/images/course-tax-planning.jpg",
    instructor: "คุณเบียร์",
    instructorImage: "/images/ceo-ribeer.jpg"
  },
  {
    id: "5",
    title: "Engineering Costing",
    titleTh: "การประมาณราคางานวิศวกรรม",
    description: "เจาะลึกการคิดต้นทุนงานก่อสร้าง BOQ และการตั้งราคางานอย่างมืออาชีพ",
    status: "member",
    duration: "8 ชม.",
    students: 423,
    lessons: 20,
    image: "/images/course-construction.jpg",
    instructor: "คุณเบนซ์",
    instructorImage: "/images/engineer-benz.png"
  },
  {
    id: "6",
    title: "Business Finance",
    titleTh: "การเงินสำหรับธุรกิจ",
    description: "การบริหารการเงิน กระแสเงินสด การวิเคราะห์งบการเงิน และการตัดสินใจทางการเงิน",
    status: "premium",
    duration: "10 ชม.",
    students: 234,
    lessons: 25,
    image: "/images/course-business.jpg",
    instructor: "คุณเบียร์",
    instructorImage: "/images/ceo-ribeer.jpg"
  },
]

const statusConfig: Record<CourseStatus, { label: string; labelTh: string; color: string; gradient: string }> = {
  free: { label: "Free", labelTh: "ฟรี", color: "text-emerald-600", gradient: "from-emerald-400 to-teal-500" },
  member: { label: "Member", labelTh: "สมาชิก", color: "text-blue-600", gradient: "from-blue-400 to-indigo-500" },
  premium: { label: "Premium", labelTh: "พรีเมียม", color: "text-amber-600", gradient: "from-amber-400 to-orange-500" },
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function AcademyPage() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showCourseModal, setShowCourseModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [filter, setFilter] = useState<"all" | CourseStatus>("all")
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null)

  const filteredCourses = filter === "all" ? courses : courses.filter(c => c.status === filter)

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course)
    if (course.status === "free") {
      setShowCourseModal(true)
    } else {
      setShowLoginModal(true)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <section className="relative overflow-hidden px-6 py-16 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-10 right-[20%] w-72 h-72 bg-primary/10 rounded-full blur-3xl" 
        />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
          >
            <GraduationCap className="w-4 h-4" />
            เรียนรู้กับผู้เชี่ยวชาญ
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-bold text-foreground mb-6"
          >
            SCOPE Academy
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            คอร์สเรียนออนไลน์ด้านบัญชี ภาษี และวิศวกรรม จากผู้เชี่ยวชาญตัวจริง
          </motion.p>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 lg:gap-16"
          >
            <div className="text-center">
              <p className="text-3xl lg:text-4xl font-bold text-foreground">6+</p>
              <p className="text-muted-foreground">คอร์สเรียน</p>
            </div>
            <div className="text-center">
              <p className="text-3xl lg:text-4xl font-bold text-foreground">5,000+</p>
              <p className="text-muted-foreground">นักเรียน</p>
            </div>
            <div className="text-center">
              <p className="text-3xl lg:text-4xl font-bold text-foreground">50+</p>
              <p className="text-muted-foreground">บทเรียน</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Filters */}
      <section className="px-6 py-8 border-y border-border bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {(["all", "free", "member", "premium"] as const).map((f) => (
              <motion.button
                key={f}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300",
                  filter === f
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-card text-muted-foreground hover:bg-muted border border-border"
                )}
              >
                {f === "all" ? "ทั้งหมด" : statusConfig[f].labelTh}
                {f !== "all" && (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-xs">
                    {courses.filter(c => c.status === f).length}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="px-6 py-16">
        <motion.div 
          variants={stagger}
          initial="initial"
          animate="animate"
          className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => {
              const status = statusConfig[course.status]
              const isLocked = course.status !== "free"
              const isHovered = hoveredCourse === course.id

              return (
                <motion.div
                  key={course.id}
                  layout
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  onClick={() => handleCourseClick(course)}
                  onMouseEnter={() => setHoveredCourse(course.id)}
                  onMouseLeave={() => setHoveredCourse(null)}
                  className={cn(
                    "group relative overflow-hidden rounded-3xl bg-card border border-border shadow-lg hover:shadow-2xl hover:border-primary/30 transition-all duration-500",
                    isLocked && "cursor-pointer"
                  )}
                >
                  {/* Image with Preview Effect */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.titleTh}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-t opacity-80",
                      status.gradient
                    )} />
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                        className={cn(
                          "w-16 h-16 rounded-full flex items-center justify-center transition-all",
                          isLocked 
                            ? "bg-white/20 backdrop-blur-sm border border-white/30" 
                            : "bg-white/30 backdrop-blur-sm border border-white/40"
                        )}
                      >
                        {isLocked ? (
                          <Lock className="w-6 h-6 text-white" />
                        ) : (
                          <Play className="w-6 h-6 text-white ml-1" />
                        )}
                      </motion.div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <div className={cn(
                        "px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r",
                        status.gradient
                      )}>
                        {status.label}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">{course.titleTh}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
                      <span className="flex items-center gap-1.5">
                        <Video className="w-4 h-4 text-primary" />
                        {course.lessons} บทเรียน
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-primary" />
                        {course.students.toLocaleString()}
                      </span>
                    </div>

                    {/* Instructor */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-3">
                        {course.instructorImage ? (
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <Image src={course.instructorImage} alt={course.instructor} width={40} height={40} className="w-full h-full object-cover object-top" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <span className="text-sm font-bold text-white">{course.instructor[0]}</span>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-foreground">{course.instructor}</p>
                          <p className="text-xs text-muted-foreground">ผู้สอน</p>
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        variant={isLocked ? "outline" : "default"}
                        className="rounded-full"
                      >
                        {isLocked ? "Unlock" : "เรียนฟรี"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Free Resources Section */}
      <section className="px-6 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Free Resources</p>
            <h2 className="text-3xl font-bold text-foreground">ทรัพยากรฟรีสำหรับทุกคน</h2>
          </motion.div>

          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-6"
          >
            {[
              { icon: FileText, title: "Free Articles", desc: "บทความฟรี", count: "50+", color: "from-emerald-400 to-teal-500" },
              { icon: Video, title: "Free Videos", desc: "วิดีโอฟรี", count: "20+", color: "from-blue-400 to-indigo-500" },
              { icon: Sparkles, title: "Free Tools", desc: "เครื่องมือฟรี", count: "50+", color: "from-amber-400 to-orange-500" },
            ].map((item) => (
              <motion.div 
                key={item.title}
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 group"
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6 group-hover:scale-110 transition-transform",
                  item.color
                )}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{item.count}</h3>
                <p className="text-lg font-medium text-foreground mb-1">{item.title}</p>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Free Course Viewer Modal */}
      <AnimatePresence>
        {showCourseModal && selectedCourse && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto"
            onClick={() => setShowCourseModal(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl sm:rounded-3xl bg-card border border-border shadow-2xl my-4 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Course Header */}
              <div className="relative h-40 sm:h-56">
                <Image
                  src={selectedCourse.image}
                  alt={selectedCourse.titleTh}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <button
                  onClick={() => setShowCourseModal(false)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <div className={`inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r ${statusConfig[selectedCourse.status].gradient} mb-2 sm:mb-3`}>
                    {statusConfig[selectedCourse.status].label} Course
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{selectedCourse.titleTh}</h2>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-4 sm:p-6 lg:p-8">
                {/* Instructor */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 pb-4 sm:pb-6 border-b gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    {selectedCourse.instructorImage ? (
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0">
                        <Image src={selectedCourse.instructorImage} alt={selectedCourse.instructor} width={56} height={56} className="w-full h-full object-cover object-top" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                        <span className="text-lg sm:text-xl font-bold text-white">{selectedCourse.instructor[0]}</span>
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-foreground text-sm sm:text-base">{selectedCourse.instructor}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">ผู้สอน</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{selectedCourse.duration}</span>
                    <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{selectedCourse.lessons} บทเรียน</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{selectedCourse.students.toLocaleString()}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4">เกี่ยวกับคอร์ส</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{selectedCourse.description}</p>
                </div>

                {/* Lessons List */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4">เนื้อหาบทเรียน</h3>
                  <div className="space-y-2 sm:space-y-3">
                    {Array.from({ length: Math.min(selectedCourse.lessons, 5) }, (_, i) => (
                      <div key={i} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer group">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                          <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary group-hover:text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm sm:text-base truncate">บทที่ {i + 1}: {i === 0 ? "แนะนำคอร์ส" : i === 1 ? "พื้นฐานที่ต้องรู้" : i === 2 ? "เริ่มต้นปฏิบัติ" : i === 3 ? "เทคนิคขั้นสูง" : "สรุปและทบทวน"}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">{10 + i * 5} นาที</p>
                        </div>
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                      </div>
                    ))}
                    {selectedCourse.lessons > 5 && (
                      <p className="text-xs sm:text-sm text-center text-muted-foreground pt-2">และอีก {selectedCourse.lessons - 5} บทเรียน...</p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button className="flex-1 h-12 sm:h-14 text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl" size="lg">
                    <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                    เริ่มเรียนเลย
                  </Button>
                  <Button variant="outline" className="flex-1 h-12 sm:h-14 text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl" size="lg" onClick={() => setShowCourseModal(false)}>
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
        {showLoginModal && selectedCourse && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto"
            onClick={() => setShowLoginModal(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl sm:rounded-3xl bg-card border border-border shadow-2xl my-4"
              onClick={e => e.stopPropagation()}
            >
              {/* Course Preview Image */}
              <div className="relative h-32 sm:h-40">
                <Image
                  src={selectedCourse.image}
                  alt={selectedCourse.titleTh}
                  fill
                  className="object-cover"
                />
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-t opacity-80",
                  statusConfig[selectedCourse.status].gradient
                )} />
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                  <div className={cn(
                    "px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r",
                    statusConfig[selectedCourse.status].gradient
                  )}>
                    {statusConfig[selectedCourse.status].label} Course
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-8">
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Lock className="w-7 h-7 sm:w-10 sm:h-10 text-primary" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-1.5 sm:mb-2">
                  ต้องเข้าสู่ระบบ
                </h3>
                <p className="text-center text-sm sm:text-base text-muted-foreground mb-5 sm:mb-8">
                  คอร์ส &quot;{selectedCourse.titleTh}&quot; สำหรับสมาชิก{selectedCourse.status === "member" ? "" : "พรีเมียม"}เท่านั้น
                </p>

                <div className="space-y-2 sm:space-y-3">
                  <Button className="w-full h-12 sm:h-14 text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl" size="lg">
                    เข้าสู่ระบบ
                  </Button>
                  <Button variant="outline" className="w-full h-12 sm:h-14 text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl" size="lg">
                    สมัครสมาชิกใหม่
                  </Button>
                </div>

                <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-muted-foreground">
                  สมัครสมาชิกฟรี หรืออัพเกรดเป็น Premium เพื่อปลดล็อคคอร์สทั้งหมด
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
