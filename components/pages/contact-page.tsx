"use client"

import { motion } from "framer-motion"
import { 
  Phone, Mail, MapPin, Clock, MessageCircle, Facebook, Building2
} from "lucide-react"

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
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.347198803087!2d102.77199650000001!3d16.457948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x312261ca8e797a55%3A0x929778b1e4c2837f!2sScope%20Solutions%20Co.%2CLtd!5e0!3m2!1sth!2sth!4v1777455230074!5m2!1sth!2sth"
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
    q: "รับทำบัญชีนอกพื้นที่ขอนแก่นได้ไหม?",
    a: "ได้ค่ะ เราให้บริการทั่วประเทศ สามารถส่งเอกสารทางไปรษณีย์หรือ Scan ส่งมาได้เลย"
  },
]

export default function ContactPage() {
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
        
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-sky-200 mb-6">
              <Phone className="w-4 h-4 text-sky-500" />
              <span className="text-sm font-semibold text-sky-600">Contact Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              ติดต่อเรา
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              พร้อมให้คำปรึกษาและตอบทุกคำถามของคุณ ติดต่อเราได้หลายช่องทาง ตอบกลับรวดเร็ว
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods (4 กล่องช่องทางติดต่อ) */}
      <section className="py-12 px-6 -mt-8 relative z-10">
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
                className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${method.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-1">{method.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{method.titleEn}</p>
                <p className="font-semibold text-primary mb-2">{method.value}</p>
                <p className="text-xs text-muted-foreground">{method.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Office Info & Map (ปรับใหม่ให้ไม่มีฟอร์ม) */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* ด้านซ้าย: รายละเอียดที่อยู่ (ย้ายมาแทนฟอร์ม) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl">
                <h3 className="font-bold text-foreground text-2xl mb-8 flex items-center gap-3">
                  <Building2 className="w-8 h-8 text-sky-500" />
                  ที่อยู่สำนักงาน
                </h3>
                <div className="space-y-8">
                  <div className="flex gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center flex-shrink-0 shadow-inner">
                      <MapPin className="w-7 h-7 text-sky-500" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-lg leading-relaxed">{officeInfo.address}</p>
                      <p className="text-sm text-muted-foreground mt-2">{officeInfo.addressEn}</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0 shadow-inner">
                      <Clock className="w-7 h-7 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-lg leading-relaxed">{officeInfo.hours}</p>
                      <p className="text-sm text-muted-foreground mt-2">{officeInfo.hoursEn}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ด้านขวา: แผนที่ Google Maps */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative rounded-[2.5rem] overflow-hidden h-[450px] bg-slate-100 shadow-xl border border-slate-200">
                <iframe
                  src={officeInfo.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SCOPE Solutions Location"
                  className="w-full h-full"
                ></iframe>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">คำถามที่พบบ่อย</h2>
          <div className="space-y-4 text-left">
            {faqItems.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <h4 className="font-bold text-foreground mb-2 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm flex-shrink-0">{i + 1}</span>
                  {item.q}
                </h4>
                <p className="text-muted-foreground pl-9">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="h-8" />
    </div>
  )
}