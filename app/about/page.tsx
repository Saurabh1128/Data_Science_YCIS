"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, BookOpen, GraduationCap, Users, Brain, Target, History, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  // Department statistics
  const stats = [
    { label: "Students", value: "140+", icon: <Users className="h-6 w-6 text-purple-600" /> },
    { label: "Faculty Members", value: "12", icon: <GraduationCap className="h-6 w-6 text-purple-600" /> },
    { label: "Research Papers", value: "25+", icon: <BookOpen className="h-6 w-6 text-purple-600" /> },
    { label: "Awards", value: "15", icon: <Award className="h-6 w-6 text-purple-600" /> }
  ]

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
              About Our Department
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Empowering the next generation of data scientists through cutting-edge education and research.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision and Mission Section */}
      <section className="py-12 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Target className="h-6 w-6 text-purple-600" />
                  <CardTitle>Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  To be a leading center of excellence in data science education and research, fostering innovation and producing skilled professionals who can tackle real-world challenges through data-driven solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Brain className="h-6 w-6 text-purple-600" />
                  <CardTitle>Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  To provide comprehensive education in data science, conduct cutting-edge research, and collaborate with industry partners to prepare students for successful careers in the rapidly evolving field of data analytics.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <History className="h-8 w-8 text-purple-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our History</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Established in 2022, our department has quickly grown to become a hub for data science education and research.
              </p>
            </div>

            <div className="space-y-8">
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-24 text-sm font-semibold text-purple-600">2022</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Department Establishment</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        The Department of Data Science was established with a vision to provide quality education in the field of data science and analytics.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-24 text-sm font-semibold text-purple-600">2023</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Program Expansion</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Launched MSc program in Data Science and established partnerships with leading tech companies.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-24 text-sm font-semibold text-purple-600">2024</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Research Excellence</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Established research centers and published numerous papers in prestigious journals.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Join Our Department</h2>
            <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
              Be part of our growing community of data scientists and researchers.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/programs">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50">
                  Explore Programs <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}