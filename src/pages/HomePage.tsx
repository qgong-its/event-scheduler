import { useEffect, useState } from 'react';

import type { Event } from '@/types/events';
import { getEvents } from '@/services/eventApi';

import EventCard from '@/components/ui/EventCard';
import ErrorMessage from '@/components/ui/ErrorMessage';

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
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Events</h1>

      {error && <ErrorMessage error={error} />}

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </section>
    </main>
  );
};

export default HomePage;
