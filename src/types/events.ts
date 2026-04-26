export interface Event {
  id: number;
  title: string;
  description?: string;
  date: string;
  location: string;
  latitude?: number;
  longitude?: number;
  organizerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventPayload {
  title: string;
  description?: string;
  date: string;
  location: string;
  latitude?: number;
  longitude?: number;
}
