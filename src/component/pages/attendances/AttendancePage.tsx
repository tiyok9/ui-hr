import { useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import TableSkeleton from "../../table/TableSkeleton";
import DataTable from "../../table/DataTable";
import TableToolbar from "../../table/TableToolbar";
import {
  useExportCSVAttandance,
  useManageAttandance,
} from "../../../features/attendance/attendaceApi";
import { ManageAttandanceColumns } from "../../../features/attendance/ManageAttandanceColumns";

const AttendancePage = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useManageAttandance(
    pageIndex + 1,
    pageSize,
    debouncedSearch,
  );
  console.log(data);
  const exportCSVAttandance = useExportCSVAttandance();

  if (isLoading) return <TableSkeleton />;
  const columns = ManageAttandanceColumns();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Manage Attandance</h1>

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
            onExport={() => exportCSVAttandance.mutate()}
          />
        }
        onPaginationChange={(page, size) => {
          setPageIndex(page);
          setPageSize(size);
        }}
      />
    </div>
  );
};

export default AttendancePage;
