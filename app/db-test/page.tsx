'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DatabaseTestPage() {
  const [connectionStatus, setConnectionStatus] = useState<{
    success: boolean;
    message: string;
    error?: string;
    timestamp?: string;
    details?: any;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    try {
      setLoading(true);
      setConnectionStatus(null);
      
      const response = await fetch('/api/test/db-connection', {
        cache: 'no-store'
      });
      
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

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Database Connection Test</h1>
      
      <div className="mb-8 p-6 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
        
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : connectionStatus ? (
          <div>
            <div className={`p-4 mb-4 rounded-md ${
              connectionStatus.success 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {connectionStatus.success ? (
                    <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">{connectionStatus.message}</h3>
                  {connectionStatus.error && (
                    <div className="mt-2 text-sm text-red-700">
                      <p>Error: {connectionStatus.error}</p>
                    </div>
                  )}
                  {connectionStatus.timestamp && (
                    <div className="mt-2 text-xs text-gray-500">
                      <p>Tested at: {new Date(connectionStatus.timestamp).toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Display detailed connection information if available */}
            {connectionStatus.success && connectionStatus.details && (
              <div className="mt-6 bg-white border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3">Connection Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Database</h4>
                    <p className="mt-1 p-2 bg-gray-50 rounded">{connectionStatus.details.database}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">MongoDB Version</h4>
                    <p className="mt-1 p-2 bg-gray-50 rounded">{connectionStatus.details.mongodbVersion || 'Unknown'}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Collections</h4>
                    {connectionStatus.details.collections?.length > 0 ? (
                      <ul className="mt-1 p-2 bg-gray-50 rounded list-disc pl-5">
                        {connectionStatus.details.collections.map((collection: string) => (
                          <li key={collection}>{collection}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-1 p-2 bg-gray-50 rounded">No collections found</p>
                    )}
                  </div>
                  
                  {connectionStatus.details.hasMessagesCollection !== undefined && (
                    <div>
                      <h4 className="font-medium">Messages Collection</h4>
                      <div className="mt-1 p-2 bg-gray-50 rounded">
                        <p>
                          Status: {connectionStatus.details.hasMessagesCollection ? 
                            <span className="text-green-600">✓ Available</span> : 
                            <span className="text-red-600">✗ Not Found</span>
                          }
                        </p>
                        {connectionStatus.details.hasMessagesCollection && (
                          <p className="mt-1">
                            Document Count: {connectionStatus.details.messageCount || 0}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {connectionStatus.details.error && (
                    <div>
                      <h4 className="font-medium text-red-600">Detailed Test Error</h4>
                      <p className="mt-1 p-2 bg-red-50 rounded">{connectionStatus.details.error}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="mt-4">
              <button
                onClick={testConnection}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Test Connection Again
              </button>
            </div>
          </div>
        ) : (
          <p>Loading connection status...</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Troubleshooting</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Check that your MongoDB connection string is correct in <code className="bg-gray-100 px-1 py-0.5 rounded">.env.local</code></li>
            <li>Ensure MongoDB is running and accessible from your network</li>
            <li>Verify IP whitelist settings in MongoDB Atlas (if using Atlas)</li>
            <li>Check for any firewalls blocking the connection</li>
            <li>Make sure you're using the correct database name (<code className="bg-gray-100 px-1 py-0.5 rounded">datascience</code>)</li>
            <li>Verify the collection (<code className="bg-gray-100 px-1 py-0.5 rounded">messages</code>) exists in your database</li>
          </ul>
        </div>
        
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><Link href="/dashboard" className="text-blue-500 hover:underline">View Dashboard</Link> to see messages</li>
            <li><Link href="/" className="text-blue-500 hover:underline">Go to Homepage</Link> to submit a test message</li>
            <li><Link href="/api/test/db-connection" className="text-blue-500 hover:underline">Raw API Response</Link></li>
            <li>Check server logs for detailed MongoDB connection errors</li>
            <li>If MongoDB credentials changed, update them in your <code className="bg-gray-100 px-1 py-0.5 rounded">.env.local</code> file</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 