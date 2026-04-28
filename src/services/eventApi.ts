import { request } from './api';

import type { PaginatedResponse } from '@/types/api';
import type { Event, CreateEventPayload } from '@/types/events';

export const getEvents = async (): Promise<Event[]> => {
  const response = await request<PaginatedResponse<Event>>('/events');
  return response.results;
};

export const getEventById = (id: string) => {
  return request<Event>(`/events/${id}`);
};

export const createEvent = async (
  payload: CreateEventPayload,
): Promise<Event> => {
  return request<Event>(`/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
};
