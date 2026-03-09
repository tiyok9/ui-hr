import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../../hooks/useDebounce";
import {
  useDeleteEmployee,
  useEmployees,
  useUpdateStatusEmployee,
} from "../../../features/employees/employeesApi";
import TableSkeleton from "../../table/TableSkeleton";
import { employeeColumns } from "../../../features/employees/employeeColumns";
import DataTable from "../../table/DataTable";
import TableToolbar from "../../table/TableToolbar";

const EmployeesPage = () => {
  const navigate = useNavigate();

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useEmployees(
    pageIndex + 1,
    pageSize,
    debouncedSearch,
  );
  const deleteEmployee = useDeleteEmployee();
  const updateEmployeeStatus = useUpdateStatusEmployee();

  if (isLoading) return <TableSkeleton />;

  const columns = employeeColumns(
    navigate,
    deleteEmployee,
    updateEmployeeStatus,
  );

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Manage Employees</h1>

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
            onAdd={() => navigate("/employees/create")}
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

export default EmployeesPage;
