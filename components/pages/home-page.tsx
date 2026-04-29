"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { 
  ArrowRight, 
  Calculator, 
  HardHat, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  Facebook,
  Play,
  Sparkles,
  Clock // เพิ่มไอคอนนาฬิกาสำหรับ Coming soon
} from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    title: "บริการบัญชี",
    titleEn: "Accounting Services",
    description: "บริการรับทำบัญชีครบวงจร ยื่นภาษี วางระบบบัญชี ปิดงบการเงิน ด้วยทีมงานผู้เชี่ยวชาญที่พร้อมดูแลธุรกิจของคุณอย่างมืออาชีพ",
    icon: Calculator,
    image: "/images/hero-accounting.jpg",
    features: ["ทำบัญชีรายเดือน/รายปี", "ยื่นภาษี VAT, WHT, PND", "วางระบบบัญชี", "ปิดงบการเงินประจำปี", "จดทะเบียนบริษัท"],
    color: "from-sky-400 to-blue-600",
    shadowColor: "shadow-sky-500/20",
    status: "ready" // สถานะพร้อมใช้งาน
  },
  {
    title: "บริการวิศวกรรม",
    titleEn: "Engineering Services",
    description: "รับตรวจบ้านและคอนโดก่อนโอนกรรมสิทธิ์",
    icon: HardHat,
    image: "/images/hero-engineering.jpg",
    features: ["รับตรวจบ้านและคอนโดก่อนโอนกรรมสิทธิ์"],
    color: "from-amber-400 to-orange-600",
    shadowColor: "shadow-amber-500/20",
    status: "coming_soon" // สถานะยังไม่พร้อมใช้งาน
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/bg-pattern.jpg" 
            alt="" 
            fill 
            className="object-cover opacity-10" 
          />
        </div>
        
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" 
          />
          <motion.div 
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 left-[5%] w-[400px] h-[400px] bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-3xl" 
          />
        </div>
        
        <div className="relative px-6 py-20 w-full max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-10"
            >
              <Sparkles className="w-4 h-4" />
              ยินดีต้อนรับสู่ SCOPE SOLUTIONS
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 150 }}
              className="flex justify-center mb-10"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-[2rem] blur-2xl opacity-30 scale-110" />
                <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-[2rem] overflow-hidden shadow-2xl ring-4 ring-white/50 dark:ring-white/10">
                  <Image 
                    src="/logo.png" 
                    alt="SCOPE SOLUTIONS" 
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight"
            >
              <span className="block mb-2">ครบเครื่องเรื่อง</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-primary to-blue-600">บัญชี</span>
              {" "}และ{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-red-500">วิศวกรรม</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              เราให้บริการด้านบัญชีและวิศวกรรมครบวงจร ด้วยทีมงานมืออาชีพที่พร้อมดูแลธุรกิจของคุณ
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="rounded-full px-10 h-16 text-lg shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 transition-all duration-300">
                ปรึกษาเบื้องต้นฟรี
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-10 h-16 text-lg group border-2 hover:bg-muted">
                <Play className="mr-2 w-5 h-5 group-hover:scale-125 transition-transform" />
                ดูวิดีโอแนะนำ
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Our Services</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">บริการของเรา</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              เราพร้อมให้บริการครบวงจรทั้งด้านบัญชี และวิศวกรรม
            </p>
          </motion.div>

          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                whileHover={service.status === "ready" ? { y: -12 } : {}}
                className={`group bg-card rounded-[2rem] overflow-hidden border border-border ${service.status === "ready" ? 'hover:border-primary/40 shadow-xl hover:shadow-2xl' : 'opacity-90 shadow-md'} ${service.shadowColor} transition-all duration-500`}
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className={`object-cover ${service.status === "ready" ? 'group-hover:scale-110' : ''} transition-transform duration-700`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.color} ${service.status === "ready" ? 'opacity-70 group-hover:opacity-80' : 'opacity-80 grayscale-[30%]'} transition-all`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-3xl bg-white/25 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <service.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  
                  {/* ป้ายกำกับสำหรับบริการที่ยังไม่พร้อม */}
                  {service.status === "coming_soon" && (
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      เร็วๆ นี้
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{service.titleEn}</p>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-foreground font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* แยกปุ่มกดตามสถานะ */}
                  {service.status === "ready" ? (
                    <Button className="w-full rounded-2xl h-14 text-base font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      ดูรายละเอียด
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  ) : (
                    <Button disabled variant="secondary" className="w-full rounded-2xl h-14 text-base font-semibold cursor-not-allowed opacity-70">
                      เร็วๆ นี้ (Coming Soon)
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary to-accent p-12 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">พร้อมเริ่มต้นกับเราหรือยัง?</h2>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button size="lg" variant="secondary" className="rounded-full px-10 h-16 text-lg font-semibold">
                <Phone className="mr-3 w-6 h-6" />
                โทร 093-556-0076
              </Button>
              <Button size="lg" className="rounded-full px-10 h-16 text-lg font-semibold bg-white/20 text-white border-white/30">
                <MessageCircle className="mr-3 w-6 h-6" />
                Line: @Scopesolutions
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="px-6 py-20 bg-muted/30 text-center">
        <h2 className="text-4xl font-bold mb-16">ติดต่อเรา</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <a href="tel:0935560076" className="bg-card p-8 rounded-3xl border border-border hover:shadow-xl transition-all">
            <Phone className="w-8 h-8 text-green-500 mx-auto mb-4" />
            <p className="font-bold">093-556-0076</p>
          </a>
          <a href="https://lin.ee/WnV3iEh" className="bg-card p-8 rounded-3xl border border-border hover:shadow-xl transition-all">
            <MessageCircle className="w-8 h-8 text-emerald-500 mx-auto mb-4" />
            <p className="font-bold">@Scopesolutions</p>
          </a>
          <a href="https://www.facebook.com/SCOPESOLUTIONSCOMPANYLIMITED" className="bg-card p-8 rounded-3xl border border-border hover:shadow-xl transition-all">
            <Facebook className="w-8 h-8 text-blue-500 mx-auto mb-4" />
            <p className="font-bold">SCOPE SOLUTIONS</p>
          </a>
        </div>
      </section>

      <footer className="px-6 py-10 border-t border-border text-center">
        <p className="text-muted-foreground">© SCOPE SOLUTIONS CO., LTD. All rights reserved.</p>
      </footer>
    </div>
  )
}