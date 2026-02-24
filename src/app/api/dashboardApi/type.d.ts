export type Overview = {
  total_revenue: number;
  revenue_change_percent: number;
  daily_bookings: number;
  daily_pending: number;
  active_clients: number;
  new_clients_today: number;
};

export type Chart = {
  label:"Mon"|"Tue"|"Wed"|"Thu"|"Fri"|"Sat"|"Sun";
  revenue:number;
  date:Date
};
