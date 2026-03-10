import type { ColumnDef } from "@tanstack/react-table";

type AttendanceStatus = "present" | "late";

export interface Attendance {
  tanggal: string;
  jam_masuk: string;
  jam_keluar: string;
  status: AttendanceStatus;
}

const statusStyle: Record<AttendanceStatus, string> = {
  present: "bg-green-100 text-green-700",
  late: "bg-red-100 text-red-700",
};

export const viewAttendanceColumns = (): ColumnDef<Attendance>[] => [
  {
    header: "Date",
    accessorKey: "date",
    cell: ({ row }) => (
      <span className="text-gray-700">{row.original.tanggal}</span>
    ),
  },
  {
    header: "Check In",
    accessorKey: "checkIn",
    cell: ({ row }) => (
      <span className="text-gray-600">{row.original.jam_masuk || "-"}</span>
    ),
  },
  {
    header: "Check Out",
    accessorKey: "checkOut",
    cell: ({ row }) => (
      <span className="text-gray-600">{row.original.jam_keluar || "-"}</span>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${statusStyle[status]}`}
        >
          {status}
        </span>
      );
    },
  },
];
