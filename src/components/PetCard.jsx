function PetCard({ pet, onDeletePet }) {
    return (
        <article className="pet-card">
            <div>
                <p className="pet-type">{pet.type}</p>
                <h2>{pet.name}</h2>
            </div>

            <p>{pet.status}</p>

            <span className={`appetite-badge ${pet.appetite.toLowerCase()}`}>
                {pet.appetite}
            </span>

            <button
                className="delete-button"
                onClick={() => onDeletePet(pet)}
            >
                Delete pet
            </button>
        </article>
    );
}

export default PetCard;