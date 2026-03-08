import { useState } from "react";
import { useUsers, useDeleteUser } from "../../../features/users/userApi";
import { userColumns } from "../../../features/users/userColumns";
import DataTable from "../../table/DataTable";
import TableToolbar from "../../table/TableToolbar";
import TableSkeleton from "../../table/TableSkeleton";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../../hooks/useDebounce";

const UserPage = () => {
  const navigate = useNavigate();

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useUsers(
    pageIndex + 1,
    pageSize,
    debouncedSearch,
  );
  const deleteUser = useDeleteUser();

  if (isLoading) return <TableSkeleton />;

  const columns = userColumns(navigate, deleteUser);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Manage Users</h1>

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
            onAdd={() => navigate("/users/create")}
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

export default UserPage;
