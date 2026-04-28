const TOKEN_KEY = 'eventSchedulerUsrToken';

export const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  window.dispatchEvent(new Event('auth-change'));
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event('auth-change'));
};

export const hasToken = () => {
  return Boolean(getToken());
};
