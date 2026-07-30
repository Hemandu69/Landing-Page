export interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  email_verified: boolean;
  phone_verified: boolean;
  profile_image: string | null;
  date_of_birth: string | null;
  gender: string | null;
  country: string | null;
  address_line_1: string | null;
  address_line_2: string | null;
  bio: string | null;
  public_profile: boolean;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfilePayload {
  first_name?: string | null;
  last_name?: string | null;
  date_of_birth?: string | null;
  gender?: string | null;
  country?: string | null;
  address_line_1?: string | null;
  address_line_2?: string | null;
  bio?: string | null;
  public_profile?: boolean;
}

export interface ProfileImageUploadResponse {
  success: boolean;
  message: string;
  profile_image_url: string;
}
