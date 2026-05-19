import { useState } from "react";

function AddPetForm({ onAddPet }) {
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("Cat");

  function handleSubmit(event) {
    event.preventDefault();

    if (!petName.trim()) {
      return;
    }

    const newPet = {
      id: Date.now(),
      name: petName,
      type: petType,
      status: "No meals logged yet",
      appetite: "Good",
    };

    onAddPet(newPet);

    setPetName("");
    setPetType("Cat");
  }

  return (
    <section className="meal-form-card">
      <div>
        <p className="eyebrow">Pet Profiles</p>
        <h2>Add a new pet</h2>
      </div>

      <form className="meal-form" onSubmit={handleSubmit}>

        <label>
          Pet name

          <input
            type="text"
            value={petName}
            onChange={(event) =>
              setPetName(event.target.value)
            }
            placeholder="Example: PB"
          />
        </label>

        <label>
          Pet type

          <select
            value={petType}
            onChange={(event) =>
              setPetType(event.target.value)
            }
          >
            <option>Cat</option>
            <option>Dog</option>
            <option>Rabbit</option>
            <option>Bird</option>
          </select>
        </label>

        <button type="submit">
          Add Pet
        </button>

      </form>
    </section>
  );
}

export default AddPetForm;