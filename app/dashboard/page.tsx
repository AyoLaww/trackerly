import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { jobApplications } from "@/lib/db/schema";
import { eq, desc, asc } from "drizzle-orm";
import { AddApplicationDialog } from "@/components/add-application-dialog";
import { ApplicationsTable } from "@/components/applications-table";
import type { FilterType, SortType } from "@/components/application-filters";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; sort?: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  // Await searchParams
  const params = await searchParams;

  // Fetch applications with sorting
  const sortOrder = params.sort === "earliest" ? asc : desc;
  
  const allApplications = await db
    .select()
    .from(jobApplications)
    .where(eq(jobApplications.userId, session.user.id))
    .orderBy(sortOrder(jobApplications.appliedDate));

  // Filter applications by status
  const filter = (params.filter || "all") as FilterType;
  const applications = filter === "all" 
    ? allApplications 
    : allApplications.filter((app) => app.status === filter);

  const sort = (params.sort || "latest") as SortType;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="mt-1 text-sm text-gray-600">
          Track and manage your job applications
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <StatCard
          title="Total"
          value={allApplications.length}
          color="bg-blue-50 text-blue-700"
        />
        <StatCard
          title="Applied"
          value={allApplications.filter((app) => app.status === "applied").length}
          color="bg-gray-50 text-gray-700"
        />
        <StatCard
          title="Interviewing"
          value={allApplications.filter((app) => app.status === "interviewing").length}
          color="bg-yellow-50 text-yellow-700"
        />
        <StatCard
          title="Offer"
          value={allApplications.filter((app) => app.status === "offer").length}
          color="bg-purple-50 text-purple-700"
        />
        <StatCard
          title="Accepted"
          value={allApplications.filter((app) => app.status === "accepted").length}
          color="bg-green-50 text-green-700"
        />
        <StatCard
          title="Rejected"
          value={allApplications.filter((app) => app.status === "rejected").length}
          color="bg-red-50 text-red-700"
        />
      </div>

      {/* Applications List */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Your Applications</h3>
          <AddApplicationDialog />
        </div>

        <ApplicationsTable 
          applications={applications}
          currentFilter={filter}
          currentSort={sort}
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
  return (
    <div className={`rounded-lg p-4 ${color}`}>
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}