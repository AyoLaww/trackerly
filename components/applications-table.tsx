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
      {/* Filters */}
      <div className="mb-4">
        <ApplicationFilters
          currentFilter={currentFilter}
          currentSort={currentSort}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
      </div>

      {/* Table or Empty State */}
      {applications.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-500">
            {currentFilter === "all" 
              ? "No applications yet." 
              : `No ${currentFilter} applications.`}
          </p>
          <p className="mt-1 text-sm text-gray-400">
            {currentFilter === "all" 
              ? "Click 'Add Application' to get started!" 
              : "Try changing the filter."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Applied Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {applications.map((app) => (
                <tr key={app.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {app.companyName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {app.jobTitle}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {new Date(app.appliedDate).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 space-x-2">
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

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    applied: "bg-gray-100 text-gray-800",
    interviewing: "bg-yellow-100 text-yellow-800",
    offer: "bg-purple-100 text-purple-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${colors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}