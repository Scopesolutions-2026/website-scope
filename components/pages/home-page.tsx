"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { 
  ArrowRight, 
  Calculator, 
  HardHat, 
  FileText, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  MapPin,
  Facebook,
  Star,
  Users,
  Award,
  Clock,
  Play,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"

const partners = [
  { name: "AY38 FACTORY", initials: "AY" },
  { name: "STARTECH THAILAND", initials: "ST" },
  { name: "EVOLUTIONS GAMETECH", initials: "EG" },
  { name: "LIKEDEE.COM", initials: "LD" },
  { name: "PROJECT MOST COPYCENTER", initials: "PM" },
  { name: "RICHCRAFT FIVEM", initials: "RC" },
]

const services = [
  {
    title: "บริการบัญชี",
    titleEn: "Accounting Services",
    description: "บริการรับทำบัญชีครบวงจร ยื่นภาษี วางระบบบัญชี ปิดงบการเงิน ด้วยทีมงานผู้เชี่ยวชาญที่พร้อมดูแลธุรกิจของคุณอย่างมืออาชีพ",
    icon: Calculator,
    image: "/images/hero-accounting.jpg",
    features: ["ทำบัญชีรายเดือน/รายปี", "ยื่นภาษี VAT, WHT, PND", "วางระบบบัญชี", "ปิดงบการเงินประจำปี", "จดทะเบียนบริษัท"],
    color: "from-sky-400 to-blue-600",
    shadowColor: "shadow-sky-500/20"
  },
  {
    title: "บริการวิศวกรรม",
    titleEn: "Engineering Services",
    description: "รับออกแบบโครงสร้าง ควบคุมงานก่อสร้าง เซ็นต์แบบวิศวกร ประมาณราคา BOQ พร้อมทีมวิศวกรผู้เชี่ยวชาญ",
    icon: HardHat,
    image: "/images/hero-engineering.jpg",
    features: ["ออกแบบโครงสร้างอาคาร", "ควบคุมงานก่อสร้าง", "เซ็นต์แบบ วศ.", "ประมาณราคา BOQ", "เขียนแบบก่อสร้าง"],
    color: "from-amber-400 to-orange-600",
    shadowColor: "shadow-amber-500/20"
  },
  {
    title: "บริการเอกสาร",
    titleEn: "Document Services",
    description: "จัดทำเอกสารธุรกิจครบวงจร ใบแจ้งหนี้ ใบเสนอราคา ใบเสร็จรับเงิน สัญญาต่างๆ พร้อมเครื่องมือออนไลน์ฟรี",
    icon: FileText,
    image: "/images/course-documents.jpg",
    features: ["ใบเสนอราคา", "ใบแจ้งหนี้/ใบเสร็จ", "สัญญาจ้างงาน", "หนังสือรับรอง", "เอกสารทางการ"],
    color: "from-emerald-400 to-teal-600",
    shadowColor: "shadow-emerald-500/20"
  },
]

const stats = [
  { value: "500+", label: "ลูกค้าที่ไว้วางใจ", icon: Users },
  { value: "10+", label: "ปีประสบการณ์", icon: Award },
  { value: "24/7", label: "พร้อมให้บริการ", icon: Clock },
  { value: "4.9", label: "คะแนนรีวิว", icon: Star },
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
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="/images/bg-pattern.jpg" 
            alt="" 
            fill 
            className="object-cover opacity-10" 
          />
        </div>
        
        {/* Animated background */}
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
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-10"
            >
              <Sparkles className="w-4 h-4" />
              ยินดีต้อนรับสู่ SCOPE SOLUTIONS
            </motion.div>

            {/* Logo */}
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
              เราให้บริการด้านบัญชีและวิศวกรรมครบวงจร ด้วยทีมงานมืออาชีพที่พร้อมดูแลธุรกิจของคุณ พร้อมเครื่องมือออนไลน์ฟรีกว่า 50 รายการ
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="rounded-full px-10 h-16 text-lg shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 transition-all duration-300">
                เริ่มต้นใช้งานฟรี
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-10 h-16 text-lg group border-2 hover:bg-muted">
                <Play className="mr-2 w-5 h-5 group-hover:scale-125 transition-transform" />
                ดูวิดีโอแนะนำ
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
            >
              <div className="w-1.5 h-3 rounded-full bg-muted-foreground/50" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20 bg-muted/30">
        <motion.div 
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-card rounded-3xl p-8 border border-border shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-500 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="text-4xl lg:text-5xl font-bold text-foreground mb-2">{stat.value}</p>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Partners Section - Animated Marquee */}
      <section className="py-16 border-y border-border overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Trusted Partners</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">ลูกค้าที่ไว้วางใจเรา</h2>
          </motion.div>
        </div>
        
        <div className="relative overflow-hidden">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-background to-transparent z-10" />
          
          {/* Seamless infinite scroll using CSS animation */}
          <div className="flex animate-marquee">
            {/* First set */}
            <div className="flex gap-4 sm:gap-8 shrink-0">
              {[...partners, ...partners].map((partner, index) => (
                <div 
                  key={`first-${index}`}
                  className="flex-shrink-0 flex items-center gap-3 sm:gap-5 bg-card px-4 sm:px-8 py-4 sm:py-6 rounded-xl sm:rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-sm sm:text-xl font-bold text-white">{partner.initials}</span>
                  </div>
                  <span className="font-bold text-foreground whitespace-nowrap text-sm sm:text-lg">{partner.name}</span>
                </div>
              ))}
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="flex gap-4 sm:gap-8 shrink-0 ml-4 sm:ml-8">
              {[...partners, ...partners].map((partner, index) => (
                <div 
                  key={`second-${index}`}
                  className="flex-shrink-0 flex items-center gap-3 sm:gap-5 bg-card px-4 sm:px-8 py-4 sm:py-6 rounded-xl sm:rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-sm sm:text-xl font-bold text-white">{partner.initials}</span>
                  </div>
                  <span className="font-bold text-foreground whitespace-nowrap text-sm sm:text-lg">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-24">
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
              เราพร้อมให้บริการครบวงจรทั้งด้านบัญชี ว��ศวกรรม และ��ัดทำเอกสารธุรกิจ
            </p>
          </motion.div>

          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                whileHover={{ y: -12 }}
                className={`group bg-card rounded-[2rem] overflow-hidden border border-border hover:border-primary/40 shadow-xl ${service.shadowColor} hover:shadow-2xl transition-all duration-500`}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-70 group-hover:opacity-80 transition-opacity`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-20 h-20 rounded-3xl bg-white/25 backdrop-blur-sm flex items-center justify-center border border-white/30"
                    >
                      <service.icon className="w-10 h-10 text-white" />
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
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

                  <Button className="w-full rounded-2xl h-14 text-base font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    ดูรายละเอียด
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="px-6 py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <Image src="/images/bg-pattern.jpg" alt="" fill className="object-cover" />
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Our Leadership</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">ทีมผู้บริหาร</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">ทีมงานมืออาชีพพร้อมให้บริการด้านบัญชีและวิศวกรรม</p>
          </motion.div>
          
          {/* Team Grid - 3 Members */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* CEO */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="group"
            >
              <div className="relative bg-card rounded-3xl overflow-hidden shadow-xl border border-border hover:shadow-2xl transition-all duration-500">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image src="/images/ceo-ribeer.jpg" alt="คุณเบียร์ - CEO" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-sm font-medium text-sky-300 mb-1">Owner & CEO</p>
                    <h3 className="text-2xl font-bold">คุณเบียร์</h3>
                    <p className="text-sm text-white/80">Ribeer ScopeSolutions</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground text-sm leading-relaxed">ผู้เชี่ยวชาญด้านบัญชีและภาษีครบวงจร Professional Accounting ที่ปรึกษาการเงินและบัญชีสำหรับธุรกิจ SME</p>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Accounting</div>
                    <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Tax</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Engineer 1 - Benz */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group"
            >
              <div className="relative bg-card rounded-3xl overflow-hidden shadow-xl border border-border hover:shadow-2xl transition-all duration-500">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image src="/images/engineer-benz.png" alt="คุณเบนซ์ - วิศวกรโยธา" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-sm font-medium text-amber-300 mb-1">Civil Engineer</p>
                    <h3 className="text-2xl font-bold">คุณเบนซ์</h3>
                    <p className="text-sm text-white/80">วิศวกรโยธา</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground text-sm leading-relaxed">วิศวกรโยธา ใบ กว. ออกแบบโครงสร้างตามหลักวิศวกรรม ควบคุมงานก่อสร้างอย่างมืออาชีพ</p>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-medium">ใบ กว.</div>
                    <div className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-medium">Design</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Engineer 2 - Nut */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group"
            >
              <div className="relative bg-card rounded-3xl overflow-hidden shadow-xl border border-border hover:shadow-2xl transition-all duration-500">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image src="/images/engineer-nut.png" alt="คุณนัท - วิศวกรโยธา" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-sm font-medium text-emerald-300 mb-1">Civil Engineer</p>
                    <h3 className="text-2xl font-bold">คุณนัท</h3>
                    <p className="text-sm text-white/80">วิศวกรโยธา</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground text-sm leading-relaxed">วิศวกรโยธา ใบ กว. เชี่ยวชาญการออกแบบและประมาณราคางานก่อสร้างอย่างแม่นยำ</p>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-medium">ใบ กว.</div>
                    <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-medium">BOQ</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center gap-4 mt-12"
          >
            <Button size="lg" className="rounded-full px-8 h-14">
              <MessageCircle className="mr-2 w-5 h-5" />
              ติดต่อปรึกษา
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14">
              <Facebook className="mr-2 w-5 h-5" />
              Facebook
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-primary to-accent p-12 lg:p-20">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
            
            {/* Floating shapes */}
            <motion.div 
              animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-20 right-20 w-16 h-16 bg-white/20 rounded-2xl"
            />
            <motion.div 
              animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
              transition={{ duration: 7, repeat: Infinity }}
              className="absolute bottom-20 left-32 w-12 h-12 bg-white/15 rounded-full"
            />
            
            <div className="relative text-center">
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                พร้อมเริ่มต้นกับเราหรือยัง?
              </h2>
              <p className="text-white/80 text-lg lg:text-xl mb-10 max-w-2xl mx-auto">
                ติดต่อเราว���นนี้เพื่อรับคำปรึกษาฟรี ทีมงานพร้อมให้บริการคุณตลอด 24 ชั่วโมง
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Button size="lg" variant="secondary" className="rounded-full px-10 h-16 text-lg font-semibold shadow-xl hover:scale-105 transition-transform">
                  <Phone className="mr-3 w-6 h-6" />
                  โทร 093-556-0076
                </Button>
                <Button size="lg" className="rounded-full px-10 h-16 text-lg font-semibold bg-white/20 border-2 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm">
                  <MessageCircle className="mr-3 w-6 h-6" />
                  Line: @Scopesolutions
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="px-6 py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Contact Us</p>
            <h2 className="text-4xl font-bold text-foreground">ติดต่อเรา</h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <motion.a
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              href="tel:0935560076"
              className="flex flex-col items-center gap-4 bg-card p-8 rounded-3xl border border-border hover:border-green-500/50 hover:shadow-xl transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 group-hover:scale-110 transition-all">
                <Phone className="w-8 h-8 text-green-500" />
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">โทรศัพท์</p>
                <p className="font-bold text-foreground text-lg">093-556-0076</p>
                <p className="text-xs text-muted-foreground">(คุณเบียร์)</p>
              </div>
            </motion.a>

            <motion.a
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              href="https://lin.ee/WnV3iEh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 bg-card p-8 rounded-3xl border border-border hover:border-emerald-500/50 hover:shadow-xl transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:scale-110 transition-all">
                <MessageCircle className="w-8 h-8 text-emerald-500" />
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Line Official</p>
                <p className="font-bold text-foreground text-lg">@Scopesolutions</p>
              </div>
            </motion.a>

            <motion.a
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              href="https://www.facebook.com/SCOPESOLUTIONSCOMPANYLIMITED"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 bg-card p-8 rounded-3xl border border-border hover:border-blue-500/50 hover:shadow-xl transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:scale-110 transition-all">
                <Facebook className="w-8 h-8 text-blue-500" />
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Facebook</p>
                <p className="font-bold text-foreground text-lg">SCOPE SOLUTIONS</p>
              </div>
            </motion.a>

            <motion.a
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              href="https://maps.app.goo.gl/NV8rf598ejpThQ8ZA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 bg-card p-8 rounded-3xl border border-border hover:border-rose-500/50 hover:shadow-xl transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-rose-500/10 flex items-center justify-center group-hover:bg-rose-500/20 group-hover:scale-110 transition-all">
                <MapPin className="w-8 h-8 text-rose-500" />
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">ที่ตั้งสำนักงาน</p>
                <p className="font-bold text-foreground text-lg">ขอนแก่น</p>
              </div>
            </motion.a>
          </motion.div>

          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-card px-8 py-6 rounded-2xl border border-border">
              <p className="text-muted-foreground mb-2">
                29/127 โครงการไอคอนวิลล่า 10 หมู่ 17 ตำบลบ้านเป็ด อำเภอเมือง ขอนแก่น 40000
              </p>
              <a 
                href="https://www.scopesolutions.co.th" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
              >
                www.scopesolutions.co.th
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            SCOPE SOLUTIONS CO., LTD. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
