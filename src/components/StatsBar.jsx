function StatsBar({ entries, pets }) {
  const mealsLogged = entries.filter((entry) => entry.type === "meal").length;

  const appetiteAlerts = pets.filter((pet) => pet.appetite === "Watch").length;

  const petsMonitored = pets.length;

  return (
    <section className="stats-bar">
      <article className="stat-card">
        <p className="stat-label">Meals Logged</p>
        <h3>{mealsLogged}</h3>
      </article>

      <article className="stat-card">
        <p className="stat-label">Appetite Alerts</p>
        <h3>{appetiteAlerts}</h3>
      </article>

      <article className="stat-card">
        <p className="stat-label">Pets Monitored</p>
        <h3>{petsMonitored}</h3>
      </article>
    </section>
  );
}

export default StatsBar;