"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { jobApplications } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

type ApplicationStatus = "applied" | "interviewing" | "offer" | "accepted" | "rejected";

export async function createApplication(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const companyName = formData.get("companyName") as string;
  const jobTitle = formData.get("jobTitle") as string;
  // const applicationUrl = formData.get("applicationUrl") as string;
  const status = formData.get("status") as ApplicationStatus;
  const appliedDate = formData.get("appliedDate") as string;

  await db.insert(jobApplications).values({
    userId: session.user.id,
    companyName,
    jobTitle,
    // applicationUrl: applicationUrl || null,
    status,
    appliedDate: new Date(appliedDate),
  });

  revalidatePath("/dashboard");
}

export async function updateApplication(id: string, formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const companyName = formData.get("companyName") as string;
  const jobTitle = formData.get("jobTitle") as string;
  // const applicationUrl = formData.get("applicationUrl") as string;
  const status = formData.get("status") as ApplicationStatus;
  const appliedDate = formData.get("appliedDate") as string;

  await db
    .update(jobApplications)
    .set({
      companyName,
      jobTitle,
      // applicationUrl: applicationUrl || null,
      status,
      appliedDate: new Date(appliedDate),
      updatedAt: new Date(),
    })
    .where(eq(jobApplications.id, id));

  revalidatePath("/dashboard");
}

export async function deleteApplication(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  await db.delete(jobApplications).where(eq(jobApplications.id, id));

  revalidatePath("/dashboard");
}