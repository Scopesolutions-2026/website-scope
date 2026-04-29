import {
  Calculator,
  Receipt,
  User,
  Building2,
  Shield,
  Calendar,
  Wallet,
  TrendingDown,
  Coins,
  AlertTriangle,
  Target,
  LineChart,
  Percent,
  CreditCard,
  Tag,
  PiggyBank,
  DollarSign,
  Building,
  TrendingUp,
  ArrowUpDown,
  Scale,
  Box,
  Ruler,
  Mountain,
  Zap,
  Thermometer,
  Grid3X3,
  HardHat,
  Clock,
  Map,
  FileText,
  FileCheck,
  FileSpreadsheet,
  Languages,
  QrCode,
  Type,
  LetterText,
  Stamp,
  PenTool,
  CheckSquare,
  Files,
  Image,
  HardDrive,
  Pipette,
  Barcode,
  FileJson,
  KeyRound,
  ImageDown,
  Smartphone,
  Contact,
  LucideIcon,
} from "lucide-react"

export type ToolCategory = "accounting" | "business" | "engineering" | "documents" | "utilities"

export interface Tool {
  id: string
  name: string
  nameTh: string
  category: ToolCategory
  icon: LucideIcon
  isFunctional: boolean
  gradient: string
}

export const categoryColors: Record<ToolCategory, { bg: string; text: string; border: string }> = {
  accounting: { bg: "from-emerald-500 to-teal-600", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500/30" },
  business: { bg: "from-sky-500 to-blue-600", text: "text-sky-600 dark:text-sky-400", border: "border-sky-500/30" },
  engineering: { bg: "from-orange-500 to-amber-600", text: "text-orange-600 dark:text-orange-400", border: "border-orange-500/30" },
  documents: { bg: "from-indigo-500 to-blue-600", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-500/30" },
  utilities: { bg: "from-slate-500 to-gray-600", text: "text-slate-600 dark:text-slate-400", border: "border-slate-500/30" },
}

export const categoryNames: Record<ToolCategory, { en: string; th: string }> = {
  accounting: { en: "Accounting", th: "บัญชีและภาษี" },
  business: { en: "Business", th: "ธุรกิจและการเงิน" },
  engineering: { en: "Engineering", th: "วิศวกรรม" },
  documents: { en: "Documents", th: "จัดการเอกสาร" },
  utilities: { en: "Utilities", th: "ยูทิลิตี้" },
}

export const tools: Tool[] = [
  // Accounting (10 tools)
  { id: "vat-calc", name: "VAT Calc", nameTh: "คำนวณ VAT", category: "accounting", icon: Calculator, isFunctional: true, gradient: "from-emerald-400 to-teal-500" },
  { id: "wht-calc", name: "WHT Calc", nameTh: "หัก ณ ที่จ่าย", category: "accounting", icon: Receipt, isFunctional: false, gradient: "from-emerald-500 to-teal-600" },
  { id: "personal-tax", name: "Personal Tax", nameTh: "ภาษีบุคคลธรรมดา", category: "accounting", icon: User, isFunctional: false, gradient: "from-teal-400 to-cyan-500" },
  { id: "corp-tax", name: "Corp Tax", nameTh: "ภาษีนิติบุคคล", category: "accounting", icon: Building2, isFunctional: false, gradient: "from-cyan-400 to-teal-500" },
  { id: "social-security", name: "Social Security", nameTh: "ประกันสังคม", category: "accounting", icon: Shield, isFunctional: false, gradient: "from-emerald-500 to-green-600" },
  { id: "pnd-deadlines", name: "PND Deadlines", nameTh: "แจ้งเตือนภาษี", category: "accounting", icon: Calendar, isFunctional: false, gradient: "from-green-400 to-emerald-500" },
  { id: "payroll", name: "Payroll", nameTh: "คำนวณเงินเดือน", category: "accounting", icon: Wallet, isFunctional: false, gradient: "from-teal-500 to-emerald-600" },
  { id: "depreciation", name: "Depreciation", nameTh: "ค่าเสื่อมราคา", category: "accounting", icon: TrendingDown, isFunctional: false, gradient: "from-emerald-400 to-green-500" },
  { id: "petty-cash", name: "Petty Cash", nameTh: "เงินสดย่อย", category: "accounting", icon: Coins, isFunctional: false, gradient: "from-green-500 to-teal-600" },
  { id: "tax-risk", name: "Tax Risk", nameTh: "ความเสี่ยงภาษี", category: "accounting", icon: AlertTriangle, isFunctional: false, gradient: "from-teal-400 to-green-500" },

  // Business (10 tools)
  { id: "break-even", name: "Break-even", nameTh: "จุดคุ้มทุน", category: "business", icon: Target, isFunctional: true, gradient: "from-sky-400 to-blue-500" },
  { id: "roi", name: "ROI", nameTh: "คำนวณ ROI", category: "business", icon: LineChart, isFunctional: false, gradient: "from-blue-400 to-sky-500" },
  { id: "profit-margin", name: "Profit Margin", nameTh: "อัตรากำไร", category: "business", icon: Percent, isFunctional: false, gradient: "from-sky-500 to-cyan-600" },
  { id: "loan-interest", name: "Loan Interest", nameTh: "ดอกเบี้ยสินเชื่อ", category: "business", icon: CreditCard, isFunctional: false, gradient: "from-cyan-400 to-sky-500" },
  { id: "price-calc", name: "Price Calc", nameTh: "ตั้งราคาขาย", category: "business", icon: Tag, isFunctional: false, gradient: "from-sky-400 to-blue-500" },
  { id: "compound-interest", name: "Compound Interest", nameTh: "ดอกเบี้ยทบต้น", category: "business", icon: PiggyBank, isFunctional: false, gradient: "from-blue-500 to-sky-600" },
  { id: "currency", name: "Currency", nameTh: "อัตราแลกเปลี่ยน", category: "business", icon: DollarSign, isFunctional: false, gradient: "from-sky-500 to-blue-600" },
  { id: "biz-valuation", name: "Biz Valuation", nameTh: "ประเมินมูลค่าธุรกิจ", category: "business", icon: Building, isFunctional: false, gradient: "from-blue-400 to-cyan-500" },
  { id: "inflation", name: "Inflation", nameTh: "เงินเฟ้อ", category: "business", icon: TrendingUp, isFunctional: false, gradient: "from-sky-400 to-cyan-500" },
  { id: "cash-flow", name: "Cash Flow", nameTh: "กระแสเงินสด", category: "business", icon: ArrowUpDown, isFunctional: false, gradient: "from-cyan-500 to-sky-600" },

  // Engineering (10 tools)
  { id: "steel-weight", name: "Steel Weight", nameTh: "น้ำหนักเหล็ก", category: "engineering", icon: Scale, isFunctional: false, gradient: "from-orange-400 to-red-500" },
  { id: "concrete-volume", name: "Concrete Volume", nameTh: "ปริมาตรคอนกรีต", category: "engineering", icon: Box, isFunctional: true, gradient: "from-red-400 to-orange-500" },
  { id: "unit-converter", name: "Unit Converter", nameTh: "แปลงหน่วย", category: "engineering", icon: Ruler, isFunctional: false, gradient: "from-orange-500 to-amber-600" },
  { id: "slope-calc", name: "Slope Calc", nameTh: "ความลาดเอียง", category: "engineering", icon: Mountain, isFunctional: false, gradient: "from-amber-400 to-orange-500" },
  { id: "electric-load", name: "Electric Load", nameTh: "โหลดไฟฟ้า", category: "engineering", icon: Zap, isFunctional: false, gradient: "from-yellow-400 to-orange-500" },
  { id: "btu-calc", name: "BTU Calc", nameTh: "ขนาด BTU แอร์", category: "engineering", icon: Thermometer, isFunctional: false, gradient: "from-orange-400 to-yellow-500" },
  { id: "brick-counter", name: "Brick Counter", nameTh: "นับกระเบื้อง/อิฐ", category: "engineering", icon: Grid3X3, isFunctional: false, gradient: "from-red-500 to-orange-600" },
  { id: "structural-load", name: "Structural Load", nameTh: "แรงรับน้ำหนัก", category: "engineering", icon: HardHat, isFunctional: false, gradient: "from-orange-500 to-red-600" },
  { id: "man-hour", name: "Man-Hour", nameTh: "ประเมินค่าแรง", category: "engineering", icon: Clock, isFunctional: false, gradient: "from-amber-500 to-orange-600" },
  { id: "roadmap-gen", name: "Roadmap Gen", nameTh: "แผนงานก่อสร้าง", category: "engineering", icon: Map, isFunctional: false, gradient: "from-red-400 to-amber-500" },

  // Documents (10 tools)
  { id: "invoice-gen", name: "Invoice Gen", nameTh: "สร้างใบแจ้งหนี้", category: "documents", icon: FileText, isFunctional: false, gradient: "from-indigo-400 to-blue-500" },
  { id: "receipt-maker", name: "Receipt Maker", nameTh: "สร้างใบเสร็จ", category: "documents", icon: FileCheck, isFunctional: false, gradient: "from-blue-400 to-indigo-500" },
  { id: "quotation", name: "Quotation", nameTh: "ใบเสนอราคา", category: "documents", icon: FileSpreadsheet, isFunctional: false, gradient: "from-indigo-500 to-blue-600" },
  { id: "thai-baht-text", name: "Thai Baht Text", nameTh: "แปลงตัวเลขไทย", category: "documents", icon: Languages, isFunctional: true, gradient: "from-blue-400 to-indigo-500" },
  { id: "promptpay-qr", name: "PromptPay QR", nameTh: "QR PromptPay", category: "documents", icon: QrCode, isFunctional: false, gradient: "from-sky-500 to-blue-600" },
  { id: "word-counter", name: "Word Counter", nameTh: "นับคำ/ตัวอักษร", category: "documents", icon: Type, isFunctional: false, gradient: "from-indigo-400 to-blue-500" },
  { id: "case-converter", name: "Case Converter", nameTh: "แปลงพิมพ์เล็ก-ใหญ่", category: "documents", icon: LetterText, isFunctional: false, gradient: "from-blue-400 to-indigo-500" },
  { id: "stamp-gen", name: "Stamp Gen", nameTh: "จำลองตราประทับ", category: "documents", icon: Stamp, isFunctional: false, gradient: "from-indigo-500 to-blue-600" },
  { id: "signature-pad", name: "Signature Pad", nameTh: "ลายเซ็นดิจิทัล", category: "documents", icon: PenTool, isFunctional: false, gradient: "from-blue-500 to-sky-600" },
  { id: "checklist", name: "Checklist", nameTh: "Checklist งาน", category: "documents", icon: CheckSquare, isFunctional: false, gradient: "from-indigo-400 to-blue-500" },

  // Utilities (10 tools)
  { id: "pdf-merger", name: "PDF Merger", nameTh: "รวมไฟล์ PDF", category: "utilities", icon: Files, isFunctional: false, gradient: "from-gray-400 to-slate-500" },
  { id: "image-to-pdf", name: "Image to PDF", nameTh: "รูปเป็น PDF", category: "utilities", icon: Image, isFunctional: false, gradient: "from-slate-400 to-gray-500" },
  { id: "file-size", name: "File Size", nameTh: "แปลงหน่วยไฟล์", category: "utilities", icon: HardDrive, isFunctional: false, gradient: "from-gray-500 to-zinc-600" },
  { id: "color-picker", name: "Color Picker", nameTh: "ดูดสี", category: "utilities", icon: Pipette, isFunctional: false, gradient: "from-zinc-400 to-gray-500" },
  { id: "barcode-gen", name: "Barcode Gen", nameTh: "สร้าง Barcode/QR", category: "utilities", icon: Barcode, isFunctional: false, gradient: "from-slate-500 to-gray-600" },
  { id: "csv-json", name: "CSV>JSON", nameTh: "CSV เป็น JSON", category: "utilities", icon: FileJson, isFunctional: false, gradient: "from-gray-400 to-slate-500" },
  { id: "password-gen", name: "Password Gen", nameTh: "สุ่มรหัสผ่าน", category: "utilities", icon: KeyRound, isFunctional: false, gradient: "from-zinc-500 to-gray-600" },
  { id: "image-resizer", name: "Image Resizer", nameTh: "ย่อขนาดภาพ", category: "utilities", icon: ImageDown, isFunctional: false, gradient: "from-slate-400 to-zinc-500" },
  { id: "mockup-gen", name: "Mockup Gen", nameTh: "สร้าง Mockup", category: "utilities", icon: Smartphone, isFunctional: false, gradient: "from-gray-500 to-slate-600" },
  { id: "vcard-maker", name: "vCard Maker", nameTh: "นามบัตรดิจิทัล", category: "utilities", icon: Contact, isFunctional: false, gradient: "from-zinc-400 to-gray-500" },
]

export const getToolsByCategory = (category: ToolCategory) => tools.filter(t => t.category === category)
