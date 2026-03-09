import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../../hooks/useDebounce";
import TableSkeleton from "../../table/TableSkeleton";
import DataTable from "../../table/DataTable";
import TableToolbar from "../../table/TableToolbar";

import { typeLeavesColumns } from "../../../features/typeLeave/TypeLeaveColumns";
import {
  useDeleteTypeLeave,
  useTypeLeaves,
} from "../../../features/typeLeave/TypeLeaveApi";

const TypeLeavePage = () => {
  const navigate = useNavigate();

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useTypeLeaves(
    pageIndex + 1,
    pageSize,
    debouncedSearch,
  );
  const deleteTypeLeave = useDeleteTypeLeave();

  if (isLoading) return <TableSkeleton />;

  const columns = typeLeavesColumns(navigate, deleteTypeLeave);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Manage Type Leaves</h1>

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
            onAdd={() => navigate("/type-leaves/create")}
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

export default TypeLeavePage;
