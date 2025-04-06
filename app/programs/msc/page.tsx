"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, BookOpen, Clock, Award, Brain } from "lucide-react"
import Link from "next/link"

export default function MSCPage() {
  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30">
      <div className="container px-4 mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm font-medium mb-4">
            Postgraduate Program
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            M.Sc. in <span className="text-indigo-600 dark:text-indigo-400">Data Science</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Advance your career with our intensive two-year postgraduate program in Data Science and Analytics.
          </p>
        </div>

        {/* Key Program Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-purple-100 dark:border-purple-900/30">
            <CardHeader className="flex flex-row items-center space-x-2">
              <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <div>
                <CardTitle>Limited Seats</CardTitle>
                <CardDescription>Exclusive Intake Capacity</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">20</p>
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
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">2 Years</p>
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
              <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Master of Science</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Advanced Data Science</p>
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
                Our M.Sc. in Data Science program offers an advanced curriculum designed for aspiring data scientists and analysts. With a limited intake of 20 students, we ensure personalized attention and hands-on experience with cutting-edge technologies and real-world projects.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Advanced Focus Areas:</h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                    <li>Advanced Machine Learning & Deep Learning</li>
                    <li>Big Data Analytics & Cloud Computing</li>
                    <li>Natural Language Processing</li>
                    <li>Computer Vision & AI</li>
                    <li>Research Methodology & Ethics</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Career Prospects:</h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                    <li>Senior Data Scientist</li>
                    <li>Machine Learning Engineer</li>
                    <li>AI Research Scientist</li>
                    <li>Data Science Team Lead</li>
                    <li>Analytics Consultant</li>
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
                Download our comprehensive M.Sc. Data Science I NEP 2.0 syllabus to explore the detailed course structure, subjects, and learning outcomes.
              </p>
              <div className="flex justify-center">
                <a 
                  href="https://www.dropbox.com/scl/fi/8fdbzaaoocfuump6bsd3j/M.Sc.-I-NEP-Syllabus-2.0.pdf?rlkey=o4s7ovwkqnj23riirkef651uo&st=49rnpla2&dl=1"
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