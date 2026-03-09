import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

export default function RoleRoute({ allow }: { allow: string[] }) {
  const { role } = useSelector((state: RootState) => state.auth);

  if (!allow.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
