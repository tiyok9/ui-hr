import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

export default function RoleRedirect() {
  const { role } = useSelector((state: RootState) => state.auth);

  if (role === "karyawan") {
    return <Navigate to="/employee-dashboard" replace />;
  }

  return <Navigate to="/admin-dashboard" replace />;
}
