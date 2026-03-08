import type { ColumnDef } from "@tanstack/react-table";
import TableActions from "../../component/table/TableActions";

export interface ManageLeave {
  id: string;
  karyawan: string;
  jenis_cuti: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  jumlah_hari: number;
  alasan: string;
  status: string;
}

interface DeleteManageLeavesMutation {
  mutate: (id: string) => void;
}

export const manageLeavesColumns = (
  navigate: (path: string) => void,
  deleteManageLeave: DeleteManageLeavesMutation,
): ColumnDef<ManageLeave>[] => [
  {
    header: "Karyawan",
    accessorKey: "karyawan",
  },
  {
    header: "Jenis Cuti",
    accessorKey: "jenis_cuti",
  },
  {
    header: "Tanggal Mulai",
    accessorKey: "tanggal_mulai",
  },
  {
    header: "Tanggal Selesai",
    accessorKey: "tanggal_selesai",
  },
  {
    header: "Jumlah Hari",
    accessorKey: "jumlah_hari",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const leave = row.original;

      return (
        <TableActions
          onEdit={() => navigate(`/manage-leaves/edit/${leave.id}`)}
          onDelete={() => deleteManageLeave.mutate(leave.id)}
        />
      );
    },
  },
];
