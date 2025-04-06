"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageType {
  src: string
  alt: string
  title?: string
  description?: string
}

interface ImageSliderProps {
  images: ImageType[]
  autoSlideInterval?: number
  className?: string
}

export default function CoverFlowSlider({
  images,
  autoSlideInterval = 5000,
  className,
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const sliderRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Function to go to next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  // Function to go to previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  // Function to go to specific slide
  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Auto slide functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(nextSlide, autoSlideInterval)
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, autoSlideInterval])

  // Pause auto slide on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false)
  }

  // Resume auto slide on mouse leave
  const handleMouseLeave = () => {
    setIsAutoPlaying(true)
  }

  // Calculate position and styles for each image with enhanced 3D effect
  const getImageStyles = (index: number) => {
    const diff = index - currentIndex
    
    // Enhanced transformation values for more dramatic 3D effect
    let translateX = diff * 65
    let translateZ = -Math.abs(diff) * 120
    let rotateY = diff * 35
    let scale = 1 - Math.abs(diff) * 0.15
    let opacity = 1 - Math.abs(diff) * 0.25
    let zIndex = 20 - Math.abs(diff)
    
    // Limit the visible slides with smoother falloff
    if (Math.abs(diff) > 2) {
      opacity = 0
      scale = 0
      zIndex = -1
    }
    
    return {
      transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
    }
  }

  return (
    <div 
      className={cn("relative w-full py-8 md:py-12 overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-violet-900", 
      className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 3s linear infinite;
          background-size: 200% 200%;
        }
      `}</style>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_60%)]"></div>
      
      {/* Main slider container with perspective effect */}
      <div 
        ref={sliderRef}
        className="relative max-w-6xl mx-auto h-[300px] md:h-[400px] perspective-1000 transform-style-3d"
      >
        {/* Slider track */}
        <div className="relative h-full w-full flex items-center justify-center">
          {/* Render each image with 3D effect */}
          {images.map((image, index) => (
            <div
              key={index}
              style={getImageStyles(index)}
              className="absolute w-[280px] h-[200px] md:w-[400px] md:h-[280px] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer hover:scale-105"
              onClick={() => goToSlide(index)}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl before:absolute before:inset-0 before:p-[2px] before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500 before:rounded-lg before:content-[''] before:animate-gradient-x">
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-black/20 backdrop-blur-sm">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    width={720}
                    height={480}
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/50 to-transparent opacity-90"></div>
                  {(image.title || image.description) && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                      {image.title && <h3 className="text-lg md:text-xl font-bold mb-1">{image.title}</h3>}
                      {image.description && <p className="text-sm md:text-base opacity-90">{image.description}</p>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors z-30"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors z-30"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              currentIndex === index 
                ? "bg-white" 
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}