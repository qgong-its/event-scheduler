import { Link } from 'react-router';

import type { Event } from '@/types/events';

type EventCardProps = {
  event: Event;
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

const EventCard = ({ event }: EventCardProps) => {
  return (
    <article className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{event.title}</h2>
        {event.description && (
          <p className="text-base-content/70">{event.description}</p>
        )}
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{formatDate(event.date)}</div>
          <div className="badge badge-outline">{event.location}</div>
        </div>

        <div className="card-actions mt-4 justify-end">
          <Link to={`/events/${event.id}`} className="btn btn-primary btn-sm">
            Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
