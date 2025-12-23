"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { JobApplication } from "@/lib/db/schema";
import { EditApplicationDialog } from "./edit-application-dialog";
import { DeleteApplicationButton } from "./delete-application-dialog";
import { ApplicationFilters, FilterType, SortType } from "./application-filters";

interface ApplicationsTableProps {
  applications: JobApplication[];
  currentFilter: FilterType;
  currentSort: SortType;
}

export function ApplicationsTable({ 
  applications, 
  currentFilter,
  currentSort 
}: ApplicationsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (filter: FilterType) => {
    const params = new URLSearchParams(searchParams.toString());
    if (filter === "all") {
      params.delete("filter");
    } else {
      params.set("filter", filter);
    }
    router.push(`/dashboard?${params.toString()}`);
  };

  const handleSortChange = (sort: SortType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);
    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <>
      <div className="mb-4">
        <ApplicationFilters
          currentFilter={currentFilter}
          currentSort={currentSort}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
      </div>

      {applications.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            {currentFilter === "all" 
              ? "No applications yet." 
              : `No ${currentFilter} applications.`}
          </p>
          <p className="mt-1 text-sm text-muted-foreground/70">
            {currentFilter === "all" 
              ? "Click 'Add Application' to get started!" 
              : "Try changing the filter."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Applied Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-muted/50 transition-colors">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    {app.companyName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                    {app.jobTitle}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                    {new Date(app.appliedDate).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm space-x-2">
                    <EditApplicationDialog application={app} />
                    <DeleteApplicationButton id={app.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

// Updated StatusBadge with theme colors
function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    applied: "bg-secondary text-secondary-foreground border-border",
    interviewing: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    offer: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
    accepted: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    rejected: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${variants[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}