"use client"

import { useEffect, useState } from "react"

// This component is used to wrap content that should only render on the client
// It helps prevent hydration mismatches by not rendering children during SSR
export function ClientOnly({ children, fallback = null }: { 
  children: React.ReactNode 
  fallback?: React.ReactNode
}) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return fallback
  }

  return <>{children}</>
} 