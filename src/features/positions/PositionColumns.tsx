import type { ColumnDef } from "@tanstack/react-table";
import TableActions from "../../component/table/TableActions";

export interface Position {
  id: string;
  nama_jabatan: string;
  departemen: string;
}

interface DeletePositionsMutation {
  mutate: (id: string) => void;
}

export const positionsColumns = (
  navigate: (path: string) => void,
  deletePosition: DeletePositionsMutation,
): ColumnDef<Position>[] => [
  {
    header: "Jabatan",
    accessorKey: "nama_jabatan",
  },
  {
    header: "Departemen",
    accessorKey: "departemen",
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const position = row.original;

      return (
        <TableActions
          onEdit={() => navigate(`/positions/edit/${position.id}`)}
          onDelete={() => deletePosition.mutate(position.id)}
        />
      );
    },
  },
];
