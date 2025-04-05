"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Monitor, Server, Cpu, Database, Projector, Laptop, Network, HardDrive } from "lucide-react"

export default function FacilitiesPage() {
  const facilities = [
    {
      id: 1,
      name: "Advanced Computer Labs",
      description: "State-of-the-art computer laboratories equipped with high-performance workstations",
      specs: [
        "Intel Core i7/i9 Processors",
        "16GB DDR4 RAM",
        "512GB SSD Storage",
        "NVIDIA Graphics Cards",
        "24-inch HD Monitors"
      ],
      icon: <Laptop className="h-8 w-8" />,
      capacity: "60 Workstations"
    },
    {
      id: 2,
      name: "Data Center",
      description: "Modern data center facility for big data processing and research",
      specs: [
        "High-Performance Servers",
        "Enterprise Storage Solutions",
        "High-Speed Network Infrastructure",
        "24/7 Monitoring System",
        "Backup Power Supply"
      ],
      icon: <Server className="h-8 w-8" />,
      capacity: "100TB Storage"
    },
    {
      id: 3,
      name: "Smart Classrooms",
      description: "Technology-enabled classrooms for enhanced learning experience",
      specs: [
        "HD Projectors",
        "Interactive Smart Boards",
        "Surround Sound System",
        "Document Cameras",
        "Wireless Presentation Systems"
      ],
      icon: <Projector className="h-8 w-8" />,
      capacity: "60 Students"
    },
    {
      id: 4,
      name: "Research Lab",
      description: "Specialized laboratory for advanced research and development",
      specs: [
        "GPU Computing Clusters",
        "Research Workstations",
        "Specialized Software Tools",
        "Collaboration Spaces",
        "Video Conferencing Setup"
      ],
      icon: <Cpu className="h-8 w-8" />,
      capacity: "30 Researchers"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
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
              Our Facilities
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore our state-of-the-art facilities designed to provide the best learning and research environment for our students and faculty.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 md:grid-cols-2"
          >
            {facilities.map((facility) => (
              <motion.div key={facility.id} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 dark:bg-primary/20">
                        {facility.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{facility.name}</CardTitle>
                        <CardDescription>{facility.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Specifications:</h4>
                        <ul className="space-y-2">
                          {facility.specs.map((spec, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                              {spec}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Badge variant="secondary" className="mt-4">
                        Capacity: {facility.capacity}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}