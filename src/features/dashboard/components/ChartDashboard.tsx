import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useChartDashboard } from "../dashboardApi";
import Skeleton from "../../../component/form/Skeleton";

const ChartDashboard = () => {
  const { data, isLoading } = useChartDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  const chartData = data?.data ?? [];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="hadir"
          stroke="#22c55e"
          strokeWidth={2}
          name="Hadir"
        />
        <Line
          type="monotone"
          dataKey="cuti"
          stroke="#f97316"
          strokeWidth={2}
          name="Cuti"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartDashboard;
