"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem("dashboard_auth");
    
    if (!auth) {
      // Redirect to login if not authenticated
      router.push("/dashboard-login");
    } else {
      setIsAuthenticated(true);
    }
    
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-red-600" />
          <p className="text-gray-500 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // This will briefly show before redirecting to login
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("dashboard_auth");
            router.push("/dashboard-login");
          }}
          className="text-red-600 hover:text-red-800 text-sm"
        >
          Logout
        </button>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
} 