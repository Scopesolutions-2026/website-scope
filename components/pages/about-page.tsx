"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { 
  Building2, Users, Award, Target, Heart, Lightbulb,
  CheckCircle2, TrendingUp, Shield, Clock
} from "lucide-react"

const teamMembers = [
  {
    name: "คุณเบียร์",
    nameEn: "Ribeer ScopeSolutions",
    role: "Owner & CEO",
    roleTh: "ผู้ก่อตั้งและประธานบริหาร",
    image: "/images/ceo-ribeer.jpg",
    initials: "RB",
    color: "from-sky-400 to-blue-500",
    description: "ผู้เชี่ยวชาญด้านบัญชีและภาษีครบวงจร Professional Accounting ที่ปรึกษาการเงินและบัญชีสำหรับธุรกิจ SME"
  },
  {
    name: "คุณเบนซ์",
    nameEn: "Khun Benz",
    role: "Civil Engineer",
    roleTh: "วิศวกรโยธา",
    image: "/images/engineer-benz.png",
    initials: "BZ",
    color: "from-amber-400 to-orange-500",
    description: "วิศวกรโยธา ใบ กว. ออกแบบโครงสร้างตามหลักวิศวกรรม ควบคุมงานก่อสร้าง"
  },
  {
    name: "คุณนัท",
    nameEn: "Khun Nut",
    role: "Civil Engineer",
    roleTh: "วิศวกรโยธา",
    image: "/images/engineer-nut.png",
    initials: "NT",
    color: "from-emerald-400 to-teal-500",
    description: "วิศวกรโยธา ใบ กว. เชี่ยวชาญการออกแบบและประมาณราคางานก่อสร้าง"
  },
]

const values = [
  { 
    icon: Heart, 
    title: "ใส่ใจลูกค้า", 
    titleEn: "Customer First",
    desc: "เราให้ความสำคัญกับความต้องการของลูกค้าเป็นอันดับแรก",
    color: "from-rose-400 to-pink-500"
  },
  { 
    icon: Shield, 
    title: "ซื่อสัตย์โปร่งใส", 
    titleEn: "Integrity",
    desc: "ทำงานด้วยความซื่อสัตย์และโปร่งใสในทุกขั้นตอน",
    color: "from-sky-400 to-blue-500"
  },
  { 
    icon: Lightbulb, 
    title: "สร้างสรรค์นวัตกรรม", 
    titleEn: "Innovation",
    desc: "พัฒนาและปรับปรุงวิธีการทำงานอยู่เสมอ",
    color: "from-amber-400 to-orange-500"
  },
  { 
    icon: TrendingUp, 
    title: "มุ่งสู่ความเป็นเลิศ", 
    titleEn: "Excellence",
    desc: "มุ่งมั่นให้บริการที่ดีที่สุดแก่ลูกค้าทุกราย",
    color: "from-emerald-400 to-teal-500"
  },
]

const milestones = [
  { year: "2558", event: "ก่อตั้งบริษัท SCOPE SOLUTIONS", eventEn: "Company Founded" },
  { year: "2560", event: "ขยายบริการด้านวิศวกรรม", eventEn: "Engineering Services Launched" },
  { year: "2562", event: "ลูกค้าครบ 100 ราย", eventEn: "100 Clients Milestone" },
  { year: "2564", event: "เปิดตัว SCOPE Academy", eventEn: "SCOPE Academy Launch" },
  { year: "2566", event: "ลูกค้าครบ 500 ราย", eventEn: "500 Clients Milestone" },
  { year: "2568", event: "เปิดตัว SCOPE Tools 2.0", eventEn: "SCOPE Tools 2.0 Launch" },
]

const stats = [
  { value: "500+", label: "ลูกค้าที่ไว้วางใจ", icon: Users },
  { value: "10+", label: "ปีประสบการณ์", icon: Clock },
  { value: "50+", label: "เครื่องมือออนไลน์", icon: Target },
  { value: "98%", label: "ความพึงพอใจ", icon: Award },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100" />
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/bg-office.jpg" alt="" fill className="object-cover" />
        </div>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-sky-200/40 to-blue-200/40 rounded-full blur-3xl"
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-sky-200 mb-6"
            >
              <Building2 className="w-4 h-4 text-sky-500" />
              <span className="text-sm font-semibold text-sky-600">About Us</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
              เกี่ยวกับ
              <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent"> SCOPE SOLUTIONS</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
              เราคือบริษัทที่ให้บริการด้านบัญชีและวิศวกรรมครบวงจร 
              พร้อมเครื่องมือออนไลน์ที่ช่วยให้การทำงานของคุณง่ายขึ้น
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-sky-100 shadow-lg shadow-sky-100/50 text-center"
              >
                <stat.icon className="w-8 h-8 text-sky-500 mx-auto mb-3" />
                <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="aspect-[21/9] relative">
              <Image
                src="/images/brand-mockup.jpg"
                alt="SCOPE SOLUTIONS Team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white text-xl md:text-2xl font-semibold">
                  ทีมงานมืออาชีพพร้อมให้บริการ
                </p>
                <p className="text-white/80 text-sm md:text-base mt-2">
                  Professional team ready to serve you
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                เรื่องราวของเรา
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  SCOPE SOLUTIONS ก่อตั้งขึ้นในปี 2558 ด้วยความมุ่งมั่นที่จะเป็นพันธมิตรทางธุรกิจ
                  ที่ช่วยให้ผู้ประกอบการไทยสามารถจัดการงานบัญชีและวิศวกรรมได้อย่างมีประสิทธิภาพ
                </p>
                <p>
                  จากประสบการณ์กว่า 10 ปี เราได้พัฒนาบริการและเครื่องมือต่างๆ 
                  เพื่อตอบโจทย์ความต้องการของธุรกิจในยุคดิจิทัล 
                  ไม่ว่าจะเป็น SME หรือองค์กรขนาดใหญ่
                </p>
                <p>
                  ปัจจุบันเรามีลูกค้ากว่า 500 รายที่ไว้วางใจให้เราดูแลงานบัญชีและโปรเจกต์วิศวกรรม
                  พร้อมทั้งมีเครื่องมือออนไลน์กว่า 50 รายการให้ใช้งานฟรี
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-8">
                {["บัญชีครบวงจร", "วิศวกรรมออกแบบ", "ที่ปรึกษาธุรกิจ", "เครื่องมือออนไลน์"].map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="px-4 py-2 rounded-full bg-sky-50 text-sky-600 text-sm font-medium border border-sky-100"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/office-banner.jpg"
                  alt="SCOPE SOLUTIONS Office"
                  width={600}
                  height={300}
                  className="w-full h-auto object-cover"
                />
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-6 -right-6 bg-gradient-to-r from-sky-400 to-blue-500 text-white px-6 py-4 rounded-2xl shadow-xl"
              >
                <p className="font-bold text-lg">ก่อตั้งปี 2558</p>
                <p className="text-sm text-white/80">10+ ปีประสบการณ์</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ค่านิยมของเรา
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              หลักการที่เรายึดมั่นในการให้บริการลูกค้าทุกราย
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-lg shadow-slate-100/50 hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <value.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-sky-500 font-medium mb-3">{value.titleEn}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <Image src="/images/bg-pattern.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ทีมผู้บริหาร
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ทีมงานมืออาชีพที่พร้อมให้บริการและดูแลธุรกิจของคุณ
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`h-32 bg-gradient-to-r ${member.color} relative`}>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 bg-white/10"
                  />
                </div>
                <div className="relative px-6 pb-6">
                  {member.image ? (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-2xl overflow-hidden shadow-xl ring-4 ring-white">
                      <Image src={member.image} alt={member.name} width={80} height={80} className="w-full h-full object-cover object-top" />
                    </div>
                  ) : (
                    <div className={`absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-2xl bg-gradient-to-r ${member.color} flex items-center justify-center text-white text-2xl font-bold shadow-xl ring-4 ring-white`}>
                      {member.initials}
                    </div>
                  )}
                  <div className="pt-14 text-center">
                    <h3 className="font-bold text-foreground text-lg">{member.name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{member.nameEn}</p>
                    <p className="text-sm text-sky-500 font-medium">{member.roleTh}</p>
                    {member.description && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{member.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              เส้นทางการเติบโต
            </h2>
            <p className="text-lg text-muted-foreground">
              ก้าวสำคัญในการพัฒนาบริษัทของเรา
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-200 via-blue-300 to-sky-200 -translate-x-1/2 hidden md:block" />
            
            <div className="space-y-8">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg inline-block"
                    >
                      <p className="text-sky-500 font-bold text-lg mb-1">{milestone.year}</p>
                      <p className="text-foreground font-semibold">{milestone.event}</p>
                      <p className="text-sm text-muted-foreground">{milestone.eventEn}</p>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.2 }}
                    className="hidden md:flex w-6 h-6 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 shadow-lg z-10 items-center justify-center"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </motion.div>
                  
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Spacing */}
      <div className="h-8" />
    </div>
  )
}
