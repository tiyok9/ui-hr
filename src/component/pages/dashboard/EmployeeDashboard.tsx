import { LogOut, Calendar, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useSummaryDashboardClient } from "../../../features/dashboard/dashboardApi";
import Skeleton from "../../form/Skeleton";

export default function EmployeeDashboard() {
  const { logout } = useAuth();
  const { data, isLoading } = useSummaryDashboardClient();
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome back 👋
            </h1>
            <p className="text-sm text-gray-500">
              Have a productive day at work
            </p>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:opacity-90 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Remaining Leave</p>
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <p className="text-3xl font-semibold text-gray-800 mt-2">
                {data?.data.sisa_cuti} Days
              </p>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Today Attendance</p>

            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : data?.data.absen_hari_ini ? (
              <p className="text-green-600 font-semibold text-lg mt-2">
                {data.data.absen_hari_ini}
              </p>
            ) : (
              <p className="text-red-600 font-semibold text-lg mt-2">
                Attendance Not Checked
              </p>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Pending Requests</p>
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <p className="text-yellow-600 font-semibold text-lg mt-2">
                {data.data.pending_cuti ?? 0} Request
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-xl transition flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Application for Leave
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Submit your leave request
              </p>

              <Link
                to="/leave-requests"
                className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-sm hover:opacity-90 transition"
              >
                <Calendar size={16} />
                Apply Leave
              </Link>
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-xl transition flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                View Attendance
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                See your attendance history
              </p>

              <Link
                to="/view-attendance"
                className="mt-4 inline-flex items-center gap-2 border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition"
              >
                <ClipboardList size={16} />
                View Attendance
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
