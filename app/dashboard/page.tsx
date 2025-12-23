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

  const params = await searchParams;
  const sortOrder = params.sort === "earliest" ? asc : desc;
  
  const allApplications = await db
    .select()
    .from(jobApplications)
    .where(eq(jobApplications.userId, session.user.id))
    .orderBy(sortOrder(jobApplications.appliedDate));

  const filter = (params.filter || "all") as FilterType;
  const applications = filter === "all" 
    ? allApplications 
    : allApplications.filter((app) => app.status === filter);

  const sort = (params.sort || "latest") as SortType;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Track and manage your job applications
        </p>
      </div>

      {/* Stats - Updated with new theme colors */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <StatCard
          title="Total"
          value={allApplications.length}
          variant="primary"
        />
        <StatCard
          title="Applied"
          value={allApplications.filter((app) => app.status === "applied").length}
          variant="secondary"
        />
        <StatCard
          title="Interviewing"
          value={allApplications.filter((app) => app.status === "interviewing").length}
          variant="warning"
        />
        <StatCard
          title="Offer"
          value={allApplications.filter((app) => app.status === "offer").length}
          variant="accent"
        />
        <StatCard
          title="Accepted"
          value={allApplications.filter((app) => app.status === "accepted").length}
          variant="success"
        />
        <StatCard
          title="Rejected"
          value={allApplications.filter((app) => app.status === "rejected").length}
          variant="destructive"
        />
      </div>

      {/* Applications List */}
      <div className="rounded-lg border bg-card p-6 shadow-sm">
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

// Updated StatCard with theme-based variants
function StatCard({ 
  title, 
  value, 
  variant = "primary" 
}: { 
  title: string; 
  value: number; 
  variant?: "primary" | "secondary" | "accent" | "warning" | "success" | "destructive";
}) {
  const variants = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary text-secondary-foreground border-border",
    accent: "bg-accent/10 text-accent border-accent/20",
    warning: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    success: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    destructive: "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <div className={`rounded-lg border p-4 transition-all hover:shadow-md ${variants[variant]}`}>
      <p className="text-sm font-medium opacity-90">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}