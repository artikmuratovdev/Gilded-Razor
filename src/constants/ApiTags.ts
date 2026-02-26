export const API_TAGS = {
  AUTH: 'auth',
  USER: 'user',
  DASHBOARD: 'dashboard',
  APPOITMENTS:'appointments',
  CLIENTS: 'clients',
  SERVICES: 'services',
  STAFFS: 'staffs',
  REPORTS:'reports'
} as const;

export type API_TAGS = (typeof API_TAGS)[keyof typeof API_TAGS];
