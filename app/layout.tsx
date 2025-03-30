import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "YCIS Data Science Program",
  description: "Yashavantrao Chavan Institute of Science Data Science Department",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col bg-white dark:bg-gray-900`}>
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}



import './globals.css'