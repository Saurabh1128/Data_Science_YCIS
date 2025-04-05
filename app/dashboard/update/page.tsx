import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Update Records',
  description: 'Update existing records in the dashboard',
};

export default function UpdatePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Update Records</h2>
        <p className="text-muted-foreground">
          Modify and update existing records in the system.
        </p>
      </div>
      {/* Update form will be implemented here */}
      <div className="border rounded-lg p-4">
        <p className="text-muted-foreground">Update functionality coming soon...</p>
      </div>
    </div>
  );
}