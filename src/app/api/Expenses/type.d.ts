export type ExpensesReq = {
  page?: number;
  page_size?: number;
  search?: string;
};

export type ExpensesRes = {
  id: number;
  name: string;
  price: string;
  description: string;
  reminder_date: string;
  created_at: Date;
  updated_at: Date;
};

export type getExpensesRes = {
  success: boolean;
  message: string;
  data: Array<ExpensesRes>;
  pagination: {
    count: number;
    total_pages: number;
    current_page: number;
    page_size: number;
    next: string | null;
    previous: string | null;
  };
  timestamp: Date;
};

export type addExpensesReq = {
  name: string;
  price: string;
  description: string;
  reminder_date: string;
};
