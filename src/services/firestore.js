import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase";

const entriesCollection = collection(db, "entries");
const petsCollection = collection(db, "pets");

export async function saveEntry(entry) {
  await addDoc(entriesCollection, entry);
}

export async function loadEntries() {
  const entriesQuery = query(entriesCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(entriesQuery);

  return snapshot.docs.map((document) => ({
    firestoreId: document.id,
    ...document.data(),
  }));
}

export async function savePet(pet) {
  const docRef = await addDoc(petsCollection, pet);
  return docRef.id;
}

export async function loadPets() {
  const snapshot = await getDocs(petsCollection);

  return snapshot.docs.map((document) => ({
    firestoreId: document.id,
    ...document.data(),
  }));
}

export async function clearCollection(collectionName) {
  const snapshot = await getDocs(collection(db, collectionName));

  const deletePromises = snapshot.docs.map((document) =>
    deleteDoc(doc(db, collectionName, document.id))
  );

  await Promise.all(deletePromises);
}

export async function deletePet(firestoreId) {
  await deleteDoc(doc(db, "pets", firestoreId));
}

export async function deleteEntry(firestoreId) {
  await deleteDoc(doc(db, "entries", firestoreId));
}