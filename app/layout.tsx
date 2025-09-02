import type React from "react"
import type { Metadata } from "next"
import { Work_Sans, Open_Sans } from "next/font/google"
import "./globals.css"
import { Analytics } from '@vercel/analytics/react'


const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
  weight: ["400", "600", "700"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "ES Futures Live Dashboard",
  description: "Professional trading dashboard for ES Futures with real-time data",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`font-sans ${workSans.variable} ${openSans.variable} antialiased dark bg-background text-foreground`}
      >
        {children}
        <Analytics /> 
      </body>
    </html>
  )
}
