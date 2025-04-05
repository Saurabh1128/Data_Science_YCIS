"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, GraduationCap, BookOpen, Users, Brain, Search, Filter } from "lucide-react"

interface FacultyMember {
  id: number
  name: string
  position: string
  department: string
  specialization: string[]
  education: string[]
  research_interests: string[]
  email: string
  phone: string
  image: string
  publications: number
  experience: number
}

export default function FacultyPage() {
  const faculty: FacultyMember[] = [
    {
      id: 1,
      name: "Dr. Rajesh Sharma",
      position: "Head of Department",
      department: "Data Science",
      specialization: ["Machine Learning", "Deep Learning", "Computer Vision"],
      education: [
        "Ph.D. in Computer Science, IIT Bombay",
        "M.Tech in Computer Science, IIT Delhi",
      ],
      research_interests: [
        "Deep Learning Applications",
        "Computer Vision",
        "Natural Language Processing",
      ],
      email: "rajesh.sharma@ycis.edu.in",
      phone: "+91 98765 43210",
      image: "/placeholder.svg?height=400&width=400",
      publications: 45,
      experience: 15,
    },
    {
      id: 2,
      name: "Dr. Priya Patel",
      position: "Associate Professor",
      department: "Data Science",
      specialization: ["Big Data Analytics", "Data Mining", "Statistical Learning"],
      education: [
        "Ph.D. in Data Science, IISc Bangalore",
        "M.Sc in Statistics, Delhi University",
      ],
      research_interests: [
        "Big Data Analytics",
        "Data Mining",
        "Machine Learning Applications",
      ],
      email: "priya.patel@ycis.edu.in",
      phone: "+91 98765 43211",
      image: "/placeholder.svg?height=400&width=400",
      publications: 30,
      experience: 10,
    },
    {
      id: 3,
      name: "Dr. Amit Verma",
      position: "Assistant Professor",
      department: "Data Science",
      specialization: ["Natural Language Processing", "AI", "Text Mining"],
      education: [
        "Ph.D. in AI, IIT Madras",
        "M.Tech in Computer Science, NIT Trichy",
      ],
      research_interests: [
        "Natural Language Processing",
        "Text Analytics",
        "Information Retrieval",
      ],
      email: "amit.verma@ycis.edu.in",
      phone: "+91 98765 43212",
      image: "/placeholder.svg?height=400&width=400",
      publications: 25,
      experience: 8,
    },
    {
      id: 4,
      name: "Prof. Neha Gupta",
      position: "Assistant Professor",
      department: "Data Science",
      specialization: ["Statistical Learning", "Data Visualization", "Predictive Analytics"],
      education: [
        "M.Tech in Data Science, IIT Kharagpur",
        "B.Tech in Computer Science, NIT Warangal",
      ],
      research_interests: [
        "Statistical Learning",
        "Data Visualization",
        "Business Analytics",
      ],
      email: "neha.gupta@ycis.edu.in",
      phone: "+91 98765 43213",
      image: "/placeholder.svg?height=400&width=400",
      publications: 15,
      experience: 5,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 dark:from-purple-900/40 dark:to-indigo-900/40" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Faculty
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Meet our distinguished faculty members who are experts in various domains of data science.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {faculty.map((member) => (
              <motion.div key={member.id} variants={itemVariants}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{member.name}</CardTitle>
                        <CardDescription>{member.position}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {member.specialization.map((spec, index) => (
                        <Badge key={index} variant="secondary">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <span>{member.education[0]}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{member.phone}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{member.publications} Publications</span>
                      <span>{member.experience} Years Experience</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/faculty/${member.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        View Profile
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}