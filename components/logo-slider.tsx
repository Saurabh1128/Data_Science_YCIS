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
    { name: "Python", logo: "https://www.python.org/static/community_logos/python-logo.png" },
    { name: "MongoDB", logo: "https://webimages.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png" },
    { name: "PostgreSQL", logo: "https://www.postgresql.org/media/img/about/press/elephant.png" },
    { name: "Power BI", logo: "https://powerbi.microsoft.com/pictures/shared/social/social-default-image.png" },
    { name: "TensorFlow", logo: "https://www.tensorflow.org/images/tf_logo_social.png" },
    { name: "Jupyter", logo: "https://jupyter.org/assets/homepage/main-logo.svg" },
    { name: "Pandas", logo: "https://pandas.pydata.org/static/img/pandas.svg" },
    { name: "NumPy", logo: "https://numpy.org/images/logo.svg" },
    { name: "Scikit-learn", logo: "https://scikit-learn.org/stable/_static/scikit-learn-logo-small.png" },
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

