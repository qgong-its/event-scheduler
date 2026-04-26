import { request } from './api';

import type { PaginatedResponse } from '@/types/api';
import type { Event } from '@/types/events';

export const getEvents = async (): Promise<Event[]> => {
  const response = await request<PaginatedResponse<Event>>('/events');
  return response.results;
};

export const getEventById = (id: string) => {
  return request<Event>(`/events/${id}`);
};
