"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ApiTestPage() {
  const [dbTestResult, setDbTestResult] = useState<any>(null);
  const [contactTestResult, setContactTestResult] = useState<any>(null);
  const [loading, setLoading] = useState({
    db: false,
    contact: false
  });
  
  // The API key should match exactly with the one in .env.local
  const API_KEY = '9475546b-9679-428d-b4f2-d97f312a2153';
  
  const testDbConnection = async () => {
    setLoading(prev => ({ ...prev, db: true }));
    setDbTestResult(null);
    
    try {
      console.log('Testing DB connection with API key:', API_KEY);
      
      const response = await fetch('/api/test-db', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        }
      });
      
      console.log('Response status:', response.status);
      const data = await response.json();
      setDbTestResult(data);
    } catch (error) {
      console.error('Error testing DB connection:', error);
      setDbTestResult({ error: error instanceof Error ? error.message : String(error) });
    } finally {
      setLoading(prev => ({ ...prev, db: false }));
    }
  };
  
  const testContactForm = async () => {
    setLoading(prev => ({ ...prev, contact: true }));
    setContactTestResult(null);
    
    try {
      console.log('Testing contact form with API key:', API_KEY);
      
      const testData = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'API Test',
        message: 'This is a test message from the API test page.'
      };
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify(testData)
      });
      
      console.log('Response status:', response.status);
      const data = await response.json();
      setContactTestResult(data);
    } catch (error) {
      console.error('Error testing contact form:', error);
      setContactTestResult({ error: error instanceof Error ? error.message : String(error) });
    } finally {
      setLoading(prev => ({ ...prev, contact: false }));
    }
  };
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">API Test Page</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Test Database Connection</CardTitle>
            <CardDescription>
              Tests the MongoDB connection with authentication
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testDbConnection} 
              disabled={loading.db}
              className="w-full"
            >
              {loading.db ? 'Testing...' : 'Test Database Connection'}
            </Button>
            
            {dbTestResult && (
              <div className="mt-4 p-4 bg-gray-100 rounded-md overflow-auto">
                <pre className="text-sm">
                  {JSON.stringify(dbTestResult, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Test Contact Form</CardTitle>
            <CardDescription>
              Tests the contact form API endpoint with authentication
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testContactForm} 
              disabled={loading.contact}
              className="w-full"
            >
              {loading.contact ? 'Testing...' : 'Test Contact Form'}
            </Button>
            
            {contactTestResult && (
              <div className="mt-4 p-4 bg-gray-100 rounded-md overflow-auto">
                <pre className="text-sm">
                  {JSON.stringify(contactTestResult, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">API Key Information</h2>
        <p className="mb-2">Current API key being used: <code className="px-2 py-1 bg-gray-100 rounded">{`${API_KEY.substring(0, 6)}...${API_KEY.substring(API_KEY.length - 4)}`}</code></p>
        <p className="text-sm text-gray-600">This API key should match exactly with the one in the .env.local file.</p>
      </div>
    </div>
  );
} 