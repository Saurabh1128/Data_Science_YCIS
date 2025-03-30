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
  Code,
  Laptop,
  Network,
  BarChart,
} from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import LogoSlider from "@/components/logo-slider"
import ImageSlider from "@/components/image-slider"
import ClientOnly from "@/components/client-only"

// Define feature type
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

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
    setFormStatus({ loading: true, message: 'Sending your message...' });
    console.log('Form submission started...');
    
    try {
      console.log('Submitting form data:', formData);
      
      // Create a timeout promise with a longer timeout - increase to 45 seconds to better handle slow connections
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout - the server took too long to respond')), 45000);
      });
      
      // Actual fetch request with additional settings for better reliability
      const fetchPromise = fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        cache: 'no-store',
        // Add longer timeout for fetch
        signal: AbortSignal.timeout(45000),
        // Add keepalive to maintain the connection
        keepalive: true
      });
      
      // Race between fetch and timeout
      const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        // Handle specific HTTP error status codes
        if (response.status === 504) {
          throw new Error('Gateway Timeout (504): The server took too long to respond. Your message may still have been received, but please check the dashboard later or try again.');
        } else if (response.status === 503) {
          throw new Error('Service Unavailable (503): The database is currently unavailable. Please try again later.');
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (data.success) {
        // Only treat as success if the API explicitly returns success: true
        setFormStatus({
          success: true,
          message: data.message || 'Thank you! Your message has been received.'
        });
        
        // Reset form data on success
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        // Handle API-level errors
        throw new Error(data.message || 'Failed to submit message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      let errorMessage = 'Failed to submit message. Please try again later.';
      
      if (error instanceof Error) {
        if (error.message.includes('timeout') || error.message.includes('504')) {
          errorMessage = 'The connection timed out. Your message may still have been received but the server took too long to respond. Please check later or try again.';
        } else if (error.message.includes('fetch') || error.message.includes('network')) {
          errorMessage = 'Network error. Please check your internet connection and try again.';
        } else if (error.message.includes('MongoDB') || error.message.includes('database')) {
          errorMessage = 'Database connection error. Our system is currently having issues connecting to the database. Please try again later.';
        } else {
          errorMessage = `Error: ${error.message}`;
        }
      }
      
      // Show actual error instead of fake success
      setFormStatus({
        success: false,
        message: errorMessage
      });
    }
  };

  // Define features array
  const features: Feature[] = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Comprehensive Curriculum",
      description: "Our program covers all aspects of data science, from statistics and programming to machine learning and visualization."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Expert Faculty",
      description: "Learn from industry professionals and academic experts with years of experience in the field of data science."
    },
    {
      icon: <Laptop className="h-6 w-6" />,
      title: "Hands-on Learning",
      description: "Gain practical experience through real-world projects, case studies, and industry collaborations."
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Modern Tools & Technologies",
      description: "Work with the latest tools and technologies used in the data science industry, staying ahead of the curve."
    },
    {
      icon: <Network className="h-6 w-6" />,
      title: "Industry Connections",
      description: "Build your professional network with industry partners, alumni, and guest speakers from leading companies."
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Research Opportunities",
      description: "Engage in cutting-edge research projects that contribute to the field of data science and analytics."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background with gradient and overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-800"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] mix-blend-overlay opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_60%)]"></div>
        
        {/* Hero Content */}
        <div className="container relative px-4 py-20 md:py-32 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white mb-6 leading-tight">
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-indigo-100">
                  Sarupuria School of 
                </span>
                <span className="block mt-2 text-white drop-shadow-md">Data Science</span>
              </h1>
              <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-xl mx-auto lg:mx-0">
                Empowering the next generation of data scientists with cutting-edge education, research opportunities, and industry connections.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link href="/courses">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 border-none text-white hover:from-purple-700 hover:to-indigo-700">
                    Explore Courses
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="text-white border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20">
                    Contact Us
                  </Button>
                </Link>
              </div>
              
              <div className="mt-10 flex items-center justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-indigo-800 overflow-hidden bg-gradient-to-b from-indigo-200 to-indigo-400`}>
                      <div className="w-full h-full bg-[url('/placeholder.svg?height=50&width=50')] bg-cover"></div>
                    </div>
                  ))}
                </div>
                <div className="ml-4 text-sm text-indigo-100">
                  Join <span className="font-semibold text-white">500+</span> students building their future
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg blur-sm opacity-75"></div>
              <div className="relative bg-black/40 backdrop-blur-sm rounded-lg p-2 border border-white/10">
                <div className="aspect-video w-full bg-[url('/placeholder.svg?height=720&width=1280')] rounded overflow-hidden">
                  {/* Video thumbnail or placeholder */}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 cursor-pointer hover:bg-white/20 transition-colors">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path 
              fill="#ffffff" 
              fillOpacity="1" 
              d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,53.3C840,53,960,75,1080,80C1200,85,1320,75,1380,69.3L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
              className="dark:fill-gray-900"
            ></path>
          </svg>
        </div>
      </section>

      {/* Programs section */}
      <section className="py-16 bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-950/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm font-medium mb-4">
              Academic Excellence
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Academic <span className="text-indigo-600 dark:text-indigo-400">Programs</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our carefully designed programs that prepare students for the challenges of tomorrow's data-driven world.
            </p>
          </div>

          {/* Continue with the rest of your programs section */}
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-16 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What Our <span className="text-purple-600 dark:text-purple-400">Students Say</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Hear from our students about their experiences and success stories.
            </p>
          </div>

          {/* Continue with the rest of your testimonials section */}
        </div>
      </section>

      {/* Faculty section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our <span className="text-indigo-600 dark:text-indigo-400">Faculty</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Learn from industry professionals and academic experts with years of experience.
            </p>
          </div>

          {/* Continue with the rest of your faculty section */}
        </div>
      </section>
    </div>
  )
}

