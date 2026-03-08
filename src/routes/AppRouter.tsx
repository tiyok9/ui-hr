import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../component/pages/login/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import DashboardPage from "../component/pages/dashboard/DashboardPage";
import PageWrapper from "../component/layout/PageWrapper";
import Layout from "../component/layout/Layout";
import UserPage from "../component/pages/user/UserPage";
import CreateUserPage from "../component/pages/user/CreateUserPage";
import EditUserPage from "../component/pages/user/EditUserPage";
import EmployeesPage from "../component/pages/employees/EmployeesPage";
import CreateEmployeePage from "../component/pages/employees/CreateEmployeePage";
import EditEmployeePage from "../component/pages/employees/EditEmployeePage";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/users" element={<Layout />}>
            <Route element={<PageWrapper />}>
              <Route index element={<UserPage />} />
              <Route path="create" element={<CreateUserPage />} />
              <Route path="edit/:id" element={<EditUserPage />} />
            </Route>
          </Route>
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardPage />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/employees" element={<Layout />}>
            <Route element={<PageWrapper />}>
              <Route index element={<EmployeesPage />} />
              <Route path="create" element={<CreateEmployeePage />} />
              <Route path="edit/:id" element={<EditEmployeePage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
