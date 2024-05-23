"use server";

import { addOrganization, updateOrganization } from "@/data/firestore";
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
