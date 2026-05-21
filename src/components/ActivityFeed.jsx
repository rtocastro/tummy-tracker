function ActivityFeed({ entries = [], onDeleteEntry }) {
  return (
    <aside className="activity-feed">
      <div className="feed-header">
        <h3>Today’s Activity</h3>
      </div>

      {entries.map((entry) => (
        <div className="activity-item" key={entry.id}>
          <p className="activity-time">{entry.time}</p>
          <p>{entry.text}</p>

          <button
            className="small-delete-button"
            onClick={() => onDeleteEntry(entry)}
          >
            Delete
          </button>
        </div>
      ))}
    </aside>
  );
}

export default ActivityFeed;