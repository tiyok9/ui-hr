export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  role: "admin" | "karyawan";
}
