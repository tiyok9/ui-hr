import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

export default function RoleRedirect() {
  const role = useSelector((state: RootState) => state.auth.role);
  const location = useLocation();

  if (!role) return <Navigate to="/login" replace />;

  if (role === "admin" && location.pathname !== "/admin-dashboard") {
    return <Navigate to="/admin-dashboard" replace />;
  }

  if (role === "karyawan" && location.pathname !== "/employee-dashboard") {
    return <Navigate to="/employee-dashboard" replace />;
  }

  return null;
}
