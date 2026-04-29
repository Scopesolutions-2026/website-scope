'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config' // เช็คว่าไฟล์ sanity.config.ts อยู่ข้างนอกจริงๆ ใช่ไหม

export default function StudioPage() {
  return <NextStudio config={config} />
}