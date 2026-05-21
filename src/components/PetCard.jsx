import { useState } from "react";

function PetCard({
  pet,
  onDeletePet,
  onUpdatePet,
}) {

  const [isEditing, setIsEditing] =
    useState(false);

  const [editedPet, setEditedPet] =
    useState({
      ...pet,
    });

  function handleChange(event) {
    const { name, value } = event.target;

    setEditedPet((currentPet) => ({
      ...currentPet,
      [name]: value,
    }));
  }

  function handleSave() {
    onUpdatePet(editedPet);
    setIsEditing(false);
  }

  return (
    <article className="pet-card">

      {isEditing ? (
        <>
          <input
            name="name"
            value={editedPet.name}
            onChange={handleChange}
          />

          <select
            name="type"
            value={editedPet.type}
            onChange={handleChange}
          >
            <option>Cat</option>
            <option>Dog</option>
          </select>
        </>
      ) : (
        <>
          <div>
            <p className="pet-type">
              {pet.type}
            </p>

            <h2>{pet.name}</h2>
          </div>
        </>
      )}

      <p>{pet.status}</p>

      <span
        className={`appetite-badge ${pet.appetite.toLowerCase()}`}
      >
        {pet.appetite}
      </span>

      <div className="pet-card-actions">

        {isEditing ? (
          <button onClick={handleSave}>
            Save
          </button>
        ) : (
          <button
            className="edit-button"
            onClick={() =>
              setIsEditing(true)
            }
          >
            Edit
          </button>
        )}

        <button
          className="delete-button"
          onClick={() =>
            onDeletePet(pet)
          }
        >
          Delete pet
        </button>

      </div>

    </article>
  );
}

export default PetCard;