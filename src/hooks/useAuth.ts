import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, logout } from "../features/auth/authSlice";

import type { RootState } from "../app/store";

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, refreshToken, role } = useSelector(
    (state: RootState) => state.auth,
  );

  const isAuthenticated = !!token;

  const login = (data: {
    token: string;
    refreshToken: string;
    role: "admin" | "user";
    user: { id: string; username: string };
  }) => {
    dispatch(loginSuccess(data));

    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("role", data.role);
    localStorage.setItem("user", JSON.stringify(data.user));

    navigate("/");
  };

  const logoutUser = () => {
    dispatch(logout());

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const hasRole = (roles: string[]) => {
    return roles.includes(role);
  };

  return {
    token,
    refreshToken,
    role,
    isAuthenticated,
    login,
    logout: logoutUser,
    hasRole,
  };
}
