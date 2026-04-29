"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Phone, Mail, MapPin, Clock, MessageCircle, Facebook,
  Send, CheckCircle2, Building2, Globe
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const contactMethods = [
  {
    icon: Phone,
    title: "โทรศัพท์",
    titleEn: "Phone",
    value: "093-556-0076",
    action: "tel:093-556-0076",
    color: "from-sky-400 to-blue-500",
    desc: "ติดต่อคุณเบียร์ (จันทร์-ศุกร์ 9:00-18:00)"
  },
  {
    icon: MessageCircle,
    title: "Line Official",
    titleEn: "Line OA",
    value: "@Scopesolutions",
    action: "https://lin.ee/WnV3iEh",
    color: "from-emerald-400 to-green-500",
    desc: "ตอบกลับภายใน 30 นาที"
  },
  {
    icon: Mail,
    title: "อีเมล",
    titleEn: "Email",
    value: "info@scopesolutions.co.th",
    action: "mailto:info@scopesolutions.co.th",
    color: "from-amber-400 to-orange-500",
    desc: "ตอบกลับภายใน 24 ชม."
  },
  {
    icon: Facebook,
    title: "Facebook",
    titleEn: "Facebook Page",
    value: "SCOPE Solutions",
    action: "https://www.facebook.com/SCOPESOLUTIONSCOMPANYLIMITED",
    color: "from-blue-500 to-indigo-600",
    desc: "ติดตามข่าวสารและโปรโมชั่น"
  },
]

const officeInfo = {
  address: "29/127 โครงการไอคอนวิลล่า 10 หมู่ 17 ตำบลบ้านเป็ด อำเภอเมือง ขอนแก่น 40000",
  addressEn: "29/127 Icon Villa 10 Project, Moo 17, Ban Ped, Muang, Khon Kaen 40000",
  hours: "จันทร์ - ศุกร์ 9:00 - 18:00 น.",
  hoursEn: "Mon - Fri 9:00 AM - 6:00 PM",
  mapUrl: "https://maps.app.goo.gl/NV8rf598ejpThQ8ZA"
}

const faqItems = [
  {
    q: "ราคาบริการรับทำบัญชีเริ่มต้นเท่าไหร่?",
    a: "ราคาเริ่มต้น 3,000 บาท/เดือน ขึ้นอยู่กับปริมาณเอกสารและความซับซ้อนของธุรกิจ"
  },
  {
    q: "สามารถนัดปรึกษาฟรีได้หรือไม่?",
    a: "ได้ค่ะ เราให้บริการปรึกษาฟรีครั้งแรก 30 นาที ทั้งทางโทรศัพท์และ Video Call"
  },
  {
    q: "รับทำบัญชีนอกพื้นที่กรุงเทพฯ ได้ไหม?",
    a: "ได้ค่ะ เราให้บริการทั่วประเทศ สามารถส่งเอกสารทางไปรษณีย์หรือ Scan ส่งมาได้เลย"
  },
  {
    q: "ใช้เวลานานแค่ไหนในการออกแบบโครงสร้าง?",
    a: "ขึ้นอยู่กับขนาดของโครงการ โดยทั่วไป บ้านพักอาศัย 2-3 สัปดาห์ อาคารขนาดใหญ่ 1-2 เดือน"
  },
]

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100" />
        <motion.div 
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-sky-200/50 to-blue-200/50 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute bottom-10 right-20 w-80 h-80 bg-gradient-to-r from-emerald-200/40 to-teal-200/40 rounded-full blur-3xl"
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
              <Phone className="w-4 h-4 text-sky-500" />
              <span className="text-sm font-semibold text-sky-600">Contact Us</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              ติดต่อเรา
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              พร้อมให้คำปรึกษาและตอบทุกคำถามของคุณ
              ติดต่อเราได้หลายช่องทาง ตอบกลับรวดเร็ว
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 px-6 -mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, i) => (
              <motion.a
                key={method.title}
                href={method.action}
                target={method.action.startsWith("http") ? "_blank" : undefined}
                rel={method.action.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${method.color} flex items-center justify-center mb-4 shadow-lg`}
                >
                  <method.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="font-bold text-foreground text-lg mb-1">{method.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{method.titleEn}</p>
                <p className="font-semibold text-primary mb-2">{method.value}</p>
                <p className="text-xs text-muted-foreground">{method.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-2">ส่งข้อความถึงเรา</h2>
              <p className="text-muted-foreground mb-8">กรอกแบบฟอร์มด้านล่าง เราจะติดต่อกลับภายใน 24 ชั่วโมง</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">ชื่อ-นามสกุล</label>
                    <Input 
                      placeholder="ชื่อของคุณ" 
                      className="py-6 rounded-xl"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">เบอร์โทรศัพท์</label>
                    <Input 
                      placeholder="0XX-XXX-XXXX" 
                      className="py-6 rounded-xl"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">อีเมล</label>
                  <Input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="py-6 rounded-xl"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">หัวข้อ</label>
                  <Input 
                    placeholder="เรื่องที่ต้องการติดต่อ" 
                    className="py-6 rounded-xl"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">ข้อความ</label>
                  <Textarea 
                    placeholder="รายละเอียดที่ต้องการสอบถามหรือปรึกษา..." 
                    className="min-h-[150px] rounded-xl resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  />
                </div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    type="submit" 
                    className="w-full py-6 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold text-lg shadow-lg"
                    disabled={formSubmitted}
                  >
                    {formSubmitted ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        ส่งข้อความสำเร็จ
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        ส่งข้อความ
                      </span>
                    )}
                  </Button>
                </motion.div>
              </form>
            </motion.div>

            {/* Office Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div className="relative rounded-3xl overflow-hidden h-64 bg-gradient-to-br from-slate-100 to-slate-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-sky-500 mx-auto mb-3" />
                    <p className="text-foreground font-semibold">SCOPE SOLUTIONS</p>
                    <p className="text-sm text-muted-foreground">กรุงเทพมหานคร</p>
                  </div>
                </div>
                <motion.a
                  href="https://goo.gl/maps/xxxxx"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="absolute bottom-4 right-4 px-4 py-2 bg-white rounded-xl shadow-lg text-sm font-semibold text-sky-600 flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  เปิด Google Maps
                </motion.a>
              </div>

              {/* Office Details */}
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 border border-slate-100">
                <h3 className="font-bold text-foreground text-xl mb-6 flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-sky-500" />
                  ที่อยู่สำนักงาน
                </h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-sky-500" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{officeInfo.address}</p>
                      <p className="text-sm text-muted-foreground mt-1">{officeInfo.addressEn}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{officeInfo.hours}</p>
                      <p className="text-sm text-muted-foreground mt-1">{officeInfo.hoursEn}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              คำถามที่พบบ่อย
            </h2>
            <p className="text-lg text-muted-foreground">
              คำตอบสำหรับคำถามที่ลูกค้าถามบ่อย
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
              >
                <h4 className="font-bold text-foreground mb-2 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm flex-shrink-0">
                    {i + 1}
                  </span>
                  {item.q}
                </h4>
                <p className="text-muted-foreground pl-9">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Spacing */}
      <div className="h-8" />
    </div>
  )
}
