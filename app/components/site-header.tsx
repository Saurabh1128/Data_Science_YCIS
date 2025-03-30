import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/" className="text-lg font-bold flex items-center">
            YCIS Data Science
          </Link>
        </div>
        <nav className="flex items-center space-x-4 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-foreground/80">
            Home
          </Link>
          <Link href="/department" className="transition-colors hover:text-foreground/80">
            Department
          </Link>
          <Link href="/courses" className="transition-colors hover:text-foreground/80">
            Courses
          </Link>
          <Link href="/contact" className="transition-colors hover:text-foreground/80">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
} 