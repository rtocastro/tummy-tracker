function formatDayLabel(createdAt) {
  if (!createdAt) return "Today";

  const entryDate = new Date(createdAt);
  const today = new Date();

  const isToday =
    entryDate.toDateString() === today.toDateString();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isYesterday =
    entryDate.toDateString() === yesterday.toDateString();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  return entryDate.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function ActivityFeed({ entries = [], onDeleteEntry }) {
  return (
    <aside className="activity-feed">
      <div className="feed-header">
        <h3>Today’s Activity</h3>
      </div>

      {entries.map((entry) => (
        <div className="activity-item" key={entry.firestoreId || entry.id}>
          <div className="activity-meta">
            <span className="date-pill">
              {formatDayLabel(entry.createdAt)}
            </span>

            <p className="activity-time">{entry.time}</p>
          </div>

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