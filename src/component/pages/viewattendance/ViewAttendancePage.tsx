import React, { useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import { useViewAttendance } from "../../../features/viewattendance/viewattendanceApi";
import ViewAttendanceSkeleton from "../../../features/viewattendance/components/ViewAttendanceSkeleton";
import { ArrowLeft } from "lucide-react";
import Summary from "../../../features/viewattendance/components/Summary";
import DataTable from "../../table/DataTable";
import TableToolbar from "../../table/TableToolbar";
import { viewAttendanceColumns } from "../../../features/viewattendance/ViewaAttendanceTable";

const ViewAttendancePage = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [month, setMonth] = useState("");
  const { data, isLoading } = useViewAttendance(
    pageIndex + 1,
    pageSize,
    debouncedSearch,
    month,
  );
  if (isLoading) return <ViewAttendanceSkeleton />;
  const columns = viewAttendanceColumns();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Attendance History
          </h1>
          <p className="text-sm text-gray-500">
            View your daily attendance records
          </p>
        </div>
        <Summary month={month} />
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 flex justify-between items-center">
          <h2 className="font-semibold text-gray-700">Attendance Records</h2>

          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <DataTable
          columns={columns}
          data={data.data}
          pageCount={data.meta.last_page}
          pageIndex={data.meta.current_page - 1}
          pageSize={data.meta.per_page}
          toolbar={
            <TableToolbar
              search={search}
              onSearchChange={(val) => {
                setSearch(val);
                setPageIndex(0);
              }}
            />
          }
          onPaginationChange={(page, size) => {
            setPageIndex(page);
            setPageSize(size);
          }}
        />
      </div>
    </div>
  );
};

export default ViewAttendancePage;
