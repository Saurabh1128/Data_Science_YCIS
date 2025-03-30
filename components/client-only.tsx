"use client"

import { useEffect, useState } from "react"

// This component is used to wrap content that should only render on the client
// It helps prevent hydration mismatches by not rendering children during SSR
export function ClientOnly({ children, fallback = null }: { 
  children: React.ReactNode 
  fallback?: React.ReactNode
}) {
  const [isMounted, setIsMounted] = useState(false)

  // Suppress hydration warnings caused by browser extensions
  useEffect(() => {
    // This runs once after the initial render
    const originalError = console.error;
    console.error = (...args: any[]) => {
      const errorMsg = typeof args[0] === 'string' ? args[0] : '';
      
      // Filter out hydration warnings related to attributes added by browser extensions
      if (errorMsg.includes('Hydration') && 
          (errorMsg.includes('cz-shortcut-listen') || 
           errorMsg.includes('browser extension'))) {
        return;
      }
      
      originalError(...args);
    };

    // Mark component as mounted after hydration is complete
    setIsMounted(true);
    
    // Restore original console.error on unmount
    return () => {
      console.error = originalError;
    };
  }, []);

  if (!isMounted) {
    return fallback
  }

  return <>{children}</>
} 