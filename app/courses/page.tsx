import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  GraduationCap, 
  Calendar, 
  Clock, 
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
                  code: "BDST 111",
                  title: "Fundamental of Data Science",
                  credits: 2,
                  description: "Introduction to core concepts of data science including data collection, processing, analysis, and interpretation.",
                  type: "Core",
                  tags: ["Data Science", "Foundation"]
                },
                {
                  code: "BDST 112",
                  title: "Database Management System",
                  credits: 2,
                  description: "Database design principles, SQL, relational database systems, and data management techniques.",
                  type: "Core",
                  tags: ["Database", "SQL"]
                },
                {
                  code: "BDSP 113",
                  title: "Practical Lab I",
                  credits: 2,
                  description: "Hands-on laboratory exercises complementing the Fundamental of Data Science course.",
                  type: "Practical",
                  tags: ["Practical", "Data Science"]
                },
                {
                  code: "BDST 114",
                  title: "Computer Programming with C",
                  credits: 2,
                  description: "Introduction to programming using C language with emphasis on algorithmic thinking and problem-solving.",
                  type: "Core",
                  tags: ["Programming", "C Language"]
                },
                {
                  code: "BDST 115",
                  title: "Fundamental of Computer",
                  credits: 2,
                  description: "Computer architecture, operating systems, software applications, and basic computing concepts.",
                  type: "Core",
                  tags: ["Computer Science", "Foundation"]
                },
                {
                  code: "BDSP 116",
                  title: "Practical Lab II",
                  credits: 2,
                  description: "Laboratory exercises focused on C programming and computer fundamentals applications.",
                  type: "Practical",
                  tags: ["Practical", "Programming"]
                },
                {
                  code: "BDST 117",
                  title: "Mathematics for Data Science - I",
                  credits: 2,
                  description: "Mathematical foundations required for data science including linear algebra, calculus, and discrete mathematics.",
                  type: "Core",
                  tags: ["Mathematics", "Foundation"]
                },
                {
                  code: "BDST 118",
                  title: "Statistics for Data Science - I",
                  credits: 2,
                  description: "Fundamental statistical concepts, descriptive statistics, probability distributions, and statistical inference.",
                  type: "Core",
                  tags: ["Statistics", "Foundation"]
                },
                {
                  code: "BDSP 119",
                  title: "Practical Lab III",
                  credits: 2,
                  description: "Practical applications of mathematical and statistical concepts in data science contexts.",
                  type: "Practical",
                  tags: ["Practical", "Statistics", "Mathematics"]
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
            Explore our comprehensive range of data science courses
          </p>
        </div>
        <Link href="/department">
          <Button variant="outline" className="flex gap-2 items-center">
            <ArrowLeft className="h-4 w-4" /> 
            Back to Department
          </Button>
        </Link>
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
                                    course.type === 'Practical' ? 'bg-teal-100/50 text-teal-800 border-teal-200' :
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