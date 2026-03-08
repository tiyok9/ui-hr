import type { ColumnDef } from "@tanstack/react-table";
import TableActions from "../../component/table/TableActions";

export interface User {
  id: string;
  username: string;
  name: string;
}

interface DeleteUserMutation {
  mutate: (id: string) => void;
}

export const userColumns = (
  navigate: (path: string) => void,
  deleteUser: DeleteUserMutation,
): ColumnDef<User>[] => [
  {
    header: "Username",
    accessorKey: "username",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <TableActions
          onEdit={() => navigate(`/users/edit/${user.id}`)}
          onDelete={() => deleteUser.mutate(user.id)}
        />
      );
    },
  },
];
