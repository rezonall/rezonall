import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "@/components/providers"
import { DemoWatermark } from "@/components/demo-watermark"

export const metadata: Metadata = {
  title: "RezonAll - Voice AI Dashboard [DEMO]",
  description: "Advanced voice bot management platform - DEMO VERSION",
}

import { Inter } from "next/font/google"
export const dynamic = "force-dynamic"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DemoWatermark />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
