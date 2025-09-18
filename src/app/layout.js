import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ระบบคำนวณไหม - อัครพงษ์ฟาร์ม',
  description: 'ระบบคำนวณ % ไหม และราคาซื้อ - อัครพงษ์ ฟาร์ม',
}

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
