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
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{event.title}</h2>
        {event.description && <p>{event.description}</p>}
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{formatDate(event.date)}</div>
          <div className="badge badge-outline">{event.location}</div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
