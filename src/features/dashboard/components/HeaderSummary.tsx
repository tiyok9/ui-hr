import { useSummaryDashboard } from "../dashboardApi";
import Skeleton from "../../../component/form/Skeleton";

const HeaderSummary = () => {
  const { data, isLoading } = useSummaryDashboard();

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-500">Total Karyawan</p>
        {isLoading ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <h2 className="text-3xl font-bold">{data?.data.total_karyawan}</h2>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-500">Karyawan Aktif</p>
        {isLoading ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <h2 className="text-3xl font-bold text-green-600">
            {data?.data.karyawan_aktif}
          </h2>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-500">Izin / Cuti Bulan Ini</p>
        {isLoading ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <h2 className="text-3xl font-bold text-orange-500">
            {data?.data.cuti_bulan_ini}
          </h2>
        )}
      </div>
    </div>
  );
};

export default HeaderSummary;
