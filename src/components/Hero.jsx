function Hero() {
  return (
    <section className="hero-card">
      <p className="eyebrow">Tummy Tracker</p>

      <h1>Track meals, moods, and tummy trouble.</h1>

      <p className="subtext">
        A simple pet wellness tracker for meals, appetite changes,
        symptoms, and vet-ready notes.
      </p>

      <div className="button-row">
        <button>Log a meal</button>
        <button className="secondary">Add a pet</button>
      </div>
    </section>
  );
}

export default Hero;