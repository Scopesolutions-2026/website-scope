import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '@/components/providers'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'SCOPE SOLUTIONS - Professional Accounting & Engineering',
  description: 'ครบเครื่องเรื่อง "บัญชี" และ "วิศวกรรม" ในที่เดียว! Professional tools for accounting, business, engineering, and document management.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon.png',
        href: '/icon.png',
        sizes: '512x512',
      },
    ],
    // ถ้าคุณมีไฟล์ apple-icon.png ก็เก็บไว้ได้ แต่ถ้าไม่มีให้ลบบรรทัดล่างนี้ออกครับ
    apple: '/icon.png', 
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
