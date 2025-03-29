import ExampleData from '@/app/components/example-data';

export default function MongoDBTestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">MongoDB Connection Test</h1>
        <p className="text-gray-600 dark:text-gray-300">
          This page tests your MongoDB connection using environment variables
        </p>
      </div>
      
      <div className="mt-8">
        <ExampleData />
      </div>
    </div>
  );
} 