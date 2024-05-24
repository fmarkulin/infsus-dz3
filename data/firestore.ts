import { JournalCategory, JournalEntry, Organization } from "@/global";
import {
  addDoc,
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "./firebase";
import { ref } from "firebase/storage";
import { deleteFolder } from "./storage";

export const getOrganizations = async (): Promise<Organization[]> => {
  const snapshots = await getDocs(collection(db, "organizations"));
  return snapshots.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as Organization;
  });
};

export const getOrganization = async (id: string): Promise<Organization> => {
  const docRef = doc(db, "organizations", id);
  const docSnap = await getDoc(docRef);
  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as Organization;
};

export const deleteOrganization = async (id: string) => {
  const q = query(collection(db, "entries"), where("organization", "==", id));
  const snapshots = await getDocs(q);
  if (!snapshots.empty) {
    throw new Error("Organization is in use");
  }

  await deleteDoc(doc(db, "organizations", id));
};

export const updateOrganization = async (
  id: string,
  data: Partial<Organization>
) => {
  await updateDoc(doc(db, "organizations", id), data);
};

export const addOrganization = async (data: Omit<Organization, "id">) => {
  await addDoc(collection(db, "organizations"), data);
};

export const getEntryRef = () => doc(collection(db, "entries"));

export const getEntries = async (): Promise<JournalEntry[]> => {
  const snapshots = await getDocs(collection(db, "entries"));
  const entries = snapshots.docs.map(async (doc) => {
    const organization = await getOrganization(doc.data().organization);
    const category = await getCategory(doc.data().category);
    return {
      id: doc.id,
      ...doc.data(),
      organization,
      category,
    } as JournalEntry;
  });
  return Promise.all(entries);
};

export const deleteEntry = async (id: string, uid: string) => {
  await deleteDoc(doc(db, "entries", id));
  await deleteFolder(uid, id);
};

export const updateEntry = async (id: string, data: Partial<JournalEntry>) => {
  await updateDoc(doc(db, "entries", id), data);
};

export const setEntry = async (
  data: Omit<JournalEntry, "category" | "organization"> & {
    category: string;
    organization: string;
  }
) => {
  await setDoc(doc(db, "entries", data.id), data);
};

export const getCategories = async (): Promise<JournalCategory[]> => {
  const snapshots = await getDocs(collection(db, "categories"));
  return snapshots.docs.map((doc) => {
    return {
      ...doc.data(),
    } as JournalCategory;
  });
};

export const getCategory = async (id: string): Promise<JournalCategory> => {
  const docRef = doc(db, "categories", id);
  const docSnap = await getDoc(docRef);
  return {
    ...docSnap.data(),
  } as JournalCategory;
};

export const deleteCategory = async (id: string) => {
  const q = query(collection(db, "entries"), where("category", "==", id));
  const snapshots = await getDocs(q);
  if (!snapshots.empty) {
    throw new Error("Category is in use");
  }

  await deleteDoc(doc(db, "categories", id));
};

export const updateCategory = async (
  id: string,
  data: Partial<JournalCategory>
) => {
  await updateDoc(doc(db, "categories", id), data);
};

export const setCategory = async (data: JournalCategory) => {
  const snap = await getDoc(doc(db, "categories", data.name));
  if (snap.exists()) {
    throw new Error("Category already exists");
  }
  await setDoc(doc(db, "categories", data.name), data);
};

export const deleteImgFromEntry = async (entryId: string, url: string) => {
  await updateDoc(doc(db, "entries", entryId), {
    attachments: arrayRemove(url),
  });
};
