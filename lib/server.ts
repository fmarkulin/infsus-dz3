"use server";

import { db } from "@/data/firebase";
import { addDoc, collection } from "firebase/firestore";
import { z } from "zod";

const organizationSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const organizationSubmit = async (
  values: z.infer<typeof organizationSchema>
) => {
  await addDoc(collection(db, "organizations"), values);
};
