import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase";

const entriesCollection = collection(db, "entries");
const petsCollection = collection(db, "pets");

export async function saveEntry(entry) {
  await addDoc(entriesCollection, entry);
}

export async function loadEntries() {
  const entriesQuery = query(
    entriesCollection,
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(entriesQuery);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function savePet(pet) {
  await addDoc(petsCollection, pet);
}

export async function loadPets() {
  const snapshot = await getDocs(petsCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}