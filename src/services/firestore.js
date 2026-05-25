import {
  collection,
  addDoc,
  getDocs,
  query,
  deleteDoc,
  doc,
  updateDoc,
  where,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase";

const entriesCollection = collection(db, "entries");
const petsCollection = collection(db, "pets");

export async function saveEntry(entry) {
  await addDoc(entriesCollection, entry);
}

export function subscribeToEntries(userId, callback) {
  const entriesQuery = query(entriesCollection, where("userId", "==", userId));

  return onSnapshot(entriesQuery, (snapshot) => {
    const entries = snapshot.docs
      .map((document) => ({
        ...document.data(),
        firestoreId: document.id,
      }))
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    callback(entries);
  });
}

export async function savePet(pet) {
  const docRef = await addDoc(petsCollection, pet);
  return docRef.id;
}

export function subscribeToPets(userId, callback) {
  const petsQuery = query(petsCollection, where("userId", "==", userId));

  return onSnapshot(petsQuery, (snapshot) => {
    const pets = snapshot.docs.map((document) => ({
      ...document.data(),
      firestoreId: document.id,
    }));

    callback(pets);
  });
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

export async function updatePet(firestoreId, updatedPet) {
  await updateDoc(doc(db, "pets", firestoreId), updatedPet);
}