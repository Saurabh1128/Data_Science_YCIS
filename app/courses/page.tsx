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
  Tag,
  BookOpen,
  School,
  ScrollText,
  Users
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
                  code: "BDST 121",
                  title: "Data Storage Technology",
                  credits: 2,
                  description: "Fundamentals of data storage technologies, file systems, storage architectures, and data organization.",
                  type: "Core",
                  tags: ["Storage", "Data Management"]
                },
                {
                  code: "BDST 122",
                  title: "Relational Database Management System",
                  credits: 2,
                  description: "Advanced concepts in relational database design, normalization, SQL, and database administration.",
                  type: "Core",
                  tags: ["Database", "RDBMS"]
                },
                {
                  code: "BDSP 123",
                  title: "Practical Lab IV",
                  credits: 2,
                  description: "Hands-on laboratory exercises focused on data storage technologies and database management systems.",
                  type: "Practical",
                  tags: ["Practical", "Database"]
                },
                {
                  code: "BDST 124",
                  title: "Web Development",
                  credits: 2,
                  description: "Web development fundamentals including HTML, CSS, JavaScript, and responsive design principles.",
                  type: "Core",
                  tags: ["Web", "Programming"]
                },
                {
                  code: "BDST 125",
                  title: "Operating System Concept",
                  credits: 2,
                  description: "Core operating system concepts including process management, memory management, file systems, and security.",
                  type: "Core",
                  tags: ["OS", "Computer Science"]
                },
                {
                  code: "BDSP 126",
                  title: "Practical Lab V",
                  credits: 2,
                  description: "Practical exercises in web development and operating systems applications.",
                  type: "Practical",
                  tags: ["Practical", "Web Development"]
                },
                {
                  code: "BDST 127",
                  title: "Mathematics for Data Science – II",
                  credits: 2,
                  description: "Advanced mathematical concepts for data science including multivariate calculus, optimization, and differential equations.",
                  type: "Core",
                  tags: ["Mathematics", "Advanced"]
                },
                {
                  code: "BDST 128",
                  title: "Statistics for Data Science – II",
                  credits: 2,
                  description: "Advanced statistical methods including regression analysis, time series, and Bayesian statistics.",
                  type: "Core",
                  tags: ["Statistics", "Advanced"]
                },
                {
                  code: "BDSP 129",
                  title: "Practical Lab VI",
                  credits: 2,
                  description: "Practical applications of advanced mathematics and statistics for data science.",
                  type: "Practical",
                  tags: ["Practical", "Mathematics", "Statistics"]
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

  // Helper function to get badge color based on course type
  const getTypeColor = (type: string) => {
    switch(type) {
      case 'Core': return 'bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800/30';
      case 'Practical': return 'bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-800/30';
      case 'Elective': return 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/30';
      case 'Value Added': return 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800/30';
      case 'Skill Enhancement': return 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/30';
      case 'Project': return 'bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800/30';
      case 'Internship': return 'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200 dark:bg-fuchsia-900/20 dark:text-fuchsia-300 dark:border-fuchsia-800/30';
      default: return 'bg-gray-50 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800/30';
    }
  };

  // Get icon for course type
  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'Core': return <BookOpen className="h-3 w-3 mr-1" />;
      case 'Practical': return <ScrollText className="h-3 w-3 mr-1" />;
      case 'Elective': return <Tag className="h-3 w-3 mr-1" />;
      case 'Value Added': return <GraduationCap className="h-3 w-3 mr-1" />;
      default: return null;
    }
  };

  return (
    <div className="container py-6 px-4 sm:px-6">
      {/* Header with decorative background */}
      <div className="relative mb-8 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-indigo-700 to-blue-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] mix-blend-overlay opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_60%)]"></div>
        <div className="relative px-6 py-16 sm:px-12 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-md">
              Academic Courses
              <span className="block text-purple-100 text-lg sm:text-xl font-normal mt-2">Department of Data Science</span>
            </h1>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">
              Explore our comprehensive range of data science courses designed to build strong foundations and advanced skills
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link href="/department">
                <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm flex gap-2 items-center">
                  <ArrowLeft className="h-4 w-4" /> 
                  Department Overview
                </Button>
              </Link>
              <Link href="/department/admission">
                <Button className="bg-gradient-to-r from-purple-600 to-purple-800 border-none text-white hover:from-purple-700 hover:to-purple-900">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/30 flex flex-col items-center">
          <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-800/30 mb-2">
            <School className="h-6 w-6 text-indigo-700 dark:text-indigo-300" />
          </div>
          <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">2</div>
          <div className="text-xs text-center text-indigo-600 dark:text-indigo-400">Programs</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800/30 flex flex-col items-center">
          <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-800/30 mb-2">
            <BookOpen className="h-6 w-6 text-purple-700 dark:text-purple-300" />
          </div>
          <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">36+</div>
          <div className="text-xs text-center text-purple-600 dark:text-purple-400">Courses</div>
        </div>
        <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg border border-violet-100 dark:border-violet-800/30 flex flex-col items-center">
          <div className="p-2 rounded-full bg-violet-100 dark:bg-violet-800/30 mb-2">
            <Users className="h-6 w-6 text-violet-700 dark:text-violet-300" />
          </div>
          <div className="text-2xl font-bold text-violet-700 dark:text-violet-300">60</div>
          <div className="text-xs text-center text-violet-600 dark:text-violet-400">Seats Per Batch</div>
        </div>
        <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 p-4 rounded-lg border border-fuchsia-100 dark:border-fuchsia-800/30 flex flex-col items-center">
          <div className="p-2 rounded-full bg-fuchsia-100 dark:bg-fuchsia-800/30 mb-2">
            <Calendar className="h-6 w-6 text-fuchsia-700 dark:text-fuchsia-300" />
          </div>
          <div className="text-2xl font-bold text-fuchsia-700 dark:text-fuchsia-300">3</div>
          <div className="text-xs text-center text-fuchsia-600 dark:text-fuchsia-400">Years Duration</div>
        </div>
      </div>

      <Tabs defaultValue="bsc" className="w-full">
        <TabsList className="mb-8 w-full justify-start overflow-x-auto py-2 px-1 flex-nowrap sm:flex-wrap bg-indigo-50/50 dark:bg-indigo-900/20 rounded-lg">
          {programs.map(program => (
            <TabsTrigger 
              key={program.id} 
              value={program.id} 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white text-sm sm:text-base"
            >
              <GraduationCap className="h-4 w-4" />
              {program.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {programs.map(program => (
          <TabsContent key={program.id} value={program.id} className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 p-6 sm:p-8 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
              <div>
                <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-300">{program.name}</h2>
                <p className="text-sm text-indigo-700 dark:text-indigo-400">Comprehensive curriculum designed for aspiring data scientists</p>
              </div>
              <Link href={program.link}>
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">View Program Details</Button>
              </Link>
            </div>

            {program.years.map((year, yearIndex) => (
              <div key={yearIndex} className="space-y-6 bg-white dark:bg-gray-900/50 p-6 sm:p-8 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
                <h3 className="text-xl font-semibold flex items-center gap-2 text-indigo-700 dark:text-indigo-300 border-b pb-3 border-indigo-100 dark:border-indigo-900/30">
                  <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  {year.year}
                </h3>

                <Tabs defaultValue={year.semesters[0].name} className="w-full">
                  <TabsList className="mb-6 w-full justify-start overflow-x-auto flex-nowrap sm:flex-wrap bg-indigo-50/80 dark:bg-indigo-900/10 p-1 rounded-md">
                    {year.semesters.map((semester, semIndex) => (
                      <TabsTrigger 
                        key={semIndex} 
                        value={semester.name}
                        className="text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-indigo-800/30 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300"
                      >
                        {semester.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {year.semesters.map((semester, semIndex) => (
                    <TabsContent key={semIndex} value={semester.name} className="space-y-6">
                      {/* Mobile-friendly course list view */}
                      <div className="block sm:hidden">
                        {semester.courses.map((course, courseIndex) => (
                          <div key={courseIndex} className="mb-4 border-b pb-4 last:border-b-0 last:pb-0">
                            <div className="flex justify-between items-start mb-2">
                              <Badge variant="outline" className="font-mono text-xs bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-200 dark:border-indigo-800/30">{course.code}</Badge>
                              <Badge 
                                variant="outline" 
                                className={`text-xs flex items-center ${getTypeColor(course.type)}`}
                              >
                                {getTypeIcon(course.type)}
                                {course.type}
                              </Badge>
                            </div>
                            <h4 className="font-bold text-indigo-700 dark:text-indigo-300 mb-1">{course.title}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{course.description}</p>
                            <div className="flex justify-between">
                              <div className="flex items-center text-xs">
                                <Clock className="h-3 w-3 mr-1 text-indigo-600 dark:text-indigo-400" /> 
                                {course.credits} Credits
                              </div>
                              <div className="flex flex-wrap gap-1 justify-end">
                                {course.tags.slice(0, 2).map((tag, tagIndex) => (
                                  <Badge key={tagIndex} variant="secondary" className="text-xs px-1.5 py-0 bg-purple-100/50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Desktop grid view */}
                      <div className="hidden sm:grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {semester.courses.map((course, courseIndex) => (
                          <Card key={courseIndex} className="overflow-hidden hover:shadow-lg transition-all border-t-4 border-t-purple-600 dark:border-t-purple-400 group">
                            <CardHeader className="pb-2 bg-gradient-to-r from-white to-indigo-50/30 dark:from-gray-900 dark:to-indigo-900/10">
                              <div className="flex justify-between items-start mb-2">
                                <Badge variant="outline" className="font-mono bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800/30">{course.code}</Badge>
                                <Badge 
                                  variant="outline" 
                                  className={`flex items-center ${getTypeColor(course.type)}`}
                                >
                                  {getTypeIcon(course.type)}
                                  {course.type}
                                </Badge>
                              </div>
                              <CardTitle className="text-base text-indigo-700 dark:text-indigo-300 group-hover:text-purple-600">{course.title}</CardTitle>
                              <CardDescription className="flex items-center gap-1 mt-1">
                                <Clock className="h-3 w-3 text-indigo-600 dark:text-indigo-400" /> {course.credits} Credits
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {course.tags.map((tag, tagIndex) => (
                                  <Badge key={tagIndex} variant="secondary" className="text-xs bg-purple-100/50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                                    <Tag className="h-3 w-3 mr-1" />
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                            <CardFooter className="bg-muted/30 border-t pt-2 pb-2 flex justify-between items-center">
                              <Link href={`/courses/${course.code}`} className="text-xs text-purple-600 dark:text-purple-400 hover:underline">
                                View detailed syllabus
                              </Link>
                              <div className="bg-indigo-100 dark:bg-indigo-900/30 text-xs px-2 py-0.5 rounded text-indigo-700 dark:text-indigo-300">
                                {semester.name}
                              </div>
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
      
      {/* Bottom action banner */}
      <div className="mt-12 rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-600"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_50%)]"></div>
        <div className="relative p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-3">Ready to Start Your Journey?</h2>
            <p className="mb-8 max-w-2xl mx-auto text-purple-100 text-lg">
              Join our Data Science program and build a strong foundation for a successful career in the data-driven world.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/apply">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50 font-semibold px-6">Apply Now</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 font-semibold px-6">Contact Department</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}