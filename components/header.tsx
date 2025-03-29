"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, GraduationCap, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Faculty", href: "/faculty" },
    { name: "Research", href: "/research" },
    { name: "Resources", href: "/resources" },
  ]

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? "border-b border-red-200/80 dark:border-red-800/80 bg-white/90 backdrop-blur-md dark:bg-black/90 shadow-sm" 
        : "bg-white/75 backdrop-blur-sm dark:bg-black/75"
    }`}>
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-800/40 transition-colors">
              <GraduationCap className="h-6 w-6 text-red-600 dark:text-red-500" />
            </div>
            <span className="font-bold text-xl hidden sm:inline-block text-red-600 dark:text-red-500 group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
              Data Science Dept
            </span>
          </Link>
        </div>
        
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-6 text-lg font-medium pt-10">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-2 group ${
                      pathname === item.href
                        ? "text-red-600 dark:text-red-500"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span className="relative">
                      {item.name}
                      {pathname === item.href && (
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 dark:bg-red-500"></span>
                      )}
                    </span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          
          <nav className="hidden md:flex items-center gap-8 text-sm mr-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative font-medium transition-colors group ${
                  pathname === item.href 
                    ? "text-red-600 dark:text-red-500" 
                    : "text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 transition-all duration-300 transform ${
                  pathname === item.href 
                    ? "bg-red-600 dark:bg-red-500" 
                    : "scale-x-0 group-hover:scale-x-100 bg-red-600/70 dark:bg-red-500/70"
                }`}></span>
              </Link>
            ))}
          </nav>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="text-gray-700 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-red-900/30"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

