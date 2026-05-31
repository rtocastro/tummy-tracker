import { useState } from "react";

function MedicationForm({ pets, onAddEntry }) {
  const [formData, setFormData] = useState({
    petName: pets[0]?.name || "",
    medicationName: "",
    dosage: "",
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

    if (!formData.petName || !formData.medicationName.trim()) return;

    const newEntry = {
      id: Date.now(),
      type: "medication",
      petName: formData.petName,
      medicationName: formData.medicationName,
      dosage: formData.dosage,
      notes: formData.notes,
      createdAt: Date.now(),
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
      text: `${formData.petName} took ${formData.medicationName}${formData.dosage ? ` (${formData.dosage})` : ""
        }${formData.notes ? ` — ${formData.notes}` : ""}.`,
    };

    onAddEntry(newEntry);

    setFormData({
      petName: pets[0]?.name || "",
      medicationName: "",
      dosage: "",
      notes: "",
    });
  }

  return (
    <section className="meal-form-card">
      <p className="eyebrow">Medication</p>
      <h2>Log medication</h2>

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
          Medication name
          <input
            name="medicationName"
            value={formData.medicationName}
            onChange={handleChange}
            placeholder="Example: Antibiotic, probiotic, flea meds..."
          />
        </label>

        <label>
          Dosage
          <input
            name="dosage"
            value={formData.dosage}
            onChange={handleChange}
            placeholder="Example: 1 pill, 2 ml, half tablet..."
          />
        </label>

        <label>
          Notes
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Example: taken with food, resisted, seemed fine after..."
          />
        </label>

        <button type="submit">Save medication</button>
      </form>
    </section>
  );
}

export default MedicationForm;