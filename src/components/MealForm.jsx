import { useState } from "react";

function MealForm({ onAddEntry }) {
  const [formData, setFormData] = useState({
    petName: "Mochi",
    mealType: "Breakfast",
    appetite: "Ate all",
    notes: "",
  });

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
      petName: formData.petName,
      mealType: formData.mealType,
      appetite: formData.appetite,
      notes: formData.notes,
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
      text: `${formData.petName} logged ${formData.mealType.toLowerCase()} — ${formData.appetite.toLowerCase()}.`,
    };

    onAddEntry(newEntry);

    setFormData({
      petName: "Mochi",
      mealType: "Breakfast",
      appetite: "Ate all",
      notes: "",
    });
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
            <option>Mochi</option>
            <option>Bean</option>
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
            <option>Refused</option>
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