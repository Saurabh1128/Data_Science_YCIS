import Link from "next/link"
import { GraduationCap } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-black text-white">
      <div className="container flex flex-col md:flex-row items-center justify-between py-10 md:py-8">
        <div className="flex flex-col items-center md:items-start gap-4 mb-8 md:mb-0">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <span className="font-bold">Data Science Department</span>
          </Link>
          <p className="text-sm text-gray-300 text-center md:text-left">
            Yashavantrao Chavan Institute of Science
            <br />
            Satara, Maharashtra, India
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Quick Links</h3>
            <Link href="/" className="text-sm text-gray-300 hover:text-purple-400">
              Home
            </Link>
            <Link href="/courses" className="text-sm text-gray-300 hover:text-purple-400">
              Courses
            </Link>
            <Link href="/faculty" className="text-sm text-gray-300 hover:text-purple-400">
              Faculty
            </Link>
            <Link href="/research" className="text-sm text-gray-300 hover:text-purple-400">
              Research
            </Link>
            <Link href="/resources" className="text-sm text-gray-300 hover:text-purple-400">
              Resources
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Resources</h3>
            <Link href="/resources/library" className="text-sm text-gray-300 hover:text-purple-400">
              Digital Library
            </Link>
            <Link href="/resources/tools" className="text-sm text-gray-300 hover:text-purple-400">
              Software Tools
            </Link>
            <Link href="/resources/publications" className="text-sm text-gray-300 hover:text-purple-400">
              Publications
            </Link>
            <Link href="/dashboard-login" className="text-sm text-gray-300 hover:text-purple-400">
              Dashboard
            </Link>
          </div>
          <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
            <h3 className="font-semibold">Contact</h3>
            <p className="text-sm text-gray-300">Email: datascience@ycis.ac.in</p>
            <p className="text-sm text-gray-300">Phone: +91 8668428513</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container flex items-center justify-center py-6">
          <p className="text-xs text-gray-400 text-center">
            © 2025 Department of Data Science, YCIS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

