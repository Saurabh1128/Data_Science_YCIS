"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SeatsStatus from "@/components/seats-status"

export default function SeatsOverviewCard() {
  // These values would typically come from your database or API
  const totalCapacity = 100
  const occupiedSeats = 75

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enrollment Status</CardTitle>
        <CardDescription>Current seat availability and capacity</CardDescription>
      </CardHeader>
      <CardContent>
        <SeatsStatus
          totalCapacity={totalCapacity}
          occupiedSeats={occupiedSeats}
        />
      </CardContent>
    </Card>
  )
}