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
import CoverFlowSlider from "@/components/image-slider"
import { ClientOnly } from "@/components/client-only"
import { Phone as PhoneIcon, Mail as MailIcon, MapPin as MapPinIcon } from "lucide-react"

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
    
    if (formStatus?.loading) return;
    
    setFormStatus({ loading: true });
    
    try {
      // Create a timeout promise with a longer timeout - increase to 45 seconds to better handle slow connections
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timed out')), 45000);
      });
      
      // Make sure API key is only used client-side
      const apiKey = '9475546b-9679-428d-b4f2-d97f312a2153';
      
      // Create the fetch promise - only runs on client
      const fetchPromise = fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify(formData),
        // Add keepalive to maintain the connection
        keepalive: true
      });
      
      // Race the fetch against the timeout
      const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;
      
      // Check if the response is OK
      if (!response.ok) {
        throw new Error('Service Unavailable (503): The database is currently unavailable. Please try again later.');
      }
      
      const data = await response.json();
      
      // Reset the form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setFormStatus({
        success: true,
        message: data.message || 'Thank you for your message. We will get back to you soon.'
      });
      
      // Clear success message after 10 seconds
      setTimeout(() => {
        setFormStatus(null);
      }, 10000);
      
    } catch (error) {
      let errorMessage = '';
      
      if (error instanceof Error) {
        if (error.message.includes('timed out')) {
          errorMessage = 'The connection timed out. Your message may still have been received but the server took too long to respond. Please check later or try again.';
        } else if (error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your internet connection and try again.';
        } else if (error.message.includes('MongoDB') || error.message.includes('database')) {
          errorMessage = 'Database connection error. Our system is currently having issues connecting to the database. Please try again later.';
        } else {
          errorMessage = error.message;
        }
      } else {
        errorMessage = 'An unknown error occurred. Please try again later.';
      }
      
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

      {/* Contact Us Section - Wrapped with ClientOnly to prevent hydration errors */}
      <ClientOnly>
        <section id="contact" className="px-4 py-16 bg-gradient-to-b from-purple-600 to-white">
          <div className="container mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Contact Us</h2>
              <p className="mt-4 text-lg text-gray-500">
                Have questions about our data science program? Get in touch with us!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <p className="flex items-center gap-3">
                    <PhoneIcon className="h-5 w-5 text-indigo-600" />
                    <span>+91 123-456-7890</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <MailIcon className="h-5 w-5 text-indigo-600" />
                    <span>info@ycis-datascience.edu</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <MapPinIcon className="h-5 w-5 text-indigo-600" />
                    <span>YCIS Campus, Mumbai, India</span>
                  </p>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={formStatus?.loading}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
                      formStatus?.loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    {formStatus?.loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
                
                {formStatus && (
                  <div
                    className={`mt-4 p-3 rounded-md ${
                      formStatus.success
                        ? 'bg-green-50 border border-green-200 text-green-800'
                        : 'bg-red-50 border border-red-200 text-red-800'
                    }`}
                  >
                    {formStatus.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </ClientOnly>

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

