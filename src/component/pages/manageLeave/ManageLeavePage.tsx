import { useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import TableSkeleton from "../../table/TableSkeleton";
import DataTable from "../../table/DataTable";
import TableToolbar from "../../table/TableToolbar";
import {
  useExportCSVLeave,
  useManageLeaves,
  useUpdateManageLeave,
} from "../../../features/manageLeave/typeManageLeaveApi";
import { manageLeavesColumns } from "../../../features/manageLeave/ManageLeaveColumns";

const ManageLeavePage = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useManageLeaves(
    pageIndex + 1,
    pageSize,
    debouncedSearch,
  );
  const updateManageLeave = useUpdateManageLeave();
  const exportCSVLeave = useExportCSVLeave();

  if (isLoading) return <TableSkeleton />;
  const columns = manageLeavesColumns(updateManageLeave);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Manage ManageLeaves</h1>

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
            onExport={() => exportCSVLeave.mutate()}
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

export default ManageLeavePage;
