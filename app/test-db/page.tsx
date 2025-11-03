import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export default async function TestDbPage() {
  let connectionSuccess = false;
  let currentTime = null;
  let tableExists = false;
  let errorMessage = null;

  try {
    // Test basic connection
    const result = await db.execute(sql`SELECT NOW() as current_time`);
    currentTime = result.rows[0];
    connectionSuccess = true;
    
    // Test that our table exists
    const tableCheck = await db.execute(
      sql`SELECT table_name FROM information_schema.tables WHERE table_name = 'job_applications'`
    );
    tableExists = tableCheck.rows.length > 0;
  } catch (error) {
    errorMessage = String(error);
  }

  if (!connectionSuccess) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">❌ Database connection failed!</p>
          <pre className="mt-2 text-sm overflow-auto">{errorMessage}</pre>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
      
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
        <p className="font-bold">✅ Database connected successfully!</p>
        <p className="text-sm mt-2">Current time from DB: {JSON.stringify(currentTime)}</p>
      </div>

      <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
        <p className="font-bold">📊 Tables Found:</p>
        <pre className="text-sm mt-2">
          {tableExists 
            ? '✅ job_applications table exists' 
            : '❌ job_applications table not found'}
        </pre>
      </div>
    </div>
  );
}