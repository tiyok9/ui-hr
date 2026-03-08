import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../../hooks/useDebounce";
import TableSkeleton from "../../table/TableSkeleton";
import DataTable from "../../table/DataTable";
import TableToolbar from "../../table/TableToolbar";
import {
  useDeleteDepartement,
  useDepartements,
} from "../../../features/departement/departementApi";
import { departementsColumns } from "../../../features/departement/DepartementColumns";

const DepartementPage = () => {
  const navigate = useNavigate();

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useDepartements(
    pageIndex + 1,
    pageSize,
    debouncedSearch,
  );
  const deleteDepartement = useDeleteDepartement();

  if (isLoading) return <TableSkeleton />;

  const columns = departementsColumns(navigate, deleteDepartement);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Manage Departements</h1>

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
            onAdd={() => navigate("/departements/create")}
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

export default DepartementPage;
