import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  BookOpen, 
  Search, 
  GraduationCap, 
  Calendar, 
  Clock, 
  Filter,
  ArrowLeft,
  Tag 
} from "lucide-react"

export default function CoursesPage() {
  // Define course data structure
  const programs = [
    {
      id: "bsc",
      name: "B.Sc. Data Science",
      link: "/department/programs/1",
      years: [
        {
          year: "First Year",
          semesters: [
            {
              name: "Semester I",
              courses: [
                {
                  code: "DS101",
                  title: "Fundamentals of Mathematics for Data Science",
                  credits: 4,
                  description: "Introduction to mathematical concepts essential for data science including linear algebra, calculus, and discrete mathematics.",
                  type: "Core",
                  tags: ["Mathematics", "Foundation"]
                },
                {
                  code: "DS102",
                  title: "Introduction to Computer Programming",
                  credits: 4,
                  description: "Fundamentals of programming using Python with emphasis on data processing and algorithmic thinking.",
                  type: "Core",
                  tags: ["Programming", "Python"]
                },
                {
                  code: "DS103",
                  title: "Basic Statistics",
                  credits: 4,
                  description: "Fundamental statistical concepts, descriptive statistics, probability distributions, and statistical inference.",
                  type: "Core",
                  tags: ["Statistics", "Foundation"]
                },
                {
                  code: "DS104",
                  title: "Data Science NEP 2.0 Framework",
                  credits: 3,
                  description: "Overview of data science within the NEP 2.0 framework, focusing on interdisciplinary approaches and credit-based systems.",
                  type: "Core",
                  tags: ["NEP 2.0", "Framework"]
                },
                {
                  code: "DS105",
                  title: "English Communication Skills",
                  credits: 2,
                  description: "Development of effective communication skills for academic and professional contexts in data science.",
                  type: "Ability Enhancement",
                  tags: ["Communication", "Soft Skills"]
                },
                {
                  code: "DS106",
                  title: "Environmental Studies",
                  credits: 2,
                  description: "Introduction to environmental concepts and sustainable development with data-driven approaches.",
                  type: "Ability Enhancement",
                  tags: ["Environment", "Sustainability"]
                }
              ]
            },
            {
              name: "Semester II",
              courses: [
                {
                  code: "DS107",
                  title: "Linear Algebra and Calculus",
                  credits: 4,
                  description: "Advanced concepts in linear algebra and calculus with applications in data science and machine learning.",
                  type: "Core",
                  tags: ["Mathematics", "Advanced"]
                },
                {
                  code: "DS108",
                  title: "Advanced Programming Concepts",
                  credits: 4,
                  description: "Object-oriented programming, data structures, and algorithms with focus on data science applications.",
                  type: "Core",
                  tags: ["Programming", "Advanced"]
                },
                {
                  code: "DS109",
                  title: "Probability Theory",
                  credits: 4,
                  description: "Probability concepts, random variables, probability distributions, and stochastic processes.",
                  type: "Core",
                  tags: ["Statistics", "Probability"]
                },
                {
                  code: "DS110",
                  title: "Database Management Systems",
                  credits: 3,
                  description: "Database design, SQL, NoSQL databases, and data management principles for data science.",
                  type: "Core",
                  tags: ["Database", "SQL"]
                },
                {
                  code: "DS111",
                  title: "Scientific Research Methodology",
                  credits: 2,
                  description: "Research methods, literature review, hypothesis testing, and scientific writing in data science contexts.",
                  type: "Skill Enhancement",
                  tags: ["Research", "Methodology"]
                },
                {
                  code: "DS112",
                  title: "Indian Knowledge Systems",
                  credits: 2,
                  description: "Traditional Indian approaches to knowledge organization and data analysis with modern perspectives.",
                  type: "Value Added",
                  tags: ["Indian Knowledge", "Heritage"]
                }
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
                {
                  code: "DS201",
                  title: "Data Structures and Algorithms",
                  credits: 4,
                  description: "Advanced data structures, algorithm design and analysis with focus on data processing and optimization.",
                  type: "Core",
                  tags: ["Algorithms", "Programming"]
                },
                {
                  code: "DS202",
                  title: "Statistical Methods",
                  credits: 4,
                  description: "Hypothesis testing, ANOVA, regression analysis, and experimental design for data science applications.",
                  type: "Core",
                  tags: ["Statistics", "Advanced"]
                },
                {
                  code: "DS203",
                  title: "Machine Learning Fundamentals",
                  credits: 4,
                  description: "Supervised and unsupervised learning algorithms, feature selection, model evaluation, and validation.",
                  type: "Core",
                  tags: ["Machine Learning", "AI"]
                },
                {
                  code: "DS204",
                  title: "Data Science NEP 2.0 Applications",
                  credits: 3,
                  description: "Practical implementation of data science projects within the NEP 2.0 framework across various domains.",
                  type: "Core",
                  tags: ["NEP 2.0", "Applications"]
                },
                {
                  code: "DS205",
                  title: "Web Development for Data Science",
                  credits: 3,
                  description: "Web technologies for data visualization, dashboards, and interactive data applications.",
                  type: "Skill Enhancement",
                  tags: ["Web Development", "Visualization"]
                },
                {
                  code: "DS206",
                  title: "Ethics in Data Science",
                  credits: 2,
                  description: "Ethical considerations in data collection, analysis, AI, and responsible use of technology.",
                  type: "Value Added",
                  tags: ["Ethics", "Responsible AI"]
                }
              ]
            },
            {
              name: "Semester IV",
              courses: [
                {
                  code: "DS207",
                  title: "Database Design and Administration",
                  credits: 4,
                  description: "Advanced database concepts, database optimization, security, and administration for big data.",
                  type: "Core",
                  tags: ["Database", "Advanced"]
                },
                {
                  code: "DS208",
                  title: "Big Data Technologies",
                  credits: 4,
                  description: "Hadoop ecosystem, Spark, distributed computing, and big data processing techniques.",
                  type: "Core",
                  tags: ["Big Data", "Hadoop"]
                },
                {
                  code: "DS209",
                  title: "Data Visualization Techniques",
                  credits: 3,
                  description: "Principles of data visualization, tools, interactive visualizations, and storytelling with data.",
                  type: "Core",
                  tags: ["Visualization", "Communication"]
                },
                {
                  code: "DS210",
                  title: "Multivariate Analysis",
                  credits: 3,
                  description: "Multivariate statistical methods for analyzing complex datasets with multiple variables.",
                  type: "Core",
                  tags: ["Statistics", "Multivariate"]
                },
                {
                  code: "DS211",
                  title: "Deep Learning Introduction",
                  credits: 3,
                  description: "Neural networks, deep learning architectures, training methodologies and applications.",
                  type: "Skill Enhancement",
                  tags: ["Deep Learning", "AI"]
                },
                {
                  code: "DS212",
                  title: "Minor Project",
                  credits: 4,
                  description: "Small-scale data science project applying concepts learned in previous semesters.",
                  type: "Project",
                  tags: ["Project", "Practical"]
                }
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
                {
                  code: "DS301",
                  title: "Advanced Machine Learning",
                  credits: 4,
                  description: "Advanced ML algorithms, ensemble methods, feature engineering, and practical implementation.",
                  type: "Core",
                  tags: ["Machine Learning", "Advanced"]
                },
                {
                  code: "DS302",
                  title: "Data Mining and Pattern Recognition",
                  credits: 4,
                  description: "Techniques for discovering patterns in large datasets, association rules, and clustering.",
                  type: "Core",
                  tags: ["Data Mining", "Pattern Recognition"]
                },
                {
                  code: "DS303",
                  title: "Cloud Computing for Data Science",
                  credits: 3,
                  description: "Cloud platforms, services, deployment, and management for data science workloads.",
                  type: "Core",
                  tags: ["Cloud", "Infrastructure"]
                },
                {
                  code: "DS304",
                  title: "Natural Language Processing",
                  credits: 3,
                  description: "Text processing, language models, sentiment analysis, and NLP applications.",
                  type: "Core",
                  tags: ["NLP", "Text Analysis"]
                },
                {
                  code: "DS305",
                  title: "Operations Research",
                  credits: 3,
                  description: "Mathematical optimization techniques for decision-making and resource allocation.",
                  type: "Elective",
                  tags: ["Optimization", "Decision Making"]
                },
                {
                  code: "DS306",
                  title: "Industry Internship",
                  credits: 4,
                  description: "Practical work experience in industry settings applying data science concepts.",
                  type: "Internship",
                  tags: ["Internship", "Industry"]
                }
              ]
            },
            {
              name: "Semester VI",
              courses: [
                {
                  code: "DS307",
                  title: "Advanced Big Data Analytics",
                  credits: 4,
                  description: "Advanced techniques for processing and analyzing large-scale datasets in real-time.",
                  type: "Core",
                  tags: ["Big Data", "Analytics"]
                },
                {
                  code: "DS308",
                  title: "Artificial Intelligence",
                  credits: 4,
                  description: "AI concepts, knowledge representation, reasoning, planning, and intelligent agents.",
                  type: "Core",
                  tags: ["AI", "Intelligence"]
                },
                {
                  code: "DS309",
                  title: "Data Science Capstone Project",
                  credits: 6,
                  description: "Comprehensive project demonstrating data science skills and knowledge acquired.",
                  type: "Project",
                  tags: ["Capstone", "Project"]
                },
                {
                  code: "DS310",
                  title: "Business Intelligence",
                  credits: 3,
                  description: "BI concepts, tools, dashboards, and data-driven decision making in business contexts.",
                  type: "Elective",
                  tags: ["Business", "Intelligence"]
                },
                {
                  code: "DS311",
                  title: "Research Methodology",
                  credits: 2,
                  description: "Advanced research methods, experimental design, and scientific communication.",
                  type: "Skill Enhancement",
                  tags: ["Research", "Methodology"]
                },
                {
                  code: "DS312",
                  title: "Entrepreneurship Development",
                  credits: 2,
                  description: "Fundamentals of entrepreneurship, startup planning, and innovation in data science.",
                  type: "Value Added",
                  tags: ["Entrepreneurship", "Startup"]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "msc",
      name: "M.Sc. Data Science",
      link: "/department/programs/2",
      years: [
        {
          year: "First Year",
          semesters: [
            {
              name: "Semester I",
              courses: [
                {
                  code: "MDS101",
                  title: "Advanced Statistical Methods",
                  credits: 4,
                  description: "Advanced statistical techniques for data analysis and inferential statistics.",
                  type: "Core",
                  tags: ["Statistics", "Advanced"]
                },
                {
                  code: "MDS102",
                  title: "Machine Learning Algorithms",
                  credits: 4,
                  description: "In-depth study of machine learning algorithms, theory, and implementation.",
                  type: "Core",
                  tags: ["Machine Learning", "Algorithms"]
                },
                {
                  code: "MDS103",
                  title: "Data Engineering",
                  credits: 4,
                  description: "Data pipeline design, ETL processes, and data infrastructure management.",
                  type: "Core",
                  tags: ["Data Engineering", "ETL"]
                },
                {
                  code: "MDS104",
                  title: "Research Methods for Data Science",
                  credits: 3,
                  description: "Research design, methodology, and scientific inquiry in data science contexts.",
                  type: "Core",
                  tags: ["Research", "Methodology"]
                }
              ]
            }
          ]
        }
      ]
    }
  ]

  return (
    <div className="container py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Courses</h1>
          <p className="text-muted-foreground">
            Explore our comprehensive range of data science courses designed according to NEP 2.0 guidelines
          </p>
        </div>
        <Link href="/department">
          <Button variant="outline" className="flex gap-2 items-center">
            <ArrowLeft className="h-4 w-4" /> 
            Back to Department
          </Button>
        </Link>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses by name or code..."
            className="pl-8"
          />
        </div>
        <Button variant="outline" className="flex gap-2 items-center">
          <Filter className="h-4 w-4" /> 
          Filters
        </Button>
      </div>

      <div className="bg-muted/30 p-4 rounded-lg border mb-8">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-medium">NEP 2.0 Course Structure</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Our curriculum is designed in accordance with the National Education Policy (NEP) 2.0 guidelines, offering flexibility, 
          interdisciplinary learning, and multiple entry/exit options with appropriate certification.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-background">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-red-100/50 text-red-800 border-red-200">Core</Badge>
                <CardTitle className="text-sm">Core Courses</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground">Fundamental courses essential for building strong foundations in data science</p>
            </CardContent>
          </Card>
          <Card className="bg-background">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-100/50 text-blue-800 border-blue-200">Elective</Badge>
                <CardTitle className="text-sm">Elective Courses</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground">Specialized courses that allow students to focus on areas of interest</p>
            </CardContent>
          </Card>
          <Card className="bg-background">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-100/50 text-green-800 border-green-200">Value Added</Badge>
                <CardTitle className="text-sm">Value Added Courses</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground">Courses focused on ethics, Indian knowledge systems, and holistic development</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="bsc" className="w-full">
        <TabsList className="mb-6">
          {programs.map(program => (
            <TabsTrigger key={program.id} value={program.id} className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              {program.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {programs.map(program => (
          <TabsContent key={program.id} value={program.id} className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{program.name}</h2>
              <Link href={program.link}>
                <Button variant="outline">View Program Details</Button>
              </Link>
            </div>

            {program.years.map((year, yearIndex) => (
              <div key={yearIndex} className="space-y-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  {year.year}
                </h3>

                <Tabs defaultValue={year.semesters[0].name} className="w-full">
                  <TabsList className="mb-6">
                    {year.semesters.map((semester, semIndex) => (
                      <TabsTrigger key={semIndex} value={semester.name}>
                        {semester.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {year.semesters.map((semester, semIndex) => (
                    <TabsContent key={semIndex} value={semester.name} className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {semester.courses.map((course, courseIndex) => (
                          <Card key={courseIndex} className="overflow-hidden">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start mb-2">
                                <Badge variant="outline" className="font-mono">{course.code}</Badge>
                                <Badge 
                                  variant="outline" 
                                  className={
                                    course.type === 'Core' ? 'bg-red-100/50 text-red-800 border-red-200' :
                                    course.type === 'Elective' ? 'bg-blue-100/50 text-blue-800 border-blue-200' :
                                    course.type === 'Value Added' ? 'bg-green-100/50 text-green-800 border-green-200' :
                                    course.type === 'Skill Enhancement' ? 'bg-amber-100/50 text-amber-800 border-amber-200' :
                                    course.type === 'Project' ? 'bg-purple-100/50 text-purple-800 border-purple-200' :
                                    course.type === 'Internship' ? 'bg-indigo-100/50 text-indigo-800 border-indigo-200' :
                                    'bg-gray-100/50 text-gray-800 border-gray-200'
                                  }
                                >
                                  {course.type}
                                </Badge>
                              </div>
                              <CardTitle className="text-base">{course.title}</CardTitle>
                              <CardDescription className="flex items-center gap-1 mt-1">
                                <Clock className="h-3 w-3" /> {course.credits} Credits
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {course.tags.map((tag, tagIndex) => (
                                  <Badge key={tagIndex} variant="secondary" className="text-xs">
                                    <Tag className="h-3 w-3 mr-1" />
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                            <CardFooter className="bg-muted/30 border-t pt-2 pb-2">
                              <Link href={`/courses/${course.code}`} className="text-xs text-primary hover:underline">
                                View detailed syllabus
                              </Link>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
} 