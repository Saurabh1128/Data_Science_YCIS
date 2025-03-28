import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Award, Clock, MapPin } from "lucide-react"

export default function ActivitiesPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Data Science Workshop",
      date: "June 15, 2023",
      time: "10:00 AM - 4:00 PM",
      location: "Computer Lab 1",
      description: "Hands-on workshop on data analysis using Python and machine learning techniques.",
      type: "Workshop",
    },
    {
      id: 2,
      title: "Guest Lecture: AI in Healthcare",
      date: "June 20, 2023",
      time: "2:00 PM - 4:00 PM",
      location: "Seminar Hall",
      description: "Dr. Sharma from AIIMS will discuss applications of AI in modern healthcare.",
      type: "Lecture",
    },
    {
      id: 3,
      title: "DataHack 2023",
      date: "July 5-6, 2023",
      time: "9:00 AM - 5:00 PM",
      location: "Main Auditorium",
      description: "Annual hackathon focused on solving real-world problems using data science.",
      type: "Competition",
    },
  ]

  const pastEvents = [
    {
      id: 4,
      title: "Industry Visit: Tech Solutions Inc.",
      date: "May 10, 2023",
      location: "Tech Solutions Campus",
      description: "Students visited the data analytics division of Tech Solutions to understand industry practices.",
      type: "Visit",
    },
    {
      id: 5,
      title: "Research Symposium",
      date: "April 22, 2023",
      location: "Conference Hall",
      description: "Students and faculty presented their research work in data science and machine learning.",
      type: "Symposium",
    },
    {
      id: 6,
      title: "Python Programming Contest",
      date: "March 15, 2023",
      location: "Computer Lab 2",
      description: "Competitive programming contest focusing on data structures and algorithms in Python.",
      type: "Competition",
    },
  ]

  const achievements = [
    {
      id: 1,
      title: "National Data Science Championship",
      student: "Priya Sharma",
      position: "1st Place",
      date: "May 2023",
      description: "Won the national-level data science competition organized by Tech University.",
    },
    {
      id: 2,
      title: "Research Paper Publication",
      student: "Rahul Patel, Dr. Mehta",
      position: "International Journal",
      date: "April 2023",
      description: "Published research on 'Deep Learning for Medical Image Analysis' in IEEE Transactions.",
    },
    {
      id: 3,
      title: "Hackathon Winners",
      student: "Team Innovators",
      position: "Winners",
      date: "February 2023",
      description: "Team of 4 students won the Smart City Hackathon organized by the State Government.",
    },
  ]

  return (
    <div className="container py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activities & Events</h1>
          <p className="text-muted-foreground mt-2">
            Workshops, seminars, competitions, and other departmental activities
          </p>
        </div>
        <Link href="/activities/calendar">
          <Button className="flex gap-2">
            <Calendar className="h-4 w-4" />
            View Calendar
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <Badge
                      variant={
                        event.type === "Workshop" ? "default" : event.type === "Lecture" ? "secondary" : "outline"
                      }
                    >
                      {event.type}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-1 mt-2">
                    <Calendar className="h-3.5 w-3.5" />
                    {event.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/activities/event/${event.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="past" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <Badge variant="outline">{event.type}</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-1 mt-2">
                    <Calendar className="h-3.5 w-3.5" />
                    {event.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/activities/event/${event.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{achievement.title}</CardTitle>
                    <Badge variant="secondary">{achievement.position}</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-1 mt-2">
                    <Users className="h-3.5 w-3.5" />
                    {achievement.student}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{achievement.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{achievement.description}</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/activities/achievement/${achievement.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 p-6 border rounded-lg bg-muted/50">
        <h2 className="text-xl font-semibold mb-4">Get Involved</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/activities/clubs"
            className="p-4 bg-background rounded-lg border hover:border-primary transition-colors flex items-center gap-3"
          >
            <Users className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-medium">Student Clubs</h3>
              <p className="text-sm text-muted-foreground">Join our data science and coding clubs</p>
            </div>
          </Link>
          <Link
            href="/activities/volunteer"
            className="p-4 bg-background rounded-lg border hover:border-primary transition-colors flex items-center gap-3"
          >
            <Award className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-medium">Volunteer</h3>
              <p className="text-sm text-muted-foreground">Help organize department events</p>
            </div>
          </Link>
          <Link
            href="/activities/propose"
            className="p-4 bg-background rounded-lg border hover:border-primary transition-colors flex items-center gap-3"
          >
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-medium">Propose an Event</h3>
              <p className="text-sm text-muted-foreground">Submit your ideas for activities</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

