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
import CoverFlowSlider from "@/components/image-slider"

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

  // Sample images for the slider with more reliable direct links
  const sliderImages = [
    {
      src: "https://dl.dropboxusercontent.com/scl/fi/s8bn6bzbn23dfxkcwthel/YC_FAIR_PRIZE.jpg?rlkey=p9dtzqv1vumc1cu8citku2ljf&dl=1",
      alt: "Science Fair Prize Winners",
      title: "Award-Winning Research",
      description: "Our students excel in national and regional science competitions"
    },
    {
      src: "https://dl.dropboxusercontent.com/scl/fi/c6noqoy7jxwsfqcb03atg/SPORT.jpg?rlkey=0150mgizvy8lqk57ucj5ip2uc&dl=1",
      alt: "Sports Activities",
      title: "Balanced Student Life",
      description: "We encourage physical activities alongside academic excellence"
    },
    {
      src: "https://dl.dropboxusercontent.com/scl/fi/mylleeyh58k39actn2md0/ACTIVITY.jpg?rlkey=ok10qyxk399y3uq4v98m7e33f&dl=1",
      alt: "Student Activities",
      title: "Engaging Extracurriculars",
      description: "Participate in diverse activities that enhance your learning experience"
    },
    {
      src: "https://dl.dropboxusercontent.com/scl/fi/0mwz9df15emq2idbwqs4r/MSC_LAB.jpg?rlkey=cai82fn7uh8zj2y3351f96sto&dl=1",
      alt: "MSc Data Science Laboratory",
      title: "Advanced Computing Labs",
      description: "State-of-the-art facilities for postgraduate research"
    },
    {
      src: "https://dl.dropboxusercontent.com/scl/fi/5x83twmxh6nnlghly11sp/BSC_LAB.jpg?rlkey=68ivvavqm1666i5cja15svutc&dl=1",
      alt: "BSc Data Science Laboratory",
      title: "Undergraduate Facilities",
      description: "Modern computing labs for hands-on learning experience"
    },
    {
      src: "/placeholder.svg?height=600&width=800&text=Industry+Connections",
      alt: "Industry Connections",
      title: "Industry Partnerships",
      description: "Connect with leading organizations in the field"
    }
  ];

  const [imageLoading, setImageLoading] = useState<{[key: number]: boolean}>({});

  const handleImageLoad = (index: number) => {
    setImageLoading(prev => ({
      ...prev,
      [index]: false
    }));
  };

  const handleImageError = (index: number, e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Prevent infinite loop
    target.src = '/placeholder.svg?height=400&width=800&text=Image+Unavailable';
    setImageLoading(prev => ({
      ...prev,
      [index]: false
    }));
  };

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

  // Subject options for dropdown
  const subjectOptions = [
    { value: "admission", label: "Admission Enquiry" },
    { value: "student-problem", label: "Student Problem" },
    { value: "document", label: "Document Requirement" },
    { value: "feedback", label: "Feedback" },
    { value: "other", label: "Other" }
  ];

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
                  Yashavantrao Chavan Institute of Science
                </span>
                <span className="block mt-2 text-white drop-shadow-md">Data Science</span>
              </h1>
              <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-xl mx-auto lg:mx-0">
                Empowering the next generation of data scientists with cutting-edge education, research opportunities, and industry connections.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link href="/courses">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 border-none text-white hover:from-purple-700 hover:to-indigo-700">
                    Courses
                </Button>
              </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="text-white border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20">
                    Contact Us
                </Button>
              </Link>
              </div>
        </div>

            <div className="hidden lg:block relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg blur-sm opacity-75"></div>
              <div className="relative bg-black/40 backdrop-blur-sm rounded-lg p-2 border border-white/10">
                <div className="aspect-video w-full rounded overflow-hidden">
                  <img 
                    src="https://dl.dropboxusercontent.com/scl/fi/5xuw24pm5f7beid2z4j34/IMG20240921173243.jpg?rlkey=g9p1nwioket56s4lz8ihtz2xk&dl=1" 
                    alt="Department of Data Science Students and Faculty" 
                    className="w-full h-full object-cover"
                    width={1280}
                    height={720}
                    loading="eager"
                    style={{ objectPosition: "center 20%" }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/placeholder.svg?height=720&width=1280&text=Department+Image';
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent"></div>
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

      {/* Cover Flow Slider Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm font-medium mb-4">
              Explore Our World
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Discover the <span className="text-indigo-600 dark:text-indigo-400">Data Science</span> Experience
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Take a visual journey through our programs, facilities, and student life
            </p>
          </div>
        </div>
        
        {/* Mobile slider with improved image loading */}
        <div className="block lg:hidden mb-4">
          <div className="overflow-x-auto pb-4 px-4">
            <div className="flex space-x-4">
              {sliderImages.map((image, index) => (
                <div key={index} className="min-w-[85vw] rounded-xl overflow-hidden shadow-md">
                  <div className="relative aspect-[16/9] bg-gray-200 dark:bg-gray-700">
                    {imageLoading[index] !== false && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-t-indigo-600 border-indigo-200 rounded-full animate-spin"></div>
                      </div>
                    )}
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onLoad={() => handleImageLoad(index)}
                      onError={(e) => handleImageError(index, e)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{image.title}</h3>
                      <p className="text-sm text-white/80">{image.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="hidden lg:block">
          <CoverFlowSlider images={sliderImages} />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm font-medium mb-4">
              Our Advantages
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose <span className="text-indigo-600 dark:text-indigo-400">Our Program</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our data science program offers unique advantages designed to prepare you for success in the evolving data landscape.
            </p>
          </div>
          
          {/* Feature cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature: Feature, index: number) => (
              <div 
                key={index}
                className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Form Section */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/30 dark:to-gray-900">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-block px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm font-medium mb-4">
                Get In Touch
            </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Contact <span className="text-indigo-600 dark:text-indigo-400">Our Department</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Have questions about our programs? We're here to help you on your journey toward a career in data science.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 md:p-8 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
                  <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-white/20 p-2 rounded-lg mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-sm text-white/80 mt-1">Yashavantrao Chavan Institute of Science, Satara</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-white/20 p-2 rounded-lg mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                  </div>
                  <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-white/80 mt-1">datascienceycis@example.com</p>
                      </div>
                  </div>
                    <div className="flex items-start">
                      <div className="bg-white/20 p-2 rounded-lg mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                  </div>
                  <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-sm text-white/80 mt-1">+91 1234567890</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-12">
                    <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
                    <div className="flex space-x-3">
                      <a href="#" className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                        </svg>
                      </a>
                      <a href="#" className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                      </a>
                      <a href="#" className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </a>
                      <a href="#" className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                  </div>
                  </div>
        </div>
                
                <div className="p-6 md:p-8">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required 
                        />
            </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required 
                        />
            </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Your phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                  </div>
                  <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                        <select 
                          id="subject" 
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="" disabled>Select a subject</option>
                          {subjectOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                  </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                        <textarea 
                          id="message" 
                          rows={4} 
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Your message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                        ></textarea>
            </div>

                      {formStatus && (
                        <div className={`p-3 rounded-md ${formStatus.success ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300' : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300'}`}>
                          {formStatus.message}
                        </div>
                      )}
                      
                      <div>
                <button
                          type="submit" 
                          className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70"
                          disabled={formStatus?.loading}
                        >
                          {formStatus?.loading ? 'Sending...' : 'Send Message'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos Section */}
      <section className="py-12 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm font-medium mb-4">
              Industry Partners
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted By <span className="text-indigo-600 dark:text-indigo-400">Industry Leaders</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our graduates work at top companies worldwide. We collaborate with industry leaders to ensure our curriculum meets market demands.
            </p>
          </div>
        </div>
        
        {/* Mobile-optimized Logo Slider */}
        <div className="mt-6 overflow-hidden">
          <div className="flex animate-scroll space-x-6 md:space-x-12 py-6">
            {[1, 2].map((set) => (
              <div key={set} className="flex space-x-6 md:space-x-12 items-center">
                <div className="w-24 md:w-32 h-12 md:h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-2 md:p-3 shadow-sm hover:shadow-md transition-shadow">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1280px-Amazon_Web_Services_Logo.svg.png" alt="AWS" className="h-6 md:h-8 object-contain" loading="lazy" />
                </div>
                <div className="w-24 md:w-32 h-12 md:h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-2 md:p-3 shadow-sm hover:shadow-md transition-shadow">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/2560px-Wipro_Primary_Logo_Color_RGB.svg.png" alt="Wipro" className="h-6 md:h-8 object-contain" loading="lazy" />
                </div>
                <div className="w-24 md:w-32 h-12 md:h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-2 md:p-3 shadow-sm hover:shadow-md transition-shadow">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Cognizant_logo_2022.svg/2560px-Cognizant_logo_2022.svg.png" alt="Cognizant" className="h-6 md:h-8 object-contain" loading="lazy" />
                </div>
                <div className="w-24 md:w-32 h-12 md:h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-2 md:p-3 shadow-sm hover:shadow-md transition-shadow">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1280px-Tata_Consultancy_Services_Logo.svg.png" alt="TCS" className="h-6 md:h-8 object-contain" loading="lazy" />
                </div>
                <div className="w-24 md:w-32 h-12 md:h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-2 md:p-3 shadow-sm hover:shadow-md transition-shadow">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png" alt="Google" className="h-6 md:h-8 object-contain" loading="lazy" />
                </div>
                <div className="w-24 md:w-32 h-12 md:h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-2 md:p-3 shadow-sm hover:shadow-md transition-shadow">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Microsoft_Azure.svg/1200px-Microsoft_Azure.svg.png" alt="Microsoft Azure" className="h-6 md:h-8 object-contain" loading="lazy" />
                </div>
                <div className="w-24 md:w-32 h-12 md:h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-2 md:p-3 shadow-sm hover:shadow-md transition-shadow">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/HCL_Technologies_logo.svg/1280px-HCL_Technologies_logo.svg.png" alt="HCL" className="h-6 md:h-8 object-contain" loading="lazy" />
                </div>
                <div className="w-24 md:w-32 h-12 md:h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-2 md:p-3 shadow-sm hover:shadow-md transition-shadow">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Databricks_logo.svg/1200px-Databricks_logo.svg.png" alt="Databricks" className="h-6 md:h-8 object-contain" loading="lazy" />
                </div>
                <div className="w-24 md:w-32 h-12 md:h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-2 md:p-3 shadow-sm hover:shadow-md transition-shadow">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Jupyter_logo.svg/1200px-Jupyter_logo.svg.png" alt="Jupyter" className="h-6 md:h-8 object-contain" loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-100% - 1.5rem));
            }
          }
          .animate-scroll {
            animation: scroll 25s linear infinite;
          }
          @media (min-width: 768px) {
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(calc(-100% - 3rem));
              }
            }
            .animate-scroll {
              animation: scroll 20s linear infinite;
            }
          }
        `}</style>
      </section>

      {/* Programs section */}
      <section className="py-16 bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-950/30">
        
        {/* ... existing programs section ... */}
        
      </section>

      {/* ... other sections ... */}
    </div>
  )
}

