import { JournalCategory } from "@/global";
import {
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
import { db } from "./firebase";

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

export const checkCategoryName = async (name: string) => {
  const snap = await getDoc(doc(db, "categories", name));
  return snap.exists();
};

export const setCategory = async (data: JournalCategory) => {
  await setDoc(doc(db, "categories", data.name), data);
};
