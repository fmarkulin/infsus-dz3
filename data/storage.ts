import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "./firebase";

export async function setEntryImg(
  entryId: string,
  file: File
): Promise<string> {
  const storageRef = ref(storage, `entries/asdf1234/${entryId}/${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function deleteFolder(uid: string, id: string) {
  const storageRef = ref(storage, `entries/${uid}/${id}`);
  const files = await listAll(storageRef);
  await Promise.all(
    files.items.map(async (fileRef) => {
      await deleteObject(fileRef);
    })
  );
}

export async function deleteImg(uid: string, id: string, url: string) {
  const storageRef = ref(storage, `entries/${uid}/${id}`);
  const files = await listAll(storageRef);
  for (const file of files.items) {
    const fileUrl = await getDownloadURL(file);
    if (fileUrl === url) {
      await deleteObject(file);
      return;
    }
  }
}
