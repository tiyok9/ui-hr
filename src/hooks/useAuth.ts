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
  }) => {
    dispatch(loginSuccess(data));
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("role", data.role);
    navigate("/");
  };

  const logoutUser = () => {
    dispatch(logout());

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");

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
