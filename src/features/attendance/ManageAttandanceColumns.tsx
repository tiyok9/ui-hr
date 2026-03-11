import type { ColumnDef } from "@tanstack/react-table";

export interface ManageLeave {
  id: string;
  karyawan: string;
  tanggal: string;
  jam_masuk: string;
  jam_keluar: string;
  status: string;
}

export const ManageAttandanceColumns = (): ColumnDef<ManageLeave>[] => [
  {
    header: "Karyawan",
    accessorKey: "karyawan",
  },
  {
    header: "Tanggal",
    accessorKey: "tanggal",
  },
  {
    header: "Jam Masuk",
    accessorKey: "jam_masuk",
  },
  {
    header: "Jam Keluar",
    accessorKey: "jam_keluar",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      const jamKeluar = row.original.jam_keluar;

      if (!jamKeluar) {
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
            Not Checked Out
          </span>
        );
      }

      if (status === "Late") {
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
            Late
          </span>
        );
      }

      if (status === "Present") {
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
            Present
          </span>
        );
      }

      return (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
          {status}
        </span>
      );
    },
  },
];
