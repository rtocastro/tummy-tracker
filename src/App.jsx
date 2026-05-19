import "./index.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PetCard from "./components/PetCard";

import { pets } from "./data/pets";

function App() {
  return (
    <main className="app-shell">

      <Navbar />

      <div className="content-container">

        <Hero />

        <section className="pet-grid">
          {pets.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
            />
          ))}
        </section>

      </div>
    </main>
  );
}

export default App;