'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  AlertCircle,
  ChevronDown,
  Mail,
  MessageSquare,
  LayoutGrid,
  List,
  Trash2,
  BarChart as BarChart3,
  PieChart as PieChartIcon,
  Eye,
  EyeOff,
  Inbox, 
  Clock, 
  CheckCircle, 
  Trash,
  Phone,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Message = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'archived';
};

export default function DashboardContent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'compact'>('cards');
  const [notification, setNotification] = useState<{message: string, type: 'info' | 'warning' | 'success'} | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      
      console.log('Fetching dashboard messages...');
      const response = await fetch('/api/dashboard/messages', {
        // Add cache: 'no-store' to prevent caching issues
        cache: 'no-store',
        // Add a longer timeout
        signal: AbortSignal.timeout(10000)
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text().catch(() => null);
        console.error('Error response body:', errorText);
        
        throw new Error(`Failed to fetch messages: ${response.status}${errorText ? ` - ${errorText}` : ''}`);
      }
      
      const data = await response.json();
      console.log('Received messages data:', data);
      
      if (data.success) {
        setMessages(data.messages || []);
        setNotification(null); // Clear any notification
      } else {
        throw new Error(data.message || data.error || 'Unknown error occurred');
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      
      // Use a more specific error message if we can determine the issue
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      
      if (errorMessage.includes('Failed to fetch')) {
        setError('Network error: Could not connect to the server. Check your internet connection.');
      } else if (errorMessage.includes('MongoDB')) {
        setError('Database error: Failed to connect to the MongoDB database. Please check your database configuration.');
      } else if (errorMessage.includes('timeout')) {
        setError('Connection timeout: The request took too long to complete. Please try again.');
      } else if (errorMessage.includes('401') || errorMessage.includes('403')) {
        setError('Authentication error: Not authorized to access the database.');
      } else {
        setError(`Error connecting to the database: ${errorMessage}. Please try again later.`);
      }
      
      // Set messages to empty array to avoid showing stale data
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  // Add a retry function
  const retryFetchMessages = () => {
    console.log('Retrying to fetch messages...');
    fetchMessages();
  };

  const updateMessageStatus = async (id: string, status: 'read' | 'unread' | 'archived') => {
    try {
      const response = await fetch(`/api/dashboard/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update message');
      }
      
      // Update the local state
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg._id === id ? { ...msg, status } : msg
        )
      );
    } catch (err) {
      console.error('Error updating message status:', err);
      setError('Failed to update message status. Please try again.');
    }
  };

  const confirmDeleteMessage = (id: string) => {
    setMessageToDelete(id);
    setDeleteDialogOpen(true);
  };

  const deleteMessage = async () => {
    if (!messageToDelete) return;
    
    try {
      const response = await fetch(`/api/dashboard/messages/${messageToDelete}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete message');
      }
      
      // Remove the message from the local state
      setMessages(prevMessages => 
        prevMessages.filter(msg => msg._id !== messageToDelete)
      );
      
      // Close the dialog
      setDeleteDialogOpen(false);
      setMessageToDelete(null);
    } catch (err) {
      console.error('Error deleting message:', err);
      setError('Failed to delete message. Please try again.');
      setDeleteDialogOpen(false);
    }
  };

  // Create data for the bar chart
  const getSubjectData = () => {
    const subjects = {
      admission: 0,
      course: 0,
      faculty: 0,
      other: 0
    };
    
    messages.forEach(message => {
      if (message.subject in subjects) {
        subjects[message.subject as keyof typeof subjects]++;
      } else {
        subjects.other++;
      }
    });
    
    return [
      { name: 'Admission Inquiry', count: subjects.admission, fill: '#f43f5e' },
      { name: 'Course Information', count: subjects.course, fill: '#3b82f6' },
      { name: 'Faculty Contact', count: subjects.faculty, fill: '#10b981' },
      { name: 'Other', count: subjects.other, fill: '#6b7280' }
    ];
  };

  // Create data for the status pie chart
  const getStatusData = () => {
    const statusCounts = {
      unread: messages.filter(m => m.status === 'unread').length,
      read: messages.filter(m => m.status === 'read').length,
      archived: messages.filter(m => m.status === 'archived').length
    };
    
    return [
      { name: 'Unread', value: statusCounts.unread, color: '#f43f5e' },
      { name: 'Read', value: statusCounts.read, color: '#10b981' },
      { name: 'Archived', value: statusCounts.archived, color: '#6b7280' }
    ];
  };

  const filteredMessages = activeTab === 'all' 
    ? messages 
    : messages.filter(msg => msg.status === activeTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'read': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-8 p-6 max-w-[1400px] mx-auto">
      {/* Notification Banner (add this) */}
      {notification && (
        <div className={`rounded-lg p-4 flex items-center justify-between ${
          notification.type === 'warning' 
            ? 'bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800/30' 
            : notification.type === 'success'
              ? 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800/30'
              : 'bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800/30'
        }`}>
          <div className="flex items-center gap-2">
            {notification.type === 'warning' && <AlertTriangle className="h-5 w-5" />}
            <p>{notification.message}</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setNotification(null)}
            className="h-8 px-2"
          >
            ✕
          </Button>
        </div>
      )}

      {/* Dashboard Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-red-50 to-white dark:from-red-900/20 dark:to-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-red-600 mr-3" />
              <div className="text-3xl font-bold">{messages.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Unread Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-blue-600 mr-3" />
              <div className="text-3xl font-bold">{messages.filter(m => m.status === 'unread').length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Read Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
              <div className="text-3xl font-bold">{messages.filter(m => m.status === 'read').length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Archived Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Trash className="h-8 w-8 text-gray-600 mr-3" />
              <div className="text-3xl font-bold">{messages.filter(m => m.status === 'archived').length}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-red-600" />
              Subject Distribution
            </CardTitle>
            <CardDescription>
              Number of messages by subject category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={getSubjectData()}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} messages`, 'Count']} />
                    <Legend />
                    <Bar dataKey="count" name="Number of Messages" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChartIcon className="mr-2 h-5 w-5 text-red-600" />
              Message Status Distribution
            </CardTitle>
            <CardDescription>
              Breakdown of messages by status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getStatusData()}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={60}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {getStatusData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} messages`, 'Count']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Message List Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <CardTitle className="text-xl font-bold">Contact Messages</CardTitle>
            <div className="flex gap-2 items-center">
              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-md p-1">
                <Button 
                  variant={viewMode === 'cards' ? "default" : "ghost"} 
                  size="sm" 
                  onClick={() => setViewMode('cards')}
                  className="h-8"
                >
                  <MessageSquare className="h-4 w-4 mr-1" /> Detailed
                </Button>
                <Button 
                  variant={viewMode === 'compact' ? "default" : "ghost"} 
                  size="sm" 
                  onClick={() => setViewMode('compact')}
                  className="h-8"
                >
                  <Inbox className="h-4 w-4 mr-1" /> Compact
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Inbox className="h-4 w-4" />
                <span>All</span>
                <Badge className="ml-1 bg-red-600">{messages.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="unread" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Unread</span>
                <Badge className="ml-1 bg-red-600">
                  {messages.filter(m => m.status === 'unread').length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="read" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Read</span>
                <Badge className="ml-1 bg-green-600">
                  {messages.filter(m => m.status === 'read').length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="archived" className="flex items-center gap-2">
                <Trash className="h-4 w-4" />
                <span>Archived</span>
                <Badge className="ml-1 bg-gray-600">
                  {messages.filter(m => m.status === 'archived').length}
                </Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">Loading messages...</p>
                </div>
              ) : error ? (
                <div className="rounded-lg bg-red-50 dark:bg-red-900/30 p-4 mb-6">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                    <p className="text-red-600 dark:text-red-400">{error}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="ml-auto" 
                      onClick={retryFetchMessages}
                    >
                      Retry
                    </Button>
                  </div>
                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <Inbox className="h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No messages yet</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    When users submit contact form messages, they will appear here.
                  </p>
                  <Button onClick={retryFetchMessages}>
                    Refresh Messages
                  </Button>
                </div>
              ) : viewMode === 'compact' ? (
                // Compact view
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                      {filteredMessages.map((message) => (
                        <tr key={message._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium">{message.name}</div>
                            <div className="text-sm text-gray-500">{message.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="secondary">
                              {message.subject === 'admission' ? 'Admission Inquiry' :
                              message.subject === 'course' ? 'Course Information' :
                              message.subject === 'faculty' ? 'Faculty Contact' : 'Other'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getStatusColor(message.status)}>
                              {message.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(message.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-2">
                              {message.status === 'unread' && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => updateMessageStatus(message._id, 'read')}
                                  className="h-8"
                                >
                                  <CheckCircle className="h-3 w-3 mr-1" /> Read
                                </Button>
                              )}
                              {message.status !== 'archived' && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => updateMessageStatus(message._id, 'archived')}
                                  className="h-8"
                                >
                                  <Trash className="h-3 w-3 mr-1" /> Archive
                                </Button>
                              )}
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => confirmDeleteMessage(message._id)}
                                className="h-8 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-800/30 dark:hover:bg-red-900/20"
                              >
                                <AlertTriangle className="h-3 w-3 mr-1" /> Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                // Card view (default)
                <div className="grid gap-6">
                  {filteredMessages.map((message) => (
                    <Card key={message._id} className="overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow duration-300">
                      <CardHeader className="pb-3 bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <CardTitle className="text-lg">{message.name}</CardTitle>
                              <Badge className={getStatusColor(message.status)}>
                                {message.status}
                              </Badge>
                            </div>
                            <CardDescription className="mt-1 space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <a href={`mailto:${message.email}`} className="text-red-600 hover:underline">
                                  {message.email}
                                </a>
                              </div>
                              
                              {message.phone && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="h-4 w-4 text-gray-400" />
                                  <a href={`tel:${message.phone}`} className="text-red-600 hover:underline">
                                    {message.phone}
                                  </a>
                                </div>
                              )}
                              
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span>{formatDate(message.createdAt)}</span>
                              </div>
                            </CardDescription>
                          </div>
                          <div className="flex gap-2 self-start">
                            {message.status === 'unread' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateMessageStatus(message._id, 'read')}
                                className="text-green-600 border-green-200 hover:border-green-300 hover:bg-green-50"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" /> Mark as Read
                              </Button>
                            )}
                            {message.status !== 'archived' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateMessageStatus(message._id, 'archived')}
                                className="text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                              >
                                <Trash className="h-4 w-4 mr-1" /> Archive
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => confirmDeleteMessage(message._id)}
                              className="text-red-600 border-red-200 hover:border-red-300 hover:bg-red-50"
                            >
                              <AlertTriangle className="h-4 w-4 mr-1" /> Delete
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="py-4">
                        <div className="mb-3">
                          <span className="font-medium">Subject: </span>
                          <Badge variant="secondary" className="ml-2">
                            {message.subject === 'admission' ? 'Admission Inquiry' :
                            message.subject === 'course' ? 'Course Information' :
                            message.subject === 'faculty' ? 'Faculty Contact' : 'Other'}
                          </Badge>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                            {message.message}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this message?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the message from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteMessage} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 