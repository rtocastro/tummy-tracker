import { useEffect, useState } from "react";

function StatusRotator({ pets = [], entries = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const messages = [
    ...entries.slice(0, 5).map((entry) => entry.text),
    ...pets.map((pet) => `${pet.name}: ${pet.status}`),
  ].filter(Boolean);

  useEffect(() => {
    if (messages.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((currentIndex) =>
        currentIndex === messages.length - 1 ? 0 : currentIndex + 1
      );
    }, 3500);

    return () => clearInterval(interval);
  }, [messages.length]);

  if (messages.length === 0) {
    return (
      <div className="status-rotator">
        Add a pet to start tracking.
      </div>
    );
  }

  return (
    <div className="status-rotator">
      <span className="status-dot"></span>
      <span key={messages[activeIndex]} className="status-message">
        {messages[activeIndex]}
      </span>
    </div>
  );
}

export default StatusRotator;