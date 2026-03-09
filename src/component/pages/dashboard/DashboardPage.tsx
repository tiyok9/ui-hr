import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import HeaderSummary from "../../../features/dashboard/components/HeaderSummary";

const attendanceData = [
  { month: "Jan", hadir: 90, cuti: 5 },
  { month: "Feb", hadir: 85, cuti: 8 },
  { month: "Mar", hadir: 95, cuti: 4 },
  { month: "Apr", hadir: 88, cuti: 6 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <HeaderSummary />

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-bold mb-4">Rekap Absensi Bulanan</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="hadir"
              stroke="#22c55e"
              name="Hadir"
            />
            <Line type="monotone" dataKey="cuti" stroke="#f97316" name="Cuti" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
