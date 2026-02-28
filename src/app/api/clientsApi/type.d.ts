export type CreateClientReq = {
  first_name: string;
  last_name: string;
  email?: string;
  phone: string;
  notes?: string;
  is_active?: boolean;
};

export type MutationRes = {
  success: boolean;
  message: string;
  error: {
    code: number;
    message: string;
  };
};

export type GetClientsReq = {
  search?: string;
  searchQuery?:string;
  page?: number;
  page_size?: number;
  date_from?: string;
  datetime_from?: string;
  is_active?: boolean;
  status?: "cancelled" | "completed" | "confirmed" | "no_show" | "pending" | string;
  ordering?:string
};

export type GetClientsRes = {
  success: boolean;
  message: string;
  data: {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    phone: string;
    is_active: boolean;
  }[];
  pagination: {
    count: number;
    total_pages: number;
    current_page: number;
    page_size: number;
    next: string;
    previous: string;
  };
  timestamp: Date;
};
