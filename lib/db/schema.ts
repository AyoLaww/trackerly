import { pgTable, uuid, varchar, timestamp, pgEnum, text } from 'drizzle-orm/pg-core';

// Define the status enum
export const statusEnum = pgEnum('application_status', [
  'applied',
  'interviewing',
  'offer',
  'accepted',
  'rejected'
]);

// Define the job applications table
export const jobApplications = pgTable('job_applications', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  companyName: varchar('company_name', { length: 255 }).notNull(),
  jobTitle: varchar('job_title', { length: 255 }).notNull(),
  applicationUrl: varchar('application_url', { length: 500 }),
  status: statusEnum('status').notNull().default('applied'),
  appliedDate: timestamp('applied_date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Export types for TypeScript
export type JobApplication = typeof jobApplications.$inferSelect;
export type NewJobApplication = typeof jobApplications.$inferInsert;