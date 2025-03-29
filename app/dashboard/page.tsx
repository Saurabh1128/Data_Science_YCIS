import { Metadata } from 'next';
import DashboardContent from './dashboard-content';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Data Science Department',
  description: 'Admin dashboard for managing contact submissions',
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">
          View and manage contact form submissions
        </p>
      </div>
      
      <DashboardContent />
    </div>
  );
} 