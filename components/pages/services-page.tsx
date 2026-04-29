"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { 
  Calculator, FileText, BarChart3, Users, ClipboardCheck, Briefcase,
  Ruler, Building, FileSpreadsheet, PenTool, CheckCircle2, ArrowRight,
  Star, Zap, Clock, Shield, Phone, MessageCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"

type ServiceTab = "accounting" | "engineering"

const accountingServices = [
  {
    icon: Calculator,
    title: "รับทำบัญชี",
    titleEn: "Bookkeeping",
    desc: "บริการรับทำบัญชีรายเดือน รายปี ตามมาตรฐานการบัญชี",
    features: ["บันทึกบัญชีรายวัน", "จัดทำงบการเงิน", "กระทบยอดบัญชี", "จัดทำรายงานภาษี"],
    price: "เริ่มต้น 3,000 บาท/เดือน"
  },
  {
    icon: FileText,
    title: "วางระบบบัญชี",
    titleEn: "Accounting System",
    desc: "ออกแบบและวางระบบบัญชีให้เหมาะสมกับธุรกิจของคุณ",
    features: ["วิเคราะห์ความต้องการ", "ออกแบบผังบัญชี", "จัดทำคู่มือปฏิบัติงาน", "อบรมพนักงาน"],
    price: "เริ่มต้น 15,000 บาท"
  },
  {
    icon: BarChart3,
    title: "ที่ปรึกษาภาษี",
    titleEn: "Tax Consulting",
    desc: "ให้คำปรึกษาด้านภาษีและการวางแผนภาษี",
    features: ["วางแผนภาษี", "ตรวจสอบความถูกต้อง", "ยื่นภาษี", "ประสานงานสรรพากร"],
    price: "เริ่มต้น 5,000 บาท/ครั้ง"
  },
  {
    icon: Users,
    title: "บริการเงินเดือน",
    titleEn: "Payroll Services",
    desc: "คำนวณเงินเดือนและจัดการสวัสดิการพนักงาน",
    features: ["คำนวณเงินเดือน", "หักภาษี ณ ที่จ่าย", "ประกันสังคม", "จัดทำ ภ.ง.ด.1"],
    price: "เริ่มต้น 100 บาท/คน"
  },
  {
    icon: ClipboardCheck,
    title: "ตรวจสอบบัญชี",
    titleEn: "Auditing",
    desc: "บริการตรวจสอบบัญชีโดยผู้สอบบัญชีรับอนุญาต",
    features: ["ตรวจสอบงบการเงิน", "ประเมินระบบควบคุม", "รายงานตรวจสอบ", "ข้อเสนอแนะ"],
    price: "เริ่มต้น 20,000 บาท"
  },
  {
    icon: Briefcase,
    title: "จดทะเบียนธุรกิจ",
    titleEn: "Business Registration",
    desc: "บริการจดทะเบียนบริษัท ห้างหุ้นส่วน และธุรกิจทุกประเภท",
    features: ["จดทะเบียนบริษัท", "จดทะเบียน VAT", "ขอใบอนุญาต", "จดเครื่องหมายการค้า"],
    price: "เริ่มต้น 8,000 บาท"
  },
]

const engineeringServices = [
  {
    icon: Ruler,
    title: "ออกแบบโครงสร้าง",
    titleEn: "Structural Design",
    desc: "ออกแบบโครงสร้างอาคาร โรงงาน และสิ่งปลูกสร้างทุกประเภท",
    features: ["คำนวณโครงสร้าง", "เขียนแบบก่อสร้าง", "ประมาณราคา", "ควบคุมงาน"],
    price: "เริ่มต้น 50 บาท/ตร.ม."
  },
  {
    icon: Building,
    title: "ควบคุมงานก่อสร้าง",
    titleEn: "Construction Management",
    desc: "บริการควบคุมและตรวจสอบงานก่อสร้างให้ได้มาตรฐาน",
    features: ["ตรวจสอบคุณภาพ", "ควบคุมเวลา", "จัดการงบประมาณ", "รายงานความคืบหน้า"],
    price: "เริ่มต้น 3% ของมูลค่างาน"
  },
  {
    icon: FileSpreadsheet,
    title: "ประมาณราคา BOQ",
    titleEn: "Cost Estimation",
    desc: "จัดทำ BOQ และประมาณราคาก่อสร้างอย่างละเอียด",
    features: ["ถอดแบบวัสดุ", "ประเมินค่าแรง", "เปรียบเทียบราคา", "ปรับปรุงรายการ"],
    price: "เริ่มต้น 5,000 บาท"
  },
  {
    icon: PenTool,
    title: "ออกแบบสถาปัตย์",
    titleEn: "Architectural Design",
    desc: "ออกแบบสถาปัตยกรรมบ้านและอาคารตามความต้องการ",
    features: ["ออกแบบ Concept", "เขียนแบบ 3D", "แบบก่อสร้าง", "Interior Design"],
    price: "เริ่มต้น 80 บาท/ตร.ม."
  },
  {
    icon: ClipboardCheck,
    title: "ตรวจสอบอาคาร",
    titleEn: "Building Inspection",
    desc: "ตรวจสอบความปลอดภัยและสภาพอาคารประจำปี",
    features: ["ตรวจโครงสร้าง", "ระบบไฟฟ้า", "ระบบดับเพลิง", "ออกใบรับรอง"],
    price: "เริ่มต้น 10,000 บาท"
  },
  {
    icon: Briefcase,
    title: "ขออนุญาตก่อสร้าง",
    titleEn: "Building Permit",
    desc: "ดำเนินการขออนุญาตก่อสร้างกับหน่วยงานราชการ",
    features: ["เตรียมเอกสาร", "ยื่นคำขอ", "ประสานงาน", "ติดตามผล"],
    price: "เริ่มต้น 15,000 บาท"
  },
]

const whyChooseUs = [
  { icon: Star, title: "มืออาชีพ", desc: "ทีมงานผู้เชี่ยวชาญ 10+ ปี" },
  { icon: Zap, title: "รวดเร็ว", desc: "ดำเนินการรวดเร็วทันใจ" },
  { icon: Clock, title: "ตรงเวลา", desc: "ส่งมอบงานตามกำหนด" },
  { icon: Shield, title: "มั่นใจได้", desc: "รับประกันคุณภาพงาน" },
]

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<ServiceTab>("accounting")
  const services = activeTab === "accounting" ? accountingServices : engineeringServices

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100" />
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-40 left-20 w-72 h-72 bg-gradient-to-r from-sky-200/50 to-blue-200/50 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-orange-200/40 to-amber-200/40 rounded-full blur-3xl"
        />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-sky-200 mb-6"
            >
              <Briefcase className="w-4 h-4 text-sky-500" />
              <span className="text-sm font-semibold text-sky-600">Our Services</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              บริการของเรา
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
              บริการครบวงจรด้านบัญชีและวิศวกรรม โดยทีมงานมืออาชีพ
              พร้อมให้คำปรึกษาและดูแลธุรกิจของคุณ
            </p>

            {/* Tab Switcher */}
            <div className="inline-flex p-2 bg-white rounded-2xl shadow-lg border border-slate-100">
              <motion.button
                onClick={() => setActiveTab("accounting")}
                whileTap={{ scale: 0.95 }}
                className={`relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === "accounting" ? "text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeTab === "accounting" && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  บริการบัญชี
                </span>
              </motion.button>
              
              <motion.button
                onClick={() => setActiveTab("engineering")}
                whileTap={{ scale: 0.95 }}
                className={`relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === "engineering" ? "text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeTab === "engineering" && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Ruler className="w-5 h-5" />
                  บริการวิศวกรรม
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Image */}
      <section className="px-6 -mt-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="aspect-[21/9] relative">
              <Image
                src={activeTab === "accounting" ? "/images/services-accounting.jpg" : "/images/services-engineering.jpg"}
                alt={activeTab === "accounting" ? "Accounting Services" : "Engineering Services"}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <p className="text-white text-2xl md:text-3xl font-bold mb-2">
                  {activeTab === "accounting" ? "บริการบัญชีครบวงจร" : "บริการวิศวกรรมมืออาชีพ"}
                </p>
                <p className="text-white/80 text-sm md:text-base">
                  {activeTab === "accounting" 
                    ? "Professional Accounting Services" 
                    : "Professional Engineering Services"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${
                      activeTab === "accounting" 
                        ? "from-sky-400 to-blue-500" 
                        : "from-amber-400 to-orange-500"
                    } flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-1">{service.title}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{service.titleEn}</p>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{service.desc}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-lg font-bold text-foreground">{service.price}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ทำไมต้องเลือกเรา
            </h2>
            <p className="text-lg text-muted-foreground">
              เหตุผลที่ลูกค้ากว่า 500 รายไว้วางใจเรา
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-sky-400 to-blue-500 flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"
            />
            
            <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">
              สนใจบริการของเรา?
            </h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto relative z-10">
              ติดต่อเราเพื่อรับคำปรึกษาฟรี พร้อมใบเสนอราคาภายใน 24 ชั่วโมง
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <motion.a
                href="tel:0XX-XXX-XXXX"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-sky-600 rounded-xl font-semibold shadow-lg"
              >
                <Phone className="w-5 h-5" />
                โทรหาเรา
              </motion.a>
              <motion.a
                href="https://line.me/ti/p/~scopesolutions"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Line: @scopesolutions
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom Spacing */}
      <div className="h-8" />
    </div>
  )
}
