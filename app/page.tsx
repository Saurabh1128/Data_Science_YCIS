"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Users,
  FileText,
  BarChart2,
  ChevronRight,
  ArrowRight,
  Award,
  Brain,
  Database,
  Clock,
} from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import LogoSlider from "@/components/logo-slider"
import ImageSlider from "@/components/image-slider"
import ClientOnly from "@/components/client-only"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const counterRef = useRef(null)
  const [counterVisible, setCounterVisible] = useState(false)

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  })

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const testimonials = [
    {
      quote:
        "The Data Science program at YCIS has provided me with the skills and knowledge needed to excel in my career.",
      author: "Priya Sharma",
      role: "Alumni, Data Scientist at Tech Solutions",
    },
    {
      quote: "The faculty's expertise and hands-on approach to learning has been instrumental in my academic growth.",
      author: "Rahul Patel",
      role: "Current Student, M.Sc. Data Science",
    },
    {
      quote:
        "Our collaboration with YCIS Data Science department has helped us find talented graduates who make immediate impact.",
      author: "Amit Verma",
      role: "Hiring Manager, Analytics Pro",
    },
  ]

  // Image slider data
  const sliderImages = [
    {
      src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000&auto=format&fit=crop",
      alt: "Department Computer Lab",
      caption: "Students working on real-world data science projects"
    },
    {
      src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop",
      alt: "Department Group Photo",
      caption: "Department of Data Science students and faculty"
    },
    {
      src: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=1000&auto=format&fit=crop",
      alt: "Science Exhibition",
      caption: "Students participating in the YC Science Exhibition"
    },
    {
      src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop",
      alt: "Lab Facilities",
      caption: "State-of-the-art computing facilities"
    },
  ]

  useEffect(() => {
    setIsLoaded(true)

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  useEffect(() => {
    if (statsInView) {
      setCounterVisible(false);
      setTimeout(() => setCounterVisible(true), 100);
    }
  }, [statsInView])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const stats = [
    { label: "Students", value: 250, icon: <Users className="h-8 w-8 text-red-600" /> },
    { label: "Courses", value: 2, icon: <BookOpen className="h-8 w-8 text-red-600" /> },
    { label: "Research Papers", value: 5, icon: <FileText className="h-8 w-8 text-red-600" /> },
  ]

  const Counter = ({ value }: { value: number; duration?: number }) => {
    // Simply return the value without animation
    return <span>{value}</span>
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<{
    success?: boolean;
    message?: string;
    loading?: boolean;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set loading state
    setFormStatus({ loading: true });
    console.log('Form submission started...');
    
    try {
      console.log('Submitting form data:', formData);
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (response.ok) {
        console.log('Form submission successful');
        setFormStatus({
          success: true,
          message: 'Thank you! Your message has been sent successfully.'
        });
        // Reset form data
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        console.error('Form submission failed:', data);
        setFormStatus({
          success: false,
          message: data.message || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        success: false,
        message: 'An error occurred. Please try again later.'
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Animation */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-red-50 via-rose-50 to-white dark:from-gray-900 dark:via-red-950 dark:to-gray-950 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col space-y-6"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block p-2 bg-red-100 dark:bg-red-900 rounded-full mb-2 w-14 h-14 flex items-center justify-center"
              >
                <GraduationCap className="h-8 w-8 text-red-600" />
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="space-y-4"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="inline-block px-4 py-1.5 bg-red-100/50 dark:bg-red-900/30 rounded-full text-sm font-medium text-red-800 dark:text-red-300 mb-2"
                >
                  Excellence in Data Science Education
                </motion.div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="block"
                  >
                    Department of
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="block bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-400 dark:to-rose-400"
                  >
                    Data Science
                  </motion.span>
                </h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="text-xl text-gray-600 dark:text-gray-300 max-w-[600px]"
                >
                  Empowering students with cutting-edge education and research at Yashavantrao Chavan Institute of Science
                </motion.p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 mt-2"
              >
                <Link href="/courses">
                  <Button size="lg" className="px-8 text-md bg-red-600 hover:bg-red-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2, duration: 0.4 }}
                      className="flex items-center"
                    >
                      Explore Courses
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, repeatType: "loop", duration: 1.5, delay: 1.5 }}
                      >
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </motion.span>
                    </motion.span>
                  </Button>
                </Link>
                <Link href="/activities">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 text-md border-red-300 dark:border-red-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2, duration: 0.4 }}
                      className="flex items-center"
                    >
                      View Activities
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, repeatType: "loop", duration: 1.5, delay: 1.7 }}
                      >
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </motion.span>
                    </motion.span>
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative order-first lg:order-last"
            >
              <motion.div
                animate={{ 
                  boxShadow: ["0px 0px 0px rgba(239, 68, 68, 0)", "0px 0px 60px rgba(239, 68, 68, 0.3)", "0px 0px 0px rgba(239, 68, 68, 0)"] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-rose-500/20 blur-xl rounded-2xl"
              ></motion.div>
              <div className="relative overflow-hidden rounded-2xl border shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1000&auto=format&fit=crop"
                  alt="Data Science Department"
                  width={700}
                  height={500}
                  className="object-cover w-full aspect-[4/3]"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-red-900/70 via-red-700/30 to-transparent">
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="hidden md:block">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute top-20 right-[10%] w-64 h-64 bg-red-400/10 dark:bg-red-600/10 rounded-full blur-3xl"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-20 left-[5%] w-96 h-96 bg-rose-400/10 dark:bg-rose-600/10 rounded-full blur-3xl"
          ></motion.div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ delay: 1.4, duration: 1.2 }}
            className="absolute top-1/3 left-1/4 w-24 h-24 bg-red-300/30 dark:bg-red-500/20 rounded-full blur-xl"
          ></motion.div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ delay: 1.6, duration: 1.2 }}
            className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-rose-300/20 dark:bg-rose-500/10 rounded-full blur-xl"
          ></motion.div>
          
          <motion.div
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.2, pathLength: 1 }}
            transition={{ delay: 1.8, duration: 2 }}
            className="absolute top-1/2 left-0 right-0 pointer-events-none"
          >
            <svg className="h-12 w-full overflow-visible" viewBox="0 0 1200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M0,50 C100,30 200,70 300,50 C400,30 500,70 600,50 C700,30 800,70 900,50 C1000,30 1100,70 1200,50"
                stroke="url(#paint0_linear)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 2, delay: 1.8 }}
              />
              <defs>
                <linearGradient id="paint0_linear" x1="0" y1="50" x2="1200" y2="50" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ef4444" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#ef4444" />
                  <stop offset="1" stopColor="#ef4444" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Infinite Slider Highlight Section */}
      <section className="w-full py-8 bg-red-50 dark:bg-gray-950 overflow-hidden">
        <div className="container px-4 md:px-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-4 text-center"
          >
            <div className="inline-block p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
              <GraduationCap className="h-6 w-6 text-red-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Department Highlights</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Discover what makes our department special
              </p>
            </div>
          </motion.div>
        </div>

        <div className="relative w-full py-4">
          {/* Single continuous row of slides */}
          <div className="flex space-x-6 animate-marquee-continuous py-4 items-center">
            {/* First set of cards */}
            {[...Array(5)].map((_, index) => (
              <div
                key={`slide1-${index}`}
                className="flex-shrink-0 w-[450px] h-72 rounded-xl shadow-md overflow-hidden border border-red-100 dark:border-red-800/30 relative group"
              >
                {/* Background image */}
                <img 
                  src={
                    index % 5 === 0 ? "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop" :
                    index % 5 === 1 ? "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop" :
                    index % 5 === 2 ? "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop" :
                    index % 5 === 3 ? "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop" :
                    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop"
                  }
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt="Department Highlight"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 to-red-700/20 group-hover:from-red-900/90 group-hover:to-red-700/30 transition-colors duration-300"></div>
                <div className="p-4 h-full flex items-end relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-full">
                      {index % 5 === 0 && <Award className="h-5 w-5 text-red-600" />}
                      {index % 5 === 1 && <Brain className="h-5 w-5 text-red-600" />}
                      {index % 5 === 2 && <Database className="h-5 w-5 text-red-600" />}
                      {index % 5 === 3 && <Users className="h-5 w-5 text-red-600" />}
                      {index % 5 === 4 && <Calendar className="h-5 w-5 text-red-600" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm md:text-base text-white drop-shadow-sm">
                        {index % 5 === 0 && "Award-winning Faculty"}
                        {index % 5 === 1 && "Research Excellence"}
                        {index % 5 === 2 && "Advanced Computing Lab"}
                        {index % 5 === 3 && "Student Community"}
                        {index % 5 === 4 && "Regular Workshops"}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Second set of cards */}
            {[...Array(5)].map((_, index) => (
              <div
                key={`slide2-${index}`}
                className="flex-shrink-0 w-[450px] h-72 rounded-xl shadow-md overflow-hidden border border-red-100 dark:border-red-800/30 relative group"
              >
                {/* Background image */}
                <img 
                  src={
                    index % 5 === 0 ? "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop" :
                    index % 5 === 1 ? "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop" :
                    index % 5 === 2 ? "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop" :
                    index % 5 === 3 ? "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop" :
                    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop"
                  }
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt="Department Highlight"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 to-red-700/20 group-hover:from-red-900/90 group-hover:to-red-700/30 transition-colors duration-300"></div>
                <div className="p-4 h-full flex items-end relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-full">
                      {index % 5 === 0 && <BookOpen className="h-5 w-5 text-red-600" />}
                      {index % 5 === 1 && <GraduationCap className="h-5 w-5 text-red-600" />}
                      {index % 5 === 2 && <FileText className="h-5 w-5 text-red-600" />}
                      {index % 5 === 3 && <BarChart2 className="h-5 w-5 text-red-600" />}
                      {index % 5 === 4 && <Database className="h-5 w-5 text-red-600" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm md:text-base text-white drop-shadow-sm">
                        {index % 5 === 0 && "Comprehensive Curriculum"}
                        {index % 5 === 1 && "High Placement Rate"}
                        {index % 5 === 2 && "Published Research"}
                        {index % 5 === 3 && "Data Visualization"}
                        {index % 5 === 4 && "Big Data Infrastructure"}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Duplicate first set for seamless loop */}
            {[...Array(5)].map((_, index) => (
              <div
                key={`slide3-${index}`}
                className="flex-shrink-0 w-[450px] h-72 rounded-xl shadow-md overflow-hidden border border-red-100 dark:border-red-800/30 relative group"
              >
                {/* Background image */}
                <img 
                  src={
                    index % 5 === 0 ? "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop" :
                    index % 5 === 1 ? "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop" :
                    index % 5 === 2 ? "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop" :
                    index % 5 === 3 ? "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop" :
                    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop"
                  }
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt="Department Highlight"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 to-red-700/20 group-hover:from-red-900/90 group-hover:to-red-700/30 transition-colors duration-300"></div>
                <div className="p-4 h-full flex items-end relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-full">
                      {index % 5 === 0 && <Award className="h-5 w-5 text-red-600" />}
                      {index % 5 === 1 && <Brain className="h-5 w-5 text-red-600" />}
                      {index % 5 === 2 && <Database className="h-5 w-5 text-red-600" />}
                      {index % 5 === 3 && <Users className="h-5 w-5 text-red-600" />}
                      {index % 5 === 4 && <Calendar className="h-5 w-5 text-red-600" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm md:text-base text-white drop-shadow-sm">
                        {index % 5 === 0 && "Award-winning Faculty"}
                        {index % 5 === 1 && "Research Excellence"}
                        {index % 5 === 2 && "Advanced Computing Lab"}
                        {index % 5 === 3 && "Student Community"}
                        {index % 5 === 4 && "Regular Workshops"}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with Slider */}
      <section className="w-full py-12 md:py-24 bg-red-50 dark:bg-gray-900/50">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-4 text-center mb-12"
          >
            <div className="inline-block p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
              <Award className="h-6 w-6 text-red-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What People Say</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Hear from our students, alumni, and industry partners
              </p>
            </div>
          </motion.div>

          <div className="relative max-w-3xl mx-auto overflow-hidden">
            <div className="relative h-[300px]">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{
                    opacity: currentSlide === index ? 1 : 0,
                    x: currentSlide === index ? 0 : 100,
                    display: currentSlide === index ? "block" : "none",
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col justify-center"
                >
                  <div className="mb-6">
                    <svg className="h-10 w-10 text-red-600/30" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>
                  <p className="text-lg mb-6 italic">{testimonial.quote}</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    currentSlide === index ? "bg-red-600" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Animations */}
      <section className="w-full py-12 md:py-24 bg-red-50 dark:bg-gray-950" ref={featuresRef}>
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-4 text-center mb-12"
          >
            <div className="inline-block p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
              <Brain className="h-6 w-6 text-red-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Choose Us</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Excellence in data science education and research
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={featuresInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                transition={{ delay: 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 p-3 bg-red-100 dark:bg-red-900/30 rounded-full h-14 w-14 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Expert Faculty</h3>
                  <p className="text-muted-foreground">
                    Learn from industry experts and researchers with extensive experience in data science and AI.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                transition={{ delay: 0.2 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 p-3 bg-red-100 dark:bg-red-900/30 rounded-full h-14 w-14 flex items-center justify-center">
                  <Database className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">State-of-the-art Labs</h3>
                  <p className="text-muted-foreground">
                    Access cutting-edge computing resources and software for hands-on learning.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                transition={{ delay: 0.3 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 p-3 bg-red-100 dark:bg-red-900/30 rounded-full h-14 w-14 flex items-center justify-center">
                  <BarChart2 className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Industry Connections</h3>
                  <p className="text-muted-foreground">
                    Strong partnerships with leading companies for internships and job placements.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={featuresInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-rose-500/20 rounded-xl blur-xl opacity-70 dark:opacity-30"></div>
              <div className="relative bg-red-50 dark:bg-gray-800 rounded-xl overflow-hidden border shadow-xl group">
                <div className="overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=1000&auto=format&fit=crop" 
                    alt="Advanced Computing Lab" 
                    width={800}
                    height={450}
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ objectPosition: "center" }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold">Advanced Computing Lab</h3>
                    <p className="text-sm opacity-90">Students working on real-world data science projects</p>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={featuresInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg border-4 border-white dark:border-gray-800"
              >
                <Award className="h-10 w-10 text-red-600" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Top Data Science Companies Section */}
      <section className="w-full py-12 md:py-16 bg-red-50 dark:bg-gray-950 border-t border-b">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-4 text-center mb-8"
          >
            <div className="inline-block p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
              <BarChart2 className="h-6 w-6 text-red-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Top Data Science Companies</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Leading organizations in the field of data science and analytics
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 items-center justify-items-center"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-red-50 dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-center h-40 w-full"
            >
              <img 
                src="https://logos-world.net/wp-content/uploads/2021/10/Meta-Logo.png" 
                alt="Meta" 
                className="h-auto w-4/5 object-contain" 
                loading="lazy"
              />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-red-50 dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-center h-40 w-full"
            >
              <img 
                src="https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png" 
                alt="Google" 
                className="h-auto w-4/5 object-contain" 
                loading="lazy"
              />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-red-50 dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-center h-40 w-full"
            >
              <img 
                src="https://logos-world.net/wp-content/uploads/2020/09/Microsoft-Logo.png" 
                alt="Microsoft" 
                className="h-auto w-4/5 object-contain" 
                loading="lazy"
              />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-red-50 dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-center h-40 w-full"
            >
              <img 
                src="https://logos-world.net/wp-content/uploads/2020/09/IBM-Logo.png" 
                alt="IBM" 
                className="h-auto w-4/5 object-contain" 
                loading="lazy"
              />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-red-50 dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-center h-40 w-full"
            >
              <img 
                src="https://logos-world.net/wp-content/uploads/2021/10/Tableau-Logo.png" 
                alt="Tableau" 
                className="h-auto w-4/5 object-contain" 
                loading="lazy"
              />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-red-50 dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-center h-40 w-full"
            >
              <img 
                src="https://logos-world.net/wp-content/uploads/2021/08/Amazon-Web-Services-AWS-Emblem.png" 
                alt="AWS" 
                className="h-auto w-4/5 object-contain" 
                loading="lazy"
              />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-red-50 dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-40 w-full"
            >
              <div className="text-3xl font-bold text-red-600 tracking-tight">DataRobot</div>
              <div className="text-sm text-gray-500 mt-2">Enterprise AI Platform</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-red-50 dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-40 w-full"
            >
              <div className="text-3xl font-bold text-gray-800 dark:text-gray-200 tracking-tight">Palantir</div>
              <div className="text-sm text-gray-500 mt-2">Data Analytics Platform</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Us Form Section */}
      <section className="w-full py-12 md:py-24 bg-red-50/80 dark:bg-red-950/20 overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1 }}
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-red-300/30 to-pink-300/30 dark:from-red-700/20 dark:to-pink-700/20 blur-3xl"
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-pink-300/30 to-red-300/30 dark:from-pink-700/20 dark:to-red-700/20 blur-3xl"
          />
        </div>

        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-4 text-center mb-12"
          >
            <div className="inline-block p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Get In Touch</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-red-100 dark:border-red-800/30">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="flex h-12 w-full rounded-md border border-red-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:ring-red-600"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="flex h-12 w-full rounded-md border border-red-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:ring-red-600"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Contact Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="flex h-12 w-full rounded-md border border-red-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:ring-red-600"
                      placeholder="Enter your contact number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Subject
                    </label>
                    <select
                      id="subject"
                      className="flex h-12 w-full rounded-md border border-red-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:ring-red-600"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>Select a subject</option>
                      <option value="admission">Admission Inquiry</option>
                      <option value="course">Course Information</option>
                      <option value="faculty">Faculty Contact</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="flex min-h-[120px] w-full rounded-md border border-red-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:ring-red-600"
                      placeholder="Enter your message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  
                  {formStatus && (
                    <div className={`p-3 rounded-md ${
                      formStatus.success 
                        ? 'bg-green-50 text-green-800 border border-green-200' 
                        : formStatus.loading 
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                      {formStatus.loading 
                        ? 'Sending your message...' 
                        : formStatus.message}
                    </div>
                  )}
                  
                  <Button 
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-300 mt-2"
                    disabled={formStatus?.loading}
                  >
                    {formStatus?.loading ? 'Submitting...' : 'Submit Message'}
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, repeatType: "loop", duration: 1.5 }}
                      className="ml-2"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.span>
                  </Button>
                </form>
              </div>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-red-100 dark:border-red-800/30"
              >
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                    <GraduationCap className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Department of Data Science</h3>
                    <p className="text-gray-600 dark:text-gray-300">Yashavantrao Chavan Institute of Science</p>
                    <p className="text-gray-600 dark:text-gray-300 mt-4">123 University Road<br />Satara, Maharashtra 415001</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-red-100 dark:border-red-800/30"
              >
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <a href="mailto:datascience@ycis.edu" className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">datascience@ycis.edu</a>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <a href="tel:+919876543210" className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">+91 98765 43210</a>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                      </svg>
                    </div>
                    <a href="https://ycis.edu/datascience" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">www.ycis.edu/datascience</a>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-red-100 dark:border-red-800/30"
              >
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                    <Clock className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Office Hours</h3>
                    <p className="text-gray-600 dark:text-gray-300">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p className="text-gray-600 dark:text-gray-300">Saturday: 9:00 AM - 1:00 PM</p>
                    <p className="text-gray-600 dark:text-gray-300">Sunday: Closed</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

