import type { ColumnDef } from "@tanstack/react-table";
import TableActions from "../../component/table/TableActions";

export interface User {
  id: number;
  username: string;
  name: string;
}

interface DeleteUserMutation {
  mutate: (id: number) => void;
}

export const employeeColumns = (
  navigate: (path: string) => void,
  deleteUser: DeleteUserMutation,
): ColumnDef<User>[] => [
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
          onDelete={() => deleteUser.mutate(user.id)}
        />
      );
    },
  },
];
