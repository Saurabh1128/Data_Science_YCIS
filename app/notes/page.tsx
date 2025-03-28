import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, FileText, Download, BookMarked } from "lucide-react"

export default function NotesPage() {
  const semesters = [
    { id: "sem1", name: "Semester 1" },
    { id: "sem2", name: "Semester 2" },
    { id: "sem3", name: "Semester 3" },
    { id: "sem4", name: "Semester 4" },
  ]

  const courses = {
    sem1: [
      { id: 1, code: "DS101", name: "Introduction to Data Science", notes: 12, assignments: 5 },
      { id: 2, code: "DS102", name: "Programming for Data Science", notes: 10, assignments: 6 },
      { id: 3, code: "DS103", name: "Statistics for Data Science", notes: 8, assignments: 4 },
    ],
    sem2: [
      { id: 4, code: "DS201", name: "Machine Learning Fundamentals", notes: 14, assignments: 7 },
      { id: 5, code: "DS202", name: "Data Visualization", notes: 9, assignments: 5 },
      { id: 6, code: "DS203", name: "Database Systems", notes: 11, assignments: 6 },
    ],
    sem3: [
      { id: 7, code: "DS301", name: "Deep Learning", notes: 15, assignments: 8 },
      { id: 8, code: "DS302", name: "Big Data Analytics", notes: 12, assignments: 6 },
      { id: 9, code: "DS303", name: "Natural Language Processing", notes: 10, assignments: 5 },
    ],
    sem4: [
      { id: 10, code: "DS401", name: "Computer Vision", notes: 13, assignments: 7 },
      { id: 11, code: "DS402", name: "Time Series Analysis", notes: 9, assignments: 5 },
      { id: 12, code: "DS403", name: "Capstone Project", notes: 6, assignments: 3 },
    ],
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Study Materials</h1>
          <p className="text-muted-foreground mt-2">
            Access lecture notes, assignments, and study resources for all courses
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/notes/syllabus">
            <Button variant="outline" className="flex gap-2">
              <BookMarked className="h-4 w-4" />
              Syllabus
            </Button>
          </Link>
          <Link href="/notes/resources">
            <Button className="flex gap-2">
              <Download className="h-4 w-4" />
              Resources
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="sem1" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
          {semesters.map((semester) => (
            <TabsTrigger key={semester.id} value={semester.id}>
              {semester.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(courses).map(([semId, semCourses]) => (
          <TabsContent key={semId} value={semId} className="mt-0">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {semCourses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      {course.name}
                    </CardTitle>
                    <CardDescription>{course.code}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                        <span className="text-2xl font-bold">{course.notes}</span>
                        <span className="text-xs text-muted-foreground">Lecture Notes</span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                        <span className="text-2xl font-bold">{course.assignments}</span>
                        <span className="text-xs text-muted-foreground">Assignments</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/notes/course/${course.id}`} className="w-full">
                      <Button variant="outline" className="w-full flex gap-2">
                        <FileText className="h-4 w-4" />
                        View Materials
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-12 p-6 border rounded-lg bg-muted/50">
        <h2 className="text-xl font-semibold mb-4">Additional Resources</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/notes/reference-books"
            className="p-4 bg-background rounded-lg border hover:border-primary transition-colors flex items-center gap-3"
          >
            <BookMarked className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-medium">Reference Books</h3>
              <p className="text-sm text-muted-foreground">Recommended textbooks and references</p>
            </div>
          </Link>
          <Link
            href="/notes/video-lectures"
            className="p-4 bg-background rounded-lg border hover:border-primary transition-colors flex items-center gap-3"
          >
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-medium">Video Lectures</h3>
              <p className="text-sm text-muted-foreground">Recorded lectures and tutorials</p>
            </div>
          </Link>
          <Link
            href="/notes/practice-problems"
            className="p-4 bg-background rounded-lg border hover:border-primary transition-colors flex items-center gap-3"
          >
            <Download className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-medium">Practice Problems</h3>
              <p className="text-sm text-muted-foreground">Additional exercises and solutions</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

