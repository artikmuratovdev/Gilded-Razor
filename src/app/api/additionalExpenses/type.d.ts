export type additionalExpensesReq = {
  page?: number;
  page_size?: number;
  search?: string;
};

export type additionalExpensesRes = {
    id: number;
    name: string;
    price: string;
    description: string;
    created_at: Date;
    updated_at: Date;
  }

export type getAdditionalExpensesRes = {
  success: boolean;
  message: string;
  data: Array<additionalExpensesRes>;
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

export type addAdditionalExpensesReq = {
  name: string;
  price: string;
  description: string;
};
