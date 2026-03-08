import type { ColumnDef } from "@tanstack/react-table";
import TableActions from "../../component/table/TableActions";

export interface Departement {
  id: string;
  nama_departemen: string;
}

interface DeleteDepartementsMutation {
  mutate: (id: string) => void;
}

export const departementsColumns = (
  navigate: (path: string) => void,
  deleteDepartement: DeleteDepartementsMutation,
): ColumnDef<Departement>[] => [
  {
    header: "Departemen",
    accessorKey: "nama_departemen",
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const departement = row.original;

      return (
        <TableActions
          onEdit={() => navigate(`/departements/edit/${departement.id}`)}
          onDelete={() => deleteDepartement.mutate(departement.id)}
        />
      );
    },
  },
];
