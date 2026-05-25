import { useEffect, useState } from "react";
import "./index.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PetCard from "./components/PetCard";
import StatsBar from "./components/StatsBar";
import MealForm from "./components/MealForm";
import ActivityFeed from "./components/ActivityFeed";
import AddPetForm from "./components/AddPetForm";
import Modal from "./components/Modal";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import SplashScreen from "./components/SplashScreen";

import { pets as startingPets } from "./data/pets";

import {
  saveEntry,
  savePet,
  clearCollection,
  deletePet,
  deleteEntry,
  updatePet,
  subscribeToEntries,
  subscribeToPets,
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
  const [showSplash, setShowSplash] = useState(true);

  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [isPetModalOpen, setIsPetModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("tummyTrackerEntries", JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem("tummyTrackerPets", JSON.stringify(pets));
  }, [pets]);

  useEffect(() => {
    if (!user) {
      setEntries([]);
      return;
    }

    const unsubscribe = subscribeToEntries(user.uid, setEntries);

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user) {
      setPets([]);
      return;
    }

    const unsubscribe = subscribeToPets(user.uid, setPets);

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3300);

    return () => clearTimeout(timer);
  }, []);

  async function handleAddEntry(newEntry) {
    if (!user) return;

    const entryWithUser = {
      ...newEntry,
      userId: user.uid,
    };

    await saveEntry(entryWithUser);

    const matchingPet = pets.find((pet) => pet.name === entryWithUser.petName);

    if (matchingPet?.firestoreId) {
      await updatePet(matchingPet.firestoreId, {
        ...matchingPet,
        status: `${entryWithUser.appetite} ${entryWithUser.mealType.toLowerCase()}`,
        appetite:
          entryWithUser.appetite === "Ate all" ||
          entryWithUser.appetite === "Ate some"
            ? "Good"
            : "Watch",
      });
    }
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
      currentPets.map((pet) => (pet.id === updatedPet.id ? updatedPet : pet))
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

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <main className="app-shell">
      <Navbar
        user={user}
        onResetApp={handleResetApp}
        onLogMealClick={() => setIsMealModalOpen(true)}
        onAddPetClick={() => setIsPetModalOpen(true)}
      />

      <div className="content-container">
        <div className="dashboard-layout">
          <section>
            <Hero
              onLogMealClick={() => setIsMealModalOpen(true)}
              onAddPetClick={() => setIsPetModalOpen(true)}
            />

            <StatsBar entries={entries} pets={pets} />

            {pets.length === 0 && (
              <AddPetForm onAddPet={handleAddPet} />
            )}

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

          <ActivityFeed entries={entries} onDeleteEntry={handleDeleteEntry} />
        </div>
      </div>

      <Modal
        title="Log a meal"
        isOpen={isMealModalOpen}
        onClose={() => setIsMealModalOpen(false)}
      >
        <MealForm
          onAddEntry={(entry) => {
            handleAddEntry(entry);
            setIsMealModalOpen(false);
          }}
          pets={pets}
        />
      </Modal>

      <Modal
        title="Add a pet"
        isOpen={isPetModalOpen}
        onClose={() => setIsPetModalOpen(false)}
      >
        <AddPetForm
          onAddPet={(pet) => {
            handleAddPet(pet);
            setIsPetModalOpen(false);
          }}
        />
      </Modal>
    </main>
  );
}

export default App;