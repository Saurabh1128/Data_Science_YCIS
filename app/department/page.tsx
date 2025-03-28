import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, GraduationCap, BookOpen, BarChart2, Database, Brain } from "lucide-react"

export default function DepartmentPage() {
  const faculty = [
    {
      id: 1,
      name: "Dr. Rajesh Sharma",
      position: "Head of Department",
      specialization: "Machine Learning, Deep Learning",
      email: "rajesh.sharma@ycis.edu.in",
      phone: "+91 98765 43210",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Dr. Priya Patel",
      position: "Associate Professor",
      specialization: "Big Data Analytics, Data Mining",
      email: "priya.patel@ycis.edu.in",
      phone: "+91 98765 43211",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Dr. Amit Verma",
      position: "Assistant Professor",
      specialization: "Natural Language Processing, AI",
      email: "amit.verma@ycis.edu.in",
      phone: "+91 98765 43212",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      name: "Prof. Neha Gupta",
      position: "Assistant Professor",
      specialization: "Statistical Learning, Data Visualization",
      email: "neha.gupta@ycis.edu.in",
      phone: "+91 98765 43213",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const facilities = [
    {
      id: 1,
      name: "Data Science Lab",
      description:
        "State-of-the-art lab equipped with high-performance computing systems for data analysis and machine learning.",
      icon: <BarChart2 className="h-10 w-10" />,
    },
    {
      id: 2,
      name: "AI Research Center",
      description:
        "Dedicated research center for artificial intelligence and deep learning projects with GPU clusters.",
      icon: <Brain className="h-10 w-10" />,
    },
    {
      id: 3,
      name: "Big Data Lab",
      description: "Specialized lab for big data processing with Hadoop and Spark clusters.",
      icon: <Database className="h-10 w-10" />,
    },
    {
      id: 4,
      name: "Digital Library",
      description:
        "Comprehensive digital library with access to journals, research papers, and e-books in data science.",
      icon: <BookOpen className="h-10 w-10" />,
    },
  ]

  const programs = [
    {
      id: 1,
      name: "B.Sc. Data Science",
      duration: "3 Years",
      description: "Undergraduate program focusing on fundamentals of data science, statistics, and programming.",
      seats: 60,
    },
    {
      id: 2,
      name: "M.Sc. Data Science",
      duration: "2 Years",
      description: "Postgraduate program with advanced courses in machine learning, big data, and AI.",
      seats: 30,
    },
    {
      id: 3,
      name: "Ph.D. in Data Science",
      duration: "3-5 Years",
      description: "Research program for advanced study in specialized areas of data science and AI.",
      seats: 10,
    },
    {
      id: 4,
      name: "PG Diploma in Data Analytics",
      duration: "1 Year",
      description: "Specialized diploma program focusing on practical data analytics skills for industry.",
      seats: 40,
    },
  ]

  return (
    <div className="container py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Department of Data Science</h1>
          <p className="text-muted-foreground mt-2">Yashavantrao Chavan Institute of Science, Satara</p>
        </div>
        <Link href="/contact">
          <Button className="flex gap-2">
            <Mail className="h-4 w-4" />
            Contact Us
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <div className="aspect-video relative overflow-hidden rounded-lg">
          <img
            src="/placeholder.svg?height=400&width=600"
            alt="Department of Data Science"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">About the Department</h2>
          <p className="text-muted-foreground mb-4">
            The Department of Data Science at Yashavantrao Chavan Institute of Science was established in 2018 with a
            vision to become a center of excellence in data science education and research. The department offers
            undergraduate, postgraduate, and doctoral programs in data science and related fields.
          </p>
          <p className="text-muted-foreground mb-4">
            Our curriculum is designed to provide students with a strong foundation in mathematics, statistics, computer
            science, and domain-specific knowledge, enabling them to solve complex real-world problems using data-driven
            approaches.
          </p>
          <div className="flex gap-4 mt-2">
            <Link href="/department/vision">
              <Button variant="outline">Our Vision</Button>
            </Link>
            <Link href="/department/research">
              <Button variant="outline">Research Areas</Button>
            </Link>
          </div>
        </div>
      </div>

      <Tabs defaultValue="faculty" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="faculty">Faculty</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
        </TabsList>

        <TabsContent value="faculty" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2">
            {faculty.map((member) => (
              <Card key={member.id}>
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
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span>{member.specialization}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{member.phone}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/department/faculty/${member.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="programs" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2">
            {programs.map((program) => (
              <Card key={program.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{program.name}</CardTitle>
                    <Badge variant="outline">{program.duration}</Badge>
                  </div>
                  <CardDescription>Available Seats: {program.seats}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{program.description}</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/department/programs/${program.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      Program Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="facilities" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2">
            {facilities.map((facility) => (
              <Card key={facility.id}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">{facility.icon}</div>
                    <CardTitle>{facility.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{facility.description}</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/department/facilities/${facility.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 p-6 border rounded-lg bg-muted/50">
        <h2 className="text-xl font-semibold mb-4">Industry Collaborations</h2>
        <p className="text-muted-foreground mb-6">
          The Department of Data Science has established collaborations with leading industry partners to provide
          students with real-world exposure and research opportunities.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <img src="/placeholder.svg?height=80&width=160" alt="Company 1" className="h-16 object-contain" />
            <span className="text-sm mt-2">Tech Solutions</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/placeholder.svg?height=80&width=160" alt="Company 2" className="h-16 object-contain" />
            <span className="text-sm mt-2">Data Insights</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/placeholder.svg?height=80&width=160" alt="Company 3" className="h-16 object-contain" />
            <span className="text-sm mt-2">AI Research Labs</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/placeholder.svg?height=80&width=160" alt="Company 4" className="h-16 object-contain" />
            <span className="text-sm mt-2">Analytics Pro</span>
          </div>
        </div>
      </div>
    </div>
  )
}

