import ChartDashboard from "../../../features/dashboard/components/ChartDashboard";
import HeaderSummary from "../../../features/dashboard/components/HeaderSummary";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <HeaderSummary />

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-bold mb-4">Rekap Absensi Bulanan</h2>
        <ChartDashboard />
      </div>
    </div>
  );
}
