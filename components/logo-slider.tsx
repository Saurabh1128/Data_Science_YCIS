"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface LogoSliderProps {
  className?: string
}

export default function LogoSlider({ className }: LogoSliderProps) {
  const [width, setWidth] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  // Company logos data
  const companies = [
    { name: "Tech Solutions", logo: "https://cdn-icons-png.flaticon.com/256/5968/5968520.png" },
    { name: "Data Insights", logo: "https://cdn-icons-png.flaticon.com/256/5968/5968472.png" },
    { name: "AI Research Labs", logo: "https://cdn-icons-png.flaticon.com/256/5968/5968554.png" },
    { name: "Analytics Pro", logo: "https://cdn-icons-png.flaticon.com/256/5968/5968428.png" },
    { name: "Cloud Systems", logo: "https://cdn-icons-png.flaticon.com/256/5968/5968381.png" },
    { name: "Neural Networks Inc", logo: "https://cdn-icons-png.flaticon.com/256/5968/5968474.png" },
    { name: "Quantum Computing", logo: "https://cdn-icons-png.flaticon.com/256/5968/5968350.png" },
    { name: "Big Data Solutions", logo: "https://cdn-icons-png.flaticon.com/256/5968/5968342.png" },
  ]

  // Duplicate the array to create a seamless loop
  const duplicatedCompanies = [...companies, ...companies]

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className="relative">
        {/* First slider - moves from right to left */}
        <div className="py-4 flex items-center">
          <motion.div
            className="flex gap-8 items-center"
            animate={{
              x: [0, -2000],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {duplicatedCompanies.map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 h-16 flex items-center justify-center group px-4"
              >
                <div className="relative h-12 w-[140px] grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100">
                  <img
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs rounded py-1 px-2 -bottom-7 pointer-events-none">
                  {company.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second slider - moves from left to right (in opposite direction) */}
        <div className="py-4 flex items-center mt-4">
          <motion.div
            className="flex gap-8 items-center"
            animate={{
              x: [-2000, 0],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {duplicatedCompanies.reverse().map((company, index) => (
              <div
                key={`reverse-${company.name}-${index}`}
                className="flex-shrink-0 h-16 flex items-center justify-center group px-4"
              >
                <div className="relative h-12 w-[140px] grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100">
                  <img
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs rounded py-1 px-2 -bottom-7 pointer-events-none">
                  {company.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Gradient overlays for smooth fade effect on edges */}
        <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-white to-transparent dark:from-gray-950 z-10"></div>
        <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white to-transparent dark:from-gray-950 z-10"></div>
      </div>
    </div>
  )
}

