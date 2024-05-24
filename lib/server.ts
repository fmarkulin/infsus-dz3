"use server";

import {
  addOrganization,
  setCategory,
  setEntry,
  updateCategory,
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

const categoryUpdateSchema = z.object({
  description: z.string(),
});

const categorySetSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
});

export const categorySubmit = async (
  values: z.infer<typeof categorySetSchema>
) => {
  await setCategory(values);
};

export const categoryUpdate = async (
  id: string,
  values: z.infer<typeof categoryUpdateSchema>
) => {
  await updateCategory(id, values);
};
