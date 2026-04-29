"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  LayoutDashboard, FileText, GraduationCap, Users, Settings, 
  Plus, Pencil, Trash2, Save, X, GripVertical, Eye, EyeOff,
  Upload, Image as ImageIcon, ArrowUp, ArrowDown, LogOut
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useContent, Article, Course, Partner } from "@/lib/content-store"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"

type AdminTab = "dashboard" | "articles" | "courses" | "partners" | "settings"

export default function AdminPage() {
  const { user, logout, isAdmin } = useAuth()
  const content = useContent()
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard")
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState<"article" | "course" | "partner" | null>(null)

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-red-100 flex items-center justify-center">
            <X className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Access Denied</h2>
          <p className="text-muted-foreground">คุณไม่มีสิทธิ์เข้าถึงหน้านี้</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: "dashboard" as AdminTab, label: "Dashboard", icon: LayoutDashboard },
    { id: "articles" as AdminTab, label: "บทความ", icon: FileText },
    { id: "courses" as AdminTab, label: "คอร์สเรียน", icon: GraduationCap },
    { id: "partners" as AdminTab, label: "พาร์ทเนอร์", icon: Users },
    { id: "settings" as AdminTab, label: "ตั้งค่า", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Admin Header */}
      <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl overflow-hidden">
              <Image src="/logo.png" alt="SCOPE" width={40} height={40} className="object-cover" />
            </div>
            <div>
              <h1 className="font-bold">SCOPE Admin Panel</h1>
              <p className="text-sm text-white/70">Yos Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-white/70">{user?.email}</p>
            </div>
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              ออกจากระบบ
            </Button>
          </div>
        </div>
      </header>

      {/* Admin Tabs */}
      <div className="bg-white border-b border-border sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-slate-100"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
              
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "บทความทั้งหมด", value: content.articles.length, color: "from-blue-500 to-sky-500" },
                  { label: "คอร์สเรียน", value: content.courses.length, color: "from-violet-500 to-purple-500" },
                  { label: "พาร์ทเนอร์", value: content.partners.length, color: "from-emerald-500 to-teal-500" },
                  { label: "เครื่องมือ", value: 50, color: "from-amber-500 to-orange-500" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-sm"
                  >
                    <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-r flex items-center justify-center mb-4", stat.color)}>
                      <span className="text-2xl font-bold text-white">{stat.value}</span>
                    </div>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-foreground mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button onClick={() => setShowAddModal("article")} className="h-auto py-4 flex-col gap-2">
                    <Plus className="w-6 h-6" />
                    <span>เพิ่มบทความใหม่</span>
                  </Button>
                  <Button onClick={() => setShowAddModal("course")} variant="outline" className="h-auto py-4 flex-col gap-2">
                    <Plus className="w-6 h-6" />
                    <span>เพิ่มคอร์สใหม่</span>
                  </Button>
                  <Button onClick={() => setShowAddModal("partner")} variant="outline" className="h-auto py-4 flex-col gap-2">
                    <Plus className="w-6 h-6" />
                    <span>เพิ่มพาร์ทเนอร์</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "articles" && (
            <motion.div
              key="articles"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">จัดการบทความ</h2>
                <Button onClick={() => setShowAddModal("article")}>
                  <Plus className="w-4 h-4 mr-2" />
                  เพิ่มบทความ
                </Button>
              </div>

              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="divide-y divide-border">
                  {content.articles.sort((a, b) => a.order - b.order).map((article) => (
                    <ArticleRow
                      key={article.id}
                      article={article}
                      onUpdate={content.updateArticle}
                      onDelete={content.deleteArticle}
                      isEditing={editingItem === article.id}
                      onEditToggle={() => setEditingItem(editingItem === article.id ? null : article.id)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "courses" && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">จัดการคอร์สเรียน</h2>
                <Button onClick={() => setShowAddModal("course")}>
                  <Plus className="w-4 h-4 mr-2" />
                  เพิ่มคอร์ส
                </Button>
              </div>

              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="divide-y divide-border">
                  {content.courses.sort((a, b) => a.order - b.order).map((course) => (
                    <CourseRow
                      key={course.id}
                      course={course}
                      onUpdate={content.updateCourse}
                      onDelete={content.deleteCourse}
                      isEditing={editingItem === course.id}
                      onEditToggle={() => setEditingItem(editingItem === course.id ? null : course.id)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "partners" && (
            <motion.div
              key="partners"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">จัดการพาร์ทเนอร์</h2>
                <Button onClick={() => setShowAddModal("partner")}>
                  <Plus className="w-4 h-4 mr-2" />
                  เพิ่มพาร์ทเนอร์
                </Button>
              </div>

              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="divide-y divide-border">
                  {content.partners.sort((a, b) => a.order - b.order).map((partner, index) => (
                    <PartnerRow
                      key={partner.id}
                      partner={partner}
                      index={index}
                      total={content.partners.length}
                      onUpdate={content.updatePartner}
                      onDelete={content.deletePartner}
                      onMoveUp={() => {
                        if (index > 0) {
                          const sorted = [...content.partners].sort((a, b) => a.order - b.order)
                          const newOrder = sorted.map((p, i) => ({
                            id: p.id,
                            order: p.id === partner.id ? i : p.id === sorted[index - 1].id ? i + 1 : i + 1
                          }))
                          content.reorderItems("partners", newOrder)
                        }
                      }}
                      onMoveDown={() => {
                        if (index < content.partners.length - 1) {
                          const sorted = [...content.partners].sort((a, b) => a.order - b.order)
                          const newOrder = sorted.map((p, i) => ({
                            id: p.id,
                            order: p.id === partner.id ? i + 2 : p.id === sorted[index + 1].id ? i : i + 1
                          }))
                          content.reorderItems("partners", newOrder)
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-foreground">ตั้งค่าระบบ</h2>
              
              <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="font-bold text-foreground mb-4">ข้อมูลบริษัท</h3>
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">ชื่อบริษัท</label>
                      <input
                        type="text"
                        defaultValue="SCOPE SOLUTIONS CO., LTD"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">ที่อยู่</label>
                      <input
                        type="text"
                        defaultValue="29/127 โครงการไอคอนวิลล่า 10 หมู่ 17 ตำบลบ้านเป็ด อำเภอเมือง ขอนแก่น 40000"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">เบอร์โทร</label>
                      <input
                        type="text"
                        defaultValue="093-556-0076"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Line ID</label>
                      <input
                        type="text"
                        defaultValue="@Scopesolutions"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
                      />
                    </div>
                  </div>
                </div>

                <Button className="w-full sm:w-auto">
                  <Save className="w-4 h-4 mr-2" />
                  บันทึกการเปลี่ยนแปลง
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Add Modal */}
      <AddModal
        type={showAddModal}
        onClose={() => setShowAddModal(null)}
        onAddArticle={content.addArticle}
        onAddCourse={content.addCourse}
        onAddPartner={content.addPartner}
        articleCount={content.articles.length}
        courseCount={content.courses.length}
        partnerCount={content.partners.length}
      />
    </div>
  )
}

// Article Row Component
function ArticleRow({ article, onUpdate, onDelete, isEditing, onEditToggle }: {
  article: Article
  onUpdate: (id: string, data: Partial<Article>) => void
  onDelete: (id: string) => void
  isEditing: boolean
  onEditToggle: () => void
}) {
  const [editData, setEditData] = useState(article)

  return (
    <div className="p-4">
      <div className="flex items-center gap-4">
        <div className="w-4 text-center text-muted-foreground text-sm">{article.order}</div>
        <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
          <Image src={article.image} alt={article.title} width={64} height={48} className="object-cover w-full h-full" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground truncate">{article.titleTh}</p>
          <p className="text-sm text-muted-foreground truncate">{article.title}</p>
        </div>
        <div className={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          article.tier === "free" ? "bg-green-100 text-green-700" :
          article.tier === "member" ? "bg-blue-100 text-blue-700" :
          "bg-amber-100 text-amber-700"
        )}>
          {article.tier}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onUpdate(article.id, { published: !article.published })}
        >
          {article.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </Button>
        <Button variant="ghost" size="sm" onClick={onEditToggle}>
          <Pencil className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-red-500" onClick={() => onDelete(article.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-border grid gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={editData.titleTh}
                  onChange={(e) => setEditData({ ...editData, titleTh: e.target.value })}
                  placeholder="ชื่อบทความ (ไทย)"
                  className="px-4 py-2 rounded-lg border border-border"
                />
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  placeholder="Title (English)"
                  className="px-4 py-2 rounded-lg border border-border"
                />
              </div>
              <textarea
                value={editData.excerpt}
                onChange={(e) => setEditData({ ...editData, excerpt: e.target.value })}
                placeholder="คำอธิบายสั้นๆ"
                rows={2}
                className="px-4 py-2 rounded-lg border border-border"
              />
              <div className="flex gap-4">
                <select
                  value={editData.tier}
                  onChange={(e) => setEditData({ ...editData, tier: e.target.value as Article["tier"] })}
                  className="px-4 py-2 rounded-lg border border-border"
                >
                  <option value="free">Free</option>
                  <option value="member">Member</option>
                  <option value="premium">Premium</option>
                </select>
                <input
                  type="number"
                  value={editData.order}
                  onChange={(e) => setEditData({ ...editData, order: parseInt(e.target.value) })}
                  placeholder="ลำดับ"
                  className="w-24 px-4 py-2 rounded-lg border border-border"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onEditToggle}>ยกเลิก</Button>
                <Button onClick={() => { onUpdate(article.id, editData); onEditToggle(); }}>
                  <Save className="w-4 h-4 mr-2" />
                  บันทึก
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Course Row Component
function CourseRow({ course, onUpdate, onDelete, isEditing, onEditToggle }: {
  course: Course
  onUpdate: (id: string, data: Partial<Course>) => void
  onDelete: (id: string) => void
  isEditing: boolean
  onEditToggle: () => void
}) {
  const [editData, setEditData] = useState(course)

  return (
    <div className="p-4">
      <div className="flex items-center gap-4">
        <div className="w-4 text-center text-muted-foreground text-sm">{course.order}</div>
        <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
          <Image src={course.image} alt={course.title} width={64} height={48} className="object-cover w-full h-full" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground truncate">{course.titleTh}</p>
          <p className="text-sm text-muted-foreground">{course.lessons} บทเรียน - {course.duration}</p>
        </div>
        <div className={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          course.tier === "free" ? "bg-green-100 text-green-700" :
          course.tier === "member" ? "bg-blue-100 text-blue-700" :
          "bg-amber-100 text-amber-700"
        )}>
          {course.tier}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onUpdate(course.id, { published: !course.published })}
        >
          {course.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </Button>
        <Button variant="ghost" size="sm" onClick={onEditToggle}>
          <Pencil className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-red-500" onClick={() => onDelete(course.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-border grid gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={editData.titleTh}
                  onChange={(e) => setEditData({ ...editData, titleTh: e.target.value })}
                  placeholder="ชื่อคอร์ส (ไทย)"
                  className="px-4 py-2 rounded-lg border border-border"
                />
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  placeholder="Title (English)"
                  className="px-4 py-2 rounded-lg border border-border"
                />
              </div>
              <textarea
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                placeholder="คำอธิบาย"
                rows={2}
                className="px-4 py-2 rounded-lg border border-border"
              />
              <div className="flex gap-4">
                <select
                  value={editData.tier}
                  onChange={(e) => setEditData({ ...editData, tier: e.target.value as Course["tier"] })}
                  className="px-4 py-2 rounded-lg border border-border"
                >
                  <option value="free">Free</option>
                  <option value="member">Member</option>
                  <option value="premium">Premium</option>
                </select>
                <input
                  type="number"
                  value={editData.lessons}
                  onChange={(e) => setEditData({ ...editData, lessons: parseInt(e.target.value) })}
                  placeholder="จำนวนบทเรียน"
                  className="w-32 px-4 py-2 rounded-lg border border-border"
                />
                <input
                  type="number"
                  value={editData.order}
                  onChange={(e) => setEditData({ ...editData, order: parseInt(e.target.value) })}
                  placeholder="ลำดับ"
                  className="w-24 px-4 py-2 rounded-lg border border-border"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onEditToggle}>ยกเลิก</Button>
                <Button onClick={() => { onUpdate(course.id, editData); onEditToggle(); }}>
                  <Save className="w-4 h-4 mr-2" />
                  บันทึก
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Partner Row Component
function PartnerRow({ partner, index, total, onUpdate, onDelete, onMoveUp, onMoveDown }: {
  partner: Partner
  index: number
  total: number
  onUpdate: (id: string, data: Partial<Partner>) => void
  onDelete: (id: string) => void
  onMoveUp: () => void
  onMoveDown: () => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(partner.name)
  const [editInitials, setEditInitials] = useState(partner.initials)

  return (
    <div className="p-4 flex items-center gap-4">
      <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold">
        {partner.initials}
      </div>
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border border-border"
          />
          <input
            type="text"
            value={editInitials}
            onChange={(e) => setEditInitials(e.target.value.toUpperCase().slice(0, 2))}
            maxLength={2}
            className="w-16 px-3 py-2 rounded-lg border border-border text-center"
          />
        </div>
      ) : (
        <div className="flex-1">
          <p className="font-semibold text-foreground">{partner.name}</p>
        </div>
      )}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={onMoveUp} disabled={index === 0}>
          <ArrowUp className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onMoveDown} disabled={index === total - 1}>
          <ArrowDown className="w-4 h-4" />
        </Button>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onUpdate(partner.id, { active: !partner.active })}
      >
        {partner.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
      </Button>
      {isEditing ? (
        <>
          <Button size="sm" onClick={() => { onUpdate(partner.id, { name: editName, initials: editInitials }); setIsEditing(false); }}>
            <Save className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
            <X className="w-4 h-4" />
          </Button>
        </>
      ) : (
        <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
          <Pencil className="w-4 h-4" />
        </Button>
      )}
      <Button variant="ghost" size="sm" className="text-red-500" onClick={() => onDelete(partner.id)}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}

// Add Modal Component
function AddModal({ type, onClose, onAddArticle, onAddCourse, onAddPartner, articleCount, courseCount, partnerCount }: {
  type: "article" | "course" | "partner" | null
  onClose: () => void
  onAddArticle: (article: Omit<Article, "id">) => void
  onAddCourse: (course: Omit<Course, "id">) => void
  onAddPartner: (partner: Omit<Partner, "id">) => void
  articleCount: number
  courseCount: number
  partnerCount: number
}) {
  const [formData, setFormData] = useState<Record<string, string | number | boolean>>({})

  if (!type) return null

  const handleSubmit = () => {
    if (type === "article") {
      onAddArticle({
        title: formData.title as string || "New Article",
        titleTh: formData.titleTh as string || "บทความใหม่",
        excerpt: formData.excerpt as string || "",
        content: "",
        category: "general",
        image: "/images/article-business.jpg",
        tier: (formData.tier as "free" | "member" | "premium") || "free",
        author: "Admin",
        date: new Date().toISOString().split("T")[0],
        readTime: "5 นาที",
        order: articleCount + 1,
        published: true,
      })
    } else if (type === "course") {
      onAddCourse({
        title: formData.title as string || "New Course",
        titleTh: formData.titleTh as string || "คอร์สใหม่",
        description: formData.description as string || "",
        image: "/images/course-business.jpg",
        instructor: "Admin",
        duration: "2 ชั่วโมง",
        lessons: parseInt(formData.lessons as string) || 5,
        tier: (formData.tier as "free" | "member" | "premium") || "free",
        category: "general",
        order: courseCount + 1,
        published: true,
      })
    } else if (type === "partner") {
      const name = formData.name as string || "New Partner"
      onAddPartner({
        name,
        initials: name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2),
        order: partnerCount + 1,
        active: true,
      })
    }
    onClose()
    setFormData({})
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl p-6 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-xl font-bold text-foreground mb-4">
            {type === "article" && "เพิ่มบทความใหม่"}
            {type === "course" && "เพิ่มคอร์สใหม่"}
            {type === "partner" && "เพิ่มพาร์���เนอร์"}
          </h3>

          <div className="space-y-4">
            {type === "partner" ? (
              <input
                type="text"
                placeholder="ชื่อพาร์ทเนอร์"
                value={formData.name as string || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border"
              />
            ) : (
              <>
                <input
                  type="text"
                  placeholder="ชื่อ (ไทย)"
                  value={formData.titleTh as string || ""}
                  onChange={(e) => setFormData({ ...formData, titleTh: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border"
                />
                <input
                  type="text"
                  placeholder="Title (English)"
                  value={formData.title as string || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border"
                />
                <textarea
                  placeholder={type === "article" ? "คำอธิบายสั้นๆ" : "คำอธิบาย"}
                  value={(type === "article" ? formData.excerpt : formData.description) as string || ""}
                  onChange={(e) => setFormData({ ...formData, [type === "article" ? "excerpt" : "description"]: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-border"
                />
                <select
                  value={formData.tier as string || "free"}
                  onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border"
                >
                  <option value="free">Free - ฟรี</option>
                  <option value="member">Member - สมาชิก</option>
                  <option value="premium">Premium - พรีเมียม</option>
                </select>
              </>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={onClose}>ยกเลิก</Button>
            <Button onClick={handleSubmit}>
              <Plus className="w-4 h-4 mr-2" />
              เพิ่ม
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
