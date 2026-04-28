const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

import { getToken } from '@/utils/tokenStorage';

type RequestOptions = RequestInit & {
  token?: string | null;
};

export const request = async <T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> => {
  // Object Destructuring & Rest Properties
  const { token = getToken(), headers, ...restOptions } = options;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...restOptions,
    headers: {
      'Content-Type': 'application/Json',
      ...(token ? { Authofrization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
};
