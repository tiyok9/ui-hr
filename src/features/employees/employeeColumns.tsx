import type { ColumnDef } from "@tanstack/react-table";
import TableActions from "../../component/table/TableActions";
import ConfirmUpdate from "../../component/ui/ConfirmUpdate";

export interface Employee {
  id: string;
  nama: string;
  nik: string;
  jabatan: string;
  status: boolean;
}

interface DeleteEmployeeMutation {
  mutate: (id: string) => void;
}

interface UpdateEmployeeStatusMutation {
  mutate: (id: string) => void;
}

export const employeeColumns = (
  navigate: (path: string) => void,
  deleteEmployee: DeleteEmployeeMutation,
  updateEmployeeStatus: UpdateEmployeeStatusMutation,
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
    header: "Jabatan",
    accessorKey: "jabatan",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const employee = row.original;
      const isActive = employee.status;

      return (
        <ConfirmUpdate
          title={isActive ? "Deactivate Employee" : "Activate Employee"}
          description={
            isActive
              ? "Are you sure you want to deactivate this employee?"
              : "Are you sure you want to activate this employee?"
          }
          onConfirm={() => updateEmployeeStatus.mutate(employee.id)}
          trigger={
            <span
              className={`px-2 py-1 rounded text-xs font-medium cursor-pointer transition ${
                isActive
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-red-100 text-red-700 hover:bg-red-200"
              }`}
            >
              {isActive ? "Active" : "Deactive"}
            </span>
          }
        />
      );
    },
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
