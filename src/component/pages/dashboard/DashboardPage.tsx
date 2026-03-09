import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const attendanceData = [
  { month: "Jan", hadir: 90, cuti: 5 },
  { month: "Feb", hadir: 85, cuti: 8 },
  { month: "Mar", hadir: 95, cuti: 4 },
  { month: "Apr", hadir: 88, cuti: 6 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* CARD SUMMARY */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Karyawan</p>
          <h2 className="text-3xl font-bold">120</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Karyawan Aktif</p>
          <h2 className="text-3xl font-bold text-green-600">110</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Izin / Cuti Bulan Ini</p>
          <h2 className="text-3xl font-bold text-orange-500">12</h2>
        </div>
      </div>

      {/* CHART */}
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
