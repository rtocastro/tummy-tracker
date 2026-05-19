import { useState } from "react";
import "./index.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PetCard from "./components/PetCard";
import StatsBar from "./components/StatsBar";
import MealForm from "./components/MealForm";
import ActivityFeed from "./components/ActivityFeed";

import { pets as startingPets } from "./data/pets";

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

function App() {
  const [entries, setEntries] = useState(startingEntries);
  const [pets, setPets] = useState(startingPets);

  function handleAddEntry(newEntry) {
    setEntries((currentEntries) => [newEntry, ...currentEntries]);

    setPets((currentPets) =>
      currentPets.map((pet) => {
        if (pet.name !== newEntry.petName) {
          return pet;
        }

        return {
          ...pet,
          status: `${newEntry.appetite} ${newEntry.mealType.toLowerCase()}`,
          appetite:
            newEntry.appetite === "Ate all" || newEntry.appetite === "Ate some"
              ? "Good"
              : "Watch",
        };
      })
    );
  }

  return (
    <main className="app-shell">
      <Navbar />

      <div className="content-container">
        <div className="dashboard-layout">
          <section>
            <Hero />

            <StatsBar entries={entries} pets={pets} />

            <MealForm onAddEntry={handleAddEntry} />

            <section className="pet-grid">
              {pets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </section>
          </section>

          <ActivityFeed entries={entries} />
        </div>
      </div>
    </main>
  );
}

export default App;