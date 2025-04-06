"use client"

import { useState } from "react"

interface SeatsStatusProps {
  totalCapacity: number
  occupiedSeats: number
}

export default function SeatsStatus({ totalCapacity = 100, occupiedSeats = 0 }: SeatsStatusProps) {
  const availableSeats = totalCapacity - occupiedSeats
  const occupancyPercentage = (occupiedSeats / totalCapacity) * 100

  const getStatusInfo = () => {
    if (occupancyPercentage >= 100) {
      return {
        text: "Seats Full",
        color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        progressColor: "bg-red-600"
      }
    } else if (occupancyPercentage >= 80) {
      return {
        text: "Limited Seats",
        color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        progressColor: "bg-yellow-600"
      }
    } else {
      return {
        text: "Seats Available",
        color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        progressColor: "bg-green-600"
      }
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Seat Availability</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
          {statusInfo.text}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>Total Capacity</span>
          <span>{totalCapacity}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>Available Seats</span>
          <span>{availableSeats}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>Occupied Seats</span>
          <span>{occupiedSeats}</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className={`h-2.5 rounded-full ${statusInfo.progressColor}`}
            style={{ width: `${Math.min(occupancyPercentage, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}