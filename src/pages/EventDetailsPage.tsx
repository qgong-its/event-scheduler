import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { getEventById } from '@/services/eventApi';
import type { Event } from '@/types/events';

import ErrorMessage from '@/components/ui/ErrorMessage';

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getEventById(id)
      .then(setEvent)
      .catch((error) => {
        setError(error.message);
      });
  }, [id]);

  if (!id) {
    return <p>Event not found</p>;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <article className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h2 className="card-title">{event.title}</h2>
          {event.description && (
            <p className="text-base-content/70">{event.description}</p>
          )}
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{formatDate(event.date)}</div>
            <div className="badge badge-outline">{event.location}</div>
          </div>
        </div>
      </article>
    </main>
  );
};

export default EventDetailsPage;
