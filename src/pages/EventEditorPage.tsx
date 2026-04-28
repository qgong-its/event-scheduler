import { useNavigate } from 'react-router';

import { createEvent } from '@/services/eventApi';
import type { CreateEventPayload } from '@/types/events';

const EventEditorPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload: CreateEventPayload = {
      title: String(formData.get('title') ?? ''),
      description: String(formData.get('description') ?? ''),
      date: String(formData.get('date') ?? ''),
      location: String(formData.get('location') ?? ''),
      latitude: formData.get('latitude')
        ? Number(formData.get('latitude'))
        : undefined,
      longitude: formData.get('longitude')
        ? Number(formData.get('longitude'))
        : undefined,
    };

    const newEvent = await createEvent(payload);

    navigate(`/events/${newEvent.id}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
    >
      <legend className="fieldset-legend">Create Event Form</legend>
      <label className="fieldset">
        <span className="label">Title</span>
        <input
          name="title"
          type="text"
          className="input validator"
          placeholder="Title"
          required
        />
        <span className="validator-hint hidden">Required</span>
      </label>
      <label className="fieldset">
        <span className="label">Description</span>
        <input
          name="description"
          type="text"
          className="input validator"
          placeholder="Description"
        />
      </label>
      <label className="fieldset">
        <span className="label">Date</span>
        <input
          name="date"
          type="date"
          className="input validator"
          placeholder="Date"
          required
        />
        <span className="validator-hint hidden">Required</span>
      </label>
      <label className="fieldset">
        <span className="label">Location</span>
        <input
          name="location"
          type="text"
          className="input validator"
          placeholder="Location"
          required
        />
        <span className="validator-hint hidden">Required</span>
      </label>
      <label className="fieldset">
        <span className="label">Latitude</span>
        <input
          name="latitude"
          type="number"
          className="input validator"
          placeholder="Latitude"
        />
      </label>
      <label className="fieldset">
        <span className="label">Longitude</span>
        <input
          name="longitude"
          type="number"
          className="input validator"
          placeholder="Longitude"
        />
      </label>

      <button type="submit" className="btn btn-neutral mt-4">
        Create
      </button>
    </form>
  );
};

export default EventEditorPage;
