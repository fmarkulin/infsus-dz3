import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

export async function setEntryImg(
  entryId: string,
  file: File
): Promise<string> {
  const storageRef = ref(storage, `entries/asdf1234/${entryId}/${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}
