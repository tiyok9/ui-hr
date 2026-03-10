export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  role: string | null;
  user: {
    id: string;
    username: string;
  };
}
