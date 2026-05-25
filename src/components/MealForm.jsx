import { useEffect, useState } from "react";

function MealForm({ onAddEntry, pets }) {
    const [formData, setFormData] = useState({
        petName: "",
        mealType: "Breakfast",
        appetite: "Ate all",
        notes: "",
    });

    useEffect(() => {
        if (pets.length > 0 && !formData.petName) {
            setFormData((currentData) => ({
                ...currentData,
                petName: pets[0].name,
            }));
        }
    }, [pets, formData.petName]);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        const newEntry = {
            id: Date.now(),
            type: "meal",
            petName: formData.petName,
            mealType: formData.mealType,
            appetite: formData.appetite,
            notes: formData.notes,
            createdAt: Date.now(),
            time: new Date().toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
            }),
            text: `${formData.petName} logged ${formData.mealType.toLowerCase()} — ${formData.appetite.toLowerCase()}.${formData.notes ? ` Notes: ${formData.notes}` : ""
                }`,
        };

        onAddEntry(newEntry);

        setFormData((currentData) => ({
            ...currentData,
            mealType: "Breakfast",
            appetite: "Ate all",
            notes: "",
        }));
    }

    return (
        <section className="meal-form-card">
            <div>
                <p className="eyebrow">Quick Log</p>
                <h2>Log a meal</h2>
            </div>

            <form className="meal-form" onSubmit={handleSubmit}>
                <label>
                    Pet name
                    <select name="petName" value={formData.petName} onChange={handleChange}>
                        {pets.map((pet) => (
                            <option key={pet.id} value={pet.name}>
                                {pet.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Meal type
                    <select name="mealType" value={formData.mealType} onChange={handleChange}>
                        <option>Breakfast</option>
                        <option>Lunch</option>
                        <option>Dinner</option>
                        <option>Snack</option>
                    </select>
                </label>

                <label>
                    Appetite
                    <select name="appetite" value={formData.appetite} onChange={handleChange}>
                        <option>Ate all</option>
                        <option>Ate some</option>
                        <option>Refused/Ate Very little</option>
                        <option>Vomited</option>
                    </select>
                </label>

                <label>
                    Notes
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Example: ate slower than usual, seemed tired..."
                    />
                </label>

                <button type="submit">Save meal</button>
            </form>
        </section>
    );
}

export default MealForm;