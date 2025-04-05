"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface LogoSliderProps {
  className?: string
}

export default function LogoSlider({ className }: LogoSliderProps) {
  const [width, setWidth] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  // Data Science tools logos data
  const companies = [
    { name: "Python", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png" },
    { name: "MongoDB", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png" },
    { name: "PostgreSQL", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1985px-Postgresql_elephant.svg.png" },
    { name: "Power BI", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/2048px-New_Power_BI_Logo.svg.png" },
    { name: "TensorFlow", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/1915px-Tensorflow_logo.svg.png" },
    { name: "Jupyter", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Jupyter_logo.svg/1767px-Jupyter_logo.svg.png" },
    { name: "Pandas", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Pandas_logo.svg/2560px-Pandas_logo.svg.png" },
    { name: "NumPy", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/NumPy_logo_2020.svg/2560px-NumPy_logo_2020.svg.png" },
    { name: "Scikit-learn", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Scikit_learn_logo_small.svg/2560px-Scikit_learn_logo_small.svg.png" },
    { name: "R", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/R_logo.svg/1280px-R_logo.svg.png" },
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
        <div className="py-8 flex items-center">
          <motion.div
            className="flex gap-12 items-center"
            animate={{
              x: [0, -2000],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {duplicatedCompanies.map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 h-20 flex items-center justify-center group px-6"
              >
                <div className="relative h-16 w-[160px] opacity-90 transition-all duration-300 hover:opacity-100 hover:scale-110 hover:drop-shadow-lg">
                  <img
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm rounded-full py-1.5 px-4 -bottom-8 pointer-events-none shadow-lg">
                  {company.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Gradient overlays for smooth fade effect on edges */}
        <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-white to-transparent dark:from-gray-950 z-10"></div>
        <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-white to-transparent dark:from-gray-950 z-10"></div>
      </div>
    </div>
  )
}

