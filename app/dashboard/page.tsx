import { Metadata } from 'next';
import DashboardOverview from './components/dashboard-overview';
import { DashboardSidebar } from './components/dashboard-sidebar';

export const metadata: Metadata = {
  title: 'Dashboard - Analytics Overview',
  description: 'View your analytics and performance metrics',
};

export default function DashboardPage() {
  return (
    <div className="flex h-full">
      <DashboardSidebar />
      <main className="flex-1 p-8">
        <div className="space-y-8">
          <DashboardOverview />
        </div>
      </main>
    </div>
  );
}