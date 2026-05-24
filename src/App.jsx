import { useEffect, useState } from "react";
import "./index.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PetCard from "./components/PetCard";
import StatsBar from "./components/StatsBar";
import MealForm from "./components/MealForm";
import ActivityFeed from "./components/ActivityFeed";
import AddPetForm from "./components/AddPetForm";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import AuthPanel from "./components/AuthPanel";

import { pets as startingPets } from "./data/pets";

import {
  saveEntry,
  loadEntries,
  savePet,
  loadPets,
  clearCollection,
  deletePet,
  deleteEntry,
  updatePet,
} from "./services/firestore";

const startingEntries = [
  {
    id: 1,
    type: "meal",
    time: "8:12 AM",
    text: "Mochi finished breakfast.",
  },
  {
    id: 2,
    type: "meal",
    time: "1:45 PM",
    text: "Bean skipped lunch.",
  },
  {
    id: 3,
    type: "water",
    time: "4:20 PM",
    text: "Water bowl refilled.",
  },
];

function getSavedData(key, fallbackData) {
  const savedData = localStorage.getItem(key);

  if (!savedData) {
    return fallbackData;
  }

  return JSON.parse(savedData);
}

function App() {
  const [entries, setEntries] = useState(() =>
    getSavedData("tummyTrackerEntries", startingEntries)
  );

  const [pets, setPets] = useState(() =>
    getSavedData("tummyTrackerPets", startingPets)
  );

  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("tummyTrackerEntries", JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem("tummyTrackerPets", JSON.stringify(pets));
  }, [pets]);

  useEffect(() => {
    async function fetchEntries() {

      if (!user) {
        setEntries([]);
        return;
      }

      const firestoreEntries =
        await loadEntries(user.uid);

      setEntries(firestoreEntries);
    }

    fetchEntries();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function fetchPets() {

      if (!user) {
        setPets([]);
        return;
      }

      const firestorePets =
        await loadPets(user.uid);

      setPets(firestorePets);
    }

    fetchPets();
  }, [user]);

  async function handleAddEntry(newEntry) {
    if (!user) return;

    const entryWithUser = {
      ...newEntry,
      userId: user.uid,
    };

    await saveEntry(entryWithUser);

    setEntries((currentEntries) => [entryWithUser, ...currentEntries]);

    setPets((currentPets) =>
      currentPets.map((pet) => {
        if (pet.name !== entryWithUser.petName) {
          return pet;
        }

        return {
          ...pet,
          status: `${entryWithUser.appetite} ${entryWithUser.mealType.toLowerCase()}`,
          appetite:
            entryWithUser.appetite === "Ate all" ||
              entryWithUser.appetite === "Ate some"
              ? "Good"
              : "Watch",
        };
      })
    );
  }

  async function handleResetApp() {
    await clearCollection("entries");
    await clearCollection("pets");

    setEntries(startingEntries);
    setPets(startingPets);

    localStorage.removeItem("tummyTrackerEntries");
    localStorage.removeItem("tummyTrackerPets");
  }

  async function handleAddPet(newPet) {
    if (!user) return;

    const petWithUser = {
      ...newPet,
      userId: user.uid,
    };

    const firestoreId = await savePet(petWithUser);

    setPets((currentPets) => [
      ...currentPets,
      {
        ...petWithUser,
        firestoreId,
      },
    ]);
  }

  async function handleDeletePet(pet) {
    if (pet.firestoreId) {
      await deletePet(pet.firestoreId);
    }

    setPets((currentPets) =>
      currentPets.filter((currentPet) => currentPet.id !== pet.id)
    );
  }

  async function handleUpdatePet(updatedPet) {
    if (updatedPet.firestoreId) {
      await updatePet(updatedPet.firestoreId, {
        name: updatedPet.name,
        type: updatedPet.type,
        status: updatedPet.status,
        appetite: updatedPet.appetite,
        id: updatedPet.id,
      });
    }

    setPets((currentPets) =>
      currentPets.map((pet) =>
        pet.id === updatedPet.id ? updatedPet : pet
      )
    );
  }

  async function handleDeleteEntry(entry) {
    if (entry.firestoreId) {
      await deleteEntry(entry.firestoreId);
    }

    setEntries((currentEntries) =>
      currentEntries.filter((currentEntry) => currentEntry.id !== entry.id)
    );
  }

  return (
    <main className="app-shell">
      <Navbar onResetApp={handleResetApp} />

      <div className="content-container">
        <div className="dashboard-layout">
          <section>
            <Hero />
            <AuthPanel user={user} />

            <StatsBar entries={entries} pets={pets} />

            <MealForm onAddEntry={handleAddEntry} pets={pets} />

            <AddPetForm onAddPet={handleAddPet} />

            <section className="pet-grid">
              {pets.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  onDeletePet={handleDeletePet}
                  onUpdatePet={handleUpdatePet}
                />
              ))}
            </section>
          </section>

          <ActivityFeed
            entries={entries}
            onDeleteEntry={handleDeleteEntry}
          />
        </div>
      </div>
    </main>
  );
}

export default App;