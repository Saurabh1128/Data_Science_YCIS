"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"
import { GraduationCap, Mail, Phone, User, FileText, School, Calendar } from "lucide-react"

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  education: z.string().min(1, "Please select your education"),
  previousMarks: z.string().min(1, "Please enter your previous exam marks")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100, {
      message: "Marks must be a number between 0 and 100",
    }),
  statement: z.string().min(50, "Statement must be at least 50 characters")
})

type FormValues = z.infer<typeof formSchema>

export default function ApplyNow() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      education: "",
      previousMarks: "",
      statement: "",
    },
  })

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)
    try {
      // Here you would typically send the data to your backend
      console.log(data)
      toast.success("Application submitted successfully!")
      form.reset()
    } catch (error) {
      toast.error("Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const formFieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30">
      
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Apply for Admission
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Take the first step towards your future in Data Science
          </p>
        </div>

        <Card className="backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-purple-100 dark:border-purple-900/30">
          <CardHeader>
            <CardTitle className="text-2xl">Application Form</CardTitle>
            <CardDescription>
              Please fill out all the required information below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <motion.div variants={formFieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" className="bg-white/50 dark:bg-gray-900/50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={formFieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email address"
                              className="bg-white/50 dark:bg-gray-900/50"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={formFieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Enter your phone number"
                              className="bg-white/50 dark:bg-gray-900/50"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                </div>



                <motion.div variants={formFieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <School className="h-4 w-4" />
                          Highest Education
                        </FormLabel>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-2 gap-4"
                        >
                          <FormItem>
                            <FormControl>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="12th" id="12th" />
                                <label htmlFor="12th">12th Standard</label>
                              </div>
                            </FormControl>
                          </FormItem>
                          <FormItem>
                            <FormControl>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="bachelors" id="bachelors" />
                                <label htmlFor="bachelors">Bachelor's Degree</label>
                              </div>
                            </FormControl>
                          </FormItem>
                          <FormItem>
                            <FormControl>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="masters" id="masters" />
                                <label htmlFor="masters">Master's Degree</label>
                              </div>
                            </FormControl>
                          </FormItem>
                          <FormItem>
                            <FormControl>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="other" id="other" />
                                <label htmlFor="other">Other</label>
                              </div>
                            </FormControl>
                          </FormItem>
                        </RadioGroup>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={formFieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
                  <FormField
                    control={form.control}
                    name="previousMarks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Previous Exam Marks (%)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your previous exam marks"
                            min="0"
                            max="100"
                            className="bg-white/50 dark:bg-gray-900/50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={formFieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.7 }}>
                  <FormField
                    control={form.control}
                    name="statement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Statement of Purpose</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us why you want to join this program..."
                            className="min-h-[120px] bg-white/50 dark:bg-gray-900/50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>


                <motion.div
                  variants={formFieldVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.9 }}
                  className="pt-4"
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </motion.div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}