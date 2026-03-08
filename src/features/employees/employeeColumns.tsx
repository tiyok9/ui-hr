import type { ColumnDef } from "@tanstack/react-table";
import TableActions from "../../component/table/TableActions";

export interface Employee {
  id: string;
  nama: string;
  nik: string;
  no_hp: string;
  jabatan: string;
}

interface DeleteEmployeeMutation {
  mutate: (id: string) => void;
}

export const employeeColumns = (
  navigate: (path: string) => void,
  deleteEmployee: DeleteEmployeeMutation,
): ColumnDef<Employee>[] => [
  {
    header: "Nama",
    accessorKey: "nama",
  },
  {
    header: "Nik",
    accessorKey: "nik",
  },
  {
    header: "No HP",
    accessorKey: "no_hp",
  },
  {
    header: "Jabatan",
    accessorKey: "jabatan",
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <TableActions
          onEdit={() => navigate(`/employees/edit/${user.id}`)}
          onDelete={() => deleteEmployee.mutate(user.id)}
        />
      );
    },
  },
];
