import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../component/pages/login/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import Layout from "../component/layout/Layout";
import PageWrapper from "../component/layout/PageWrapper";

import DashboardPage from "../component/pages/dashboard/DashboardPage";
import EmployeeDashboard from "../component/pages/dashboard/EmployeeDashboard";

import UserPage from "../component/pages/user/UserPage";
import CreateUserPage from "../component/pages/user/CreateUserPage";
import EditUserPage from "../component/pages/user/EditUserPage";

import EmployeesPage from "../component/pages/employees/EmployeesPage";
import CreateEmployeePage from "../component/pages/employees/CreateEmployeePage";
import EditEmployeePage from "../component/pages/employees/EditEmployeePage";

import PositionsPage from "../component/pages/positions/PositionsPage";
import CreatePositionsPage from "../component/pages/positions/CreatePositionsPage";
import EditPositionsPage from "../component/pages/positions/EditPositionsPage";

import DepartementPage from "../component/pages/departement/DepartementPage";
import CreateDepartementPage from "../component/pages/departement/CreateDepartementPage";
import EditDepartementPage from "../component/pages/departement/EditDepartementPage";

import TypeLeavePage from "../component/pages/typeLeave/TypeLeavePage";
import CreateTypeLeavePage from "../component/pages/typeLeave/CreateTypeLeavePage";
import EditTypeLeavePage from "../component/pages/typeLeave/EditTypeLeavePage";

import ManageLeavePage from "../component/pages/manageLeave/ManageLeavePage";
import CreateManageLeavePage from "../component/pages/manageLeave/CreateManageLeavePage";
import EditManageLeavePage from "../component/pages/manageLeave/EditManageLeavePage";

import LeaveRequestPage from "../component/pages/leaveRequest/LeaveRequestPage";
import ViewAttendancePage from "../component/pages/viewattendance/ViewAttendancePage";
import AttendanceScanPage from "../component/pages/attendancescan/AttendanceScanPage";
import RoleRoute from "./RoleRoute";
import RoleRedirect from "./RoleRedirect";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/attendance-scan" element={<AttendanceScanPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<RoleRoute allow={["karyawan"]} />}>
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/leave-requests" element={<LeaveRequestPage />} />
            <Route path="/attendance" element={<ViewAttendancePage />} />
          </Route>
          <Route element={<Layout />}>
            <Route path="/" element={<RoleRedirect />} />
            <Route element={<RoleRoute allow={["admin"]} />}>
              <Route path="/admin-dashboard" element={<DashboardPage />} />
            </Route>

            <Route element={<RoleRoute allow={["admin"]} />}>
              <Route path="/users" element={<PageWrapper />}>
                <Route index element={<UserPage />} />
                <Route path="create" element={<CreateUserPage />} />
                <Route path="edit/:id" element={<EditUserPage />} />
              </Route>
            </Route>

            <Route element={<RoleRoute allow={["admin"]} />}>
              <Route path="/employees" element={<PageWrapper />}>
                <Route index element={<EmployeesPage />} />
                <Route path="create" element={<CreateEmployeePage />} />
                <Route path="edit/:id" element={<EditEmployeePage />} />
              </Route>
            </Route>

            <Route element={<RoleRoute allow={["admin"]} />}>
              <Route path="/positions" element={<PageWrapper />}>
                <Route index element={<PositionsPage />} />
                <Route path="create" element={<CreatePositionsPage />} />
                <Route path="edit/:id" element={<EditPositionsPage />} />
              </Route>
            </Route>

            <Route element={<RoleRoute allow={["admin"]} />}>
              <Route path="/departements" element={<PageWrapper />}>
                <Route index element={<DepartementPage />} />
                <Route path="create" element={<CreateDepartementPage />} />
                <Route path="edit/:id" element={<EditDepartementPage />} />
              </Route>
            </Route>
            <Route element={<RoleRoute allow={["admin"]} />}>
              <Route path="/type-leaves" element={<PageWrapper />}>
                <Route index element={<TypeLeavePage />} />
                <Route path="create" element={<CreateTypeLeavePage />} />
                <Route path="edit/:id" element={<EditTypeLeavePage />} />
              </Route>
            </Route>

            <Route element={<RoleRoute allow={["admin"]} />}>
              <Route path="/manage-leaves" element={<PageWrapper />}>
                <Route index element={<ManageLeavePage />} />
                <Route path="create" element={<CreateManageLeavePage />} />
                <Route path="edit/:id" element={<EditManageLeavePage />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
