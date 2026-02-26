export type ReportsReq = {
  start_date: string;
  end_date: string;
  period: '1months' | '3months' | '6months' | '1year';
};

export type AllReports<T> = {
  success:boolean;
  message:string;
  data:T;
  timestamp:Date;
}

export type ReportsRes = {
  average_transaction: number;
  total_transactions: number;
  total_revenue: number;
  change_percent: number;
};

export type CustomerRetention = {
  retention_rate: number;
  total_clients: number;
  returning_clients: number;
};

export type NoShowRate = {
  no_show_rate: number;
  no_show_count: number;
  total_appointments: number;
  improvement: number;
};

export type RevenueByService = {
  total: number;
  services: {
    service: string;
    revenue: number;
    count: number;
    percentage: number;
  }[];
};

export type RevenueExpenses = {
  month: string;
  year: number;
  revenue: number;
  expenses: number;
}[];

export type Summary = {
  period: {
    start: string;
    end: string;
  };
  total_revenue: number;
  total_expenses: number;
  net_income: number;
  customer_retention_rate: number;
  average_transaction: number;
  no_show_rate: number;
  total_appointments: number;
};
