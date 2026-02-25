export type CreateServiceReq = {
  name: string;
  description: string;
  price: string;
  duration_minutes: number;
  is_active: boolean;
};

export type CreateServiceRes = {
  id: number;
  name: string;
  description: string;
  price: string;
  duration_minutes: number;
  is_active: boolean;
  created_at: Date;
};

export type GetClientsRes = {
  success: boolean;
  message: string;
  data: 
    {
      id: number;
      name: string;
      description: string;
      price: string;
      duration_minutes:number
      is_active: boolean;
      created_at:Date
    }[];
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