export type GetStaffRes = {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    specialization: string;
    specialization_display: string;
    status: "available" | "in_session" | "on_break" | "off_duty";
    status_display: string;
    rating: string;
    is_active: boolean;
    avatar: string | null;
    bookings: number;
    income: number | null;
    efficiency: string;
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

export type GetStaffByIdRes = {
  success: boolean;
  message: string;
  data: {
    user: number;
    name: string;
    specialization: string;
    specialization_display: string;
    phone: string;
    commission_rate: string;
    status: string;
    status_display: string;
    rating: string;
    is_active: boolean;
    avatar: string;
    today_revenue: number;
    created_at: Date;
    updated_at: Date;
  };
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

export type CreateStaffReq = {
  name: string;
  specialization: string;
  phone: string;
  commission_rate: string;
};
