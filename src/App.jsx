import "./index.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PetCard from "./components/PetCard";
import ActivityFeed from "./components/ActivityFeed";
import StatsBar from "./components/StatsBar";
import MealForm from "./components/MealForm";

import { pets } from "./data/pets";

function App() {
  return (
    <main className="app-shell">

      <Navbar />

      <div className="content-container">

        <div className="dashboard-layout">

          <section>

            <Hero />

            <StatsBar />

            <MealForm />

            <section className="pet-grid">
              {pets.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                />
              ))}
            </section>

          </section>

          <ActivityFeed />

        </div>

      </div>
    </main>
  );
}

export default App;