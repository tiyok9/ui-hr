import { useViewAttendanceReport } from "../viewattendanceApi";
import SummarySkeleton from "./SummarySkeleton";

const Summary = ({ month }: { month: string }) => {
  const { data, isLoading } = useViewAttendanceReport(month);

  if (isLoading) return <SummarySkeleton />;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
        <p className="text-sm text-gray-500">Present</p>
        <p className="text-2xl font-semibold text-green-600 mt-1">
          {data.present} Days
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
        <p className="text-sm text-gray-500">Late</p>
        <p className="text-2xl font-semibold text-yellow-600 mt-1">
          {data.late} Days
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
        <p className="text-sm text-gray-500">Absent</p>
        <p className="text-2xl font-semibold text-red-600 mt-1">
          {data.absent} Days
        </p>
      </div>
    </div>
  );
};

export default Summary;
