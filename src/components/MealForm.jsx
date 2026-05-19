function MealForm() {
  return (
    <section className="meal-form-card">
      <div>
        <p className="eyebrow">Quick Log</p>
        <h2>Log a meal</h2>
      </div>

      <form className="meal-form">
        <label>
          Pet name
          <select>
            <option>Mochi</option>
            <option>Bean</option>
          </select>
        </label>

        <label>
          Meal type
          <select>
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
          </select>
        </label>

        <label>
          Appetite
          <select>
            <option>Ate all</option>
            <option>Ate some</option>
            <option>Refused</option>
            <option>Vomited</option>
          </select>
        </label>

        <label>
          Notes
          <textarea placeholder="Example: ate slower than usual, seemed tired..." />
        </label>

        <button type="submit">Save meal</button>
      </form>
    </section>
  );
}

export default MealForm;