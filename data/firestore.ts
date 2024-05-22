import { Organization } from "@/global";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export const getOrganizations = async (): Promise<Organization[]> => {
  const snapshots = await getDocs(collection(db, "organizations"));
  return snapshots.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as Organization;
  });
};

export const deleteOrganization = async (id: string) => {
  await deleteDoc(doc(db, "organizations", id));
};

export const updateOrganization = async (
  id: string,
  data: Partial<Organization>
) => {
  await updateDoc(doc(db, "organizations", id), data);
};
