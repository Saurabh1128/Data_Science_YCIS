"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, BookOpen, Clock, Award, Brain } from "lucide-react"
import Link from "next/link"

export default function BSCPage() {
  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30">
      <div className="container px-4 mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm font-medium mb-4">
            Undergraduate Program
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            B.Sc. in <span className="text-indigo-600 dark:text-indigo-400">Data Science</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Embark on a journey to become a data scientist with our comprehensive three-year undergraduate program.
          </p>
        </div>

        {/* Key Program Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-purple-100 dark:border-purple-900/30">
            <CardHeader className="flex flex-row items-center space-x-2">
              <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <div>
                <CardTitle>Seats Available</CardTitle>
                <CardDescription>Total Intake Capacity</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">120</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Students per Academic Year</p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-purple-100 dark:border-purple-900/30">
            <CardHeader className="flex flex-row items-center space-x-2">
              <Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <div>
                <CardTitle>Duration</CardTitle>
                <CardDescription>Program Length</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">3 Years</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Full-time Program</p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-purple-100 dark:border-purple-900/30">
            <CardHeader className="flex flex-row items-center space-x-2">
              <Award className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <div>
                <CardTitle>Degree</CardTitle>
                <CardDescription>Qualification Awarded</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Bachelor of Science</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Specialization in Data Science</p>
            </CardContent>
          </Card>
        </div>

        {/* Program Overview */}
        <div className="mb-12">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-purple-100 dark:border-purple-900/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                <span>Program Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Our B.Sc. in Data Science program is designed to provide students with a strong foundation in data science, statistics, and programming. The curriculum combines theoretical knowledge with practical applications, preparing graduates for successful careers in the data-driven world.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Key Focus Areas:</h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                    <li>Statistical Analysis and Mathematics</li>
                    <li>Programming and Software Development</li>
                    <li>Machine Learning and AI</li>
                    <li>Data Visualization</li>
                    <li>Big Data Analytics</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Career Opportunities:</h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                    <li>Data Scientist</li>
                    <li>Data Analyst</li>
                    <li>Business Intelligence Analyst</li>
                    <li>Machine Learning Engineer</li>
                    <li>Research Analyst</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Syllabus Section */}
        <div className="mb-12">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-purple-100 dark:border-purple-900/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                <span>Program Syllabus</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Download our comprehensive B.Sc. Data Science I NEP 2.0 syllabus to explore the detailed course structure, subjects, and learning outcomes.
              </p>
              <div className="flex justify-center">
                <a 
                  href="https://www.dropbox.com/scl/fi/y8zx57d7uu9jbp8smsaad/B.Sc.-I-NEP-Syllabus-2.0.pdf?rlkey=z52b0oh0421kjwr0cimw8r8gk&st=6lqae9ze&dl=1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Download Syllabus (PDF)
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link href="/contact">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700">
              Apply Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}