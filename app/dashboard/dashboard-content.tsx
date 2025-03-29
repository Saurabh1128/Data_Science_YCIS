'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Inbox, Clock, CheckCircle, Trash, AlertTriangle, BarChart } from 'lucide-react';
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
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type Message = {
  _id: string;
  name: string;
  email: string;
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

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/dashboard/messages');
      
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      
      const data = await response.json();
      setMessages(data.messages);
    } catch (err) {
      setError('Error loading messages. Please try again.');
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
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
    <div className="space-y-8">
      {/* Analytics Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Message Analytics</h2>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="mr-2 h-5 w-5 text-red-600" />
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
                  <RechartsBarChart
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
                  </RechartsBarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
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
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300">
              {error}
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="text-center py-8 border rounded-lg bg-gray-50 dark:bg-gray-800">
              <p className="text-gray-500 dark:text-gray-400">No messages found.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredMessages.map((message) => (
                <Card key={message._id} className="overflow-hidden">
                  <CardHeader className="pb-3 flex-row items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>{message.name}</CardTitle>
                        <Badge className={getStatusColor(message.status)}>
                          {message.status}
                        </Badge>
                      </div>
                      <CardDescription className="mt-1">
                        <a href={`mailto:${message.email}`} className="text-red-600 hover:underline">
                          {message.email}
                        </a>
                        <span className="mx-2">•</span>
                        <span>{formatDate(message.createdAt)}</span>
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
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
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3">
                      <span className="font-medium">Subject: </span>
                      <Badge variant="secondary" className="ml-2">
                        {message.subject === 'admission' ? 'Admission Inquiry' :
                         message.subject === 'course' ? 'Course Information' :
                         message.subject === 'faculty' ? 'Faculty Contact' : 'Other'}
                      </Badge>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {message.message}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

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