import { useEffect, useState } from 'react';

import type { Event } from '@/types/events';
import { getEvents } from '@/services/eventApi';

const HomePage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <main>
      <h1>Events</h1>

      {error && <p>{error}</p>}

      {events.map((event) => (
        <article key={event.id}>
          <h2>{event.title}</h2>
          <p>{event.date}</p>
          <p>{event.location}</p>
        </article>
      ))}
    </main>
  );
};

export default HomePage;
