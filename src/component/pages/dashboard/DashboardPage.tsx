import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 80 },
  { name: "Mar", value: 65 },
  { name: "Apr", value: 120 },
];

export default function DashboardPage() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-bold mb-4">Sales</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-bold mb-4">Result</h2>
        <p>Total Users: 100</p>
      </div>
    </div>
  );
}
