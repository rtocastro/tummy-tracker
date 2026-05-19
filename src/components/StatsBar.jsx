function StatsBar() {
  return (
    <section className="stats-bar">

      <article className="stat-card">
        <p className="stat-label">
          Meals Logged
        </p>

        <h3>12</h3>
      </article>

      <article className="stat-card">
        <p className="stat-label">
          Appetite Alerts
        </p>

        <h3>2</h3>
      </article>

      <article className="stat-card">
        <p className="stat-label">
          Water Refills
        </p>

        <h3>5</h3>
      </article>

      <article className="stat-card">
        <p className="stat-label">
          Pets Monitored
        </p>

        <h3>4</h3>
      </article>

    </section>
  );
}

export default StatsBar;