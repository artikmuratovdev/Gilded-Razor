import { RoleConstants } from '@/constants/Roles';
export type LoginRequest = {
  phone_number: string;
  password: string;
};
export type LoginResponse = {
  success: boolean;
  data: {
    user: {
      id: number;
      username: string;
      email: string;
      first_name: string;
      last_name: string;
      role: RoleConstants;
      phone_number: string;
      avatar: string | null;
      is_active: boolean;
      date_joined: string;
    };
    access_token: string;
    refresh_token: string;
  };
  error: {
    statusCode: number;
    statusMsg: string;
    msg: string;
  };
};

export type RefreshTokenResponse = {
  access_token: string;
  refresh_token: string;
};
