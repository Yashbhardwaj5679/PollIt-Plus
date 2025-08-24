export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    GOOGLE: '/auth/google',
  },
  POLLS: {
    BASE: '/polls',
    USER: '/polls/user',
    VOTE: (id: string) => `/polls/${id}/vote`,
    DELETE: (id: string) => `/polls/${id}`,
  },
} as const;

export const SOCKET_EVENTS = {
  POLL_UPDATE: 'poll:update',
  POLL_CREATED: 'poll:created',
  POLL_DELETED: 'poll:deleted',
  VOTE_CAST: 'vote:cast',
  USER_JOINED: 'user:joined',
  USER_LEFT: 'user:left',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DASHBOARD: '/dashboard',
  CREATE_POLL: '/polls/create',
  POLL_DETAILS: '/polls/:id',
  ADMIN: '/admin',
} as const;

export const STORAGE_KEYS = {
  TOKEN: 'pollit_token',
  USER: 'pollit_user',
  THEME: 'pollit_theme',
} as const;