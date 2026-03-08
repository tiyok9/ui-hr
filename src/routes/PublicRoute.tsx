import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const token = localStorage.getItem("token");

  if (token && token !== "undefined" && token !== "null") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
