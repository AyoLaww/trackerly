"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ApplicationForm } from "./application-form";
import { useState } from "react";
import type { JobApplication } from "@/lib/db/schema";

export function EditApplicationDialog({ application }: { application: JobApplication }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-blue-600 hover:text-blue-900">Edit</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Application</DialogTitle>
        </DialogHeader>
        <ApplicationForm application={application} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}