"use server";

import { setCategory, updateCategory } from "@/data/categories";
import { z } from "zod";

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
