export type AppoitmentReq = {
  ordering: string;
  search: string;
  page: number;
};

export type AppoitmentRes = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    id: number;
    date: string;
    start_time: string;
    end_time: string;
    client_name: string;
    service_name: string;
    staff_member_name: string;
    price: string;
    status: string;
    status_display: string;
  }[];
};

export type AddAppoitmentReq = {
  client: number;
  staff_member: number;
  service: number;
  date: string;
  start_time: string;
  end_time: string;
  price: string;
  status: string;
  notes: string;
};

export type AddAppoitmentRes = {
  id: number;
  client: number;
  staff_member: number;
  service: number;
  date: string;
  start_time: string;
  end_time: string;
  price: string;
  status: string;
  notes: string;
};

export type GetOneAppoitmentRes = {
  id: number;
  client: number;
  client_detail: {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    phone: string;
    is_active: boolean;
  };
  staff_member: number;
  staff_member_detail: {
    id: number;
    name: string;
    specialization: string;
    specialization_display: string;
    status: string;
    status_display: string;
    rating: string;
    is_active: boolean;
    avatar: string;
  };
  service: number;
  service_detail: {
    id: number;
    name: string;
    description: string;
    price: string;
    duration_minutes: number;
    is_active: boolean;
    created_at: string;
  };
  date: string;
  start_time: string;
  end_time: string;
  price: string;
  status: string;
  status_display: string;
  notes: string;
  created_at: string;
  updated_at: string;
};
