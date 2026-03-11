import type { ColumnDef } from "@tanstack/react-table";
import ConfirmUpdate from "../../component/ui/ConfirmUpdate";

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

interface UpdateManageLeavesMutation {
  mutate: (params: { id: string; data: { status: string } }) => void;
}

export const manageLeavesColumns = (
  updateManageLeave: UpdateManageLeavesMutation,
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
    cell: ({ row }) => {
      const leave = row.original;

      if (leave.status !== "pending") {
        return (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              leave.status === "approved"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {leave.status}
          </span>
        );
      }

      return (
        <div className="flex gap-2">
          <ConfirmUpdate
            title="Approve Leave"
            description="Are you sure you want to approve this leave request?"
            onConfirm={() =>
              updateManageLeave.mutate({
                id: leave.id,
                data: { status: "approved" },
              })
            }
            trigger={
              <button className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:cursor-pointer">
                Approve
              </button>
            }
          />

          <ConfirmUpdate
            title="Reject Leave"
            description="Are you sure you want to reject this leave request?"
            onConfirm={() =>
              updateManageLeave.mutate({
                id: leave.id,
                data: { status: "rejected" },
              })
            }
            trigger={
              <button className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:cursor-pointer">
                Reject
              </button>
            }
          />
        </div>
      );
    },
  },
];
