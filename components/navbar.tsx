"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Moon, 
  Sun, 
  User, 
  Laptop, 
  GraduationCap, 
  BookOpen, 
  Users, 
  FileText, 
  Phone, 
  Home 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: { label: string; href: string; description?: string }[];
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "system">("dark");
  const pathname = usePathname();

  // Check if the user is scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle theme switching
  useEffect(() => {
    // On mount, read the theme from localStorage or use dark as default
    const savedTheme = localStorage.getItem("theme") as "dark" | "system" || "dark";
    setTheme(savedTheme);

    // Apply the theme
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: "light" | "dark" | "system") => {
    const root = window.document.documentElement;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    
    // Remove both classes and apply the appropriate one
    root.classList.remove("light", "dark");
    
    if (newTheme === "system") {
      root.classList.add(systemTheme);
    } else {
      root.classList.add(newTheme);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "system" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  const navItems: NavItem[] = [
    {
      label: "Home",
      href: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      label: "About",
      href: "/about",
      icon: <User className="h-5 w-5" />,
      children: [
        {
          label: "Our Department",
          href: "/about",
          description: "Learn about our department history and vision"
        },
        {
          label: "Faculty",
          href: "/faculty",
          description: "Meet our accomplished faculty members"
        },
        {
          label: "Facilities",
          href: "/facilities",
          description: "Explore our state-of-the-art facilities"
        }
      ]
    },
    {
      label: "Programs",
      href: "/programs",
      icon: <GraduationCap className="h-5 w-5" />,
      children: [
        {
          label: "BSc Data Science",
          href: "/programs/bsc",
          description: "Undergraduate program in Data Science"
        },
        {
          label: "MSc Data Science",
          href: "/programs/msc",
          description: "Postgraduate program in Data Science"
        },
        {
          label: "Certificate Courses",
          href: "/programs/certificates",
          description: "Short-term specialized certificate courses"
        }
      ]
    },
    {
      label: "Courses",
      href: "/courses",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      label: "Research",
      href: "/research",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      label: "Contact",
      href: "/contact",
      icon: <Phone className="h-5 w-5" />,
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <Laptop className="h-5 w-5" />,
    },
  ];

  const toggleSubMenu = (label: string) => {
    if (openSubMenu === label) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(label);
    }
  };

  // Animation variants
  const menuVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <header 
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-2" 
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-8 w-8 rounded-full bg-gradient-to-tr from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold">
                <span>DS</span>
              </div>
              <span className={`font-bold text-xl ${isScrolled ? "text-gray-900 dark:text-white" : "text-white"}`}>
                YCIS Data Science
              </span>
            </Link>

            {/* Desktop Nav Items */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.label} className="relative group">
                  {item.children ? (
                    <button 
                      onClick={() => toggleSubMenu(item.label)}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? "text-purple-600 dark:text-purple-400"
                          : isScrolled
                            ? "text-gray-700 hover:text-purple-600 dark:text-gray-200 dark:hover:text-purple-400"
                            : "text-white/90 hover:text-white"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? "text-purple-600 dark:text-purple-400"
                          : isScrolled
                            ? "text-gray-700 hover:text-purple-600 dark:text-gray-200 dark:hover:text-purple-400"
                            : "text-white/90 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {item.children && (
                    <div className="absolute left-0 mt-2 w-60 origin-top-left rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <div className="font-medium">{child.label}</div>
                            {child.description && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{child.description}</p>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:text-purple-600 dark:text-gray-200 dark:hover:text-purple-400"
                    : "text-white/90 hover:text-white"
                }`}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Laptop className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors mr-2 ${
                  isScrolled
                    ? "text-gray-700 hover:text-purple-600 dark:text-gray-200 dark:hover:text-purple-400"
                    : "text-white/90 hover:text-white"
                }`}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Laptop className="h-5 w-5" />
                )}
              </button>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-md ${
                  isScrolled
                    ? "text-gray-700 hover:text-purple-600 dark:text-gray-200 dark:hover:text-purple-400"
                    : "text-white/90 hover:text-white"
                }`}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu (Drawer) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
            <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white dark:bg-gray-900 shadow-xl z-50 overflow-y-auto">
              <div className="p-6">
                <Link href="/" className="flex items-center space-x-2 mb-8">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold">
                    <span>DS</span>
                  </div>
                  <span className="font-bold text-xl text-gray-900 dark:text-white">
                    YCIS Data Science
                  </span>
                </Link>

                <nav className="mt-8 space-y-1">
                  {navItems.map((item) => (
                    <div key={item.label}>
                      {item.children ? (
                        <div className="mb-2">
                          <button
                            onClick={() => toggleSubMenu(item.label)}
                            className={`w-full flex items-center justify-between p-3 rounded-md ${
                              isActive(item.href)
                                ? "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                                : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                            }`}
                          >
                            <div className="flex items-center">
                              {item.icon}
                              <span className="ml-3">{item.label}</span>
                            </div>
                            <ChevronDown 
                              className={`h-4 w-4 transition-transform ${openSubMenu === item.label ? "rotate-180" : ""}`} 
                            />
                          </button>
                          <AnimatePresence>
                            {openSubMenu === item.label && (
                              <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={dropdownVariants}
                                className="mt-1 ml-6 space-y-1"
                              >
                                {item.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className={`block p-3 rounded-md text-sm ${
                                      pathname === child.href
                                        ? "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    }`}
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={`flex items-center p-3 rounded-md ${
                            isActive(item.href)
                              ? "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                              : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.icon}
                          <span className="ml-3">{item.label}</span>
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

                <div className="mt-12 border-t pt-6 border-gray-200 dark:border-gray-700">
                  <Button 
                    variant="default" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600"
                  >
                    <Link href="/contact" className="flex items-center justify-center" onClick={() => setIsOpen(false)}>
                      <Phone className="mr-2 h-4 w-4" />
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}