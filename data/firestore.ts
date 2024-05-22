import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZWdP5vrEZVsm5z5ow88KdsldiKDwOMdA",
  authDomain: "mobbi-journal.firebaseapp.com",
  projectId: "mobbi-journal",
  storageBucket: "mobbi-journal.appspot.com",
  messagingSenderId: "442074224842",
  appId: "1:442074224842:web:5c99f92577463ec7ef7c33",
  measurementId: "G-NMY1EKXQM5",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
if (process.env.NODE_ENV === "development") {
  console.log("development mode");
  connectFirestoreEmulator(db, "localhost", 8080);
  connectStorageEmulator(storage, "localhost", 9199);
  console.log("connected to emulators");
}
