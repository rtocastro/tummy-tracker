import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
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
  const entriesQuery = query(
    entriesCollection,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(entriesQuery, (snapshot) => {
    const entries = snapshot.docs.map((document) => ({
      ...document.data(),
      firestoreId: document.id,
    }));

    callback(entries);
  });
}

export async function loadEntries(userId) {
  const entriesQuery = query(
    entriesCollection,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(entriesQuery);

  return snapshot.docs.map((document) => ({
    ...document.data(),
    firestoreId: document.id,
  }));
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

export async function loadPets(userId) {
  const petsQuery = query(petsCollection, where("userId", "==", userId));

  const snapshot = await getDocs(petsQuery);

  return snapshot.docs.map((document) => ({
    ...document.data(),
    firestoreId: document.id,
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

export async function updatePet(firestoreId, updatedPet) {
  await updateDoc(doc(db, "pets", firestoreId), updatedPet);
}