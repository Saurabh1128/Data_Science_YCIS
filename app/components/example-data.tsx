'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database } from 'lucide-react';

export default function ExampleData() {
  const [connectionStatus, setConnectionStatus] = useState<{
    success?: boolean;
    message?: string;
    dbName?: string;
    error?: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/db-test');
      const data = await response.json();
      setConnectionStatus(data);
    } catch (error) {
      setConnectionStatus({
        success: false,
        message: 'Error testing connection',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center space-x-2">
        <Database className="h-6 w-6 text-red-600" />
        <div>
          <CardTitle>MongoDB Connection</CardTitle>
          <CardDescription>Test your database connection</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button 
            onClick={testConnection} 
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            {loading ? 'Testing Connection...' : 'Test MongoDB Connection'}
          </Button>

          {connectionStatus && (
            <div className={`mt-4 p-4 rounded-md ${
              connectionStatus.success 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              <p className="font-medium">{connectionStatus.message}</p>
              {connectionStatus.dbName && (
                <p className="text-sm mt-1">Database: {connectionStatus.dbName}</p>
              )}
              {connectionStatus.error && (
                <p className="text-sm mt-1">Error: {connectionStatus.error}</p>
              )}
            </div>
          )}
          
          <div className="text-xs text-gray-500 mt-4">
            <p>Make sure you&apos;ve set up your .env.local file with the MONGODB_URI variable.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 