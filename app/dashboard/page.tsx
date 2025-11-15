import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { jobApplications } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { AddApplicationDialog } from "@/components/add-application-dialog";
import { EditApplicationDialog } from "@/components/edit-application-dialog";
import { DeleteApplicationButton } from "@/components/delete-application-dialog";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  const applications = await db
    .select()
    .from(jobApplications)
    .where(eq(jobApplications.userId, session.user.id))
    .orderBy(jobApplications.createdAt);

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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Total"
          value={applications.length}
          color="bg-blue-50 text-blue-700"
        />
        <StatCard
          title="Applied"
          value={applications.filter((app) => app.status === "applied").length}
          color="bg-gray-50 text-gray-700"
        />
        <StatCard
          title="Interviewing"
          value={applications.filter((app) => app.status === "interviewing").length}
          color="bg-yellow-50 text-yellow-700"
        />
        <StatCard
          title="Offer"
          value={applications.filter((app) => app.status === "offer").length}
          color="bg-purple-50 text-purple-700"
        />
        <StatCard
          title="Accepted"
          value={applications.filter((app) => app.status === "accepted").length}
          color="bg-green-50 text-green-700"
        />
      </div>

      {/* Applications List */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Your Applications</h3>
          <AddApplicationDialog />
        </div>

        {applications.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">No applications yet.</p>
            <p className="mt-1 text-sm text-gray-400">
              Click Add Application to get started!
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