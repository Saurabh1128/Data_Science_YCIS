import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Insert Records',
  description: 'Insert new records in the dashboard',
};

export default function InsertPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Insert Records</h2>
        <p className="text-muted-foreground">
          Add new records to the system.
        </p>
      </div>
      {/* Insert form will be implemented here */}
      <div className="border rounded-lg p-4">
        <p className="text-muted-foreground">Insert functionality coming soon...</p>
      </div>
    </div>
  );
}