import type { ColumnDef } from "@tanstack/react-table";
import TableActions from "../../component/table/TableActions";

export interface TypeLeave {
  id: string;
  nama_jabatan: string;
  departemen: string;
}

interface DeleteTypeLeavesMutation {
  mutate: (id: string) => void;
}

export const typeLeavesColumns = (
  navigate: (path: string) => void,
  deleteTypeLeave: DeleteTypeLeavesMutation,
): ColumnDef<TypeLeave>[] => [
  {
    header: "Jenis Cuti",
    accessorKey: "jenis_cuti",
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const position = row.original;

      return (
        <TableActions
          onEdit={() => navigate(`/type-leaves/edit/${position.id}`)}
          onDelete={() => deleteTypeLeave.mutate(position.id)}
        />
      );
    },
  },
];
