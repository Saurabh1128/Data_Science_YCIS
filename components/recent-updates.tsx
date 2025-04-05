"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { CalendarDays, ArrowUpRight } from "lucide-react"

interface Update {
  date: string
  title: string
  description: string
  category: string
}

const recentUpdates: Update[] = [
  {
    date: "2024-02-15",
    title: "New Data Science Lab Inauguration",
    description: "State-of-the-art computing facility with latest hardware and software resources",
    category: "Infrastructure"
  },
  {
    date: "2024-02-10",
    title: "Research Paper Publication",
    description: "Students published research paper in International Journal of Data Science",
    category: "Achievement"
  },
  {
    date: "2024-02-05",
    title: "Industry Partnership",
    description: "New collaboration with leading tech companies for internship opportunities",
    category: "Partnership"
  }
]

export function RecentUpdates() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Recent Updates</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay informed about the latest developments, achievements, and activities in our department
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {recentUpdates.map((update, index) => (
            <motion.div key={index} variants={item}>
              <Card className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden">
                <CardHeader className="relative">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4 mr-2" />
                      {new Date(update.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      {update.category}
                    </Badge>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors duration-300">
                    {update.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {update.description}
                  </CardDescription>
                  <div className="mt-4 flex items-center text-sm text-primary font-medium">
                    Read more
                    <ArrowUpRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}