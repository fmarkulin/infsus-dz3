"use server";

import {
  addOrganization,
  setEntry,
  updateOrganization,
} from "@/data/firestore";
import { JournalEntry } from "@/global";
import { z } from "zod";

const organizationSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const organizationSubmit = async (
  values: z.infer<typeof organizationSchema>
) => {
  await addOrganization(values);
};

export const organizationUpdate = async (
  id: string,
  values: z.infer<typeof organizationSchema>
) => {
  await updateOrganization(id, values);
};

export const entrySubmit = async (
  entry: Omit<JournalEntry, "category" | "organization"> & {
    category: string;
    organization: string;
  }
) => {
  await setEntry(entry);
};
