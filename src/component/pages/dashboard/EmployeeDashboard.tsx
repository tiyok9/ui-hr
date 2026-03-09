import { LogOut, Calendar, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export default function EmployeeDashboard() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome back, Bara 👋
            </h1>
            <p className="text-sm text-gray-500">
              Have a productive day at work
            </p>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:bg-red-600 transition-all"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
            <p className="text-gray-500 text-sm">Remaining Leave</p>
            <p className="text-3xl font-semibold text-gray-800 mt-2">6 Days</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
            <p className="text-gray-500 text-sm">Today Attendance</p>
            <p className="text-green-600 font-semibold text-lg mt-2">
              Checked In
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
            <p className="text-gray-500 text-sm">Pending Requests</p>
            <p className="text-yellow-600 font-semibold text-lg mt-2">
              1 Request
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Application for Leave
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Submit your leave request
              </p>

              <Link
                to="/leave-requests"
                className="mt-4 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md hover:bg-red-600 transition-all"
              >
                <Calendar size={16} />
                Apply Leave
              </Link>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                View Attendance
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                See your attendance history
              </p>

              <Link
                to="/attendance"
                className="mt-4 flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all"
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
