'use client';

import Link from 'next/link';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  GraduationCap, 
  FileText,
  Users,
  Building,
  ArrowLeft
} from 'lucide-react';

export default function BSCDataSciencePage() {
  const programInfo = {
    name: "B.Sc. Data Science",
    duration: "3 Years (6 Semesters)",
    eligibility: "10+2 with Mathematics or equivalent",
    intake: 60,
    fee: "₹50,000 per annum",
    accreditation: "UGC recognized under NEP 2.0"
  };

  const programFeatures = [
    "Interdisciplinary curriculum as per NEP 2.0 guidelines",
    "Focus on practical applications and hands-on experience",
    "Multiple exit options with appropriate certification",
    "Academic bank of credits (ABC) implementation",
    "Industry-aligned curriculum with internship opportunities",
    "Research projects and industry interaction"
  ];

  const courseStructure = [
    {
      year: "First Year",
      semesters: [
        {
          name: "Semester I",
          courses: [
            "Fundamentals of Mathematics for Data Science",
            "Introduction to Computer Programming",
            "Basic Statistics",
            "Data Science NEP 2.0 Framework",
            "English Communication Skills",
            "Environmental Studies"
          ]
        },
        {
          name: "Semester II",
          courses: [
            "Linear Algebra and Calculus",
            "Advanced Programming Concepts",
            "Probability Theory",
            "Database Management Systems",
            "Scientific Research Methodology",
            "Indian Knowledge Systems"
          ]
        }
      ]
    },
    {
      year: "Second Year",
      semesters: [
        {
          name: "Semester III",
          courses: [
            "Data Structures and Algorithms",
            "Statistical Methods",
            "Machine Learning Fundamentals",
            "Data Science NEP 2.0 Applications",
            "Web Development for Data Science",
            "Ethics in Data Science"
          ]
        },
        {
          name: "Semester IV",
          courses: [
            "Database Design and Administration",
            "Big Data Technologies",
            "Data Visualization Techniques",
            "Multivariate Analysis",
            "Deep Learning Introduction",
            "Minor Project"
          ]
        }
      ]
    },
    {
      year: "Third Year",
      semesters: [
        {
          name: "Semester V",
          courses: [
            "Advanced Machine Learning",
            "Data Mining and Pattern Recognition",
            "Cloud Computing for Data Science",
            "Natural Language Processing",
            "Operations Research",
            "Industry Internship"
          ]
        },
        {
          name: "Semester VI",
          courses: [
            "Advanced Big Data Analytics",
            "Artificial Intelligence",
            "Data Science Capstone Project",
            "Business Intelligence",
            "Research Methodology",
            "Entrepreneurship Development"
          ]
        }
      ]
    }
  ];

  const learningOutcomes = [
    "Demonstrate proficiency in programming languages and data analysis tools",
    "Apply statistical and mathematical concepts to solve real-world data problems",
    "Design and implement machine learning algorithms for predictive analytics",
    "Develop data visualization solutions to communicate insights effectively",
    "Create data-driven solutions aligned with NEP 2.0 framework",
    "Understand ethical implications and data governance principles"
  ];

  const careerOpportunities = [
    "Data Analyst",
    "Data Engineer",
    "Business Intelligence Analyst",
    "Machine Learning Engineer",
    "Data Visualization Specialist",
    "Research Assistant"
  ];

  return (
    <div className="container py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/department">Department</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>B.Sc. Data Science</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Link href="/department">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Department
        </Button>
      </Link>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold tracking-tight mb-2">{programInfo.name}</h1>
          <p className="text-muted-foreground mb-4">
            A comprehensive undergraduate program designed as per NEP 2.0 guidelines to build strong foundations
            in data science, statistics, and programming with focus on practical applications.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200">
              <Clock className="mr-1 h-3 w-3" />
              {programInfo.duration}
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              <Users className="mr-1 h-3 w-3" />
              {programInfo.intake} seats
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              <Building className="mr-1 h-3 w-3" />
              {programInfo.accreditation}
            </Badge>
          </div>
          <div className="space-y-2">
            <p><strong>Eligibility:</strong> {programInfo.eligibility}</p>
            <p><strong>Fee Structure:</strong> {programInfo.fee}</p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="mr-2 h-5 w-5" />
              Program Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {programFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="structure" className="w-full mb-10">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="structure">Course Structure</TabsTrigger>
          <TabsTrigger value="outcomes">Learning Outcomes</TabsTrigger>
          <TabsTrigger value="careers">Career Opportunities</TabsTrigger>
          <TabsTrigger value="admission">Admission Process</TabsTrigger>
        </TabsList>

        <TabsContent value="structure" className="mt-0 space-y-6">
          <div className="bg-muted/30 p-4 rounded-lg border mb-6">
            <h3 className="text-lg font-medium flex items-center mb-3">
              <BookOpen className="mr-2 h-5 w-5 text-primary" />
              NEP 2.0 Implementation
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              This program is structured according to the National Education Policy (NEP) 2.0 guidelines, offering flexibility, 
              interdisciplinary learning, and multiple entry/exit options with appropriate certification.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-background p-3 rounded-md border">
                <h4 className="font-medium mb-1">After 1 Year</h4>
                <p className="text-xs text-muted-foreground">Certificate in Data Science Fundamentals</p>
              </div>
              <div className="bg-background p-3 rounded-md border">
                <h4 className="font-medium mb-1">After 2 Years</h4>
                <p className="text-xs text-muted-foreground">Diploma in Data Science and Analytics</p>
              </div>
              <div className="bg-background p-3 rounded-md border">
                <h4 className="font-medium mb-1">After 3 Years</h4>
                <p className="text-xs text-muted-foreground">B.Sc. Degree in Data Science</p>
              </div>
            </div>
          </div>
          
          {courseStructure.map((year, yearIndex) => (
            <div key={yearIndex} className="space-y-4">
              <h3 className="text-xl font-semibold">{year.year}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {year.semesters.map((semester, semIndex) => (
                  <Card key={semIndex}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        {semester.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1">
                        {semester.courses.map((course, courseIndex) => (
                          <li key={courseIndex} className="flex items-start text-sm">
                            <span className="text-primary mr-2">•</span>
                            <span>{course}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="outcomes" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Program Learning Outcomes
              </CardTitle>
              <CardDescription>
                Upon successful completion of the B.Sc. Data Science program, students will be able to:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {learningOutcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start">
                    <Badge className="mr-2 min-w-[24px] h-6 flex items-center justify-center rounded-full">
                      {index + 1}
                    </Badge>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="careers" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Career Prospects</CardTitle>
                <CardDescription>
                  The program prepares students for various roles in the data science industry
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {careerOpportunities.map((career, index) => (
                    <div key={index} className="bg-muted p-3 rounded-md flex items-center">
                      <Badge variant="outline" className="mr-2 w-6 h-6 flex items-center justify-center p-0 rounded-full">
                        {index + 1}
                      </Badge>
                      <span className="text-sm">{career}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Industry Partners</CardTitle>
                <CardDescription>
                  Our program has established partnerships with leading organizations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Students benefit from industry exposure through internships, workshops, and guest lectures
                  from our partner organizations.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {['Company 1', 'Company 2', 'Company 3', 'Company 4', 'Company 5', 'Company 6'].map(
                    (company, index) => (
                      <div key={index} className="aspect-video bg-muted flex items-center justify-center rounded border">
                        <span className="text-xs text-muted-foreground">{company}</span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="admission" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Admission Process</CardTitle>
              <CardDescription>
                Steps to apply for the B.Sc. Data Science program
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Eligibility Criteria</h3>
                <p className="text-sm text-muted-foreground">
                  {programInfo.eligibility}
                </p>
                <p className="text-sm text-muted-foreground">
                  Minimum 50% marks in aggregate (45% for reserved categories)
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Application Process</h3>
                <ol className="space-y-3 mt-2">
                  {[
                    "Complete the online application form on the institute website",
                    "Pay the application fee of ₹500 through online payment gateway",
                    "Upload required documents (10th & 12th marksheets, ID proof, photograph)",
                    "Appear for the entrance examination or interview as scheduled",
                    "Check the merit list published on the institute website",
                    "Complete admission formalities and fee payment within specified timeline"
                  ].map((step, index) => (
                    <li key={index} className="flex items-start">
                      <Badge className="mr-2 min-w-[24px] h-6 flex items-center justify-center rounded-full">
                        {index + 1}
                      </Badge>
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              
              <div className="flex justify-center">
                <Link href="/admissions">
                  <Button className="px-8">Apply Now</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join our B.Sc. Data Science program designed as per NEP 2.0 guidelines and build a strong foundation for a successful career in the data-driven world.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/admissions">
            <Button size="lg" className="px-8">Apply Now</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg">Contact Department</Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 