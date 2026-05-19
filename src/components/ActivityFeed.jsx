function ActivityFeed() {
  return (
    <aside className="activity-feed">

      <div className="feed-header">
        <h3>Today’s Activity</h3>
      </div>

      <div className="activity-item">
        <p className="activity-time">8:12 AM</p>

        <p>
          Mochi finished breakfast.
        </p>
      </div>

      <div className="activity-item">
        <p className="activity-time">1:45 PM</p>

        <p>
          Bean skipped lunch.
        </p>
      </div>

      <div className="activity-item">
        <p className="activity-time">4:20 PM</p>

        <p>
          Water bowl refilled.
        </p>
      </div>

    </aside>
  );
}

export default ActivityFeed;