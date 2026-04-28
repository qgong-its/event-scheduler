import { request } from './api';

import type { User, AuthPayload, LoginResponse } from '@/types/user';

export const userRegister = async (payload: AuthPayload): Promise<User> => {
  return request<User>(`/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
};

export const userLogin = async (
  payload: AuthPayload,
): Promise<LoginResponse> => {
  return request<LoginResponse>(`/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
};

export const getUserProfile = (): Promise<User> => {
  return request<User>(`/auth/profile`);
};
